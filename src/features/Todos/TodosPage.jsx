import { useState } from 'react';

export default function TodosPage(){
      const [todoList,setTodoList]=useState([])
      
      function addTodo(todoTitle){
        let newTodo = {id: Date.now(),
                          title: todoTitle,
                        isCompleted: false}
        setTodoList(previous => [newTodo,...previous])
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
    
}