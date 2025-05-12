import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import type { Competition } from '../types';
import { schools } from '../lib/mockData';

export default function CompetitionDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchCompetition = async () => {
      if (!id || !user) return;
      
      setIsLoading(true);
      try {
        const data = await api.getCompetition(id, user);
        setCompetition(data);
        setError('');
      } catch (err) {
        console.error('Failed to fetch competition:', err);
        setError('You do not have permission to view this competition or it does not exist.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCompetition();
  }, [id, user]);
  
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
        return 'Private - Only visible to your school';
      case 'RESTRICTED':
        return 'Restricted - Visible to selected schools';
      default:
        return 'Unknown visibility';
    }
  };
  
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loading competition details...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded">
        <h2 className="text-lg font-medium mb-2">Error</h2>
        <p>{error}</p>
        <button
          onClick={() => navigate('/competitions')}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Return to Competitions
        </button>
      </div>
    );
  }
  
  if (!competition) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Competition not found</p>
        <button
          onClick={() => navigate('/competitions')}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Return to Competitions
        </button>
      </div>
    );
  }
  
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold text-gray-900">{competition.title}</h1>
          <span className={`text-xs px-2 py-1 rounded-full ${
            competition.visibility === 'PUBLIC' 
              ? 'bg-green-100 text-green-800' 
              : competition.visibility === 'PRIVATE'
              ? 'bg-gray-100 text-gray-800'
              : 'bg-blue-100 text-blue-800'
          }`}>
            {competition.visibility}
          </span>
        </div>
      </div>
      
      <div className="px-6 py-5">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Description</h2>
          <p className="text-gray-600">{competition.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">Details</h2>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Hosted by:</strong> {schoolName}</li>
              <li>
                <strong>Start Date:</strong> {new Date(competition.startDate).toLocaleDateString()}
              </li>
              <li>
                <strong>End Date:</strong> {new Date(competition.endDate).toLocaleDateString()}
              </li>
              <li>
                <strong>Visibility:</strong> {getVisibilityLabel(competition.visibility)}
              </li>
            </ul>
          </div>
          
          {user?.role === 'SCHOOL_ADMIN' && competition.ownerSchoolId === user.schoolId && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">Admin Actions</h2>
              <div className="space-y-2">
                <button className="text-blue-600 hover:text-blue-800">
                  Edit Competition
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={() => navigate('/competitions')}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Back to Competitions
          </button>
        </div>
      </div>
    </div>
  );
}