// Mock data for development
import type { School, User, Competition } from '../types';

/**
 * Mock schools data (tenants)
 */
export const schools: School[] = [
  {
    id: '1',
    name: 'Springfield High School',
    subdomain: 'springfield'
  },
  {
    id: '2',
    name: 'Riverdale Academy',
    subdomain: 'riverdale'
  },
  {
    id: '3',
    name: 'Westview High',
    subdomain: 'westview'
  }
];

/**
 * Mock users data
 */
export const users: User[] = [
  {
    id: '1',
    email: 'admin@springfield.edu',
    firstName: 'John',
    lastName: 'Smith',
    role: 'SCHOOL_ADMIN',
    schoolId: '1'
  },
  {
    id: '2',
    email: 'admin@riverdale.edu',
    firstName: 'Jane',
    lastName: 'Doe',
    role: 'SCHOOL_ADMIN',
    schoolId: '2'
  },
  {
    id: '3',
    email: 'admin@westview.edu',
    firstName: 'Robert',
    lastName: 'Johnson',
    role: 'SCHOOL_ADMIN',
    schoolId: '3'
  },
  {
    id: '4',
    email: 'admin@succeed.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'PLATFORM_ADMIN',
    schoolId: null
  }
];

/**
 * Mock competitions data
 */
export const competitions: Competition[] = [
  {
    id: '1',
    title: 'Math Challenge 2025',
    description: 'Annual mathematics competition testing problem-solving skills.',
    startDate: '2025-06-01',
    endDate: '2025-06-10',
    ownerSchoolId: '1', // Springfield High School
    visibility: 'PRIVATE'
  },
  {
    id: '2',
    title: 'National Science Fair',
    description: 'Showcase your scientific discoveries and innovations.',
    startDate: '2025-07-15',
    endDate: '2025-07-20',
    ownerSchoolId: '1', // Springfield High School
    visibility: 'PUBLIC'
  },
  {
    id: '3',
    title: 'Coding Competition',
    description: 'Test your programming skills in this timed challenge.',
    startDate: '2025-06-15',
    endDate: '2025-06-20',
    ownerSchoolId: '2', // Riverdale Academy
    visibility: 'RESTRICTED',
    accessibleSchools: ['1', '3'] // Springfield and Westview have access
  },
  {
    id: '4',
    title: 'Literary Essay Contest',
    description: 'Submit your best essay on this year\'s theme: "The Future of Learning".',
    startDate: '2025-08-01',
    endDate: '2025-08-30',
    ownerSchoolId: '2', // Riverdale Academy
    visibility: 'PRIVATE'
  },
  {
    id: '5',
    title: 'Environmental Project Challenge',
    description: 'Develop solutions for local environmental issues.',
    startDate: '2025-09-01',
    endDate: '2025-10-01',
    ownerSchoolId: '3', // Westview High
    visibility: 'PUBLIC'
  }
];