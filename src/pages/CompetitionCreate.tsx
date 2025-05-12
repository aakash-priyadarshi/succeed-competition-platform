// src/pages/CompetitionCreate.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import type { CompetitionFormData, Visibility } from '../types';
import { schools } from '../lib/mockData';
import Card, { CardHeader, CardBody, CardFooter } from '../components/Card';
import Button from '../components/Button';
import { Input, Textarea, Select } from '../components/FormElements';

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
    
    // For restricted visibility, ensure at least one school is selected
    if (visibility === 'RESTRICTED' && accessibleSchools.length === 0) {
      setError('Please select at least one school for restricted visibility');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    // Prepare form data
    const formData: CompetitionFormData = {
      title,
      description,
      startDate,
      endDate,
      visibility,
      accessibleSchools: visibility === 'RESTRICTED' ? accessibleSchools : undefined,
    };
    
    try {
      console.log('Creating competition with data:', formData);
      // Make sure user is passed to the API call
      const newCompetition = await api.createCompetition(formData, user);
      console.log('Competition created:', newCompetition);
      navigate('/competitions');
    } catch (err: any) {
      console.error('Failed to create competition:', err);
      setError(`Failed to create competition: ${err.message || 'Unknown error'}`);
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
        <Button 
          variant="outline" 
          onClick={() => navigate('/competitions')}
          className="mt-4"
        >
          Return to Competitions
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Competition</h1>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          {error}
        </div>
      )}
      
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <h2 className="text-lg font-medium">Competition Details</h2>
          </CardHeader>
          
          <CardBody>
            <Input
              id="title"
              label="Competition Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter competition title"
              required
            />
            
            <Textarea
              id="description"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide details about the competition"
              rows={4}
              required
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                id="startDate"
                label="Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
              
              <Input
                id="endDate"
                label="End Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            
            <Select
              id="visibility"
              label="Visibility"
              value={visibility}
              onChange={(e) => setVisibility(e.target.value as Visibility)}
              options={[
                { value: 'PRIVATE', label: 'Private - Only visible to your school' },
                { value: 'PUBLIC', label: 'Public - Visible to all schools' },
                { value: 'RESTRICTED', label: 'Restricted - Visible to selected schools' },
              ]}
            />
            
            {visibility === 'RESTRICTED' && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Schools with Access
                </label>
                {selectableSchools.length === 0 ? (
                  <p className="text-sm text-gray-500">No other schools available</p>
                ) : (
                  <div className="space-y-2 border border-gray-200 rounded-md p-4 max-h-60 overflow-y-auto">
                    {selectableSchools.map(school => (
                      <div key={school.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`school-${school.id}`}
                          checked={accessibleSchools.includes(school.id)}
                          onChange={() => handleSchoolSelection(school.id)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`school-${school.id}`} className="ml-2 block text-sm text-gray-700">
                          {school.name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
                {visibility === 'RESTRICTED' && accessibleSchools.length === 0 && (
                  <p className="mt-1 text-sm text-red-600">
                    Please select at least one school or change visibility.
                  </p>
                )}
              </div>
            )}
          </CardBody>
          
          <CardFooter className="flex justify-end space-x-3">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => navigate('/competitions')}
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting || (visibility === 'RESTRICTED' && accessibleSchools.length === 0)}
            >
              Create Competition
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}