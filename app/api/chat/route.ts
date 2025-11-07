import { type NextRequest, NextResponse } from "next/server"

const COLORADO_BPS_CONTEXT = `You are a helpful Colorado BPS (Building Performance Standard) compliance assistant. You provide accurate, helpful information about:

COLORADO BPS OVERVIEW (HB 21-1286, 2021):
- Applies to ALL buildings ≥50,000 sq ft (commercial, residential, institutional)
- Single threshold - no tier system, all covered buildings have same requirements
- Choose 1 of 3 compliance pathways: Energy Efficiency, GHG Reduction, or Standard % Reduction
- Administered by Colorado Energy Office (CEO)

KEY DEADLINES:
- August 1 annually: Benchmarking report + $100 fee (penalties: $500 first, $2,000 subsequent)
- December 31, 2025: Complete energy audit, select pathway, file compliance plan (CRITICAL)
- December 31, 2026: Interim target (7% reduction from 2021 baseline)
- June 1, 2027: Monthly interim penalties begin if non-compliant
- December 31, 2030: Final target (20% reduction from 2021 baseline)
- June 1, 2031: Monthly final penalties begin if non-compliant

PENALTIES:
- Benchmarking penalties: $500 (first failure), $2,000 (subsequent failures)
- Performance penalties: Monthly (not annual) based on degree of non-compliance
- Penalty amounts TBD by Colorado Energy Office
- Penalties continue monthly until compliance achieved

THREE COMPLIANCE PATHWAYS:
1. Energy Efficiency Pathway: Reduce Site EUI by 7% (2026) and 20% (2030)
2. GHG Reduction Pathway: Reduce greenhouse gas emissions by 7% (2026) and 20% (2030)
3. Standard % Reduction Pathway: Fixed reductions of 13% (2026-2029) and 29% (2030-2050) - only if baseline >29% above target

COMPLIANCE MODEL:
- Set up Energy Star Portfolio Manager account
- Register with BEAM Portal (https://co.beam-portal.org/)
- Submit annual benchmarking by August 1 ($100 fee)
- Complete energy audit by December 31, 2025
- Select compliance pathway by December 31, 2025
- File compliance plan with Colorado Energy Office
- Meet interim and final targets

COMPLIANCE COSTS:
- Annual benchmarking: $100 fee + $500-$2,000 setup/reporting
- Energy audit: $5,000-$25,000
- Energy improvements: $50,000-$500,000+ (highly variable)
- Pathway selection impacts implementation costs

Always be helpful, accurate, and after providing information, suggest scheduling a consultation with Colorado BPS experts for personalized guidance.`

function getSimpleResponse(message: string): string | null {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("date") || lowerMessage.includes("today")) {
    const currentDate = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    return `Today is ${currentDate}. How can I help you with Colorado BPS compliance?`
  }

  if (lowerMessage.includes("deadline")) {
    return "Key Colorado BPS deadlines: December 31, 2025 (energy audit + pathway selection - CRITICAL), December 31, 2026 (interim 7% target), December 31, 2030 (final 20% target). Annual benchmarking due August 1 each year with $100 fee. Monthly penalties begin June 2027 (interim) and June 2031 (final) if non-compliant!"
  }

  if (lowerMessage.includes("pathway") || lowerMessage.includes("pathways")) {
    return "Colorado BPS offers 3 compliance pathways: (1) Energy Efficiency - reduce Site EUI by 7%/20%, (2) GHG Reduction - reduce emissions by 7%/20%, (3) Standard % Reduction - fixed 13%/29% reductions (only if baseline >29% above target). You must select your pathway by December 31, 2025!"
  }

  if (
    lowerMessage.includes("50,000") ||
    lowerMessage.includes("50000") ||
    lowerMessage.includes("sqft") ||
    lowerMessage.includes("sq ft")
  ) {
    const sizeMatch = lowerMessage.match(/(\d+,?\d*)\s*(sqft|sq\s*ft|square\s*feet)/i)
    if (sizeMatch) {
      const size = Number.parseInt(sizeMatch[1].replace(",", ""))
      if (size >= 50000) {
        return `A ${size.toLocaleString()} sq ft building IS covered by Colorado BPS. All buildings ≥50k sqft have the same requirements: annual benchmarking (Aug 1), energy audit by Dec 31 2025, pathway selection by Dec 31 2025, interim target (7%) by Dec 31 2026, final target (20%) by Dec 31 2030. Monthly penalties if non-compliant!`
      } else {
        return `Buildings under 50,000 sq ft are not covered by Colorado BPS. You're exempt from compliance requirements!`
      }
    }
  }

  if (lowerMessage.includes("cost") || lowerMessage.includes("price") || lowerMessage.includes("how much")) {
    return "Colorado BPS compliance costs: Annual benchmarking $100 fee + $500-$2k setup. Energy audit $5k-$25k. Energy improvements vary widely: $50k-$500k+. Pathway selection affects costs - Energy Efficiency and GHG pathways may require different investments. Early planning saves money!"
  }

  if (lowerMessage.includes("penalty") || lowerMessage.includes("penalt") || lowerMessage.includes("fine")) {
    return "Colorado BPS penalties: Benchmarking failures = $500 (first), $2,000 (subsequent). Performance penalties are MONTHLY (not annual) starting June 2027 (interim) and June 2031 (final). Amounts TBD by Colorado Energy Office based on degree of non-compliance. Penalties continue monthly until compliance achieved!"
  }

  if (lowerMessage.includes("audit") || lowerMessage.includes("energy audit")) {
    return "Energy audits are required by December 31, 2025 for all covered buildings (≥50k sqft). Cost: $5,000-$25,000. The audit determines your baseline energy use and helps you select the best compliance pathway. Start early - auditors will be booked in late 2025!"
  }

  if (lowerMessage.includes("beam") || lowerMessage.includes("portal")) {
    return "The BEAM Portal (https://co.beam-portal.org/) is Colorado's Building Owner Portal for all BPS submissions. Register now to: submit annual benchmarking reports, file compliance plans, report interim/final target achievement. You'll also pay your $100 annual benchmarking fee through BEAM."
  }

  return null
}

function getVariedFallbackResponse(message: string, conversationHistory: any[]): string {
  const lowerMessage = message.toLowerCase()
  const historyLength = conversationHistory?.length || 0

  // Handle specific company/service questions
  if (lowerMessage.includes("vert") && !lowerMessage.includes("convert")) {
    return "Vert Energy Group is a leading compliance platform company specializing in Colorado BPS requirements. We help building owners navigate pathway selection, complete energy audits, and meet the December 2025 critical deadline. What specific aspect of Colorado BPS compliance can I help you understand better?"
  }

  if (lowerMessage.includes("sign") && (lowerMessage.includes("up") || lowerMessage.includes("me"))) {
    return "Great! I'd love to help you get started with Colorado BPS compliance. To provide the most relevant guidance, could you tell me: What's the square footage of your building? What type of building is it (commercial, residential, institutional)?"
  }

  if (lowerMessage.includes("why") || lowerMessage.includes("huh") || lowerMessage.includes("what")) {
    const responses = [
      "Let me help clarify! Colorado BPS (HB 21-1286) requires buildings ≥50k sqft to reduce energy use by 7% (2026) and 20% (2030). You choose 1 of 3 compliance pathways. The critical first deadline is December 31, 2025 for energy audit + pathway selection. What would you like to know?",
      "I'm here to guide you through Colorado BPS compliance! The law requires annual benchmarking ($100 fee) and performance targets (7% by 2026, 20% by 2030). Monthly penalties start June 2027 if you miss the interim target. What's your building size?",
      "Good question! Colorado BPS applies to ALL buildings ≥50k sqft - no tier system. You must complete an energy audit, select a compliance pathway (Energy Efficiency, GHG Reduction, or Standard %), and file a plan by December 31, 2025. Which aspect interests you?",
      "Let me explain! Colorado's Building Performance Standard requires buildings ≥50k sqft to reduce energy use or emissions. First step: energy audit by Dec 31, 2025. Then choose your pathway and start working toward the 7% interim target. What's your building type and size?",
    ]
    return responses[historyLength % responses.length]
  }

  // General fallback responses with variety
  const fallbackResponses = [
    "I specialize in Colorado BPS compliance! I can help you understand the December 2025 deadline, 3 compliance pathways, benchmarking requirements, and penalties. What's your building's square footage? That'll help me give you specific guidance.",
    "As your Colorado BPS compliance expert, I'm here to help! The key things most building owners need to know are: December 31, 2025 critical deadline (audit + pathway), annual benchmarking ($100 fee), and monthly penalties starting June 2027. Which interests you most?",
    "Let me guide you through Colorado BPS compliance! Buildings ≥50k sqft must choose 1 of 3 pathways: Energy Efficiency, GHG Reduction, or Standard % Reduction. Tell me about your property - what type and size is it?",
    "I'm your Colorado Building Performance Standard assistant! Whether you need help with pathway selection, understanding penalty risks, or meeting the December 2025 deadline, I've got you covered. What's your main concern?",
    "Great to meet you! I help building owners navigate Colorado's BPS requirements efficiently. The critical first step is completing your energy audit and selecting a pathway by December 31, 2025. What would you like to explore first - your building's coverage, deadlines, or pathways?",
  ]

  return fallbackResponses[historyLength % fallbackResponses.length]
}

export async function POST(request: NextRequest) {
  try {
    console.log("[colorado-bps] API route started")

    const { message, conversationHistory } = await request.json()
    console.log("[colorado-bps] Parsed request body successfully:", {
      message,
      historyLength: conversationHistory?.length,
    })

    if (!message) {
      console.log("[colorado-bps] No message provided in request")
      return NextResponse.json({ error: "Message is required", details: "No message provided" }, { status: 400 })
    }

    console.log("[colorado-bps] Checking for simple response match")
    const simpleResponse = getSimpleResponse(message)
    if (simpleResponse) {
      console.log("[colorado-bps] Simple response match found, returning immediately")
      return NextResponse.json({
        response: simpleResponse,
        includeMeetingLink: false,
      })
    }

    console.log("[colorado-bps] No simple response, using varied fallback")
    const fallbackResponse = getVariedFallbackResponse(message, conversationHistory)

    return NextResponse.json({
      response: fallbackResponse,
      includeMeetingLink: false,
    })
  } catch (error) {
    console.error("[colorado-bps] Error in API route:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    )
  }
}
