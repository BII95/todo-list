import { useEffect,useState } from "react"
import { useAuth } from "../contexts/AuthContext"

export default function ProfilePage() {
    const{email,token}=useAuth();
    const[todoStats,setTodoStats]=useState([]);
    const[isLoading,setIsLoading]= useState(true);
    const [error,setError] = useState("")

    useEffect(() => {
        async function fetchTodoStats() {
            
            if(!token) return;
            try {
                setIsLoading(true);
                setError('')
                const response = await fetch("/api/tasks?limit=100", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 401){
                    throw new Error ("Unauthorized")
                }

                if (!response.ok) {
                    throw new Error("Failed to fetch todos");
                }

                const data = await response.json();
                const todos=data.tasks;
                const completedTodos =todos.filter( todo => todo.isCompleted ).length; 
                const activeTodos = todos.filter( todo => !todo.isCompleted ).length;
                const totalTodos =todos.length    
                setTodoStats({totalTodos,completedTodos,activeTodos})

            } catch (error) {
                setError(`Error loading stats: ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        }
        fetchTodoStats();

    }, [token]);
   
    if (isLoading){
        return <p>Loading...</p>
    }
    return(
            <div>   
                {error && <p>{error}</p>}
                <h1>Profile</h1> 
                <p>Email: {email}</p> 
                <h2>Todo Statistics</h2>
              
                <p>Total Todos: {todoStats.totalTodos}</p>
                <p>Completed: {todoStats.completedTodos}</p> 
                <p>Active: {todoStats.activeTodos}</p> 
            </div> );    
}