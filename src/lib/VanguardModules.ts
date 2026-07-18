/**
 * VANGUARD 2026 STADIUM OPERATIONAL LOGIC MODULES
 * Robust, production-grade logic engines handling distinct FIFA 2026 problem statements.
 */

export interface CrowdThroughputData {
  attendance: number;
  turnstileFlowRate: number; // processed spectators/min
  density: number; // persons/m²
  activeGateCount: number;
}

export interface CrowdAnalysisResult {
  isBottleneckTriggered: boolean;
  calculatedFlowRatio: number; // throughput coefficient (0.0 - 1.0)
  warningCode: string;
  recommendedAction: string;
  crowdStateCode: 'NOMINAL' | 'WARNING_HEAVY' | 'CRITICAL_CONGESTION';
}

/**
 * Track 1: Dynamic Crowd Management
 * Coordinates multi-stand throughput analytics and bottleneck triggers.
 */
export class CrowdManagementModule {
  static analyzeThroughput(data: CrowdThroughputData): CrowdAnalysisResult {
    try {
      let isBottleneckTriggered = false;
      let calculatedFlowRatio = 1.0;
      let warningCode = 'NOMINAL_FLOW_COMPLIANT';
      let recommendedAction = 'Maintain standard automated monitoring in accordance with FIFA Safety Guidelines Chapter 5.';
      let crowdStateCode: 'NOMINAL' | 'WARNING_HEAVY' | 'CRITICAL_CONGESTION' = 'NOMINAL';

      // Safeguard against division by zero
      const gateCount = data.activeGateCount || 1;

      if (data.density > 4.5) {
        isBottleneckTriggered = true;
        calculatedFlowRatio = Math.max(0.15, 1.0 - (data.density - 3.5) * 0.35);
        warningCode = 'CRITICAL_CROWD_CRUSH_RISK';
        recommendedAction = 'Activate emergency vent gates immediately. Open manual bypass gates E1-E8 and route arriving spectator waves to adjacent Gate 5.';
        crowdStateCode = 'CRITICAL_CONGESTION';
      } else if (data.density > 3.0 || data.turnstileFlowRate < 60) {
        isBottleneckTriggered = true;
        calculatedFlowRatio = Math.max(0.5, (data.turnstileFlowRate * gateCount) / 1200);
        warningCode = 'CONGESTION_WARNING_INGRESS_SLID';
        recommendedAction = 'Reroute flow: Alert incoming Sector East flows to use Gate 5 immediately via digital signage networks.';
        crowdStateCode = 'WARNING_HEAVY';
      }

      return {
        isBottleneckTriggered,
        calculatedFlowRatio: parseFloat(calculatedFlowRatio.toFixed(3)),
        warningCode,
        recommendedAction,
        crowdStateCode
      };
    } catch (error) {
      // Robust error handling with fallback
      return {
        isBottleneckTriggered: false,
        calculatedFlowRatio: 1.0,
        warningCode: 'LOGIC_MODULE_ERR_FALLBACK',
        recommendedAction: 'Local failover operational. Monitor gate flows manually.',
        crowdStateCode: 'NOMINAL'
      };
    }
  }
}

export interface NavigationConstraints {
  crowdedSectors: string[];
  highSensorySectors: string[];
  needsAccessibility: boolean;
}

export interface NavigationResult {
  recommendedPath: string;
  estimatedTransitMin: number;
  avoidedSectors: string[];
  accessibilityMarshalDeploys: boolean;
  status: string;
}

/**
 * Track 2: Smart Indoor Navigation & Accessibility
 * Computes dynamic, sensor-based indoor stadium rerouting paths avoiding high-sensory/crowded sectors.
 */
export class SmartNavigationModule {
  static computeRoute(startSector: string, constraints: NavigationConstraints): NavigationResult {
    try {
      let recommendedPath = 'Standard Stadium Concourse Route';
      let estimatedTransitMin = 4;
      const avoidedSectors: string[] = [];
      let accessibilityMarshalDeploys = false;
      let status = 'Standard Navigation Route Active';

      // Convert arrays to O(1) lookup Sets
      const crowdedSet = new Set(constraints.crowdedSectors);
      const highSensorySet = new Set(constraints.highSensorySectors);

      // Check for sensory overload risk or accessibility requirements
      if (constraints.needsAccessibility || highSensorySet.has(startSector)) {
        accessibilityMarshalDeploys = true;
        avoidedSectors.push(startSector);
        recommendedPath = 'S1B (Low-Acoustic Corridor)';
        estimatedTransitMin = 7; // Longer distance but low acoustic pressure
        status = 'Accessibility Guidance Active - Dynamic Quiet corridor route selected';
        
        // Also register crowded sectors as avoided but keep high accessibility priority path
        if (crowdedSet.has('East')) {
          avoidedSectors.push('East');
        }
      } else if (crowdedSet.has('East')) {
        // Check for physical crowd blocks
        avoidedSectors.push('East');
        recommendedPath = 'East-North Concourse Bypass Connector';
        estimatedTransitMin = Math.max(estimatedTransitMin, 6);
        status = 'Bottleneck Bypass Route Initiated';
      }

      return {
        recommendedPath,
        estimatedTransitMin,
        avoidedSectors,
        accessibilityMarshalDeploys,
        status
      };
    } catch (error) {
      return {
        recommendedPath: 'Primary Concourse Route (Direct)',
        estimatedTransitMin: 5,
        avoidedSectors: [],
        accessibilityMarshalDeploys: false,
        status: 'Navigation Fallback Active'
      };
    }
  }
}

export interface TransportMetrics {
  stalledTrains: number;
  queuingPassengers: number;
  batterySoc: number; // state-of-charge percentage (0-100)
}

export interface TransportResult {
  dispatchShuttleCount: number;
  carbonOffsetKg: number;
  dynamicGridDrawKw: number;
  sustainabilityRating: string;
  passengerEvacuationMin: number;
  isBusBridgeDispatched: boolean;
}

/**
 * Track 3: Tournament Sustainability & Transport
 * Handles green transit dispatch logic and venue supply chain optimization workflows.
 */
export class SustainabilityTransportModule {
  static dispatchTransit(brokenSector: string, metrics: TransportMetrics): TransportResult {
    try {
      let dispatchShuttleCount = 0;
      let carbonOffsetKg = 0;
      let dynamicGridDrawKw = 0;
      let sustainabilityRating = 'A+ (Optimal Solar Grid)';
      let passengerEvacuationMin = 0;
      let isBusBridgeDispatched = false;

      if (metrics.stalledTrains > 0 || metrics.queuingPassengers > 2000) {
        isBusBridgeDispatched = true;
        
        // Calculate electric shuttle bus numbers (each carries 75 fans)
        dispatchShuttleCount = Math.min(45, Math.ceil(metrics.queuingPassengers / 380));
        if (dispatchShuttleCount < 25 && metrics.stalledTrains > 0) {
          dispatchShuttleCount = 25; // FIFA compliance minimum bridge size
        }

        // Carbon offsets: 1 EV bus saves ~2.8kg CO2 per operational mile
        carbonOffsetKg = parseFloat((dispatchShuttleCount * 6.2 * 2.8).toFixed(2));
        
        // Compute smart charging power drawing from solar batteries
        dynamicGridDrawKw = dispatchShuttleCount * 11.5; // kW
        
        sustainabilityRating = metrics.batterySoc > 45 ? 'Carbon-Neutral Loop (A++)' : 'Grid-Assisted EV Loop (A)';
        passengerEvacuationMin = Math.ceil(metrics.queuingPassengers / (dispatchShuttleCount * 7.5));
      }

      return {
        dispatchShuttleCount,
        carbonOffsetKg,
        dynamicGridDrawKw: parseFloat(dynamicGridDrawKw.toFixed(1)),
        sustainabilityRating,
        passengerEvacuationMin,
        isBusBridgeDispatched
      };
    } catch (error) {
      return {
        dispatchShuttleCount: 15,
        carbonOffsetKg: 100,
        dynamicGridDrawKw: 150,
        sustainabilityRating: 'Fallback Emergency Transit (B)',
        passengerEvacuationMin: 35,
        isBusBridgeDispatched: true
      };
    }
  }
}
