import { createContext, useContext, useState } from 'react';

// Create the context
const AuthContext = createContext();

// Custom hook with error checking
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