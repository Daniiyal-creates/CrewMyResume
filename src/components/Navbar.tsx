import React from 'react';
import { FileText } from 'lucide-react';

interface NavbarProps {
  currentViewMode: 'landing' | 'workspace';
  onToggleViewMode: (mode: 'landing' | 'workspace') => void;
  isOrchestrating: boolean;
  hasResult: boolean;
  onNewResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentViewMode,
  onToggleViewMode,
  isOrchestrating,
  hasResult,
  onNewResume,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between h-[4.5rem] flex-shrink-0">
      {/* Brand Logo & Title */}
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={() => onToggleViewMode('landing')}
          className="flex items-center space-x-3 cursor-pointer text-left group"
        >
          <div className="w-9 h-9 bg-emerald-700 group-hover:bg-emerald-800 rounded-xl flex items-center justify-center text-white shadow-sm transition-colors">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                CrewMyResume
              </h1>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              A simpler way to make your next resume
            </p>
          </div>
        </button>
      </div>

      {/* Navigation View Switcher & Quick Actions */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Main View Mode Switcher Pill */}
        <div className="flex items-center gap-2 text-sm font-semibold">
          <button
            type="button"
            onClick={() => onToggleViewMode('landing')}
            className={`px-3 py-2 rounded-lg transition-all cursor-pointer ${
              currentViewMode === 'landing'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => onToggleViewMode('workspace')}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              currentViewMode === 'workspace'
                ? 'bg-emerald-700 text-white shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Studio</span>
            {isOrchestrating && <span className="w-2 h-2 rounded-full bg-white animate-ping" />}
          </button>
        </div>

        {/* Edit / New Resume Action when in result mode */}
        {hasResult && currentViewMode === 'workspace' && (
          <button
            type="button"
            onClick={onNewResume}
            disabled={isOrchestrating}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-slate-100 border border-slate-200 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Edit resume</span>
          </button>
        )}
      </div>
    </header>
  );
};
