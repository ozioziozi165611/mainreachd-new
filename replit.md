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
- 2025-10-15: Mobile/iPhone button improvements & Fullscreen enhancement
  - Enhanced all buttons with minimum 44px touch targets for iOS compliance
  - Improved base button component with touch-manipulation CSS for better mobile responsiveness
  - Increased button padding and sizing across all components for better mobile UX
  - Fixed hero section CTA button with better mobile spacing and sizing (56px min-height)
  - Optimized CTA section buttons with improved mobile touch targets
  - Enhanced footer buttons with larger touch areas and better visual hierarchy
  - Improved floating WhatsApp widget with better mobile button sizing
  - Added flex-shrink-0 to icons to prevent layout issues on mobile
  - Added prominent fullscreen button for mobile video player (always visible, top-right position, 52px touch target)
  - Fixed iOS/iPhone fullscreen compatibility using webkitEnterFullscreen API
  - Simplified video controls: tap/click anywhere on video to play/pause, no visible control buttons
  - Removed pause button and volume controls for cleaner viewing experience

- 2025-09-27: GitHub import setup completion
  - Successfully installed all project dependencies via npm
  - Configured Next.js for Replit proxy environment with proper host allowance
  - Set up development workflow running on port 5000 with 0.0.0.0 hostname
  - Added cache control headers for development environment
  - Configured deployment settings for autoscale deployment
  - Verified application is running correctly with dark theme design
  - Fixed Next.js configuration warnings

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