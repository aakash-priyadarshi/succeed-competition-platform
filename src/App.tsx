import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import CompetitionsList from './pages/CompetitionsList';
import CompetitionCreate from './pages/CompetitionCreate';
import CompetitionDetail from './pages/CompetitionDetail';
import type { ReactNode } from 'react';

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
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
      </Router>
    </AuthProvider>
  );
}

export default App;