import { useState } from "react";
export default function Logon ({onSetEmail,onSetToken}){
    const [email,setEmail]=useState('')
    const [authError,setAuthError]=useState('')
    const [isLogginOn,setIsLoggingOn]=useState(false)
    async function handleSubmit() {
        try{ 
            const response = await fetch('/api/users/logon', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.status === 200 && data.name && data.csrfToken) {
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
    function NewComponent({ newProp = () => {} })
    function NewComponent({ newProp = () => {} })
}