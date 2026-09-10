import { useAuth } from "../contexts/AuthContext"
import Logoff from "../features/Logoff"
import Navigation from "./Navigation";

export default function Header(){
    const{isAuthenticated} = useAuth();
    return(
        <div>
            <h1>Todo List</h1>
            <Navigation>
            </Navigation>
            {isAuthenticated && <Logoff/>}

        </div>
    )
}