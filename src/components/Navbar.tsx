import React from 'react';
import { Sparkles, FileText, BookOpen, Layers, Play, ArrowLeft, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentViewMode: 'landing' | 'workspace';
  onToggleViewMode: (mode: 'landing' | 'workspace') => void;
  onSelectSample: (profileKey: string) => void;
  onOpenDocs: () => void;
  isOrchestrating: boolean;
  hasResult: boolean;
  onNewResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentViewMode,
  onToggleViewMode,
  onSelectSample,
  onOpenDocs,
  isOrchestrating,
  hasResult,
  onNewResume,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between h-16 flex-shrink-0 transition-all">
      {/* Brand Logo & Title */}
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={() => onToggleViewMode('landing')}
          className="flex items-center space-x-3 cursor-pointer text-left group"
        >
          <div className="w-9 h-9 bg-slate-950 group-hover:bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xs tracking-tight shadow-sm transition-colors">
            CR
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                CrewMyResume
              </h1>
              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 text-[10px] font-mono-code font-bold uppercase rounded-md tracking-wider">
                5-Agent DAG
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Multi-Agent Orchestration &bull; CrewAI & LangChain
            </p>
          </div>
        </button>
      </div>

      {/* Navigation View Switcher & Quick Actions */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Main View Mode Switcher Pill */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => onToggleViewMode('landing')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
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
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
              currentViewMode === 'workspace'
                ? 'bg-indigo-600 text-white shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Studio</span>
            {isOrchestrating && <span className="w-2 h-2 rounded-full bg-white animate-ping" />}
          </button>
        </div>

        {/* Sample Presets Dropdown / Quick Links */}
        <div className="hidden lg:flex items-center bg-slate-50 p-1 rounded-lg border border-slate-200 text-xs text-slate-700">
          <span className="px-2 font-semibold text-[10px] uppercase font-mono-code tracking-wider text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-600" /> Presets:
          </span>
          <button
            type="button"
            onClick={() => onSelectSample('software_engineer')}
            disabled={isOrchestrating}
            className="px-2.5 py-1 rounded hover:bg-white hover:text-indigo-600 transition-all font-medium disabled:opacity-50 cursor-pointer"
          >
            AI Engineer
          </button>
          <button
            type="button"
            onClick={() => onSelectSample('product_manager')}
            disabled={isOrchestrating}
            className="px-2.5 py-1 rounded hover:bg-white hover:text-indigo-600 transition-all font-medium disabled:opacity-50 cursor-pointer"
          >
            Product Lead
          </button>
          <button
            type="button"
            onClick={() => onSelectSample('cloud_architect')}
            disabled={isOrchestrating}
            className="px-2.5 py-1 rounded hover:bg-white hover:text-indigo-600 transition-all font-medium disabled:opacity-50 cursor-pointer"
          >
            Cloud Architect
          </button>
        </div>

        {/* Architecture Modal Button */}
        <button
          type="button"
          onClick={onOpenDocs}
          className="text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          title="Inspect DAG Architecture"
        >
          <BookOpen className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">Architecture</span>
        </button>

        {/* Edit / New Resume Action when in result mode */}
        {hasResult && currentViewMode === 'workspace' && (
          <button
            type="button"
            onClick={onNewResume}
            disabled={isOrchestrating}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-slate-100 border border-slate-200 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Edit Data</span>
          </button>
        )}
      </div>
    </header>
  );
};
