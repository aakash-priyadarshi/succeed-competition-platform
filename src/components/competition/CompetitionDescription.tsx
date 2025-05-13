// src/components/competition/CompetitionDescription.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface CompetitionDescriptionProps {
  description: string;
}

const CompetitionDescription: React.FC<CompetitionDescriptionProps> = ({ description }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-6"
    >
      <h2 className="text-lg font-medium text-[#181c2a] mb-2">Description</h2>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default CompetitionDescription;