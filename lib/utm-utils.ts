/**
 * UTM Parameter Utilities
 * Handles capturing and managing UTM parameters for HubSpot tracking
 */

export interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

/**
 * Extracts UTM parameters from a URL search string
 */
export function extractUTMParams(searchString: string): UTMParams {
  const params = new URLSearchParams(searchString)
  const utmParams: UTMParams = {}

  const utmKeys: (keyof UTMParams)[] = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
  ]

  utmKeys.forEach((key) => {
    const value = params.get(key)
    if (value) {
      utmParams[key] = value
    }
  })

  return utmParams
}

/**
 * Appends UTM parameters to a URL
 */
export function appendUTMParams(baseUrl: string, utmParams: UTMParams): string {
  if (!baseUrl || Object.keys(utmParams).length === 0) {
    return baseUrl
  }

  try {
    const url = new URL(baseUrl)
    
    Object.entries(utmParams).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value)
      }
    })

    return url.toString()
  } catch (error) {
    console.error('Error appending UTM params:', error)
    return baseUrl
  }
}

/**
 * Stores UTM parameters in sessionStorage
 */
export function storeUTMParams(utmParams: UTMParams): void {
  if (typeof window === 'undefined') return
  
  try {
    sessionStorage.setItem('hubspot_utm_params', JSON.stringify(utmParams))
  } catch (error) {
    console.error('Error storing UTM params:', error)
  }
}

/**
 * Retrieves UTM parameters from sessionStorage
 */
export function getStoredUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {}
  
  try {
    const stored = sessionStorage.getItem('hubspot_utm_params')
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.error('Error retrieving UTM params:', error)
    return {}
  }
}

/**
 * Captures UTM parameters from current URL and stores them
 */
export function captureAndStoreUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {}
  
  const utmParams = extractUTMParams(window.location.search)
  
  if (Object.keys(utmParams).length > 0) {
    storeUTMParams(utmParams)
  }
  
  return utmParams
}
