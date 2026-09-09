import  './App.css';
import { Routes,Route } from 'react-router';



import Header from './shared/Header';
// import TodosPage from './features/Todos/TodosPage';
// import Logon from './features/Logon.jsx';
// import { useAuth } from './contexts/AuthContext.jsx';
function App() {
  // const{isAuthenticated}=useAuth();
  return (
    <div>
      <Header/>
      <Routes>
        {/*routes will go here*/}
      </Routes>
      {/* {isAuthenticated ?
        <TodosPage/> : <Logon />} */}
    </div>
  );
}

  export default App;
