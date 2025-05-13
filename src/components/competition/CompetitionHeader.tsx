// src/components/competition/CompetitionHeader.tsx
import React from 'react';
import { motion } from 'framer-motion';
import type { Competition } from '../../types';
import { schools } from '../../lib/mockData';

interface CompetitionHeaderProps {
  competition: Competition;
  isOwnSchoolCompetition: boolean;
  isAccessibleViaRestriction: boolean;
}

const CompetitionHeader: React.FC<CompetitionHeaderProps> = ({
  competition,
  isOwnSchoolCompetition,
  isAccessibleViaRestriction
}) => {
  // Get school name from ID
  const schoolName = competition?.ownerSchoolId 
    ? schools.find(s => s.id === competition.ownerSchoolId)?.name 
    : 'Unknown School';

  return (
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
  );
};

export default CompetitionHeader;