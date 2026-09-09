import { useEffect,useState } from "react"
import { useAuth } from "../contexts/AuthContext"

export default function ProfilePage() {
    const{email,token}=useAuth();
    const[todos,setTodos]=useState([]);
    const[isLoading,setIsLoading]= useState(true);
    const [error,setError] = useState("")

    useEffect(() => {
        async function fetchTodos() {
            try {
                setIsLoading(true);

                const response = await fetch("/api/tasks?limit=100", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch todos");
                }

                const data = await response.json();
                setTodos(data.tasks);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchTodos();

    }, [token]);
    console.log(todos)
    const completedTodos =todos.filter( todo => todo.isCompleted ).length; 
    const activeTodos = todos.filter( todo => !todo.isCompleted ).length;
    if (isLoading){
        return <p>Loading...</p>
    }
    return(
            <div> 
                <h1>Profile</h1> 
                <p>Email: {email}</p> <h2>Todo Statistics</h2>
                {error && <p>{error}</p>}
                <p>Completed: {completedTodos}</p> 
                <p>Active: {activeTodos}</p> 
            </div> );    
}