/**
 * WA ad-account tags for coloradobps.com: the LinkedIn Insight Tag (partner 6743762) and the Google Ads tag (AW-822042382).
 *
 * Same pattern as vert-dev/washington-cbps (lib/linkedin-tracking.ts and lib/google-ads-tag.ts): both load on every page, on the
 * production hosts only (https and a host in AD_TAG_ALLOWED_HOSTS). Preview deployments (*.vercel.app), localhost and any other
 * host load nothing. The existing GTM container and analytics-tracker are not touched.
 *
 *   - LinkedIn partner 6743762 is the Insight Tag of LinkedIn ad account 513987890. components/linkedin-insight.tsx calls
 *     installLinkedInInsight() after mount: it registers the partner, adds the lintrk queue shim and adds insight.min.js once.
 *   - Google Ads AW-822042382 is the "VertPro" account. GOOGLE_ADS_TAG_SCRIPT is plain ES5 text, placed inline in <head> of
 *     app/layout.tsx right after the GTM snippet; it reuses window.dataLayer, adds gtag.js once and queues the config command.
 *     It sends no conversion by itself.
 *
 * Remarketing audiences: GOOGLE_ADS_AUDIENCES_ENABLED = false adds allow_ad_personalization_signals: false to the config command
 * (as on washingtoncbps.com), so visitors are not added to Google Ads audiences. Conversion measurement is the same either way.
 * Turning audiences on later is that one flag (the privacy policy must cover it first).
 */

export const LINKEDIN_PARTNER_ID = "6743762"
export const LINKEDIN_INSIGHT_URL = "https://snap.licdn.com/li.lms-analytics/insight.min.js"
export const GOOGLE_ADS_ID = "AW-822042382"

/** The only hostnames that load either tag: production, over https (the apex is what Vercel serves; www is listed so a visit that lands there still counts). */
export const AD_TAG_ALLOWED_HOSTS: readonly string[] = ["coloradobps.com", "www.coloradobps.com"]

export const GOOGLE_ADS_AUDIENCES_ENABLED = false

/** The config command. With audiences off it carries Google's documented allow_ad_personalization_signals: false. */
const CONFIG_COMMAND = GOOGLE_ADS_AUDIENCES_ENABLED ? 'w.gtag("config",id)' : 'w.gtag("config",id,{allow_ad_personalization_signals:false})'

export const GOOGLE_ADS_TAG_SCRIPT =
  `(function(w,d,id,hosts){try{var l=w.location;` +
  `if(!l||l.protocol!=="https:"||hosts.indexOf(String(l.hostname).toLowerCase())<0)return;` +
  `if(w.__waGoogleAdsTag)return;w.__waGoogleAdsTag=true;` +
  `w.dataLayer=w.dataLayer||[];` +
  `if(typeof w.gtag!=="function"){w.gtag=function(){w.dataLayer.push(arguments)}}` +
  `var s=d.createElement("script");s.async=true;s.src="https://www.googletagmanager.com/gtag/js?id="+encodeURIComponent(id);` +
  `var f=d.getElementsByTagName("script")[0];if(f&&f.parentNode){f.parentNode.insertBefore(s,f)}else{d.head.appendChild(s)}` +
  `w.gtag("js",new Date());${CONFIG_COMMAND}}catch(e){}})(window,document,` +
  `${JSON.stringify(GOOGLE_ADS_ID)},${JSON.stringify(AD_TAG_ALLOWED_HOSTS)});`

type Insight = ((action: string, payload: { conversion_id: number }) => void) & { q?: unknown[][] }
type InsightWindow = Window & {
  lintrk?: Insight
  _linkedin_partner_id?: string
  _linkedin_data_partner_ids?: string[]
}

/** True on a production host over https, and not on /api, /admin or /internal paths. */
export function isPublicProduction(location: Pick<Location, "protocol" | "hostname" | "pathname">): boolean {
  return location.protocol === "https:" &&
    AD_TAG_ALLOWED_HOSTS.includes(location.hostname.toLowerCase()) &&
    !/^\/(api|admin|internal)(\/|$)/.test(location.pathname)
}

/** Registers partner 6743762, adds the official lintrk queue shim if there is none and adds insight.min.js once. Returns false off production. */
export function installLinkedInInsight(target: Window = window): boolean {
  if (!isPublicProduction(target.location)) return false
  const host = target as InsightWindow
  host._linkedin_partner_id = LINKEDIN_PARTNER_ID
  host._linkedin_data_partner_ids ??= []
  if (!host._linkedin_data_partner_ids.includes(LINKEDIN_PARTNER_ID)) host._linkedin_data_partner_ids.push(LINKEDIN_PARTNER_ID)
  if (!host.lintrk) {
    const queued: Insight = (action, payload) => { queued.q!.push([action, payload]) }
    queued.q = []
    host.lintrk = queued
  }
  if (!target.document.querySelector(`script[src="${LINKEDIN_INSIGHT_URL}"]`)) {
    const script = target.document.createElement("script")
    script.id = "linkedin-insight-tag"
    script.async = true
    script.src = LINKEDIN_INSIGHT_URL
    target.document.head.appendChild(script)
  }
  return true
}
