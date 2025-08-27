import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check if user data exists in localStorage on app initialization
    const userData = localStorage.getItem('user');
    if (userData) {
      setIsInitialized(true);
    } else {
      setIsInitialized(true);
    }
  }, []);

  const value = {
    user,
    isAuthenticated,
    loading,
    isInitialized
  };

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
