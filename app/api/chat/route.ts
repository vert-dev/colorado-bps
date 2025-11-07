import { type NextRequest, NextResponse } from "next/server"

const OREGON_BPS_CONTEXT = `You are a helpful Colorado BPS (Building Performance Standard) compliance assistant. You provide accurate, helpful information about:

OREGON BPS OVERVIEW (HB 21-1286, 2021):
- Applies to commercial buildings ≥20,000 sq ft and ALL institutional buildings ≥35,000 sq ft
- Tier 1: Commercial buildings ≥35,000 sq ft (performance-based compliance)
- Tier 2: Commercial 20-35k sq ft + ALL institutional buildings ≥35k sq ft (reporting-only)
- Uses Energy Use Intensity (EUI) benchmarking model, NOT Energy Management Plans

KEY DEADLINES:
- Tier 1 Large (≥100k sq ft): June 2028
- Tier 1 Medium (50-100k sq ft): June 2029
- Tier 1 Small (35-50k sq ft): June 2030
- Tier 2 (reporting-only): July 2028
- Planning should start 2-3 years before deadline for Tier 1 buildings

PENALTIES (TIER 1 ONLY):
- $5,000 base fine + $1.00 per sq ft annually until compliant
- Example: 100,000 sq ft building = $105,000/year in penalties
- Penalties continue every year until EUI target achieved
- Tier 2: NO PENALTIES (reporting-only)

ECAPP & BERI INCENTIVES:
- ECAPP: $2M Oregon state fund for early compliance (2025-2027)
- BERI: $12M federal CERTA program for energy efficiency implementations
- Both are competitive grants - apply early
- Fund energy audits, HVAC upgrades, building envelope improvements

COMPLIANCE MODEL:
- Benchmark building in ENERGY STAR Portfolio Manager (calculate EUI)
- Compare your EUI to Oregon's EUI Target (EUIt) for your building type
- If EUI > EUIt: Complete ASHRAE Level 2 audit + implement improvements
- If EUI ≤ EUIt: Submit compliance documentation, you're done!

COMPLIANCE COSTS:
- Benchmarking: $500-$2,000
- ASHRAE Level 2 audit: $5,000-$25,000
- Energy improvements: $50,000-$500,000+ (highly variable)
- ECAPP/BERI can offset 30-60% of costs

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
    return "Key Colorado BPS deadlines: Tier 1 commercial buildings (≥35k sqft) have deadlines June 2028-2030 based on size. Tier 2 buildings (commercial 20-35k + ALL institutional ≥35k) must report energy data by July 2028 - NO performance targets, NO penalties!"
  }

  if (lowerMessage.includes("incentive") || lowerMessage.includes("grant") || lowerMessage.includes("funding")) {
    return "Colorado BPS incentives: ECAPP ($2M state fund, 2025-2027) provides grants for energy audits and early compliance projects. BERI ($12M federal CERTA) funds major energy efficiency implementations like HVAC upgrades and building envelope improvements. Both are competitive - early applications have the best chance!"
  }

  if (
    lowerMessage.includes("30,000") ||
    lowerMessage.includes("30000") ||
    lowerMessage.includes("sqft") ||
    lowerMessage.includes("sq ft")
  ) {
    const sizeMatch = lowerMessage.match(/(\d+,?\d*)\s*(sqft|sq\s*ft|square\s*feet)/i)
    if (sizeMatch) {
      const size = Number.parseInt(sizeMatch[1].replace(",", ""))
      if (size >= 35000) {
        const deadline = size >= 100000 ? "June 2028" : size >= 50000 ? "June 2029" : "June 2030"
        const penalty = 5000 + size
        return `A ${size.toLocaleString()} sq ft commercial building is Tier 1. You must meet EUI performance targets by ${deadline}. If non-compliant, penalties are $5,000 + $1/sqft = $${penalty.toLocaleString()}/year. Start planning 2-3 years early! ECAPP/BERI grants can offset 30-60% of compliance costs.`
      } else if (size >= 20000) {
        return `A ${size.toLocaleString()} sq ft commercial building is Tier 2. You must benchmark energy use in Portfolio Manager and report to Colorado Energy Office by July 2028. Good news: Tier 2 is reporting-only - NO performance targets, NO penalties!`
      } else {
        return `Buildings under 20,000 sq ft are not covered by Colorado BPS. You're exempt from compliance requirements!`
      }
    }
  }

  if (lowerMessage.includes("cost") || lowerMessage.includes("price") || lowerMessage.includes("how much")) {
    return "Colorado BPS compliance costs: Benchmarking (Tier 2) $500-$2,000. ASHRAE Level 2 audit (Tier 1) $5,000-$25,000. Energy improvements vary widely: $50k-$500k+. However, ECAPP/BERI grants offset 30-60% of costs, and energy savings reduce operating expenses 15-30% annually. Many projects pay for themselves in 3-7 years!"
  }

  if (lowerMessage.includes("penalty") || lowerMessage.includes("penalt") || lowerMessage.includes("fine")) {
    return "Colorado BPS penalties apply to Tier 1 ONLY (commercial ≥35k sqft). Penalty: $5,000 + $1.00/sqft annually until compliant. Example: 100k sqft = $105,000/year, continuing every year until EUI target achieved. Tier 2 has NO penalties - it's reporting-only!"
  }

  if (lowerMessage.includes("tier 2") || lowerMessage.includes("institutional") || lowerMessage.includes("school")) {
    return "Tier 2 in Oregon is reporting-only: Commercial buildings 20-35k sqft + ALL institutional buildings ≥35k sqft (schools, hospitals, government). Deadline: July 2028. Requirements: Benchmark in Portfolio Manager, report energy data to Colorado Energy Office. NO performance targets, NO penalties!"
  }

  if (lowerMessage.includes("eui") || lowerMessage.includes("energy use intensity")) {
    return "EUI (Energy Use Intensity) is your building's energy use in kBtu/sqft/year. EUIt (EUI Target) is Oregon's performance target for your building type. Calculate EUI using 12 months of utility bills in ENERGY STAR Portfolio Manager. If EUI ≤ EUIt, you comply! If EUI > EUIt, you need energy audits + improvements to reduce consumption."
  }

  return null
}

function getVariedFallbackResponse(message: string, conversationHistory: any[]): string {
  const lowerMessage = message.toLowerCase()
  const historyLength = conversationHistory?.length || 0

  // Handle specific company/service questions
  if (lowerMessage.includes("vert") && !lowerMessage.includes("convert")) {
    return "Vert Energy Group is a leading compliance platform company specializing in Colorado BPS requirements. We help building owners navigate the EUI/EUIt performance model and secure ECAPP/BERI funding. What specific aspect of Colorado BPS compliance can I help you understand better?"
  }

  if (lowerMessage.includes("sign") && (lowerMessage.includes("up") || lowerMessage.includes("me"))) {
    return "Great! I'd love to help you get started with Colorado BPS compliance. To provide the most relevant guidance, could you tell me: What's the square footage of your building? Is it commercial or institutional (school, hospital, government)?"
  }

  if (lowerMessage.includes("why") || lowerMessage.includes("huh") || lowerMessage.includes("what")) {
    const responses = [
      "Let me help clarify! Colorado BPS (HB 21-1286) uses an Energy Use Intensity (EUI) performance model. Tier 1 buildings must meet efficiency targets, Tier 2 just reports data. What would you like to know about your building's requirements?",
      "I'm here to guide you through Colorado BPS compliance! The law requires energy benchmarking in Portfolio Manager. Tier 1 has performance targets and penalties, Tier 2 is reporting-only. What's your building type and size?",
      "Good question! Colorado BPS compliance depends on whether you're Tier 1 (commercial ≥35k sqft) or Tier 2 (commercial 20-35k + ALL institutional ≥35k). Which category does your building fall into?",
      "Let me explain! Oregon's Building Performance Standard requires buildings to track energy use. Tier 1 must meet EUI targets by 2028-2030, Tier 2 just reports by July 2028. Which tier applies to you?",
    ]
    return responses[historyLength % responses.length]
  }

  // General fallback responses with variety
  const fallbackResponses = [
    "I specialize in Colorado BPS compliance! I can help you understand deadlines, ECAPP/BERI incentives, EUI/EUIt targets, and requirements. What's your building's square footage and type? That'll help me give you specific guidance.",
    "As your Colorado BPS compliance expert, I'm here to help! The key things most building owners need to know are: compliance deadlines (2028-2030), ECAPP/BERI grants ($14M available), and whether you're Tier 1 (performance) or Tier 2 (reporting). Which interests you most?",
    "Let me guide you through Colorado BPS compliance! Commercial buildings ≥35k sqft have performance requirements, while smaller commercial (20-35k) and ALL institutional buildings just report data. Tell me about your property - what type and size is it?",
    "I'm your Colorado Building Performance Standard assistant! Whether you need help with EUI benchmarking, understanding penalty risks, or securing ECAPP/BERI funding, I've got you covered. What's your main concern?",
    "Great to meet you! I help building owners navigate Oregon's BPS requirements efficiently. Good news: ECAPP ($2M) and BERI ($12M) grants are available NOW for early compliance. What would you like to explore first - your building's tier, deadlines, or potential funding?",
  ]

  return fallbackResponses[historyLength % fallbackResponses.length]
}

export async function POST(request: NextRequest) {
  try {
    console.log("[oregon-bps] API route started")

    const { message, conversationHistory } = await request.json()
    console.log("[oregon-bps] Parsed request body successfully:", {
      message,
      historyLength: conversationHistory?.length,
    })

    if (!message) {
      console.log("[oregon-bps] No message provided")
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const simpleResponse = getSimpleResponse(message)
    if (simpleResponse) {
      console.log("[oregon-bps] Returning simple response for:", message)
      return NextResponse.json({
        response: simpleResponse,
        includeMeetingLink: conversationHistory?.length >= 1,
      })
    }

    console.log("[oregon-bps] Providing varied fallback response for:", message)
    const fallbackResponse = getVariedFallbackResponse(message, conversationHistory)

    return NextResponse.json({
      response: fallbackResponse,
      includeMeetingLink: conversationHistory?.length >= 1,
    })
  } catch (error: any) {
    console.error("[oregon-bps] Top-level API error:", error)
    console.error("[oregon-bps] Error type:", typeof error)
    console.error("[oregon-bps] Error message:", error?.message)
    console.error("[oregon-bps] Error stack:", error?.stack)

    return NextResponse.json(
      {
        error: "Failed to get response from AI assistant",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
