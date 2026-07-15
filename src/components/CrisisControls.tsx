import React from 'react';
import { Crisis, IncidentLogEntry } from '../types';
import { ShieldAlert, RefreshCw, TriangleAlert, CloudLightning, Activity, AlertOctagon, Compass } from 'lucide-react';
import { sanitizeLogInput } from '../utils/sanitizer';

interface CrisisControlsProps {
  crises: Crisis[];
  activeCrisis: Crisis;
  onSelectCrisis: (crisisId: string) => void;
  logs: IncidentLogEntry[];
  isProcessing: boolean;
  onClearLogs: () => void;
}

export default function CrisisControls({
  crises,
  activeCrisis,
  onSelectCrisis,
  logs,
  isProcessing,
  onClearLogs
}: CrisisControlsProps) {

  const getCrisisIcon = (id: string) => {
    switch (id) {
      case 'gate_surge':
        return <ShieldAlert className="h-4 w-4 text-rose-500" />;
      case 'sensory_navigation':
        return <Compass className="h-4 w-4 text-emerald-400 animate-[spin_8s_linear_infinite]" />;
      case 'transit_blockade':
        return <TriangleAlert className="h-4 w-4 text-amber-500" />;
      case 'severe_lightning':
        return <CloudLightning className="h-4 w-4 text-red-500 animate-pulse" />;
      default:
        return <Activity className="h-4 w-4 text-emerald-500" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Extreme':
        return <span className="text-[10px] px-1.5 py-0.5 bg-red-950/80 border border-red-800/60 rounded text-red-400 uppercase font-mono font-bold tracking-wider animate-pulse">Lvl 4</span>;
      case 'Critical':
        return <span className="text-[10px] px-1.5 py-0.5 bg-rose-950/80 border border-rose-800/60 rounded text-rose-400 uppercase font-mono font-bold tracking-wider">Lvl 3</span>;
      case 'High':
        return <span className="text-[10px] px-1.5 py-0.5 bg-amber-950/80 border border-amber-800/60 rounded text-amber-400 uppercase font-mono font-bold tracking-wider">Lvl 2</span>;
      default:
        return <span className="text-[10px] px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-zinc-400 uppercase font-mono font-bold tracking-wider">Lvl 1</span>;
    }
  };

  return (
    <div id="crisis-control-panel" className="flex flex-col h-full bg-zinc-950 border border-zinc-800 flex-1 overflow-hidden" role="region" aria-label="Incident Control Panel">
      {/* Feed section: Top */}
      <div className="p-4 border-b border-zinc-800 bg-zinc-900/40 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-300 flex items-center gap-2">
            <AlertOctagon className="h-3.5 w-3.5 text-emerald-500" />
            Live Operational Feed
          </h2>
          <button 
            onClick={onClearLogs}
            className="text-[10px] font-mono text-zinc-500 hover:text-zinc-300 flex items-center gap-1 cursor-pointer transition-colors"
            aria-label="Flush and clear all operational logs"
            title="Reset system logs"
            id="clear-logs-btn"
          >
            <RefreshCw className="h-2.5 w-2.5" />
            Flush logs
          </button>
        </div>

        {/* Scrollable live feed cards */}
        <div 
          id="tactical-log-terminal"
          className="h-[210px] overflow-y-auto no-scrollbar space-y-2 pr-1"
          role="log"
          aria-live="polite"
          aria-label="Live tactical log feed"
        >
          {logs.length === 0 ? (
            <div className="h-full flex items-center justify-center text-zinc-600 text-[10px] italic font-mono">
              Terminal idle. Inject tactical telemetry below.
            </div>
          ) : (
            logs.map((log) => {
              let borderClass = 'border-zinc-800 bg-zinc-900/80';
              let textClass = 'text-zinc-400';
              let titleText = 'System Broadcast';

              if (log.type === 'error') {
                borderClass = 'border-red-500/20 bg-red-950/5';
                textClass = 'text-red-400';
                titleText = 'Critical Alert';
              } else if (log.type === 'warn') {
                borderClass = 'border-amber-500/20 bg-amber-950/5';
                textClass = 'text-amber-400';
                titleText = 'Warning Telemetry';
              } else if (log.type === 'success') {
                borderClass = 'border-emerald-500/20 bg-emerald-950/5';
                textClass = 'text-emerald-400';
                titleText = 'System Nominal';
              }

              // Sanitize log content before rendering
              const safeMsg = sanitizeLogInput(log.message);

              return (
                <div 
                  key={log.id} 
                  className={`p-2.5 border ${borderClass} rounded flex gap-2.5 items-start transition-all duration-300 animate-fade-in`}
                >
                  <span className="text-[9px] font-mono text-zinc-500 pt-0.5 shrink-0">{log.timestamp}</span>
                  <div className="min-w-0">
                    <p className={`text-[10px] font-bold tracking-wide uppercase ${textClass}`}>{titleText}</p>
                    <p className="text-[10px] text-zinc-300 font-sans leading-relaxed break-words">{safeMsg}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Control Buttons Grid */}
      <div className="p-4 flex-1 flex flex-col justify-between overflow-y-auto no-scrollbar">
        <div>
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3 font-mono">
            Tactical Crisis Intervention
          </h2>
          <div className="grid grid-cols-1 gap-2" role="group" aria-label="Crisis Trigger Scenarios">
            {crises.map((crisis) => {
              const isActive = activeCrisis.id === crisis.id;
              
              // Custom active rings based on the theme template
              let activeRingClass = 'border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900';
              if (isActive) {
                if (crisis.severity === 'Extreme') {
                  activeRingClass = 'ring-1 ring-red-500/30 bg-red-500/5 border-red-500/40';
                } else if (crisis.severity === 'Critical') {
                  activeRingClass = 'ring-1 ring-rose-500/30 bg-rose-500/5 border-rose-500/40';
                } else if (crisis.severity === 'High') {
                  activeRingClass = 'ring-1 ring-amber-500/30 bg-amber-500/5 border-amber-500/40';
                } else {
                  activeRingClass = 'ring-1 ring-emerald-500/30 bg-emerald-500/5 border-emerald-500/40';
                }
              }

              return (
                <button
                  key={crisis.id}
                  onClick={() => !isProcessing && onSelectCrisis(crisis.id)}
                  disabled={isProcessing}
                  id={`trigger-${crisis.id}`}
                  aria-label={`Inject ${crisis.title} scenario. Current severity is ${crisis.severity}`}
                  className={`w-full p-3.5 border rounded text-left group transition-all duration-300 flex items-start gap-3 relative cursor-pointer ${activeRingClass} ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="p-1 rounded bg-zinc-950 border border-zinc-800 shrink-0 mt-0.5">
                    {getCrisisIcon(crisis.id)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`text-xs font-bold tracking-wide transition-colors uppercase ${
                        isActive 
                          ? (crisis.severity === 'Extreme' || crisis.severity === 'Critical' ? 'text-rose-500' : crisis.severity === 'High' ? 'text-amber-500' : 'text-emerald-500') 
                          : 'text-zinc-200 group-hover:text-emerald-400'
                      }`}>
                        {crisis.title.replace(' & ACCESS FAILURE', '').replace(' WEST METROLINK', '').replace(' SEVERE WEATHER &', '')}
                      </span>
                      {getSeverityBadge(crisis.severity)}
                    </div>
                    {/* Explicit Track Display */}
                    <span className="text-[8px] font-mono uppercase text-emerald-500/80 tracking-wider block mb-0.5">
                      {crisis.track || 'Core System Readiness'}
                    </span>
                    <p className="text-[10px] text-zinc-500 line-clamp-1 font-sans">
                      {crisis.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between text-[9px] font-mono text-zinc-600">
          <span>SIM NODE: NY-EAST-1</span>
          <span>SYSTEM SECURITY RATIO: 98.4%</span>
        </div>
      </div>
    </div>
  );
}
