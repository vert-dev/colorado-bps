# Next Steps: L0 → L1 Automation Implementation

**Date**: 2025-10-28
**Status**: Ready to implement
**Priority**: High (closes critical conversion gap)

## Key Findings from Chatbot Branch Analysis

### HubSpot URL Parameter Structure (from commit 505ac1d)

The chatbot implementation successfully pre-filled HubSpot calendar links using the following URL parameters:

```typescript
const params = new URLSearchParams();

// Contact info - HubSpot standard fields
params.append("firstName", contactInfo.name.split(" ")[0] || "");
params.append("lastName", contactInfo.name.split(" ").slice(1).join(" ") || "");
params.append("email", contactInfo.email);
params.append("phone", contactInfo.phone);

// Custom fields - Building/qualification context
params.append("portfolio_size", qualificationData.portfolioSize.toString());
params.append("total_sqft", qualificationData.totalSquareFootage.toString());
params.append("building_types", qualificationData.buildingTypes.join(","));
params.append("urgency", qualificationData.urgency);
params.append("authority", qualificationData.authority);

// Lead scoring context
params.append("lead_score", leadScore.total.toString());
params.append("lead_tier", leadScore.tier);
params.append("qualification_source", "automated_chat");

const fullUrl = `${baseUrl}?${params.toString()}`;
```

**Base URL Used**: `https://meetings.hubspot.com/kevin-sullivan2/ks-wa-state-compliance-review`
**Current URL**: `https://meetings.hubspot.com/dheppner/wa-state-compliance-review`

### numberOfBuildings Field Decision

**User Decision**: Use a simple text input field restricted to numbers only. Backend (Zapier) will handle the Kevin/Aaron routing logic.

**Routing Logic**:
- **Aaron**: 1-2 buildings
- **Kevin**: 3+ buildings

**Implementation**:
```typescript
<Input
  id="numberOfBuildings"
  type="number"
  min="1"
  step="1"
  value={formData.numberOfBuildings}
  onChange={(e) => handleInputChange("numberOfBuildings", e.target.value)}
  required
  placeholder="e.g., 3"
/>
```

This is simpler than a dropdown and allows exact values without restricting options.

---

## Immediate Implementation Plan

### Phase 1: Add numberOfBuildings Field (30 minutes)

**Files to update**:
1. `lib/cbps-calculator.ts` - Add to FormData interface
2. `components/calculator-hero-integrated.tsx` - Add input field
3. `components/calculator-form.tsx` - Add input field
4. `components/contact-form-modal.tsx` - Replace "multiple" option with number input

**Field Placement**: After `squareFootage` field (logical grouping)

**Validation**:
- Required field
- Must be positive integer
- Min value: 1
- No max value (allow any portfolio size)

**Code Example**:
```typescript
// In FormData interface
export interface FormData {
  // ... existing fields
  numberOfBuildings: string; // NEW - stores as string, parse as int in backend
}

// In form component
<div>
  <Label htmlFor="numberOfBuildings">
    Number of Buildings *
  </Label>
  <Input
    id="numberOfBuildings"
    type="number"
    min="1"
    step="1"
    value={formData.numberOfBuildings}
    onChange={(e) => handleInputChange("numberOfBuildings", e.target.value)}
    required
    placeholder="e.g., 3"
    className="w-full"
  />
  <p className="text-xs text-gray-500 mt-1">
    How many buildings do you need CBPS compliance for?
  </p>
</div>
```

---

### Phase 2: Implement Auto-Redirect with Pre-fill (45 minutes)

**Goal**: After form submission, show 3-second countdown, then redirect to HubSpot calendar with pre-filled contact info.

**Files to update**:
1. `components/calculator-hero-integrated.tsx` - Add redirect logic after submission
2. `components/calculator-form.tsx` - Add redirect logic after submission
3. `lib/hooks/useHubSpotBooking.ts` - Add pre-fill helper function

**User Flow**:
1. User submits form
2. Data sent to Zapier webhook (creates L0 deal)
3. Success message appears: "Calculating your results..."
4. 3-second countdown overlay: "Taking you to calendar booking in 3... 2... 1..."
5. Auto-redirect to HubSpot calendar with pre-filled data
6. "Skip for now" button allows user to bypass redirect

**HubSpot URL Construction** (based on chatbot implementation):

```typescript
// In lib/hooks/useHubSpotBooking.ts
export function buildPrefilledBookingUrl(formData: FormData): string {
  const baseUrl = "https://meetings.hubspot.com/dheppner/wa-state-compliance-review";
  const params = new URLSearchParams();

  // Contact info - HubSpot standard fields
  const [firstName, ...lastNameParts] = formData.contactName.split(" ");
  params.append("firstName", firstName || "");
  params.append("lastName", lastNameParts.join(" ") || "");
  params.append("email", formData.email);
  params.append("phone", formData.phone);

  // Building context - Custom fields (must be set up in HubSpot)
  params.append("portfolio_size", formData.numberOfBuildings);
  params.append("total_sqft", formData.squareFootage);
  params.append("building_type", formData.buildingType);
  params.append("building_address", formData.buildingAddress);
  params.append("primary_use", formData.primaryUse);

  // Source tracking
  params.append("qualification_source", "calculator_form");
  params.append("submission_timestamp", new Date().toISOString());

  // UTM params (preserve attribution)
  const utmParams = getStoredUTMParams();
  Object.entries(utmParams).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });

  return `${baseUrl}?${params.toString()}`;
}
```

**Redirect Component**:

```typescript
// New component: components/calendar-redirect-overlay.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, X } from "lucide-react";

interface CalendarRedirectOverlayProps {
  isOpen: boolean;
  calendarUrl: string;
  onSkip: () => void;
}

export function CalendarRedirectOverlay({
  isOpen,
  calendarUrl,
  onSkip
}: CalendarRedirectOverlayProps) {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = calendarUrl; // Redirect
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, calendarUrl]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md mx-4 relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={onSkip}
          className="absolute top-2 right-2"
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="text-center space-y-6">
          <div className="bg-green-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
            <Calendar className="h-8 w-8 text-green-600" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Results Calculated!
            </h3>
            <p className="text-gray-600">
              Taking you to schedule your free consultation in...
            </p>
          </div>

          <div className="text-6xl font-bold text-green-600">
            {countdown}
          </div>

          <Button
            variant="outline"
            onClick={onSkip}
            className="w-full"
          >
            Skip for now - I'll schedule later
          </Button>
        </div>
      </div>
    </div>
  );
}
```

**Integration in calculator-hero-integrated.tsx**:

```typescript
const [showRedirect, setShowRedirect] = useState(false);
const [redirectUrl, setRedirectUrl] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // ... existing Zapier submission logic ...

  if (response.ok) {
    // Build pre-filled HubSpot URL
    const calendarUrl = buildPrefilledBookingUrl(formData);
    setRedirectUrl(calendarUrl);
    setShowRedirect(true);

    // GTM tracking
    window.dataLayer?.push({
      event: "form_submission_success",
      form_name: "calculator_form",
      redirect_to_calendar: true,
    });
  }
};

// In JSX:
<CalendarRedirectOverlay
  isOpen={showRedirect}
  calendarUrl={redirectUrl}
  onSkip={() => setShowRedirect(false)}
/>
```

---

### Phase 3: Testing Checklist

**Before deployment**:
- [ ] numberOfBuildings field appears in all 3 forms
- [ ] Field validates as positive integer
- [ ] Field is required (form won't submit without it)
- [ ] Zapier webhook receives numberOfBuildings in payload
- [ ] Auto-redirect countdown shows after form submission
- [ ] Skip button closes overlay and shows results instead
- [ ] HubSpot calendar opens with contact info pre-filled
- [ ] UTM parameters preserved in calendar URL
- [ ] GTM events fire correctly (`form_submit`, `calendar_redirect_shown`, `calendar_redirect_skipped`)

**Test scenarios**:
1. Submit form with numberOfBuildings = 1 → Should route to Aaron (verify in Zapier)
2. Submit form with numberOfBuildings = 2 → Should route to Aaron
3. Submit form with numberOfBuildings = 3 → Should route to Kevin
4. Submit form with numberOfBuildings = 10 → Should route to Kevin
5. Click "Skip for now" → Should close overlay, show results, no redirect
6. Wait for countdown → Should auto-redirect to HubSpot with pre-fill
7. Check HubSpot calendar → Contact fields should be pre-filled

---

## Backend Work (Post-Frontend)

**These are NOT frontend tasks** - they require Zapier/HubSpot configuration:

### Zapier Workflow Updates
1. **Parse numberOfBuildings** from webhook payload
2. **Create L0 deal** in HubSpot with:
   - Contact properties mapped from form
   - Deal stage = "L0 - Lead Created"
   - Deal owner = Kevin (≥3 buildings) or Aaron (≤2 buildings)
3. **Send confirmation email** to user
4. **Create internal Slack notification** for sales team

### HubSpot Meeting Webhook Setup
1. **Configure webhook** to fire when dheppner meetings are booked
2. **Zapier catches webhook** and looks up L0 deal by email
3. **Update deal stage** to "L1 - Meeting Scheduled"
4. **Add meeting details** to deal timeline
5. **Send meeting prep email** to user

### Follow-up Automation
1. **1-hour delay**: If no meeting booked, send reminder email
2. **24-hour delay**: If still no meeting, create SDR task for manual outreach

---

## Success Metrics

**Goal**: Increase L0 → L1 conversion rate from manual to automated flow

**Track**:
- Form submission rate (unchanged baseline)
- Calendar redirect click-through rate (target: >60%)
- Skip rate (target: <40%)
- Meeting booking rate (target: >30% of form submits)
- Time from form submit to meeting booked (target: <5 minutes)

**Dashboard**: Set up GTM/GA4 funnel to track:
1. Form submit → 2. Calendar redirect shown → 3. Calendar opened → 4. Meeting booked

---

## Next Action

**Start with Phase 1, Task 1**: Add numberOfBuildings field to `lib/cbps-calculator.ts`

```typescript
// File: lib/cbps-calculator.ts
// Line: ~28-40 (FormData interface)

export interface FormData {
  buildingType: string;
  squareFootage: string;
  numberOfBuildings: string; // ADD THIS LINE
  yearBuilt: string;
  buildingAddress: string;
  primaryUse: string;
  currentEnergyMgmt: string;
  contactName: string;
  email: string;
  phone: string;
  company: string;
}
```

Ready to proceed? Say "yes" and I'll start implementing Phase 1.
