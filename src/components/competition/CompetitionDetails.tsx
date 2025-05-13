// src/components/competition/CompetitionDetails.tsx
import React from 'react';
import { motion } from 'framer-motion';
import type { Competition } from '../../types';
import { schools } from '../../lib/mockData';

interface CompetitionDetailsProps {
  competition: Competition;
}

const CompetitionDetails: React.FC<CompetitionDetailsProps> = ({ competition }) => {
  // Get school name from ID
  const schoolName = competition?.ownerSchoolId 
    ? schools.find(s => s.id === competition.ownerSchoolId)?.name 
    : 'Unknown School';

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

  return (
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
  );
};

export default CompetitionDetails;