import  './App.css';

import { useState } from 'react';
import Header from './shared/Header';
import TodosPage from './features/Todos/TodosPage';
import Logon from './features/Logon.jsx';

function App() {
  const [email,setEmail]=useState('');
  const [token,setToken]=useState('')
  return (
    <div>
      <Header
        token={token}
        onSetToken={setToken}
        onSetEmail={setEmail}
        />
      {token ? (
              <TodosPage token= {token} />
      ) : (
            <Logon onSetEmail={setEmail}
                   onSetToken={setToken} />
          )}

      {/* <TodoForm onAddTodo={addTodo}/>
      <TodoList onCompleteTodo={completeTodo} 
                todoList={todoList}
                onUpdateTodo={updateTodo}
                /> */}
    </div>
  );
}

  export default App;
