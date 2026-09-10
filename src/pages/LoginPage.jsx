import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [email,setEmail]=useState('')
    const [password, setPassword] = useState('')
    const [authError,setAuthError]=useState('')
    const [isLoggingOn,setIsLoggingOn]=useState(false)
  // Get intended destination from location state, default to /todos
  const from = location.state?.from?.pathname || '/todos';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Handle login form submission
  async function handleSubmit(event) {
            event.preventDefault();
            setAuthError('')
            setIsLoggingOn(true)
        try {
            const result = await login(email, password);

            if (result.success) {
                navigate(from, { replace: true });
            } else {
                setAuthError(result.error);
            }
        } catch (error) {
            setAuthError(error.message);
        } finally {
            setIsLoggingOn(false);
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            {authError && <p>{authError}</p>}
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