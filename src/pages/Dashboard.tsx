// src/pages/Dashboard.tsx
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  
  useEffect(() => {
    // You can add any dashboard-specific logic here
  }, []);
  
  // Redirect to appropriate page based on user role
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  // Redirect to competitions page for all users
  return <Navigate to="/competitions" />;
}