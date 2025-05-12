# Succeed Competition Platform

A multi-tenant platform that allows schools to run and manage competitions for their students with granular visibility controls.

## Overview

This prototype demonstrates a scalable architecture for a multi-tenant competition management system. It implements tenant isolation, role-based permissions, and flexible visibility settings for competitions.

## Architecture Design

### Multi-Tenant Approach

I've implemented a **Row-Level Tenant Isolation** approach where:

- Each competition has an `ownerSchoolId` that identifies its tenant
- Access control is applied at the service layer
- Data filtering is based on the current user's school and competition visibility settings

This approach was chosen because:
- It's simple to implement and understand
- It provides strong security with proper access control
- It's flexible for extending to more complex scenarios
- It works well with PostgreSQL's Row-Level Security in a production environment

### Visibility Model

Competitions have three visibility levels:

- **Private**: Only visible to the owner school
- **Public**: Visible to all schools and students
- **Restricted**: Visible only to specifically selected schools

This model provides flexibility while maintaining data isolation where needed.

### Authorization Strategy

The application implements a role-based access control system with:

- **School Admin**: Can create and manage competitions for their school
- **Platform Admin**: Has global access to all competitions
- **Student**: (Not implemented in prototype, but architecture supports this role)

Authorization checks are performed at the service layer to ensure proper data isolation.

## Technical Implementation

### Database Schema (Modeled in mock data)

The core entities in the system are:

1. **Schools (Tenants)**: Represent educational institutions
2. **Users**: Administrators with role-based permissions
3. **Competitions**: Events created by schools with visibility settings

### Frontend Architecture

The frontend uses:

- **React & TypeScript**: For type-safe component development
- **React Router**: For navigation
- **Context API**: For global state (auth, current tenant)
- **TailwindCSS**: For styling

### Backend Architecture (Simulated)

The prototype includes a simulated API layer that demonstrates:

- **Multi-tenant filtering**: Only returning data visible to the current user's school
- **Permission checks**: Enforcing role-based access control
- **Data isolation**: Preventing cross-tenant data access

In a real implementation, this would be built with:
- Node.js/Express backend
- PostgreSQL with Row-Level Security
- JWT-based authentication

## Scaling Considerations

In a production environment, this architecture would scale through:

1. **Database Indexing**: Adding indices on tenant IDs and join tables
2. **Caching**: Implementing Redis for frequently accessed data
3. **API Optimizations**: Pagination, filtering, and efficient joins
4. **Infrastructure**: Horizontal scaling with load balancing

## Security Measures

The prototype demonstrates several security patterns:

1. **Tenant Isolation**: Data filtered by tenant at the service layer
2. **Authorization Checks**: Role-based permissions enforced consistently
3. **Input Validation**: Basic form validation with error handling
4. **Safe Data Access**: Checks before allowing competition access

## Setup and Usage

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install