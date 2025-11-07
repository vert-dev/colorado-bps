"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, X } from "lucide-react";

interface CalendarRedirectOverlayProps {
  isOpen: boolean;
  calendarUrl: string;
  onSkip: () => void;
  contactName?: string;
}

/**
 * Calendar Redirect Overlay Component
 *
 * Displays a 3-second countdown before automatically redirecting to HubSpot calendar.
 * Provides a "Skip for now" option for users who want to schedule later.
 *
 * Used after form submission to guide users through the scheduling flow.
 */
export function CalendarRedirectOverlay({
  isOpen,
  calendarUrl,
  onSkip,
  contactName,
}: CalendarRedirectOverlayProps) {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(3); // Reset countdown when closed
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Redirect to calendar
          window.location.href = calendarUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, calendarUrl]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4 relative animate-in fade-in zoom-in duration-300">
        <Button
          variant="ghost"
          size="sm"
          onClick={onSkip}
          className="absolute top-2 right-2 hover:bg-gray-100"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="text-center space-y-6">
          {/* Icon */}
          <div className="bg-colorado-blue-100 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
            <Calendar className="h-10 w-10 text-colorado-blue-500" />
          </div>

          {/* Heading */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {contactName ? `Great, ${contactName.split(" ")[0]}!` : "Results Calculated!"}
            </h3>
            <p className="text-gray-600 text-lg">
              Let's schedule your free CBPS consultation
            </p>
          </div>

          {/* Countdown */}
          <div>
            <div className="text-7xl font-bold text-colorado-blue-500 mb-2">
              {countdown}
            </div>
            <p className="text-sm text-gray-500">
              Redirecting to calendar...
            </p>
          </div>

          {/* What to Expect */}
          <div className="bg-gray-50 rounded-lg p-4 text-left">
            <p className="text-sm font-semibold text-gray-800 mb-2">
              In your 30-minute consultation:
            </p>
            <ul className="text-sm text-gray-700 space-y-1.5">
              <li>✓ Personalized compliance roadmap</li>
              <li>✓ Exact cost estimates & incentives</li>
              <li>✓ Timeline planning for your deadlines</li>
              <li>✓ Q&A about your specific building</li>
            </ul>
          </div>

          {/* Skip Button */}
          <Button
            variant="outline"
            onClick={onSkip}
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Skip for now - I'll schedule later
          </Button>

          {/* Fine Print */}
          <p className="text-xs text-gray-500">
            Your information has been saved. You'll receive an email with your results.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CalendarRedirectOverlay;
