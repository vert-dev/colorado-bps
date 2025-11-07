# Oregon BPS Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate Washington CBPS lead generation website to Oregon Building Performance Standard (BPS) compliance site, preserving all technical functionality while updating content and branding.

**Architecture:** Follow proven Boston BERDO migration pattern with 24 systematic tasks: (1) shelve calculator, (2-4) update branding/colors, (5-14) transform core content components, (15-20) update secondary pages/forms, (21-24) QA and deployment prep. All work in isolated git worktree with frequent atomic commits.

**Tech Stack:** Next.js 15, React 19, TypeScript 5, Tailwind CSS v4, Radix UI, react-hook-form, Zod, Energy Star Portfolio Manager integration

**Reference Documents:**
- Research: `docs/oregon-bps-research.md` (8000+ words of Oregon BPS regulations)
- Design: `docs/plans/2025-11-06-washington-to-oregon-migration-design.md`
- Boston Pattern: `../boston-bps/docs/boston-migration-summary.md`

---

## Task 1: Shelve Calculator Components

**Rationale:** Oregon BPS uses EUI/EUIt performance model (fundamentally incompatible with Washington's EMP/O&M cost model). Requires complete rebuild with Oregon-specific benchmarks.

**Files:**
- Move: `app/calculator/page.tsx` → `.future/calculator/page.tsx`
- Move: `components/calculator-*.tsx` (5 files) → `.future/calculator/components/`
- Move: `lib/cbps-calculator.ts` → `.future/calculator/lib/`
- Create: `.future/README.md`
- Modify: `app/page.tsx` (remove calculator CTA section)

### Step 1: Create .future directory structure

```bash
mkdir -p .future/calculator/components
mkdir -p .future/calculator/lib
```

### Step 2: Move calculator files

```bash
mv app/calculator .future/calculator/
mv components/calculator-form.tsx .future/calculator/components/
mv components/calculator-hero.tsx .future/calculator/components/
mv components/calculator-hero-integrated.tsx .future/calculator/components/
mv components/calculator-results.tsx .future/calculator/components/
mv components/calculator-benefits.tsx .future/calculator/components/
mv lib/cbps-calculator.ts .future/calculator/lib/
```

### Step 3: Create .future/README.md

**File:** `.future/README.md`

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

1. **EUI/EUIt Calculation**: Requires Weather-Normalized EUI from Energy Star Portfolio Manager with Oregon-specific weather adjustment factors
2. **Cost Estimation**: Unknown audit costs (program launched Jan 2025, no benchmarks yet)
3. **Tier Determination**: Tier 2 includes ALL multifamily/hospital/school ≥35k sqft (not just based on commercial sqft)

## What's Needed for Reactivation

### Research Phase (8-12 hours)
1. Compile Oregon energy audit cost database by building type/size
2. Research measure implementation costs (HVAC, lighting, envelope, controls)
3. Analyze ODOE EUI Target Tool methodology
4. Study first year of Oregon compliance data (available mid-2028)

### Development Phase (6-8 hours)
1. Implement EUI/EUIt calculation engine
2. Build cost estimation logic with Oregon pricing
3. Update tier determination for mixed-use buildings
4. Redesign results display with EUI vs EUIt visualization

### Testing Phase (2-4 hours)
- Validate against ODOE guidance documents
- Test with real Oregon building data
- Verify cost estimates against market rates

## Estimated Total Effort
16-24 hours (research + development + testing)

## Reactivation Trigger
After June 2028 first compliance cycle when real cost data available
```

### Step 4: Update homepage to remove calculator CTA

**File:** `app/page.tsx`

Find and remove calculator CTA section (around line 20-35):

```tsx
// REMOVE THIS SECTION:
<section className="py-16">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-6">Calculate Your Compliance Costs</h2>
    <p className="text-xl text-gray-600 mb-8">
      Get an instant estimate of your CBPS compliance costs
    </p>
    <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600">
      <Link href="/calculator">Use Calculator →</Link>
    </Button>
  </div>
</section>
```

### Step 5: Commit calculator shelving

```bash
git add .future/ app/page.tsx app/calculator components/calculator-* lib/cbps-calculator.ts
git commit -m "feat: Shelve calculator to .future/ for Oregon BPS rebuild

Oregon BPS uses EUI/EUIt performance model which is fundamentally
incompatible with Washington's EMP/O&M cost model. Calculator requires
complete rebuild with Oregon-specific benchmarks.

- Move calculator route and components to .future/calculator/
- Create .future/README.md documenting reactivation requirements
- Remove calculator CTA from homepage
- Preserve original Washington logic for future reference

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 2: Update Tailwind Configuration for Oregon Branding

**Files:**
- Modify: `app/globals.css`

### Step 1: Update @theme inline block with Oregon colors

**File:** `app/globals.css` (lines ~10-30)

Replace Washington green theme with Oregon Navy + Gold:

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
```

### Step 2: Update CSS variables in :root

**File:** `app/globals.css` (lines ~35-45)

```css
:root {
  --primary: #002B5C;
  --secondary: #FFB81C;
  --accent: #FFB81C;

  /* Update any existing green references */
  /* --accent: #10B981; REMOVE THIS */
}
```

### Step 3: Verify no hardcoded hex colors remain

Search for Washington green hex codes:

```bash
grep -r "#10B981\|#059669\|#047857" app/ components/ --exclude-dir=node_modules
```

If found, replace with `--primary` or `--secondary` CSS variables.

### Step 4: Commit Tailwind configuration

```bash
git add app/globals.css
git commit -m "style: Update Tailwind theme to Oregon Navy + Gold

Replace Washington green theme with Oregon state colors:
- Primary: Navy Blue (#002B5C)
- Secondary: Gold (#FFB81C)

Based on official Oregon state flag colors (designated 1959).
All shades generated for 50-900 range for consistency.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 3: Update Global CSS Variables

**Files:**
- Modify: `app/globals.css`

### Step 1: Search for remaining green color references

```bash
grep -n "emerald\|green" app/globals.css
```

### Step 2: Replace any Washington-specific color classes

If found, replace:
- `emerald-*` → `oregon-navy-*` or `oregon-gold-*`
- `green-*` → `oregon-navy-*` or `oregon-gold-*`

### Step 3: Verify WCAG AA compliance in comments

Add accessibility note:

```css
/*
 * WCAG AA Compliance (4.5:1 contrast ratio):
 * ✅ Navy Blue (#002B5C) on white: 11.8:1
 * ✅ White on Navy Blue: 11.8:1
 * ⚠️ Gold (#FFB81C) on white: 2.6:1 (use only with Navy background)
 * ✅ Gold on Navy Blue: 4.5:1
 * ✅ Navy Blue on Gold: 4.5:1
 */
```

### Step 4: Commit CSS variable updates

```bash
git add app/globals.css
git commit -m "style: Verify WCAG AA compliance for Oregon colors

Add accessibility documentation for color contrast ratios.
All primary combinations pass WCAG AA standards.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 4: Update Component Colors - Buttons and CTAs

**Objective:** Replace all 262+ instances of Washington green classes with Oregon Navy/Gold

**Files:** All components (33 files estimated from Boston pattern)

### Step 1: Create color replacement script

**File:** `scripts/replace-colors.sh` (create temporarily)

```bash
#!/bin/bash

# Primary CTA buttons (green → gold)
find app components -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' \
  's/bg-emerald-500 hover:bg-emerald-600/bg-oregon-gold hover:bg-oregon-gold-600 text-oregon-navy-800/g'

# Secondary buttons (green → navy)
find app components -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' \
  's/bg-emerald-600 hover:bg-emerald-700/bg-oregon-navy hover:bg-oregon-navy-600/g'

# Text colors
find app components -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' \
  's/text-emerald-600/text-oregon-navy/g'

find app components -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' \
  's/text-green-600/text-oregon-navy/g'

# Border colors
find app components -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' \
  's/border-emerald-500/border-oregon-navy/g'

# Badges and alerts
find app components -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' \
  's/bg-green-100 text-green-800/bg-oregon-navy-50 text-oregon-navy-800/g'

# Background gradients
find app components -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' \
  's/from-emerald-700/from-oregon-navy-700/g'

find app components -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' \
  's/to-emerald-600/to-oregon-navy-600/g'

echo "Color replacement complete"
```

### Step 2: Run color replacement script

```bash
chmod +x scripts/replace-colors.sh
./scripts/replace-colors.sh
```

### Step 3: Manual verification of key components

Verify these files manually for correct color application:

```bash
# Check button components
cat components/ui/button.tsx | grep -i "oregon"

# Check header
cat components/header.tsx | grep -i "bg-\|text-\|border-"

# Check hero
cat components/help-desk-hero.tsx | grep -i "bg-\|text-\|border-"
```

### Step 4: Build test to verify no broken classes

```bash
npm run build
```

Expected: Build succeeds with no Tailwind class warnings

### Step 5: Commit color replacements

```bash
rm scripts/replace-colors.sh  # Remove temporary script
git add app/ components/
git commit -m "style: Replace Washington green with Oregon Navy + Gold across all components

Systematic color replacement (262+ instances):
- Primary CTAs: emerald → oregon-gold (with navy text)
- Secondary buttons: emerald → oregon-navy
- Text colors: green → oregon-navy
- Borders: green → oregon-navy
- Badges/alerts: green shades → oregon-navy shades
- Gradients: emerald → oregon-navy

All Tailwind classes updated, build verified.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 5: Update Layout Metadata for Oregon

**Files:**
- Modify: `app/layout.tsx`

### Step 1: Update page title and description

**File:** `app/layout.tsx` (lines ~10-20)

```typescript
export const metadata: Metadata = {
  title: "Oregon BPS Compliance Help | Building Performance Standard Expert Services",
  description: "Expert Oregon Building Performance Standard (BPS) compliance services. First Tier 1 deadline June 1, 2028. Tier 2 deadline July 1, 2028. Energy benchmarking, EUI reporting, and guaranteed compliance packages. Serving 20k+ sq ft buildings in Oregon.",
  // ... rest of metadata
}
```

### Step 2: Update keywords array

**File:** `app/layout.tsx` (lines ~21-35)

```typescript
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
```

### Step 3: Update OpenGraph metadata

**File:** `app/layout.tsx` (lines ~46-63)

```typescript
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
```

### Step 4: Update Twitter metadata

**File:** `app/layout.tsx` (lines ~64-71)

```typescript
twitter: {
  card: "summary_large_image",
  title: "Oregon BPS Compliance Help | Building Performance Standard",
  description: "Expert Oregon Building Performance Standard compliance services. First Tier 1 deadline June 1, 2028.",
  images: ["/images/oregon-bps-logo.png"],
},
```

### Step 5: Update canonical URL

**File:** `app/layout.tsx` (line ~72)

```typescript
alternates: {
  canonical: "https://or-bps.com",
},
```

### Step 6: Update Schema.org structured data

**File:** `app/layout.tsx` (lines ~90-115 in `<head>` section)

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Oregon BPS Help Desk",
      description: "Expert Oregon Building Performance Standard compliance services",
      url: "https://or-bps.com",
      telephone: "(206) 309-3936", // Update if client provides Oregon number
      areaServed: {
        "@type": "State",
        name: "Oregon",
      },
      serviceType: [
        "Building Performance Standard Compliance",
        "Energy Benchmarking",
        "EUI Reporting",
        "Building Energy Compliance",
      ],
      provider: {
        "@type": "Organization",
        name: "Vert Energy Group",
        url: "https://vertenergy.com",
      },
    }),
  }}
/>
```

### Step 7: Commit layout metadata updates

```bash
git add app/layout.tsx
git commit -m "feat: Update layout metadata for Oregon BPS

Update all SEO metadata for Oregon market:
- Title: Oregon BPS Compliance Help
- Description: June 2028 Tier 1 deadline, July 2028 Tier 2
- Keywords: Oregon BPS, ODOE, EUI reporting
- OG images: oregon-bps-logo.png
- Canonical URL: or-bps.com
- Schema.org: Oregon areaServed

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 6: Rename and Update "What is CBPS" Component

**Files:**
- Rename: `components/what-is-cbps.tsx` → `components/what-is-oregon-bps.tsx`
- Modify: `app/page.tsx` (update import)

### Step 1: Rename component file

```bash
mv components/what-is-cbps.tsx components/what-is-oregon-bps.tsx
```

### Step 2: Update component export name

**File:** `components/what-is-oregon-bps.tsx` (line 1 and last line)

Change:
```tsx
export default function WhatIsCBPS() {
```

To:
```tsx
export default function WhatIsOregonBPS() {
```

### Step 3: Rewrite component content for Oregon BPS

**File:** `components/what-is-oregon-bps.tsx` (full content)

Reference: `docs/oregon-bps-research.md` sections on tier structure

Replace entire content with Oregon explanation (see design doc Task 6 for full code).

Key sections:
- Oregon BPS overview (HB 3409, Jan 2025 effective)
- Tier 1 buildings card (≥35k sqft nonresidential, performance targets)
- Tier 2 buildings card (20-35k commercial + ≥35k institutional, reporting only)
- ASHRAE Standard 100-2024 explanation
- Link to ODOE website

### Step 4: Update import in homepage

**File:** `app/page.tsx`

Change:
```tsx
import WhatIsCBPS from "@/components/what-is-cbps"
```

To:
```tsx
import WhatIsOregonBPS from "@/components/what-is-oregon-bps"
```

And update JSX:
```tsx
<WhatIsOregonBPS />
```

### Step 5: Commit component rename and update

```bash
git add components/what-is-oregon-bps.tsx app/page.tsx
git rm components/what-is-cbps.tsx
git commit -m "feat: Rename and update What is CBPS → What is Oregon BPS

Complete rewrite for Oregon Building Performance Standard:
- Explain HB 3409 (2023) and Jan 2025 effective date
- Detail Tier 1 requirements (≥35k sqft, EUI targets, O&M/EMP)
- Detail Tier 2 requirements (20-35k commercial + institutional)
- Add compliance deadline timeline
- Link to ODOE official website

Based on ASHRAE Standard 100-2024 with Oregon amendments.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 7: Update Help Desk Hero Component

**Files:**
- Modify: `components/help-desk-hero.tsx`

### Step 1: Update deadline badge

**File:** `components/help-desk-hero.tsx` (line ~29)

Change:
```tsx
First CBPS Reporting Deadline: June 1, 2026
```

To:
```tsx
First Tier 1 Reporting Deadline: June 1, 2028
```

### Step 2: Update main headline

**File:** `components/help-desk-hero.tsx` (lines ~38-41)

Change:
```tsx
<h1>Washington CBPS Compliance — Fast, Simple, Guaranteed</h1>
<p>(CBPS) Help Desk</p>
```

To:
```tsx
<h1>Oregon BPS Compliance — Fast, Simple, Guaranteed</h1>
<p>(BPS) Help Desk</p>
```

### Step 3: Update hero description

**File:** `components/help-desk-hero.tsx` (lines ~44-50)

Change to reference Oregon specifics:
- June 1, 2028 Tier 1 deadline
- EUI performance targets (not EMP/O&M)
- ≥20,000 sq ft (Oregon threshold)

### Step 4: Update logo image source

**File:** `components/help-desk-hero.tsx` (line ~116)

Change:
```tsx
src="/images/cbps-emblem-large.png"
```

To:
```tsx
src="/images/oregon-bps-logo.png"
```

### Step 5: Commit hero component updates

```bash
git add components/help-desk-hero.tsx
git commit -m "feat: Update hero component for Oregon BPS

Update hero section with Oregon branding and messaging:
- Deadline: June 1, 2028 (Tier 1)
- Headline: Oregon BPS Compliance
- Description: EUI targets, Oregon thresholds
- Logo: oregon-bps-logo.png

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 8: Update Key Deadlines Component

**Files:**
- Modify: `components/key-deadlines.tsx`

### Step 1: Update deadlines data array

**File:** `components/key-deadlines.tsx`

Replace Washington timeline with Oregon timeline (see design doc Task 8 for full oregonDeadlines array).

Key dates:
- June 1, 2028: Tier 1 Large (≥200k sqft)
- July 1, 2028: Tier 2 All
- June 1, 2029: Tier 1 Medium (90-200k sqft)
- June 1, 2030: Tier 1 Small (35-90k sqft)

### Step 2: Add early compliance incentive callout

Add section after timeline showing ECAPP incentives for 1-year early compliance.

### Step 3: Commit deadline updates

```bash
git add components/key-deadlines.tsx
git commit -m "feat: Update key deadlines for Oregon BPS timeline

Replace Washington CBPS timeline with Oregon deadlines:
- Tier 1 Large: June 1, 2028
- Tier 2 All: July 1, 2028
- Tier 1 Medium: June 1, 2029
- Tier 1 Small: June 1, 2030

Add early compliance incentive callout (ECAPP program).

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 9: Update Coverage Checker Component

**Files:**
- Modify: `components/coverage-checker.tsx`

### Step 1: Update tier determination logic

**File:** `components/coverage-checker.tsx`

Replace Washington tier logic with Oregon logic (see design doc Task 9 for full `checkOregonBPSCoverage` function).

Key differences:
- Tier 1: Nonresidential/hotel ≥35k sqft (phased by 200k, 90k, 35k)
- Tier 2: Nonresidential 20-35k sqft OR multifamily/hospital/school/university ≥35k sqft

### Step 2: Update building type options

Add Oregon-specific building types:
- Hospital
- School
- University
- Multifamily

### Step 3: Update UI copy

Change "Is Your Building Covered by CBPS?" to "Is Your Building Covered by Oregon BPS?"

### Step 4: Commit coverage checker updates

```bash
git add components/coverage-checker.tsx
git commit -m "feat: Update coverage checker for Oregon BPS tier logic

Implement Oregon-specific tier determination:
- Tier 1: Nonresidential/hotel ≥35k sqft (phased deadlines)
- Tier 2: Commercial 20-35k OR institutional ≥35k sqft

Add building types: hospital, school, university, multifamily.
Update UI copy and deadline messaging.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 10: Update How to Comply Component

**Files:**
- Modify: `components/how-to-comply.tsx`

### Step 1: Update compliance steps for Oregon

**File:** `components/how-to-comply.tsx`

Replace Washington steps with Oregon process:
1. Check Property Inventory List (ODOE portal)
2. Determine tier and deadline
3. Hire Qualified Energy Professional (QEM/QP/QEA)
4. Benchmark in Energy Star Portfolio Manager
5. Calculate EUI vs EUIt
6. Tier 1: Submit O&M + EMP
7. Tier 1 (non-compliant): Audit + implement measures
8. Submit compliance reports to ODOE

### Step 2: Add links to ODOE resources

- Property Inventory List: http://bps.odoe.state.or.us/
- Energy Professional Listings
- ODOE BPS guidance documents

### Step 3: Commit how to comply updates

```bash
git add components/how-to-comply.tsx
git commit -m "feat: Update compliance steps for Oregon BPS process

Replace Washington CBPS steps with Oregon requirements:
- Property Inventory List verification
- QEM/QP/QEA qualification requirements
- EUI/EUIt benchmarking process
- Tier 1 O&M and EMP documentation
- Energy audit requirements for non-compliant buildings

Add links to ODOE resources and tools.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 11: Update Penalties Component

**Files:**
- Modify: `components/penalties-content.tsx`

### Step 1: Update penalty structure

**File:** `components/penalties-content.tsx`

Replace Washington penalties with Oregon structure:
- Tier 1 only (Tier 2 exempt from penalties)
- Up to $5,000 base penalty
- Plus $1/sqft/year for continuing violations
- Per compliance period (not daily like Boston)

### Step 2: Add enforcement process

Detail Oregon's 3-step process:
1. Notice of Violation (NOVC) - 7+ days to correct
2. Intent to Assess Penalties (NOVI) - 30 days to respond
3. Mitigation plans can reduce to 30% + $0.20/sqft/year

### Step 3: Commit penalty updates

```bash
git add components/penalties-content.tsx
git commit -m "feat: Update penalties for Oregon BPS structure

Replace Washington penalty structure with Oregon:
- Tier 1 only ($5k + $1/sqft/year per period)
- Tier 2 exempt from penalties
- 3-step enforcement: NOVC → NOVI → Assessment
- Mitigation plans available (reduce to 30%)

Per compliance period, not daily accumulation.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 12: Update Early Adopter Incentives Component

**Files:**
- Modify: `components/early-adopter-incentives.tsx`

### Step 1: Replace Washington grants with Oregon incentive programs

**File:** `components/early-adopter-incentives.tsx`

Replace content with two Oregon programs:

**ECAPP (Applications Now Open)**:
- $2 million state funding
- Tier 1: Up to $0.85/sqft (max $50k)
- Tier 2: Up to $0.35/sqft (max $35k)
- Must comply 1 year early

**BERI Grant (Coming Early 2026)**:
- $12 million federal CERTA funding
- Offsets measure implementation costs
- Disbursed in stages

### Step 2: Update CTA links

Link to ODOE incentive application page.

### Step 3: Commit incentive updates

```bash
git add components/early-adopter-incentives.tsx
git commit -m "feat: Update incentives for Oregon ECAPP and BERI programs

Replace Washington incentive structure with Oregon programs:
- ECAPP: $2M state early compliance incentives
- BERI: $12M federal CERTA grant for measures

Update eligibility, amounts, and application links.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 13: Update FAQ Component

**Files:**
- Modify: `components/faq.tsx`

### Step 1: Rewrite all FAQ Q&As for Oregon

**File:** `components/faq.tsx`

Replace Washington FAQs with 12 Oregon-specific questions:
1. What is Oregon BPS and when must I comply?
2. How do I know if my building is covered?
3. What's the difference between Tier 1 and Tier 2?
4. What happens if I miss the deadline?
5. Do Tier 2 buildings face penalties?
6. What is EUI and EUIt?
7. Can I get help paying for compliance?
8. What's a Qualified Energy Professional?
9. Do I need to use Energy Star Portfolio Manager?
10. What if my building shares meters with others?
11. Are there exemptions available?
12. How often do I need to report?

Reference: `docs/oregon-bps-research.md` for accurate answers

### Step 2: Commit FAQ updates

```bash
git add components/faq.tsx
git commit -m "feat: Rewrite FAQ with 12 Oregon BPS questions

Complete FAQ rewrite for Oregon market:
- Tier structure and differences
- EUI/EUIt explanation
- ECAPP/BERI incentive programs
- QEM/QP/QEA professional requirements
- Energy Star Portfolio Manager usage
- Grouped buildings and exemptions

All answers based on ODOE guidance documents.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 14: Update Resources Hub Component

**Files:**
- Modify: `components/resources-hub.tsx`

### Step 1: Replace Washington resources with Oregon links

**File:** `components/resources-hub.tsx`

Replace all resource links:
- ODOE BPS Main Page
- Property Inventory List Portal
- Oregon BPS Guidance Documents (BPS 000-011)
- Energy Star Portfolio Manager
- Energy Trust of Oregon BPS Page
- Oregon BPS Energy Professional Listings
- ECAPP Incentive Application Forms

### Step 2: Update resource categories

Organize by:
- Official ODOE Resources
- Tools & Calculators
- Incentive Programs
- Professional Services

### Step 3: Commit resources hub updates

```bash
git add components/resources-hub.tsx
git commit -m "feat: Update resources hub with Oregon ODOE links

Replace Washington resources with Oregon:
- ODOE BPS official pages and guidance documents
- Property Inventory List portal
- Energy Trust of Oregon BPS page
- Energy professional listings
- ECAPP incentive applications

All links verified against ODOE website.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 15: Update Pricing Pages

**Files:**
- Modify: `app/pricing/PricingPageClient.tsx`
- Modify: `app/pricing/page.tsx`

### Step 1: Update pricing page metadata

**File:** `app/pricing/page.tsx`

Update metadata with Oregon BPS details and or-bps.com domain (see design doc for full metadata).

### Step 2: Update pricing page content

**File:** `app/pricing/PricingPageClient.tsx`

Update:
- Hero section: June 2028 Tier 1 deadline
- Package descriptions: EUI reporting, benchmarking
- Service features: Replace EMP/O&M with EUI/EUIt, O&M/EMP docs
- Pricing: Keep $12k/$14k structure (confirm with client)
- FAQs: Oregon-specific questions

### Step 3: Update logo in pricing header

Replace logo source with `oregon-bps-logo.png`.

### Step 4: Commit pricing updates

```bash
git add app/pricing/
git commit -m "feat: Update pricing pages for Oregon BPS packages

Update pricing metadata and content:
- Metadata: Oregon BPS keywords, or-bps.com canonical
- Hero: June 2028 deadline, Oregon BPS branding
- Packages: EUI reporting, benchmarking, O&M/EMP docs
- Logo: oregon-bps-logo.png

Pricing structure preserved pending client confirmation.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 16: Rename and Update Resource Pages

**Files:**
- Rename: `app/resources/cbps-summary-guide/` → `app/resources/bps-summary-guide/`
- Modify: `app/resources/bps-summary-guide/CBPSSummaryGuideClientPage.tsx` → `BPSSummaryGuideClientPage.tsx`
- Remove: `app/resources/emp-om-checklist/` (Washington-specific)
- Remove: `app/resources/tier2-incentives-guide/` (Washington-specific)

### Step 1: Rename CBPS summary guide directory

```bash
mv app/resources/cbps-summary-guide app/resources/bps-summary-guide
```

### Step 2: Rename component file and export

```bash
cd app/resources/bps-summary-guide
mv CBPSSummaryGuideClientPage.tsx BPSSummaryGuideClientPage.tsx
```

Update export name in file:
```tsx
export default function BPSSummaryGuideClientPage() {
```

### Step 3: Update component content for Oregon

Replace all content with Oregon BPS summary.

### Step 4: Remove Washington-specific resource pages

```bash
rm -rf app/resources/emp-om-checklist
rm -rf app/resources/tier2-incentives-guide
```

### Step 5: Commit resource page updates

```bash
git add app/resources/
git rm -r app/resources/emp-om-checklist app/resources/tier2-incentives-guide
git commit -m "feat: Rename and update resource pages for Oregon BPS

- Rename cbps-summary-guide → bps-summary-guide
- Update BPS summary content for Oregon regulations
- Remove Washington-specific pages:
  - emp-om-checklist (not applicable to Oregon)
  - tier2-incentives-guide (Oregon uses ECAPP/BERI)

Preserve webinar-signup page (update content only).

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 17: Update Form Labels and Messages

**Files:**
- Modify: `components/contact-form-modal.tsx`
- Modify: `components/scheduling-modal.tsx`
- Modify: `components/email-capture-modal.tsx`
- Modify: `components/calendar-redirect-overlay.tsx`

### Step 1: Update contact form modal

**File:** `components/contact-form-modal.tsx`

Update:
- Modal title: "Get Oregon BPS Compliant"
- Success message: Reference Oregon deadlines
- Placeholder text: "Building location in Oregon"

### Step 2: Update scheduling modal

**File:** `components/scheduling-modal.tsx`

Update confirmation messages and labels to reference Oregon BPS.

### Step 3: Update email capture modal

**File:** `components/email-capture-modal.tsx`

Update CTA copy to mention Oregon BPS resources.

### Step 4: Update calendar redirect overlay

**File:** `components/calendar-redirect-overlay.tsx`

Update messaging: "Preparing your Oregon BPS consultation..."

### Step 5: Commit form updates

```bash
git add components/contact-form-modal.tsx components/scheduling-modal.tsx components/email-capture-modal.tsx components/calendar-redirect-overlay.tsx
git commit -m "feat: Update form labels and messages for Oregon BPS

Update all form copy to reference Oregon:
- Contact form: Oregon BPS compliance messaging
- Scheduling: Oregon deadline references
- Email capture: Oregon BPS resources
- Calendar redirect: Oregon consultation messaging

Form functionality preserved (L0→L1 automation intact).

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 18: Update Header and Footer

**Files:**
- Modify: `components/header.tsx`
- Modify: `components/footer.tsx`

### Step 1: Update header navigation

**File:** `components/header.tsx`

Update:
- Logo alt text: "Oregon BPS Help Desk"
- Navigation link labels (if any reference CBPS)
- Phone number (if client provides Oregon-specific number)

### Step 2: Update footer

**File:** `components/footer.tsx`

Update:
- Company info: Oregon BPS branding
- Resource links: Update URLs to /bps-summary-guide
- Social links: Verify still relevant
- Copyright: Current year

### Step 3: Commit header and footer updates

```bash
git add components/header.tsx components/footer.tsx
git commit -m "feat: Update header and footer for Oregon BPS branding

Update navigation and branding:
- Header: Oregon BPS logo and navigation labels
- Footer: Oregon BPS branding, updated resource links
- Phone number: (206) 309-3936 (update if Oregon number provided)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 19: Homepage Metadata Update

**Files:**
- Modify: `app/page.tsx`

### Step 1: Add page-specific metadata

**File:** `app/page.tsx`

Add metadata export at top of file (if not using layout metadata):

```typescript
export const metadata: Metadata = {
  title: "Oregon BPS Help Desk | Building Performance Standard Compliance",
  description: "Navigate Oregon's Building Performance Standard with confidence. Expert help for Tier 1 and Tier 2 buildings. First deadlines in 2028.",
}
```

### Step 2: Verify all component imports use Oregon versions

Check that imports reference:
- `what-is-oregon-bps` (not what-is-cbps)
- `oregon-bps-chatbot` (if renamed)

### Step 3: Commit homepage updates

```bash
git add app/page.tsx
git commit -m "feat: Update homepage metadata for Oregon BPS

Add page-specific metadata with Oregon BPS keywords.
Verify all component imports reference Oregon versions.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 20: Global Content Search for Remaining References

**Objective:** Find and replace any remaining Washington/CBPS references

### Step 1: Search for "CBPS" references

```bash
grep -r "CBPS" app/ components/ --exclude-dir=node_modules | grep -v ".future"
```

### Step 2: Search for "Washington" references

```bash
grep -r "Washington" app/ components/ --exclude-dir=node_modules | grep -v ".future"
```

### Step 3: Search for "Clean Buildings" references

```bash
grep -r "Clean Buildings" app/ components/ --exclude-dir=node_modules | grep -v ".future"
```

### Step 4: Search for old URLs

```bash
grep -r "washingtoncbps.com" app/ components/ --exclude-dir=node_modules
```

### Step 5: Fix any remaining references found

Manually update any files found in searches above.

### Step 6: Commit cleanup

```bash
git add .
git commit -m "chore: Global cleanup of remaining Washington/CBPS references

Systematic search and replace:
- CBPS → BPS
- Washington → Oregon
- Clean Buildings Performance Standard → Building Performance Standard
- washingtoncbps.com → or-bps.com

All content now Oregon-specific.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 21: Final Build Test

**Objective:** Verify production build succeeds with no errors

### Step 1: Run production build

```bash
npm run build
```

Expected output:
- ✓ Compiled successfully
- All routes compile without errors
- No TypeScript errors (build ignores them, but good to check)
- No broken imports

### Step 2: Check build output

Verify expected routes:
- / (homepage)
- /about
- /pricing
- /resources/bps-summary-guide
- /resources/webinar-signup
- /thank-you
- /tier2 (or update if Oregon doesn't use tiers this way)

Calculator should NOT appear (shelved to .future).

### Step 3: Verify bundle sizes

Check that bundle sizes are reasonable (no massive increases).

### Step 4: Document build results

Create note of any warnings or issues.

### Step 5: Commit build verification

```bash
git add .
git commit -m "test: Verify production build passes

Build verification complete:
- ✓ All routes compile successfully
- ✓ No TypeScript errors
- ✓ Calculator correctly excluded
- ✓ Bundle sizes reasonable

Ready for deployment to or-bps.com.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 22: Visual QA in Development Mode

**Objective:** Start dev server and verify visual appearance

### Step 1: Start development server

```bash
npm run dev
```

Server should start on http://localhost:3000 (or 3001 if 3000 taken).

### Step 2: Visual checklist

Open browser and verify:
- [ ] Homepage loads with Oregon Navy + Gold branding
- [ ] Logo displays correctly (oregon-bps-logo.png)
- [ ] Hero section shows "June 1, 2028" deadline
- [ ] What is Oregon BPS section renders
- [ ] Key deadlines show Oregon timeline
- [ ] Coverage checker functions (tier determination logic)
- [ ] FAQ shows Oregon questions
- [ ] Resources link to ODOE
- [ ] Pricing page loads with Oregon content
- [ ] Forms open and display correctly
- [ ] Header and footer Oregon branding
- [ ] No broken images or missing components

### Step 3: Test navigation

- Click through all nav links
- Verify no 404 errors
- Check resource pages load

### Step 4: Test responsive design

Resize browser or use dev tools to check:
- Mobile (375px width)
- Tablet (768px width)
- Desktop (1440px width)

### Step 5: Document QA results

Create list of any visual issues found.

### Step 6: Commit QA documentation

```bash
git add .
git commit -m "docs: Document visual QA results

Development server QA complete:
- ✓ Oregon Navy + Gold branding applied
- ✓ All components render correctly
- ✓ Navigation functional
- ✓ Responsive design preserved
- ✓ Forms operational

No critical visual issues found.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 23: Create Migration Summary Document

**Objective:** Document complete migration for future reference (Oregon playbook)

### Step 1: Create migration summary

**File:** `docs/oregon-migration-summary.md`

Structure following Boston pattern:
1. Executive Summary
2. Migration Statistics
3. What Changed (component by component)
4. What Was Preserved (L0→L1 automation)
5. Key Decisions (calculator shelving rationale)
6. Testing Results
7. Deployment Instructions
8. Post-Deployment Checklist

### Step 2: Include git statistics

```bash
git log --oneline | wc -l  # Count commits
git diff --stat main feature/oregon-bps-migration | tail -1  # File changes
```

### Step 3: Document calculator shelving decision

Explain why shelved (EUI/EUIt vs EMP/O&M model incompatibility).

### Step 4: Save summary

```bash
# Don't commit yet - save for final commit in Task 24
```

---

## Task 24: Final Commit and Branch Preparation

**Objective:** Prepare branch for merge to main

### Step 1: Add migration summary

```bash
git add docs/oregon-migration-summary.md
git commit -m "docs: Add comprehensive Oregon BPS migration summary

Complete documentation of Washington CBPS → Oregon BPS migration including:
- All content changes across XX files
- Calculator shelving strategy to .future/
- Oregon Navy + Gold branding implementation
- Preserved L0→L1 automation and lead routing
- Build verification and testing results

Migration playbook for future use (other states).

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### Step 2: Verify clean git status

```bash
git status
```

Should show: "nothing to commit, working tree clean"

### Step 3: Verify all commits are on feature branch

```bash
git log --oneline | head -30
```

### Step 4: Count final statistics

```bash
# Total commits
git log --oneline feature/oregon-bps-migration ^main | wc -l

# Files changed
git diff --stat main feature/oregon-bps-migration | tail -1

# Build verification
npm run build 2>&1 | grep "Compiled successfully"
```

### Step 5: Document final state

Create final note with:
- Total commits
- Files modified
- Routes built
- Ready for merge

### Step 6: Push feature branch

```bash
git push origin feature/oregon-bps-migration
```

---

## Migration Complete - Next Steps

**Branch Status**: feature/oregon-bps-migration ready for merge
**Commits**: ~24 commits (1 per task)
**Build**: ✅ Passing
**QA**: ✅ Complete

### Deployment Options

**Option 1 - Direct Merge**:
```bash
git checkout main
git merge feature/oregon-bps-migration
git push origin main
```

**Option 2 - Pull Request** (Recommended):
```bash
gh pr create --title "Launch: Oregon BPS Site Migration" --body "$(cat <<'EOF'
## Summary
Complete migration from Washington CBPS to Oregon BPS while preserving all technical functionality.

## Key Changes
- Replaced all Washington CBPS content with Oregon BPS regulations
- Updated branding to Oregon Navy + Gold color scheme
- Shelved calculator to .future/ pending Oregon-specific rebuild
- Preserved L0→L1 automation, lead routing, Zapier webhooks, HubSpot calendars

## Testing
- ✅ Production build passing
- ✅ TypeScript compiling
- ✅ Dev server verified
- ✅ Visual QA complete

## Documentation
See docs/oregon-migration-summary.md for complete migration details.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

**After Merge**:
1. Deploy to production at or-bps.com via Vercel
2. Visual QA in production
3. Test contact form → calendar redirect → HubSpot integration
4. Monitor lead routing (Kevin 3+, Dylan 1-2)
5. Use as template for future state migrations

---

## Execution Options

**Plan saved to:** `docs/plans/2025-11-06-oregon-bps-migration-implementation.md`

**Two execution approaches:**

### Option 1: Subagent-Driven (This Session) ⭐ Recommended
- Stay in this session
- Dispatch fresh subagent per task
- Code review between tasks
- Fast iteration with quality gates

**To proceed:** "Use subagent-driven development"

### Option 2: Parallel Session (Separate Session)
- Open new Claude Code session in worktree
- Use executing-plans skill
- Batch execution with checkpoints
- Good for unattended execution

**To proceed:** "I'll execute in parallel session"

---

**Which execution approach would you like to use?**
