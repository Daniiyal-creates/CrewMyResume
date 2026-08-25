import React from 'react';
import { X, Bot, Zap, ArrowRight, CheckCircle, ShieldCheck, Layers, GitFork, Cpu, Brain, Layout, Award, Code2 } from 'lucide-react';
import { AGENT_SPECS } from './AgentDagVisualizer.js';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 text-slate-900">
      <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-slate-900 text-white px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">CrewMyResume Architecture & Orchestration</h2>
                <span className="text-[10px] font-mono-code font-bold uppercase px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  CrewAI + LangChain
                </span>
              </div>
              <p className="text-xs text-slate-400">Directed Acyclic Graph (DAG) with Deterministic Tool Handoffs</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8 text-slate-700 text-xs">
          {/* Section 1: DAG Flow */}
          <div>
            <h3 className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
              <GitFork className="w-4 h-4 text-indigo-600" />
              1. Multi-Agent Task Dependency Graph
            </h3>
            <div className="bg-[#0C0E14] text-white rounded-xl p-5 border border-slate-800 overflow-x-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-3 min-w-[650px] text-xs">
                {/* Step 1 */}
                <div className="flex-1 bg-[#121620] p-3.5 rounded-lg border border-blue-500/30">
                  <div className="flex items-center gap-2 font-bold text-blue-400 mb-1 font-mono-code">
                    <span className="w-4 h-4 rounded bg-blue-500/20 flex items-center justify-center text-[10px]">1</span>
                    Analyzer Agent
                  </div>
                  <p className="text-[11px] text-slate-400">Sequential: Normalizes taxonomy & career timeline into typed schema</p>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-600 shrink-0 hidden md:block" />

                {/* Step 2 Parallel */}
                <div className="flex-1 space-y-2">
                  <div className="bg-[#121620] p-2.5 rounded-lg border border-purple-500/30">
                    <div className="flex items-center gap-1.5 font-bold text-purple-400 font-mono-code text-[11px]">
                      <span className="w-4 h-4 rounded bg-purple-500/20 flex items-center justify-center text-[9px]">2A</span>
                      Strategist (Google XYZ)
                    </div>
                  </div>
                  <div className="bg-[#121620] p-2.5 rounded-lg border border-emerald-500/30">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-400 font-mono-code text-[11px]">
                      <span className="w-4 h-4 rounded bg-emerald-500/20 flex items-center justify-center text-[9px]">2B</span>
                      ATS Optimizer (Keywords)
                    </div>
                  </div>
                  <p className="text-[10px] text-center text-slate-400 font-mono-code font-bold uppercase">Parallel Execution</p>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-600 shrink-0 hidden md:block" />

                {/* Step 3 */}
                <div className="flex-1 bg-[#121620] p-3.5 rounded-lg border border-amber-500/30">
                  <div className="flex items-center gap-2 font-bold text-amber-400 mb-1 font-mono-code">
                    <span className="w-4 h-4 rounded bg-amber-500/20 flex items-center justify-center text-[10px]">3</span>
                    Designer Agent
                  </div>
                  <p className="text-[11px] text-slate-400">Sequential: Layout hierarchy, typography & schema formatting</p>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-600 shrink-0 hidden md:block" />

                {/* Step 4 */}
                <div className="flex-1 bg-[#121620] p-3.5 rounded-lg border border-rose-500/30">
                  <div className="flex items-center gap-2 font-bold text-rose-400 mb-1 font-mono-code">
                    <span className="w-4 h-4 rounded bg-rose-500/20 flex items-center justify-center text-[10px]">4</span>
                    QA Agent
                  </div>
                  <p className="text-[11px] text-slate-400">Verification: Tense audit, grammar harmony & certification</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Agent Specs Grid */}
          <div>
            <h3 className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
              <Bot className="w-4 h-4 text-indigo-600" />
              2. Agent Roles, Directives & Named Tools
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {AGENT_SPECS.map((agent) => {
                const Icon = agent.icon;
                return (
                  <div key={agent.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-indigo-600" />
                        <span className="font-bold text-slate-900 font-mono-code">{agent.name}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-white text-slate-700 font-semibold text-[10px] font-mono-code border border-slate-200">
                        {agent.codename}
                      </span>
                    </div>
                    <p className="text-slate-600 text-xs">
                      <strong>Role:</strong> {agent.role}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {agent.tools.map((t, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-white text-indigo-900 border border-indigo-200 font-mono-code text-[10px]">
                          ⚡ {t}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Google XYZ Formula */}
          <div className="p-5 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-2">
            <h4 className="font-bold text-indigo-950 font-mono-code text-xs uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-600" />
              3. The Google XYZ Formula Implementation
            </h4>
            <p className="text-slate-700 text-xs leading-relaxed">
              Every bullet point produced by the <strong>Content Strategist Agent</strong> strictly adheres to the standard established by Laszlo Bock (former VP of People Operations at Google):
            </p>
            <div className="p-3 bg-white rounded-lg border border-indigo-200 font-mono-code text-xs text-indigo-900 font-semibold">
              &quot;Accomplished [X], as measured by [Y], by doing [Z]&quot;
            </div>
            <p className="text-[11px] text-slate-500">
              Where [X] is the business or technical outcome, [Y] is the quantitative baseline metric (%, $, ms, users), and [Z] is the specific methodology, tools, and technical leadership applied.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-black transition-colors cursor-pointer"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
};
