# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 marketing website for Washington CBPS (Clean Buildings Performance Standard) compliance services. The site helps building owners understand CBPS requirements, calculate compliance costs, and schedule consultations. Built with v0.app and auto-synced to this repository.

**Live URL**: https://washingtoncbps.com
**v0 Project**: https://v0.app/chat/projects/Tyh1IaMBVUj

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
next build

# Start production server
npm start

# Lint the codebase
npm run lint
```

## Architecture

### Technology Stack

- **Framework**: Next.js 15 with App Router
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind CSS 4 with PostCSS
- **UI Components**: Radix UI primitives via shadcn/ui
- **Forms**: react-hook-form with Zod validation
- **Analytics**: Google Tag Manager, Lucky Orange, LogRocket
- **Fonts**: Geist Sans and Geist Mono

### Project Structure

```
app/
  ├── layout.tsx              # Root layout with metadata, GTM, analytics
  ├── page.tsx                # Home page (main landing)
  ├── calculator/page.tsx     # CBPS calculator tool
  ├── pricing/               # Compliance packages
  ├── tier2/                 # Tier 2 specific content
  ├── resources/             # Educational resources
  └── api/chat/route.ts      # Chatbot API endpoint

components/
  ├── ui/                    # Reusable shadcn/ui components
  ├── calculator-*.tsx       # Calculator-related components
  ├── header.tsx             # Site navigation
  ├── footer.tsx             # Site footer
  └── cbps-chatbot.tsx       # AI chatbot widget

lib/
  ├── cbps-calculator.ts     # Core calculator logic
  ├── utm-utils.ts           # UTM parameter handling
  └── hooks/
      └── useHubSpotBooking.ts  # HubSpot integration

docs/plans/
  └── calculator-page-redesign-plan.md  # Design documentation
```

### Key Architecture Decisions

**Next.js Configuration**: Build errors ignored for faster iteration (not recommended for production hardening):
- TypeScript errors ignored during build
- ESLint errors ignored during build
- Images unoptimized

**Path Aliases**: Uses `@/*` for absolute imports from project root

**Analytics Stack**: Multiple tracking systems integrated:
- GTM (GTM-MH3X9NDQ) for Google Analytics
- Lucky Orange for session recording
- LogRocket for error tracking and replay
- Custom analytics tracking via `AnalyticsTracker` component

**UTM Parameter Flow**:
1. Captured from URL on page load via `captureAndStoreUTMParams()`
2. Stored in sessionStorage for persistence
3. Appended to all HubSpot booking links via `useHubSpotBooking` hook
4. Enables attribution tracking across the conversion funnel

## Calculator System

The CBPS calculator is the core conversion tool. Key files:

- **`lib/cbps-calculator.ts`**: Business logic for tier determination, cost estimation, penalty calculations, and compliance timeline
- **`components/calculator-hero-integrated.tsx`**: Integrated form + hero section (conversion-optimized design)
- **`components/calculator-form.tsx`**: Standalone calculator form component
- **`components/calculator-results.tsx`**: Results display with CTAs and next steps

### Calculator Flow

1. User fills building info (10 fields: type, sqft, year, address, use, energy mgmt) and contact info
2. Form data processed by `calculateCBPSRequirements()` function
3. Results calculated:
   - Compliance tier (Tier 1 vs Tier 2 based on 50k sqft threshold)
   - Deadlines (O&M and performance targets)
   - Cost estimates (factored by building type, age, existing systems)
   - Penalty calculations (daily and annual)
   - Available incentives (Tier 1: 50%, Tier 2: up to 100%)
   - Risk level and next steps
4. Results displayed with contact capture modal
5. Lead data sent to integrations (Zapier, HubSpot)

### Calculator Cost Logic

Base costs vary by building type:
- Office: $0.15/sqft
- Healthcare: $0.18/sqft
- Educational: $0.16/sqft
- Multifamily: $0.14/sqft
- Retail: $0.12/sqft
- Warehouse: $0.08/sqft

Multipliers applied:
- **Age Factor**: Pre-1990 (1.4x), 1990s (1.2x), 2000s (1.1x)
- **Energy Management Factor**: None (1.3x), Basic (1.1x), Automation (0.9x), Advanced (0.8x)

## HubSpot Integration

**Booking URL**: `https://meetings.hubspot.com/dheppner/wa-state-compliance-review`

The `useHubSpotBooking` hook:
- Captures UTM params from URL on mount
- Stores them in sessionStorage
- Appends them to HubSpot links automatically
- Provides `getBookingUrl()` and `openBooking()` methods

Used in multiple CTAs across the site (header, footer, results, modals).

## Component Patterns

### Client vs Server Components

- Most components are client components (`"use client"`) due to interactivity
- Pages use server components by default
- Client components imported into server components as needed

### Form Handling

- `react-hook-form` for state management
- Zod schemas for validation
- Field-level error display
- Auto-save to localStorage (in some forms)

### Modal System

- Built on Radix Dialog primitive
- Consistent patterns: `ContactFormModal`, `EmailCaptureModal`, `SchedulingModal`, `WebinarSignupModal`
- All modals support controlled open/close state

## Styling Conventions

- Tailwind utility classes for all styling
- `cn()` utility from `lib/utils.ts` for conditional classes (clsx + tailwind-merge)
- Responsive breakpoints: sm, md, lg, xl
- Color palette defined in CSS variables (see `globals.css`)
- Component variants managed via `class-variance-authority`

## Analytics & Tracking

**GTM Events**: Tracked via `AnalyticsTracker` component and inline GTM tags

**Key Events to Track**:
- Form submissions (calculator, contact, newsletter)
- CTA clicks (book call, download resources)
- Page views and section scrolls
- Modal interactions

## CBPS Domain Knowledge

The chatbot (`app/api/chat/route.ts`) embeds CBPS compliance knowledge:

**Tier Structure**:
- Tier 1: >50k sqft (non-residential, hotels, dorms)
- Tier 2: 20-50k sqft commercial + ALL multifamily >20k sqft

**Key Deadlines**:
- Tier 1 Large (>220k): June 1, 2026
- Tier 1 Medium (90-220k): June 1, 2027
- Tier 1 Small (50-90k): June 1, 2028
- Tier 2 All: July 1, 2027
- O&M programs must start 12 months BEFORE deadlines

**Penalties**:
- Non-submittal: $2,000-$4,000
- Performance violations: Up to $5,000 + $1/sqft/year

**Incentives**:
- Tier 2: Up to $0.75/sqft (can cover 100% of costs)
- Tier 1: Up to 50% of measure costs
- $150M for Tier 2, $75M for Tier 1

## Important Notes

1. **v0.app Sync**: Changes from v0.app auto-deploy to this repo. Prefer making changes in v0.app interface for design work.

2. **Build Configuration**: The project ignores TypeScript and ESLint errors during build. When refactoring, fix type errors manually - don't rely on build to catch them.

3. **UTM Tracking**: Always use `useHubSpotBooking` hook for HubSpot links to preserve attribution data.

4. **Calculator Redesign**: See `docs/plans/calculator-page-redesign-plan.md` for the conversion optimization strategy. The integrated hero design is the current production version.

5. **Contact Information**: Phone number in header is (206) 309-3936. HubSpot meeting link uses dheppner calendar.

6. **Schema.org**: Structured data for ProfessionalService included in root layout for SEO.

7. **Mobile-First**: All components should be mobile-responsive. Test on mobile viewports.
