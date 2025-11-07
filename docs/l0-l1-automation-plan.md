# L0 → L1 Automation Implementation Plan
**Washington CBPS Compliance Website**

*Created: 2025-01-28*

---

## Executive Summary

**Goal**: Automate lead qualification and meeting scheduling so deals move from L0 → L1 in HubSpot without manual intervention.

**Current State**: Form submissions work, but there's a manual gap between form completion and meeting booking. No automation exists to promote deals to L1 when meetings are scheduled.

**Target State**: Two-step automated flow:
1. User fills form (including building count) → Auto-creates L0 deal
2. Auto-redirects to HubSpot calendar → User books meeting → Deal moves to L1 + assigned to Kevin/Aaron

---

## Problem Statement

Anthony wants to replace the deprecated chatbot with a simple form + auto-scheduling flow where:

- ✅ User completes qualification form (including number of buildings)
- ✅ Automatically redirects to HubSpot calendar booking page (pre-filled with their info)
- ✅ When meeting booked: Deal stage updates to L1 automatically
- ✅ Deal routes to **Kevin** (≥3 buildings) or **Aaron** (≤2 buildings)
- ✅ If no booking within X hours, trigger follow-up task/email

**Note**: The chatbot branch (`feature/lead-qualification-agent`) is deprecated and will NOT be used.

---

## Current State Analysis

### What Works ✅

1. **Form Data Collection**
   - 10 fields captured (building type, sqft, year, address, etc.)
   - Extensive metadata (UTM, session, device info)
   - All data posts to Zapier webhook: `885017/uhzbn5c`

2. **UTM Tracking**
   - Captured on page load
   - Stored in sessionStorage
   - Passed to HubSpot booking URLs

3. **HubSpot Calendar Integration**
   - `useHubSpotBooking` hook provides booking URLs
   - UTM params appended automatically
   - Base URL: `https://meetings.hubspot.com/dheppner/wa-state-compliance-review`

### Critical Gaps ❌

1. **No "Number of Buildings" Field**
   - Required for Kevin/Aaron assignment
   - Contact form has vague "multiple buildings" option but no count
   - Calculator form has NO building count field at all

2. **Manual Booking Process**
   - Form submission shows results page
   - User must manually click "Schedule" button
   - Opens HubSpot in new tab (high drop-off risk)
   - No connection between form data and booking

3. **No Meeting Confirmation Tracking**
   - No webhook when HubSpot meeting is booked
   - No way to detect if user actually scheduled
   - No L0 → L1 automation visible

4. **No CRM Automation in Frontend**
   - Deal creation happens in Zapier (not visible in code)
   - No stage update logic
   - No assignment routing logic

5. **No Follow-up Automation**
   - Users who submit but don't schedule fall through cracks
   - No reminder emails
   - No SDR tasks created

---

## Implementation Plan

### Phase 1: Frontend Updates (Form & Flow)
**Timeline**: 1-2 days
**Complexity**: Low

#### Task 1.1: Add "Number of Buildings" Field

**File**: `components/calculator-hero-integrated.tsx` (lines 90-819)

**Add to FormData interface**:
```typescript
interface FormData {
  // ... existing fields
  numberOfBuildings: string; // NEW - Required
}
```

**Add form field** (after `currentEnergyMgmt` field, before contact info):
```typescript
<div>
  <Label htmlFor="numberOfBuildings" className="text-white">
    Number of Buildings You Manage *
  </Label>
  <Select
    value={formData.numberOfBuildings}
    onValueChange={(value) =>
      handleInputChange("numberOfBuildings", value)
    }
  >
    <SelectTrigger
      className={`bg-white/10 border-white/30 text-white ${
        errors.numberOfBuildings ? "border-red-500" : ""
      }`}
    >
      <SelectValue placeholder="Select number of buildings" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="1">1 Building</SelectItem>
      <SelectItem value="2">2 Buildings</SelectItem>
      <SelectItem value="3">3 Buildings</SelectItem>
      <SelectItem value="4">4 Buildings</SelectItem>
      <SelectItem value="5">5 Buildings</SelectItem>
      <SelectItem value="6-10">6-10 Buildings</SelectItem>
      <SelectItem value="11+">11+ Buildings</SelectItem>
    </SelectContent>
  </Select>
  {errors.numberOfBuildings && (
    <p className="text-red-400 text-sm mt-1">
      {errors.numberOfBuildings}
    </p>
  )}
</div>
```

**Add validation**:
```typescript
const validateForm = (): boolean => {
  const newErrors: Record<string, string> = {};

  // ... existing validations

  if (!formData.numberOfBuildings) {
    newErrors.numberOfBuildings = "Please select number of buildings";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

**Also update**: `components/calculator-form.tsx` with same field

#### Task 1.2: Implement Auto-Redirect to Calendar

**File**: `components/calculator-hero-integrated.tsx` (around line 400-500, in `handleSubmit`)

**Replace current success handling**:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsCalculating(true);

  // ... existing Zapier POST logic

  try {
    const response = await fetch("https://hooks.zapier.com/hooks/catch/885017/uhzbn5c/", {
      method: "POST",
      body: formDataToSend,
    });

    if (response.ok) {
      console.log("[v0] Successfully sent to Zapier");

      // GTM success event
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "form_submission_success",
          form_name: "calculator_form",
          building_count: formData.numberOfBuildings,
        });
      }

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cbpsCalculatorData", JSON.stringify(formData));
        localStorage.setItem("cbps_user_data", JSON.stringify({
          name: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
        }));
      }

      // NEW: Auto-redirect to calendar instead of showing results
      setIsCalculating(false);

      // Show brief success message
      const successOverlay = document.createElement('div');
      successOverlay.innerHTML = `
        <div class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div class="bg-white p-8 rounded-lg max-w-md text-center shadow-2xl">
            <div class="mb-4">
              <svg class="w-16 h-16 text-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">
              Compliance Analysis Complete!
            </h3>
            <p class="text-gray-700 mb-4">
              We've calculated your CBPS requirements and potential savings.
            </p>
            <p class="text-gray-600 mb-6">
              Redirecting you to schedule your free consultation in
              <span class="font-bold text-green-600" id="countdown">3</span> seconds...
            </p>
            <div class="flex gap-3">
              <button
                onclick="window.location.href='${getBookingUrlForRedirect()}'"
                class="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition"
              >
                Schedule Now
              </button>
              <button
                onclick="this.closest('.fixed').remove(); showResults();"
                class="px-4 py-3 text-gray-600 hover:text-gray-800 text-sm underline"
              >
                Skip for now
              </button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(successOverlay);

      // Countdown timer
      let countdown = 3;
      const countdownEl = document.getElementById('countdown');
      const countdownInterval = setInterval(() => {
        countdown--;
        if (countdownEl) {
          countdownEl.textContent = countdown.toString();
        }
        if (countdown === 0) {
          clearInterval(countdownInterval);
          window.location.href = getBookingUrlForRedirect();
        }
      }, 1000);

      // Store function in window for "Skip" button
      (window as any).showResults = () => {
        successOverlay.remove();
        // Dispatch event to show results component
        window.dispatchEvent(
          new CustomEvent("cbpsCalculationComplete", {
            detail: formData,
          })
        );
      };

    } else {
      // ... existing error handling
    }
  } catch (error) {
    // ... existing error handling
  }
};

// Helper function to build HubSpot URL with form data
function getBookingUrlForRedirect(): string {
  const { getBookingUrl } = useHubSpotBooking();

  const [firstName, ...lastNameParts] = formData.contactName.split(' ');
  const lastName = lastNameParts.join(' ');

  // Build URL with pre-filled data
  const params = new URLSearchParams();
  params.append('firstname', firstName);
  if (lastName) params.append('lastname', lastName);
  params.append('email', formData.email);
  params.append('phone', formData.phone);
  if (formData.company) params.append('company', formData.company);

  // Add qualification data as hidden fields
  params.append('building_type', formData.buildingType);
  params.append('square_footage', formData.squareFootage);
  params.append('number_of_buildings', formData.numberOfBuildings);

  return `${getBookingUrl()}&${params.toString()}`;
}
```

**Alternative: Keep Results Visible Option**

If you want users to see their compliance results BEFORE booking:

```typescript
if (response.ok) {
  // Show results first
  window.dispatchEvent(
    new CustomEvent("cbpsCalculationComplete", {
      detail: formData,
    })
  );

  // After 5 seconds, show booking prompt overlay
  setTimeout(() => {
    showBookingPrompt();
  }, 5000);
}

function showBookingPrompt() {
  // Show sticky footer or modal prompting to book
  const bookingPrompt = document.createElement('div');
  bookingPrompt.innerHTML = `
    <div class="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-green-600 to-green-700 text-white p-6 shadow-2xl z-50 animate-slide-up">
      <div class="container mx-auto flex items-center justify-between">
        <div>
          <h4 class="text-xl font-bold mb-1">Ready to Get Started?</h4>
          <p class="text-white/90">Schedule your free consultation to discuss these results</p>
        </div>
        <div class="flex gap-3">
          <button
            onclick="window.location.href='${getBookingUrlForRedirect()}'"
            class="bg-white text-green-700 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition"
          >
            Schedule Free Consultation
          </button>
          <button
            onclick="this.closest('.fixed').remove()"
            class="text-white/80 hover:text-white px-4"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(bookingPrompt);
}
```

**Decision Point**: Which approach?
- **Auto-redirect** (recommended): Higher booking rate, simpler flow
- **Results + prompt**: Better UX, user sees calculations first

**Recommendation**: Start with auto-redirect. A/B test later.

---

### Phase 2: Backend Automation (Zapier/n8n)
**Timeline**: 2-3 days
**Complexity**: Medium

#### Task 2.1: Audit Existing Zapier Workflow

**Action Items**:
1. Log into Zapier account
2. Find webhook `885017/uhzbn5c`
3. Document current workflow steps
4. Identify if HubSpot integration exists
5. Check if deals are being created
6. Verify what happens to `numberOfBuildings` field

**Create audit document**: `docs/zapier-workflow-audit.md`

#### Task 2.2: Update Zapier L0 Deal Creation

**Zapier Workflow (Form Submission)**:

```
Trigger: Catch Webhook
  URL: https://hooks.zapier.com/hooks/catch/885017/uhzbn5c/

↓

Filter: Only Continue If Valid Submission
  Conditions:
    - email is not empty
    - contactName is not empty
    - numberOfBuildings is not empty

↓

Action: Find or Create Contact in HubSpot
  Search by: email
  Update if exists: Yes
  Properties to set:
    - firstname: {parsed from contactName}
    - lastname: {parsed from contactName}
    - email: {email}
    - phone: {phone}
    - company: {company}
    - building_type: {buildingType}
    - square_footage: {squareFootage}
    - number_of_buildings: {numberOfBuildings}
    - year_built: {yearBuilt}
    - building_address: {buildingAddress}
    - primary_use: {primaryUse}
    - current_energy_mgmt: {currentEnergyMgmt}
    - utm_source: {utm_source}
    - utm_medium: {utm_medium}
    - utm_campaign: {utm_campaign}
    - lead_source: "Calculator Form"

↓

Action: Search for Existing Open Deal
  Search by: Associated Contact Email
  Filter: Deal Stage = "L0" OR Deal Stage = "L1"

↓

Paths:

  Path A: If Existing Open Deal Found
    Action: Update Deal Properties
      - last_form_submission: {timestamp}
      - form_submission_count: +1
      - number_of_buildings: {numberOfBuildings}
      - total_square_footage: {squareFootage}

    Action: Add Note to Deal
      Note: "Lead resubmitted calculator form on {timestamp}"

    Action: Skip creating duplicate deal

  Path B: If No Open Deal Found
    Action: Create New HubSpot Deal
      Deal Name: "{company || contactName} - CBPS Compliance"
      Deal Stage: L0 (Lead Created)
      Amount: {calculated from squareFootage * $0.15}
      Associated Contact: {contact from previous step}
      Properties:
        - building_count: {numberOfBuildings}
        - total_square_footage: {squareFootage}
        - building_types: {buildingType}
        - lead_source: "Calculator Form"
        - form_submission_date: {timestamp}
        - utm_source: {utm_source}
        - utm_campaign: {utm_campaign}
        - next_action: "Schedule consultation"

↓

Action: Assign Deal Owner Based on Building Count
  Formatter: Text > Extract Number
    Input: {numberOfBuildings}
    Pattern: Extract first number
    Examples: "6-10" → 6, "11+" → 11, "3" → 3

  Paths:
    Path 1: If building_count >= 3
      Action: Update Deal Owner
        Owner: Kevin (ID: find in HubSpot)

    Path 2: If building_count <= 2
      Action: Update Deal Owner
        Owner: Aaron (ID: find in HubSpot)

    Path 3: If building_count is empty/invalid
      Action: Update Deal Owner
        Owner: Unassigned

      Action: Create Task
        Assigned to: Sales Team
        Task: "Qualify building count for {contactName}"
        Due: Today

↓

Action: Send Internal Notification
  Tool: Slack or Email
  Message: "🆕 New L0 Lead: {contactName} - {numberOfBuildings} buildings"
  Include: Link to HubSpot deal

↓

Action: Send Auto-Responder Email (Optional)
  To: {email}
  Subject: "Your CBPS Compliance Analysis"
  Body:
    - Thank you for using the calculator
    - Link to schedule consultation
    - PDF summary of their results
```

**Custom HubSpot Properties to Create**:

In HubSpot Settings → Properties → Deals:
- `building_count` (Number)
- `total_square_footage` (Number)
- `building_types` (Text)
- `number_of_buildings_raw` (Text - stores "6-10", "11+")
- `form_submission_date` (Date)
- `form_submission_count` (Number)
- `next_action` (Dropdown: "Schedule consultation", "Follow up", etc.)

#### Task 2.3: Set Up HubSpot Meeting Webhook

**In HubSpot**:

1. Navigate to: Settings → Integrations → Webhooks
2. Create new webhook subscription
3. Configuration:
   - **Event**: `meetings.meeting.created`
   - **Target URL**: `https://hooks.zapier.com/hooks/catch/885017/NEW_WEBHOOK_ID/` (create new Zapier webhook)
   - **Payload**: Include all meeting properties

**Webhook Payload Example**:
```json
{
  "eventType": "meetings.meeting.created",
  "occurredAt": "2025-01-28T10:30:00.000Z",
  "objectId": 12345,
  "properties": {
    "hs_meeting_title": "CBPS Consultation",
    "hs_meeting_start_time": "2025-02-01T14:00:00Z",
    "hs_attendee_emails": "john@company.com"
  }
}
```

**Alternative**: Use native HubSpot → Zapier integration trigger "New Meeting Booked"

#### Task 2.4: Build L0 → L1 Promotion Workflow

**New Zapier Workflow (Meeting Booked)**:

```
Trigger: Webhook Catch Hook (HubSpot Meeting Booked)
  OR
Trigger: HubSpot - New Meeting Booked

↓

Action: Extract Attendee Email
  Email from: properties.hs_attendee_emails
  OR contact association

↓

Action: Find HubSpot Contact
  Search by: Email

↓

Action: Find Associated Open Deal
  Search by: Associated Contact
  Filter: Deal Stage = "L0"
  Sort: Most recent

↓

Paths:

  Path A: If L0 Deal Found
    Action: Update Deal Stage
      Deal Stage: L0 → L1 (Meeting Scheduled)
      Properties:
        - meeting_scheduled_date: {timestamp}
        - meeting_date: {meeting start time}
        - last_activity: {timestamp}
        - closedate: {30 days from now}

    Action: Re-assign Deal Owner (if needed)
      Check: Does current owner match building count rule?
      If not: Re-assign based on building_count

    Action: Add Deal Note
      Note: "✅ Meeting scheduled for {meeting_date}"

    Action: Send Email to Assigned Rep
      To: {deal owner email}
      Subject: "New L1 Meeting: {contact name}"
      Body:
        - Meeting time
        - Contact details
        - Building count: {building_count}
        - Link to deal
        - Pre-call research checklist

    Action: Create HubSpot Task
      Assigned to: {deal owner}
      Task: "Prepare for {contact name} CBPS consultation"
      Due: 1 day before meeting
      Description: Review building details and compliance requirements

    Action: Send Confirmation Email to Lead (Optional)
      To: {contact email}
      Subject: "Confirmed: Your CBPS Consultation"
      Body:
        - Meeting details
        - Calendar invite
        - What to prepare
        - Link to reschedule

  Path B: If No L0 Deal Found
    Action: Create New Deal at L1
      (Catch leads who booked directly without form)
      Deal Stage: L1 (Meeting Scheduled)
      Assign owner based on building count (if available)

    Action: Add Note
      Note: "⚠️ Meeting scheduled without form submission"

    Action: Create Task
      Task: "Collect qualification data before call"
      Assigned to: {meeting owner}
```

#### Task 2.5: Build Follow-up Automation for Non-Schedulers

**Zapier Workflow (Delayed Follow-up)**:

```
Trigger: Catch Webhook (Same as form submission - 885017/uhzbn5c)

↓

Delay: 1 hour

↓

Action: Find HubSpot Deal
  Search by: Contact Email
  Filter: Deal Stage = "L0"

↓

Filter: Only Continue If Still L0
  Condition: Deal Stage = "L0"
  (If deal is L1, they already scheduled - stop here)

↓

Action: Send Reminder Email
  To: {contact email}
  Subject: "Don't forget to schedule your free CBPS consultation"
  Body:
    - Remind them they completed the calculator
    - Show key results (penalty risk, estimated cost)
    - Direct calendar booking link
    - "Schedule in 2 minutes" CTA

↓

Action: Create Follow-up Task
  Assigned to: SDR team or deal owner
  Task: "Follow up with {contact name} - completed form but didn't schedule"
  Due: Same day
  Priority: Medium

↓

Delay: 24 hours

↓

Filter: Only Continue If Still L0

↓

Action: Send Second Reminder Email
  Subject: "Quick question about your CBPS compliance"
  Body:
    - More casual tone
    - Ask if they have questions
    - Offer to send more info
    - Alternative: "Reply to this email" CTA

↓

Action: Update Deal Property
  Property: lead_status = "Nurture"
  Add to workflow: Add to nurture email sequence
```

**Alternative**: Use HubSpot Workflows instead of Zapier delays (more reliable)

**HubSpot Workflow Setup**:
1. Trigger: Deal created with stage = L0
2. Delay: 1 hour
3. If/Then Branch: Check if deal stage is still L0
4. If YES: Send email + create task
5. Delay: 24 hours
6. If/Then Branch: Check if deal stage is still L0
7. If YES: Send second email + add to nurture sequence

---

### Phase 3: Testing & Validation
**Timeline**: 1-2 days
**Complexity**: Low

#### Task 3.1: End-to-End Testing

**Test Scenarios**:

**Scenario 1: Happy Path (3+ Buildings)**
1. Fill out calculator form with:
   - numberOfBuildings: "6-10"
   - All other required fields
2. Submit form
3. Verify:
   - ✅ Redirected to HubSpot calendar
   - ✅ Contact data pre-filled
   - ✅ L0 deal created in HubSpot
   - ✅ Deal assigned to Kevin
4. Book meeting on HubSpot calendar
5. Verify:
   - ✅ Deal stage updates to L1
   - ✅ Kevin receives email notification
   - ✅ Task created for Kevin
   - ✅ Lead receives confirmation email

**Scenario 2: Happy Path (1-2 Buildings)**
1. Fill out calculator form with:
   - numberOfBuildings: "2"
2. Submit and book meeting
3. Verify:
   - ✅ Deal assigned to Aaron (not Kevin)
   - ✅ L1 promotion works

**Scenario 3: Skip Booking**
1. Fill out calculator form
2. Click "Skip for now" on redirect prompt
3. Wait 1 hour
4. Verify:
   - ✅ Reminder email received
   - ✅ Deal still at L0
   - ✅ SDR task created

**Scenario 4: Duplicate Submission**
1. Fill out form
2. Submit
3. Go back and submit same email again
4. Verify:
   - ✅ No duplicate deal created
   - ✅ Existing deal updated
   - ✅ Note added to timeline

**Scenario 5: Direct Booking (No Form)**
1. User lands on HubSpot calendar directly (bookmark, etc.)
2. Books meeting
3. Verify:
   - ✅ L1 deal created
   - ✅ Note added: "No form submission"
   - ✅ Task created to qualify before call

#### Task 3.2: Load Testing

**Tools**: Zapier Task History, HubSpot API logs

**Test Cases**:
- Submit 10 forms in quick succession
- Verify all reach Zapier
- Check for rate limits
- Ensure no dropped submissions

#### Task 3.3: Error Handling

**Test**:
- Invalid email format
- Missing required fields
- Zapier webhook timeout
- HubSpot API failure

**Verify**:
- User sees helpful error message
- Failed submissions logged
- Retry mechanism works
- Alert sent to admin

---

### Phase 4: Monitoring & Optimization
**Timeline**: Ongoing
**Complexity**: Low

#### Task 4.1: Set Up Dashboards

**HubSpot Dashboard**:
- L0 deal count (by day/week)
- L0 → L1 conversion rate
- Average time from L0 to L1
- Deal distribution (Kevin vs Aaron)
- Form submission → booking rate

**Zapier Dashboard**:
- Webhook success rate
- Failed tasks (need attention)
- Average execution time
- Error patterns

**GTM/Analytics**:
- Form submission rate
- Calendar redirect rate
- Bounce rate on redirect
- Time to booking

#### Task 4.2: Create Alerts

**Slack Alerts**:
- 🔴 Zapier task failed (immediate)
- ⚠️ L0 deal > 48 hours old (daily)
- ⚠️ Form submitted but no L0 deal created (immediate)
- 📊 Daily summary: X new leads, Y meetings booked

**Email Alerts** (to Dylan/Anthony):
- Weekly summary report
- Month-over-month metrics
- Conversion funnel breakdown

#### Task 4.3: A/B Testing Plan

**Test 1: Redirect Timing**
- Variant A: Immediate redirect (2 seconds)
- Variant B: Show results, then prompt (5 seconds)
- Metric: Booking completion rate

**Test 2: Redirect Copy**
- Variant A: "Redirecting you to schedule..."
- Variant B: "Claim your free consultation..."
- Metric: Click-through rate

**Test 3: Follow-up Timing**
- Variant A: 1 hour + 24 hour emails
- Variant B: 30 min + 4 hour + 24 hour emails
- Metric: L0 → L1 conversion rate

---

## Implementation Timeline

### Week 1: Frontend + Basic Backend
- **Day 1-2**: Add numberOfBuildings field to forms
- **Day 2-3**: Implement auto-redirect to calendar
- **Day 3-4**: Audit existing Zapier workflow
- **Day 4-5**: Update Zapier for L0 deal creation with assignment

### Week 2: Backend Automation
- **Day 1-2**: Set up HubSpot meeting webhook
- **Day 2-3**: Build L0 → L1 promotion workflow
- **Day 3-4**: Build follow-up automation
- **Day 4-5**: End-to-end testing

### Week 3: Polish + Launch
- **Day 1-2**: Fix bugs from testing
- **Day 2-3**: Set up monitoring & alerts
- **Day 3-4**: Soft launch (test with real traffic)
- **Day 4-5**: Full launch + documentation

---

## Success Metrics

**Primary KPIs**:
- ✅ **L0 → L1 Conversion Rate**: Target >60% (currently ~0% automated)
- ✅ **Form → Booking Rate**: Target >40%
- ✅ **Time from Form to L1**: Target <24 hours
- ✅ **Deal Assignment Accuracy**: Target 100%

**Secondary KPIs**:
- Lead response time (should approach 0 for automated L1s)
- Dylan's manual intervention rate (should approach 0%)
- Form abandonment rate at numberOfBuildings field
- Calendar booking completion rate

---

## Risk Mitigation

### Risk 1: Users Don't Book Meeting
**Mitigation**:
- Make redirect automatic (not optional)
- Show compelling pre-booking prompt
- Emphasize "Free" and "30 minutes"
- Add urgency: "Limited slots available"
- Follow-up automation catches stragglers

### Risk 2: HubSpot Webhook Fails
**Mitigation**:
- Set up fallback: Daily batch job checks L0 deals for associated meetings
- Alert if L0 deal has meeting but stage not updated
- Manual backup: Weekly audit of L0 deals

### Risk 3: Wrong Assignment (Kevin vs Aaron)
**Mitigation**:
- Add validation: If building count = null, assign to "Unassigned"
- Create task: "Qualify building count"
- Weekly report: Assignment distribution audit

### Risk 4: Zapier Rate Limits
**Mitigation**:
- Monitor task usage
- Upgrade Zapier plan if needed
- Consider n8n for high-volume automation

### Risk 5: Users Skip "Number of Buildings"
**Mitigation**:
- Make field required
- Add helper text: "This helps us assign the right expert"
- Validation error if skipped

---

## Open Questions for Anthony/Dylan

1. **Calendar Pre-fill**: Do we have API access to HubSpot to truly pre-fill meeting form fields, or are we just appending URL params?

2. **Kevin vs Aaron**: Confirm HubSpot user IDs or emails for automatic assignment.

3. **Building Count Edge Case**: What happens if user selects "6-10 buildings"? Assign to Kevin (treat as ≥3)? **Recommendation**: Yes, route to Kevin.

4. **Follow-up Timing**: 1 hour too soon? Too aggressive? **Recommendation**: Start with 2 hours, A/B test.

5. **Meeting Type**: Should we use different calendars for Kevin vs Aaron? Or keep single dheppner calendar and reassign after?

6. **L1 Definition**: Is L1 = "Meeting Scheduled" or "Meeting Attended"? **Recommendation**: Scheduled (can add L2 for "Meeting Held").

7. **Zapier vs n8n**: Do you prefer Zapier (existing) or migrate to n8n (more control)? **Recommendation**: Stay with Zapier for now, migrate if needed.

8. **Results Page**: Should users see their compliance results before booking, or only after? **Recommendation**: Show results + auto-prompt. A/B test.

---

## Next Steps

**Immediate Actions**:

1. ✅ **Review this plan** with Anthony/Dylan
2. ✅ **Get HubSpot admin access** (create custom properties)
3. ✅ **Get Zapier admin access** (audit existing workflow)
4. ✅ **Confirm Kevin & Aaron's HubSpot user info**
5. ✅ **Decide on redirect approach** (immediate vs show results first)

**Then**:

6. 🚀 **Start Phase 1**: Add numberOfBuildings field (1 day)
7. 🚀 **Start Phase 2**: Update Zapier workflows (2-3 days)
8. 🚀 **Test everything** (1-2 days)
9. 🚀 **Launch** 🎉

---

## Appendix: Code Snippets

### A. Helper Function: Parse Building Count

```typescript
// lib/utils/building-count.ts
export function parseNumberOfBuildings(value: string): number {
  // "1" → 1
  // "2" → 2
  // "6-10" → 8 (midpoint)
  // "11+" → 11

  if (!value) return 0;

  // Direct number
  if (/^\d+$/.test(value)) {
    return parseInt(value, 10);
  }

  // Range like "6-10"
  const rangeMatch = value.match(/^(\d+)-(\d+)$/);
  if (rangeMatch) {
    const low = parseInt(rangeMatch[1], 10);
    const high = parseInt(rangeMatch[2], 10);
    return Math.floor((low + high) / 2);
  }

  // "11+"
  const plusMatch = value.match(/^(\d+)\+$/);
  if (plusMatch) {
    return parseInt(plusMatch[1], 10);
  }

  return 0;
}

export function shouldAssignToKevin(numberOfBuildings: string): boolean {
  const count = parseNumberOfBuildings(numberOfBuildings);
  return count >= 3;
}
```

### B. Zapier Code Step: Assign Owner

```javascript
// In Zapier: Code by Zapier (JavaScript)
const numberOfBuildings = inputData.numberOfBuildings;

// Parse building count
let count = 0;
if (/^\d+$/.test(numberOfBuildings)) {
  count = parseInt(numberOfBuildings, 10);
} else if (numberOfBuildings.includes('-')) {
  const parts = numberOfBuildings.split('-');
  count = Math.floor((parseInt(parts[0]) + parseInt(parts[1])) / 2);
} else if (numberOfBuildings.includes('+')) {
  count = parseInt(numberOfBuildings.replace('+', ''), 10);
}

// Assign owner
let ownerId, ownerEmail, ownerName;
if (count >= 3) {
  ownerId = '12345678'; // Kevin's HubSpot user ID
  ownerEmail = 'kevin@example.com';
  ownerName = 'Kevin';
} else if (count >= 1) {
  ownerId = '87654321'; // Aaron's HubSpot user ID
  ownerEmail = 'aaron@example.com';
  ownerName = 'Aaron';
} else {
  ownerId = null;
  ownerEmail = null;
  ownerName = 'Unassigned';
}

output = {
  ownerId: ownerId,
  ownerEmail: ownerEmail,
  ownerName: ownerName,
  buildingCount: count
};
```

### C. HubSpot Custom Property API

If you need to create custom properties via API:

```bash
# Create "building_count" property
curl -X POST \
  'https://api.hubapi.com/crm/v3/properties/deals' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "building_count",
    "label": "Number of Buildings",
    "type": "number",
    "fieldType": "number",
    "groupName": "dealinformation"
  }'
```

---

**End of Plan**

*Ready to implement? Start with Phase 1, Task 1.1: Add the numberOfBuildings field.*
