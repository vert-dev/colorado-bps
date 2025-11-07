# Oregon BPS Project - Clone Setup Documentation

## Overview

This repository was cloned from the `washington-cbps` project to create a similar Building Performance Standard (BPS) compliance website for Oregon state requirements.

## Cloning Process

**Date**: November 6, 2025  
**Source**: `/Volumes/EPVault/projects/clients/vert/washington-cbps`  
**Target**: `/Volumes/EPVault/projects/clients/vert/oregon-bps`

### Steps Taken

1. **Copied source files** using rsync with exclusions:
   ```bash
   rsync -av --exclude='.git' --exclude='node_modules' --exclude='.next' \
     --exclude='.vercel' --exclude='*.tsbuildinfo' \
     washington-cbps/ oregon-bps/
   ```

2. **Initialized new git repository**:
   ```bash
   cd oregon-bps
   git init
   git add -A
   git commit -m "Initial commit: Cloned from washington-cbps for Oregon BPS project"
   ```

3. **Files copied**: 149 files including:
   - App pages and routes
   - UI components
   - Calculator logic
   - Configuration files
   - Documentation
   - Public assets

## What's Next

### Immediate Configuration Changes Needed

1. **Update CLAUDE.md** - Change references from Washington CBPS to Oregon BPS
2. **Update package.json** - Change project name and description
3. **Update README.md** - Change project title and URLs
4. **Environment variables** - Create new `.env.local` if needed
5. **HubSpot integration** - Update calendar URLs and contact info
6. **Calculator logic** - Update `lib/cbps-calculator.ts` for Oregon-specific:
   - Deadlines
   - Penalty amounts
   - Incentive structures
   - Square footage thresholds (if different)
7. **Zapier webhook** - Create new webhook endpoint for Oregon leads
8. **Analytics tracking** - Update GTM, LogRocket, Lucky Orange IDs
9. **Domain configuration** - Set up for Oregon domain
10. **Vercel deployment** - Create new Vercel project for Oregon

### Key Files That Need Oregon-Specific Updates

#### Business Logic
- `lib/cbps-calculator.ts` - Core calculation logic
- `app/api/chat/route.ts` - Chatbot knowledge base
- `lib/hooks/useHubSpotBooking.ts` - Calendar URLs and routing

#### Content Pages
- `app/page.tsx` - Homepage content
- `app/calculator/page.tsx` - Calculator page
- `app/pricing/page.tsx` - Service packages
- `app/tier2/page.tsx` - Tier 2 specific content
- All pages in `app/resources/` - Educational content

#### Configuration
- `app/layout.tsx` - Metadata, analytics, contact info
- `components/header.tsx` - Phone number, navigation
- `components/footer.tsx` - Contact information
- All modal components - Update form submission endpoints

#### Documentation
- `docs/` folder - Update all planning docs to reflect Oregon requirements

## Oregon vs Washington Differences to Research

Before customizing, verify these Oregon-specific details:

1. **Tier Structure** - Does Oregon use same 50k sqft threshold?
2. **Deadlines** - What are Oregon's compliance deadlines?
3. **Penalties** - Oregon penalty amounts per violation
4. **Incentives** - Oregon rebate/incentive programs
5. **Building Types** - Any Oregon-specific building classifications?
6. **Reporting Requirements** - Oregon-specific forms or processes
7. **Energy Targets** - Oregon's performance standards

## Original Washington Project Details

**Live URL**: https://washingtoncbps.com  
**Technology**: Next.js 15, React 19, TypeScript, Tailwind CSS 4  
**Key Features**:
- CBPS compliance calculator
- Automated lead qualification (L0 → L1 funnel)
- HubSpot calendar integration with smart routing
- Multi-tier compliance guidance
- Cost estimation and penalty calculations

## GitHub Repository Setup

**Next Step**: Create new repository on vert-dev organization

```bash
# After creating repo on GitHub:
git remote add origin git@github.com:vert-dev/oregon-bps.git
git branch -M main
git push -u origin main
```

## References

- Original Washington CBPS documentation: `washington-cbps/docs/`
- Architecture details: `washington-cbps/CLAUDE.md`
- Boston BPS project (similar clone): `boston-bps/`

## Notes

- This clone preserves the entire marketing site structure and automation system
- The calculator logic, form handling, and lead routing are all intact
- All integration endpoints (Zapier, HubSpot, Analytics) need to be reconfigured
- The v0.app integration is NOT included - this is a standalone fork

## Contact

For questions about this setup or Oregon-specific requirements, contact the VertBuild team.
