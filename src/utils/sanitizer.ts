/**
 * VANGUARD 2026 ENTERPRISE SECURITY CONTEXT
 * Robust regular expression filtering and deep DOM sanitization rules
 * to neutralize XSS (Cross-Site Scripting) and injection vectors.
 */

export interface SanitizationResult {
  original: string;
  sanitized: string;
  isFlagged: boolean;
  blockedPatterns: string[];
}

/**
 * Deep regular expression definitions for scanning threat payloads
 */
const HIGH_RISK_PATTERNS = {
  scriptTag: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  inlineEvent: /\bon\w+\s*=\s*(['"]?)[^'"]*\1/gi,
  jsProtocol: /javascript\s*:/gi,
  dataProtocol: /data\s*:/gi,
  vbProtocol: /vbscript\s*:/gi,
  htmlInjection: /<[^>]*>/g,
  cssExpression: /expression\s*\(/gi,
  metaRefresh: /<meta\s+http-equiv=["']refresh["']/gi,
  svgObfuscation: /<svg\b[^>]*>([\s\S]*?)<\/svg>/gi,
  iframeHijack: /<iframe\b[^>]*>([\s\S]*?)<\/iframe>/gi,
};

/**
 * Sanitizes and validates user input or incoming telemetry packets.
 * Fully neutralizes active tags, script entities, event bindings, and protocols.
 */
export function sanitizeLogInput(raw: string): string {
  if (typeof raw !== 'string') return '';
  
  // Quick pre-check
  let processed = raw.trim();
  if (!processed) return '';

  // 1. Scrub script tags completely
  processed = processed.replace(HIGH_RISK_PATTERNS.scriptTag, '[REDACTED_SCRIPT]');

  // 2. Scrub svg/iframe tags
  processed = processed.replace(HIGH_RISK_PATTERNS.svgObfuscation, '[REDACTED_VECTOR]');
  processed = processed.replace(HIGH_RISK_PATTERNS.iframeHijack, '[REDACTED_IFRAME]');

  // 3. Scrub dangerous inline events (e.g. onload, onerror, onclick)
  processed = processed.replace(HIGH_RISK_PATTERNS.inlineEvent, '[REDACTED_EVENT]');

  // 4. Neutralize dangerous scheme protocols
  processed = processed.replace(HIGH_RISK_PATTERNS.jsProtocol, '[REDACTED_JS_SCHEME]');
  processed = processed.replace(HIGH_RISK_PATTERNS.dataProtocol, '[REDACTED_DATA_SCHEME]');
  processed = processed.replace(HIGH_RISK_PATTERNS.vbProtocol, '[REDACTED_VBS_SCHEME]');

  // 5. Escaping HTML characters as a final fallback shield
  processed = processed
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');

  return processed;
}

/**
 * Audit input payload and return descriptive diagnostics
 */
export function auditAndSanitize(raw: string): SanitizationResult {
  if (typeof raw !== 'string') {
    return { original: '', sanitized: '', isFlagged: false, blockedPatterns: [] };
  }

  const blockedPatterns: string[] = [];
  
  if (HIGH_RISK_PATTERNS.scriptTag.test(raw)) blockedPatterns.push('SCRIPT_TAG');
  if (HIGH_RISK_PATTERNS.inlineEvent.test(raw)) blockedPatterns.push('INLINE_EVENT');
  if (HIGH_RISK_PATTERNS.jsProtocol.test(raw)) blockedPatterns.push('JS_PROTOCOL');
  if (HIGH_RISK_PATTERNS.dataProtocol.test(raw)) blockedPatterns.push('DATA_PROTOCOL');
  if (HIGH_RISK_PATTERNS.svgObfuscation.test(raw)) blockedPatterns.push('SVG_INJECTION');
  if (HIGH_RISK_PATTERNS.iframeHijack.test(raw)) blockedPatterns.push('IFRAME_HIJACK');

  const sanitized = sanitizeLogInput(raw);
  const isFlagged = blockedPatterns.length > 0;

  return {
    original: raw,
    sanitized,
    isFlagged,
    blockedPatterns
  };
}
