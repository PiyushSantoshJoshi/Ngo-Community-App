import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, requireAuth = true, requireAdmin = false, requireNgo = false }) => {
  const { isAuthenticated, isAdmin, isNgo } = useAuth();
  const location = useLocation();

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If admin role is required but user is not admin
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If NGO role is required but user is not NGO
  if (requireNgo && !isNgo) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
