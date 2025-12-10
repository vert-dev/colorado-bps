"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Mail, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Status = "idle" | "loading" | "verifying" | "success" | "error" | "invalid"

interface TokenInfo {
  valid: boolean
  email?: string
  groupId?: string
  brand?: string
  brandConfig?: {
    name: string
    color: string
  }
  error?: string
}

// Vertbuild API URL - can be overridden via env var
const UNSUBSCRIBE_API_URL = process.env.NEXT_PUBLIC_UNSUBSCRIBE_API_URL || "/api/unsubscribe"

export default function UnsubscribePage() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<Status>("verifying")
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>("")

  // Get token from URL - supports both new token format and legacy base64 format
  const token = searchParams.get("token")
  const legacyEmail = searchParams.get("e")

  useEffect(() => {
    async function verifyToken() {
      // New token format
      if (token) {
        try {
          const response = await fetch(`${UNSUBSCRIBE_API_URL}/verify?token=${encodeURIComponent(token)}`)
          const data = await response.json() as TokenInfo

          if (data.valid && data.email) {
            setTokenInfo(data)
            setStatus("idle")
          } else {
            setErrorMessage(data.error || "Invalid or expired unsubscribe link")
            setStatus("invalid")
          }
        } catch {
          setErrorMessage("Failed to verify unsubscribe link")
          setStatus("invalid")
        }
        return
      }

      // Legacy base64 format (backward compatibility)
      if (legacyEmail) {
        try {
          const decoded = atob(legacyEmail)
          if (decoded.includes("@")) {
            setTokenInfo({
              valid: true,
              email: decoded,
              groupId: process.env.NEXT_PUBLIC_SENDGRID_SUPPRESSION_GROUP_ID || "260189"
            })
            setStatus("idle")
          } else {
            setStatus("invalid")
          }
        } catch {
          setStatus("invalid")
        }
        return
      }

      // No token or email provided
      setStatus("invalid")
    }

    verifyToken()
  }, [token, legacyEmail])

  const handleUnsubscribe = async () => {
    if (!tokenInfo?.email) return

    setStatus("loading")

    try {
      // Use new token-based endpoint if we have a token
      if (token) {
        const response = await fetch(`${UNSUBSCRIBE_API_URL}/process`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        })

        if (response.ok) {
          setStatus("success")
        } else {
          const data = await response.json()
          setErrorMessage(data.error || "Failed to unsubscribe")
          setStatus("error")
        }
      } else {
        // Legacy: call local API with email
        const response = await fetch("/api/unsubscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: tokenInfo.email }),
        })

        if (response.ok) {
          setStatus("success")
        } else {
          const data = await response.json()
          setErrorMessage(data.error || "Failed to unsubscribe")
          setStatus("error")
        }
      }
    } catch {
      setErrorMessage("Network error. Please try again.")
      setStatus("error")
    }
  }

  // Loading/verifying state
  if (status === "verifying") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-colorado-blue-50 to-colorado-blue-100 flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <Loader2 className="w-16 h-16 text-colorado-blue-500 mx-auto mb-4 animate-spin" />
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Verifying Link...</h1>
            <p className="text-slate-600">
              Please wait while we verify your unsubscribe link.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Invalid or missing email parameter
  if (status === "invalid") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-colorado-blue-50 to-colorado-blue-100 flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Invalid Link</h1>
            <p className="text-slate-600 mb-6">
              {errorMessage || "This unsubscribe link is invalid or has expired."}
            </p>
            <Link href="/">
              <Button className="bg-colorado-blue-500 hover:bg-colorado-blue-600">
                Return to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Success state
  if (status === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-colorado-blue-50 to-colorado-blue-100 flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Unsubscribed</h1>
            <p className="text-slate-600 mb-2">
              You have been removed from our mailing list.
            </p>
            <p className="text-sm text-slate-500 mb-6">
              {tokenInfo?.email}
            </p>
            <p className="text-sm text-slate-500 mb-6">
              We're sorry to see you go. If you change your mind, you can always
              reach out to us at info@vertpro.com.
            </p>
            <Link href="/">
              <Button variant="outline" className="bg-transparent">
                Return to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (status === "error") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-colorado-blue-50 to-colorado-blue-100 flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Something Went Wrong</h1>
            <p className="text-slate-600 mb-6">
              {errorMessage}
            </p>
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => setStatus("idle")}
                className="bg-colorado-blue-500 hover:bg-colorado-blue-600"
              >
                Try Again
              </Button>
              <Link href="/">
                <Button variant="outline" className="w-full bg-transparent">
                  Return to Homepage
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Default: Confirmation state
  const brandName = tokenInfo?.brandConfig?.name || "Washington CBPS"

  return (
    <div className="min-h-screen bg-gradient-to-br from-colorado-blue-50 to-colorado-blue-100 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <Mail className="w-16 h-16 text-colorado-blue-500 mx-auto mb-4" />

          <h1 className="text-2xl font-bold text-slate-800 mb-4">
            Confirm Unsubscribe
          </h1>

          <p className="text-slate-600 mb-2">
            Are you sure you want to unsubscribe?
          </p>

          {tokenInfo?.email && (
            <p className="text-sm text-slate-500 mb-6 font-mono bg-slate-50 py-2 px-3 rounded">
              {tokenInfo.email}
            </p>
          )}

          <p className="text-sm text-slate-500 mb-6">
            You will no longer receive emails about {brandName} compliance
            deadlines, early adopter incentives, or building performance updates.
          </p>

          <div className="flex flex-col gap-3">
            <Button
              onClick={handleUnsubscribe}
              disabled={status === "loading" || !tokenInfo?.email}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Yes, Unsubscribe Me"
              )}
            </Button>

            <Link href="/">
              <Button variant="outline" className="w-full bg-transparent">
                No, Keep Me Subscribed
              </Button>
            </Link>
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-4">
          Having trouble? Contact us at info@vertpro.com
        </p>
      </div>
    </div>
  )
}
