import { NextRequest, NextResponse } from "next/server"

// Vertbuild API URL for centralized unsubscribe handling
const VERTBUILD_API_URL = process.env.VERTBUILD_API_URL || "https://vertbuild-api.railway.app"

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token")

    if (!token) {
      return NextResponse.json(
        { valid: false, error: "Missing token" },
        { status: 400 }
      )
    }

    // Proxy to vertbuild API
    const response = await fetch(
      `${VERTBUILD_API_URL}/api/email/unsubscribe/verify?token=${encodeURIComponent(token)}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("Verify token error:", error)
    return NextResponse.json(
      { valid: false, error: "Failed to verify token" },
      { status: 500 }
    )
  }
}
