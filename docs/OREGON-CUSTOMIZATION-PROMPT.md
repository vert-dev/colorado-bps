# Oregon BPS Customization Prompt for AI Agent

## Mission

Transform this Washington CBPS compliance platform into an Oregon Building Performance Standard (BPS) compliance website. Follow the proven Boston BERDO migration pattern, adapting all content, calculations, and branding for Oregon state requirements.

## Context

**Source**: This codebase was cloned from `washington-cbps`, a Next.js 15 marketing site with calculator, lead automation, and HubSpot integration.

**Reference**: The `boston-bps` project successfully migrated from Washington CBPS to Boston BERDO. Study `boston-bps/docs/boston-migration-summary.md` for the migration pattern and approach.

**Your Task**: Apply the same systematic transformation for Oregon BPS, using your skills to research Oregon-specific regulations, update all content, and configure integrations appropriately.

---

## Part 1: Research Oregon BPS Requirements

### Critical Information to Gather

Before making any code changes, research and document Oregon's Building Performance Standard:

1. **Official Regulations**
   - Primary regulatory document and website
   - Effective dates and implementation timeline
   - Administrative agency (likely Oregon Department of Energy)

2. **Coverage Thresholds**
   - Square footage threshold (Washington: ≥50k sqft, Boston: ≥20k sqft)
   - Building types covered (commercial, multifamily, institutional, etc.)
   - Exemptions and exclusions

3. **Compliance Tiers/Phases**
   - Tier structure (does Oregon use tiers like Washington?)
   - Deadlines by building size or type
   - Performance targets (energy intensity, emissions, etc.)

4. **Penalties and Enforcement**
   - Daily fine amounts for non-compliance
   - Annual penalty caps
   - Grace periods and extensions

5. **Incentives and Financial Assistance**
   - State rebate programs
   - Grant opportunities
   - Utility incentives
   - Tax credits or deductions

6. **Reporting Requirements**
   - Benchmarking tools (Energy Star Portfolio Manager?)
   - Submission deadlines
   - Required documentation

### Document Your Findings

Create `docs/oregon-bps-research.md` with all findings, including:
- Source URLs
- Specific numerical values (thresholds, deadlines, penalties)
- Comparison table: Washington vs Boston vs Oregon
- Uncertainties or areas needing client confirmation

---

## Part 2: Branding and Visual Identity

### Color Palette Update

**Current (Washington)**: Green theme
**Boston Example**: Navy (#002B49) and Gold (#FFB81C)
**Oregon Options**: Research Oregon state colors or client brand colors

**Files to Update**:
1. `app/globals.css` - CSS variables for theme colors
2. All components using color classes
3. Maintain WCAG AA contrast compliance

### Text Replacements (Global)

Use find-and-replace across codebase:
- "CBPS" → "BPS" 
- "Clean Buildings Performance Standard" → "Building Performance Standard"
- "Washington State" → "Oregon" or "State of Oregon"
- "washington" (in URLs/paths) → "oregon"
- Phone number → Oregon contact number (get from client)
- HubSpot calendar URLs → Oregon-specific calendars

### Metadata Updates

**File**: `app/layout.tsx`
- Site title: "Oregon BPS Compliance"
- Description: Update for Oregon
- Schema.org structured data
- Analytics IDs (if different for Oregon)

---

## Part 3: Component Transformation

### Phase 3A: Core Educational Components

Following the Boston pattern, systematically update each component:

**Priority Order**:
1. ✅ `components/what-is-cbps.tsx` → Rename to `what-is-oregon-bps.tsx`
   - Explain Oregon BPS regulations
   - Link to official Oregon resources
   - Update all statistics and dates

2. ✅ `components/coverage-checker.tsx`
   - Update square footage threshold
   - Oregon building type criteria
   - Geographic coverage (all Oregon or specific cities?)

3. ✅ `components/key-deadlines.tsx`
   - Replace with Oregon compliance timeline
   - Update all dates and milestones
   - Note any phased implementation

4. ✅ `components/penalties-content.tsx`
   - Oregon penalty amounts
   - Fine calculation method
   - Appeals process (if different)

5. ✅ `components/early-adopter-incentives.tsx`
   - Oregon incentive programs
   - If Oregon has alternative compliance payment, update accordingly
   - If not, repurpose for Oregon grant programs

6. ✅ `components/how-to-comply.tsx`
   - Oregon-specific compliance steps
   - Required certifications or audits
   - Submission process

7. ✅ `components/faq.tsx`
   - Rewrite Q&As for Oregon context
   - Address Oregon-specific concerns
   - Link to Oregon agencies

8. ✅ `components/resources-hub.tsx`
   - Oregon Department of Energy links
   - State utility resources
   - Local implementation guides

### Phase 3B: Form Components

**Maintain lead capture functionality** but update labels:

**Files**:
- `components/contact-form-modal.tsx`
- `components/scheduling-modal.tsx`
- `components/email-capture-modal.tsx`
- `components/calendar-redirect-overlay.tsx`

**Changes**:
- Form field labels: "Washington" → "Oregon"
- Placeholder text updates
- Success messages
- Error messages

### Phase 3C: Navigation and Layout

**Files**:
- `components/header.tsx` - Navigation links, phone number
- `components/footer.tsx` - Contact info, links
- `components/help-desk-hero.tsx` - Hero messaging

**Updates**:
- Replace Washington branding
- Update contact information
- Verify all internal links work

### Phase 3D: Chatbot

**File**: `components/cbps-chatbot.tsx` → Rename to `oregon-bps-chatbot.tsx`
**File**: `app/api/chat/route.ts`

**Updates**:
- Update training context with Oregon BPS regulations
- Replace resource links with Oregon equivalents
- Test responses for Oregon-specific questions

---

## Part 4: Pages and Routes

### Core Pages to Update

1. **Homepage** (`app/page.tsx`)
   - Hero: "Navigate Oregon BPS with Confidence"
   - Import renamed components (`WhatIsOregonBPS` etc.)
   - Update all content sections
   - Remove or update calculator CTA (see calculator strategy)

2. **About Page** (`app/about/page.tsx`)
   - Mission statement for Oregon market
   - Update case studies or add disclaimer
   - Oregon-specific value propositions

3. **Pricing Page** (`app/pricing/PricingPageClient.tsx`)
   - Service descriptions for Oregon context
   - Update package features
   - Pricing may need Oregon research

4. **Tier 2 Page** (`app/tier2/page.tsx`)
   - Update for Oregon tier structure
   - If Oregon doesn't have tiers, repurpose or remove

### Resource Pages

**Keep these pages** (update content):
- `/resources/bps-summary-guide` (rename from cbps-summary-guide)
- `/resources/webinar-signup` (update content)

**Remove Washington-specific** (like Boston did):
- `/resources/emp-om-checklist` (if not relevant to Oregon)
- `/resources/tier2-incentives-guide` (if Oregon structure differs)

**Create new Oregon-specific resources** if needed

### Legal Pages (Low Priority)

Update these if client requires Oregon-specific terms:
- `/privacy-policy`
- `/terms-of-service`
- `/accessibility`

---

## Part 5: Calculator Strategy

### Decision Matrix

**Option A: Shelve Calculator** (Boston approach)
- If Oregon BPS calculation logic is fundamentally different
- If research reveals complexity requiring custom development
- Move entire `/calculator` route to `.future/calculator/`
- Update homepage to remove calculator CTA
- Direct users to consultation booking instead

**Option B: Adapt Calculator** (Washington approach)
- If Oregon uses similar energy audit cost model
- If thresholds and penalties can be easily updated
- Update `lib/cbps-calculator.ts` → `lib/oregon-bps-calculator.ts`
- Modify all calculation logic for Oregon specifics
- Update result display components

**Option C: Hybrid Approach**
- Keep basic compliance checker (square footage, building type)
- Remove cost estimation until research complete
- Provide compliance timeline based on inputs

### Files Involved (if adapting)

- `lib/cbps-calculator.ts` - Core calculation engine
- `app/calculator/page.tsx` - Calculator page
- `components/calculator-hero-integrated.tsx`
- `components/calculator-form.tsx`
- `components/calculator-results.tsx`
- `components/calculator-benefits.tsx`

**Recommendation**: Review Oregon requirements first. If unclear or complex, use Option A (shelve) and document what's needed for reactivation.

---

## Part 6: Integration Configuration

### HubSpot Calendar Integration

**File**: `lib/hooks/useHubSpotBooking.ts`

**Update**:
```typescript
const CALENDAR_URLS = {
  dylan: 'https://meetings.hubspot.com/[oregon-rep-1]/oregon-bps-consultation',
  kevin: 'https://meetings.hubspot.com/[oregon-rep-2]/oregon-bps-consultation',
}
```

**Get from client**:
- Oregon sales rep calendar URLs
- Routing logic (still 1-2 buildings vs 3+?)
- Custom HubSpot properties for Oregon

### Zapier Webhook

**File**: Search for `https://hooks.zapier.com/hooks/catch/885017/uhzbn5c/`

**Action**:
- Request NEW Zapier webhook endpoint for Oregon leads
- Update all form submission endpoints
- Test form submission → HubSpot deal creation

### Analytics

**Files**: `app/layout.tsx`, various tracking components

**Update if client provides**:
- New Google Tag Manager ID
- New LogRocket project ID  
- New Lucky Orange site ID
- Vercel Analytics (should work automatically)

**Note**: If keeping Washington analytics initially, document this for future separation.

---

## Part 7: Build and Quality Assurance

### Pre-Deployment Checks

1. **Build Verification**
   ```bash
   npm run build
   ```
   - Ensure all pages compile
   - Check bundle sizes
   - Verify no TypeScript errors (though build ignores them)

2. **Dev Server Test**
   ```bash
   npm run dev
   ```
   - All pages load without errors
   - Forms submit correctly
   - Navigation works
   - Responsive design intact

3. **Link Validation**
   - All internal links resolve
   - External links go to Oregon resources
   - No 404 errors

4. **Content Review**
   - No "Washington" or "CBPS" references remain (except in docs)
   - All dates and deadlines are Oregon-specific
   - Phone numbers and contact info updated

### Testing Checklist

- [ ] Homepage loads with Oregon branding
- [ ] All navigation links work
- [ ] Contact form submits successfully
- [ ] Calendar booking opens correct Oregon calendar
- [ ] Calculator works (if adapted) or is properly removed
- [ ] FAQ content is Oregon-specific
- [ ] Resource links go to Oregon agencies
- [ ] Chatbot responds with Oregon information
- [ ] Mobile responsive design
- [ ] Accessibility features maintained

---

## Part 8: Documentation

### Create/Update These Files

1. **`docs/oregon-bps-research.md`**
   - All Oregon BPS findings
   - Source links
   - Comparison with Washington/Boston

2. **`docs/oregon-migration-summary.md`**
   - Follow Boston's summary structure
   - Document all changes made
   - List components updated
   - Note any decisions or compromises
   - Include before/after comparisons

3. **`CLAUDE.md`**
   - Update project overview
   - Change live URL to Oregon domain
   - Update all Washington references
   - Maintain technical architecture docs

4. **`README.md`**
   - Update project title
   - Change deployment URLs
   - Update v0 project link (or remove if not synced)

5. **`.future/README.md`** (if calculator shelved)
   - Document shelved components
   - Explain what's needed for reactivation
   - Reference research requirements

### Git Commits

Use semantic commit messages following Boston pattern:

```
feat: Update layout metadata for Oregon BPS
feat: Rename what-is-cbps to what-is-oregon-bps
style: Replace Washington green with Oregon colors
refactor: Update form labels from CBPS to Oregon BPS
docs: Add Oregon BPS research and migration summary
```

Make frequent, atomic commits for easy review and rollback.

---

## Part 9: Deployment Preparation

### Environment Variables

Check if needed (compare to `washington-cbps/.env.local`):
- API keys
- Analytics IDs
- Feature flags

Create `.env.local` if required, but **never commit it**.

### Vercel Configuration

**Prepare for deployment**:
- Domain: Get Oregon domain from client (e.g., `oregonbps.com`)
- Build settings: Should match Washington (Next.js 15)
- Environment variables: Add in Vercel dashboard

**Create `vercel.json` if special config needed**

### Final Pre-Deploy Checklist

- [ ] All components tested locally
- [ ] Build succeeds without errors
- [ ] Git history is clean and organized
- [ ] Documentation complete
- [ ] Client-provided assets integrated (logos, etc.)
- [ ] HubSpot calendars confirmed
- [ ] Zapier webhook tested
- [ ] Analytics IDs verified

---

## Part 10: Success Criteria

### Technical Success

- ✅ All pages build successfully
- ✅ No broken links or 404 errors  
- ✅ Contact forms operational
- ✅ Calendar routing functional
- ✅ Responsive design maintained
- ✅ Accessibility standards met (WCAG AA)

### Content Success

- ✅ All Washington/CBPS references replaced
- ✅ Oregon-specific regulations accurately reflected
- ✅ Deadlines and penalties correct
- ✅ Incentive information up-to-date
- ✅ Resource links go to Oregon agencies

### Integration Success

- ✅ Forms submit to Zapier webhook
- ✅ HubSpot deals created correctly
- ✅ Calendar URLs route to Oregon sales reps
- ✅ Analytics tracking events fire
- ✅ Chatbot provides Oregon-specific answers

---

## Implementation Approach

### Recommended Workflow

**Phase 1: Research & Planning** (2-4 hours)
1. Research Oregon BPS regulations thoroughly
2. Document findings in `oregon-bps-research.md`
3. Create comparison table (WA vs Boston vs Oregon)
4. Identify key differences requiring special handling
5. Decide calculator strategy (shelve vs adapt)

**Phase 2: Global Updates** (1-2 hours)
1. Update color palette in `globals.css`
2. Global find-replace (CBPS → BPS, Washington → Oregon)
3. Update `layout.tsx` metadata
4. Update `CLAUDE.md` and `README.md`

**Phase 3: Component Migration** (4-6 hours)
1. Update core educational components (following priority order)
2. Update form components
3. Update navigation and layout
4. Update chatbot

**Phase 4: Page Updates** (2-3 hours)
1. Homepage
2. About page
3. Pricing page
4. Resource pages
5. Remove/adapt tier-specific pages

**Phase 5: Calculator Decision** (1-4 hours depending on decision)
1. Shelve: Move to `.future/`, remove routes
2. Adapt: Update all calculation logic
3. Hybrid: Simplify to compliance checker

**Phase 6: Integration Setup** (1-2 hours)
1. Update HubSpot calendar URLs
2. Configure new Zapier webhook
3. Update analytics IDs
4. Test all integrations

**Phase 7: QA & Documentation** (2-3 hours)
1. Build and test
2. Manual testing checklist
3. Write migration summary
4. Create deployment guide
5. Final commit and push

**Total Estimated Time**: 13-24 hours

---

## Agent Capabilities to Leverage

### Use Your Skills to:

1. **Research**: Web search for Oregon BPS regulations, deadlines, penalties
2. **Code Analysis**: Review Boston migration to understand transformation pattern
3. **Batch Operations**: Global find-replace across entire codebase
4. **Component Generation**: Update React components with Oregon content
5. **Documentation**: Generate comprehensive migration summary
6. **Testing**: Verify builds, check for errors, validate links
7. **Git Operations**: Create semantic commits, organize changes logically

### Ask for Human Input When:

- Oregon regulatory details are unclear or contradictory
- Client preferences needed (colors, branding, pricing)
- Integration credentials required (HubSpot URLs, API keys)
- Domain and hosting configuration
- Final approval before deployment

---

## Reference Materials

### Study These Files

**From Boston BPS**:
- `docs/boston-migration-summary.md` - Complete migration pattern
- `components/what-is-berdo.tsx` - Example of regulation explanation
- `components/coverage-checker.tsx` - Threshold checker pattern
- `app/page.tsx` - Homepage structure with tabbed content

**From Washington CBPS**:
- `CLAUDE.md` - Architecture and technical decisions
- `lib/cbps-calculator.ts` - Calculator logic (if adapting)
- `docs/l0-l1-automation-plan.md` - Lead automation system

**From Oregon BPS** (this repo):
- `docs/OREGON-CLONE-SETUP.md` - Setup documentation
- Current codebase as starting point

### Key Regulatory Resources to Search

- Oregon Department of Energy website
- Oregon state legislature (bill texts)
- Energy Trust of Oregon
- Portland/major city building departments
- Oregon utility programs (PGE, Pacific Power, etc.)

---

## Deliverables

### When Complete, Provide:

1. **Fully Transformed Codebase**
   - All components updated
   - All pages Oregon-specific
   - Build succeeds
   - Tests pass

2. **Comprehensive Documentation**
   - Oregon BPS research document
   - Migration summary (following Boston template)
   - Updated CLAUDE.md and README.md
   - Deployment guide

3. **Testing Evidence**
   - Build output
   - Dev server confirmation
   - Link validation results
   - Form submission test results

4. **Next Steps Guide**
   - Client approvals needed
   - Integration setup tasks
   - Domain configuration
   - Vercel deployment steps

5. **Git Repository**
   - Clean commit history
   - Semantic commit messages
   - All changes pushed to `main` branch

---

## Final Notes

### Philosophy

Follow the Boston migration philosophy:
- **Systematic transformation** over quick fixes
- **Research-driven** decisions
- **Maintain functionality** while updating content
- **Document everything** for future maintenance
- **Test thoroughly** before declaring complete

### When in Doubt

- Study how Boston handled similar situations
- Document uncertainties for client review
- Prefer conservative approaches (e.g., shelve calculator if unsure)
- Maintain all integrations and lead capture functionality

### Success Definition

This project is successful when:
1. Oregon BPS regulations are accurately represented
2. All lead capture and CRM integrations work
3. Build and deployment are error-free
4. Documentation enables future maintenance
5. Client can confidently deploy to production

---

## Start Your Work

Begin with Part 1 (Research) and proceed sequentially through all parts. Document your progress, make frequent commits, and ask for human input when needed.

**Good luck transforming this platform for Oregon!**
