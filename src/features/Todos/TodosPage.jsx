import { useState,useEffect } from 'react';
import TodoList from './TodoList/TodoList';
import TodoForm from './TodoForm';

export default function TodosPage({token}){
      const [todoList,setTodoList]=useState([])
      const [error,setApiError]= useState('')
      const[isTodoListLoading,setLoading]= useState(false)
      
      useEffect(() => { async function fetchTodos() { try { setLoading(true); const params = new URLSearchParams({ limit: 100 }); const response = await fetch(`/api/tasks?${params}`, { headers: { 'X-CSRF-TOKEN': token }, credentials: 'include' }); if (response.status === 401) { throw new Error('Unauthorized'); } if (!response.ok) { throw new Error('Something went wrong'); } const data = await response.json(); setTodoList(data.tasks); } catch (error) { setApiError(`Error: ${error.name} | ${error.message}`); } finally { setLoading(false); } } if (token) { fetchTodos(); } }, [token]);
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
              )
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

            <TodoForm onAddTodo={addTodo}/>
            
            <TodoList 
                onCompleteTodo={completeTodo} 
                todoList={todoList}
                onUpdateTodo={updateTodo}
                />
            
        </div>
    )
    
}