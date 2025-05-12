import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import type { Competition } from '../types';
import CompetitionCard from '../components/CompetitionCard';
import { schools } from '../lib/mockData';

export default function CompetitionsList() {
  const { user } = useAuth();
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Get current user's school name
  const userSchool = user?.schoolId ? schools.find(s => s.id === user.schoolId)?.name : null;
  
  // Fetch competitions when component mounts
  useEffect(() => {
    const fetchCompetitions = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const data = await api.getCompetitions(user);
        setCompetitions(data);
        setError('');
      } catch (err) {
        console.error('Failed to fetch competitions:', err);
        setError('Failed to load competitions. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCompetitions();
  }, [user]);
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Competitions</h1>
          {userSchool && (
            <p className="text-gray-600">
              {user?.role === 'SCHOOL_ADMIN' 
                ? `Managing competitions for ${userSchool}`
                : `Viewing competitions for ${userSchool}`}
            </p>
          )}
        </div>
        
        {(user?.role === 'SCHOOL_ADMIN' || user?.role === 'PLATFORM_ADMIN') && (
          <Link 
            to="/competitions/new"
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create New Competition
          </Link>
        )}
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading competitions...</p>
        </div>
      ) : competitions.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">No competitions found.</p>
          {user?.role === 'SCHOOL_ADMIN' && (
            <p className="mt-2">
              <Link to="/competitions/new" className="text-blue-600 hover:text-blue-800">
                Create your first competition
              </Link>
            </p>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {competitions.map((competition) => (
            <CompetitionCard key={competition.id} competition={competition} />
          ))}
        </div>
      )}
    </div>
  );
}