import { createContext, useContext, useState } from 'react';

// Create the context
const AuthContext = createContext();

// Custom hook with error checking
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  // State for authentication
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  
  // Functions will go here...
  const login = async (userEmail, password) => {
  try {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail, password }),
      credentials: 'include',
    };
    
    const res = await fetch('/api/users/logon', options);
    const data = await res.json();
    
    if (res.status === 200 && data.name && data.csrfToken) {
      // Success: Update state
      setEmail(data.name);
      setToken(data.csrfToken);
      return { success: true };
    } else {
      // Failure: Return error
      return {
        success: false,
        error: `Authentication failed: ${data?.message}`,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: `Network error during login: ${error.message}`,
    };
  }
};

  const logout = async () => {
    try {
        if (!token) {
            setEmail('');
            setToken('');

            return {
                success: true
            };
        }

        const response = await fetch('/api/user/logoff', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': token
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to log out');
        }

        return {
            success: true
        };

    } catch (error) {
        return {
            success: false,
            error: error.message
        };

    } finally {
        // Always clear local authentication state
        setEmail('');
        setToken('');
    }
};
  // Context value object
  const value = {
    email,
    token,
    isAuthenticated: !!token,
    login,
    logout,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}