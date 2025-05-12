import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import type { Competition, User } from '../types';
import { schools } from '../lib/mockData';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

export default function CompetitionDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchCompetition = async () => {
      if (!id || !user) return;
      
      setIsLoading(true);
      try {
        const data = await api.getCompetition(id, user);
        setCompetition(data);
        setError('');
      } catch (err) {
        console.error('Failed to fetch competition:', err);
        setError('You do not have permission to view this competition or it does not exist.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCompetition();
  }, [id, user]);
  
  // Get school name from ID
  const schoolName = competition?.ownerSchoolId 
    ? schools.find(s => s.id === competition.ownerSchoolId)?.name 
    : 'Unknown School';

  const handleEditClick = () => {
    // In a real application, you would navigate to an edit page or show an edit form
    alert("Edit functionality would be implemented here in a real application.");
    // You could also navigate to an edit page:
    // navigate(`/competitions/${competition.id}/edit`);
  };  
  
  // Check if this is the user's school's competition
  const isOwnSchoolCompetition = user?.schoolId === competition?.ownerSchoolId;
  
  // Check if user has permission to edit this competition
  const canEditCompetition = (user: User, comp: Competition): boolean => {
    // Platform admins can edit any competition
    if (user.role === 'PLATFORM_ADMIN') {
      return true;
    }
    
    // School admins can only edit competitions from their school
    if (user.role === 'SCHOOL_ADMIN' && user.schoolId === comp.ownerSchoolId) {
      return true;
    }
    
    // Students and other users cannot edit
    return false;
  };
  
  // Format visibility label
  const getVisibilityLabel = (visibility?: string) => {
    switch (visibility) {
      case 'PUBLIC':
        return 'Public - Visible to all schools';
      case 'PRIVATE':
        return 'Private - Only visible to school administrators';
      case 'RESTRICTED':
        return 'Restricted - Visible to selected schools';
      default:
        return 'Unknown visibility';
    }
  };
  
  // Determine if the competition is accessible due to restriction
  const isAccessibleViaRestriction = 
    competition?.visibility === 'RESTRICTED' && 
    !isOwnSchoolCompetition && 
    user?.schoolId && 
    competition.accessibleSchools?.includes(user.schoolId);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="loader">
          <svg className="animate-spin h-10 w-10 text-[#bb945c]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-red-50 border border-red-200 text-red-700 p-6 rounded"
      >
        <h2 className="text-lg font-medium mb-2">Error</h2>
        <p>{error}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/competitions')}
          className="mt-4 text-[#bb945c] hover:text-[#a07e4a]"
        >
          Return to Competitions
        </motion.button>
      </motion.div>
    );
  }
  
  if (!competition) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Competition not found</p>
        <button
          onClick={() => navigate('/competitions')}
          className="mt-4 text-[#bb945c] hover:text-[#a07e4a]"
        >
          Return to Competitions
        </button>
      </div>
    );
  }
  
  return (
    <PageTransition>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <motion.div 
          initial={{ backgroundColor: "rgba(24, 28, 42, 0)" }} 
          animate={{ backgroundColor: "rgba(24, 28, 42, 0.05)" }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="px-6 py-5 border-b border-gray-200"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">{competition.title}</h1>
                {isOwnSchoolCompetition && (
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-[#bb945c] bg-opacity-20 text-[#bb945c]">
                    Your School
                  </span>
                )}
                {isAccessibleViaRestriction && (
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-[#181c2a] bg-opacity-20 text-[#181c2a]">
                    Shared With You
                  </span>
                )}
              </div>
              
              <div className="flex items-center mt-2">
                <span className={`text-xs px-2 py-1 rounded-full mr-2 ${
                  competition.visibility === 'PUBLIC' 
                    ? 'bg-green-100 text-green-800' 
                    : competition.visibility === 'PRIVATE'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {competition.visibility}
                </span>
                
                <span className="text-sm text-gray-500">
                  Hosted by {schoolName}
                </span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 md:mt-0"
            >
              <div className="inline-flex items-center px-4 py-2 bg-[#bb945c] bg-opacity-10 rounded-lg">
                <svg className="w-5 h-5 text-[#bb945c] mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-[#bb945c]">
                  {new Date(competition.startDate).toLocaleDateString()} - {new Date(competition.endDate).toLocaleDateString()}
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        <div className="px-6 py-5">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6"
          >
            <h2 className="text-lg font-medium text-[#181c2a] mb-2">Description</h2>
            <p className="text-gray-600">{competition.description}</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-lg font-medium text-[#181c2a] mb-2">Details</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#bb945c] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Hosted by:</strong> {schoolName}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#bb945c] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span>
                    <strong>Start Date:</strong> {new Date(competition.startDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#bb945c] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span>
                    <strong>End Date:</strong> {new Date(competition.endDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#bb945c] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                  <span>
                    <strong>Visibility:</strong> {getVisibilityLabel(competition.visibility)}
                  </span>
                </li>
                {competition.visibility === 'RESTRICTED' && (
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#bb945c] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>
                      <strong>Access granted to:</strong>{' '}
                      {competition.accessibleSchools?.map((schoolId, idx, arr) => {
                        const school = schools.find(s => s.id === schoolId);
                        return (
                          <span key={schoolId}>
                            {school?.name || 'Unknown School'}
                            {idx < arr.length - 1 ? ', ' : ''}
                          </span>
                        );
                      })}
                    </span>
                  </li>
                )}
              </ul>
            </motion.div>
            
            {user && competition && canEditCompetition(user, competition) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h2 className="text-lg font-medium text-[#181c2a] mb-2">Admin Actions</h2>
                <div className="space-y-2 bg-[#181c2a] bg-opacity-5 p-4 rounded-lg">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleEditClick}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#bb945c] hover:bg-[#a07e4a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#bb945c] transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Competition
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center px-4 py-2 border border-[#bb945c] text-sm font-medium rounded-md text-[#bb945c] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#bb945c] transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Manage Participants
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Show participation options for students */}
          {user?.role === 'STUDENT' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-6 border-t border-gray-200 pt-6"
            >
              <h2 className="text-lg font-medium text-[#181c2a] mb-2">Participation</h2>
              <div className="bg-[#181c2a] bg-opacity-5 p-4 rounded-lg">
                <p className="text-sm text-[#181c2a] mb-4">
                  Join this competition to submit your entries and track your progress.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#bb945c] hover:bg-[#a07e4a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#bb945c] w-full md:w-auto transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  Join Competition
                </motion.button>
              </div>
            </motion.div>
          )}
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6 pt-6 border-t border-gray-200"
          >
            <motion.button
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/competitions')}
              className="inline-flex items-center text-[#bb945c] hover:text-[#a07e4a] transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Competitions
            </motion.button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}