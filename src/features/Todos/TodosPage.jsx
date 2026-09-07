import { useState,useEffect, useCallback,useReducer } from 'react';
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
      const invalidateCache = useCallback(() =>
        {
            setDataVersion(prev => prev+1)
            console.log("invalidating memo cache after todo mutation")    
        },[]);  

      useEffect(() => { async function fetchTodos() 
        { 
            const params = {
                        sortBy,
                        sortDirection,
                        limit: 100 }; 
                if(debouncedFilterTerm){
                    params.find = debouncedFilterTerm;
                }
            const parameters = new URLSearchParams(params)
            const response = await fetch(`/api/tasks?${parameters}`, 
                { headers: { 'X-CSRF-TOKEN': token }, credentials: 'include' }); 
                if (response.status === 401) { throw new Error('Unauthorized'); } 
                if (!response.ok) { throw new Error('Something went wrong');   
                } 
            const data = await response.json(); 
            try { 
        //   setIsTodoListLoading(true); 
              dispatch({type: TODO_ACTIONS.FETCH_START})  
  
              dispatch({
                      type:TODO_ACTIONS.FETCH_SUCCESS,
                      payload: {
                        todos: data.tasks}
                    });
            // setTodoList(data.tasks);
            ///commenting out previous set state
            // setFilterError(''); 
            // setError('');
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
        }finally { 
            dispatch({type:TODO_ACTIONS.FETCH_SUCCESS,
                      payload:{
                        todos: data.tasks}
            })
            // setIsTodoListLoading(false); 
          } } if (token) { 
                fetchTodos();
            } }, [token,sortBy,sortDirection,debouncedFilterTerm]);
        const handleFilterChange = (newTerm) => { setFilterTerm(newTerm); }; 
        
        async function addTodo(todoTitle) {
          let newTodo = {
              id: Date.now(),
              title: todoTitle,
              isCompleted: false
          }

        //   dispatch({type:TODO_ACTIONS.ADD_TODO_START,
        //             payload:{newTodo}
        //   })
          //check this dispatch later
        //   setTodoList(previous => [newTodo, ...previous])

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
              
              dispatch({type:TODO_ACTIONS.ADD_TODO_START,
                        payload:{
                            newTodo
                        }

              })

              dispatch({type:TODO_ACTIONS.ADD_TODO_SUCCESS,
                        payload:savedTodo
              })

            //   setTodoList(previous =>
            //       previous.map(todo =>
            //           todo.id === newTodo.id ? savedTodo : todo
            //       )
            //   );

              invalidateCache();
          } catch (error) {
            //   setTodoList(previous =>
            //       previous.filter(todo => todo.id !== newTodo.id)
            //   )
              dispatch({type:TODO_ACTIONS.ADD_TODO_ERROR,
                        message:`Error: ${error.message}`,})  
          }
      }
      async function completeTodo(id) {
        const originalTodo = todoList.find(todo => todo.id === id)

        const updatedTodos = todoList.map(todo => {
            if (todo.id === id) {
                return { ...todo, isCompleted: true }
            } else {
                return todo
            }
        })

        setTodoList(updatedTodos)

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
        invalidateCache();

    } catch (error) {
        setTodoList(previous =>
            previous.map(todo =>
                todo.id === id ? originalTodo : todo
            )
        )
        setError(`Error: ${error.message}`)
    }
}
        
       async function updateTodo(editedTodo) {
    const originalTodo = todoList.find(
        todo => todo.id === editedTodo.id
    )

    const updatedTodos2 = todoList.map(todo => {
        if (todo.id === editedTodo.id) {
            return { ...editedTodo }
        } else {
            return todo
        }
    })

    setTodoList(updatedTodos2)

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
        })

        if (!response.ok) {
            throw new Error('Failed to update todo')
        }
        invalidateCache();


    } catch (error) {
        setTodoList(previous =>
            previous.map(todo =>
                todo.id === editedTodo.id ? originalTodo : todo
            )
        )
        

        setError(`Error: ${error.message}`)
    }
}

    return(
        <div>
            {error && (
              <div>
                <p>{error}</p>
                <button onClick={()=> setError('')}>
                  Clear Error
                </button>
              </div>  
            )}

            
            {filterError && (
              <div>
                <p>{filterError}</p>
                <button onClick={()=> setFilterError('')}>
                  Clear Filter Error
                </button>
                
                <button onClick={()=>{
                    setFilterTerm('')
                    setSortBy('createdAt')
                    setSortDirection('desc')
                    setFilterError('')
                }}>
                  Reset Filters
                
                </button>
                            
                
              </div>  
            )}

            {isTodoListLoading && <p>Loading...</p>}
            <SortBy onSortByChange={setSortBy}
                    onSortDirectionChange={setSortDirection}
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