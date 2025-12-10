import { NextRequest, NextResponse } from "next/server"

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
const SUPPRESSION_GROUP_ID = process.env.SENDGRID_SUPPRESSION_GROUP_ID || "260189"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      )
    }

    if (!SENDGRID_API_KEY) {
      console.error("SENDGRID_API_KEY not configured")
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      )
    }

    // Add email to SendGrid suppression group
    const response = await fetch(
      `https://api.sendgrid.com/v3/asm/groups/${SUPPRESSION_GROUP_ID}/suppressions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${SENDGRID_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipient_emails: [email.toLowerCase()],
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("SendGrid error:", response.status, errorText)
      return NextResponse.json(
        { error: "Failed to process unsubscribe" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Unsubscribe error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
}
