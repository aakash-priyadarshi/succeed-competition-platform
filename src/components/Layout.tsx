import type { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-xl font-bold text-blue-600">
                  Succeed Platform
                </Link>
              </div>
            </div>
            
            {user && (
              <div className="flex items-center">
                <span className="text-sm text-gray-700 mr-4">
                  {user.firstName} {user.lastName} 
                  <span className="ml-1 text-xs text-gray-500">
                    ({user.role === 'SCHOOL_ADMIN' ? 'School Admin' : 
                       user.role === 'PLATFORM_ADMIN' ? 'Platform Admin' : 'Student'})
                  </span>
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-700 hover:text-gray-900"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}