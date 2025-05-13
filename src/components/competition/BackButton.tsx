// src/components/competition/BackButton.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default BackButton;