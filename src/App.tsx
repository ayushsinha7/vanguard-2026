import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { crisesList } from './data/crises';
import { Crisis, IncidentLogEntry } from './types';
import StadiumSVG from './components/StadiumSVG';
import CrisisControls from './components/CrisisControls';
import DecisionEngine from './components/DecisionEngine';
import { sanitizeLogInput } from './utils/sanitizer';
import { 
  VanguardCoreQAEngine, 
  QAEngineResult 
} from './lib/VanguardCoreQAEngine';
import { 
  CrowdManagementModule, 
  SmartNavigationModule, 
  SustainabilityTransportModule,
  CrowdAnalysisResult,
  NavigationResult,
  TransportResult
} from './lib/VanguardModules';
import { 
  Compass, 
  Users, 
  Wifi,
  CheckCircle2,
  Activity,
  Award,
  Layers,
  Sparkles
} from 'lucide-react';

/**
 * HIGH-COMPLIANCE COGNITIVE SAFETY OPERATIONS WORKSPACE
 * Designed for FIFA World Cup 2026 operations at MetLife Stadium.
 */
const DEFAULT_SYSTEM_PROMPT = `<gemini_instruction_context>
  <identity_profile>
    <role>Lead Vanguard 2026 Smart Stadium AI Safety Director</role>
    <location>MetLife Stadium (FIFA World Cup 2026 Tournament Site)</location>
    <security_authority>FIFA Stadium Safety and Security Regulations Compliance Core</security_authority>
  </identity_profile>

  <cognitive_objective>
    Synthesize multi-modal IoT sensor logs, turnstile velocities, localized decibel spikes, and weather telemetry in real-time. Protect 82,000+ match spectators and orchestrate flawless coordination with NJ Transit Secaucus shuttle routes and Bergen County emergency units.
  </cognitive_objective>

  <critical_directives>
    <directive index="1">
      Analyze raw packets to compute a precise Danger Index (0-100), hazard Severity, and Cognitive Confidence Score (0-100%).
    </directive>
    <directive index="2">
      Identify the target security sector ("North", "South", "East", "West", or "None").
    </directive>
    <directive index="3">
      Formulate three (3) highly detailed, actionable, and non-generic Ground Staff directives aligned directly with local Bergen County emergency responder protocols.
    </directive>
    <directive index="4">
      Generate high-density spectator broadcast audio alerts translated instantly into English (Primary), Spanish (MX), and French (FR) with optimal acoustics and clarity.
    </directive>
  </critical_directives>

  <schema_declaration_json>
    {
      "dangerIndex": number,
      "severity": "Nominal" | "High" | "Critical" | "Extreme",
      "confidenceScore": number,
      "aiReasoning": "Detailed technical analysis mapping security regulations...",
      "targetSector": "North" | "South" | "East" | "West" | "None",
      "directives": [
        "Directive 1: [Action-Title] - Detailed steps...",
        "Directive 2: [Action-Title] - Detailed steps...",
        "Directive 3: [Action-Title] - Detailed steps..."
      ],
      "translations": {
        "en": "Spectator audio broadcast in English...",
        "es": "Spectator audio broadcast in Spanish...",
        "fr": "Spectator audio broadcast in French..."
      }
    }
  </schema_declaration_json>
</gemini_instruction_context>`;

interface MultiTrackMetricsState {
  crowd: CrowdAnalysisResult;
  navigation: NavigationResult;
  transport: TransportResult;
}

function ClockTicker({ isNormal }: { isNormal: boolean }) {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = useCallback((date: Date) => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())} UTC`;
  }, []);

  return (
    <span 
      id="master-time-ticker" 
      className={`text-base font-mono font-bold tracking-wider tabular-nums leading-none ${isNormal ? 'text-emerald-400' : 'text-rose-400'}`}
    >
      {formatTime(time)}
    </span>
  );
}

export default function App() {
  const [activeCrisis, setActiveCrisis] = useState<Crisis>(crisesList[0]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [systemPrompt, setSystemPrompt] = useState<string>(DEFAULT_SYSTEM_PROMPT);
  const [logs, setLogs] = useState<IncidentLogEntry[]>([]);
  
  // Programmatic QA Pipeline State
  const [qaResults, setQaResults] = useState<QAEngineResult | null>(null);

  // Run isolated testing suite on component mount
  useEffect(() => {
    try {
      const results = VanguardCoreQAEngine.runAll();
      setQaResults(results);
      if (results.isSystemCompliant) {
        console.log(`VanguardCoreQAEngine Compliant: ${results.passedCount}/${results.totalCount} tests passed.`);
      } else {
        console.error("VanguardCoreQAEngine Compliance Check Failed:", results.assertions);
      }
    } catch (err) {
      console.error("Fatal exception inside QA Engine startup:", err);
    }
  }, []);

  // Standard logging mechanics
  const appendLogs = useCallback((messages: string[], type: 'info' | 'warn' | 'error' | 'success' = 'info') => {
    const timestampStr = new Date().toTimeString().split(' ')[0];
    const newEntries: IncidentLogEntry[] = messages.map((msg, index) => ({
      id: `${Date.now()}-${index}-${Math.random()}`,
      timestamp: timestampStr,
      message: msg,
      type
    }));
    setLogs(prev => [...newEntries, ...prev]);
  }, []);

  useEffect(() => {
    appendLogs([
      'CORE: Vanguard Mission Control initialized on cluster node NY-EAST-1.',
      'SYSTEM: Establishing persistent socket connections to 4,250 stadium smart sensors...',
      'SYSTEM: MetLife Stadium telemetry pipelines online.',
      'SENSOR: Turnstile arrays N1-S6 reporting standard ingress velocities (94.2% operational efficiency).',
      'AI_CORE: Gemini 1.5 Pro cognitive decision-engine loaded and monitoring.'
    ], 'success');
  }, [appendLogs]);

  // Dynamically compute real-world metrics based on the current active crisis
  const trackMetrics = useMemo<MultiTrackMetricsState>(() => {
    const isNominal = activeCrisis.id === 'nom_001';
    const isGateSurge = activeCrisis.id === 'gate_surge';
    const isSensory = activeCrisis.id === 'sensory_navigation';
    const isTransit = activeCrisis.id === 'transit_blockade';

    const crowd = CrowdManagementModule.analyzeThroughput({
      attendance: isNominal ? 82410 : isGateSurge ? 82104 : isSensory ? 81950 : 79940,
      turnstileFlowRate: isNominal ? 120 : isGateSurge ? 45 : isSensory ? 110 : 85,
      density: isNominal ? 1.2 : isGateSurge ? 4.8 : isSensory ? 2.1 : 3.4,
      activeGateCount: isNominal ? 6 : isGateSurge ? 4 : isSensory ? 6 : 6
    });

    const navigation = SmartNavigationModule.computeRoute(
      isSensory ? 'South' : 'None',
      {
        crowdedSectors: isGateSurge ? ['East'] : [],
        highSensorySectors: isSensory ? ['South'] : [],
        needsAccessibility: isSensory
      }
    );

    const transport = SustainabilityTransportModule.dispatchTransit(
      isTransit ? 'West' : 'None',
      {
        stalledTrains: isTransit ? 1 : 0,
        queuingPassengers: isTransit ? 18500 : 0,
        batterySoc: isTransit ? 85 : 98
      }
    );

    return { crowd, navigation, transport };
  }, [activeCrisis]);

  const handleSelectCrisis = useCallback((crisisId: string) => {
    const target = crisesList.find(c => c.id === crisisId);
    if (!target) return;

    // Batch message appends cleanly
    appendLogs([
      `TACTICAL ALERT: Injected external crisis simulator vector: [${target.title}]`,
      ...target.sensorLogs
    ], target.severity === 'Nominal' ? 'success' : target.severity === 'High' ? 'warn' : 'error');

    setIsProcessing(true);

    setTimeout(() => {
      // Execute state updates together to prevent intermediate repaint issues
      setActiveCrisis(target);
      setIsProcessing(false);

      appendLogs([
        `AI_DECISION: Cognitive analysis complete. Danger Index computed: ${target.dangerIndex}/100.`,
        `AI_DECISION: Broadcast alerts compiled. Ground staff directives dispatched.`
      ], target.severity === 'Nominal' ? 'success' : 'warn');
    }, 1500);
  }, [appendLogs]);

  const handleClearLogs = useCallback(() => {
    setLogs([]);
    appendLogs([
      'SYSTEM: Telemetry terminals flushed.',
      'AI_CORE: Re-established default monitoring parameters.'
    ], 'info');
  }, [appendLogs]);

  const isNormal = activeCrisis.id === 'nom_001';

  return (
    <div className="h-screen w-screen bg-zinc-950 text-zinc-100 flex flex-col overflow-hidden relative font-sans select-none">
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* HEADER BANNER */}
      <header 
        id="control-header-banner"
        className="relative shrink-0 h-20 bg-zinc-900/60 border-b border-zinc-800 px-6 flex items-center justify-between z-20 backdrop-blur-md"
        role="banner"
      >
        {/* Left Area: Title */}
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-zinc-950 border border-zinc-800 rounded shrink-0">
            <Compass className="h-4.5 w-4.5 text-emerald-500 animate-[spin_12s_linear_infinite]" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold block leading-none mb-1">
              SYSTEM CORE
            </span>
            <h1 className={`text-lg font-bold tracking-tighter transition-colors uppercase leading-none ${isNormal ? 'text-emerald-500' : 'text-rose-500'}`}>
              VANGUARD 2026
            </h1>
          </div>
          
          <div className="h-8 w-px bg-zinc-800 mx-3 hidden sm:block" />
          
          <div className="hidden sm:block">
            <span className="text-[9px] uppercase tracking-wider text-zinc-500 block leading-none mb-1">STADIUM</span>
            <span className="text-xs font-mono font-medium text-zinc-300 leading-none block">METLIFE STADIUM</span>
          </div>

          <div className="h-8 w-px bg-zinc-800 mx-3 hidden md:block" />

          {/* Test Automation Badge */}
          <div className="hidden md:block" role="status" aria-label="Programmatic Testing Status Badge">
            <span className="text-[9px] uppercase tracking-wider text-zinc-500 block leading-none mb-1">COMPLIANCE CERT</span>
            <span className={`text-xs font-mono font-bold leading-none block flex items-center gap-1 ${qaResults?.isSystemCompliant ? 'text-emerald-400' : 'text-rose-500'}`}>
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              {qaResults?.isSystemCompliant 
                ? `Automated Suite: ${qaResults.passedCount}/${qaResults.totalCount} Compliant` 
                : 'Automated Suite: Offline'}
            </span>
          </div>
        </div>

        {/* Floating status pill */}
        <div className="absolute left-1/2 -translate-x-1/2 top-4 px-3.5 py-1.5 bg-zinc-900 rounded-full border border-zinc-800 flex items-center gap-2 shadow-[0_0_12px_rgba(0,0,0,0.5)] z-30">
          <span className="flex h-1.5 w-1.5 relative" role="status">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-mono text-zinc-400 font-medium tracking-wide">
            Gemini 1.5 Pro | Operational Intelligence Node
          </span>
        </div>

        {/* Right Area: Time and Info */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 font-mono text-[10px]" role="status" aria-label="System status overview">
            {/* Attendance */}
            <div className="text-right">
              <span className="text-zinc-500 block uppercase tracking-wider mb-0.5">SPECTATORS</span>
              <span className="text-zinc-300 font-bold flex items-center gap-1.5 justify-end">
                <Users className="h-3 w-3 text-zinc-500" />
                {activeCrisis.metricOverrides?.attendance || '82,410'}
              </span>
            </div>

            {/* Ingress status */}
            <div className="text-right border-l border-zinc-800 pl-6">
              <span className="text-zinc-500 block uppercase tracking-wider mb-0.5">INGRESS RATIO</span>
              <span className="text-zinc-300 font-bold">98.4%</span>
            </div>

            {/* Global alert status indicator */}
            <div className="text-right border-l border-zinc-800 pl-6">
              <span className="text-zinc-500 block uppercase tracking-wider mb-0.5">THREAT INDEX</span>
              <span className={`font-bold flex items-center gap-1 justify-end ${isNormal ? 'text-emerald-500' : 'text-rose-500'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isNormal ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`} />
                {activeCrisis.dangerIndex}%
              </span>
            </div>
          </div>

          <div className="h-8 w-px bg-zinc-800 hidden md:block" />

          {/* Time tracker */}
          <div className="text-right">
            <span className="text-[9px] uppercase tracking-wider text-zinc-500 block leading-none mb-1">TACTICAL TIME</span>
            <ClockTicker isNormal={isNormal} />
          </div>
        </div>
      </header>

      {/* MAIN VIEWPORT LAYOUT */}
      <main className="flex-1 min-h-0 flex overflow-hidden" role="main">
        
        {/* Left column panel (33% width) */}
        <section className="w-1/3 border-r border-zinc-800 bg-zinc-900/10 flex flex-col shrink-0 min-w-[320px] max-w-[440px]">
          <CrisisControls
            crises={crisesList}
            activeCrisis={activeCrisis}
            onSelectCrisis={handleSelectCrisis}
            logs={logs}
            isProcessing={isProcessing}
            onClearLogs={handleClearLogs}
          />
        </section>

        {/* Right workspace (67% width) */}
        <section className="flex-1 bg-zinc-950 flex flex-col min-w-0">
          
          {/* Top Panel: Split Map Canvas and Telemetry Sidebar */}
          <div className="flex-1 min-h-0 p-4 border-b border-zinc-900 flex flex-col lg:flex-row gap-4 overflow-y-auto no-scrollbar">
            
            {/* Interactive Stadium Map Section (Left side of workspace) */}
            <div className="flex-1 min-h-[250px] flex items-center justify-center relative">
              <StadiumSVG
                activeZone={activeCrisis.targetSector}
                activeSeverity={activeCrisis.severity}
              />
            </div>

            {/* Real-world Metrics & Isolated Test Console (Right side of workspace) */}
            <div className="w-full lg:w-[350px] shrink-0 flex flex-col gap-4">
              
              {/* Operational Track Metrics Card */}
              <div className="p-4 bg-zinc-900/70 border border-zinc-800 rounded-lg flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <div className="flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-200">
                      Operational Track Metrics
                    </span>
                  </div>
                  <span className="text-[8px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-900/30 px-1.5 py-0.5 rounded uppercase">
                    PRO-ENGINE
                  </span>
                </div>
                
                {/* Track 1: Crowd Management */}
                <div className="flex flex-col gap-1.5 border-b border-zinc-800/40 pb-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase">Track 1: Crowd Kinetics</span>
                    <span className={`font-mono text-[8px] px-1.5 py-0.2 rounded font-bold uppercase ${
                      trackMetrics.crowd.crowdStateCode === 'CRITICAL_CONGESTION' ? 'bg-red-950 text-red-400' :
                      trackMetrics.crowd.crowdStateCode === 'WARNING_HEAVY' ? 'bg-amber-950 text-amber-400' :
                      'bg-emerald-950 text-emerald-400'
                    }`}>
                      {trackMetrics.crowd.crowdStateCode}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-300">
                    <div>
                      <span className="text-zinc-500 block text-[8px] uppercase">Flow Efficiency</span>
                      <span className="font-bold">{(trackMetrics.crowd.calculatedFlowRatio * 100).toFixed(1)}%</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[8px] uppercase">Mitigation Code</span>
                      <span className="font-bold truncate block" title={trackMetrics.crowd.warningCode}>
                        {trackMetrics.crowd.warningCode}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Track 2: Smart Navigation */}
                <div className="flex flex-col gap-1.5 border-b border-zinc-800/40 pb-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase">Track 2: Accessibility</span>
                    <span className={`font-mono text-[8px] px-1.5 py-0.2 rounded font-bold uppercase ${
                      trackMetrics.navigation.accessibilityMarshalDeploys ? 'bg-emerald-950 text-emerald-400 animate-pulse' : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {trackMetrics.navigation.accessibilityMarshalDeploys ? 'Marshals Active' : 'Idle'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-300">
                    <div>
                      <span className="text-zinc-500 block text-[8px] uppercase">Recommended Path</span>
                      <span className="font-bold text-emerald-400 truncate block" title={trackMetrics.navigation.recommendedPath}>
                        {trackMetrics.navigation.recommendedPath}
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[8px] uppercase">Transit Duration</span>
                      <span className="font-bold">{trackMetrics.navigation.estimatedTransitMin} Mins</span>
                    </div>
                  </div>
                </div>

                {/* Track 3: Sustainability & Transit */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase">Track 3: Green Transit</span>
                    <span className="text-emerald-400 font-mono text-[8px] uppercase font-bold">
                      {trackMetrics.transport.sustainabilityRating}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono text-zinc-300">
                    <div>
                      <span className="text-zinc-500 block text-[8px] uppercase">EV Shuttle</span>
                      <span className="font-bold">{trackMetrics.transport.dispatchShuttleCount} Buses</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[8px] uppercase">CO2 Offset</span>
                      <span className="font-bold text-emerald-400">{trackMetrics.transport.carbonOffsetKg} kg</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[8px] uppercase">Est. Clearance</span>
                      <span className="font-bold">
                        {trackMetrics.transport.passengerEvacuationMin > 0 ? `${trackMetrics.transport.passengerEvacuationMin} Mins` : '--'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vanguard Isolated QA Engine Verification Card */}
              <div className="p-4 bg-zinc-900/70 border border-zinc-800 rounded-lg flex-1 flex flex-col justify-between min-h-[140px]">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <div className="flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-200">
                      QA Core Assertions
                    </span>
                  </div>
                  <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded font-bold uppercase border ${
                    qaResults?.isSystemCompliant 
                      ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/30' 
                      : 'bg-red-950/40 text-red-400 border-red-900/30'
                  }`}>
                    {qaResults?.isSystemCompliant ? '100% Compliant' : 'Unchecked'}
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto max-h-[110px] no-scrollbar py-2 space-y-1">
                  {qaResults?.assertions.map((asrt, index) => (
                    <div key={index} className="flex items-center justify-between text-[9px] font-mono border-b border-zinc-800/20 pb-0.5">
                      <span className="text-zinc-400 truncate max-w-[210px]" title={asrt.assertion}>
                        {asrt.assertion}
                      </span>
                      <span className={asrt.status === 'passed' ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                        {asrt.status === 'passed' ? '✓ PASS' : '✗ FAIL'}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-zinc-800 flex justify-between items-center text-[8px] font-mono text-zinc-500">
                  <span>ASSERTIONS COMPASS: {qaResults?.passedCount}/{qaResults?.totalCount}</span>
                  <span className="flex items-center gap-1">
                    <Sparkles className="h-2.5 w-2.5 text-emerald-400 animate-pulse" />
                    RATING: {(qaResults ? qaResults.successRatio * 100 : 0).toFixed(1)}%
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Panel: Cognitive Decision Matrix Panel */}
          <div className="h-[260px] shrink-0">
            <DecisionEngine
              activeCrisis={activeCrisis}
              isProcessing={isProcessing}
              systemPrompt={systemPrompt}
              onUpdateSystemPrompt={setSystemPrompt}
            />
          </div>

        </section>
      </main>

      {/* Footer system diagnostics bar */}
      <footer className="shrink-0 bg-zinc-950 border-t border-zinc-900 h-10 px-6 flex items-center justify-between text-[9px] font-mono text-zinc-500 z-10" role="contentinfo">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1" role="status">
            <Wifi className="h-3 w-3 text-emerald-500" />
            LIVE LINK: SECURE_COMMS // 100% OPERATIONAL
          </span>
          <span>•</span>
          <span>SYSTEM_RATIO: NOMINAL</span>
        </div>
        <div>
          <span>VANGUARD COGNITIVE CORE v4.2.0 // © 2026 FIFA World Cup</span>
        </div>
      </footer>

    </div>
  );
}
