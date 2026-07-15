import React, { useState } from 'react';
import { Crisis } from '../types';
import { Brain, Copy, Check, Layers, Globe } from 'lucide-react';
import ErrorBoundary from './ErrorBoundary';

interface DecisionEngineProps {
  activeCrisis: Crisis;
  isProcessing: boolean;
  systemPrompt: string;
  onUpdateSystemPrompt: (prompt: string) => void;
}

export default function DecisionEngine({
  activeCrisis,
  isProcessing,
  systemPrompt,
  onUpdateSystemPrompt
}: DecisionEngineProps) {
  const [activeTab, setActiveTab] = useState<'matrix' | 'prompt'>('matrix');
  const [copiedLang, setCopiedLang] = useState<string | null>(null);
  const [isPromptSaved, setIsPromptSaved] = useState(false);

  const handleCopy = (text: string, lang: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLang(lang);
    setTimeout(() => setCopiedLang(null), 2000);
  };

  const handleSavePrompt = () => {
    setIsPromptSaved(true);
    setTimeout(() => setIsPromptSaved(false), 2000);
  };

  // Determine threat indicator styling
  const isNormal = activeCrisis.id === 'nom_001';
  const themeAccentColor = isNormal ? 'text-emerald-500' : 'text-rose-500';
  const themeDotColor = isNormal ? 'bg-emerald-500' : 'bg-rose-500';

  return (
    <div id="ai-decision-panel" className="h-full bg-zinc-900 border border-zinc-800 flex flex-col overflow-hidden" role="region" aria-label="AI Decision Engine">
      {/* Header and Mode Selector */}
      <div className="flex items-center justify-between border-b border-zinc-800/60 px-5 py-3.5 shrink-0 bg-zinc-950/20">
        <div className="flex items-center gap-2.5">
          <Brain className={`h-4.5 w-4.5 ${isNormal ? 'text-emerald-400' : 'text-rose-400'} animate-pulse`} />
          <div>
            <h2 className="font-display text-xs font-bold tracking-widest text-zinc-200 uppercase">
              COGNITIVE ACTION NETWORK
            </h2>
            <div className="text-[9px] font-mono text-zinc-500 flex items-center gap-1.5 mt-0.5">
              <span>PRO-NODE v4.2.0</span>
              <span>•</span>
              <span>LATENCY: 1.48s</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 bg-zinc-950 border border-zinc-800 rounded-lg p-0.5 text-[10px] font-mono">
          <button
            onClick={() => setActiveTab('matrix')}
            id="tab-btn-matrix"
            aria-label="View current crisis Decision Matrix"
            aria-selected={activeTab === 'matrix'}
            className={`px-3 py-1 rounded transition-all duration-200 cursor-pointer ${
              activeTab === 'matrix' ? 'bg-zinc-800 text-zinc-100 font-bold' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            DECISION MATRIX
          </button>
          <button
            onClick={() => setActiveTab('prompt')}
            id="tab-btn-prompt"
            aria-label="View system design instructions and prompt configuration"
            aria-selected={activeTab === 'prompt'}
            className={`px-3 py-1 rounded transition-all duration-200 cursor-pointer ${
              activeTab === 'prompt' ? 'bg-zinc-800 text-zinc-100 font-bold' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            SYSTEM PROMPT
          </button>
        </div>
      </div>

      {/* Main Content Viewport */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative min-h-0 select-text bg-zinc-950/10">
        <ErrorBoundary fallbackTitle="COGNITIVE PANEL TIMEOUT">
          {isProcessing ? (
            /* SKELETON PROCESSOR */
            <div id="ai-skeleton-loader" className="h-full flex flex-col justify-center items-center py-6 space-y-3" role="status" aria-live="polite">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-10 h-10 rounded-full border border-emerald-500/10 animate-ping" />
                <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
                <Brain className="absolute h-4 w-4 text-emerald-400 animate-pulse" />
              </div>
              <div className="text-center max-w-xs">
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest animate-pulse block">
                  REASONING & TOKEN SYNTHESIS...
                </span>
                <p className="text-[9px] text-zinc-500 font-mono mt-1 leading-relaxed">
                  Interpreting turnstile queue velocities, assessing structural crowd pressure variables, and preparing multi-lingual warning matrices.
                </p>
              </div>
            </div>
          ) : activeTab === 'matrix' ? (
            /* MAIN BENTO LAYOUT */
            <div id="decision-matrix-grid" className="flex h-full min-h-0" role="status" aria-live="polite">
              
              {/* BENTO CARD 1: Threat Assessment Matrix (25% width) */}
              <div className="w-1/4 border-r border-zinc-800 p-4 flex flex-col justify-between shrink-0" role="region" aria-label="Incident risk telemetry stats">
                <div>
                  <div className={`text-xs font-bold ${themeAccentColor} mb-3.5 flex items-center gap-2 tracking-wider uppercase font-display`}>
                    <div className={`w-1.5 h-1.5 ${themeDotColor} rounded-full ${isNormal ? '' : 'animate-pulse'}`}></div>
                    THREAT MATRIX
                  </div>
                  
                  <div className="space-y-3">
                    {/* Danger Index */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-mono">Danger Index</span>
                        <span className={`text-xs font-mono font-bold ${isNormal ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {(activeCrisis.dangerIndex / 10).toFixed(1)} / 10.0
                        </span>
                      </div>
                      {/* Progress Bar */}
                      <div className="w-full h-1 bg-zinc-800/80 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-700 ${isNormal ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                          style={{ width: `${activeCrisis.dangerIndex}%` }} 
                        />
                      </div>
                    </div>

                    {/* Risk Level */}
                    <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5">
                      <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-mono">Risk Level</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold uppercase ${
                        activeCrisis.severity === 'Extreme' ? 'bg-red-950 text-red-400 border border-red-900/30' :
                        activeCrisis.severity === 'Critical' ? 'bg-rose-950 text-rose-400 border border-rose-900/30' :
                        activeCrisis.severity === 'High' ? 'bg-amber-950 text-amber-400 border border-amber-900/30' : 
                        'bg-emerald-950 text-emerald-400 border border-emerald-900/30'
                      }`}>
                        {activeCrisis.severity}
                      </span>
                    </div>

                    {/* Confidence Score */}
                    <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5">
                      <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-mono">Confidence</span>
                      <span className="text-xs font-mono font-semibold text-zinc-300">{activeCrisis.confidenceScore}.0%</span>
                    </div>

                    {/* Active Track Section */}
                    <div className="pt-1">
                      <span className="text-[8px] text-zinc-500 uppercase tracking-widest font-mono block mb-1">EVALUATION TRACK</span>
                      <span className="text-[9px] px-2 py-1 bg-zinc-900 border border-zinc-800 rounded font-mono font-bold text-emerald-400 block tracking-wide uppercase truncate">
                        {activeCrisis.track || 'Core System Readiness'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI Reasoning Textbox */}
                <div className="mt-3 pt-2.5 border-t border-zinc-900">
                  <span className="text-[8px] font-mono font-semibold text-zinc-500 uppercase tracking-widest block mb-1">
                    COGNITIVE EXPLANATION
                  </span>
                  <p className="text-[10px] leading-relaxed text-zinc-400 font-sans italic line-clamp-3">
                    "{activeCrisis.aiReasoning}"
                  </p>
                </div>
              </div>

              {/* BENTO CARD 2: Dynamic Directives (Remaining space minus warning engine) */}
              <div className="flex-1 border-r border-zinc-800 p-4 flex flex-col min-w-0" role="region" aria-label="Operational tactical directives">
                <div className="text-[9px] font-bold text-zinc-400 mb-3 flex items-center gap-2 uppercase tracking-widest font-mono">
                  <Layers className="h-3 w-3 text-zinc-500" />
                  Operational Directives
                </div>
                
                <ul className="space-y-3 overflow-y-auto no-scrollbar flex-1">
                  {activeCrisis.directives.map((directive, index) => {
                    const splitIndex = directive.indexOf(':');
                    const hasTitle = splitIndex !== -1;
                    const title = hasTitle ? directive.substring(0, splitIndex) : '';
                    const body = hasTitle ? directive.substring(splitIndex + 1) : directive;

                    const badgeBg = isNormal ? 'bg-zinc-800 text-zinc-400 border-zinc-700' : 'bg-rose-950/40 text-rose-400 border-rose-500/30';

                    return (
                      <li key={index} className="flex items-start gap-3">
                        <span className={`flex-shrink-0 w-4 h-4 rounded text-[9px] font-bold font-mono flex items-center justify-center border ${badgeBg}`}>
                          0{index + 1}
                        </span>
                        <p className="text-xs text-zinc-300 leading-snug">
                          {hasTitle ? (
                            <>
                              <span className="font-bold text-zinc-100 uppercase mr-1">{title}:</span>
                              {body}
                            </>
                          ) : directive}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* BENTO CARD 3: Multilingual Broadcast (33% width) */}
              <div className="w-1/3 p-4 bg-zinc-950/50 flex flex-col shrink-0 min-w-[240px]" role="region" aria-label="Multilingual broadcase system">
                <div className="text-[9px] font-bold text-zinc-400 mb-3 uppercase tracking-widest font-mono flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Globe className="h-3 w-3 text-zinc-500" />
                    Broadcast Warning Engine
                  </span>
                </div>

                {/* Language Warnings block */}
                <div className="space-y-2.5 overflow-y-auto no-scrollbar flex-1">
                  {/* EN */}
                  <div className="p-2 bg-zinc-900 rounded border-l-2 border-emerald-500 relative group">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-[8px] text-zinc-500 uppercase font-bold font-mono">EN (Primary)</span>
                      <button 
                        onClick={() => handleCopy(activeCrisis.translations.en, 'en')}
                        className="opacity-0 group-hover:opacity-100 text-[8px] font-mono text-zinc-500 hover:text-zinc-300 transition-opacity cursor-pointer"
                        aria-label="Copy English spectator alert text"
                      >
                        {copiedLang === 'en' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-[10px] text-zinc-200 italic leading-relaxed">
                      "{activeCrisis.translations.en}"
                    </p>
                  </div>

                  {/* ES */}
                  <div className="p-2 bg-zinc-900 rounded border-l-2 border-zinc-700 relative group">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-[8px] text-zinc-500 uppercase font-bold font-mono">ES (Spanish)</span>
                      <button 
                        onClick={() => handleCopy(activeCrisis.translations.es, 'es')}
                        className="opacity-0 group-hover:opacity-100 text-[8px] font-mono text-zinc-500 hover:text-zinc-300 transition-opacity cursor-pointer"
                        aria-label="Copy Spanish spectator alert text"
                      >
                        {copiedLang === 'es' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-[10px] text-zinc-400 italic leading-relaxed">
                      "{activeCrisis.translations.es}"
                    </p>
                  </div>

                  {/* FR */}
                  <div className="p-2 bg-zinc-900 rounded border-l-2 border-zinc-700 relative group">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-[8px] text-zinc-500 uppercase font-bold font-mono">FR (French)</span>
                      <button 
                        onClick={() => handleCopy(activeCrisis.translations.fr, 'fr')}
                        className="opacity-0 group-hover:opacity-100 text-[8px] font-mono text-zinc-500 hover:text-zinc-300 transition-opacity cursor-pointer"
                        aria-label="Copy French spectator alert text"
                      >
                        {copiedLang === 'fr' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-[10px] text-zinc-400 italic leading-relaxed">
                      "{activeCrisis.translations.fr}"
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* SYSTEM PROMPT PLAYGROUND */
            <div id="prompt-playground" className="flex flex-col h-full space-y-2.5 p-4 bg-zinc-950/30">
              <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-[10px]">
                <span className="text-zinc-400 font-sans leading-tight">
                  Modify or copy the system schema templates for the live backend context in AI Studio.
                </span>
                <button
                  onClick={() => handleCopy(systemPrompt, 'prompt_full')}
                  className="bg-emerald-950/60 hover:bg-emerald-950 text-emerald-400 border border-emerald-800/40 px-2 py-0.5 rounded font-mono font-medium flex items-center gap-1 cursor-pointer transition-colors"
                  aria-label="Copy entire Gemini 1.5 Pro system prompt block"
                >
                  {copiedLang === 'prompt_full' ? 'Copied' : 'Copy Prompt'}
                </button>
              </div>
              
              <div className="flex-1 relative min-h-[110px]">
                <textarea
                  value={systemPrompt}
                  onChange={(e) => onUpdateSystemPrompt(e.target.value)}
                  className="w-full h-full bg-zinc-950 border border-zinc-800/80 rounded p-3 font-mono text-[10px] text-zinc-300 leading-relaxed focus:outline-none focus:border-zinc-700 resize-none no-scrollbar"
                  id="system-prompt-textarea"
                  aria-label="Gemini System Prompt Content Box"
                  placeholder="Paste or write the cognitive system prompt template here..."
                />
              </div>

              <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500">
                <span>PROMPT SIZE: ~254 words</span>
                <button
                  onClick={handleSavePrompt}
                  className="text-[10px] bg-zinc-900 hover:bg-zinc-800 text-zinc-300 px-3 py-1 border border-zinc-800 rounded font-mono cursor-pointer transition-colors"
                  aria-label="Save changes to local prompt cache"
                  id="save-prompt-playground"
                >
                  {isPromptSaved ? 'Saved Locally ✓' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}
        </ErrorBoundary>
      </div>
    </div>
  );
}
