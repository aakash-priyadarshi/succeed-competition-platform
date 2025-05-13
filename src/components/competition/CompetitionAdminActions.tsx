// src/components/competition/CompetitionAdminActions.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface CompetitionAdminActionsProps {
  onEdit: () => void;
  onManageParticipants: () => void;
}

const CompetitionAdminActions: React.FC<CompetitionAdminActionsProps> = ({
  onEdit,
  onManageParticipants
}) => {
  return (
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
          onClick={onEdit}
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
          onClick={onManageParticipants}
          className="w-full flex items-center justify-center px-4 py-2 border border-[#bb945c] text-sm font-medium rounded-md text-[#bb945c] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#bb945c] transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Manage Participants
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CompetitionAdminActions;