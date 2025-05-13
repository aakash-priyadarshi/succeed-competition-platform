# Succeed Competition Platform 🏆

<div align="center">
  
![GitHub stars](https://img.shields.io/github/stars/aakash-priyadarshi/succeed-competition-platform?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/aakash-priyadarshi/succeed-competition-platform?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/aakash-priyadarshi/succeed-competition-platform?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)
  
</div>



<p align="center">
  A sophisticated multi-tenant competition platform enabling educational institutions to create, manage, and participate in academic competitions with powerful isolation and visibility controls.
</p>

<p align="center">
  <a href="#-key-features">Key Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#%EF%B8%8F-architecture">Architecture</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-development">Development</a> •
  <a href="#-demo-credentials">Demo Credentials</a> •
  <a href="#-architectural-decisions">Architectural Decisions</a> •
  <a href="#-performance-optimizations">Performance Optimizations</a> •
  <a href="#-future-enhancements">Future Enhancements</a>
</p>

---

## ✨ Key Features

- **Multi-Tenant Architecture** - Complete data isolation between schools with row-level security
- **Flexible Visibility Model** - Private, Public, and Restricted competition visibility options
- **Role-Based Access Control** - Custom permissions for Platform Admins, School Admins, and Students
- **Responsive Design** - Seamless experience across all device sizes
- **Fluid Animations** - Polished user interface with thoughtful micro-interactions
- **TypeScript** - Fully typed codebase ensuring robust development
- **Performance Optimized** - Lazy loading, code splitting, and other optimization techniques

## 🛠 Tech Stack

<div align="center">
  
| Technology | Purpose | Documentation |
|------------|---------|---------------|
| <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="20" height="20"/> React 19 | UI Library | [Docs](https://react.dev) |
| <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" width="20" height="20"/> TypeScript | Type Safety | [Docs](https://www.typescriptlang.org/docs/) |
| <img src="https://vitejs.dev/logo.svg" width="20" height="20"/> Vite | Build Tool | [Docs](https://vitejs.dev/) |
| <img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.d52e9897.svg" width="20" height="20"/> TailwindCSS | Styling | [Docs](https://tailwindcss.com/docs) |
| <img src="https://cdn.worldvectorlogo.com/logos/framer-motion.svg" width="20" height="20"/> Framer Motion | Animations | [Docs](https://www.framer.com/motion/) |
| <img src="https://reactrouter.com/favicon.ico" width="20" height="20"/> React Router | Routing | [Docs](https://reactrouter.com/) |
| <img src="https://react-hook-form.com/images/logo/react-hook-form-logo-only.svg" width="20" height="20"/> React Hook Form | Form Handling | [Docs](https://react-hook-form.com/) |
| <img src="https://raw.githubusercontent.com/colinhacks/zod/master/logo.svg" width="20" height="20"/> Zod | Validation | [Docs](https://zod.dev/) |
| <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/eslint/eslint-original.svg" width="20" height="20"/> ESLint | Linting | [Docs](https://eslint.org/) |

</div>

## 🏗️ Architecture

This application implements a sophisticated multi-tenant architecture:

```
src/
├── components/        # Reusable UI components 
├── context/           # Global state management
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and mock API
├── pages/             # Application views
└── types/             # TypeScript interfaces
```

The platform leverages:

- **Context API** for global state management
- **Custom hooks** for business logic and data fetching
- **Component composition** for maximum reusability
- **TypeScript interfaces** for robust type checking

[View detailed architecture document](./ARCHITECTURE.md)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- npm 8+ (comes with Node.js)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/aakash-priyadarshi/succeed-competition-platform.git
   cd succeed-competition-platform
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 💻 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |

### Folder Structure Philosophy

The project follows a feature-based organization pattern:

- **Components**: Reusable UI elements with their own styles
- **Pages**: Complete views composed of multiple components
- **Context**: Global state management with React Context API
- **Hooks**: Custom React hooks for shared logic and API calls
- **Lib**: Utility functions and service layers

## 🔑 Demo Credentials

The prototype includes several demo accounts for testing different roles:

| Role | Email | School |
|------|-------|--------|
| School Admin | admin@springfield.edu | Springfield High School |
| School Admin | admin@riverdale.edu | Riverdale Academy |
| Platform Admin | admin@succeed.com | (All Schools) |
| Student | student@springfield.edu | Springfield High School |

*Note: In the prototype, any password will work for demonstration purposes.*

## 🧠 Architectural Decisions

### Multi-Tenancy Approach

I've implemented a **Row-Level Tenant Isolation** approach where:

- Each entity has a tenant identifier (e.g., `ownerSchoolId`)
- Access control is applied at the service layer
- Data filtering based on current user's school and competition visibility

This approach was chosen because:
- It provides robust security with proper access control
- It's flexible for extending to more complex scenarios
- It works well with PostgreSQL's Row-Level Security for a real implementation

### Visibility Model

Competitions have three visibility levels:

- **Private**: Only visible to the owner school
- **Public**: Visible to all schools and students
- **Restricted**: Visible only to specifically selected schools

This model offers flexibility while maintaining data isolation where needed.

### State Management Strategy

The application uses React Context API for global state management, choosing it over Redux for:

- Simpler implementation for this use case
- Reduced boilerplate code
- Native React solution with hooks
- Better performance for this specific application

## 🚀 Performance Optimizations

The application implements several performance optimizations:

- **Code Splitting**: Components are loaded dynamically when needed
- **Memoization**: React.memo and useMemo used for expensive computations
- **Virtualization**: Only rendering visible items in long lists
- **Optimized Animations**: Using Framer Motion's layout animations with GPU acceleration
- **Lazy Loading**: Components and routes loaded only when needed
- **Asset Optimization**: Optimized images and SVGs

## 🔮 Future Enhancements

With more time, the platform could be extended to include:

1. **Subdomain Support**: Each school getting its own branded URL
2. **Real Authentication**: JWT-based auth with proper session management
3. **Database Integration**: PostgreSQL with Row-Level Security
4. **Enhanced Permissions**: More granular role-based access control
5. **User Management**: Registration and invitation flows

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

All components adapt seamlessly to different screen sizes while maintaining functionality and usability.

## 📈 Scalability

The architecture is designed to scale to thousands of schools and competitions through:

- **Efficient Database Design**: Proper indexing and query optimization
- **Smart Caching**: Caching strategies for frequently accessed data
- **Stateless API**: Enabling horizontal scaling with load balancing
- **Connection Pooling**: For efficient database connections

## 🔒 Security Considerations

Security is a primary concern with a multi-tenant application:

- **Data Isolation**: Strict tenant separation
- **Authorization Checks**: Comprehensive permission checks
- **Input Validation**: All user input validated with Zod schemas
- **XSS Protection**: React's built-in XSS protections
- **CSRF Protection**: Token-based protection for API calls

## 📚 Learn More

- [Multi-Tenant Architecture](./docs/multi-tenant-architecture.md)
- [Component Documentation](./docs/components.md)
- [API Documentation](./docs/api.md)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ by <a href="http://aakash-priyadarshi.github.io/">Aakash Priyadarshi</a>
</p>
