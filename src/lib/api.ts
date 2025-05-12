// Simulated API service
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
  
  // School admins can access their own school's competitions
  if (competition.ownerSchoolId === user.schoolId) {
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
    
    // If not logged in, return nothing
    if (!user) {
      return [];
    }
    
    // Filter competitions based on tenant visibility rules
    return [...mockCompetitions].filter(comp => canUserAccessCompetition(user, comp));
  },
  
  /**
   * Get a single competition by ID
   */
  getCompetition: async (id: string, user: User): Promise<Competition> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const competition = mockCompetitions.find(c => c.id === id);
    
    if (!competition) {
      throw new Error('Competition not found');
    }
    
    if (!canUserAccessCompetition(user, competition)) {
      throw new Error('You do not have permission to access this competition');
    }
    
    return { ...competition };
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
    
    // For school admins, use their school ID
    // For platform admins, this would typically be specified in the form
    const ownerSchoolId = user.role === 'SCHOOL_ADMIN' ? user.schoolId : 
                          (user.role === 'PLATFORM_ADMIN' && data.accessibleSchools?.[0]) ? 
                          data.accessibleSchools[0] : user.schoolId;
    
    if (!ownerSchoolId) {
      throw new Error('Owner school ID is required');
    }
    
    const newCompetition: Competition = {
      id: newId,
      ...data,
      ownerSchoolId
    };
    
    // In a real app, this would save to a database
    mockCompetitions.push(newCompetition);
    
    return { ...newCompetition };
  } 
}