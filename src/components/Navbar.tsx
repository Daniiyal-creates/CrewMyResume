import React from 'react';
import { Sparkles, FileText, BookOpen } from 'lucide-react';

interface NavbarProps {
  onSelectSample: (profileKey: string) => void;
  onOpenDocs: () => void;
  isOrchestrating: boolean;
  hasResult: boolean;
  onNewResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectSample,
  onOpenDocs,
  isOrchestrating,
  hasResult,
  onNewResume,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E9ECEF] px-4 sm:px-8 flex items-center justify-between h-16 flex-shrink-0">
      {/* Brand Logo & Tag */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-[#000000] rounded flex items-center justify-center text-white font-bold text-xs tracking-tight shadow-xs">
          CR
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-semibold tracking-tight text-[#1A1A1A]">
              CrewMyResume
            </h1>
            <span className="px-2 py-0.5 bg-[#F1F3F5] text-[#495057] text-[10px] font-bold uppercase rounded tracking-wider">
              v1.0-MVP
            </span>
          </div>
          <p className="text-[11px] text-[#868E96] hidden sm:block">
            Autonomous 5-Agent Pipeline & ATS Optimizer
          </p>
        </div>
      </div>

      {/* Quick Actions & Samples */}
      <div className="flex items-center space-x-3">
        {/* Sample Profile Presets */}
        <div className="hidden md:flex items-center bg-[#F8F9FA] p-1 rounded border border-[#E9ECEF] text-xs text-[#495057]">
          <span className="px-2 font-semibold text-[11px] uppercase tracking-wider text-[#868E96] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#1A1A1A]" /> Presets:
          </span>
          <button
            type="button"
            onClick={() => onSelectSample('software_engineer')}
            disabled={isOrchestrating}
            className="px-2.5 py-1 rounded text-[#495057] hover:text-[#1A1A1A] hover:bg-white transition-all font-medium disabled:opacity-50"
          >
            AI Engineer
          </button>
          <button
            type="button"
            onClick={() => onSelectSample('product_manager')}
            disabled={isOrchestrating}
            className="px-2.5 py-1 rounded text-[#495057] hover:text-[#1A1A1A] hover:bg-white transition-all font-medium disabled:opacity-50"
          >
            Product Lead
          </button>
        </div>

        <button
          type="button"
          onClick={onOpenDocs}
          className="text-xs sm:text-sm font-medium text-[#495057] hover:text-[#1A1A1A] px-3 py-1.5 rounded transition-colors inline-flex items-center gap-1.5"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Architecture</span>
        </button>

        {hasResult && (
          <button
            type="button"
            onClick={onNewResume}
            disabled={isOrchestrating}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#1A1A1A] bg-[#F1F3F5] border border-[#E9ECEF] rounded hover:bg-[#E9ECEF] transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Edit Input</span>
          </button>
        )}
      </div>
    </header>
  );
};
