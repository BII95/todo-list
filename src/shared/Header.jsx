import { useAuth } from "../contexts/AuthContext"
import Logoff from "../features/Logoff"

export default function Header(){
    const{isAuthenticated} = useAuth();
    return(
        <div>
            <h1>Todo List</h1>
            {isAuthenticated && <Logoff/>}

        </div>
    )
}