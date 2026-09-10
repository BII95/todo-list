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
                const response = await fetch("/api/tasks?limit=100",
                     {method:'GET',
                      headers: {'X-CSRF-TOKEN': token},
                      credentials: 'include'
                    });

                if (response.status === 401){
                    throw new Error ("Unauthorized")
                }

                if (!response.ok) {
                    throw new Error("Failed to fetch todos");
                }

                const data = await response.json();
                const todos=data.tasks;
                console.log(todos)
                const completedTodos =todos.filter( todo => todo.isCompleted ).length; 
                const totalTodos =todos.length  
                const activeTodos = totalTodos-completedTodos
                const completionPercent = todos.length>0 ? Math.round((completedTodos/totalTodos)*100):0;
  
                setTodoStats({totalTodos,completedTodos,activeTodos,completionPercent})

            } catch (error) {
                setError(`Error loading stats: ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        }
        fetchTodoStats();

    }, [token]);

    return(
            <div>  
                <h1>Profile</h1> 
                <section>
                    <h2>Account Information</h2>
                    <p>Email: {email}</p>
                    <p>Status: {todoStats.totalTodos > 0 ? "Active user" : "No tasks yet"}</p>
                </section>

                <section>
                    <h2>Todo Statistics</h2>
                    {isLoading && <p>Loading statistics...</p>}
                    {!isLoading && error && <p role="alert">{error}</p>}
                    {!isLoading && !error && (
                        <>
                            <p>Total Todos: {todoStats.totalTodos}</p>
                            <p>Completed: {todoStats.completedTodos}</p>
                            <p>Active: {todoStats.activeTodos}</p>
                            <p>Completion Rate: {todoStats.completionPercent}%</p>
                        </>
                    )}
            </section>

              
            </div> );    
}