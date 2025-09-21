# Reach'd Marketing Website

## Overview
This is a Next.js marketing website for Reach'd Marketing agency. The site showcases their services with interactive components, testimonials, case studies, and multi-channel marketing strategies.

## Project Setup
- **Framework**: Next.js 14.2.16 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI components with custom styling
- **Animations**: Framer Motion for interactive elements
- **Font**: Inter from Google Fonts

## Key Features
- Responsive marketing landing page
- Interactive video performance showcase
- WhatsApp chat integration showcase
- Enhanced testimonials section
- Multi-channel strategy presentation
- Privacy policy component

## Development Configuration
- **Dev Server**: Configured to run on port 5000 with hostname 0.0.0.0 for Replit environment
- **Cache Control**: Disabled caching for development with no-cache headers
- **TypeScript**: Build errors ignored for development (existing Framer Motion type issues)
- **Images**: Unoptimized for Replit environment

## Deployment Configuration
- **Target**: Autoscale (stateless frontend)
- **Build**: `npm run build`
- **Runtime**: `npm start`

## Recent Changes
- 2025-09-21: Initial Replit environment setup
  - Installed dependencies via npm
  - Configured Next.js for Replit proxy environment
  - Set up development workflow on port 5000
  - Added cache control headers for development
  - Configured deployment settings for autoscale

## User Preferences
- No specific preferences documented yet

## Project Architecture
- Standard Next.js app directory structure
- Components organized in `/components` directory
- UI components in `/components/ui` subdirectory
- Static assets in `/public` directory
- TypeScript configuration with path aliases (@/ for root)

## Known Issues
- Minor Framer Motion TypeScript warnings (build errors ignored)
- Image aspect ratio warning in browser console (cosmetic only)