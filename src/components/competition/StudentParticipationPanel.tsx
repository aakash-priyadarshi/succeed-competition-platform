// src/components/competition/StudentParticipationPanel.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface StudentParticipationPanelProps {
  isJoining: boolean;
  hasJoined: boolean;
  onJoin: () => void;
}

const StudentParticipationPanel: React.FC<StudentParticipationPanelProps> = ({
  isJoining,
  hasJoined,
  onJoin
}) => {
  return (
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
          onClick={onJoin}
          disabled={isJoining || hasJoined}
          className={`flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#bb945c] hover:bg-[#a07e4a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#bb945c] w-full md:w-auto transition-colors duration-200 ${
            (isJoining || hasJoined) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isJoining ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Joining...
            </>
          ) : hasJoined ? (
            <>
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Joined
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Join Competition
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default StudentParticipationPanel;