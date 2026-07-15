import { crisesList } from '../data/crises';
import { sanitizeLogInput } from '../utils/sanitizer';

export function testIncidentStateChange(): boolean {
  console.log("Running: testIncidentStateChange()");
  const normalCrisis = crisesList.find(c => c.id === 'nom_001');
  const gateSurgeCrisis = crisesList.find(c => c.id === 'gate_surge');

  if (!normalCrisis || !gateSurgeCrisis) {
    throw new Error("Missing critical crisis templates for testing.");
  }

  // Verifies that a nominal state has danger index <= 10 and gate surge has critical danger index > 80
  if (normalCrisis.dangerIndex > 10) {
    throw new Error(`Nominal state has unexpectedly high danger: ${normalCrisis.dangerIndex}`);
  }
  if (gateSurgeCrisis.dangerIndex < 80) {
    throw new Error(`Gate surge hazard has unexpectedly low danger: ${gateSurgeCrisis.dangerIndex}`);
  }

  console.log("✓ testIncidentStateChange passed.");
  return true;
}

export function testMultilingualLocalization(): boolean {
  console.log("Running: testMultilingualLocalization()");
  for (const crisis of crisesList) {
    if (!crisis.translations) {
      throw new Error(`Crisis ${crisis.id} has no translations block.`);
    }
    const { en, es, fr } = crisis.translations;
    if (!en || en.trim().length === 0) {
      throw new Error(`Crisis ${crisis.id} is missing a valid English translation.`);
    }
    if (!es || es.trim().length === 0) {
      throw new Error(`Crisis ${crisis.id} is missing a valid Spanish translation.`);
    }
    if (!fr || fr.trim().length === 0) {
      throw new Error(`Crisis ${crisis.id} is missing a valid French translation.`);
    }
  }
  console.log("✓ testMultilingualLocalization passed.");
  return true;
}

export function testInputSanitization(): boolean {
  console.log("Running: testInputSanitization()");
  const dirtyInputs = [
    "<script>alert('malicious')</script>",
    "Hello <script src='http://evil.com/hack.js'></script> World",
    "<img src='x' onerror='exploit()'>",
    "javascript:void(0)"
  ];

  for (const input of dirtyInputs) {
    const cleaned = sanitizeLogInput(input);
    if (cleaned.includes("<script>") || cleaned.includes("</script>")) {
      throw new Error(`Failed to strip script tags. Output: ${cleaned}`);
    }
    if (cleaned.toLowerCase().includes("onerror")) {
      throw new Error(`Failed to redact event handlers. Output: ${cleaned}`);
    }
    if (cleaned.toLowerCase().includes("javascript:")) {
      throw new Error(`Failed to block javascript protocols. Output: ${cleaned}`);
    }
  }
  console.log("✓ testInputSanitization passed.");
  return true;
}

// Self-executing runner function for npm test script
function runTestSuite() {
  console.log("==========================================");
  console.log("VANGUARD 2026 AUTOMATED COMPLIANCE SUITE");
  console.log("==========================================");
  
  let passed = 0;
  const total = 3;

  try {
    if (testIncidentStateChange()) passed++;
    if (testMultilingualLocalization()) passed++;
    if (testInputSanitization()) passed++;
    
    console.log("==========================================");
    console.log(`STATUS: SUCCESS // ${passed}/${total} TESTS PASSED CLEANLY`);
    console.log("==========================================");
    process.exit(0);
  } catch (err: any) {
    console.error("==========================================");
    console.error("STATUS: FAILED // TEST EXECUTION ENCOUNTERED ANOMALIES");
    console.error(err.message || err);
    console.error("==========================================");
    process.exit(1);
  }
}

// Execute if run directly from terminal
if (import.meta.url.endsWith(process.argv[1]) || process.argv[1]?.endsWith('vanguard.test.ts')) {
  runTestSuite();
}
