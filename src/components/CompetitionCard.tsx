import type { Competition } from '../types';
import { Link } from 'react-router-dom';
import { schools } from '../lib/mockData';

interface CompetitionCardProps {
  competition: Competition;
}

export default function CompetitionCard({ competition }: CompetitionCardProps) {
  // Get school name from ID
  const school = schools.find(s => s.id === competition.ownerSchoolId);
  
  // Format visibility badge
  const getVisibilityBadge = (visibility: string) => {
    switch (visibility) {
      case 'PUBLIC':
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Public</span>;
      case 'PRIVATE':
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Private</span>;
      case 'RESTRICTED':
        return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Restricted</span>;
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">{competition.title}</h2>
          {getVisibilityBadge(competition.visibility)}
        </div>
        
        <p className="text-gray-600 text-sm mb-3">{competition.description}</p>
        
        <div className="mt-4 text-sm text-gray-500 space-y-1">
          <p>Hosted by: {school?.name || 'Unknown School'}</p>
          <p>
            Dates: {new Date(competition.startDate).toLocaleDateString()} - {new Date(competition.endDate).toLocaleDateString()}
          </p>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <Link 
            to={`/competitions/${competition.id}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}