import { NextRequest, NextResponse } from "next/server"

// Vertbuild API URL for centralized unsubscribe handling
const VERTBUILD_API_URL = process.env.VERTBUILD_API_URL || "https://vertbuild-api.railway.app"

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Missing token" },
        { status: 400 }
      )
    }

    // Proxy to vertbuild API
    const response = await fetch(
      `${VERTBUILD_API_URL}/api/email/unsubscribe/process`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }
    )

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("Process unsubscribe error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to process unsubscribe" },
      { status: 500 }
    )
  }
}
