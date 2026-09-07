import { useEffect,useReducer } from 'react';
import TodoList from './TodoList/TodoList';
import TodoForm from './TodoForm';
import SortBy from '../../shared/SortBy';
import useDebounce from '../../utils/useDebounce';
import FilterInput from '../../shared/FilterInput';
import {
    todoReducer,
    initialTodoState,
    TODO_ACTIONS,
} from '../../reducers/todoReducer';
export default function TodosPage({token}){
    //   const [todoList,setTodoList]=useState([])
    //   const [error,setError]= useState('')
    //   const [filterError,setFilterError]=useState("")

    //   const[isTodoListLoading,setIsTodoListLoading]= useState(true)
    //   const[sortBy,setSortBy]=useState('createdAt')
    //   const[sortDirection,setSortDirection]=useState('asc')
    //   const[filterTerm,setFilterTerm]=useState('');
    //   const [dataVersion,setDataVersion]=useState(0);
      const [state, dispatch] = useReducer(todoReducer, initialTodoState);
      const {
            todoList,
            error,
            filterError,
            isTodoListLoading,
            sortBy,
            sortDirection,
            filterTerm,
            dataVersion,
            } = state;
      const debouncedFilterTerm= useDebounce(filterTerm,300);
    //   const invalidateCache = useCallback(() =>
    //     {
    //         setDataVersion(prev => prev+1)
    //         console.log("invalidating memo cache after todo mutation")    
    //     },[]);  

      useEffect(() => { async function fetchTodos() 
        { 
            dispatch({type: TODO_ACTIONS.FETCH_START})  
            const params = {
                        sortBy,
                        sortDirection,
                        limit: 100 }; 
                if(debouncedFilterTerm){
                    params.find = debouncedFilterTerm;
                }
            const parameters = new URLSearchParams(params)
            
            try {   
              const response = await fetch(`/api/tasks?${parameters}`, 
                { headers: { 'X-CSRF-TOKEN': token }, credentials: 'include' }); 
                if (response.status === 401) { throw new Error('Unauthorized'); } 
                if (!response.ok) { throw new Error('Something went wrong');   
                }   
              const data = await response.json(); 

              dispatch({
                      type:TODO_ACTIONS.FETCH_SUCCESS,
                      payload: {
                        todos: data.tasks}
                    });
    
          } catch (error) {
                if (debouncedFilterTerm || sortBy !== 'createdAt' || sortDirection !== 'desc') {
                    dispatch({type: TODO_ACTIONS.FETCH_ERROR,
                                payload : {
                                    message: `Error filtering/sorting todos: ${error.message}`,
                                    isFilterError: true
                                }})
                } else {
                    // setError(`Error fetching todos: ${error.message}`);
                    dispatch({type:TODO_ACTIONS.FETCH_ERROR,
                              payload: {
                                message:`Error fetching todos: ${error.message}`,
                                isFilterError: false
                              }
                    })
                }
        } } 
        
        if (token) { 
                fetchTodos();
            } }, [token,sortBy,sortDirection,debouncedFilterTerm]);
        const handleFilterChange = (newTerm) => { 
            dispatch({
                type:TODO_ACTIONS.SET_FILTER,
                payload:{
                    filterTerm:newTerm
                }
            })
         }; 
        const handleSortByChange = (newSortBy) => {
                dispatch({
                    type: TODO_ACTIONS.SET_SORT,
                    payload: {
                        sortBy: newSortBy,
                        sortDirection: sortDirection
                    }});};
        const handleSortDirectionChange = (newSortDirection) => {
                dispatch({
                    type: TODO_ACTIONS.SET_SORT,
                    payload: {
                        sortBy: sortBy,
                        sortDirection: newSortDirection
                    }
                });
            };

        async function addTodo(todoTitle) {
          let newTodo = {
              id: Date.now(),
              title: todoTitle,
              isCompleted: false
          }
         dispatch({type:TODO_ACTIONS.ADD_TODO_START,
                        payload:{newTodo}})
          try {
              const response = await fetch('/api/tasks', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'X-CSRF-TOKEN': token
                  },
                  credentials: 'include',
                  body: JSON.stringify({
                      title: newTodo.title,
                      isCompleted: newTodo.isCompleted
                  })
              })

              if (!response.ok) {
                  throw new Error('Failed to add todo')
              }

              const savedTodo = await response.json()
              
              dispatch({type:TODO_ACTIONS.ADD_TODO_SUCCESS,
                        payload:newTodo.id
                        ,savedTodo
              })

          } catch (error) {
              dispatch({
                        type:TODO_ACTIONS.ADD_TODO_ERROR,
                        payload:{
                            newTodoId: newTodo.id,
                            message:`Error: ${error.message}`
                        }})}
      }
      async function completeTodo(id) {
        const originalTodo = todoList.find(todo => todo.id === id)
        ///
        dispatch({type:TODO_ACTIONS.COMPLETE_TODO_START,
            payload:{id}
        })

    try {
        const response = await fetch(`/api/tasks/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': token
            },
            credentials: 'include',
            body: JSON.stringify({
                isCompleted: true
            })
        })

        if (!response.ok) {
            throw new Error('Failed to complete todo')
        }
        dispatch({type:TODO_ACTIONS.COMPLETE_TODO_SUCCESS})

    } catch (error) {
        dispatch({
                type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
                payload: {
                    id,
                    originalTodo,
                    message: `Error: ${error.message}`}});
    }
}
        
       async function updateTodo(editedTodo) {
            const originalTodo = todoList.find(
                todo => todo.id === editedTodo.id
            );

            dispatch({
                type: TODO_ACTIONS.UPDATE_TODO_START,
                payload: {
                    editedTodo
                }
            }); 

    try {
        const response = await fetch(`/api/tasks/${editedTodo.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': token
            },
            credentials: 'include',
            body: JSON.stringify({
                title: editedTodo.title,
                isCompleted: editedTodo.isCompleted
            })
        });

        if (!response.ok) {
            throw new Error('Failed to update todo');
        }

        dispatch({
            type: TODO_ACTIONS.UPDATE_TODO_SUCCESS
        });

    } catch (error) {
        dispatch({
            type: TODO_ACTIONS.UPDATE_TODO_ERROR,
            payload: {
                id: editedTodo.id,
                originalTodo,
                message: `Error: ${error.message}`
            }
        });
    }
}

    return(
        <div>
            {error && (
              <div>
                <p>{error}</p>
                <button onClick={()=> dispatch({type:TODO_ACTIONS.CLEAR_ERROR})}>
                  Clear Error
                </button>
              </div>  
            )}

            
            {filterError && (
              <div>
                <p>{filterError}</p>
                <button onClick={()=> dispatch({type:TODO_ACTIONS.CLEAR_FILTER_ERROR})}>
                  Clear Filter Error
                </button>
                
                <button onClick={()=>{
                    dispatch({
                            type: TODO_ACTIONS.SET_FILTER,
                            payload: { filterTerm: '' }
                        });

                    dispatch({
                        type: TODO_ACTIONS.SET_SORT,
                        payload: { sortBy: 'createdAt', 
                                   sortDirection:'desc'                            
                        }
                    });

                   
                    
                    dispatch({
                         type: TODO_ACTIONS.CLEAR_FILTER_ERROR
                    });



                }}>
                  Reset Filters
                
                </button>
                            
                
              </div>  
            )}

            {isTodoListLoading && <p>Loading...</p>}
            <SortBy onSortByChange={handleSortByChange}
                    onSortDirectionChange={handleSortDirectionChange}
                    sortBy={sortBy}
                    sortDirection={sortDirection}
        
                />
            <FilterInput
                filterTerm={filterTerm}
                onFilterChange={handleFilterChange}/>
            <TodoForm onAddTodo={addTodo}/>
            
            <TodoList 
                onCompleteTodo={completeTodo} 
                todoList={todoList}
                onUpdateTodo={updateTodo}
                dataVersion={dataVersion}
                />
            
        </div>
    )
    
}