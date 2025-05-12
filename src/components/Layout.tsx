import type { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { schools } from '../lib/mockData';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Get current user's school name
  const schoolName = user?.schoolId 
    ? schools.find(s => s.id === user.schoolId)?.name 
    : null;

  // Check if link is active
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Get user role display text and color
  const getUserRoleDisplay = () => {
    if (!user) return null;
    
    switch (user.role) {
      case 'SCHOOL_ADMIN':
        return {
          text: `${schoolName} Admin`,
          color: 'bg-green-400'
        };
      case 'STUDENT':
        return {
          text: `${schoolName} Student`,
          color: 'bg-blue-400'
        };
      case 'PLATFORM_ADMIN':
        return {
          text: 'Platform Admin',
          color: 'bg-purple-400'
        };
      default:
        return {
          text: user.role,
          color: 'bg-gray-400'
        };
    }
  };

  const roleDisplay = getUserRoleDisplay();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center"
                >
                  <svg 
                    className="w-8 h-8 text-indigo-600 mr-2" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c-.635-.544-.297-1.584.536-1.65l-4.752-.382-1.831-4.401z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  <span className="text-xl font-bold text-gray-900">Succeed</span>
                </motion.div>
              </Link>
              
              {/* Navigation Links */}
              {user && (
                <nav className="ml-6 flex space-x-8">
                  <Link
                    to="/competitions"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                      isActive('/competitions')
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    Competitions
                  </Link>
                </nav>
              )}
            </div>
            
            {user && (
              <div className="flex items-center">
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center"
                >
                  <div className="flex items-center">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-8 h-8 rounded-full ${
                        user.role === 'STUDENT' 
                          ? 'bg-blue-100 text-blue-600' 
                          : user.role === 'SCHOOL_ADMIN'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-purple-100 text-purple-600'
                      } flex items-center justify-center font-medium`}
                    >
                      {user.firstName.charAt(0)}
                    </motion.div>
                    <div className="ml-2">
                      <div className="text-sm font-medium text-gray-700">{user.firstName} {user.lastName}</div>
                      <div className="text-xs text-gray-500 flex items-center">
                        {roleDisplay && (
                          <>
                            <span className={`inline-block w-2 h-2 rounded-full ${roleDisplay.color} mr-1`}></span>
                            {roleDisplay.text}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="ml-4 px-3 py-1 text-sm text-primary hover:text-primaryDark hover:bg-gray-100 rounded-md transition-colors duration-200"
                  >
                    Logout
                  </motion.button>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero section for certain pages */}
      {location.pathname === '/competitions' && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-secondary text-white"
        >
          <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl font-bold"
            >
              {user?.role === 'PLATFORM_ADMIN' 
                ? 'All Competitions'
                : user?.role === 'SCHOOL_ADMIN'
                  ? `${schoolName} Competitions Management`
                  : `${schoolName} Competitions`}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-2 text-indigo-100"
            >
              {user?.role === 'PLATFORM_ADMIN' 
                ? 'Manage competitions across all schools'
                : user?.role === 'SCHOOL_ADMIN'
                  ? 'Create and manage academic competitions for your school'
                  : 'View and participate in academic competitions'}
            </motion.p>
          </div>
        </motion.div>
      )}

      {/* Main content with animation */}
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-grow py-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </motion.main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; 2025 Succeed Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}