# Form & Scheduling System Analysis
**Washington CBPS Compliance Website**

*Generated: 2025-01-28*

---

## Executive Summary

This document provides a complete technical analysis of the current form-based qualification and scheduling system that replaced the chatbot flow. The analysis reveals that while form submission to Zapier is working, **critical automation for CRM deal stages and meeting-based qualification is missing from the codebase**.

**Key Findings:**
- ✅ Forms successfully capture 10 fields + extensive metadata
- ✅ Data flows to Zapier webhook `885017/uhzbn5c`
- ✅ HubSpot booking links include UTM tracking
- ❌ **NO automated L0 → L1 deal stage progression**
- ❌ **NO building count field** (required for Kevin/Aaron assignment)
- ❌ **NO integration** between form submission and calendar booking
- ❌ **CRM automation must exist in Zapier** (not visible in code)

---

## Table of Contents

1. [Form Details](#1-form-details)
2. [Submission Handling](#2-submission-handling)
3. [Calendar + Meeting Logic](#3-calendar--meeting-logic)
4. [CRM Integration](#4-crm-integration)
5. [Failures & Edge Cases](#5-failures--edge-cases)
6. [End Goal Confirmation](#6-end-goal-confirmation)
7. [System Flow Diagram](#7-system-flow-diagram)
8. [Recommendations](#8-recommendations)
9. [Key Files Reference](#9-key-files-reference)

---

## 1. Form Details

### Primary Calculator Form
**Location**: `/calculator` page
**Components**: `components/calculator-hero-integrated.tsx` and `components/calculator-form.tsx`

#### All Form Fields (10 total)

**Building Information (6 fields):**

1. **buildingType** (Select, Required)
   - Options: `office`, `retail`, `warehouse`, `mixed-use`, `multifamily`, `healthcare`, `educational`, `other`

2. **squareFootage** (Number Input, Required)
   - Validation: Must be ≥ 20,000 sq ft
   - Used to determine Tier 1 (>50k) vs Tier 2 (20-50k)

3. **yearBuilt** (Number Input, Required)
   - Validation: 1900-2024
   - Affects cost multiplier (older buildings = higher cost)

4. **buildingAddress** (Text Input, Required)
   - Validation: Must contain "WA" or "Washington"

5. **primaryUse** (Select, Required)
   - Options: `owner-occupied`, `leased`, `mixed`, `vacant`

6. **currentEnergyMgmt** (Select, Required)
   - Options: `none`, `basic`, `automation`, `advanced`
   - Affects cost multiplier

**Contact Information (4 fields):**

7. **contactName** (Text Input, Required)
8. **email** (Email Input, Required)
9. **phone** (Tel Input, Required)
   - Validation: US phone format
10. **company** (Text Input, Optional)

#### Hidden/Auto-populated Fields

**UTM Parameters** (captured from URL on page load):
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`

**Metadata** (auto-generated on submission):
- `timestamp` - ISO 8601 timestamp
- `page_url` - Current page URL
- `referrer` - Document referrer or "direct"
- `user_agent` - Full browser user agent string
- `session_id` - Generated as `session_{timestamp}_{random}`
- `page_views` - Count from sessionStorage
- `time_on_site` - Seconds since session start
- `device_type` - `mobile`, `tablet`, or `desktop`
- `browser` - Chrome, Firefox, Safari, Edge, or Other
- `os` - Windows, macOS, Linux, Android, iOS, or Other
- `screen_resolution` - E.g., "1920x1080"
- `is_repeat_submission` - Boolean based on localStorage
- `form_source` - Pathname (e.g., "/calculator")
- `form_type` - E.g., "calculator_submission"
- `submission_count` - "first_time" or "repeat"

### Secondary Forms

**Contact Form Modal** (`components/contact-form-modal.tsx`):
- Similar fields but simplified building info
- `squareFootage` is a SELECT with ranges:
  - "20k-50k" (Tier 2)
  - "50k-90k" (Tier 1)
  - "90k-220k" (Tier 1)
  - "220k+" (Tier 1)
  - "multiple" (Multiple Buildings) ⚠️
- Includes `selectedPackage` field
- Has `message` textarea for listing properties

**Email Capture Modal** (`components/email-capture-modal.tsx`):
- Minimal fields: name, email, company
- Used for resource downloads
- Redirects to resource pages after capture

**Scheduling Modal** (`components/scheduling-modal.tsx`):
- Basic contact + building address
- Preferred date/time selection
- Urgency level dropdown

### Form Architecture

**Single-step form** - NOT multi-step. All fields displayed at once.

---

## 2. Submission Handling

### Backend Endpoint

**Zapier Webhook:**
```
POST https://hooks.zapier.com/hooks/catch/885017/uhzbn5c/
```

**This is the ONLY backend endpoint.** All forms post to this same Zapier webhook.

### Payload Structure

**Example Full Payload:**
```json
{
  "name": "John Smith",
  "email": "john@company.com",
  "phone": "(206) 555-0123",
  "company": "ABC Properties",
  "buildingType": "office",
  "squareFootage": "45000",
  "yearBuilt": "1995",
  "buildingAddress": "123 Main St, Seattle, WA",
  "primaryUse": "owner-occupied",
  "currentEnergyMgmt": "basic",

  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "cbps_awareness",
  "utm_term": "washington cbps",
  "utm_content": "ad_variant_a",

  "timestamp": "2025-01-28T10:30:00.000Z",
  "page_url": "https://washingtoncbps.com/calculator",
  "referrer": "https://google.com",
  "session_id": "session_1234567890_abc123",
  "page_views": 3,
  "time_on_site": 245,
  "device_type": "desktop",
  "browser": "Chrome",
  "os": "macOS",
  "screen_resolution": "1920x1080",
  "is_repeat_submission": false,
  "form_source": "/calculator",
  "form_type": "calculator_submission",
  "submission_count": "first_time"
}
```

### Data Flow

1. **Form Validation** (frontend only)
   - All fields validated before submission
   - Inline error display
   - No backend validation visible

2. **FormData Serialization**
   - All fields converted to FormData object
   - Nested objects stringified to JSON
   - Posted via fetch() as multipart/form-data

3. **GTM Event Tracking**
   - `form_submit` event fired before POST
   - `form_submission_success` fired on 200 response
   - `form_submission_error` fired on failure

4. **localStorage Persistence**
   - User data saved to `cbps_user_data`
   - Form data saved to `cbpsCalculatorData`
   - Used for auto-fill on repeat visits

### Conditional Logic

**⚠️ CRITICAL FINDING: NO building count routing logic exists in frontend.**

The only building-related conditional is:
- Contact form has `squareFootage: "multiple"` option
- This is just a string passed to Zapier
- **No parsing, no counting, no assignment logic**

### Duplicate Handling

**Detection:**
- Checks localStorage for `cbps_user_data`
- Sets `is_repeat_submission: true` if found
- Prefills form fields from saved data

**Prevention:**
- ❌ **NO duplicate prevention**
- Repeat submissions are flagged but NOT blocked
- Could create duplicate CRM deals

### Error Handling

**Success (200):**
```typescript
// Calculator forms
localStorage.setItem("cbpsCalculatorData", JSON.stringify(formData))
window.dispatchEvent(new CustomEvent("cbpsCalculationComplete"))
// Shows results component

// Contact/scheduling modals
router.push("/thank-you")
```

**Failure (non-200 or network error):**
```javascript
alert("There was an error submitting your request. Please try again or call (206) 593-4243.")
```

---

## 3. Calendar + Meeting Logic

### Current System: HubSpot Meetings

**Tool**: HubSpot Meetings (NOT Calendly, NOT custom endpoint)

**Base URL** (from `lib/hooks/useHubSpotBooking.ts:9`):
```
https://meetings.hubspot.com/dheppner/wa-state-compliance-review?uuid=512966ad-ff53-4dca-9607-6b548f522c72
```

**Calendar Owner**: dheppner (presumably David Heppner)

### Implementation Details

**Hook**: `useHubSpotBooking()`

**Provides:**
```typescript
{
  utmParams: UTMParams,           // Current session UTM data
  getBookingUrl: () => string,    // URL with UTM params appended
  openBooking: (params?) => void  // Opens URL in new tab
}
```

**UTM Flow:**
1. Page load → `captureAndStoreUTMParams()` extracts from URL
2. Stored in sessionStorage as `hubspot_utm_params`
3. Retrieved on booking link click
4. Appended to HubSpot URL as query params

### Usage Locations

**Calculator Results** (`components/calculator-results.tsx:150-153`):
```typescript
const handleScheduleCall = () => {
  openBooking({ uuid: "eac97de4-095d-4d24-a0ff-4b9bcdb696b3" })
}
```

**Other locations:**
- Pricing page CTAs
- Footer "Book Call" buttons
- Early adopter incentives section
- Various "Schedule Consultation" CTAs

### Form → Calendar Integration

**⚠️ CRITICAL GAP: Forms and calendar are SEPARATE, NOT INTEGRATED**

**Current Flow:**
```
1. User submits form → Zapier
2. User sees results page
3. User clicks "Schedule" button
4. Opens HubSpot in NEW TAB
5. User manually books (or abandons)
```

**What's Missing:**
- No automatic redirect to calendar
- No pre-population of HubSpot form with submitted data
- No confirmation webhook when meeting is booked
- No way to track if user actually scheduled

### Meeting Confirmation

**Frontend Tracking:**
- ❌ No webhook listener for HubSpot bookings
- ❌ No confirmation state in frontend
- ❌ No tracking of booking completion

**Assumption:**
- HubSpot handles booking confirmation internally
- Email confirmations sent by HubSpot
- Calendar invites sent by HubSpot

---

## 4. CRM Integration

### Current State: NO CRM AUTOMATION VISIBLE

**What Exists:**
- ✅ Form data posted to Zapier webhook
- ✅ HubSpot meeting link for scheduling
- ✅ UTM tracking throughout funnel

**What Does NOT Exist (in frontend code):**
- ❌ API calls to HubSpot CRM
- ❌ Deal creation logic
- ❌ Deal stage update logic (L0 → L1)
- ❌ Assignment rules (Kevin vs Aaron)
- ❌ n8n workflow references
- ❌ Supabase integration
- ❌ Any direct CRM interaction

### Where CRM Logic MUST Live

**Conclusion**: CRM automation **must be configured in Zapier** workflow ID `885017/uhzbn5c`

**The Zapier workflow is NOT in this codebase.**

To audit/modify CRM logic, you need:
1. Access to Zapier account
2. Navigate to webhook catch hook `885017/uhzbn5c`
3. Review the workflow steps

### The Missing "Number of Buildings" Field

**⚠️ CRITICAL FINDING:**

**There is NO "numberOfBuildings" field** in the calculator form.

**What exists:**
- Contact form modal has `squareFootage: "multiple"` dropdown option
- This is a vague indicator, not a count
- No parsing logic
- No assignment logic based on this value

**What's needed for Kevin/Aaron routing:**

**Option 1: Add explicit field**
```typescript
numberOfBuildings: string // "1", "2", "3-5", "6-10", "11+"
```

**Option 2: Parse message textarea**
- User manually lists properties in `message` field
- Backend counts addresses/buildings
- Error-prone, unreliable

**Option 3: Separate qualification question**
- Add to form: "How many buildings do you manage?"
- Numeric input or select dropdown

### Assignment Rules (Not Implemented)

**Desired Logic:**
```
IF numberOfBuildings >= 3:
  assignedTo = "Kevin"
ELSE IF numberOfBuildings <= 2:
  assignedTo = "Aaron"
ELSE:
  assignedTo = ??? (ERROR: missing data)
```

**Where this should happen:**
- Zapier workflow after webhook catch
- OR n8n workflow triggered by Zapier
- OR HubSpot workflow triggered by deal creation

### Deal Stage Progression (Not Implemented)

**Desired Flow:**
```
L0 (Lead Created):
  - Trigger: Form submission received
  - Action: Create HubSpot deal
  - Properties: Contact info, building data, UTM source

L1 (Meeting Scheduled):
  - Trigger: HubSpot meeting booked webhook
  - Action: Update deal stage L0 → L1
  - Assign owner based on building count
```

**Current Gap:**
- No visibility into whether this exists
- No webhook listener for meeting bookings
- No stage update confirmation

---

## 5. Failures & Edge Cases

### Current Bottlenecks

**1. Form-to-Calendar Drop-off**
- Users must manually click "Schedule" after form submission
- High abandonment risk
- No tracking of who schedules vs. who doesn't

**2. No Deal Stage Visibility**
- Can't confirm if L0 deals are being created
- Can't track L0 → L1 progression
- Can't monitor conversion from form to meeting

**3. Missing Building Count Field**
- Cannot implement Kevin/Aaron assignment without data
- "Multiple buildings" option is too vague
- No way to segment portfolios

**4. No Duplicate Prevention**
- Repeat submissions are flagged but allowed
- Could create duplicate contacts/deals in CRM
- Wastes sales team time

**5. Limited Error Handling**
- Failed Zapier POST shows generic alert
- No retry mechanism
- No queue for failed submissions
- No admin notification of failures

**6. No Meeting Confirmation Tracking**
- Can't distinguish between:
  - Form submitted + meeting scheduled
  - Form submitted + no meeting
- No follow-up automation for non-schedulers

### Temporary Fixes Currently In Place

**1. localStorage Auto-fill**
```typescript
// Prefills repeat visitor data from cbps_user_data
if (savedUserData) {
  setFormData(prev => ({ ...prev, ...userData }))
  setIsRepeatSubmission(true)
}
```

**2. GTM Error Tracking**
```typescript
window.dataLayer.push({
  event: "form_submission_error",
  error_type: "zapier_error",
  error_code: response.status
})
```

**3. Phone Number Fallback**
- All error alerts include: "...or call (206) 593-4243"
- Provides manual escalation path

**4. Session Persistence**
- sessionStorage maintains session_id across page views
- Allows attribution even if user returns later

### No Legacy Chatbot Code Interference

**Chatbot Status:**
- Exists as separate widget (`components/cbps-chatbot.tsx`)
- Posts to `/api/chat/route.ts` (different endpoint)
- NOT tied to calculator form flow
- No conditional logic in calculator forms

---

## 6. End Goal Confirmation

### Desired New Flow

**Step 1: Form Submission** ✅ (Working)
```
User fills form
  ↓
POST to Zapier (885017/uhzbn5c)
  ↓
Create/Update HubSpot Contact
  ↓
Create HubSpot Deal
  ↓
Deal Stage: L0 (Lead Created)
```

**Step 2: Meeting Scheduling** ❌ (NOT Automated)
```
User sees results page
  ↓
[MANUAL ACTION REQUIRED]
  ↓
User clicks "Schedule Consultation"
  ↓
Opens HubSpot calendar (new tab)
  ↓
User books meeting
  ↓
HubSpot sends webhook
  ↓
Zapier/n8n receives webhook
  ↓
Update Deal Stage: L0 → L1
  ↓
Assign owner based on building count
  ↓
Send confirmation to sales team
```

### Required Changes

**Frontend:**
1. ✅ **Add `numberOfBuildings` field** to calculator form
   ```typescript
   <Select name="numberOfBuildings" required>
     <SelectItem value="1">1 Building</SelectItem>
     <SelectItem value="2">2 Buildings</SelectItem>
     <SelectItem value="3-5">3-5 Buildings</SelectItem>
     <SelectItem value="6-10">6-10 Buildings</SelectItem>
     <SelectItem value="11+">11+ Buildings</SelectItem>
   </Select>
   ```

2. ✅ **Auto-redirect to calendar** after successful form submission
   ```typescript
   if (response.ok) {
     // Brief success message
     toast.success("Calculating your compliance requirements...")

     // Redirect to HubSpot with pre-filled data
     setTimeout(() => {
       const bookingUrl = getBookingUrl({
         firstname: formData.contactName.split(' ')[0],
         lastname: formData.contactName.split(' ')[1] || '',
         email: formData.email,
         phone: formData.phone,
         company: formData.company
       })
       window.location.href = bookingUrl
     }, 2000)
   }
   ```

3. ✅ **Add "Skip for now" option**
   - Allow users to see results without immediate scheduling
   - Track who skips vs. who schedules
   - Follow-up email for non-schedulers

**Backend/Zapier:**
1. ✅ **Create HubSpot Deal** (Stage: L0)
   - Map form fields to HubSpot properties
   - Store building count as custom property
   - Tag with UTM source/campaign

2. ✅ **Implement Assignment Logic**
   ```
   IF numberOfBuildings >= 3:
     deal.owner = "Kevin"
   ELSE IF numberOfBuildings <= 2:
     deal.owner = "Aaron"
   ELSE:
     deal.owner = "Unassigned"
     CREATE task "Qualify building count"
   ```

3. ✅ **Set up HubSpot Meeting Webhook**
   - Trigger: Meeting booked via dheppner calendar
   - Action: POST to Zapier/n8n
   - Payload: Contact email, meeting time, deal ID

4. ✅ **Update Deal Stage on Meeting Booking**
   ```
   WHEN meeting_booked webhook received:
     FIND deal by contact email
     UPDATE deal.stage = "L1"
     UPDATE deal.meeting_date = webhook.meeting_time
     SEND notification to assigned owner
   ```

5. ✅ **Follow-up Automation for Non-Schedulers**
   ```
   WHEN form submitted:
     WAIT 1 hour
     IF deal.stage still = "L0":
       SEND email reminder to schedule
       CREATE task for SDR to follow up
   ```

---

## 7. System Flow Diagram

### Current Implementation

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER LANDS ON /calculator                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │ UTM Capture     │
                    │ (sessionStorage)│
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │ Form Pre-fill   │
                    │ (localStorage)  │
                    └────────┬────────┘
                             │
                ┌────────────▼─────────────┐
                │  User Fills 10 Fields    │
                │  + Auto-metadata Capture │
                └────────────┬─────────────┘
                             │
                     ┌───────▼────────┐
                     │  Client-side   │
                     │  Validation    │
                     └───────┬────────┘
                             │
                ┌────────────▼─────────────────┐
                │  POST to Zapier Webhook      │
                │  (885017/uhzbn5c)            │
                │  - Form data                 │
                │  - UTM params                │
                │  - Session metadata          │
                └────────────┬─────────────────┘
                             │
                     ┌───────▼────────┐
                     │  GTM Event     │
                     │  Tracking      │
                     └───────┬────────┘
                             │
              ┌──────────────▼───────────────┐
              │  Success: Show Results Page  │
              │  - CBPS tier calculation     │
              │  - Cost estimates            │
              │  - Penalty warnings          │
              │  - "Schedule Call" CTA       │
              └──────────────┬───────────────┘
                             │
            ┌────────────────┴────────────────┐
            │                                 │
    ┌───────▼────────┐            ┌──────────▼─────────┐
    │ User Clicks    │            │ User Does Nothing  │
    │ "Schedule"     │            │ (Drop-off)         │
    └───────┬────────┘            └────────────────────┘
            │
    ┌───────▼─────────────────────┐
    │ Opens HubSpot Meeting Link  │
    │ (new tab)                   │
    │ - With UTM params           │
    └───────┬─────────────────────┘
            │
    ┌───────▼──────────┐
    │ User Books       │
    │ Meeting          │
    │ (HubSpot system) │
    └──────────────────┘
```

### Missing Automation Layer

```
═══════════════════════════════════════════════════════════════════
                   🚫 MISSING AUTOMATION LAYER 🚫
                    (NOT IN CODEBASE - NEEDS BUILD)
═══════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────┐
│                      ZAPIER WORKFLOW                             │
│                   (ID: 885017/uhzbn5c)                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────┐      │
│  │ 1. Catch Webhook                                     │      │
│  │    - Receive form data                               │      │
│  │    - Validate required fields                        │      │
│  └──────────────────┬───────────────────────────────────┘      │
│                     │                                            │
│  ┌──────────────────▼───────────────────────────────────┐      │
│  │ 2. Create/Update HubSpot Contact                     │      │
│  │    - Email as unique identifier                      │      │
│  │    - Update properties if exists                     │      │
│  │    - Store UTM data in contact properties            │      │
│  └──────────────────┬───────────────────────────────────┘      │
│                     │                                            │
│  ┌──────────────────▼───────────────────────────────────┐      │
│  │ 3. Create HubSpot Deal                               │      │
│  │    - Associate with contact                          │      │
│  │    - Deal name: "{Company} - CBPS Compliance"        │      │
│  │    - Deal stage: L0 (Lead Created)                   │      │
│  │    - Amount: Estimated compliance cost               │      │
│  └──────────────────┬───────────────────────────────────┘      │
│                     │                                            │
│  ┌──────────────────▼───────────────────────────────────┐      │
│  │ 4. Assign Deal Owner                                 │      │
│  │    ⚠️ CURRENTLY BROKEN - Missing numberOfBuildings   │      │
│  │                                                       │      │
│  │    IF numberOfBuildings >= 3:                        │      │
│  │       deal.owner = "Kevin"                           │      │
│  │    ELSE IF numberOfBuildings <= 2:                   │      │
│  │       deal.owner = "Aaron"                           │      │
│  │    ELSE:                                             │      │
│  │       deal.owner = null                              │      │
│  │       CREATE task "Qualify building count"           │      │
│  └──────────────────┬───────────────────────────────────┘      │
│                     │                                            │
│  ┌──────────────────▼───────────────────────────────────┐      │
│  │ 5. Send Notifications                                │      │
│  │    - Email to assigned owner                         │      │
│  │    - Slack notification to #leads channel            │      │
│  │    - Auto-responder to lead                          │      │
│  └──────────────────────────────────────────────────────┘      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│              HUBSPOT MEETING WEBHOOK → ZAPIER/n8n               │
│                    (NEEDS TO BE BUILT)                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────┐      │
│  │ 1. HubSpot Fires Webhook                             │      │
│  │    - Event: meeting.booked                           │      │
│  │    - Payload: contact_email, meeting_time, owner     │      │
│  └──────────────────┬───────────────────────────────────┘      │
│                     │                                            │
│  ┌──────────────────▼───────────────────────────────────┐      │
│  │ 2. Find Matching Deal                                │      │
│  │    - Search by contact email                         │      │
│  │    - Filter: stage = "L0"                            │      │
│  └──────────────────┬───────────────────────────────────┘      │
│                     │                                            │
│  ┌──────────────────▼───────────────────────────────────┐      │
│  │ 3. Update Deal Stage                                 │      │
│  │    - stage: L0 → L1 (Meeting Scheduled)              │      │
│  │    - meeting_date: webhook.meeting_time              │      │
│  │    - last_activity: timestamp                        │      │
│  └──────────────────┬───────────────────────────────────┘      │
│                     │                                            │
│  ┌──────────────────▼───────────────────────────────────┐      │
│  │ 4. Trigger Sales Workflow                            │      │
│  │    - Send prep email to assigned rep                 │      │
│  │    - Create pre-call research task                   │      │
│  │    - Add to CRM activity timeline                    │      │
│  └──────────────────────────────────────────────────────┘      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Proposed New Flow (Automated)

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER LANDS ON /calculator                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │ UTM Capture     │
                    │ (sessionStorage)│
                    └────────┬────────┘
                             │
                ┌────────────▼─────────────────┐
                │  User Fills 11 Fields        │
                │  ✅ NEW: numberOfBuildings   │
                │  + Auto-metadata Capture     │
                └────────────┬─────────────────┘
                             │
                     ┌───────▼────────┐
                     │  Validation    │
                     └───────┬────────┘
                             │
                ┌────────────▼─────────────────┐
                │  POST to Zapier              │
                │  ✅ Including building count │
                └────────────┬─────────────────┘
                             │
                     ┌───────▼─────────┐
                     │  Brief Success  │
                     │  Message (2 sec)│
                     └───────┬─────────┘
                             │
              ┌──────────────▼──────────────────┐
              │  ✅ AUTO-REDIRECT TO CALENDAR   │
              │  - HubSpot booking URL          │
              │  - Pre-filled contact info      │
              │  - UTM params preserved         │
              └──────────────┬──────────────────┘
                             │
            ┌────────────────┴────────────────┐
            │                                 │
    ┌───────▼────────┐            ┌──────────▼─────────┐
    │ User Books     │            │ User Closes Tab    │
    │ Meeting        │            │ (tracked as L0)    │
    │ → Triggers     │            └────────────────────┘
    │   Webhook      │
    │ → Deal → L1    │
    └────────────────┘

═══════════════════════════════════════════════════════════════════
                     AUTOMATED BACKEND FLOW
═══════════════════════════════════════════════════════════════════

┌────────────────────────────────────────────────────────────────┐
│  Form Submit → Zapier                                          │
│  ├─ Create HubSpot Contact                                     │
│  ├─ Create Deal (Stage: L0)                                    │
│  ├─ Assign to Kevin (3+ buildings) or Aaron (1-2 buildings)    │
│  └─ Send notification                                          │
└────────────────────────────────────────────────────────────────┘
                             ↓
┌────────────────────────────────────────────────────────────────┐
│  User redirected to HubSpot calendar                           │
└────────────────────────────────────────────────────────────────┘
                             ↓
┌────────────────────────────────────────────────────────────────┐
│  IF Meeting Booked:                                            │
│  └─ HubSpot Webhook → Zapier                                   │
│     ├─ Find Deal by email                                      │
│     ├─ Update Stage: L0 → L1                                   │
│     ├─ Add meeting_date property                               │
│     └─ Send prep email to assigned rep                         │
└────────────────────────────────────────────────────────────────┘
                             ↓
┌────────────────────────────────────────────────────────────────┐
│  IF No Meeting Booked (after 1 hour):                          │
│  └─ Zapier Delay + Check                                       │
│     ├─ IF still L0:                                            │
│     │  ├─ Send reminder email                                  │
│     │  └─ Create follow-up task for SDR                        │
│     └─ ELSE: Do nothing (already scheduled)                    │
└────────────────────────────────────────────────────────────────┘
```

---

## 8. Recommendations

### Immediate Actions (Priority 1)

**1. Add "Number of Buildings" Field**

Add to calculator form (`components/calculator-hero-integrated.tsx`):

```typescript
<div>
  <Label htmlFor="numberOfBuildings">
    Number of Buildings You Manage *
  </Label>
  <Select
    value={formData.numberOfBuildings}
    onValueChange={(value) =>
      handleInputChange("numberOfBuildings", value)
    }
  >
    <SelectTrigger
      className={errors.numberOfBuildings ? "border-red-500" : ""}
    >
      <SelectValue placeholder="Select number of buildings" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="1">1 Building</SelectItem>
      <SelectItem value="2">2 Buildings</SelectItem>
      <SelectItem value="3-5">3-5 Buildings</SelectItem>
      <SelectItem value="6-10">6-10 Buildings</SelectItem>
      <SelectItem value="11+">11+ Buildings</SelectItem>
    </SelectContent>
  </Select>
  {errors.numberOfBuildings && (
    <p className="text-red-500 text-sm mt-1">
      {errors.numberOfBuildings}
    </p>
  )}
</div>
```

Update FormData interface:
```typescript
interface FormData {
  // ... existing fields
  numberOfBuildings: string; // NEW
}
```

**2. Implement Auto-redirect to Calendar**

Replace results display with redirect flow:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  // ... existing validation and Zapier POST

  if (response.ok) {
    // Show brief success message
    setIsCalculating(false)

    // Show success toast/modal
    const successModal = document.createElement('div')
    successModal.innerHTML = `
      <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white p-8 rounded-lg max-w-md text-center">
          <h3 class="text-2xl font-bold text-green-600 mb-4">
            ✓ Analysis Complete!
          </h3>
          <p class="text-gray-700 mb-6">
            Redirecting you to schedule your free consultation...
          </p>
          <div class="animate-pulse text-sm text-gray-500">
            Opening calendar in 2 seconds
          </div>
        </div>
      </div>
    `
    document.body.appendChild(successModal)

    // Prepare booking URL with pre-filled data
    const bookingParams = {
      firstname: formData.contactName.split(' ')[0],
      lastname: formData.contactName.split(' ').slice(1).join(' ') || '',
      email: formData.email,
      phone: formData.phone,
      company: formData.company
    }

    const bookingUrl = getBookingUrl(bookingParams)

    // Redirect after 2 seconds
    setTimeout(() => {
      window.location.href = bookingUrl
    }, 2000)
  }
}
```

**3. Document Existing Zapier Workflow**

Create audit document:
- Log into Zapier account
- Navigate to webhook `885017/uhzbn5c`
- Document all steps in the workflow
- Identify if HubSpot integration exists
- Check if deal creation is working
- Verify assignment logic (if any)

**4. Add "View Results Without Scheduling" Option**

Provide escape hatch for users who don't want immediate booking:

```typescript
<div class="flex items-center justify-between mb-4">
  <Button onClick={handleSchedule}>
    Schedule Free Consultation
  </Button>
  <button
    onClick={() => setShowResults(true)}
    className="text-sm text-gray-500 underline"
  >
    View results without scheduling
  </button>
</div>
```

### Short-term Actions (Priority 2)

**5. Configure HubSpot Meeting Webhook**

In HubSpot settings:
1. Navigate to Settings → Integrations → Webhooks
2. Create new webhook subscription
3. Event: `meeting.booked` for dheppner calendar
4. Target URL: New Zapier webhook or n8n endpoint
5. Payload: Include contact_email, meeting_time, deal_id

**6. Build Meeting → L1 Automation**

Create new Zapier workflow:
```
Trigger: Webhook catch (HubSpot meeting booked)
  ↓
Action: Find HubSpot Deal
  - Search by contact email
  - Filter: stage = "L0"
  ↓
Action: Update HubSpot Deal
  - stage = "L1"
  - meeting_date = webhook.meeting_time
  ↓
Action: Send Email (to assigned rep)
  - Template: "Meeting scheduled with {contact_name}"
  - Include: Deal link, contact info, meeting time
  ↓
Action: Create HubSpot Task
  - Title: "Prepare for {contact_name} CBPS call"
  - Due: 1 day before meeting
  - Assigned to: Deal owner
```

**7. Implement Follow-up for Non-Schedulers**

Add to Zapier workflow:
```
Trigger: Form submission (after L0 deal created)
  ↓
Delay: 1 hour
  ↓
Action: Get HubSpot Deal
  - By deal_id from trigger
  ↓
Filter: Only continue if stage still = "L0"
  ↓
Action: Send Email (via HubSpot or SendGrid)
  - To: Contact email
  - Subject: "Still have questions about CBPS compliance?"
  - Body: Reminder to schedule + direct calendar link
  ↓
Action: Create HubSpot Task
  - Assigned to: SDR team
  - Title: "Follow up with {contact_name} - didn't schedule"
  - Due: Today
```

### Long-term Improvements (Priority 3)

**8. Add Duplicate Prevention**

Before creating deal in Zapier:
```
1. Search HubSpot for existing contact by email
2. If found:
   - Check for open deals (not closed-won/closed-lost)
   - If open deal exists:
     - Update deal properties with new form data
     - Add note: "Resubmitted calculator form"
     - Send notification to assigned rep
   - Else: Create new deal
3. If not found:
   - Create new contact + deal
```

**9. Implement Retry Queue**

For failed Zapier submissions:
```typescript
// In frontend after Zapier POST failure
const failedSubmission = {
  ...zapierPayload,
  failed_at: new Date().toISOString(),
  retry_count: 0
}

// Store in localStorage queue
const queue = JSON.parse(localStorage.getItem('failed_submissions') || '[]')
queue.push(failedSubmission)
localStorage.setItem('failed_submissions', JSON.stringify(queue))

// On next page load, retry failed submissions
const retryQueue = JSON.parse(localStorage.getItem('failed_submissions') || '[]')
retryQueue.forEach(async (submission) => {
  if (submission.retry_count < 3) {
    const response = await fetch(ZAPIER_URL, {
      method: 'POST',
      body: createFormData(submission)
    })
    if (response.ok) {
      // Remove from queue
    } else {
      submission.retry_count++
    }
  }
})
```

**10. Build Admin Dashboard**

Create monitoring interface:
- Form submission count (daily/weekly)
- Zapier success/failure rate
- L0 deal creation rate
- L1 conversion rate (% who schedule meeting)
- Average time from L0 to L1
- Assignment distribution (Kevin vs Aaron)

**11. A/B Test Redirect vs. Results Page**

Test two flows:
- **Variant A**: Auto-redirect to calendar (recommended)
- **Variant B**: Show results + Schedule CTA

Track:
- Form → Meeting conversion rate
- User satisfaction
- Sales team feedback
- Calendar booking completion rate

---

## 9. Key Files Reference

### Forms & Components

**Main Calculator:**
- `components/calculator-hero-integrated.tsx` (Lines 1-820)
  - Integrated form + hero section
  - Single-step, 10 fields
  - Auto-metadata capture
  - Zapier POST on submit

- `components/calculator-form.tsx` (Lines 1-698)
  - Standalone calculator component
  - Same structure as integrated version
  - Can be used in other pages

**Secondary Forms:**
- `components/contact-form-modal.tsx` (Lines 1-449)
  - General contact/inquiry form
  - Simplified building info
  - `squareFootage` as SELECT (includes "multiple" option)

- `components/email-capture-modal.tsx` (Lines 1-192)
  - Minimal lead capture
  - For resource downloads
  - Redirects to resource pages

- `components/scheduling-modal.tsx` (Lines 1-244)
  - Building assessment scheduling
  - Date/time preference
  - Urgency level

### Business Logic

**Calculator Engine:**
- `lib/cbps-calculator.ts` (Lines 1-204)
  - `calculateCBPSRequirements(formData)` - Main calculation function
  - Tier determination (Tier 1 vs Tier 2 based on 50k sqft threshold)
  - Cost estimation with multipliers:
    - Building type: 0.08-0.18 per sqft
    - Age factor: 1.0-1.4x
    - Energy mgmt factor: 0.8-1.3x
  - Penalty calculations (daily, annual, max $55,555)
  - Incentive calculations (Tier 1: 50%, Tier 2: 100%)
  - Risk level assessment
  - Next steps generation

### Integration Hooks

**HubSpot Booking:**
- `lib/hooks/useHubSpotBooking.ts` (Lines 1-70)
  - `useHubSpotBooking()` hook
  - `getBookingUrl(params)` - Returns URL with UTM
  - `openBooking(params)` - Opens in new tab
  - Base URL: `https://meetings.hubspot.com/dheppner/wa-state-compliance-review`

**UTM Tracking:**
- `lib/utm-utils.ts` (Lines 1-105)
  - `extractUTMParams(searchString)` - Parse URL params
  - `appendUTMParams(url, params)` - Add to URL
  - `storeUTMParams(params)` - Save to sessionStorage
  - `getStoredUTMParams()` - Retrieve from storage
  - `captureAndStoreUTMParams()` - Full capture flow

### Results & CTAs

**Results Display:**
- `components/calculator-results.tsx` (Lines 1-395)
  - Listens for `cbpsCalculationComplete` event
  - Displays tier, deadlines, costs, penalties
  - Shows "Schedule Free Consultation" CTA
  - Calls `openBooking()` on button click
  - Auto-scrolls to results after calculation

### Pages

**Calculator Page:**
- `app/calculator/page.tsx` (Lines 1-75)
  - Renders `CalculatorHeroIntegrated`
  - Includes Schema.org markup for WebApplication
  - SEO optimized metadata

**Thank You Page:**
- `app/thank-you/page.tsx`
  - Redirect destination for contact form modal
  - Confirms submission received

### Configuration

**TypeScript Types:**
- `lib/cbps-calculator.ts` (Lines 1-27)
  ```typescript
  interface FormData {
    buildingType: string
    squareFootage: string
    yearBuilt: string
    buildingAddress: string
    primaryUse: string
    currentEnergyMgmt: string
    contactName: string
    email: string
    phone: string
    company: string
  }

  interface CBPSResults {
    tier: "Tier 1" | "Tier 2"
    ompDeadline: string
    performanceDeadline: string
    estimatedCost: number
    dailyPenalty: number
    annualPenalty: number
    tier2Incentive: number
    tier1Incentive: number
    daysUntilDeadline: number
    compliancePriority: "High" | "Medium" | "Low"
    riskLevel: "Critical" | "High" | "Moderate" | "Low"
    nextSteps: string[]
  }
  ```

### External Endpoints

**Zapier Webhook:**
```
POST https://hooks.zapier.com/hooks/catch/885017/uhzbn5c/
Content-Type: multipart/form-data
```

**HubSpot Calendar:**
```
GET https://meetings.hubspot.com/dheppner/wa-state-compliance-review
Query Params:
  - uuid=512966ad-ff53-4dca-9607-6b548f522c72
  - utm_source, utm_medium, utm_campaign, etc.
  - firstname, lastname, email, phone (for pre-fill)
```

### Analytics

**GTM Events:**
- `form_submit` - When form is submitted
- `form_submission_success` - When Zapier POST succeeds
- `form_submission_error` - When Zapier POST fails
- Event properties include: form_name, building_type, square_footage, is_repeat_submission

**localStorage Keys:**
- `cbps_user_data` - Saved contact info for auto-fill
- `cbpsCalculatorData` - Last calculation form data
- `failed_submissions` - Queue of failed Zapier POSTs (recommended)

**sessionStorage Keys:**
- `cbps_session_id` - Unique session identifier
- `cbps_session_start` - Session start timestamp
- `cbps_page_views` - Page view count
- `hubspot_utm_params` - Captured UTM parameters

---

## Appendix: Questions Still Unanswered

These require access outside the codebase:

1. **Zapier Workflow Configuration**
   - What steps exist in webhook `885017/uhzbn5c`?
   - Is HubSpot CRM integration configured?
   - Are deals being created successfully?
   - What happens to the `numberOfBuildings` field when added?

2. **HubSpot CRM Setup**
   - Custom properties for CBPS data?
   - Deal stages defined (L0, L1, etc.)?
   - Owner assignment rules configured?
   - Meeting webhook endpoint configured?

3. **Current L0 → L1 Flow**
   - Does any automation exist?
   - Manual process by sales team?
   - Other tools involved (n8n, Make, etc.)?

4. **Kevin vs Aaron Assignment**
   - Are they HubSpot users?
   - What are their user IDs?
   - Current load balancing approach?
   - Escalation path if both unavailable?

5. **Follow-up Process**
   - What happens to L0 deals that don't convert?
   - Email sequences configured?
   - SDR team workflow?
   - Re-engagement campaigns?

---

## Document Version

**Version**: 1.0
**Last Updated**: 2025-01-28
**Author**: Claude Code Analysis
**Repository**: `/Volumes/EPVault/projects/clients/vert/washington-cbps`

**Next Review**: After implementing Priority 1 recommendations

---

*End of Analysis*
