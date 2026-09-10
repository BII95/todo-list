import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
export default function Logoff() {
    const { logout, email } = useAuth();
    const [logoffError, setLogoffError] = useState('');
    const [isLoggingOff, setIsLoggingOff] = useState(false);
    const navigate = useNavigate();

    async function handleLogoff() {
        setIsLoggingOff(true);
        const result = await logout();
        if (result.success) {
            navigate('/login')
        }else{
            setLogoffError(result.error);            
        }
        setIsLoggingOff(false)

    }

    return (
        <div>
            {logoffError && <p>{logoffError}</p>}
            <span>Logged in as {email}</span>
            <button onClick={handleLogoff} disabled={isLoggingOff}>
                {isLoggingOff ? "Logging off..." : "Log Off"}
            </button>
        </div>
    );
}