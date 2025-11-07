# Multi-State BPS Migration Pattern

## Overview

This document describes the proven pattern for migrating the Washington CBPS website template to other state Building Performance Standard implementations. This pattern has been successfully applied to three states:

1. **Washington CBPS** (Original) - washingtoncbps.com
2. **Boston BERDO** (First migration) - bostonberdo.com
3. **Oregon BPS** (Second migration) - or-bps.com

## Migration Pattern Summary

Each migration follows a systematic 4-phase approach that takes approximately 6-8 hours over 1-2 sessions to reach 95% production-ready status.

### Phase 1: Foundation (2-3 hours)
- Shelve/disable incompatible features (calculator)
- Update brand colors in Tailwind + CSS variables
- Global color replacement (green → state colors)
- Update layout metadata (SEO, OG tags)
- Bulk content replacement (state name, law references)

### Phase 2: Content Migration (1-2 hours)
- Systematic CBPS → [State Name] replacements
- URL updates (domain changes)
- State-specific terminology

### Phase 3: Core Regulatory Components (2-3 hours)
- Key deadlines component
- Penalties component
- Incentives component
- Coverage checker (tier logic)
- How to comply component
- What is [State] component
- FAQ rewrite
- Resources hub updates

### Phase 4: Polish & Deployment (1-2 hours)
- Homepage metadata optimization
- Chatbot response updates
- Pricing page updates
- Global content cleanup
- Final build test
- Migration documentation

## State-Specific Requirements Matrix

| Component | Washington CBPS | Boston BERDO | Oregon BPS |
|-----------|----------------|--------------|------------|
| **Brand Colors** | Green (#059669) | Blue (#1E3A8A) | Navy (#002B5C) + Gold (#FFB81C) |
| **Primary Law** | RCW 19.27A.210 | BERDO 2.0 (2021) | HB 3409 (2023) |
| **Regulatory Code** | WAC 194-50 | Boston Municipal Code | OAR 330-140 |
| **Enforcement** | WA Dept of Commerce | Boston Environment Dept | Oregon DEQ + ODOE |
| **Tier 1 Threshold** | ≥50k sqft commercial | ≥20k sqft buildings | ≥35k sqft commercial |
| **Tier 2 Threshold** | 20-50k sqft commercial | N/A (single tier) | 20-35k commercial + ALL institutional ≥35k |
| **Tier 1 Deadline** | July 2026 (≥90k), July 2027 (50-90k) | June 2025 (varies by size) | June 2028/2029/2030 (by size) |
| **Tier 2 Deadline** | July 2028 | N/A | July 2028 |
| **Compliance Model** | EMP + O&M Plan (prescriptive) | BERDO limits (emissions-based) | EUI/EUIt targets (performance-based) |
| **Tier 1 Penalties** | $5k + $0.30/sqft (max $55,555) | $234/ton CO2e over limit | $5k + $1/sqft annually |
| **Tier 2 Penalties** | $0.30/sqft flat fee | N/A | NO PENALTIES (reporting only) |
| **Primary Incentive** | Commerce $150M grants | BPDA incentives, rebates | ECAPP $2M + BERI $12M |
| **Secondary Incentive** | Tax credits | Utility rebates | Federal grants |

## Critical Files Requiring Updates

### 1. Configuration Files (Always Update)
```
tailwind.config.ts          # Brand color palettes
app/globals.css             # CSS custom properties
app/layout.tsx              # Site-wide metadata, favicon, OG images
next.config.mjs             # Domain, environment
```

### 2. Core Compliance Components (100% Rewrite Required)
```
components/key-deadlines.tsx              # Tier deadlines, size thresholds
components/penalties-content.tsx          # Penalty amounts, structure, examples
components/early-adopter-incentives.tsx   # State/federal grant programs
components/coverage-checker.tsx           # Tier logic, size thresholds
components/how-to-comply.tsx              # Compliance model (EMP vs EUI vs emissions)
components/what-is-[state]-bps.tsx        # Core explainer (rename file)
components/faq.tsx                        # Q&A completely state-specific
components/resources-hub.tsx              # External links, downloadable guides
```

### 3. Metadata & SEO (Critical for Discoverability)
```
app/page.tsx                  # Homepage metadata
app/pricing/page.tsx          # Service page metadata
app/about/page.tsx            # About page metadata
app/api/chat/route.ts         # Chatbot context & responses
```

### 4. Form Integration (Update for Lead Routing)
```
lib/hooks/useHubSpotBooking.ts      # Calendar URLs (state-specific)
components/contact-form-modal.tsx   # Zapier webhook endpoint
components/scheduling-modal.tsx     # Zapier webhook endpoint
components/webinar-signup-modal.tsx # Zapier webhook endpoint
components/email-capture-modal.tsx  # Zapier webhook endpoint
components/newsletter-signup.tsx    # Zapier webhook endpoint
```

### 5. Feature-Specific (May Require Shelving)
```
components/calculator-*.tsx          # Often state-specific, shelve if incompatible
lib/cbps-calculator.ts              # Calculation logic
.future/calculator/                 # Shelved calculator with reactivation docs
```

## Migration Checklist

Use this checklist for every state migration:

### Pre-Migration (30 minutes)
- [ ] Research target state's BPS law
- [ ] Document tier structure, deadlines, penalties
- [ ] Identify incentive programs (state + federal)
- [ ] Determine compliance model (prescriptive/performance/emissions)
- [ ] Create `docs/[state]-bps-research.md` with findings
- [ ] Decide calculator compatibility (shelve vs migrate)

### Phase 1: Foundation (2-3 hours)
- [ ] Shelve calculator to `.future/calculator/` with README
- [ ] Add state brand colors to `tailwind.config.ts`
- [ ] Update CSS variables in `app/globals.css`
- [ ] Global color replacement (find/replace Washington green → state colors)
- [ ] Update `app/layout.tsx` metadata (title, description, OG image)
- [ ] Commit: "chore: Add [State] brand colors"

### Phase 2: Content Migration (1-2 hours)
- [ ] Bulk replace: "Washington CBPS" → "[State] BPS/BERDO"
- [ ] Bulk replace: "Clean Buildings Performance Standard" → "[State-specific name]"
- [ ] Bulk replace: "washingtoncbps.com" → "[new-domain].com"
- [ ] Bulk replace: "Washington State" → "[State Name]"
- [ ] Bulk replace law references (RCW → statute, WAC → code)
- [ ] Commit: "chore: Bulk content replacement for [State]"

### Phase 3: Core Components (3-4 hours)

#### Task 3.1: Key Deadlines
- [ ] Update tier deadlines (Tier 1 dates, Tier 2 dates)
- [ ] Update size thresholds for each tier
- [ ] Add state-specific deadline notes (exemptions, extensions)
- [ ] Test build
- [ ] Commit: "feat: Update key deadlines for [State] BPS"

#### Task 3.2: Penalties
- [ ] Update penalty structure (base + per sqft, vs flat, vs emissions)
- [ ] Update penalty amounts ($5k + $0.30 vs $5k + $1 vs $234/ton)
- [ ] Add/remove penalty caps (Washington has cap, Oregon doesn't)
- [ ] Update penalty examples with state-specific calculations
- [ ] Update regulatory authority links
- [ ] Test build
- [ ] Commit: "feat: Update penalties for [State] BPS"

#### Task 3.3: Incentives
- [ ] Replace Washington Commerce grants with state programs
- [ ] Update grant amounts ($150M → $2M, etc.)
- [ ] Update program names (Commerce → ECAPP/BERI → BPDA)
- [ ] Update application deadlines
- [ ] Add federal programs if applicable (BERI, IRA credits)
- [ ] Test build
- [ ] Commit: "feat: Update incentives for [State] programs"

#### Task 3.4: Coverage Checker
- [ ] Update tier thresholds (50k → 35k, etc.)
- [ ] Update tier logic (commercial vs institutional rules)
- [ ] Handle state-specific edge cases (Oregon: ALL institutional → Tier 2)
- [ ] Update size-based deadline calculation
- [ ] Update penalty displays (dynamic calculations)
- [ ] Update next steps guidance
- [ ] Test build
- [ ] Commit: "feat: Update coverage checker for [State] tiers"

#### Task 3.5: How to Comply
- [ ] Determine compliance model (EMP/O&M vs EUI vs emissions)
- [ ] Rewrite 4-step process for state model
- [ ] Add detailed compliance path (7+ steps)
- [ ] Update audit requirements (ASHRAE Level 2, energy audit, emissions report)
- [ ] Add Tier 1 vs Tier 2 comparison if applicable
- [ ] Test build
- [ ] Commit: "feat: Rewrite how-to-comply for [State] compliance model"

#### Task 3.6: What is [State] Component
- [ ] Rename component file: `what-is-cbps.tsx` → `what-is-[state]-bps.tsx`
- [ ] Update imports in `app/page.tsx`
- [ ] Rewrite core explainer text
- [ ] Update tier cards with state deadlines
- [ ] Add state-specific notes (institutional rules, exemptions)
- [ ] Update external link to state regulatory page
- [ ] Delete old component file
- [ ] Test build
- [ ] Commit: "feat: Replace what-is-cbps with what-is-[state]-bps"

#### Task 3.7: FAQ
- [ ] Expand/contract FAQ count (Washington: 6, Oregon: 12)
- [ ] Rewrite each question for state regulations
- [ ] Update deadline questions
- [ ] Update penalty questions (emphasize Tier 2 differences)
- [ ] Add incentive program questions
- [ ] Add EUI/emissions/compliance model questions
- [ ] Test build
- [ ] Commit: "feat: Complete FAQ rewrite for [State] BPS"

#### Task 3.8: Resources Hub
- [ ] Update 4 downloadable resource titles
- [ ] Update resource descriptions (CBPS → BPS, EMP → EUI, etc.)
- [ ] Update 6+ external links
  - State regulatory agency (Commerce → DEQ → Environment Dept)
  - Primary law (RCW → HB → Municipal Code)
  - Administrative rules (WAC → OAR → BMC)
  - Enforcement agency
  - Incentive programs
- [ ] Keep ENERGY STAR Portfolio Manager (universal)
- [ ] Test build
- [ ] Commit: "feat: Update resources hub for [State] BPS"

### Phase 4: Polish (1-2 hours)

#### Task 4.1: Homepage Metadata
- [ ] Update page title with state deadlines
- [ ] Rewrite meta description (swap models, dates, incentives)
- [ ] Replace 15+ keywords (Washington → [State] specific)
- [ ] Update OpenGraph title/description/image
- [ ] Update canonical URL
- [ ] Test build
- [ ] Commit: "feat: Update homepage metadata for [State] BPS"

#### Task 4.2: Chatbot Context
- [ ] Rewrite `[STATE]_BPS_CONTEXT` with state overview
- [ ] Update all 8+ `getSimpleResponse()` handlers
  - deadline handler
  - incentive handler
  - size/sqft handler (dynamic calculations)
  - cost handler
  - penalty handler
  - tier handler
  - compliance model handler (EUI/emissions)
- [ ] Update penalty math (dynamic per-sqft calculations)
- [ ] Add state-specific handlers as needed
- [ ] Test build
- [ ] Commit: "feat: Complete chatbot rewrite for [State] BPS"

#### Task 4.3: Pricing Pages (Optional - can be post-launch)
- [ ] Update pricing hero with state deadlines
- [ ] Update package descriptions (EMP → EUI → emissions)
- [ ] Update service tiers (Tier 1/Tier 2 alignment)
- [ ] Note if incomplete: Flag for post-launch in docs
- [ ] Test build
- [ ] Commit: "feat: Update pricing page hero for [State] BPS"

#### Task 4.4: Integration Updates
- [ ] Update Zapier webhook endpoint (state-specific)
- [ ] Update HubSpot calendar URLs
  - Dylan calendar (1-2 buildings)
  - Kevin/rep calendar (3+ buildings) - use state-specific booking URL
- [ ] Update calendar routing logic if needed
- [ ] Test build
- [ ] Commit: "fix: Update Zapier webhook and calendar URLs for [State]"

#### Task 4.5: Final Cleanup
- [ ] Find remaining "[Previous State]" references with grep
- [ ] Batch replace common patterns with sed
- [ ] Update JSON-LD structured data
  - areaServed: state name
  - provider: domain
  - FAQ enforcement answers
  - FAQ penalty answers
- [ ] Test build
- [ ] Commit: "chore: Final cleanup of remaining references"

#### Task 4.6: Final Build & Documentation
- [ ] Run full production build: `npm run build`
- [ ] Verify all routes compile successfully
- [ ] Create `MIGRATION_COMPLETE.md` (use Oregon as template)
  - Migration statistics
  - Phase completion breakdown
  - State-specific accuracy checklist
  - Known limitations (remaining 5%)
  - Deployment readiness assessment
- [ ] Commit: "docs: [State] BPS migration complete - [X]% production ready"

### Post-Migration (30 minutes)
- [ ] Update this MIGRATION-PATTERN.md if new insights
- [ ] Push all commits to GitHub
- [ ] Deploy to Vercel (or hosting platform)
- [ ] Test live site
- [ ] Update HubSpot CRM for state-specific leads
- [ ] Configure Zapier workflow for state routing

## Common Pitfalls & Solutions

### 1. Calculator Incompatibility
**Problem:** Calculator is tightly coupled to Washington's EMP/O&M model
**Solution:** Shelve to `.future/calculator/` with 16-24hr reactivation docs, rebuild for state model post-launch

### 2. Tier Logic Edge Cases
**Problem:** Each state has unique tier rules (Oregon: ALL institutional → Tier 2)
**Solution:** Add explicit conditionals for state-specific edge cases, don't try to make generic

### 3. Penalty Structure Differences
**Problem:** Washington has caps ($55,555), Oregon doesn't; emissions-based vs sqft-based
**Solution:** Rewrite penalty component from scratch, don't try to reuse calculations

### 4. Compliance Model Confusion
**Problem:** Mixing EMP/O&M (prescriptive) with EUI/EUIt (performance) with emissions (BERDO)
**Solution:** Complete rewrite of "How to Comply" for each state, different mental models

### 5. Incomplete Resource Links
**Problem:** Linking to wrong state agency, outdated law references
**Solution:** Verify every external link during research phase, use official .gov sources

### 6. Metadata Duplication
**Problem:** Forgetting JSON-LD structured data, leaving old state references
**Solution:** Use grep to find ALL instances, update in `app/page.tsx` near bottom

### 7. HubSpot Calendar Confusion
**Problem:** Old state calendar URLs, wrong rep routing
**Solution:** Get new calendar URLs BEFORE migration, update in useHubSpotBooking.ts

### 8. Pricing Page Scope Creep
**Problem:** Full pricing page rewrite takes 2-3 hours
**Solution:** Update hero only for launch, flag full rewrite as post-launch polish

## Repository Structure

Each state migration should maintain this structure:

```
/
├── .future/
│   └── calculator/              # Shelved features with reactivation guides
├── app/
│   ├── layout.tsx               # Site-wide metadata
│   ├── page.tsx                 # Homepage + JSON-LD structured data
│   ├── pricing/
│   ├── about/
│   └── api/chat/route.ts        # Chatbot context
├── components/
│   ├── what-is-[state]-bps.tsx  # State-specific explainer
│   ├── key-deadlines.tsx
│   ├── penalties-content.tsx
│   ├── early-adopter-incentives.tsx
│   ├── coverage-checker.tsx
│   ├── how-to-comply.tsx
│   ├── faq.tsx
│   └── resources-hub.tsx
├── docs/
│   ├── [state]-bps-research.md       # Pre-migration research
│   ├── MIGRATION_STATUS.md            # Live progress tracking
│   ├── MIGRATION_COMPLETE.md          # Final summary
│   └── MIGRATION-PATTERN.md           # This document
├── lib/
│   └── hooks/
│       └── useHubSpotBooking.ts  # Calendar URLs
├── tailwind.config.ts            # Brand colors
└── app/globals.css               # CSS variables
```

## Success Metrics

A successful migration reaches these milestones:

**85% Complete (Minimum Viable Migration):**
- All core components updated (deadlines, penalties, incentives)
- Tier logic accurate
- Build passing
- Forms functional

**95% Complete (Production Ready - Recommended):**
- All above + homepage metadata optimized
- Chatbot responses rewritten
- Pricing hero updated
- JSON-LD structured data corrected
- All external links verified

**100% Complete (Optional Polish):**
- Full pricing page rewrite
- Resource URL renames
- All Washington references removed
- Success stories state-specific

## Timeline Expectations

**Fast Track (Single 6-hour session):**
- Phases 1-3 complete
- 85% production ready
- Calculator shelved
- Remaining work documented

**Standard Track (Two 3-4 hour sessions):**
- Session 1: Phases 1-2
- Session 2: Phases 3-4
- 95% production ready
- Ready for immediate launch

**Complete Track (Three sessions):**
- Session 1: Phases 1-2
- Session 2: Phases 3-4
- Session 3: Polish (pricing, resource URLs, about page)
- 100% complete

## Validation Checklist

Before marking migration complete:

### Technical Validation
- [ ] `npm run build` passes with zero errors
- [ ] All routes compile successfully
- [ ] TypeScript errors acceptable (if build ignores them)
- [ ] No broken imports

### Content Accuracy
- [ ] All deadlines match state law
- [ ] All penalties match state regulations
- [ ] All incentive amounts current
- [ ] Tier thresholds correct
- [ ] Compliance model accurate (EMP vs EUI vs emissions)

### SEO & Metadata
- [ ] Homepage title includes state name + deadlines
- [ ] Meta description mentions state-specific details
- [ ] Keywords 100% state-specific (no previous state)
- [ ] OpenGraph image updated
- [ ] Canonical URL correct
- [ ] JSON-LD structured data updated

### Integration
- [ ] Zapier webhook endpoint state-specific
- [ ] HubSpot calendar URLs verified functional
- [ ] Calendar routing logic correct (building count → rep)
- [ ] Forms submit successfully
- [ ] Analytics tracking configured

### External Links
- [ ] State regulatory agency page (loads successfully)
- [ ] Primary law reference (official source)
- [ ] Administrative rules (official source)
- [ ] Incentive program pages (current, not expired)
- [ ] All .gov links working

## Tools & Commands

**Global Content Replacement:**
```bash
# Find all instances
grep -r "Washington CBPS" --exclude-dir={node_modules,.next,dist}

# Batch replace
sed -i '' 's/Washington CBPS/Oregon BPS/g' components/*.tsx

# Verify changes
grep -r "Oregon BPS" components/*.tsx
```

**Color Replacement:**
```bash
# Find green color instances
grep -r "emerald-" components/

# Replace with state color
sed -i '' 's/emerald-600/oregon-navy-600/g' components/*.tsx
```

**Build Testing:**
```bash
# Full production build
npm run build

# Development test
npm run dev
```

**Commit Pattern:**
```bash
git commit -m "feat: [Component] update for [State] BPS

**Changes:**
- [Change 1]
- [Change 2]

**State-Specific Details:**
- [Detail 1]
- [Detail 2]

**Build Status:** ✅ PASSING

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

## References

**Completed Migrations:**
1. Washington CBPS (Original): https://washingtoncbps.com
2. Boston BERDO: https://bostonberdo.com
3. Oregon BPS: https://or-bps.com

**Migration Documents:**
- Washington: `docs/washington-original-spec.md` (implied baseline)
- Boston: `docs/boston-berdo/MIGRATION_COMPLETE.md`
- Oregon: `docs/MIGRATION_COMPLETE.md`

**Research Templates:**
- Use `docs/oregon-bps-research.md` as template for new state research

## Pattern Evolution

This pattern is based on learnings from three successful migrations:

**Version 1.0** (Washington → Boston):
- Identified calculator as major blocker
- Established 4-phase approach
- Created component priority order

**Version 2.0** (Washington → Oregon):
- Refined checklist based on Boston learnings
- Added Tier 2 handling for reporting-only states
- Improved commit message patterns
- Added TodoWrite tracking for progress visibility

**Version 3.0** (This Document):
- Codified pattern for future migrations
- Added state-specific requirements matrix
- Created comprehensive checklist
- Documented common pitfalls
- Established success metrics

## Next States

States with pending or potential BPS laws:

- **Colorado**: HB 21-1286 (passed, 2023 compliance start)
- **New York City**: Local Law 97 (in effect, aggressive emissions targets)
- **Maryland**: Building Energy Performance Standards (2024)
- **Illinois**: Chicago Energy Rating System + potential statewide law

Each will require research phase to determine:
1. Tier structure (or single tier like BERDO)
2. Compliance model (prescriptive, performance, or emissions-based)
3. Deadline timeline
4. Penalty structure
5. Incentive programs

---

**Document Version**: 3.0
**Last Updated**: November 6, 2025
**Maintainer**: Vert Energy Group
**Template Status**: Validated across 3 state migrations
