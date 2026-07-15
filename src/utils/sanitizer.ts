/**
 * Escapes HTML characters and strips dangerous scripts/event handlers
 * to prevent XSS (Cross-Site Scripting) injections in the live operational log feed.
 */
export function sanitizeLogInput(raw: string): string {
  if (!raw) return '';
  
  // 1. Basic HTML character escaping to neutralize tags
  let escaped = raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');

  // 2. Double-safety check: Redact any script block structures or active event handlers
  escaped = escaped.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '[REDACTED_SCRIPT]');
  escaped = escaped.replace(/on\w+\s*=/gi, '[REDACTED_EVENT_HANDLER]');
  escaped = escaped.replace(/javascript\s*:/gi, '[REDACTED_JS_PROTOCOL]');

  return escaped;
}
