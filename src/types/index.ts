// Core type definitions for the application

/**
 * User roles in the system
 */
export type Role = 'STUDENT' | 'SCHOOL_ADMIN' | 'PLATFORM_ADMIN';

/**
 * Competition visibility options
 */
export type Visibility = 'PRIVATE' | 'PUBLIC' | 'RESTRICTED';

/**
 * User entity
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  schoolId: string | null; // null for platform admins
}

/**
 * School (tenant) entity
 */
export interface School {
  id: string;
  name: string;
  subdomain: string;
}

/**
 * Competition entity
 */
export interface Competition {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  ownerSchoolId: string; // The tenant that owns this competition
  visibility: Visibility;
  accessibleSchools?: string[]; // For RESTRICTED competitions, list of school IDs with access
}

/**
 * Form data for creating a competition
 */
export interface CompetitionFormData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  visibility: Visibility;
  accessibleSchools?: string[];
}