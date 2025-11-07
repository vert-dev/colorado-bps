"use client"

import { Button } from "@/components/ui/button"
import { useHubSpotBooking } from "@/lib/hooks/useHubSpotBooking"

interface BookCallButtonProps {
  size?: "default" | "sm" | "lg" | "icon"
  variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary"
  className?: string
  children?: React.ReactNode
}

export function BookCallButton({ 
  size = "lg", 
  variant = "outline", 
  className = "", 
  children = "Book a Call" 
}: BookCallButtonProps) {
  const { getBookingUrl } = useHubSpotBooking()

  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      asChild
    >
      <a
        href={getBookingUrl()}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    </Button>
  )
}
