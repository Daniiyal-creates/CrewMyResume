/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  UserResumeInput,
  OrchestrationResult,
  AgentRoleType,
  AgentStatus,
  AgentLog,
} from './types.js';
import { Navbar } from './components/Navbar.js';
import { LandingView } from './components/LandingView.js';
import { ArchitectureModal } from './components/ArchitectureModal.js';
import { InputForm } from './components/InputForm.js';
import { AgentWorkflowBoard } from './components/AgentWorkflowBoard.js';
import { ResumePreview } from './components/ResumePreview.js';
import { AtsAnalysisCard } from './components/AtsAnalysisCard.js';
import { QAReportCard } from './components/QAReportCard.js';
import { SAMPLE_PROFILES } from '../server/sampleData.js';
import {
  Sparkles,
  FileText,
  ShieldCheck,
  Award,
  Layers,
  ArrowRight,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const INITIAL_AGENT_STATUSES: Record<AgentRoleType, AgentStatus> = {
  analyzer: {
    id: 'analyzer',
    name: 'Resume Analyzer Agent',
    role: 'Principal Technical Talent Assessor',
    goal: 'Extract and normalize career timeline and taxonomy.',
    status: 'idle',
    progress: 0,
  },
  strategist: {
    id: 'strategist',
    name: 'Content Strategist Agent',
    role: 'Executive Resume Narrative Strategist',
    goal: 'Craft Google XYZ impact bullet points.',
    status: 'idle',
    progress: 0,
  },
  ats_optimizer: {
    id: 'ats_optimizer',
    name: 'ATS Optimizer Agent',
    role: 'ATS Systems Algorithmic Specialist',
    goal: 'Score ATS compatibility and align target keywords.',
    status: 'idle',
    progress: 0,
  },
  designer: {
    id: 'designer',
    name: 'Resume Designer Agent',
    role: 'Layout & Typographic Information Designer',
    goal: 'Format finalized structured layout schemas.',
    status: 'idle',
    progress: 0,
  },
  qa: {
    id: 'qa',
    name: 'Quality Assurance Agent',
    role: 'Senior Technical Recruiter & QA Lead',
    goal: 'Audit tense harmony, grammar, and issue certification score.',
    status: 'idle',
    progress: 0,
  },
};

export default function App() {
  const [currentViewMode, setCurrentViewMode] = useState<'landing' | 'workspace'>('landing');
  const [formData, setFormData] = useState<UserResumeInput>(SAMPLE_PROFILES.software_engineer);
  const [isOrchestrating, setIsOrchestrating] = useState(false);
  const [orchestrationResult, setOrchestrationResult] = useState<OrchestrationResult | null>(null);
  const [agentStatuses, setAgentStatuses] = useState<Record<AgentRoleType, AgentStatus>>(INITIAL_AGENT_STATUSES);
  const [logs, setLogs] = useState<AgentLog[]>([]);
  const [workspaceTab, setWorkspaceTab] = useState<'editor' | 'preview' | 'ats_audit' | 'qa_report'>('editor');
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSelectSample = (profileKey: string) => {
    if (SAMPLE_PROFILES[profileKey]) {
      setFormData(SAMPLE_PROFILES[profileKey]);
      setCurrentViewMode('workspace');
      setWorkspaceTab('editor');
    }
  };

  const handleEnterWorkspace = () => {
    setCurrentViewMode('workspace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRunOrchestration = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setCurrentViewMode('workspace');
    setIsOrchestrating(true);
    setErrorMessage(null);
    setLogs([]);
    setAgentStatuses(INITIAL_AGENT_STATUSES);

    try {
      // Use SSE streaming for real-time live agent collaboration
      const response = await fetch('/api/orchestrate/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n\n');
          buffer = lines.pop() || '';

          for (const block of lines) {
            if (!block.trim()) continue;
            const eventMatch = block.match(/^event: (.*)$/m);
            const dataMatch = block.match(/^data: (.*)$/m);

            if (eventMatch && dataMatch) {
              const eventType = eventMatch[1].trim();
              const eventData = JSON.parse(dataMatch[1].trim());

              if (eventType === 'agent_log') {
                setLogs((prev) => [...prev, eventData]);
              } else if (eventType === 'agent_status') {
                setAgentStatuses((prev) => ({
                  ...prev,
                  [eventData.agentId]: eventData.status,
                }));
              } else if (eventType === 'pipeline_completed') {
                setOrchestrationResult(eventData);
                setAgentStatuses(eventData.agentStatuses);
                setWorkspaceTab('preview');
                confetti({
                  particleCount: 100,
                  spread: 70,
                  origin: { y: 0.6 },
                });
              } else if (eventType === 'error') {
                throw new Error(eventData.message || 'Orchestration failed');
              }
            }
          }
        }
      }
    } catch (err: any) {
      console.error('SSE Stream error, falling back to standard POST:', err);
      try {
        const fallbackRes = await fetch('/api/orchestrate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const fallbackData = await fallbackRes.json();
        if (fallbackData.success) {
          setOrchestrationResult(fallbackData);
          setAgentStatuses(fallbackData.agentStatuses);
          setLogs(fallbackData.logs || []);
          setWorkspaceTab('preview');
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 },
          });
        } else {
          setErrorMessage(fallbackData.error || 'Failed to complete orchestration');
        }
      } catch (fallbackErr: any) {
        setErrorMessage(fallbackErr.message || 'Failed to connect to agent backend.');
      }
    } finally {
      setIsOrchestrating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0F172A] font-sans flex flex-col antialiased">
      {/* Top Navigation */}
      <Navbar
        currentViewMode={currentViewMode}
        onToggleViewMode={setCurrentViewMode}
        onSelectSample={handleSelectSample}
        onOpenDocs={() => setIsDocsOpen(true)}
        isOrchestrating={isOrchestrating}
        hasResult={Boolean(orchestrationResult)}
        onNewResume={() => {
          setCurrentViewMode('workspace');
          setWorkspaceTab('editor');
        }}
      />

      {/* Main Container */}
      <div className="flex-1 w-full">
        {currentViewMode === 'landing' ? (
          /* ==================================================== */
          /* LANDING & DAG VISUALIZER VIEW */
          /* ==================================================== */
          <LandingView
            onEnterStudio={handleEnterWorkspace}
            onSelectSample={handleSelectSample}
            onOpenDocs={() => setIsDocsOpen(true)}
          />
        ) : (
          /* ==================================================== */
          /* WORKSPACE / STUDIO VIEW */
          /* ==================================================== */
          <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Error notification banner */}
            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setErrorMessage(null)}
                  className="text-xs font-bold underline hover:no-underline cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Live Multi-Agent Execution Board (Always accessible or active during runs) */}
            <AgentWorkflowBoard
              agentStatuses={agentStatuses}
              logs={logs}
              isOrchestrating={isOrchestrating}
              totalTimeMs={orchestrationResult?.totalExecutionTimeMs}
            />

            {/* View Switcher Tabs (when result is ready) */}
            {orchestrationResult && (
              <div className="flex flex-wrap items-center justify-between bg-white p-2 rounded-xl border border-slate-200 shadow-sm mb-6 gap-3">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setWorkspaceTab('preview')}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all cursor-pointer ${
                      workspaceTab === 'preview'
                        ? 'bg-slate-900 text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Resume Document & PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWorkspaceTab('ats_audit')}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all cursor-pointer ${
                      workspaceTab === 'ats_audit'
                        ? 'bg-emerald-600 text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>ATS Audit ({orchestrationResult.atsAnalysis.overallScore}/100)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWorkspaceTab('qa_report')}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all cursor-pointer ${
                      workspaceTab === 'qa_report'
                        ? 'bg-indigo-600 text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>QA Certification ({orchestrationResult.qaReport.overallQualityScore}/100)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWorkspaceTab('editor')}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all cursor-pointer ${
                      workspaceTab === 'editor'
                        ? 'bg-slate-200 text-slate-900 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <span>Edit Profile Data</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleRunOrchestration()}
                  disabled={isOrchestrating}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-slate-50 text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isOrchestrating ? 'animate-spin' : ''}`} />
                  <span>Re-Run 5 Agents</span>
                </button>
              </div>
            )}

            {/* Dynamic View Rendering */}
            {workspaceTab === 'editor' ? (
              <InputForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleRunOrchestration}
                isOrchestrating={isOrchestrating}
                onLoadSample={handleSelectSample}
              />
            ) : workspaceTab === 'preview' && orchestrationResult ? (
              <ResumePreview
                resume={orchestrationResult.resume}
                markdownContent={orchestrationResult.markdownContent}
                plainTextContent={orchestrationResult.plainTextContent}
                atsAnalysis={orchestrationResult.atsAnalysis}
                qaReport={orchestrationResult.qaReport}
              />
            ) : workspaceTab === 'ats_audit' && orchestrationResult ? (
              <div className="space-y-6">
                <AtsAnalysisCard analysis={orchestrationResult.atsAnalysis} />
                <ResumePreview
                  resume={orchestrationResult.resume}
                  markdownContent={orchestrationResult.markdownContent}
                  plainTextContent={orchestrationResult.plainTextContent}
                />
              </div>
            ) : workspaceTab === 'qa_report' && orchestrationResult ? (
              <div className="space-y-6">
                <QAReportCard report={orchestrationResult.qaReport} />
                <ResumePreview
                  resume={orchestrationResult.resume}
                  markdownContent={orchestrationResult.markdownContent}
                  plainTextContent={orchestrationResult.plainTextContent}
                />
              </div>
            ) : null}
          </main>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-auto bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">CrewMyResume</span>
            <span>&bull;</span>
            <span>Multi-Agent Autonomous Resume Orchestration Platform</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsDocsOpen(true)}
              className="hover:text-indigo-600 transition-colors font-medium cursor-pointer"
            >
              Architecture & DAG Specs
            </button>
            <span>&bull;</span>
            <span>CrewAI & LangChain Orchestration</span>
          </div>
        </div>
      </footer>

      {/* Architecture Documentation Modal */}
      <ArchitectureModal isOpen={isDocsOpen} onClose={() => setIsDocsOpen(false)} />
    </div>
  );
}
