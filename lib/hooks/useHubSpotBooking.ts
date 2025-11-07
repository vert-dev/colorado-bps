"use client"

import { useEffect, useState, useCallback } from 'react'
import { appendUTMParams, captureAndStoreUTMParams, getStoredUTMParams, type UTMParams } from '@/lib/utm-utils'
import type { FormData } from '@/lib/cbps-calculator'

/**
 * HubSpot calendar URLs for routing
 */
const CALENDAR_URLS = {
  // Dylan (dheppner) - for 1-2 buildings
  dylan: 'https://meetings.hubspot.com/dheppner/co-state-compliance-review',
  // Kevin - for 3+ buildings (Colorado BPS)
  kevin: 'https://meetings.hubspot.com/kevin-sullivan2/colorado-bps-compliance-review',
}

/**
 * Default Colorado BPS booking URL
 */
const HUBSPOT_BOOKING_URL = 'https://meetings.hubspot.com/kevin-sullivan2/colorado-bps-compliance-review'

/**
 * Custom hook for managing HubSpot booking links with UTM parameters
 */
export function useHubSpotBooking() {
  const [utmParams, setUtmParams] = useState<UTMParams>({})

  useEffect(() => {
    // Capture UTM parameters from URL on mount
    const captured = captureAndStoreUTMParams()
    
    // If no new params captured, try to get stored ones
    const params = Object.keys(captured).length > 0 ? captured : getStoredUTMParams()
    
    setUtmParams(params)
  }, [])

  /**
   * Get the HubSpot booking URL with UTM parameters appended
   */
  const getBookingUrl = useCallback((additionalParams?: Record<string, string>): string => {
    let url = HUBSPOT_BOOKING_URL
    
    // Append UTM parameters
    if (Object.keys(utmParams).length > 0) {
      url = appendUTMParams(url, utmParams)
    }
    
    // Append any additional parameters (like uuid)
    if (additionalParams) {
      try {
        const urlObj = new URL(url)
        Object.entries(additionalParams).forEach(([key, value]) => {
          if (value) {
            urlObj.searchParams.set(key, value)
          }
        })
        url = urlObj.toString()
      } catch (error) {
        console.error('Error appending additional params:', error)
      }
    }
    
    return url
  }, [utmParams])

  /**
   * Open the HubSpot booking link in a new tab with UTM parameters
   */
  const openBooking = useCallback((additionalParams?: Record<string, string>) => {
    const url = getBookingUrl(additionalParams)
    window.open(url, '_blank', 'noopener,noreferrer')
  }, [getBookingUrl])

  return {
    utmParams,
    getBookingUrl,
    openBooking,
  }
}

/**
 * Build a pre-filled HubSpot booking URL with form data
 * Routes to appropriate calendar based on number of buildings:
 * - 1-2 buildings: Dylan (dheppner)
 * - 3+ buildings: Kevin
 *
 * @param formData - Form data from calculator submission
 * @returns Pre-filled booking URL with contact info and building data
 */
export function buildPrefilledBookingUrl(formData: FormData): string {
  // Determine which calendar to use based on numberOfBuildings
  const buildingCount = parseInt(formData.numberOfBuildings, 10);
  const baseUrl = buildingCount >= 3 ? CALENDAR_URLS.kevin : CALENDAR_URLS.dylan;

  const url = new URL(baseUrl);

  // Contact info - HubSpot standard fields
  const [firstName, ...lastNameParts] = formData.contactName.split(" ");
  url.searchParams.append("firstName", firstName || "");
  url.searchParams.append("lastName", lastNameParts.join(" ") || "");
  url.searchParams.append("email", formData.email);
  url.searchParams.append("phone", formData.phone);

  // Building context - Custom fields (must be configured in HubSpot)
  url.searchParams.append("portfolio_size", formData.numberOfBuildings);
  url.searchParams.append("total_sqft", formData.squareFootage);
  url.searchParams.append("building_type", formData.buildingType);
  url.searchParams.append("building_address", formData.buildingAddress);
  url.searchParams.append("year_built", formData.yearBuilt);
  url.searchParams.append("energy_mgmt", formData.currentEnergyMgmt);

  // Company info
  if (formData.company) {
    url.searchParams.append("company", formData.company);
  }

  // Source tracking
  url.searchParams.append("qualification_source", "calculator_form");
  url.searchParams.append("submission_timestamp", new Date().toISOString());

  // UTM params (preserve attribution)
  const utmParams = getStoredUTMParams();
  Object.entries(utmParams).forEach(([key, value]) => {
    if (value) {
      url.searchParams.append(key, value);
    }
  });

  return url.toString();
}
