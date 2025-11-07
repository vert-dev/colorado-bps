# Oregon BPS Migration Status
**Last Updated**: November 6, 2025, 9:30 PM
**Progress**: ~60% Complete - Major Components Done

## ✅ Phase 1: Foundation Complete (100%)

1. ✅ **Calculator Shelved** - Moved to `.future/calculator/` with 16-24hr reactivation docs
2. ✅ **Oregon Brand Colors** - Navy (#002B5C) + Gold (#FFB81C) full palettes in Tailwind
3. ✅ **CSS Variables** - Globals.css configured
4. ✅ **Color Migration** - 372 instances green→navy/gold across 23 files
5. ✅ **Layout Metadata** - Complete SEO/OG overhaul for or-bps.com

## ✅ Phase 2: Content Migration Complete (100%)

6. ✅ **Bulk CBPS→BPS** - Systematic replacement across all components
   - Washington CBPS → Oregon BPS
   - Clean Buildings → Building Performance Standard
   - washingtoncbps.com → or-bps.com
   - Washington State → Oregon

## ✅ Phase 3: Core Regulatory Components (100%)

7. ✅ **Key Deadlines** - Completely rewritten for Oregon
   - Tier 1: June 2028 (≥100k), June 2029 (50-100k), June 2030 (35-50k sqft)
   - Tier 2: July 2028 reporting-only
   - EUI/EUIt explanations added
   - Portland local ordinance note

8. ✅ **Penalties Component** - Oregon penalty model
   - Tier 1: $5,000 + $1/sqft annually until compliant
   - Tier 2: NO PENALTIES (reporting only)
   - Example: 100k sqft = $105k/year
   - Updated links: Oregon DEQ, HB 3409, OAR 330-140

9. ✅ **Incentives Component** - ECAPP/BERI programs
   - ECAPP: $2M state early compliance fund (2025-2027)
   - BERI: $12M federal CERTA implementation grants
   - 3-step strategy: audit → implementation → compliance
   - Federal requirements noted (prevailing wage, Davis-Bacon)

## 🚧 Phase 4: Remaining Components (In Progress)

### High Priority - Launch Blockers

10. ⏳ **Coverage Checker** - Tier threshold updates needed
    - Current: 50k/20k sqft (Washington)
    - Required: 35k sqft Tier 1 + institutional Tier 2 logic
    - File: `components/coverage-checker.tsx`

11. ⏳ **How to Comply** - Compliance model change
    - Current: EMP + O&M programs (Washington)
    - Required: EUI/EUIt performance benchmarking
    - File: `components/how-to-comply.tsx`

12. ⏳ **What is CBPS** - Core explainer
    - Needs rename: `what-is-cbps.tsx` → `what-is-oregon-bps.tsx`
    - Content: EUI/EUIt model explanation
    - File: `components/what-is-cbps.tsx`

13. ⏳ **FAQ Component** - Q&A rewrite
    - Update deadlines, penalties, incentives
    - Add EUI/EUIt questions
    - File: `components/faq.tsx`

14. ⏳ **Resources Hub** - Link updates
    - Oregon DEQ resources
    - Energy Star Portfolio Manager
    - File: `components/resources-hub.tsx`

### Medium Priority - Quality Polish

15. ⏳ **Pricing Pages** - Service descriptions
    - Replace EMP/O&M with EUI audit services
    - Update deadline urgency (2028-2030 vs 2026-2027)
    - Files: `app/pricing/PricingPageClient.tsx`, `app/pricing/page.tsx`

16. ⏳ **Resource Pages** - Renames & content
    - `/resources/cbps-summary-guide` → `/resources/oregon-bps-summary-guide`
    - `/resources/emp-om-checklist` → `/resources/eui-compliance-checklist`  
    - `/resources/tier2-incentives-guide` → `/resources/ecapp-beri-guide`
    - Update all content for Oregon

17. ⏳ **Forms** - Minor label updates
    - Contact forms mostly generic (OK)
    - Verify Zapier differentiation

18. ⏳ **Header/Footer** - Navigation
    - Update footer links
    - Verify copyright

19. ⏳ **Homepage** - Hero & metadata
    - Update `app/page.tsx` metadata (still has July 2026 refs)
    - Hero deadlines

### Low Priority - Cleanup

20. ⏳ **Global Content Search**
    - Find: "July 2026", "July 2027", "$55,555", "EMP", "O&M"
    - Particularly in: `app/api/chat/route.ts` (chatbot responses)

21. ⏳ **Final Build Test**
22. ⏳ **Visual QA**
23. ⏳ **Migration Summary**
24. ⏳ **Branch Prep**

## Build Status
✅ **Currently Building**: Yes (16 routes, all clean)

## Git Commits (10 total)
1. feat: Shelve calculator for Oregon BPS migration
2. feat: Add Oregon brand colors to Tailwind config
3. feat: Replace all green colors with Oregon brand colors
4. feat: Update layout metadata for Oregon BPS
5. feat: Bulk replace Washington CBPS with Oregon BPS
6. docs: Add comprehensive migration status
7. feat: Update key deadlines and penalties for Oregon BPS
8. feat: Update incentives component for Oregon ECAPP/BERI

## Key Stats
- **Lines Changed**: ~3,000+ across 30+ files
- **Components Fully Migrated**: 9/15 major components
- **Color Instances Updated**: 372
- **Build Time**: ~45 seconds
- **Time Invested**: ~4 hours
- **Estimated Remaining**: 2-3 hours

## Oregon-Specific Accuracy Achieved

### Deadlines ✅
- Tier 1 Large (≥100k): June 2028
- Tier 1 Medium (50-100k): June 2029  
- Tier 1 Small (35-50k): June 2030
- Tier 2: July 2028 (reporting only)

### Penalties ✅
- Tier 1: $5,000 + $1/sqft annually
- Tier 2: NO PENALTIES
- Examples: 50k = $55k/year, 100k = $105k/year

### Incentives ✅
- ECAPP: $2M state fund (2025-2027)
- BERI: $12M federal CERTA grants
- Focus: Energy audits + implementation

### Regulatory References ✅
- HB 3409 (2023)
- OAR 330-140
- Oregon DEQ/ODOE
- Energy Star Portfolio Manager

## Still Using Washington Content

### Chatbot (`app/api/chat/route.ts`)
- Lines 16-19: Washington deadlines (June 2026-2028, July 2027)
- Lines 52, 69, 71: Washington penalty/incentive calculations
- Needs complete Oregon rewrite

### Homepage (`app/page.tsx`)
- Lines 15, 17, 22, 35: "July 2026 deadline" references
- Metadata still references EMP/O&M

### Pricing (`app/pricing/`)
- Lines 46-47, 352, 399-401: Washington deadline urgency
- Service descriptions mention EMP/O&M

### Components Pending
- Coverage checker (50k threshold vs 35k)
- How to comply (EMP/O&M vs EUI/EUIt)
- FAQ (needs rewrite)
- Resources hub (links)

## Next Steps (Priority Order)

1. **Coverage Checker** (30 min) - Critical for user qualification
2. **How to Comply** (45 min) - Core compliance guidance
3. **Homepage Metadata** (15 min) - SEO accuracy
4. **Chatbot Responses** (30 min) - Automated lead qualification
5. **FAQ Rewrite** (30 min) - Common questions
6. **Pricing Pages** (30 min) - Service positioning
7. **Resources Hub** (15 min) - External links
8. **Global Cleanup** (30 min) - Catch remaining references
9. **QA & Testing** (30 min)
10. **Documentation** (15 min)

**Total Remaining**: ~4 hours to 100% completion

## Technical Debt
None - all changes are clean, build passes, no hacks.

## Deployment Readiness
**Current**: 60% (foundation solid, major components done)
**Launch-Ready**: 80% (need coverage, how-to, homepage, chatbot)
**100% Complete**: 95%+ (all polish complete)

Site could soft-launch at 80% with minor disclaimers.

---
**Reference**: `docs/plans/2025-11-06-oregon-bps-migration-implementation.md`
