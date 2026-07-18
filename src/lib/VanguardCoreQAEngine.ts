import { crisesList } from '../data/crises';
import { sanitizeLogInput } from '../utils/sanitizer';
import { 
  CrowdManagementModule, 
  SmartNavigationModule, 
  SustainabilityTransportModule 
} from './VanguardModules';

export interface AssertionDetail {
  assertion: string;
  status: 'passed' | 'failed';
  expected?: string;
  actual?: string;
}

export interface QAEngineResult {
  passedCount: number;
  totalCount: number;
  successRatio: number;
  assertions: AssertionDetail[];
  isSystemCompliant: boolean;
}

/**
 * Isolated programmatic testing pipeline called class VanguardCoreQAEngine.
 * Modelled after modern BDD test frameworks with pure assertions.
 */
export class VanguardCoreQAEngine {
  static runAll(): QAEngineResult {
    const assertions: AssertionDetail[] = [];

    // Custom expect wrapper to emulate jest/mocha style testing cleanly
    const expect = (actual: any, assertionName: string) => {
      return {
        toBe: (expected: any) => {
          const passed = actual === expected;
          assertions.push({
            assertion: assertionName,
            status: passed ? 'passed' : 'failed',
            expected: String(expected),
            actual: String(actual),
          });
        },
        toNotBeNullOrUndefined: () => {
          const passed = actual !== null && actual !== undefined;
          assertions.push({
            assertion: assertionName,
            status: passed ? 'passed' : 'failed',
            expected: 'Not Null/Undefined',
            actual: actual === null ? 'null' : actual === undefined ? 'undefined' : 'valid',
          });
        },
        toContain: (substring: string) => {
          const passed = typeof actual === 'string' && actual.includes(substring);
          assertions.push({
            assertion: assertionName,
            status: passed ? 'passed' : 'failed',
            expected: `Contains: "${substring}"`,
            actual: String(actual),
          });
        },
        toBeGreaterThan: (threshold: number) => {
          const passed = typeof actual === 'number' && actual > threshold;
          assertions.push({
            assertion: assertionName,
            status: passed ? 'passed' : 'failed',
            expected: `> ${threshold}`,
            actual: String(actual),
          });
        },
      };
    };

    // -------------------------------------------------------------
    // Test A: DATA INTEGRITY OF INCOMING TELEMETRY INPUTS
    // -------------------------------------------------------------
    try {
      expect(crisesList, "Telemetry List Defined").toNotBeNullOrUndefined();
      expect(crisesList.length, "Telemetry List has exact counts").toBe(4);

      crisesList.forEach((crisis, index) => {
        expect(typeof crisis.id, `Telemetry[${index}] has valid string ID`).toBe('string');
        expect(typeof crisis.title, `Telemetry[${index}] has valid string title`).toBe('string');
        expect(typeof crisis.dangerIndex, `Telemetry[${index}] has numeric Danger Index`).toBe('number');
        expect(crisis.dangerIndex >= 0 && crisis.dangerIndex <= 100, `Telemetry[${index}] danger index is bounded`).toBe(true);
        expect(Array.isArray(crisis.sensorLogs), `Telemetry[${index}] has log packets array`).toBe(true);
      });
    } catch (e: any) {
      assertions.push({
        assertion: "Data integrity of incoming telemetry inputs (Fatal Crash Avoided)",
        status: "failed",
        actual: e.message
      });
    }

    // -------------------------------------------------------------
    // Test B: COMPLETE MULTILINGUAL LOCALIZATION MAPS (EN, ES, FR)
    // -------------------------------------------------------------
    try {
      crisesList.forEach((crisis) => {
        expect(crisis.translations, `Localization: Crisis [${crisis.id}] translation block present`).toNotBeNullOrUndefined();
        expect(typeof crisis.translations.en, `Localization: Crisis [${crisis.id}] English translation is string`).toBe('string');
        expect(typeof crisis.translations.es, `Localization: Crisis [${crisis.id}] Spanish translation is string`).toBe('string');
        expect(typeof crisis.translations.fr, `Localization: Crisis [${crisis.id}] French translation is string`).toBe('string');

        expect(crisis.translations.en.trim().length > 0, `Localization: Crisis [${crisis.id}] EN has text content`).toBe(true);
        expect(crisis.translations.es.trim().length > 0, `Localization: Crisis [${crisis.id}] ES has text content`).toBe(true);
        expect(crisis.translations.fr.trim().length > 0, `Localization: Crisis [${crisis.id}] FR has text content`).toBe(true);
      });
    } catch (e: any) {
      assertions.push({
        assertion: "Complete multilingual localization validation (Fatal Crash Avoided)",
        status: "failed",
        actual: e.message
      });
    }

    // -------------------------------------------------------------
    // Test C: XSS INPUT ESCAPING BEHAVIOR
    // -------------------------------------------------------------
    try {
      const scriptPayload = "<script>alert('MetLife Exploit')</script>";
      const sanitizedScript = sanitizeLogInput(scriptPayload);
      expect(sanitizedScript.includes("<script>"), "Security: Escape raw script tags").toBe(false);

      const eventPayload = '<img src="x" onerror="console.log(1)">';
      const sanitizedEvent = sanitizeLogInput(eventPayload);
      expect(sanitizedEvent.toLowerCase().includes("onerror"), "Security: Escapes onerror handlers").toBe(false);

      const jsSchemePayload = "javascript:alert(1)";
      const sanitizedScheme = sanitizeLogInput(jsSchemePayload);
      expect(sanitizedScheme.toLowerCase().includes("javascript:"), "Security: Blocks inline javascript protocol execution").toBe(false);
    } catch (e: any) {
      assertions.push({
        assertion: "XSS Input Escaping Pipeline (Fatal Crash Avoided)",
        status: "failed",
        actual: e.message
      });
    }

    // -------------------------------------------------------------
    // Test D: MULTI-TRACK ALGORITHMIC STATE OUTPUTS
    // -------------------------------------------------------------
    try {
      // 1. Crowd Management throughput algorithms
      const crowdResult = CrowdManagementModule.analyzeThroughput({
        attendance: 82500,
        turnstileFlowRate: 45, // heavy congestion
        density: 4.8, // bottleneck trigger
        activeGateCount: 6
      });
      expect(crowdResult.isBottleneckTriggered, "Track 1: Correctly triggers bottleneck on high density").toBe(true);
      expect(crowdResult.crowdStateCode, "Track 1: Classifies severe crowd crush risk state").toBe('CRITICAL_CONGESTION');
      expect(crowdResult.calculatedFlowRatio < 0.7, "Track 1: Applies proportional throughput penalty").toBe(true);

      // 2. Smart Navigation rerouting algorithms
      const navResult = SmartNavigationModule.computeRoute('South', {
        crowdedSectors: ['East'],
        highSensorySectors: ['South'],
        needsAccessibility: true
      });
      expect(navResult.recommendedPath, "Track 2: Correctly maps sensory accessibility detour").toBe('S1B (Low-Acoustic Corridor)');
      expect(navResult.accessibilityMarshalDeploys, "Track 2: Directs tactical marshall support deploy").toBe(true);

      // 3. Sustainability and transport bridge algorithms
      const transportResult = SustainabilityTransportModule.dispatchTransit('West', {
        stalledTrains: 1,
        queuingPassengers: 18500,
        batterySoc: 85
      });
      expect(transportResult.isBusBridgeDispatched, "Track 3: Dispatches emergency transport shuttle loop").toBe(true);
      expect(transportResult.dispatchShuttleCount >= 25, "Track 3: Dispatches minimum EV compliant fleets").toBe(true);
      expect(transportResult.carbonOffsetKg > 100, "Track 3: Computes exact green transport metrics offsets").toBe(true);
    } catch (e: any) {
      assertions.push({
        assertion: "Multi-track Algorithmic Logic Suite (Fatal Crash Avoided)",
        status: "failed",
        actual: e.message
      });
    }

    const passedCount = assertions.filter(a => a.status === 'passed').length;
    const totalCount = assertions.length;
    const successRatio = totalCount > 0 ? (passedCount / totalCount) : 0;
    const isSystemCompliant = successRatio >= 0.96;

    return {
      passedCount,
      totalCount,
      successRatio: parseFloat(successRatio.toFixed(4)),
      assertions,
      isSystemCompliant
    };
  }
}
