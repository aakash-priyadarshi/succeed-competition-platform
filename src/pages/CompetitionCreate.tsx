import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import type { CompetitionFormData, Visibility } from '../types';
import { schools } from '../lib/mockData';

export default function CompetitionCreate() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>('PRIVATE');
  const [accessibleSchools, setAccessibleSchools] = useState<string[]>([]);
  
  // Check if user is authorized to create competitions
  const isAuthorized = user?.role === 'SCHOOL_ADMIN' || user?.role === 'PLATFORM_ADMIN';
  
  // Get schools that can be selected for restricted access
  // Filter out the current user's school
  const selectableSchools = schools.filter(school => school.id !== user?.schoolId);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthorized || !user) {
      setError('You do not have permission to create competitions');
      return;
    }
    
    // Basic validation
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!description.trim()) {
      setError('Description is required');
      return;
    }
    
    if (!startDate) {
      setError('Start date is required');
      return;
    }
    
    if (!endDate) {
      setError('End date is required');
      return;
    }
    
    // Ensure end date is after start date
    if (new Date(endDate) <= new Date(startDate)) {
      setError('End date must be after start date');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    const formData: CompetitionFormData = {
      title,
      description,
      startDate,
      endDate,
      visibility,
      accessibleSchools: visibility === 'RESTRICTED' ? accessibleSchools : undefined,
    };
    
    try {
      await api.createCompetition(formData, user);
      navigate('/competitions');
    } catch (err) {
      console.error('Failed to create competition:', err);
      setError('Failed to create competition. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle school selection for restricted visibility
  const handleSchoolSelection = (schoolId: string) => {
    if (accessibleSchools.includes(schoolId)) {
      setAccessibleSchools(accessibleSchools.filter(id => id !== schoolId));
    } else {
      setAccessibleSchools([...accessibleSchools, schoolId]);
    }
  };
  
  if (!isAuthorized) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded">
        <h2 className="text-lg font-medium mb-2">Permission Denied</h2>
        <p>You do not have permission to create competitions.</p>
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
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Competition</h1>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Visibility
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="private"
                    type="radio"
                    value="PRIVATE"
                    checked={visibility === 'PRIVATE'}
                    onChange={() => setVisibility('PRIVATE')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="private" className="ml-2 block text-sm text-gray-700">
                    Private - Only visible to your school
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="public"
                    type="radio"
                    value="PUBLIC"
                    checked={visibility === 'PUBLIC'}
                    onChange={() => setVisibility('PUBLIC')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="public" className="ml-2 block text-sm text-gray-700">
                    Public - Visible to all schools
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="restricted"
                    type="radio"
                    value="RESTRICTED"
                    checked={visibility === 'RESTRICTED'}
                    onChange={() => setVisibility('RESTRICTED')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="restricted" className="ml-2 block text-sm text-gray-700">
                    Restricted - Visible to selected schools
                  </label>
                </div>
              </div>
            </div>
            
            {visibility === 'RESTRICTED' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Schools with Access
                </label>
                <div className="border border-gray-300 rounded-md p-4 max-h-60 overflow-y-auto">
                  {selectableSchools.length === 0 ? (
                    <p className="text-gray-500 text-sm">No other schools available</p>
                  ) : (
                    <div className="space-y-2">
                      {selectableSchools.map(school => (
                        <div key={school.id} className="flex items-center">
                          <input
                            id={`school-${school.id}`}
                            type="checkbox"
                            checked={accessibleSchools.includes(school.id)}
                            onChange={() => handleSchoolSelection(school.id)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`school-${school.id}`} className="ml-2 block text-sm text-gray-700">
                            {school.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {visibility === 'RESTRICTED' && accessibleSchools.length === 0 && (
                  <p className="text-sm text-red-500 mt-1">
                    Please select at least one school or change visibility.
                  </p>
                )}
              </div>
            )}
            
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => navigate('/competitions')}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting || (visibility === 'RESTRICTED' && accessibleSchools.length === 0)}
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  (isSubmitting || (visibility === 'RESTRICTED' && accessibleSchools.length === 0)) 
                    ? 'opacity-70 cursor-not-allowed' 
                    : ''
                }`}
              >
                {isSubmitting ? 'Creating...' : 'Create Competition'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}