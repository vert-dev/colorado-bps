import { NextRequest, NextResponse } from "next/server"

// Legacy endpoint for backward compatibility with ?e= base64 links
// Proxies to vertbuild backend for centralized SendGrid management

const VERTBUILD_API_URL = process.env.VERTBUILD_API_URL || "https://vertbuild-monorepobackend-production-7b69.up.railway.app"
const SUPPRESSION_GROUP_ID = process.env.SENDGRID_SUPPRESSION_GROUP_ID || "260189" // Default to WA group, override in env

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 })
    }

    // Proxy to vertbuild backend - use direct suppression endpoint
    const response = await fetch(
      `${VERTBUILD_API_URL}/api/email/unsubscribe/add-suppression`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.toLowerCase(),
          groupId: SUPPRESSION_GROUP_ID
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error("Vertbuild unsubscribe error:", response.status, errorData)
      return NextResponse.json({ error: "Failed to process unsubscribe" }, { status: 500 })
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Unsubscribe error:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
