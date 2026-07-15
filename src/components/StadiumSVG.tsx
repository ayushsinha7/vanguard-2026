import React, { useState, memo } from 'react';
import { StadiumZone, SeverityLevel } from '../types';

interface StadiumSVGProps {
  activeZone: StadiumZone;
  activeSeverity: SeverityLevel;
}

interface SectorStats {
  occupancy: string;
  gates: string;
  temp: string;
  load: string;
}

const SECTOR_GATE_MAPPING: Record<string, string> = {
  North: 'N1 - N6',
  South: 'S1 - S6',
  East: 'E1 - E8',
  West: 'W1 - W6'
};

const SECTOR_BASE_OCCUPANCY: Record<string, string> = {
  North: '94%',
  South: '91%',
  East: '96%',
  West: '89%'
};

function StadiumSVGComponent({ activeZone, activeSeverity }: StadiumSVGProps) {
  const [hoveredSector, setHoveredSector] = useState<StadiumZone>('None');

  const getSectorStats = React.useCallback((zone: StadiumZone): SectorStats => {
    if (zone === 'None') return { occupancy: '--', gates: '--', temp: '--', load: '--' };
    
    const baseOcc = SECTOR_BASE_OCCUPANCY[zone] || '--';
    const gates = SECTOR_GATE_MAPPING[zone] || '--';
    const isExtreme = activeSeverity === 'Extreme';
    const temp = isExtreme ? '65°F' : '72°F';
    
    let occupancy = baseOcc;
    let load = 'Optimal';
    
    if (zone === 'East') {
      occupancy = activeZone === 'East' ? '128% [OVERLOAD]' : '96%';
      load = activeZone === 'East' ? 'CRITICAL SURGE' : 'Optimal';
    } else if (zone === 'West') {
      occupancy = activeZone === 'West' ? '114% [CONGESTED]' : '89%';
      load = activeZone === 'West' ? 'GRIDLOCK RISK' : 'Optimal';
    } else if (zone === 'North' || zone === 'South') {
      load = 'Nominal';
    }
    
    return { occupancy, gates, temp, load };
  }, [activeZone, activeSeverity]);

  const getStandClass = React.useCallback((zone: StadiumZone) => {
    const isTarget = activeZone === zone || (activeSeverity === 'Extreme' && (zone === 'North' || zone === 'South' || zone === 'East' || zone === 'West'));
    
    if (!isTarget) {
      return 'fill-zinc-900/60 stroke-emerald-500/20 hover:fill-zinc-800 hover:stroke-emerald-500/50 cursor-pointer transition-all duration-300';
    }

    switch (activeSeverity) {
      case 'Extreme':
        return 'animate-pulse-red stroke-red-500 fill-red-950/20 cursor-pointer transition-all duration-300';
      case 'Critical':
        return 'animate-pulse-red stroke-rose-500 fill-rose-950/20 cursor-pointer transition-all duration-300';
      case 'High':
        return 'animate-pulse-amber stroke-amber-500 fill-amber-950/20 cursor-pointer transition-all duration-300';
      default:
        return 'animate-pulse-green stroke-emerald-500 fill-emerald-950/20 cursor-pointer transition-all duration-300';
    }
  }, [activeZone, activeSeverity]);

  const currentStats = hoveredSector !== 'None' ? getSectorStats(hoveredSector) : null;

  return (
    <div 
      id="stadium-telemetry-panel" 
      className="relative flex flex-col items-center justify-between w-full h-full bg-zinc-950 border border-zinc-800 p-5 overflow-hidden"
      role="region"
      aria-labelledby="stadium-map-heading"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent animate-scanline pointer-events-none" />

      {/* Header Info */}
      <div className="relative w-full flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <h3 id="stadium-map-heading" className="font-display text-xs font-bold tracking-wider text-zinc-300 uppercase">
            Spatial Telemetry Map
          </h3>
        </div>
        <span className="font-mono text-[9px] text-zinc-500 tracking-wider">SCHEMA NODE v4.2.0</span>
      </div>

      {/* SVG Container */}
      <div className="relative w-full flex-1 flex items-center justify-center my-2 min-h-[200px] max-h-[380px] z-10">
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full max-w-[320px]"
          id="stadium-vector-canvas"
          role="img"
          aria-label={`Interactive stadium map. Currently active zone alert: ${activeZone}. Level: ${activeSeverity}.`}
        >
          {/* Radar circle grids */}
          <circle cx="250" cy="250" r="230" fill="none" stroke="rgba(39, 39, 42, 0.4)" strokeWidth="1" />
          <circle cx="250" cy="250" r="180" fill="none" stroke="rgba(39, 39, 42, 0.3)" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="250" cy="250" r="130" fill="none" stroke="rgba(39, 39, 42, 0.2)" strokeWidth="1" />
          
          {/* Axis markers */}
          <line x1="250" y1="20" x2="250" y2="480" stroke="rgba(39, 39, 42, 0.2)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="20" y1="250" x2="480" y2="250" stroke="rgba(39, 39, 42, 0.2)" strokeWidth="1" strokeDasharray="3 3" />

          {/* Playing Field / Pitch */}
          <g transform="rotate(45 250 250)">
            <rect x="180" y="140" width="140" height="220" rx="4" fill="rgba(9, 9, 11, 0.85)" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="1.5" />
            <rect x="190" y="150" width="120" height="200" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
            <line x1="190" y1="250" x2="310" y2="250" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
            <circle cx="250" cy="250" r="30" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
          </g>

          {/* NORTH STAND */}
          <path
            id="stand-north"
            d="M 140,110 C 210,60 290,60 360,110 L 320,165 C 280,135 220,135 180,165 Z"
            className={getStandClass('North')}
            onMouseEnter={() => setHoveredSector('North')}
            onMouseLeave={() => setHoveredSector('None')}
            tabIndex={0}
            role="button"
            aria-label="North Stand Sector Details"
          />
          
          {/* EAST STAND */}
          <path
            id="stand-east"
            d="M 390,140 C 440,210 440,290 390,360 L 335,320 C 365,280 365,220 335,180 Z"
            className={getStandClass('East')}
            onMouseEnter={() => setHoveredSector('East')}
            onMouseLeave={() => setHoveredSector('None')}
            tabIndex={0}
            role="button"
            aria-label="East Stand Sector Details"
          />

          {/* SOUTH STAND */}
          <path
            id="stand-south"
            d="M 360,390 C 290,440 210,440 140,390 L 180,335 C 220,365 280,365 320,335 Z"
            className={getStandClass('South')}
            onMouseEnter={() => setHoveredSector('South')}
            onMouseLeave={() => setHoveredSector('None')}
            tabIndex={0}
            role="button"
            aria-label="South Stand Sector Details"
          />

          {/* WEST STAND */}
          <path
            id="stand-west"
            d="M 110,360 C 60,290 60,210 110,140 L 165,180 C 135,220 135,280 165,320 Z"
            className={getStandClass('West')}
            onMouseEnter={() => setHoveredSector('West')}
            onMouseLeave={() => setHoveredSector('None')}
            tabIndex={0}
            role="button"
            aria-label="West Stand Sector Details"
          />

          {/* Overlay Text Indicators */}
          <text x="250" y="85" textAnchor="middle" className="fill-zinc-500 font-display font-bold text-[10px] tracking-widest pointer-events-none uppercase">
            NORTH
          </text>
          <text x="415" y="255" textAnchor="middle" className="fill-zinc-500 font-display font-bold text-[10px] tracking-widest pointer-events-none uppercase">
            EAST
          </text>
          <text x="250" y="430" textAnchor="middle" className="fill-zinc-500 font-display font-bold text-[10px] tracking-widest pointer-events-none uppercase">
            SOUTH
          </text>
          <text x="85" y="255" textAnchor="middle" className="fill-zinc-500 font-display font-bold text-[10px] tracking-widest pointer-events-none uppercase">
            WEST
          </text>
        </svg>

        {/* Hover overlay cards */}
        {currentStats && hoveredSector !== 'None' && (
          <div 
            className="absolute bottom-2 left-2 right-2 bg-zinc-900/95 border border-zinc-800 rounded px-3 py-2 z-20 pointer-events-none flex justify-between text-xs backdrop-blur"
            role="status"
            aria-live="polite"
          >
            <div>
              <span className="text-zinc-500 block uppercase text-[9px] tracking-widest font-semibold font-mono">SECTOR</span>
              <span className="text-zinc-200 font-bold font-display uppercase">{hoveredSector} ZONE</span>
            </div>
            <div className="text-right">
              <span className="text-zinc-500 block uppercase text-[9px] tracking-widest font-semibold font-mono">OCCUPANCY / ACCESS</span>
              <span className="text-zinc-200 font-mono font-medium">
                {currentStats.occupancy} | {currentStats.gates}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Stand Legend */}
      <div 
        className="relative w-full grid grid-cols-4 gap-1.5 border-t border-zinc-800/60 pt-4 z-10 text-[9px] font-mono"
        role="status"
        aria-label="Sector alert status matrix"
      >
        <div className="flex flex-col items-center border-r border-zinc-900">
          <span className="text-zinc-500 uppercase tracking-wider">N-STAND</span>
          <span className={`font-bold mt-1.5 ${(activeSeverity === 'Extreme') ? 'text-rose-500' : 'text-emerald-500'}`}>
            {(activeSeverity === 'Extreme') ? 'SHELTER' : 'NOMINAL'}
          </span>
        </div>
        <div className="flex flex-col items-center border-r border-zinc-900">
          <span className="text-zinc-500 uppercase tracking-wider">E-STAND</span>
          <span className={`font-bold mt-1.5 ${(activeZone === 'East') ? 'text-rose-500 animate-pulse' : (activeSeverity === 'Extreme') ? 'text-rose-500' : 'text-emerald-500'}`}>
            {(activeZone === 'East') ? 'CRITICAL' : (activeSeverity === 'Extreme') ? 'SHELTER' : 'NOMINAL'}
          </span>
        </div>
        <div className="flex flex-col items-center border-r border-zinc-900">
          <span className="text-zinc-500 uppercase tracking-wider">S-STAND</span>
          <span className={`font-bold mt-1.5 ${(activeSeverity === 'Extreme') ? 'text-rose-500' : 'text-emerald-500'}`}>
            {(activeSeverity === 'Extreme') ? 'SHELTER' : 'NOMINAL'}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-zinc-500 uppercase tracking-wider">W-STAND</span>
          <span className={`font-bold mt-1.5 ${(activeZone === 'West') ? 'text-amber-500 animate-pulse' : (activeSeverity === 'Extreme') ? 'text-rose-500' : 'text-emerald-500'}`}>
            {(activeZone === 'West') ? 'WARNING' : (activeSeverity === 'Extreme') ? 'SHELTER' : 'NOMINAL'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(StadiumSVGComponent);
