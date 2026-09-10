import { useEffect,useState } from "react"
import { useAuth } from "../contexts/AuthContext"

export default function ProfilePage() {
    const{email,name,token}=useAuth();
    const[todoStats,setTodoStats] = useState({
                                            totalTodos: 0,
                                            completedTodos: 0,
                                            activeTodos: 0,
                                            completionPercent: 0,});
    const[isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState("")

    useEffect(() => {
        async function fetchTodoStats() {
            
            if(!token){
                setIsLoading(false)
                return
            };

            try {
                setIsLoading(true);
                setError('')
                const response = await fetch("/api/tasks",
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

                const todos=data.tasks ?? data;
                // console.log(todos)                              
                const totalTodos =todos.length  
                
                const completedTodos =todos.filter( todo => todo.isCompleted ).length; 
                const activeTodos = totalTodos-completedTodos
                const completionPercent = totalTodos>0 ? Math.round((completedTodos/totalTodos)*100):0;
  
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
                    <p>Name:{name}</p>
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