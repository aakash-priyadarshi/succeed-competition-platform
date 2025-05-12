// src/pages/Login.tsx - Updated with video background
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { users } from '../lib/mockData';
import { motion } from 'framer-motion';
import VideoBackground from '../components/VideoBackground';

export default function Login() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  
  const { login, user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/competitions');
    }
  }, [user, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter an email address or select a user.');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(email);
      
      if (success) {
        navigate('/competitions');
      } else {
        setError('Invalid email. Please use one of the sample accounts listed below.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUserSelect = (userId: string, userEmail: string) => {
    setSelectedUserId(userId);
    setEmail(userEmail);
  };
  
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <VideoBackground />
      
      {/* Login Container */}
      <div className="w-full max-w-md z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-primary/90 px-6 py-8 text-center">
            <h1 className="text-3xl font-bold text-white">Succeed Platform</h1>
            <p className="mt-2 text-white/80">Manage school competitions with ease</p>
          </div>
          
          <div className="px-6 py-8">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value="password" // Fixed for prototype
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                />
                <p className="mt-1 text-xs text-gray-500">
                  For this prototype, password is pre-filled and authentication is simulated.
                </p>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors ${
                    (isLoading || !email) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </>
                  ) : 'Sign In'}
                </button>
              </div>
            </form>
          </div>
          
          {/* Quick Access Section */}
          <div className="px-6 pb-8">
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Quick access</span>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-600">Select a user to auto-fill login credentials:</p>
              <div className="grid grid-cols-1 gap-2">
                {users.map((demoUser) => (
                  <motion.button
                    key={demoUser.id}
                    whileHover={{ scale: 1.02, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => handleUserSelect(demoUser.id, demoUser.email)}
                    className={`flex items-center justify-between px-4 py-3 border ${
                      selectedUserId === demoUser.id
                        ? 'border-primary bg-primary bg-opacity-10 ring-2 ring-primary ring-opacity-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    } rounded-lg text-left`}
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${
                          demoUser.role === 'SCHOOL_ADMIN' ? 'bg-primary' : 
                          demoUser.role === 'STUDENT' ? 'bg-blue-500' : 'bg-secondary'
                        }`}>
                          {demoUser.firstName[0]}{demoUser.lastName[0]}
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{demoUser.firstName} {demoUser.lastName}</p>
                        <p className="text-xs text-gray-500">{demoUser.email}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      demoUser.role === 'SCHOOL_ADMIN' 
                        ? 'bg-primary bg-opacity-20 text-primary' 
                        : demoUser.role === 'PLATFORM_ADMIN'
                        ? 'bg-secondary bg-opacity-20 text-secondary'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {demoUser.role === 'SCHOOL_ADMIN' ? 'School Admin' : 
                       demoUser.role === 'PLATFORM_ADMIN' ? 'Platform Admin' : 'Student'}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              This is a prototype for the Succeed competition platform assessment.
              <br />No real authentication is implemented.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}