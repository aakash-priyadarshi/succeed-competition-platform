// src/lib/api.ts
import type { Competition, User, CompetitionFormData } from '../types';
import { competitions as mockCompetitions } from './mockData';

/**
 * Helper function to check if a user can access a competition based on
 * visibility settings and tenant (school) membership
 */
function canUserAccessCompetition(user: User, competition: Competition): boolean {
  // Platform admins can access everything
  if (user.role === 'PLATFORM_ADMIN') {
    return true;
  }
  
  // Anyone can access public competitions
  if (competition.visibility === 'PUBLIC') {
    return true;
  }
  
  // Check school membership
  if (competition.ownerSchoolId === user.schoolId) {
    // School admins can access all competitions from their school
    if (user.role === 'SCHOOL_ADMIN') {
      return true;
    }
    
    // Students cannot access private competitions, even from their own school
    if (user.role === 'STUDENT' && competition.visibility === 'PRIVATE') {
      return false;
    }
    
    // Students can access public and restricted competitions from their school
    return true;
  }
  
  // Users can access restricted competitions if their school has access
  if (competition.visibility === 'RESTRICTED' && 
      user.schoolId && 
      competition.accessibleSchools?.includes(user.schoolId)) {
    return true;
  }
  
  // No access by default
  return false;
}

/**
 * Mock API service
 * This simulates how a real API would handle tenant isolation and permissions
 */
export const api = {
  /**
   * Get all competitions visible to the current user
   */
getCompetitions: async (user: User): Promise<Competition[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (!user) {
    return [];
  }
  
  // Platform admins can see all competitions
  if (user.role === 'PLATFORM_ADMIN') {
    return [...mockCompetitions];
  }
  
  // Use the helper function to filter competitions
  return mockCompetitions.filter(comp => canUserAccessCompetition(user, comp));
},

getCompetition: async (id: string, user: User): Promise<Competition> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const competition = mockCompetitions.find(c => c.id === id);
  
  if (!competition) {
    throw new Error('Competition not found');
  }
  
  // Use the helper function to check access
  if (canUserAccessCompetition(user, competition)) {
    return { ...competition };
  }
  
  throw new Error('You do not have permission to view this competition');
},
/**
   * Create a new competition
   */
  createCompetition: async (data: CompetitionFormData, user: User): Promise<Competition> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Validate user permissions
    if (user.role !== 'SCHOOL_ADMIN' && user.role !== 'PLATFORM_ADMIN') {
      throw new Error('Only administrators can create competitions');
    }
    
    // Generate a new ID (would be done by the database in a real app)
    const newId = (mockCompetitions.length + 1).toString();
    
    // For school admins, ensure they only create for their own school
    let ownerSchoolId = user.schoolId;
    
    // Platform admins could potentially create for any school
    if (user.role === 'PLATFORM_ADMIN') {
      // In a real application, this would be selected in the UI
      // For the prototype, we'll use the first school if schoolId is null
      ownerSchoolId = user.schoolId || '1';
    }
    
    if (!ownerSchoolId) {
      throw new Error('Owner school ID is required');
    }
    
    // Create the new competition
    const newCompetition: Competition = {
      id: newId,
      title: data.title,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      ownerSchoolId,
      visibility: data.visibility,
      accessibleSchools: data.visibility === 'RESTRICTED' ? data.accessibleSchools : undefined,
    };
    
    // In a real app, this would save to a database
    mockCompetitions.push(newCompetition);
    
    return { ...newCompetition };
  }
};