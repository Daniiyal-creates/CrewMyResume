import React, { useState } from 'react';
import { AgentRoleType, AgentStatus, AgentLog } from '../types.js';
import {
  Brain,
  Wrench,
  ArrowRightLeft,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Terminal,
  Cpu,
  Zap,
  ShieldCheck,
  Layout,
  Award,
} from 'lucide-react';

interface AgentWorkflowBoardProps {
  agentStatuses: Record<AgentRoleType, AgentStatus>;
  logs: AgentLog[];
  isOrchestrating: boolean;
  totalTimeMs?: number;
}

const AGENT_META: {
  id: AgentRoleType;
  step: string;
  name: string;
  codename: string;
  icon: React.ElementType;
}[] = [
  { id: 'analyzer', step: '01', name: 'Resume Analyzer', codename: 'Extractor', icon: Brain },
  { id: 'strategist', step: '02A', name: 'Content Strategist', codename: 'Narrative (Google XYZ)', icon: Zap },
  { id: 'ats_optimizer', step: '02B', name: 'ATS Optimizer', codename: 'Keywords & Match', icon: ShieldCheck },
  { id: 'designer', step: '03', name: 'Resume Designer', codename: 'Layout & Typography', icon: Layout },
  { id: 'qa', step: '04', name: 'QA Verifier', codename: 'Recruiter Audit', icon: Award },
];

export const AgentWorkflowBoard: React.FC<AgentWorkflowBoardProps> = ({
  agentStatuses,
  logs,
  isOrchestrating,
  totalTimeMs,
}) => {
  const [selectedAgent, setSelectedAgent] = useState<AgentRoleType | 'all'>('all');
  const [logFilter, setLogFilter] = useState<'all' | 'thought' | 'tool_call' | 'handoff'>('all');
  const [isLogExpanded, setIsLogExpanded] = useState(true);

  const filteredLogs = logs.filter((log) => {
    const matchesAgent = selectedAgent === 'all' || log.agentId === selectedAgent;
    const matchesType = logFilter === 'all' || log.type === logFilter;
    return matchesAgent && matchesType;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
      {/* Header bar */}
      <div className="px-6 py-4 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold text-xs shadow-xs">
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono-code">
                Multi-Agent Autonomous Pipeline
              </h2>
              {isOrchestrating ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Live Agents Active
                </span>
              ) : logs.length > 0 ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  All 5 Agents Completed
                </span>
              ) : (
                <span className="text-[11px] text-slate-400 font-mono-code">Ready to Execute</span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              1. Extractor &rarr; [2A. Google XYZ + 2B. ATS Keywords] &rarr; 3. Designer &rarr; 4. QA Recruiter Audit
            </p>
          </div>
        </div>

        {totalTimeMs ? (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-lg text-xs font-mono-code font-medium text-slate-700 border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Execution Latency: {(totalTimeMs / 1000).toFixed(2)}s</span>
          </div>
        ) : null}
      </div>

      {/* Visual Agent Pipeline Cards Grid */}
      <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {AGENT_META.map((meta) => {
            const status = agentStatuses[meta.id];
            const isSelected = selectedAgent === meta.id;
            const isCompleted = status?.status === 'completed';
            const isRunning = status?.status === 'running';
            const Icon = meta.icon;

            return (
              <button
                key={meta.id}
                type="button"
                onClick={() => setSelectedAgent(selectedAgent === meta.id ? 'all' : meta.id)}
                className={`relative text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'ring-2 ring-emerald-700 bg-white shadow-sm'
                    : isRunning
                    ? 'border-emerald-400 bg-emerald-50/70 text-emerald-950 shadow-xs'
                    : isCompleted
                    ? 'border-slate-200 bg-white hover:border-slate-300'
                    : 'border-slate-200 bg-white/70 opacity-70 hover:opacity-100 hover:border-slate-300'
                }`}
              >
                {/* Status indicator row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center text-white ${
                        isCompleted
                          ? 'bg-emerald-600'
                          : isRunning
                          ? 'bg-emerald-700 animate-pulse'
                          : 'bg-slate-300 text-slate-700'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {meta.name.replace(' Agent', '')}
                    </span>
                  </div>

                  <span
                    className={`text-[9px] font-mono-code font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      isCompleted
                        ? 'bg-emerald-50 text-emerald-700'
                        : isRunning
                        ? 'bg-emerald-100 text-emerald-800 animate-pulse'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {isCompleted ? 'DONE' : isRunning ? 'RUNNING' : 'WAIT'}
                  </span>
                </div>

                {/* Agent Role / Goal summary */}
                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                  {status?.thoughtSummary || status?.goal}
                </p>

                {/* Execution time badge */}
                {status?.executionTimeMs ? (
                  <div className="text-[10px] font-mono-code text-slate-500 mt-2 flex items-center gap-1">
                    <span>⚡</span>
                    <span>{status.executionTimeMs}ms</span>
                  </div>
                ) : null}

                {/* Running progress bar */}
                {isRunning && (
                  <div className="w-full bg-emerald-100 h-1 rounded-full overflow-hidden mt-2">
                    <div className="bg-emerald-700 h-full w-2/3 animate-pulse" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Real-time Agent Log Stream & Thought Trace */}
      <div className="p-4 bg-[#0C0E14] text-slate-200">
        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-slate-200 tracking-wider uppercase font-mono-code text-[11px]">
              Agent Thought Stream & Handoff Trace
            </span>
            <span className="text-slate-500 font-mono-code text-[10px]">
              ({filteredLogs.length} events)
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Filter pills */}
            <div className="flex items-center bg-[#161B28] rounded-lg p-0.5 text-[10px] font-medium border border-[#2B354C]">
              {(['all', 'thought', 'tool_call', 'handoff'] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setLogFilter(filter)}
                  className={`px-2 py-0.5 rounded uppercase tracking-wider font-mono-code transition-colors cursor-pointer ${
                    logFilter === filter ? 'bg-emerald-700 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {filter.replace('_', ' ')}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsLogExpanded(!isLogExpanded)}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {isLogExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {isLogExpanded && (
          <div className="max-h-52 overflow-y-auto space-y-1.5 font-mono-code text-xs pr-1 scrollbar-thin">
            {filteredLogs.length === 0 ? (
              <div className="py-6 text-center text-slate-500 text-xs">
                {isOrchestrating
                  ? 'Initializing LangChain LLM context & CrewAI agents...'
                  : 'Click "Orchestrate 5-Agent Resume Crew" to execute pipeline.'}
              </div>
            ) : (
              filteredLogs.map((log) => {
                const badgeColor =
                  log.agentId === 'analyzer'
                    ? 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10'
                    : log.agentId === 'strategist'
                    ? 'text-teal-300 border-teal-500/30 bg-teal-500/10'
                    : log.agentId === 'ats_optimizer'
                    ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                    : log.agentId === 'designer'
                    ? 'text-amber-400 border-amber-500/30 bg-amber-500/10'
                    : 'text-rose-400 border-rose-500/30 bg-rose-500/10';

                return (
                  <div
                    key={log.id}
                    className="flex items-start gap-2.5 py-1.5 px-2.5 rounded-md hover:bg-[#161B28] transition-colors text-[11px]"
                  >
                    {/* Timestamp */}
                    <span className="text-slate-500 shrink-0 text-[10px]">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' })}
                    </span>

                    {/* Agent Tag */}
                    <span
                      className={`px-1.5 py-0.5 rounded border text-[10px] uppercase tracking-wider font-semibold shrink-0 ${badgeColor}`}
                    >
                      {log.agentId.replace('_', ' ')}
                    </span>

                    {/* Event Type Icon */}
                    <span className="text-slate-400 shrink-0 mt-0.5">
                      {log.type === 'thought' ? (
                        <Brain className="w-3.5 h-3.5 text-emerald-400" title="Thought" />
                      ) : log.type === 'tool_call' ? (
                        <Wrench className="w-3.5 h-3.5 text-amber-400" title="Tool Call" />
                      ) : log.type === 'handoff' ? (
                        <ArrowRightLeft className="w-3.5 h-3.5 text-cyan-400" title="Handoff" />
                      ) : log.type === 'output' ? (
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" title="Output" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                      )}
                    </span>

                    {/* Message */}
                    <span className="text-slate-300 break-words flex-1 leading-relaxed">
                      {log.message}
                      {log.data && (
                        <span className="block text-[10px] text-slate-400 mt-1 bg-black/40 p-2 rounded border border-slate-800 overflow-x-auto">
                          {JSON.stringify(log.data)}
                        </span>
                      )}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};
