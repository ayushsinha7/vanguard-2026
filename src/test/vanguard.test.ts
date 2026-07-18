import { VanguardCoreQAEngine } from '../lib/VanguardCoreQAEngine';

function runTestSuite() {
  console.log("==========================================");
  console.log("VANGUARD 2026 COGNITIVE QA OPERATIONS SUITE");
  console.log("==========================================");

  try {
    const report = VanguardCoreQAEngine.runAll();
    
    report.assertions.forEach((assertion) => {
      if (assertion.status === 'passed') {
        console.log(`✓ [PASS] ${assertion.assertion}`);
      } else {
        console.warn(`✗ [FAIL] ${assertion.assertion} | Expected: ${assertion.expected} | Actual: ${assertion.actual}`);
      }
    });

    console.log("==========================================");
    console.log(`STATUS: ${report.isSystemCompliant ? 'COMPLIANT (SUCCESS)' : 'NON-COMPLIANT (FAILURE)'}`);
    console.log(`METRIC: ${report.passedCount}/${report.totalCount} ASSERTIONS IN SPECS PASSED (${(report.successRatio * 100).toFixed(2)}%)`);
    console.log("==========================================");

    if (report.isSystemCompliant) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  } catch (err: any) {
    console.error("CRITICAL RUNTIME TEST ENG ERR:");
    console.error(err.message || err);
    console.error("==========================================");
    process.exit(1);
  }
}

runTestSuite();
