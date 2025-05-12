import React from 'react';
import { Link } from 'react-router-dom';
import type { Competition } from '../types';
import { schools } from '../lib/mockData';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

interface CompetitionCardProps {
  competition: Competition;
  index?: number;
}

const CompetitionCard: React.FC<CompetitionCardProps> = ({ competition, index = 0 }) => {
  const { user } = useAuth();
  // Get school name from ID
  const school = schools.find(s => s.id === competition.ownerSchoolId);
  
  // Check if this is the user's school's competition
  const isOwnSchoolCompetition = user?.schoolId === competition.ownerSchoolId;
  
  // Calculate days remaining
  const getDaysRemaining = () => {
    const endDate = new Date(competition.endDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Competition ended';
    if (diffDays === 0) return 'Last day!';
    return `${diffDays} days remaining`;
  };
  
  // For the "View Details" button
  <Link 
  to={`/competitions/${competition.id}`}
  className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primaryDark transition-colors duration-200"
>
  View Details
</Link>


  // Get visibility badge color
  const getVisibilityBadgeClass = () => {
    switch (competition.visibility) {
      case 'PUBLIC':
        return 'bg-green-100 text-green-800';
      case 'PRIVATE':
        return 'bg-gray-100 text-gray-800';
      case 'RESTRICTED':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Determine if the competition is accessible due to restriction
  const isAccessibleViaRestriction = 
    competition.visibility === 'RESTRICTED' && 
    !isOwnSchoolCompetition && 
    user?.schoolId && 
    competition.accessibleSchools?.includes(user.schoolId);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold text-gray-900">{competition.title}</h2>
              {isOwnSchoolCompetition && (
                <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
                  Your School
                </span>
              )}
              {isAccessibleViaRestriction && (
                <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                  Shared With You
                </span>
              )}
            </div>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${getVisibilityBadgeClass()}`}>
            {competition.visibility === 'PUBLIC' ? 'Public' : 
             competition.visibility === 'PRIVATE' ? 'Private' : 'Restricted'}
          </span>
        </div>
        
        <p className="text-gray-600 mt-3 line-clamp-2">{competition.description}</p>
        
        {competition.visibility === 'RESTRICTED' && (
          <div className="mt-2 text-xs text-gray-500">
            <span className="font-medium">Access granted to: </span>
            {competition.accessibleSchools?.map((schoolId, idx, arr) => {
              const school = schools.find(s => s.id === schoolId);
              return (
                <span key={schoolId} className="italic">
                  {school?.name || 'Unknown School'}
                  {idx < arr.length - 1 ? ', ' : ''}
                </span>
              );
            })}
          </div>
        )}
        
        <div className="mt-4 border-t border-gray-100 pt-4">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              {school?.name || 'Unknown School'}
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {new Date(competition.startDate).toLocaleDateString()} - {new Date(competition.endDate).toLocaleDateString()}
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs font-medium text-indigo-600">
            {getDaysRemaining()}
          </span>
          
          <Link 
            to={`/competitions/${competition.id}`}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-colors duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CompetitionCard;