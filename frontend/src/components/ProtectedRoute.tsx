
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresValidation?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiresValidation = false 
}) => {
  const { user, isAuthenticated } = useAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If route requires validation and user is business owner without validation
  if (requiresValidation && user && !user.is_investor) {
    // For now, we assume all business users need validation
    // In the future, you can add a user.is_validated field
    const isValidated = false; // This would come from user profile or API
    
    if (!isValidated) {
      return <Navigate to="/business-validation-pending" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
