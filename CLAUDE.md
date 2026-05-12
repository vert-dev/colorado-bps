# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 marketing website for **Colorado Building Performance Standards (BPS)** compliance services. The
site helps building owners ≥50,000 sq ft understand HB 21-1286 / CDPHE Regulation 28 requirements, choose a compliance
pathway, and schedule consultations. The codebase was originally a Washington CBPS site, was migrated to Oregon BPS,
and is now in active migration to Colorado BPS — leftover Washington/Oregon language may still appear and should be
treated as bugs.

**Live URL**: https://co-bps.com (Colorado BPS)

## Development Commands

```bash
npm install
npm run dev
next build
npm start
npm run lint
```

## Architecture

### Technology Stack

- **Framework**: Next.js 15 with App Router
- **TypeScript**: Strict mode enabled (build errors are ignored — fix manually)
- **Styling**: Tailwind CSS 4 with PostCSS; colorado-blue / colorado-gold palettes in `globals.css`
- **UI Components**: Radix UI primitives via shadcn/ui
- **Forms**: react-hook-form with Zod validation
- **Analytics**: Google Tag Manager, Lucky Orange, LogRocket
- **Fonts**: Geist Sans and Geist Mono

### Project Structure

```
app/
  ├── layout.tsx              # Root layout with metadata, GTM, analytics
  ├── page.tsx                # Home page (main landing)
  ├── pricing/                # Compliance packages (Foundation + 3 pathway packages)
  ├── tier2/                  # Legacy route — redirects to / (Colorado has no tiers)
  ├── resources/              # Educational resources
  ├── about/, accessibility/, privacy-policy/, terms-of-service/, thank-you/, unsubscribe/
  └── api/chat/route.ts       # Colorado BPS chatbot API endpoint

components/
  ├── ui/                       # Reusable shadcn/ui components
  ├── header.tsx                # Site navigation
  ├── footer.tsx                # Site footer
  ├── what-is-colorado-bps.tsx  # Core program explainer
  ├── key-deadlines.tsx         # Dec 31 2025/2026/2030 timeline
  ├── penalties-content.tsx     # $500/$2,000 benchmarking + monthly performance
  ├── coverage-checker.tsx      # ≥50,000 sq ft single-threshold check
  ├── how-to-comply.tsx         # 3-pathway compliance walk-through
  ├── early-adopter-incentives.tsx  # IRA 179D / 45L + utility rebates
  ├── master-visual-timeline.tsx    # Statewide single-track timeline
  ├── resources-hub.tsx         # Colorado Energy Office / CDPHE / BEAM Portal links
  ├── success-stories.tsx       # Colorado building examples
  ├── faq.tsx                   # Colorado-specific Q&A
  └── cbps-chatbot.tsx          # Chatbot widget (file name is legacy; copy is Colorado)

lib/
  ├── utm-utils.ts              # UTM parameter handling
  └── hooks/useHubSpotBooking.ts  # HubSpot integration

docs/
  ├── colorado-bps-research.md  # Regulatory research source-of-truth
  └── plans/                    # Historical migration plans
```

## Colorado BPS Domain Knowledge (use this as the source of truth)

**Primary law**: HB 21-1286 (2021) — "Energy Performance for Buildings"
**Rules**: CDPHE Regulation 28 (5 CCR 1001-32), administered by the Air Quality Control Commission
**Regulators**: Colorado Energy Office (CEO) + Colorado Department of Public Health and Environment (CDPHE)

### Coverage

- **Single threshold**: buildings ≥50,000 sq ft (commercial, multifamily, and institutional)
- **No tiers** — if you see "Tier 1" / "Tier 2" anywhere in the UI, it's a leftover from the Oregon/Washington
  versions and should be fixed.

### Compliance pathways (owner selects one)

1. **Targeted EUI**: meet a property-type-specific site EUI target
2. **GHG Reduction**: meet a property-type-specific GHG intensity target (electrification / renewables friendly)
3. **Standard % Reduction**: 13% by 2026 / 29% by 2030 vs the 2021 baseline (available when the 2021 baseline EUI
   is well above the assigned target)

### Key deadlines

- **June 1, each year** — annual benchmarking due via BEAM Portal (prior-year data)
- **December 31, 2025** — energy audit + compliance plan + pathway selection
- **December 31, 2026** — interim performance target
- **June 1, 2027** — monthly performance penalties begin for buildings missing the 2026 target
- **December 31, 2030** — final performance target
- **June 1, 2031** — monthly performance penalties begin for buildings missing the 2030 target

### Penalties

- **Benchmarking**: $500 first occurrence, $2,000 each subsequent occurrence (enforcement began Jan 1, 2024)
- **Performance**: monthly penalties beginning 6/1/2027 (interim) and 6/1/2031 (final); amount set by CDPHE based
  on degree of non-compliance
- **Annual fee**: $100 per covered building per year

### Incentives

- Colorado has **limited state grant funding**. The primary stack is:
  - **IRA 179D**: up to $5/sqft tax deduction for qualifying energy improvements
  - **IRA 45L**: residential efficiency tax credit
  - **Utility rebates**: Xcel Energy, Black Hills Energy, municipal providers
- Do **not** reference Oregon ECAPP/BERI or Washington's $150M/$75M pools — those are not Colorado programs.

### Tools

- **BEAM Portal**: https://co.beam-portal.org/ — required for annual reporting
- **ENERGY STAR Portfolio Manager**: portfoliomanager.energystar.gov (feeds BEAM via Web Services)

## HubSpot Integration

The `useHubSpotBooking` hook captures UTM params, stores them in sessionStorage, and appends them to HubSpot links so
attribution is preserved across the funnel. Always use the hook when adding a booking CTA — never hard-code a booking
URL.

## Component Patterns

- Most user-facing components are client components (`"use client"`) because of interactivity.
- Pages default to server components and import client components as needed.
- Forms use `react-hook-form` + Zod with field-level error display.
- Modals are built on Radix Dialog (`ContactFormModal`, `EmailCaptureModal`, `SchedulingModal`, `WebinarSignupModal`).

## Styling Conventions

- Tailwind utility classes only.
- `cn()` from `lib/utils.ts` for conditional classes.
- Component variants via `class-variance-authority`.
- Colorado palette: `colorado-blue-*` and `colorado-gold-*` scales (defined in `globals.css` / Tailwind config).
- Mobile-first; test on mobile breakpoints.

## Important Notes

1. **Migration leftovers**: If you find "Oregon", "Washington", "Seattle", "Portland", "CBPS" (as a Washington
   brand), "EUIt", "EMP/O&M", "ECAPP", "BERI", "Tier 1/Tier 2", "$5,000 + $1/sqft", "$150M", "$0.75/sqft", "HB 3409",
   "OAR 330-140", or "or-bps.com" in user-facing copy, treat it as a bug. The chatbot system prompt in
   `app/api/chat/route.ts` is the canonical source for Colorado facts.

2. **Build configuration**: TypeScript and ESLint errors are ignored at build time. Fix type errors manually rather
   than relying on the build.

3. **Routes that should NOT exist semantically** (but are still present):
   - `/tier2` is a redirect to `/` — Colorado has no tier structure
   - `/resources/emp-om-checklist` and `/resources/tier2-incentives-guide` are legacy URLs from the prior
     migrations; their content should be Colorado-correct or the routes deprecated

4. **Schema.org**: Structured data for ProfessionalService is included in `app/layout.tsx` for SEO. Keep state
   references aligned with Colorado.

5. **Independence**: The site is operated by Vert Energy Group and is independent of the Colorado Energy Office and
   CDPHE. Footer carries the disclosure.
