import React from 'react';
import { X, Bot, Zap, ArrowRight, CheckCircle, ShieldCheck, Layers, GitFork, Cpu } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-[#E9ECEF]">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-[#E9ECEF] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#1A1A1A] flex items-center justify-center text-white">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1A1A1A]">CrewMyResume Architecture & Orchestration</h2>
              <p className="text-xs text-[#868E96]">Multi-Agent Design with CrewAI & LangChain Principles</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded text-[#868E96] hover:text-[#1A1A1A] hover:bg-[#F1F3F5] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-[#212529] text-xs">
          {/* Section: Orchestration Workflow DAG */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-3 flex items-center gap-2">
              <GitFork className="w-3.5 h-3.5 text-[#1A1A1A]" />
              1. Multi-Agent Task Dependency Graph
            </h3>
            <div className="bg-[#F8F9FA] rounded-lg p-4 border border-[#E9ECEF] overflow-x-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-3 min-w-[650px] text-xs">
                {/* Step 1 */}
                <div className="flex-1 bg-white p-3 rounded border border-[#E9ECEF]">
                  <div className="flex items-center gap-2 font-bold text-[#1A1A1A] mb-1">
                    <span className="w-4 h-4 rounded bg-[#F1F3F5] flex items-center justify-center text-[10px]">1</span>
                    Analyzer Agent
                  </div>
                  <p className="text-[11px] text-[#868E96]">Sequential: Normalizes taxonomy & career timeline</p>
                </div>

                <ArrowRight className="w-3.5 h-3.5 text-[#868E96] shrink-0 hidden md:block" />

                {/* Step 2 Parallel */}
                <div className="flex-1 space-y-2">
                  <div className="bg-white p-2.5 rounded border border-[#E9ECEF]">
                    <div className="flex items-center gap-1.5 font-bold text-[#1A1A1A]">
                      <span className="w-4 h-4 rounded bg-[#F1F3F5] flex items-center justify-center text-[9px]">2A</span>
                      Strategist (Google XYZ)
                    </div>
                  </div>
                  <div className="bg-white p-2.5 rounded border border-[#E9ECEF]">
                    <div className="flex items-center gap-1.5 font-bold text-[#1A1A1A]">
                      <span className="w-4 h-4 rounded bg-[#F1F3F5] flex items-center justify-center text-[9px]">2B</span>
                      ATS Optimizer (Keywords)
                    </div>
                  </div>
                  <p className="text-[10px] text-center text-[#868E96] font-medium">Parallel Execution</p>
                </div>

                <ArrowRight className="w-3.5 h-3.5 text-[#868E96] shrink-0 hidden md:block" />

                {/* Step 3 */}
                <div className="flex-1 bg-white p-3 rounded border border-[#E9ECEF]">
                  <div className="flex items-center gap-2 font-bold text-[#1A1A1A] mb-1">
                    <span className="w-4 h-4 rounded bg-[#F1F3F5] flex items-center justify-center text-[10px]">3</span>
                    Designer Agent
                  </div>
                  <p className="text-[11px] text-[#868E96]">Sequential: Layout hierarchy & schema formatting</p>
                </div>

                <ArrowRight className="w-3.5 h-3.5 text-[#868E96] shrink-0 hidden md:block" />

                {/* Step 4 */}
                <div className="flex-1 bg-white p-3 rounded border border-[#E9ECEF]">
                  <div className="flex items-center gap-2 font-bold text-[#1A1A1A] mb-1">
                    <span className="w-4 h-4 rounded bg-[#F1F3F5] flex items-center justify-center text-[10px]">4</span>
                    QA Agent
                  </div>
                  <p className="text-[11px] text-[#868E96]">Verification: Tense audit, grammar & certification</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Agent Roles Table */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-3 flex items-center gap-2">
              <Bot className="w-3.5 h-3.5 text-[#1A1A1A]" />
              2. Agent Roles, Backstories & Tools
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-[#F8F9FA] rounded border border-[#E9ECEF] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1A1A1A]">Resume Analyzer Agent</span>
                  <span className="px-2 py-0.5 rounded bg-[#F1F3F5] text-[#495057] font-semibold text-[10px]">Extractor</span>
                </div>
                <p className="text-[#495057] text-[11px]">
                  <strong>Role:</strong> Principal Technical Talent Assessor.
                </p>
                <p className="text-[#868E96] text-[11px]">
                  <strong>Tools:</strong> SchemaNormalizer, SkillTaxonomyExtractor, ChronologyValidator.
                </p>
              </div>

              <div className="p-3.5 bg-[#F8F9FA] rounded border border-[#E9ECEF] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1A1A1A]">Content Strategist Agent</span>
                  <span className="px-2 py-0.5 rounded bg-[#F1F3F5] text-[#495057] font-semibold text-[10px]">Narrative</span>
                </div>
                <p className="text-[#495057] text-[11px]">
                  <strong>Role:</strong> Executive Resume Strategist & Career Coach.
                </p>
                <p className="text-[#868E96] text-[11px]">
                  <strong>Tools:</strong> GoogleXYZTransformer, ImpactQuantifier, ActiveVerbEnhancer.
                </p>
              </div>

              <div className="p-3.5 bg-[#F8F9FA] rounded border border-[#E9ECEF] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1A1A1A]">ATS Optimizer Agent</span>
                  <span className="px-2 py-0.5 rounded bg-[#F1F3F5] text-[#495057] font-semibold text-[10px]">Algorithms</span>
                </div>
                <p className="text-[#495057] text-[11px]">
                  <strong>Role:</strong> Applicant Tracking System (ATS) Specialist.
                </p>
                <p className="text-[#868E96] text-[11px]">
                  <strong>Tools:</strong> ATSScoringEngine, KeywordDensityAnalyzer, JobDescriptionParser.
                </p>
              </div>

              <div className="p-3.5 bg-[#F8F9FA] rounded border border-[#E9ECEF] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1A1A1A]">Resume Designer Agent</span>
                  <span className="px-2 py-0.5 rounded bg-[#F1F3F5] text-[#495057] font-semibold text-[10px]">Typography</span>
                </div>
                <p className="text-[#495057] text-[11px]">
                  <strong>Role:</strong> Document Layout Architect & Typographer.
                </p>
                <p className="text-[#868E96] text-[11px]">
                  <strong>Tools:</strong> LayoutFormatter, HierarchyEngine, MarkdownGenerator.
                </p>
              </div>

              <div className="p-3.5 bg-[#F8F9FA] rounded border border-[#E9ECEF] space-y-1.5 md:col-span-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1A1A1A]">Quality Assurance Agent</span>
                  <span className="px-2 py-0.5 rounded bg-[#F1F3F5] text-[#495057] font-semibold text-[10px]">Verification</span>
                </div>
                <p className="text-[#495057] text-[11px]">
                  <strong>Role:</strong> Senior Technical Recruiter & Editorial QA Lead.
                </p>
                <p className="text-[#868E96] text-[11px]">
                  <strong>Tools:</strong> GrammarConsistencyChecker, TenseAuditor, ChronologyGapValidator.
                </p>
              </div>
            </div>
          </div>

          {/* Section: Methodology & Formulas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#F8F9FA] rounded border border-[#E9ECEF]">
              <h4 className="font-bold text-[#1A1A1A] text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#1A1A1A]" />
                Google XYZ Formula Applied
              </h4>
              <p className="text-xs text-[#212529] font-medium mb-1">
                "Accomplished [X], as measured by [Y], by doing [Z]"
              </p>
              <p className="text-[11px] text-[#495057]">
                The Content Strategist agent reframes every generic task into a quantifiable business or technical achievement.
              </p>
            </div>

            <div className="p-4 bg-[#F8F9FA] rounded border border-[#E9ECEF]">
              <h4 className="font-bold text-[#1A1A1A] text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1A1A1A]" />
                ATS Keyword Algorithmic Alignment
              </h4>
              <p className="text-xs text-[#212529] font-medium mb-1">
                Vector Similarity & Token Frequency
              </p>
              <p className="text-[11px] text-[#495057]">
                Extracts top technical skills from the target Job Description and harmonizes them into experience highlights and skills taxonomies.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#F8F9FA] border-t border-[#E9ECEF] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#1A1A1A] text-white rounded text-xs font-semibold hover:bg-black transition-colors"
          >
            Close Architecture View
          </button>
        </div>
      </div>
    </div>
  );
};
