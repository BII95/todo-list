import { useState,useEffect, useCallback } from 'react';
import TodoList from './TodoList/TodoList';
import TodoForm from './TodoForm';
import SortBy from '../../shared/SortBy';
import useDebounce from '../../utils/useDebounce';
import FilterInput from '../../shared/FilterInput';
export default function TodosPage({token}){
      const [todoList,setTodoList]=useState([])
      const [error,setApiError]= useState('')
      const[isTodoListLoading,setLoading]= useState(false)
      const[sortBy,setSortBy]=useState('createdAt')
      const[sortDirection,setSortDirection]=useState('desc')
      const[filterTerm,setFilterTerm]=useState('');
      const debouncedFilterTerm= useDebounce(filterTerm,300);
      const [dataVersion,setDataVersion]=useState(0);

      const invalidateCache = useCallback(() =>
        {
            setDataVersion(prev => prev+1)
            console.log("invalidating memo cache after todo mutation")    
        },[]);  

      useEffect(() => { async function fetchTodos() 
        { try { 
          setLoading(true); 
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
            setTodoList(data.tasks); 
          } catch (error) { 
            setApiError(`Error: ${error.name} | ${error.message}`);
           } finally { 
            setLoading(false); 
          } } if (token) { fetchTodos(); } }, [token,sortBy,sortDirection,debouncedFilterTerm]);
        const handleFilterChange = (newTerm) => { setFilterTerm(newTerm); }; 
        
        async function addTodo(todoTitle) {
          let newTodo = {
              id: Date.now(),
              title: todoTitle,
              isCompleted: false
          }

          setTodoList(previous => [newTodo, ...previous])

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

              setTodoList(previous =>
                  previous.map(todo =>
                      todo.id === newTodo.id ? savedTodo : todo
                  )
              );
              invalidateCache();
          } catch (error) {
              setTodoList(previous =>
                  previous.filter(todo => todo.id !== newTodo.id)
              )

              setApiError(`Error: ${error.message}`)
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
        setApiError(`Error: ${error.message}`)
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
        

        setApiError(`Error: ${error.message}`)
    }
}

    return(
        <div>
            {error && (
              <div>
                <p>{error}</p>
                <button onClick={()=> setApiError('')}>
                  Clear Error
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