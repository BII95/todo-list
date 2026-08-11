import  './App.css';
import TodoList from './TodoList.jsx';
import TodoForm from './TodoForm.jsx';
import { useState } from 'react';

function App() {
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

      setTodoList(previous => [previous,...updatedTodos])
    }
  
  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo}/>
      <TodoList todoList={todoList} />
    </div>
  );
}

  export default App;
