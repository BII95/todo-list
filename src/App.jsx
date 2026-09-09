import  './App.css';


import Header from './shared/Header';
import TodosPage from './features/Todos/TodosPage';
import Logon from './features/Logon.jsx';
import { useAuth } from './contexts/AuthContext.jsx';
function App() {
  const{isAuthenticated}=useAuth();
  return (
    <div>
      <Header/>
      {isAuthenticated ?
        <TodosPage/> : <Logon />}
    </div>
  );
}

  export default App;
