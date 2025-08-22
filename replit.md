# Overview

This is a premium photobooth rental business website built with React and Express.js. The application provides a modern, elegant interface for customers to browse services, customize packages, make bookings, and submit inquiries. The site showcases different photobooth packages for weddings, corporate events, and private parties with extensive customization options including backdrops, LED colors, and photo templates.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built as a single-page application using React with TypeScript. The architecture follows a component-based design pattern with:

- **UI Framework**: React with TypeScript for type safety
- **Styling**: Tailwind CSS with custom design tokens and shadcn/ui component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and React hooks for local state
- **Build Tool**: Vite for fast development and optimized production builds

The component structure is organized into reusable UI components (buttons, forms, cards) and page-specific sections (hero, services, booking, gallery). The design uses a luxury aesthetic with custom fonts, animations, and a professional color scheme.

## Backend Architecture

The backend follows a RESTful API design using Express.js with TypeScript:

- **Framework**: Express.js with TypeScript
- **Storage Layer**: Abstracted storage interface with in-memory implementation (IStorage/MemStorage)
- **Validation**: Zod schemas for request validation
- **Error Handling**: Centralized error handling middleware
- **Development**: Vite integration for hot reloading in development

The API provides endpoints for booking management and inquiry handling with proper validation and error responses.

## Data Storage Solutions

The application uses a database-agnostic approach with Drizzle ORM:

- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema**: Shared schema definitions using Drizzle with Zod validation
- **Tables**: Users, bookings, and inquiries with proper relationships
- **Migrations**: Drizzle Kit for database migrations

The storage layer includes an abstraction (IStorage interface) that currently uses in-memory storage but can be easily replaced with a PostgreSQL implementation.

## External Dependencies

- **Database**: Neon Database (PostgreSQL) for production data storage
- **Payment Processing**: PayPal Server SDK integration for handling deposits and payments
- **Email/Notifications**: Ready for integration with services like SendGrid or Nodemailer
- **Image Storage**: Uses external image URLs (Unsplash, Pixabay) for gallery and examples
- **Fonts**: Google Fonts (Playfair Display, Inter) for typography
- **Icons**: Lucide React and React Icons for UI elements
- **Development Tools**: Replit integration for cloud development environment

The application is designed to be easily deployable with environment-based configuration for database connections and external service credentials.