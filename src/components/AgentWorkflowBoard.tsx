import React, { useState } from 'react';
import {
  AgentRoleType,
  AgentStatus,
  AgentLog,
} from '../types.js';
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
} from 'lucide-react';

interface AgentWorkflowBoardProps {
  agentStatuses: Record<AgentRoleType, AgentStatus>;
  logs: AgentLog[];
  isOrchestrating: boolean;
  totalTimeMs?: number;
}

const AGENT_ORDER: AgentRoleType[] = ['analyzer', 'strategist', 'ats_optimizer', 'designer', 'qa'];

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
    <div className="bg-white rounded-lg border border-[#E9ECEF] shadow-xs overflow-hidden mb-6">
      {/* Header bar */}
      <div className="px-6 py-4 bg-white border-b border-[#E9ECEF] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 rounded bg-[#1A1A1A] flex items-center justify-center text-white font-bold text-xs">
            <Cpu className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#1A1A1A]">
                CrewAI Multi-Agent Orchestration
              </h2>
              {isOrchestrating ? (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#E7F5FF] text-[#1864AB] border border-[#339AF0]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#339AF0] animate-ping"></span>
                  Active Agents Running
                </span>
              ) : logs.length > 0 ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#EBFBEE] text-[#2B8A3E] border border-[#B2F2BB]">
                  <CheckCircle2 className="w-3 h-3 text-[#37B24D]" />
                  All 5 Agents Completed
                </span>
              ) : (
                <span className="text-[11px] text-[#ADB5BD] font-medium">Ready</span>
              )}
            </div>
            <p className="text-[11px] text-[#868E96] mt-0.5">
              Analyzer &rarr; Content Strategist (Google XYZ) &rarr; ATS Optimizer &rarr; Designer &rarr; QA Auditor
            </p>
          </div>
        </div>

        {totalTimeMs ? (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F8F9FA] rounded text-[11px] font-medium text-[#495057] border border-[#E9ECEF]">
            <Clock className="w-3 h-3 text-[#868E96]" />
            <span>Execution: {(totalTimeMs / 1000).toFixed(2)}s</span>
          </div>
        ) : null}
      </div>

      {/* Visual Agent Pipeline Cards */}
      <div className="p-6 bg-[#F8F9FA] border-b border-[#E9ECEF]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {AGENT_ORDER.map((agentId) => {
            const status = agentStatuses[agentId];
            const isSelected = selectedAgent === agentId;
            const isCompleted = status.status === 'completed';
            const isRunning = status.status === 'running';

            return (
              <button
                key={agentId}
                type="button"
                onClick={() => setSelectedAgent(selectedAgent === agentId ? 'all' : agentId)}
                className={`relative text-left p-3.5 rounded-lg border transition-all ${
                  isSelected
                    ? 'ring-2 ring-[#1A1A1A] bg-white shadow-xs'
                    : isRunning
                    ? 'border-[#339AF0] bg-[#E7F5FF] text-[#1864AB] shadow-xs'
                    : isCompleted
                    ? 'border-[#E9ECEF] bg-white hover:border-[#CED4DA]'
                    : 'border-[#E9ECEF] bg-white/60 opacity-60 hover:opacity-100 hover:border-[#CED4DA]'
                }`}
              >
                {/* Status indicator row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-white ${
                        isCompleted
                          ? 'bg-[#37B24D]'
                          : isRunning
                          ? 'border-2 border-[#339AF0] border-t-transparent animate-spin bg-transparent'
                          : 'bg-[#DEE2E6]'
                      }`}
                    >
                      {isCompleted && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-[#1A1A1A] truncate">
                      {status.name.replace(' Agent', '')}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      isCompleted
                        ? 'text-[#37B24D]'
                        : isRunning
                        ? 'text-[#1971C2]'
                        : 'text-[#ADB5BD]'
                    }`}
                  >
                    {isCompleted ? 'DONE' : isRunning ? 'ACTIVE' : 'WAITING'}
                  </span>
                </div>

                {/* Agent Role / Goal summary */}
                <p className="text-[11px] text-[#495057] line-clamp-2 leading-relaxed">
                  {status.thoughtSummary || status.goal}
                </p>

                {/* Execution time badge */}
                {status.executionTimeMs ? (
                  <div className="text-[10px] text-[#868E96] font-medium mt-2">
                    ⚡ {status.executionTimeMs}ms
                  </div>
                ) : null}

                {/* Running progress bar */}
                {isRunning && (
                  <div className="w-full bg-[#D0EBFF] h-1 rounded-full overflow-hidden mt-2">
                    <div className="bg-[#339AF0] h-full w-2/3 animate-pulse"></div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Real-time Agent Log Stream & Thought Trace */}
      <div className="p-4 bg-[#1A1A1A] text-[#F8F9FA]">
        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-[#339AF0]" />
            <span className="font-bold text-[#F8F9FA] tracking-[0.08em] uppercase text-[11px]">
              Agent Thought Stream & Handoff Trace
            </span>
            <span className="text-[#868E96] font-mono text-[10px]">
              ({filteredLogs.length} events)
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Filter pills */}
            <div className="flex items-center bg-[#2B2C2D] rounded p-0.5 text-[10px] font-medium">
              {(['all', 'thought', 'tool_call', 'handoff'] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setLogFilter(filter)}
                  className={`px-2 py-0.5 rounded uppercase tracking-wider transition-colors ${
                    logFilter === filter ? 'bg-[#1A1A1A] text-white font-bold' : 'text-[#ADB5BD] hover:text-white'
                  }`}
                >
                  {filter.replace('_', ' ')}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsLogExpanded(!isLogExpanded)}
              className="p-1 rounded text-[#ADB5BD] hover:text-white"
            >
              {isLogExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {isLogExpanded && (
          <div className="max-h-52 overflow-y-auto space-y-1.5 font-mono text-xs pr-1 scrollbar-thin">
            {filteredLogs.length === 0 ? (
              <div className="py-5 text-center text-[#868E96] text-xs">
                {isOrchestrating
                  ? 'Initializing LangChain LLM context & agents...'
                  : 'Click "Orchestrate Resume Crew" to execute multi-agent workflow.'}
              </div>
            ) : (
              filteredLogs.map((log) => {
                const badgeColor =
                  log.agentId === 'analyzer'
                    ? 'text-[#74C0FC] border-[#1864AB] bg-[#1864AB]/20'
                    : log.agentId === 'strategist'
                    ? 'text-[#D0BFFF] border-[#5F3DC4] bg-[#5F3DC4]/20'
                    : log.agentId === 'ats_optimizer'
                    ? 'text-[#8CE99A] border-[#2B8A3E] bg-[#2B8A3E]/20'
                    : log.agentId === 'designer'
                    ? 'text-[#FFD43B] border-[#F59F00] bg-[#F59F00]/20'
                    : 'text-[#FFA8A8] border-[#E03131] bg-[#E03131]/20';

                return (
                  <div
                    key={log.id}
                    className="flex items-start gap-2.5 py-1 px-2 rounded hover:bg-[#25262B] transition-colors text-[11px]"
                  >
                    {/* Timestamp */}
                    <span className="text-[#868E96] shrink-0 text-[10px]">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' })}
                    </span>

                    {/* Agent Tag */}
                    <span
                      className={`px-1.5 py-0.5 rounded border text-[10px] uppercase tracking-wider font-semibold shrink-0 ${badgeColor}`}
                    >
                      {log.agentId.replace('_', ' ')}
                    </span>

                    {/* Event Type Icon */}
                    <span className="text-[#868E96] shrink-0 mt-0.5">
                      {log.type === 'thought' ? (
                        <Brain className="w-3.5 h-3.5 text-[#A5D8FF]" title="Thought" />
                      ) : log.type === 'tool_call' ? (
                        <Wrench className="w-3.5 h-3.5 text-[#FFD43B]" title="Tool Call" />
                      ) : log.type === 'handoff' ? (
                        <ArrowRightLeft className="w-3.5 h-3.5 text-[#66D9E8]" title="Handoff" />
                      ) : log.type === 'output' ? (
                        <Sparkles className="w-3.5 h-3.5 text-[#8CE99A]" title="Output" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#CED4DA]" />
                      )}
                    </span>

                    {/* Message */}
                    <span className="text-[#DEE2E6] break-words flex-1 leading-relaxed">
                      {log.message}
                      {log.data && (
                        <span className="block text-[10px] text-[#ADB5BD] mt-0.5 bg-[#000000]/50 p-1.5 rounded border border-[#373A40] overflow-x-auto">
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
