import { useState,useEffect } from 'react';
import TodoList from './TodoList/TodoList';
import TodoForm from './TodoForm';

export default function TodosPage({token}){
      const [todoList,setTodoList]=useState([])
      const [error,setApiError]= useState('')
      const[isTodoListLoading,setLoading]= useState(false)
      
      useEffect(() => {
        (async () => {
          try {
            if(!token) return
            const params =new URLSearchParams({
                limit:100,})

            setLoading(true);
            const resp = await fetch(`/api/tasks?${params}`,{
              headers:{
                'X-CSRF-TOKEN' : token,
              },
              credentials: 'include'
            });
            if (resp.status === 401) {
                throw new Error("Unauthorized")
            } 
            if (!resp.ok) {
              throw new Error('Something went wrong')
            }else {
              const fetchData= await resp.json()
              setTodoList(fetchData.tasks)
            }
          } catch (error) {
              setApiError(`Error: ${error.name} | ${error.message}`);
            }finally {
              setLoading(false);
          }
        })();
      }, [token]);

      async function addTodo(todoTitle){
        let newTodo = {id: Date.now(),
                          title: todoTitle,
                        isCompleted: false}
        setTodoList(previous => [newTodo,...previous])
        const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' , 
                           'X-CSRF-TOKEN' : token
                          },
                credentials: 'include',
                body: JSON.stringify({
                  title: newTodo.title,
                  isCompleted: newTodo.isCompleted })
            });
        if (response.ok){
          const savedTodo = await response.json()
          setTodoList(previous =>
            previous.map(todo =>
              todo.id === newTodo.id ? savedTodo : todo
            )
          )
        }
        else{
          setTodoList(previous =>
            previous.filter(todo => todo.id !== newTodo.id)
          )
          setApiError('Failed to add todo')
        }
      }
    
      function completeTodo(id){
        const updatedTodos = todoList.map(todo => {
            if (todo.id === id){
              const newObj = { ...todo, isCompleted: true}
              return newObj
            } else {
              return todo
            }
            }
          );
    
          setTodoList(updatedTodos)
        }
        
        function updateTodo(editedTodo){
          const updatedTodos2 = todoList.map(todo => {
            if(todo.id === editedTodo.id){
              return{ ...editedTodo}; 
            }else {
              return todo
            }
          }
        );
          setTodoList(updatedTodos2)
        }

    return(
        <div>
            <TodoForm onAddTodo={addTodo}/>
            <TodoList onCompleteTodo={completeTodo} 
                todoList={todoList}
                onUpdateTodo={updateTodo}
                />
        </div>
    )
    
}