import React, { useState, useEffect } from 'react';
import { AgentRoleType, AgentStatus } from '../types.js';
import {
  Brain,
  Zap,
  ShieldCheck,
  Layout,
  Award,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Cpu,
  Activity,
  Maximize2,
  X,
  Code2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AgentDagVisualizerProps {
  agentStatuses?: Record<AgentRoleType, AgentStatus>;
  isLiveRunning?: boolean;
  interactiveDemo?: boolean;
  compact?: boolean;
  onSelectAgent?: (agentId: AgentRoleType) => void;
}

interface AgentNodeMeta {
  id: AgentRoleType;
  stepNumber: string;
  name: string;
  codename: string;
  role: string;
  icon: React.ElementType;
  colorScheme: {
    accent: string;
    bgBadge: string;
    textBadge: string;
    border: string;
    glow: string;
  };
  tools: string[];
  transformationExample: {
    before: string;
    after: string;
    explanation: string;
  };
}

export const AGENT_SPECS: AgentNodeMeta[] = [
  {
    id: 'analyzer',
    stepNumber: '01',
    name: 'Resume Analyzer',
    codename: 'Extractor',
    role: 'Principal Technical Talent Assessor',
    icon: Brain,
    colorScheme: {
      accent: '#2563EB',
      bgBadge: 'bg-blue-500/10',
      textBadge: 'text-blue-400',
      border: 'border-blue-500/30',
      glow: 'shadow-blue-500/20',
    },
    tools: ['SchemaNormalizer', 'SkillTaxonomyExtractor', 'ChronologyValidator'],
    transformationExample: {
      before: 'Worked with react and node doing backend api stuff for cloud app.',
      after: 'Structured Schema: Full-Stack Engineer | React 19, TypeScript, Node.js microservices | Cloud Infrastructure.',
      explanation: 'Normalizes unstructured career text into a typed JSON schema and cross-references skill taxonomies.',
    },
  },
  {
    id: 'strategist',
    stepNumber: '02A',
    name: 'Content Strategist',
    codename: 'Narrative Architect',
    role: 'Executive Career Narrative Strategist',
    icon: Zap,
    colorScheme: {
      accent: '#8B5CF6',
      bgBadge: 'bg-purple-500/10',
      textBadge: 'text-purple-400',
      border: 'border-purple-500/30',
      glow: 'shadow-purple-500/20',
    },
    tools: ['GoogleXYZTransformer', 'ImpactQuantifier', 'ActiveVerbEnhancer'],
    transformationExample: {
      before: 'Responsible for making website faster and fixing performance bugs.',
      after: 'Accomplished 62% reduction in UI latency [X], as measured by Datadog APM [Y], by re-architecting client state with streaming WebSockets [Z].',
      explanation: 'Transforms passive duty statements into high-impact Google XYZ formula accomplishments with quantified metrics.',
    },
  },
  {
    id: 'ats_optimizer',
    stepNumber: '02B',
    name: 'ATS Optimizer',
    codename: 'Algorithmic Scanner',
    role: 'ATS Systems Algorithmic Specialist',
    icon: ShieldCheck,
    colorScheme: {
      accent: '#10B981',
      bgBadge: 'bg-emerald-500/10',
      textBadge: 'text-emerald-400',
      border: 'border-emerald-500/30',
      glow: 'shadow-emerald-500/20',
    },
    tools: ['ATSScoringEngine', 'KeywordDensityAnalyzer', 'JobDescriptionParser'],
    transformationExample: {
      before: 'Skills: Good at distributed systems and coding.',
      after: 'Target Keyword Match: Kubernetes (EKS), LangChain Multi-Agent DAGs, Redis Caching, Terraform CI/CD (94% ATS Match).',
      explanation: 'Extracts critical tokens from target job description and aligns skill taxonomies to pass Workday, Greenhouse, and Lever filters.',
    },
  },
  {
    id: 'designer',
    stepNumber: '03',
    name: 'Resume Designer',
    codename: 'Layout & Typography',
    role: 'Information Designer & Document Architect',
    icon: Layout,
    colorScheme: {
      accent: '#F59E0B',
      bgBadge: 'bg-amber-500/10',
      textBadge: 'text-amber-400',
      border: 'border-amber-500/30',
      glow: 'shadow-amber-500/20',
    },
    tools: ['LayoutFormatter', 'HierarchyEngine', 'MarkdownGenerator'],
    transformationExample: {
      before: 'Unformatted block of text with mixed fonts and irregular bullet points.',
      after: 'Precision ATS-compliant hierarchy: 1-page compact density, balanced vertical rhythm, distinct typographic scale.',
      explanation: 'Applies rigorous typography and spacing mathematics to format multi-format outputs (PDF, Markdown, Plain-Text).',
    },
  },
  {
    id: 'qa',
    stepNumber: '04',
    name: 'QA Verifier',
    codename: 'Senior Recruiter QA',
    role: 'Senior Technical Recruiter & Editorial Lead',
    icon: Award,
    colorScheme: {
      accent: '#EC4899',
      bgBadge: 'bg-rose-500/10',
      textBadge: 'text-rose-400',
      border: 'border-rose-500/30',
      glow: 'shadow-rose-500/20',
    },
    tools: ['GrammarConsistencyChecker', 'TenseAuditor', 'ChronologyGapValidator'],
    transformationExample: {
      before: 'Mixed past and present verbs ("Architecting system in 2021 and built pipeline").',
      after: 'Tense consistency validated (100%), 0 grammatical ambiguities detected, official QA Certification Issued (96/100).',
      explanation: 'Audits temporal continuity, checks active verb consistency, and certifies resume quality before final export.',
    },
  },
];

export const AgentDagVisualizer: React.FC<AgentDagVisualizerProps> = ({
  agentStatuses,
  isLiveRunning = false,
  interactiveDemo = true,
  compact = false,
  onSelectAgent,
}) => {
  const [activeDemoStep, setActiveDemoStep] = useState<number>(0);
  const [inspectedAgent, setInspectedAgent] = useState<AgentNodeMeta | null>(null);

  // Ambient demo animation timer when not live running
  useEffect(() => {
    if (!interactiveDemo || isLiveRunning) return;
    const interval = setInterval(() => {
      setActiveDemoStep((prev) => (prev + 1) % 5);
    }, 2800);
    return () => clearInterval(interval);
  }, [interactiveDemo, isLiveRunning]);

  const getNodeStatus = (agentId: AgentRoleType, index: number) => {
    if (agentStatuses) {
      return agentStatuses[agentId]?.status || 'idle';
    }
    if (interactiveDemo && !isLiveRunning) {
      if (index === activeDemoStep) return 'running';
      if (index < activeDemoStep) return 'completed';
      return 'idle';
    }
    return 'idle';
  };

  const handleNodeClick = (agent: AgentNodeMeta) => {
    setInspectedAgent(agent);
    if (onSelectAgent) {
      onSelectAgent(agent.id);
    }
  };

  return (
    <div className="relative w-full rounded-xl bg-[#0C0E14] border border-[#1E2536] p-4 sm:p-6 shadow-2xl overflow-hidden text-white">
      {/* Background Tech Grid */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-30 pointer-events-none" />

      {/* Header bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#1E2536]">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-[#1E2536] border border-[#2B354C] flex items-center justify-center text-indigo-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200">
                5-Agent Autonomous DAG Pipeline
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono-code font-bold uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Sequential + Parallel
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Click any node to inspect agent tools, prompt directives, and transformation logic
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121620] border border-[#1E2536] text-[11px] text-slate-400 font-mono-code">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Orchestrator: Active</span>
          </div>
        </div>
      </div>

      {/* The Visual DAG Graph */}
      <div className="relative z-10 py-6 overflow-x-auto">
        <div className="min-w-[720px] flex items-center justify-between gap-2 sm:gap-4 relative px-2">
          {/* Connecting Data Highway (Background Line) */}
          <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-[#1E2536] -translate-y-1/2 z-0" />

          {/* Node 1: Analyzer */}
          <div className="z-10 flex-1 max-w-[170px]">
            <AgentNodeCard
              agent={AGENT_SPECS[0]}
              status={getNodeStatus('analyzer', 0)}
              onClick={() => handleNodeClick(AGENT_SPECS[0])}
            />
          </div>

          {/* Arrow 1 -> 2 */}
          <div className="z-10 flex flex-col items-center justify-center text-slate-500 shrink-0">
            <ArrowRight className="w-4 h-4" />
          </div>

          {/* Parallel Fork: Strategist (2A) & ATS Optimizer (2B) */}
          <div className="z-10 flex-1 max-w-[210px] flex flex-col gap-3">
            <div className="text-[10px] uppercase font-mono-code font-bold text-center text-slate-400 tracking-wider bg-[#121620] py-0.5 px-2 rounded border border-[#1E2536] self-center">
              Parallel Execution
            </div>
            <AgentNodeCard
              agent={AGENT_SPECS[1]}
              status={getNodeStatus('strategist', 1)}
              onClick={() => handleNodeClick(AGENT_SPECS[1])}
              compact
            />
            <AgentNodeCard
              agent={AGENT_SPECS[2]}
              status={getNodeStatus('ats_optimizer', 2)}
              onClick={() => handleNodeClick(AGENT_SPECS[2])}
              compact
            />
          </div>

          {/* Arrow 2 -> 3 */}
          <div className="z-10 flex flex-col items-center justify-center text-slate-500 shrink-0">
            <ArrowRight className="w-4 h-4" />
          </div>

          {/* Node 3: Designer */}
          <div className="z-10 flex-1 max-w-[170px]">
            <AgentNodeCard
              agent={AGENT_SPECS[3]}
              status={getNodeStatus('designer', 3)}
              onClick={() => handleNodeClick(AGENT_SPECS[3])}
            />
          </div>

          {/* Arrow 3 -> 4 */}
          <div className="z-10 flex flex-col items-center justify-center text-slate-500 shrink-0">
            <ArrowRight className="w-4 h-4" />
          </div>

          {/* Node 4: QA Verifier */}
          <div className="z-10 flex-1 max-w-[170px]">
            <AgentNodeCard
              agent={AGENT_SPECS[4]}
              status={getNodeStatus('qa', 4)}
              onClick={() => handleNodeClick(AGENT_SPECS[4])}
            />
          </div>
        </div>
      </div>

      {/* Footer Info Strip */}
      <div className="relative z-10 pt-4 border-t border-[#1E2536] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-mono-code">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Completed
          </span>
          <span className="flex items-center gap-1.5 font-mono-code">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Active Execution
          </span>
          <span className="flex items-center gap-1.5 font-mono-code">
            <span className="w-2 h-2 rounded-full bg-slate-600" />
            Standing By
          </span>
        </div>

        <div className="font-mono-code text-[11px] text-slate-400">
          Deterministic Handoffs &bull; Zero Hallucination Pipeline
        </div>
      </div>

      {/* Agent Detail Modal Drawer */}
      <AnimatePresence>
        {inspectedAgent && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 text-slate-900">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white rounded-xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
                    <inspectedAgent.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-slate-300">
                        Step {inspectedAgent.stepNumber}
                      </span>
                      <h4 className="text-base font-bold text-white">{inspectedAgent.name}</h4>
                    </div>
                    <p className="text-xs text-slate-400">{inspectedAgent.role}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setInspectedAgent(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5 text-xs text-slate-700">
                {/* Tools Suite */}
                <div>
                  <h5 className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-indigo-600" />
                    Agent Tool Suite
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {inspectedAgent.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-800 font-mono-code text-[11px] font-semibold"
                      >
                        ⚡ {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Real Transformation Sample */}
                <div>
                  <h5 className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Real Transformation Example
                  </h5>
                  <div className="space-y-2.5">
                    <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-900">
                      <span className="font-bold block text-[10px] uppercase text-rose-600 mb-1">
                        Input Raw Content:
                      </span>
                      <p className="font-mono-code text-[11px]">{inspectedAgent.transformationExample.before}</p>
                    </div>

                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
                      <span className="font-bold block text-[10px] uppercase text-emerald-700 mb-1">
                        Agent Engineered Output:
                      </span>
                      <p className="font-mono-code text-[11px] font-medium">
                        {inspectedAgent.transformationExample.after}
                      </p>
                    </div>

                    <p className="text-[11px] text-slate-500 italic">
                      {inspectedAgent.transformationExample.explanation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
                <button
                  type="button"
                  onClick={() => setInspectedAgent(null)}
                  className="px-4 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-black transition-colors"
                >
                  Close Inspection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface AgentNodeCardProps {
  agent: AgentNodeMeta;
  status: 'idle' | 'running' | 'completed' | 'error';
  onClick: () => void;
  compact?: boolean;
}

const AgentNodeCard: React.FC<AgentNodeCardProps> = ({ agent, status, onClick, compact = false }) => {
  const Icon = agent.icon;
  const isRunning = status === 'running';
  const isCompleted = status === 'completed';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-xl transition-all relative overflow-hidden group cursor-pointer ${
        compact ? 'p-2.5' : 'p-3.5'
      } ${
        isRunning
          ? 'bg-[#182030] border-2 border-indigo-400 shadow-lg shadow-indigo-500/20 scale-[1.02]'
          : isCompleted
          ? 'bg-[#121620] border border-emerald-500/40 hover:border-emerald-400'
          : 'bg-[#121620]/80 border border-[#1E2536] hover:border-slate-500'
      }`}
    >
      {/* Active pulse effect */}
      {isRunning && (
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent animate-pulse pointer-events-none" />
      )}

      {/* Top Tag & Step */}
      <div className="flex items-center justify-between gap-1 mb-1.5">
        <span className="text-[10px] font-mono-code font-bold uppercase text-slate-400">
          Step {agent.stepNumber}
        </span>
        <span
          className={`text-[9px] font-mono-code font-bold uppercase px-1.5 py-0.5 rounded ${
            isCompleted
              ? 'bg-emerald-500/20 text-emerald-300'
              : isRunning
              ? 'bg-indigo-500/30 text-indigo-300 animate-pulse'
              : 'bg-slate-800 text-slate-400'
          }`}
        >
          {isCompleted ? 'Done' : isRunning ? 'Active' : 'Idle'}
        </span>
      </div>

      {/* Icon & Title */}
      <div className="flex items-center gap-2 mb-1">
        <div
          className={`w-6 h-6 rounded flex items-center justify-center shrink-0 ${
            isRunning
              ? 'bg-indigo-600 text-white animate-bounce'
              : isCompleted
              ? 'bg-emerald-600 text-white'
              : 'bg-[#1E2536] text-slate-300'
          }`}
        >
          {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
        </div>
        <div className="truncate">
          <div className="text-xs font-bold text-slate-100 truncate">{agent.name}</div>
        </div>
      </div>

      {/* Codename & Primary Tool */}
      {!compact && (
        <div className="mt-1 space-y-1">
          <div className="text-[10px] text-slate-400 truncate">{agent.codename}</div>
          <div className="text-[9px] font-mono-code text-indigo-300/80 truncate bg-[#0C0E14] px-1.5 py-0.5 rounded border border-[#1E2536]">
            {agent.tools[0]}
          </div>
        </div>
      )}
    </button>
  );
};
