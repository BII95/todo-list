import { useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";
export default function Logon ({onSetEmail,onSetToken}){
    const [email,setEmail]=useState('')
    const [password, setPassword] = useState('')
    const [authError,setAuthError]=useState('')
    const [isLoggingOn,setIsLoggingOn]=useState(false)
    async function handleSubmit(event) {
        try{ 
            setIsLoggingOn(true)
            const response = await fetch('/api/users/logon', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.status === 200 && data.name && data.csrfToken) {
                event.preventdefault();
                onSetEmail(data.name);
                onSetToken(data.csrfToken);

            } else {
                setAuthError(`Authentication failed: ${data?.message}`);
            }
            } catch (error) {
            setAuthError(`Error: ${error.name} | ${error.message}`);
            } finally {
                setIsLoggingOn(false);
            }
    }
    return (
        <form onSubmit={handleSubmit}>
            {/* <TextInputWithLabel
            ></TextInputWithLabel> */}
            <label htmlFor="email">Email</label>
            <input 
                id="email"
                type="text"
                value={email}
                onSubmit={handleSubmit}
                required
            />
            <label htmlFor="password">Password</label>
            <input 
                id="password"
                type="text"
                value={password}
                onSubmit={handleSubmit}
                required
            />
            <button type="submit">Submit</button>

        </form>
    )
}