/**
 * Generate a two-step unsubscribe link for email templates
 *
 * Usage in SendGrid templates:
 *   Instead of: {{{unsubscribe}}}
 *   Use: https://washingtoncbps.com/unsubscribe?e={{base64_email}}
 *
 * To generate links programmatically:
 *   const link = generateUnsubscribeLink("user@example.com")
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://washingtoncbps.com"

/**
 * Generate a base64-encoded unsubscribe link
 */
export function generateUnsubscribeLink(email: string): string {
  const encoded = Buffer.from(email.toLowerCase()).toString("base64")
  return `${BASE_URL}/unsubscribe?e=${encoded}`
}

/**
 * Decode an email from the unsubscribe link parameter
 */
export function decodeUnsubscribeEmail(encoded: string): string | null {
  try {
    const decoded = Buffer.from(encoded, "base64").toString("utf-8")
    if (decoded.includes("@")) {
      return decoded
    }
    return null
  } catch {
    return null
  }
}

/**
 * For SendGrid Dynamic Templates:
 *
 * In your template, add a custom unsubscribe link:
 * <a href="https://washingtoncbps.com/unsubscribe?e={{base64_email}}">Unsubscribe</a>
 *
 * When sending emails via SendGrid API, include base64_email in dynamic_template_data:
 *
 * const base64Email = Buffer.from(recipientEmail).toString('base64');
 *
 * sgMail.send({
 *   to: recipientEmail,
 *   from: 'noreply@vertpro.com',
 *   templateId: 'd-xxxxx',
 *   dynamicTemplateData: {
 *     first_name: 'John',
 *     base64_email: base64Email,  // Add this!
 *   }
 * });
 */
