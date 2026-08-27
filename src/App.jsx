import  './App.css';
import TodoList from './features/Todos/TodoList/TodoList.jsx';
import TodoForm from './features/Todos/TodoForm.jsx';

import Header from './shared/Header';
import TodosPage from './features/Todos/TodosPage';
import Logon from './features/Logon.jsx';

function App() {
  return (
    <div>
      <Header></Header>
      <TodosPage></TodosPage>
      <Logon></Logon>
      {/* <TodoForm onAddTodo={addTodo}/>
      <TodoList onCompleteTodo={completeTodo} 
                todoList={todoList}
                onUpdateTodo={updateTodo}
                /> */}
    </div>
  );
}

  export default App;
