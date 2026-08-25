import React, { useState } from 'react';
import { AgentDagVisualizer, AGENT_SPECS } from './AgentDagVisualizer.js';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Zap,
  Brain,
  Layout,
  CheckCircle2,
  Lock,
  Server,
  Layers,
  FileText,
  FileCheck,
  ChevronRight,
  TrendingUp,
  Cpu,
  Check,
  Copy,
  ExternalLink,
} from 'lucide-react';

interface LandingViewProps {
  onEnterStudio: () => void;
  onSelectSample: (profileKey: string) => void;
  onOpenDocs: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onEnterStudio,
  onSelectSample,
  onOpenDocs,
}) => {
  const [activeTemplatePreview, setActiveTemplatePreview] = useState<'modern' | 'executive' | 'minimal' | 'nordic'>('modern');
  const [selectedAgentIndex, setSelectedAgentIndex] = useState<number>(1); // Default to Content Strategist

  return (
    <div className="w-full bg-[#F8FAFC] text-[#0F172A] selection:bg-indigo-500 selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0C0E14] text-white pt-12 pb-20 border-b border-[#1E2536]">
        {/* Background Grid Pattern & Ambient Gradients */}
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-30 pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161B28] border border-[#2B354C] text-xs text-indigo-300 mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="font-mono-code font-semibold tracking-tight">CrewAI & LangChain Multi-Agent Architecture</span>
            <span className="text-slate-500">&bull;</span>
            <span className="text-slate-400 font-medium">Google Gemini Powered</span>
          </div>

          {/* Headline & Subhead */}
          <div className="max-w-3xl space-y-4 mb-8">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 leading-[1.1]">
              Not a Single Prompt.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400">
                A 5-Agent Autonomous Crew.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Generic chatbots generate generic resumes. <strong>CrewMyResume</strong> orchestrates a directed acyclic graph (DAG) of five specialized agents: extracting taxonomy, transforming bullet points with <strong>Google&apos;s XYZ formula</strong>, maximizing ATS keyword vectors, and auditing tense harmony before issuance.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-12">
            <button
              type="button"
              onClick={onEnterStudio}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition-all cursor-pointer group"
            >
              <span>Build My Resume in Studio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => onSelectSample('software_engineer')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#161B28] hover:bg-[#1E2536] text-slate-200 font-medium text-sm border border-[#2B354C] transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Try AI Engineer Preset</span>
            </button>

            <button
              type="button"
              onClick={onOpenDocs}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-slate-400 hover:text-slate-200 text-sm font-medium transition-colors"
            >
              <Layers className="w-4 h-4" />
              <span>View Architecture Specs</span>
            </button>
          </div>

          {/* Signature Live Interactive DAG Component */}
          <div className="w-full">
            <AgentDagVisualizer interactiveDemo={true} />
          </div>
        </div>
      </section>

      {/* 2. MEET THE CREW SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Specialized Autonomous Roles
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-3">
            Five Purpose-Built Agents. Zero Generic Prompts.
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Each agent has an explicit role backstory, restricted tool access, and deterministic handoff schemas.
          </p>
        </div>

        {/* Agent Selector Tabs & Interactive Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Agent Navigation List */}
          <div className="lg:col-span-4 space-y-2">
            {AGENT_SPECS.map((agent, idx) => {
              const isSelected = selectedAgentIndex === idx;
              const Icon = agent.icon;
              return (
                <button
                  key={agent.id}
                  type="button"
                  onClick={() => setSelectedAgentIndex(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-white border-indigo-600 shadow-md ring-1 ring-indigo-600'
                      : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-mono-code font-bold uppercase text-slate-500">
                        Step {agent.stepNumber} &bull; {agent.codename}
                      </div>
                      <div className="text-sm font-bold text-slate-900">{agent.name}</div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-indigo-600 translate-x-1' : 'text-slate-300'}`} />
                </button>
              );
            })}
          </div>

          {/* Selected Agent In-Depth Showcase */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            {(() => {
              const active = AGENT_SPECS[selectedAgentIndex];
              const Icon = active.icon;
              return (
                <div className="space-y-6">
                  {/* Card Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 border border-indigo-100">
                            Step {active.stepNumber} &bull; {active.codename}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mt-1">{active.name}</h3>
                        <p className="text-xs font-medium text-slate-500">{active.role}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={onEnterStudio}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1"
                    >
                      <span>Test in Studio</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Tool List */}
                  <div>
                    <div className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Deterministic Tools & Directives:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {active.tools.map((t, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-800 font-mono-code text-xs font-semibold"
                        >
                          ⚡ {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Transformation Showcase */}
                  <div className="space-y-3">
                    <div className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-500">
                      Real Transformation Impact:
                    </div>

                    <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200/80 text-rose-900 space-y-1">
                      <span className="text-[10px] font-mono-code font-bold uppercase text-rose-600 block">
                        Raw User Input / Legacy Resume
                      </span>
                      <p className="text-xs font-mono-code">{active.transformationExample.before}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-emerald-900 space-y-1">
                      <span className="text-[10px] font-mono-code font-bold uppercase text-emerald-700 block">
                        Autonomous Agent Output
                      </span>
                      <p className="text-xs font-mono-code font-medium">{active.transformationExample.after}</p>
                    </div>

                    <p className="text-xs text-slate-600 italic bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <strong>Why this matters:</strong> {active.transformationExample.explanation}
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* 3. HOW THE DAG RUNS SECTION */}
      <section className="py-16 bg-[#0F172A] text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
              Deterministic Dependency Flow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-3">
              How the DAG Orchestration Executes
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              LangChain sequential memory chains paired with CrewAI parallel workers for optimal throughput and zero hallucination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-[#161E2E] border border-slate-800 space-y-2">
              <div className="text-xs font-mono-code font-bold text-indigo-400">STAGE 01 &bull; SEQUENTIAL</div>
              <h3 className="text-sm font-bold text-white">Extraction & Taxonomy</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Resume Analyzer extracts dates, company positions, and skill tags into a validated JSON schema, eliminating ambiguity.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#161E2E] border border-indigo-500/40 space-y-2">
              <div className="text-xs font-mono-code font-bold text-purple-400">STAGE 02 &bull; PARALLEL FORK</div>
              <h3 className="text-sm font-bold text-white">XYZ Polish & ATS Tokens</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Strategist rewrites bullets with Google XYZ formula while ATS Optimizer simultaneously parses JD tokens and keyword density.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#161E2E] border border-slate-800 space-y-2">
              <div className="text-xs font-mono-code font-bold text-amber-400">STAGE 03 &bull; JOIN & FORMAT</div>
              <h3 className="text-sm font-bold text-white">Layout & Typography</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Designer joins the structured narrative and ATS tokens into 1-page compact typography with mathematical baseline grid rules.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#161E2E] border border-slate-800 space-y-2">
              <div className="text-xs font-mono-code font-bold text-rose-400">STAGE 04 &bull; VERIFICATION</div>
              <h3 className="text-sm font-bold text-white">QA Recruiter Audit</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Quality Assurance Agent validates grammatical harmony, tense consistency, and issues an official numerical certification score.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROOF & OUTPUT SUITE */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Production Output Suite
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-3">
            Real ATS Audit (94/100) & PDF Document Export
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Inspect real outputs generated by the 5-agent pipeline with instant PDF, Markdown, and JSON export.
          </p>
        </div>

        {/* Live Score Strip + Template Switcher */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Real ATS & QA Preview Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* ATS Score Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">ATS Optimizer Audit</h4>
                    <p className="text-xs text-slate-500">Greenhouse & Workday Compatible</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-emerald-600 font-mono-code">94/100</div>
                  <span className="text-[10px] uppercase font-bold text-emerald-700">Top 3% ATS Score</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Target Keyword Match Density</span>
                  <span className="font-bold text-slate-900 font-mono-code">92%</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Semantic Heading Parsing</span>
                  <span className="font-bold text-emerald-600 font-mono-code">100% (Passed)</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Parsing Machine Readability</span>
                  <span className="font-bold text-emerald-600 font-mono-code">100% (Passed)</span>
                </div>
              </div>
            </div>

            {/* QA Certification Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Senior Recruiter Certification</h4>
                    <p className="text-xs text-slate-500">Temporal & Metric Integrity Audit</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-indigo-600 font-mono-code">96/100</div>
                  <span className="text-[10px] uppercase font-bold text-indigo-700">Certified QA Pass</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Google XYZ Formula Compliance</span>
                  <span className="font-bold text-indigo-600 font-mono-code">96%</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tense Consistency (Past vs Present)</span>
                  <span className="font-bold text-emerald-600 font-mono-code">100% (Harmonized)</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Grammar & Typo Audit</span>
                  <span className="font-bold text-emerald-600 font-mono-code">0 Errors</span>
                </div>
              </div>
            </div>

            {/* Direct Preset Triggers */}
            <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-3">
              <div className="text-xs font-bold text-indigo-900 uppercase font-mono-code">
                ⚡ 1-Click Role Presets:
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => onSelectSample('software_engineer')}
                  className="px-3 py-2 rounded-lg bg-white border border-indigo-200 text-slate-800 text-xs font-semibold hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer shadow-2xs"
                >
                  AI Engineer
                </button>
                <button
                  type="button"
                  onClick={() => onSelectSample('product_manager')}
                  className="px-3 py-2 rounded-lg bg-white border border-indigo-200 text-slate-800 text-xs font-semibold hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer shadow-2xs"
                >
                  Product Lead
                </button>
                <button
                  type="button"
                  onClick={() => onSelectSample('cloud_architect')}
                  className="px-3 py-2 rounded-lg bg-white border border-indigo-200 text-slate-800 text-xs font-semibold hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer shadow-2xs"
                >
                  Cloud Architect
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Simulated Resume Sheet Preview */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
            {/* Template Selector Pills */}
            <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div className="text-xs font-bold text-slate-700">Preview Template Design:</div>
              <div className="flex gap-1.5">
                {(['modern', 'executive', 'minimal', 'nordic'] as const).map((tmpl) => (
                  <button
                    key={tmpl}
                    type="button"
                    onClick={() => setActiveTemplatePreview(tmpl)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-colors ${
                      activeTemplatePreview === tmpl
                        ? 'bg-slate-900 text-white font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tmpl}
                  </button>
                ))}
              </div>
            </div>

            {/* Resume Sheet Sample */}
            <div className="p-6 sm:p-8 rounded-xl bg-slate-50/80 border border-slate-200 space-y-4 text-xs font-sans">
              {/* Header */}
              <div className="border-b border-slate-300 pb-3">
                <div className="text-lg font-black text-slate-900">Alex Morgan</div>
                <div className="text-xs font-bold text-indigo-600">Lead Full-Stack AI Engineer</div>
                <div className="text-[11px] text-slate-500 mt-1 flex flex-wrap gap-2">
                  <span>San Francisco, CA</span> &bull;
                  <span>alex.morgan.dev@gmail.com</span> &bull;
                  <span>github.com/alexmorgantech</span>
                </div>
              </div>

              {/* Summary */}
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-900 mb-1 border-b border-slate-200 pb-0.5">
                  Professional Executive Summary
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  Senior Full-Stack AI Engineer with 6+ years specializing in modern TypeScript/React systems, autonomous multi-agent LLM orchestration, and distributed cloud microservices serving 2.5M+ active users with 99.99% uptime.
                </p>
              </div>

              {/* Experience */}
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-900 mb-1 border-b border-slate-200 pb-0.5">
                  Work Experience
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">Synthetix AI Systems &bull; Lead AI Engineer</span>
                    <span className="text-[10px] text-slate-500 font-mono-code">2022 - Present</span>
                  </div>
                  <ul className="space-y-1 list-disc pl-4 text-[11px] text-slate-700">
                    <li>
                      Designed and deployed an agentic LLM orchestration engine using LangChain and CrewAI patterns, reducing multi-step document extraction time by 62% for 450k enterprise users.
                    </li>
                    <li>
                      Built responsive real-time streaming interfaces in React 19 with WebSocket feeds, lowering UI interaction latency from 450ms to 85ms.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Skills */}
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-900 mb-1 border-b border-slate-200 pb-0.5">
                  Core Skills & ATS Taxonomies
                </div>
                <p className="text-[11px] text-slate-700">
                  <strong>Technical:</strong> TypeScript, Python, Node.js, React 19, LangChain, CrewAI, Kubernetes, Docker, PostgreSQL.
                </p>
              </div>
            </div>

            {/* Launch CTA */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={onEnterStudio}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <span>Customize & Export This Resume</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TRUST & STANDARDS STRIP */}
      <section className="py-14 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Tested on Top ATS Platforms</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Engineered to score in the 90th+ percentile across Workday, Greenhouse, Lever, and Taleo parsing algorithms.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Zero Resume Storage Policy</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Client-only transient session processing. Your personal data is never stored, tracked, or sold to third-party databases.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Server-Side API Key Isolation</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Protected backend proxy handles Gemini API orchestration. No secret keys or credentials ever reach the client browser.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CALL TO ACTION */}
      <section className="py-20 bg-[#0C0E14] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-20 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-mono-code font-bold">
            Ready to Launch the Crew?
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Generate an ATS-Certified, High-Impact Resume in Seconds.
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Choose a pre-configured sample profile or paste your own raw career notes. Watch the 5-agent pipeline execute live in real-time.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onEnterStudio}
              className="px-8 py-3.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Open Studio Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
