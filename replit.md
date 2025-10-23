# Cine Estação - Cinema Website

## Overview

Cine Estação is a modern, cinematic website for a Brazilian cinema chain operating in Franco da Rocha and Porto Feliz. The application provides movie schedules, ticket purchasing, trailers, and social media integration with a premium streaming platform-inspired aesthetic featuring seasonal dynamic themes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Tooling**
- React 18 with TypeScript using Vite as the build tool
- Single Page Application (SPA) with client-side routing via Wouter
- Component-based architecture with reusable UI components from shadcn/ui

**Styling Approach**
- TailwindCSS for utility-first styling with custom configuration
- Dark theme as primary aesthetic (cinema-focused design)
- Custom color system using CSS variables for theming support
- Seasonal theme system supporting default, Halloween, Christmas, and Valentine's Day variants

**Component Library**
- shadcn/ui components (New York variant) for consistent UI patterns
- Radix UI primitives for accessible, unstyled component foundations
- Framer Motion for animations and transitions
- Embla Carousel for movie carousels

**State Management**
- TanStack Query (React Query) for server state management
- React hooks for local component state
- No global state management library (keeping state local and lifted when needed)

**Design System**
- Brand colors: Primary orange (#ff6600), cinema black backgrounds
- Inter font family for typography
- Consistent spacing and border radius values
- Cinema-first aesthetic inspired by Netflix/HBO Max

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript
- ESM module system throughout
- Vite integration for development with HMR support

**API Design**
- RESTful API structure with `/api` prefix for all endpoints
- JSON request/response format
- Request logging middleware for debugging

**Storage Layer**
- Abstracted storage interface (IStorage) allowing multiple implementations
- In-memory storage (MemStorage) as default implementation
- Designed to support database integration via storage interface swapping

**Build & Deployment**
- Separate build processes for client (Vite) and server (esbuild)
- Production bundle outputs to `dist/` directory
- Static file serving in production mode

### External Dependencies

**Database**
- Drizzle ORM configured for PostgreSQL
- Neon Database serverless driver (@neondatabase/serverless)
- Schema defined in shared/ folder for client-server type sharing
- Migration support via drizzle-kit

**UI Component Libraries**
- @radix-ui/* packages for accessible primitives
- lucide-react for iconography
- embla-carousel-react for carousels
- cmdk for command palette functionality

**Development Tools**
- TypeScript for type safety across stack
- PostCSS with Autoprefixer for CSS processing
- Replit-specific plugins for development experience

**Session Management**
- connect-pg-simple for PostgreSQL session storage (configured but not actively used)

**Form Handling**
- React Hook Form with @hookform/resolvers for validation
- Zod schemas for runtime validation
- drizzle-zod for generating Zod schemas from database schema

### Key Architectural Decisions

**Monorepo Structure**
- Client code in `client/` directory
- Server code in `server/` directory
- Shared types/schemas in `shared/` directory
- Enables type sharing between frontend and backend

**Path Aliases**
- `@/` maps to client source directory
- `@shared/` maps to shared directory
- `@assets/` maps to attached_assets directory

**Seasonal Theming**
- Custom hook (useSeasonalTheme) automatically detects season based on current month
- Theme props cascade through Header and HeroSection components
- Supports special decorations and color schemes for holidays

**Design Guidelines Separation**
- Comprehensive design guidelines in `design_guidelines.md`
- Centralized brand identity, layout specifications, and component styling rules
- Ensures consistency across development iterations

**Asset Management**
- Static assets served from attached_assets/ folder
- Vite alias configuration for easy asset imports
- Logo and media files referenced via @assets/ path

**Responsive Design**
- Mobile-first approach with Tailwind breakpoints
- Custom mobile detection hook (useIsMobile)
- Hamburger menu for mobile navigation