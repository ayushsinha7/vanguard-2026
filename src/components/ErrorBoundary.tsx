import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertOctagon } from 'lucide-react';

interface Props {
  children?: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Vanguard Cognitive Boundary Caught Exception:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div 
          className="h-full w-full bg-red-950/20 border border-red-900/60 rounded p-5 flex flex-col justify-center items-center text-center space-y-3 font-sans"
          role="alert"
          aria-live="assertive"
        >
          <div className="p-2 bg-red-950 border border-red-800 rounded-full text-red-400">
            <AlertOctagon className="h-6 w-6 animate-pulse" />
          </div>
          <div className="max-w-xs">
            <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-red-400">
              {this.props.fallbackTitle || 'COGNITIVE COMPONENT EXCEPTION'}
            </h3>
            <p className="text-[10px] text-zinc-400 font-mono mt-1 leading-relaxed">
              An isolated telemetry parsing error was caught. Emergency systems remain 100% active.
            </p>
          </div>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="text-[9px] font-mono px-2.5 py-1 bg-red-900/40 hover:bg-red-900/80 border border-red-700 rounded text-red-300 transition-colors cursor-pointer"
            aria-label="Recover component state"
          >
            Reset Node
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
