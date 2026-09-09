import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";


export default function Logon (){
    const {login} = useAuth();
    const [email,setEmail]=useState('')
    const [password, setPassword] = useState('')
    const [authError,setAuthError]=useState('')
    const [isLoggingOn,setIsLoggingOn]=useState(false)
    async function handleSubmit(event) {
         event.preventDefault();
        setAuthError('')
        // try{ 
            setIsLoggingOn(true)
            const result = await login(email, password);
            if (!result.success) {
               setAuthError(result.error);
            }

            setIsLoggingOn(false);
            
            // const response = await fetch('/api/users/logon', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     credentials: 'include',
            //     body: JSON.stringify({ email, password })
            // });
            // const data = await response.json();
            // if (response.status === 200 && data.name && data.csrfToken) {
            //     onSetEmail(data.name);
            //     onSetToken(data.csrfToken);

            // } else {
            //     setAuthError(`Authentication failed: ${data?.message}`);
            // }
            // } catch (error) {
            // setAuthError(`Error: ${error.name} | ${error.message}`);
            // } finally {
            //     setIsLoggingOn(false);
            // }
    }
    return (
        <form onSubmit={handleSubmit}>
            {authError && <p>{authError}</p>}
            {/* <TextInputWithLabel
            ></TextInputWithLabel> */}
            <label htmlFor="email">Email</label>
            <input 
                id="email"
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
            />
            <label htmlFor="password">Password</label>
            <input 
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
            />
            <button type="submit"
                    disabled={isLoggingOn}>
                        {isLoggingOn ? "Logging in..." : "Log On"}
                        
            </button>
        </form>
    )
}