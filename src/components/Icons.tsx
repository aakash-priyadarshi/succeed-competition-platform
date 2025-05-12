// src/components/Icons.tsx
export const StarIcon = ({ className = "w-6 h-6" }) => (
  <svg 
    className={className} 
    fill="currentColor" 
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      fillRule="evenodd" 
      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" 
      clipRule="evenodd" 
    />
  </svg>
);

export const PlusIcon = ({ className = "w-6 h-6" }) => (
  <svg 
    className={className} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

export const UserIcon = ({ className = "w-6 h-6" }) => (
  <svg 
    className={className} 
    fill="currentColor" 
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

export const CalendarIcon = ({ className = "w-6 h-6" }) => (
  <svg 
    className={className} 
    fill="currentColor" 
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
  </svg>
);

export const LightBulbIcon = ({ className = "w-6 h-6" }) => (
  <svg 
    className={className} 
    fill="currentColor" 
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
  </svg>
);

export const CodeIcon = ({ className = "w-6 h-6" }) => (
  <svg 
    className={className} 
    fill="currentColor" 
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

export const DocumentIcon = ({ className = "w-6 h-6" }) => (
  <svg 
    className={className} 
    fill="currentColor" 
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
  </svg>
);

export const PuzzleIcon = ({ className = "w-6 h-6" }) => (
  <svg 
    className={className} 
    fill="currentColor" 
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
  </svg>
);

export const SpinnerIcon = ({ className = "w-6 h-6" }) => (
  <svg 
    className={className + " animate-spin"} 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const InfoIcon = ({ className = "w-6 h-6" }) => (
  <svg 
    className={className} 
    fill="currentColor" 
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
  </svg>
);

export const ChevronLeftIcon = ({ className = "w-6 h-6" }) => (
  <svg 
    className={className} 
    fill="currentColor" 
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
  </svg>
);