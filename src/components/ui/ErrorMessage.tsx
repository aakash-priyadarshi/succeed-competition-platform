// src/components/ui/ErrorMessage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface ErrorMessageProps {
  message: string;
  redirectTo?: string;
  redirectLabel?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  redirectTo = '/competitions',
  redirectLabel = 'Return to Competitions'
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-red-50 border border-red-200 text-red-700 p-6 rounded"
    >
      <h2 className="text-lg font-medium mb-2">Error</h2>
      <p>{message}</p>
      {redirectTo && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(redirectTo)}
          className="mt-4 text-[#bb945c] hover:text-[#a07e4a]"
        >
          {redirectLabel}
        </motion.button>
      )}
    </motion.div>
  );
};

export default ErrorMessage;