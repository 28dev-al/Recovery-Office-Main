import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Check both auth flag and token presence for stronger authentication validation
  const hasAuthFlag = localStorage.getItem('recovery-office-auth') === 'authenticated';
  const hasToken = !!localStorage.getItem('recovery-office-token');
  const isAuthenticated = hasAuthFlag && hasToken;
  
  console.log('[ProtectedRoute] Auth check:', { 
    hasAuthFlag, 
    hasToken, 
    isAuthenticated 
  });
  
  // If auth flag exists but token is missing, clear auth flag to force re-login
  if (hasAuthFlag && !hasToken) {
    console.warn('[ProtectedRoute] Auth flag exists but token missing - clearing auth state');
    localStorage.removeItem('recovery-office-auth');
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}; 