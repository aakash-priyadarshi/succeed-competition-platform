import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import CompetitionsList from './pages/CompetitionsList';
import CompetitionCreate from './pages/CompetitionCreate';
import CompetitionDetail from './pages/CompetitionDetail';
import { AnimatePresence } from 'framer-motion';

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader">
          <svg className="animate-spin h-12 w-12 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Component to handle AnimatePresence
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Layout>
              <CompetitionsList />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/competitions" element={
          <ProtectedRoute>
            <Layout>
              <CompetitionsList />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/competitions/new" element={
          <ProtectedRoute>
            <Layout>
              <CompetitionCreate />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/competitions/:id" element={
          <ProtectedRoute>
            <Layout>
              <CompetitionDetail />
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AnimatedRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;