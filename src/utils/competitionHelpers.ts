// src/utils/competitionHelpers.ts
import type { Competition, User } from '../types';

/**
 * Check if a user has permission to edit a competition
 */
export const canEditCompetition = (user: User, competition: Competition): boolean => {
  // Platform admins can edit any competition
  if (user.role === 'PLATFORM_ADMIN') {
    return true;
  }
  
  // School admins can only edit competitions from their school
  if (user.role === 'SCHOOL_ADMIN' && user.schoolId === competition.ownerSchoolId) {
    return true;
  }
  
  // Students and other users cannot edit
  return false;
};

/**
 * Check if competition is from user's school
 */
export const isOwnSchoolCompetition = (user: User | null, competition: Competition): boolean => {
  return !!user?.schoolId && user.schoolId === competition.ownerSchoolId;
};

/**
 * Check if competition is accessible via restriction
 */
export const isAccessibleViaRestriction = (
  user: User | null, 
  competition: Competition
): boolean => {
  return (
    competition.visibility === 'RESTRICTED' && 
    !isOwnSchoolCompetition(user, competition) && 
    !!user?.schoolId && 
    !!competition.accessibleSchools?.includes(user.schoolId)
  );
};