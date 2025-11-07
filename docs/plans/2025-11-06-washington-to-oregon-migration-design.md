# Washington CBPS to Oregon BPS Migration Design

**Date**: November 6, 2025
**Project**: Oregon Building Performance Standard Website
**Source**: washington-cbps repository (cloned)
**Target**: or-bps.com
**Pattern**: Boston BERDO migration approach
**Estimated Timeline**: 13-24 hours

---

## Executive Summary

This document outlines the complete design for migrating the washington-cbps lead generation website to an Oregon Building Performance Standard (BPS) compliance website. Following the proven Boston BERDO migration pattern, we will systematically transform all content, branding, and metadata while preserving 100% of technical functionality including L0→L1 automation, lead routing, and CRM integrations.

### Key Design Decisions

1. **Shelve Calculator**: Oregon BPS uses fundamentally different EUI/EUIt performance model vs Washington's EMP/O&M cost model - calculator requires complete rebuild
2. **Branding**: Oregon state colors (Navy Blue + Gold) matching official state flag
3. **Migration Pattern**: Exact Boston playbook - 24 tasks, subagent-driven development
4. **Timeline**: First Tier 1 deadline June 1, 2028; Tier 2 deadline July 1, 2028
5. **Domain**: or-bps.com (confirmed)

---

## Table of Contents

1. [Background & Research](#background--research)
2. [Architecture & Technology](#architecture--technology)
3. [Branding & Visual Identity](#branding--visual-identity)
4. [Content Migration Strategy](#content-migration-strategy)
5. [Component Transformation Plan](#component-transformation-plan)
6. [Calculator Strategy](#calculator-strategy)
7. [Integration Configuration](#integration-configuration)
8. [Quality Assurance](#quality-assurance)
9. [Deployment Strategy](#deployment-strategy)
10. [Success Criteria](#success-criteria)

---

## Background & Research

### Oregon BPS Overview

**Legislation**: House Bill 3409 (2023)
**Effective Date**: January 1, 2025
**Administrative Agency**: Oregon Department of Energy (ODOE)
**Regulatory Framework**: ASHRAE Standard 100-2024 with Oregon Amendments

### Comprehensive Research Findings

See `docs/oregon-bps-research.md` for complete 8,000+ word research document covering:
- Official regulations and legal framework
- Coverage thresholds and tier structure
- Compliance deadlines and timelines
- Penalty structure and enforcement process
- Incentive programs (ECAPP $2M, BERI $12M)
- Reporting requirements and tools
- Comparison with Washington CBPS and Boston BERDO

### Key Regulatory Differences from Washington

| Factor | Washington CBPS | Oregon BPS |
|--------|----------------|------------|
| **Threshold** | ≥50k sqft (Tier 1)<br>20-50k sqft (Tier 2) | ≥35k sqft (Tier 1)<br>20k sqft+ (Tier 2 varies) |
| **Tier Structure** | Performance-based tiers | Tier 1: Large commercial<br>Tier 2: Small commercial + ALL institutional |
| **First Deadline** | June 1, 2026 (Tier 1 Large) | June 1, 2028 (Tier 1 Large) |
| **Compliance Model** | EMP + O&M programs | EUI/EUIt benchmarking |
| **Penalties** | $2k-$4k non-submittal<br>$5k + $1/sqft/year performance | $5k + $1/sqft/year (Tier 1 only) |
| **Incentives** | 50% Tier 1, 100% Tier 2 | Early compliance only: $0.85/sqft (Tier 1), $0.35/sqft (Tier 2) |

### Strategic Implications

1. **Calculator Incompatibility**: Oregon uses energy intensity targets (EUI/EUIt) vs Washington's operational cost model - requires complete rebuild
2. **Tier 2 Scope**: Oregon includes ALL multifamily, hospitals, schools regardless of size if ≥35k sqft - broader reach
3. **Penalty Risk**: Only Tier 1 faces penalties; Tier 2 is reporting-only initially
4. **Timeline Buffer**: 2028/2029/2030 deadlines give building owners more preparation time vs Washington's 2026 start

---

## Architecture & Technology

### Technology Stack (Preserved)

- **Framework**: Next.js 15 with App Router
- **TypeScript**: v5, strict mode
- **Styling**: Tailwind CSS v4 with PostCSS (CSS-based configuration)
- **UI Components**: Radix UI primitives via shadcn/ui
- **Forms**: react-hook-form + Zod validation
- **Analytics**: Google Tag Manager, Lucky Orange, LogRocket, Vercel Analytics
- **Fonts**: Geist Sans and Geist Mono

### Project Structure (After Migration)

```
oregon-bps/
├── .future/
│   ├── README.md                    # Shelved calculator documentation
│   └── calculator/                  # Moved from app/calculator/
│       ├── page.tsx
│       ├── components/
│       │   ├── calculator-form.tsx
│       │   ├── calculator-results.tsx
│       │   └── ...
│       └── lib/
│           └── cbps-calculator.ts   # Original Washington logic
├── app/
│   ├── layout.tsx                   # ✏️ Updated metadata, OG tags
│   ├── page.tsx                     # ✏️ Updated content, removed calculator CTA
│   ├── globals.css                  # ✏️ Oregon Navy + Gold theme
│   ├── pricing/                     # ✏️ Oregon packages
│   ├── resources/
│   │   ├── bps-summary-guide/       # ✏️ Renamed from cbps-summary-guide
│   │   └── webinar-signup/          # ✏️ Updated content
│   └── thank-you/                   # ✏️ Updated messaging
├── components/
│   ├── what-is-oregon-bps.tsx       # ✏️ Renamed from what-is-cbps.tsx
│   ├── oregon-bps-chatbot.tsx       # ✏️ Renamed from cbps-chatbot.tsx
│   ├── help-desk-hero.tsx           # ✏️ Oregon deadlines, logo
│   ├── key-deadlines.tsx            # ✏️ 2028/2029/2030 timeline
│   ├── coverage-checker.tsx         # ✏️ Oregon thresholds
│   ├── penalties-content.tsx        # ✏️ $5k + $1/sqft structure
│   ├── early-adopter-incentives.tsx # ✏️ ECAPP + BERI programs
│   ├── how-to-comply.tsx            # ✏️ ODOE process
│   ├── faq.tsx                      # ✏️ 12 Oregon-specific Q&As
│   ├── resources-hub.tsx            # ✏️ ODOE links
│   └── [All other components]       # ✏️ Color updates (green → navy/gold)
├── lib/
│   ├── types.ts                     # ✅ Preserved (FormData interface)
│   └── hooks/
│       └── useHubSpotBooking.ts     # ✏️ Oregon calendar URLs
├── public/
│   └── images/
│       └── oregon-bps-logo.png      # ➕ New logo
└── docs/
    ├── oregon-bps-research.md       # ➕ Research findings
    ├── plans/
    │   ├── 2025-11-06-washington-to-oregon-migration-design.md  # ➕ This document
    │   └── 2025-11-06-oregon-bps-migration-implementation.md    # ➕ Task plan
    └── oregon-migration-summary.md  # ➕ Final summary (post-migration)
```

**Legend**:
- ✅ Preserved unchanged
- ✏️ Modified for Oregon
- ➕ New file/directory
- 🗑️ Removed

---

## Branding & Visual Identity

### Color Palette

**Oregon State Colors** (Official since 1959):

**Primary: Navy Blue**
- Hex: `#002B5C`
- RGB: `0, 43, 92`
- Usage: Headers, navigation, primary buttons, text, backgrounds
- Rationale: Official Oregon state color, professional, governmental

**Secondary: Gold**
- Hex: `#FFB81C`
- RGB: `255, 184, 28`
- Usage: Accents, CTAs, highlights, hover states
- Rationale: Oregon state color, vibrant, same as Boston Gold (proven WCAG compliant)

### Tailwind v4 CSS Implementation

**File**: `app/globals.css`

```css
@theme inline {
  /* Oregon Navy Shades */
  --color-oregon-navy-50: #e6edf5;
  --color-oregon-navy-100: #ccdaeb;
  --color-oregon-navy-200: #99b5d7;
  --color-oregon-navy-300: #6690c3;
  --color-oregon-navy-400: #336baf;
  --color-oregon-navy-500: #002B5C;
  --color-oregon-navy-600: #002249;
  --color-oregon-navy-700: #001a37;
  --color-oregon-navy-800: #001124;
  --color-oregon-navy-900: #000912;
  --color-oregon-navy: #002B5C;

  /* Oregon Gold Shades */
  --color-oregon-gold-50: #fff9e6;
  --color-oregon-gold-100: #fff3cc;
  --color-oregon-gold-200: #ffe799;
  --color-oregon-gold-300: #ffdb66;
  --color-oregon-gold-400: #ffcf33;
  --color-oregon-gold-500: #FFB81C;
  --color-oregon-gold-600: #cc9316;
  --color-oregon-gold-700: #996e11;
  --color-oregon-gold-800: #66490b;
  --color-oregon-gold-900: #332506;
  --color-oregon-gold: #FFB81C;
}

:root {
  --primary: #002B5C;
  --secondary: #FFB81C;

  /* Update any existing CSS variables using green */
  --accent: #FFB81C; /* Was #10B981 */
}
```

### Color Class Replacement Strategy

**Systematic Find & Replace** (262+ instances):

| Old (Washington Green) | New (Oregon Navy/Gold) |
|------------------------|------------------------|
| `bg-emerald-500` | `bg-oregon-navy-500` or `bg-oregon-gold-500` |
| `text-green-600` | `text-oregon-navy-600` |
| `hover:bg-emerald-600` | `hover:bg-oregon-gold` |
| `border-green-500` | `border-oregon-navy-500` |
| `from-emerald-700` | `from-oregon-navy-700` |

**Context-Aware Replacement**:
- Primary actions (Book Call, Get Compliant): `bg-oregon-gold hover:bg-oregon-gold-600 text-oregon-navy`
- Secondary actions: `bg-oregon-navy hover:bg-oregon-navy-600 text-white`
- Text emphasis: `text-oregon-gold` for highlights, `text-oregon-navy` for headers
- Backgrounds: `bg-oregon-navy` for dark sections, `bg-oregon-navy-50` for light sections

### Logo Assets

**Primary Logo**: `public/images/oregon-bps-logo.png`
- Source: User's Downloads (image.jpeg)
- Already copied to project
- Usage: Hero, pricing page, OG images

**Implementation**:
```tsx
// components/help-desk-hero.tsx
<Image
  src="/images/oregon-bps-logo.png"
  alt="Oregon BPS Official Logo"
  width={300}
  height={300}
  className="w-72 h-72 lg:w-80 lg:h-80 drop-shadow-lg"
/>
```

### Typography (Preserved)

- **Primary Font**: Geist Sans
- **Monospace Font**: Geist Mono
- No changes to font stack

### Accessibility Compliance

**WCAG AA Standards** (4.5:1 contrast ratio):
- ✅ Navy Blue (#002B5C) on white: 11.8:1 (passes)
- ✅ White on Navy Blue: 11.8:1 (passes)
- ⚠️ Gold (#FFB81C) on white: 2.6:1 (fails - use only with Navy background)
- ✅ Gold on Navy Blue: 4.5:1 (passes)
- ✅ Navy Blue on Gold: 4.5:1 (passes)

**Button Contrast Strategy**:
```tsx
// Primary CTA (Gold button with Navy text)
<Button className="bg-oregon-gold hover:bg-oregon-gold-600 text-oregon-navy-800">
  Get Oregon BPS Compliant
</Button>

// Secondary CTA (Navy button with white text)
<Button className="bg-oregon-navy hover:bg-oregon-navy-600 text-white">
  Learn More
</Button>

// Text links (Navy on white, Gold on hover with Navy background)
<a className="text-oregon-navy hover:text-oregon-gold">
  Resource Link
</a>
```

---

## Content Migration Strategy

### Phase 1: Global Text Replacements

**Find & Replace Across Entire Codebase**:

```bash
# Primary terminology
CBPS → BPS
Clean Buildings Performance Standard → Building Performance Standard
Washington State → Oregon | State of Oregon
washington (in URLs) → oregon
washingtoncbps.com → or-bps.com

# Tier-specific (context-dependent)
"Tier 2" → Review context (Oregon has different Tier 2 definition)

# Deadlines
June 1, 2026 → June 1, 2028 (Tier 1 Large)
July 1, 2027 → July 1, 2028 (Tier 2)
June 1, 2029 → June 1, 2029 (Tier 1 Medium) ✓ Same
June 1, 2030 → June 1, 2030 (Tier 1 Small) ✓ Same

# Thresholds
50,000 sq ft → 35,000 sq ft (Tier 1 threshold)
20,000 sq ft → 20,000 sq ft ✓ Same (Tier 2 minimum)

# Penalties
$2,000-$4,000 non-submittal → N/A (Oregon uses single structure)
Up to $5,000 + $1/sqft/year → Up to $5,000 + $1/sqft/year ✓ Same
```

**Files Requiring Manual Review** (not simple find-replace):
- `components/coverage-checker.tsx` - Tier logic differs
- `components/key-deadlines.tsx` - Timeline structure differs
- `components/early-adopter-incentives.tsx` - ECAPP vs Washington grants
- `components/faq.tsx` - Complete rewrite needed

### Phase 2: Metadata Transformation

**Root Layout** (`app/layout.tsx`):

```typescript
export const metadata: Metadata = {
  title: "Oregon BPS Compliance Help | Building Performance Standard Expert Services",
  description: "Expert Oregon Building Performance Standard (BPS) compliance services. First Tier 1 deadline June 1, 2028. Tier 2 deadline July 1, 2028. Energy benchmarking, EUI reporting, and guaranteed compliance packages. Serving 20k+ sq ft buildings in Oregon.",
  keywords: [
    "Oregon BPS",
    "Building Performance Standard",
    "Oregon compliance",
    "BPS reporting",
    "June 2028 deadline",
    "building compliance Oregon",
    "BPS requirements",
    "energy benchmarking Oregon",
    "ODOE compliance",
    "Tier 1 buildings Oregon",
    "Tier 2 buildings Oregon",
    "EUI reporting",
    "Energy Use Intensity",
    "Oregon energy law",
    "building performance standards",
    "ASHRAE Standard 100",
  ],
  authors: [{ name: "Vert Energy Group" }],
  creator: "Vert Energy Group",
  publisher: "Vert Energy Group",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://or-bps.com",
    siteName: "Oregon BPS Help Desk",
    title: "Oregon BPS Compliance Help | Building Performance Standard",
    description: "Expert Oregon Building Performance Standard compliance services. First Tier 1 deadline June 1, 2028. Guaranteed compliance packages for 20k+ sq ft buildings.",
    images: [
      {
        url: "/images/oregon-bps-logo.png",
        width: 1200,
        height: 630,
        alt: "Oregon BPS Compliance Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oregon BPS Compliance Help | Building Performance Standard",
    description: "Expert Oregon Building Performance Standard compliance services. First Tier 1 deadline June 1, 2028.",
    images: ["/images/oregon-bps-logo.png"],
  },
  alternates: {
    canonical: "https://or-bps.com",
  },
  generator: "v0.app",
  icons: {
    icon: "/favicon.ico",
  },
}
```

**Pricing Page Metadata** (`app/pricing/page.tsx`):

```typescript
export const metadata: Metadata = {
  title: "Oregon BPS Compliance Packages | Flat-Fee Pricing | June 2028 Deadline",
  description: "Oregon BPS compliance packages from $12,000 for Tier 1 buildings. Expert Building Performance Standard support. Energy benchmarking, EUI reporting, and compliance documentation. First Tier 1 deadline June 1, 2028.",
  keywords: [
    "Oregon BPS pricing",
    "BPS compliance packages",
    "Oregon building compliance cost",
    "BPS reporting cost",
    "Building Performance Standard cost",
    "EUI benchmarking pricing",
    "BPS flat fee pricing",
    "Oregon energy compliance",
    "Tier 1 building compliance cost",
    "Tier 2 building compliance",
    "June 2028 deadline",
    "BPS package pricing",
  ],
  openGraph: {
    title: "Oregon BPS Compliance Packages | Flat-Fee Pricing",
    description: "BPS compliance packages from $12k for Tier 1 buildings. Expert Building Performance Standard support. First Tier 1 deadline June 1, 2028.",
    url: "https://or-bps.com/pricing",
    images: [
      {
        url: "/images/oregon-bps-logo.png",
        width: 1200,
        height: 630,
        alt: "Oregon BPS Compliance Packages",
      },
    ],
  },
  alternates: {
    canonical: "https://or-bps.com/pricing",
  },
}
```

**Schema.org Structured Data** (in `app/layout.tsx` `<head>`):

```typescript
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Oregon BPS Help Desk",
  "description": "Expert Oregon Building Performance Standard compliance services",
  "url": "https://or-bps.com",
  "telephone": "(TBD - get from client)",
  "areaServed": {
    "@type": "State",
    "name": "Oregon",
  },
  "serviceType": [
    "Building Performance Standard Compliance",
    "Energy Benchmarking",
    "EUI Reporting",
    "Building Energy Compliance",
  ],
  "provider": {
    "@type": "Organization",
    "name": "Vert Energy Group",
    "url": "https://vertenergy.com",
  },
}
```

### Phase 3: Component Content Updates

See [Component Transformation Plan](#component-transformation-plan) section for detailed component-by-component specifications.

---

## Component Transformation Plan

### Overview

Following Boston's exact task order, 24 tasks total:

**Tasks 1-4**: Foundational (calculator shelving, branding, colors)
**Tasks 5-9**: Core educational content (layout, hero, deadlines, coverage)
**Tasks 10-14**: Compliance guidance (how to comply, penalties, incentives, FAQ, resources)
**Tasks 15-20**: Secondary pages and forms
**Tasks 21-24**: QA and deployment prep

### Task 1: Shelve Calculator Components

**Objective**: Move calculator to `.future/` with comprehensive documentation for future rebuild

**Files to Move**:
```
app/calculator/page.tsx → .future/calculator/page.tsx
components/calculator-form.tsx → .future/calculator/components/calculator-form.tsx
components/calculator-hero.tsx → .future/calculator/components/calculator-hero.tsx
components/calculator-hero-integrated.tsx → .future/calculator/components/calculator-hero-integrated.tsx
components/calculator-results.tsx → .future/calculator/components/calculator-results.tsx
components/calculator-benefits.tsx → .future/calculator/components/calculator-benefits.tsx
lib/cbps-calculator.ts → .future/calculator/lib/cbps-calculator.ts
```

**Create `.future/README.md`**:
```markdown
# Shelved Oregon BPS Calculator

## Why Shelved

Oregon BPS uses a fundamentally different compliance model than Washington CBPS:

### Washington CBPS Model (Original)
- Cost-based: EMP + O&M program costs
- Predictable: Building type × age × existing systems = estimated cost
- Incentives: Fixed $/sqft or % of costs
- Simple tier logic: >50k = Tier 1, 20-50k = Tier 2

### Oregon BPS Model (Required)
- Performance-based: Energy Use Intensity (EUI) vs Energy Use Intensity Target (EUIt)
- Variable: Costs depend on gap between building's WN-EUI and target EUIt
- Complex: Requires ASHRAE Level 2 audit if non-compliant
- Mixed tier logic: Size + building type determine tier

### Technical Challenges

1. **EUI/EUIt Calculation**:
   - Requires Weather-Normalized EUI from Energy Star Portfolio Manager
   - EUIt varies by building type, activity, operating hours
   - Oregon-specific weather adjustment factors
   - Building-specific operating factor multipliers

2. **Cost Estimation**:
   - Unknown audit costs (no Oregon benchmarks yet - program launched Jan 2025)
   - Measure costs vary by EUI gap (not easily predicted)
   - LCCA complexity (life cycle cost assessment)
   - Implementation timeline affects costs

3. **Tier Determination**:
   - Tier 2 includes ALL multifamily/hospital/school ≥35k sqft (not just based on commercial sqft)
   - "Extended Tier 2" status for grouped buildings
   - Mixed-use buildings require 50% threshold calculation

## What's Needed for Reactivation

### Research Phase (8-12 hours)
1. Compile Oregon energy audit cost database by building type/size
2. Research measure implementation costs (HVAC, lighting, envelope, controls)
3. Analyze ODOE EUI Target Tool methodology
4. Study first year of Oregon compliance data (available mid-2028)
5. Interview Oregon QEAs about typical costs

### Development Phase (6-8 hours)
1. Implement EUI/EUIt calculation engine
   - Weather normalization for Oregon climate zones
   - Operating factor adjustments
   - Activity type mappings

2. Build cost estimation logic
   - Audit cost calculator (by building size/type/complexity)
   - Measure cost database with Oregon pricing
   - LCCA simplified model
   - Incentive calculation (ECAPP early compliance)

3. Update tier determination logic
   - Handle mixed-use buildings (50% threshold)
   - Support grouped buildings option
   - Extended Tier 2 eligibility check

4. Redesign results display
   - EUI vs EUIt visualization
   - Compliance path options (Conditional, Investment Criteria)
   - Timeline projections
   - Next steps specific to tier

### Testing Phase (2-4 hours)
- Validate against ODOE guidance documents
- Test with real Oregon building data
- Verify cost estimates against market rates
- User testing with Oregon building owners

## Estimated Total Effort
16-24 hours (research + development + testing)

## Reactivation Trigger
- After June 2028 first compliance cycle (real cost data available)
- When Oregon market rates established
- If client prioritizes calculator over consultation funnel
```

**Update Homepage** (`app/page.tsx`):
- Remove calculator CTA section
- Strengthen "Book a Call" and "Get Compliant" CTAs
- Add tier checker tool (simpler alternative)

### Task 2: Update Tailwind Configuration for Oregon Branding

**File**: `app/globals.css`

**Changes**:
```css
/* BEFORE (Washington green theme) */
@theme inline {
  --color-emerald-500: #10B981;
  /* ... other emerald shades */
}

:root {
  --primary: #10B981;
  --accent: #059669;
}

/* AFTER (Oregon navy + gold theme) */
@theme inline {
  --color-oregon-navy-50: #e6edf5;
  --color-oregon-navy-500: #002B5C;
  --color-oregon-navy-700: #001a37;
  --color-oregon-navy: #002B5C;

  --color-oregon-gold-50: #fff9e6;
  --color-oregon-gold-500: #FFB81C;
  --color-oregon-gold: #FFB81C;
}

:root {
  --primary: #002B5C;
  --secondary: #FFB81C;
  --accent: #FFB81C;
}
```

### Task 3: Update Global CSS Variables

**File**: `app/globals.css`

Verify no hardcoded color values remain:
```css
/* Find and replace any hex codes */
#10B981 → #002B5C (navy) or #FFB81C (gold)
#059669 → #002B5C
```

### Task 4: Update Component Colors - Buttons and CTAs

**Systematic Replacement Across Components**:

**Pattern 1: Primary CTA buttons**
```tsx
// BEFORE
className="bg-emerald-500 hover:bg-emerald-600 text-white"

// AFTER
className="bg-oregon-gold hover:bg-oregon-gold-600 text-oregon-navy-800"
```

**Pattern 2: Secondary buttons**
```tsx
// BEFORE
className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"

// AFTER
className="border-oregon-navy text-oregon-navy hover:bg-oregon-navy-50"
```

**Pattern 3: Text links**
```tsx
// BEFORE
className="text-green-600 hover:text-green-700"

// AFTER
className="text-oregon-navy hover:text-oregon-gold"
```

**Pattern 4: Badges and alerts**
```tsx
// BEFORE
className="bg-green-100 text-green-800 border-green-200"

// AFTER
className="bg-oregon-navy-50 text-oregon-navy-800 border-oregon-navy-200"
```

**Files Requiring Color Updates** (33 components from Boston pattern):
- All button components in `components/ui/`
- `components/header.tsx`
- `components/footer.tsx`
- `components/help-desk-hero.tsx`
- `components/contact-form-modal.tsx`
- `components/scheduling-modal.tsx`
- `app/pricing/PricingPageClient.tsx`
- And ~25 more content components

### Task 5: Update Layout Metadata for Oregon

**File**: `app/layout.tsx`

See [Metadata Transformation](#phase-2-metadata-transformation) section for complete implementation.

**Key Changes**:
- Title: "Oregon BPS Compliance Help"
- Description: Oregon-specific with June 2028 deadline
- Keywords: Oregon BPS terms
- OG URL: https://or-bps.com
- OG images: /images/oregon-bps-logo.png
- Schema.org areaServed: Oregon

### Task 6: Rename and Update "What is CBPS" Component

**Rename**: `components/what-is-cbps.tsx` → `components/what-is-oregon-bps.tsx`

**New Content**:
```tsx
export default function WhatIsOregonBPS() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-oregon-navy text-white">
            Oregon BPS Information
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-oregon-navy mb-4">
            What is Oregon's Building Performance Standard?
          </h2>
        </div>

        <div className="prose prose-lg max-w-4xl mx-auto">
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            Oregon BPS is a state program established by <strong>House Bill 3409 (2023)</strong> requiring
            large buildings to benchmark energy use and meet performance targets over time. The program
            became effective <strong>January 1, 2025</strong> and is administered by the Oregon Department
            of Energy (ODOE).
          </p>

          <div className="grid md:grid-cols-2 gap-8 my-12">
            <Card className="border-oregon-navy-200">
              <CardHeader>
                <CardTitle className="flex items-center text-oregon-navy">
                  <Building2 className="mr-2" />
                  Tier 1 Buildings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Nonresidential buildings, hotels, and motels <strong>≥35,000 sq ft</strong> must:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Benchmark energy use in Energy Star Portfolio Manager</li>
                  <li>✓ Compare building EUI to Energy Use Intensity Target (EUIt)</li>
                  <li>✓ Document Operations & Maintenance programs</li>
                  <li>✓ Submit Energy Management Plans</li>
                  <li>✓ If EUI exceeds target: perform energy audit and implement improvements</li>
                </ul>
                <div className="mt-4 p-3 bg-oregon-navy-50 rounded-lg">
                  <p className="text-sm text-oregon-navy font-medium">
                    Compliance Deadlines (by building size):
                  </p>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>≥200k sqft: <strong>June 1, 2028</strong></li>
                    <li>90-200k sqft: <strong>June 1, 2029</strong></li>
                    <li>35-90k sqft: <strong>June 1, 2030</strong></li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-oregon-navy-200">
              <CardHeader>
                <CardTitle className="flex items-center text-oregon-navy">
                  <Home className="mr-2" />
                  Tier 2 Buildings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Includes:
                </p>
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li>✓ Nonresidential/hotel/motel <strong>20-35k sq ft</strong></li>
                  <li>✓ Multifamily <strong>≥35k sq ft</strong></li>
                  <li>✓ Hospitals, schools, universities <strong>≥35k sq ft</strong></li>
                  <li>✓ Dormitories, prisons, senior care facilities <strong>≥35k sq ft</strong></li>
                </ul>
                <p className="text-gray-700 mb-4">
                  Tier 2 buildings must report energy data but do not yet have performance targets.
                </p>
                <div className="mt-4 p-3 bg-oregon-gold-50 rounded-lg border border-oregon-gold-200">
                  <p className="text-sm text-oregon-navy font-medium">
                    First Reporting Deadline:
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>July 1, 2028</strong> (then every 5 years)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg my-8">
            <h3 className="text-xl font-bold text-oregon-navy mb-3">
              Based on National Standards
            </h3>
            <p className="text-gray-700">
              Oregon BPS is based on <strong>ASHRAE Standard 100-2024</strong> (American Society of
              Heating, Refrigerating and Air-Conditioning Engineers) with Oregon-specific amendments
              to reflect local climate, building stock, and energy markets.
            </p>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-oregon-gold hover:bg-oregon-gold-600 text-oregon-navy-800">
              <a href="https://www.oregon.gov/energy/save-energy/Pages/BPS.aspx" target="_blank" rel="noopener">
                Learn More at ODOE Website →
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
```

**Update Import in Homepage** (`app/page.tsx`):
```tsx
// BEFORE
import WhatIsCBPS from "@/components/what-is-cbps"

// AFTER
import WhatIsOregonBPS from "@/components/what-is-oregon-bps"
```

### Task 7: Update Help Desk Hero Component

**File**: `components/help-desk-hero.tsx`

**Key Changes**:
```tsx
// Deadline badge
<div className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg">
  First Tier 1 Reporting Deadline: June 1, 2028
</div>

// Main headline
<h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-2">
  Oregon BPS Compliance — Fast, Simple, Guaranteed
</h1>
<p className="text-lg text-yellow-200 font-medium">(BPS) Help Desk</p>

// Description
<p className="text-xl text-oregon-gold-50 leading-relaxed mb-8">
  Expert guidance for Oregon building owners to comply with the Building Performance
  Standard. Meet your <strong className="text-yellow-300">June 1, 2028 Tier 1 deadline</strong>,
  achieve <strong className="text-yellow-300">EUI performance targets</strong>, and plan
  your energy efficiency improvements. Serving buildings ≥20,000 sq ft in Oregon.
</p>

// Logo
<Image
  src="/images/oregon-bps-logo.png"
  alt="Oregon BPS Official Logo"
  width={300}
  height={300}
  className="w-72 h-72 lg:w-80 lg:h-80 drop-shadow-lg"
/>
```

**Background Options**:
1. Keep current skyline with Navy overlay
2. Use Oregon-specific imagery (Portland skyline, Mt. Hood, etc.) if available
3. Abstract gradient (Navy to Gold)

### Task 8: Update Key Deadlines Component

**File**: `components/key-deadlines.tsx`

**New Timeline**:
```tsx
const oregonDeadlines = [
  {
    tier: "Tier 1 Large",
    date: "June 1, 2028",
    title: "Buildings ≥200,000 sq ft",
    description: "First compliance deadline for largest Tier 1 buildings",
    icon: Building2,
    color: "oregon-navy"
  },
  {
    tier: "Tier 2 All",
    date: "July 1, 2028",
    title: "All Tier 2 Buildings",
    description: "First reporting deadline (commercial 20-35k sqft, all institutional ≥35k sqft)",
    icon: Home,
    color: "oregon-gold"
  },
  {
    tier: "Tier 1 Medium",
    date: "June 1, 2029",
    title: "Buildings 90-200k sq ft",
    description: "Compliance deadline for mid-sized Tier 1 buildings",
    icon: Building,
    color: "oregon-navy"
  },
  {
    tier: "Tier 1 Small",
    date: "June 1, 2030",
    title: "Buildings 35-90k sq ft",
    description: "Final Tier 1 compliance deadline",
    icon: Building2,
    color: "oregon-navy"
  }
]

// Visual timeline component
<div className="space-y-6">
  {oregonDeadlines.map((deadline, index) => (
    <div key={index} className="flex items-start gap-4">
      <div className={`flex-shrink-0 w-16 h-16 rounded-full bg-${deadline.color}-100
                       flex items-center justify-center border-2 border-${deadline.color}-500`}>
        <deadline.icon className={`w-8 h-8 text-${deadline.color}-600`} />
      </div>
      <div>
        <div className="flex items-center gap-3 mb-1">
          <Badge className={`bg-${deadline.color}-500 text-white`}>
            {deadline.tier}
          </Badge>
          <span className="text-2xl font-bold text-oregon-navy">
            {deadline.date}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {deadline.title}
        </h3>
        <p className="text-gray-600">
          {deadline.description}
        </p>
      </div>
    </div>
  ))}
</div>

// Early compliance incentive callout
<div className="mt-8 p-6 bg-oregon-gold-50 rounded-lg border-2 border-oregon-gold-200">
  <h4 className="text-lg font-bold text-oregon-navy mb-2">
    💰 Early Compliance Incentives Available
  </h4>
  <p className="text-gray-700">
    Comply <strong>1 year early</strong> and receive up to <strong>$0.85/sqft</strong> (Tier 1)
    or <strong>$0.35/sqft</strong> (Tier 2) through ODOE's ECAPP program.
  </p>
</div>
```

### Task 9: Update Coverage Checker Component

**File**: `components/coverage-checker.tsx`

**New Tier Logic**:
```tsx
interface CoverageResult {
  covered: boolean
  tier: 1 | 2 | null
  deadline: string | null
  message: string
}

function checkOregonBPSCoverage(
  sqft: number,
  buildingType: 'nonresidential' | 'hotel' | 'multifamily' | 'hospital' | 'school' | 'university' | 'other'
): CoverageResult {

  // Tier 1: Nonresidential, Hotel, Motel ≥35k sqft
  if (['nonresidential', 'hotel'].includes(buildingType)) {
    if (sqft >= 200000) {
      return {
        covered: true,
        tier: 1,
        deadline: "June 1, 2028",
        message: "Your building is covered under Tier 1 (Large). First compliance deadline: June 1, 2028."
      }
    }
    if (sqft >= 90000) {
      return {
        covered: true,
        tier: 1,
        deadline: "June 1, 2029",
        message: "Your building is covered under Tier 1 (Medium). Compliance deadline: June 1, 2029."
      }
    }
    if (sqft >= 35000) {
      return {
        covered: true,
        tier: 1,
        deadline: "June 1, 2030",
        message: "Your building is covered under Tier 1 (Small). Compliance deadline: June 1, 2030."
      }
    }
    if (sqft >= 20000) {
      return {
        covered: true,
        tier: 2,
        deadline: "July 1, 2028",
        message: "Your building is covered under Tier 2. First reporting deadline: July 1, 2028."
      }
    }
  }

  // Tier 2: Multifamily, Hospital, School, University, etc. ≥35k sqft
  if (['multifamily', 'hospital', 'school', 'university'].includes(buildingType)) {
    if (sqft >= 35000) {
      return {
        covered: true,
        tier: 2,
        deadline: "July 1, 2028",
        message: "Your building is covered under Tier 2. First reporting deadline: July 1, 2028."
      }
    }
  }

  return {
    covered: false,
    tier: null,
    deadline: null,
    message: "Your building does not appear to be covered by Oregon BPS based on the information provided."
  }
}

// UI Component
export default function CoverageChecker() {
  const [sqft, setSqft] = useState<string>('')
  const [buildingType, setBuildingType] = useState<string>('')
  const [result, setResult] = useState<CoverageResult | null>(null)

  const handleCheck = () => {
    const sqftNum = parseInt(sqft.replace(/,/g, ''))
    if (isNaN(sqftNum) || !buildingType) {
      toast.error("Please enter valid square footage and select building type")
      return
    }
    const coverage = checkOregonBPSCoverage(sqftNum, buildingType as any)
    setResult(coverage)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-oregon-navy mb-8 text-center">
          Is Your Building Covered?
        </h2>

        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <Label htmlFor="sqft">Building Square Footage (gross floor area, excluding parking)</Label>
              <Input
                id="sqft"
                type="text"
                placeholder="e.g., 45,000"
                value={sqft}
                onChange={(e) => setSqft(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="buildingType">Building Type</Label>
              <Select value={buildingType} onValueChange={setBuildingType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select building type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nonresidential">Nonresidential/Office</SelectItem>
                  <SelectItem value="hotel">Hotel/Motel</SelectItem>
                  <SelectItem value="multifamily">Multifamily Residential</SelectItem>
                  <SelectItem value="hospital">Hospital</SelectItem>
                  <SelectItem value="school">School</SelectItem>
                  <SelectItem value="university">University</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleCheck}
              className="w-full bg-oregon-gold hover:bg-oregon-gold-600 text-oregon-navy-800"
              size="lg"
            >
              Check Coverage
            </Button>
          </div>

          {result && (
            <div className={`mt-6 p-4 rounded-lg ${
              result.covered
                ? 'bg-green-50 border-2 border-green-200'
                : 'bg-gray-100 border-2 border-gray-300'
            }`}>
              <p className="text-gray-900 font-medium mb-2">
                {result.message}
              </p>
              {result.covered && (
                <div className="space-y-2 mt-4">
                  <Badge className="bg-oregon-navy text-white">
                    Tier {result.tier}
                  </Badge>
                  <p className="text-sm text-gray-600">
                    <strong>Deadline:</strong> {result.deadline}
                  </p>
                  <Button asChild size="sm" className="mt-2">
                    <a href="#contact">Get Compliance Help →</a>
                  </Button>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </section>
  )
}
```

### Tasks 10-14: Compliance Content Components

I'll continue with the remaining tasks in the next response to keep this manageable.

Does this design document structure and level of detail look correct so far? Should I continue with Tasks 10-24 and complete the full design document?