/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  UserResumeInput,
  OrchestrationResult,
  AgentRoleType,
  AgentStatus,
  AgentLog,
} from './types.js';
import { Navbar } from './components/Navbar.js';
import { ArchitectureModal } from './components/ArchitectureModal.js';
import { InputForm } from './components/InputForm.js';
import { AgentWorkflowBoard } from './components/AgentWorkflowBoard.js';
import { ResumePreview } from './components/ResumePreview.js';
import { AtsAnalysisCard } from './components/AtsAnalysisCard.js';
import { QAReportCard } from './components/QAReportCard.js';
import { SAMPLE_PROFILES } from '../server/sampleData.js';
import {
  Sparkles,
  Play,
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
  const [formData, setFormData] = useState<UserResumeInput>(SAMPLE_PROFILES.software_engineer);
  const [isOrchestrating, setIsOrchestrating] = useState(false);
  const [orchestrationResult, setOrchestrationResult] = useState<OrchestrationResult | null>(null);
  const [agentStatuses, setAgentStatuses] = useState<Record<AgentRoleType, AgentStatus>>(INITIAL_AGENT_STATUSES);
  const [logs, setLogs] = useState<AgentLog[]>([]);
  const [activeView, setActiveView] = useState<'editor' | 'preview' | 'ats_audit' | 'qa_report'>('editor');
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSelectSample = (profileKey: string) => {
    if (SAMPLE_PROFILES[profileKey]) {
      setFormData(SAMPLE_PROFILES[profileKey]);
    }
  };

  const handleRunOrchestration = async (e: React.FormEvent) => {
    e.preventDefault();
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
                setActiveView('preview');
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
          setActiveView('preview');
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
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans flex flex-col">
      {/* Top Navigation */}
      <Navbar
        onSelectSample={handleSelectSample}
        onOpenDocs={() => setIsDocsOpen(true)}
        isOrchestrating={isOrchestrating}
        hasResult={Boolean(orchestrationResult)}
        onNewResume={() => setActiveView('editor')}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Error notification banner */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-lg bg-white border border-[#FA5252] text-[#C92A2A] text-xs flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#FA5252] shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="text-xs font-bold underline hover:no-underline"
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
          <div className="flex items-center justify-between bg-white p-1.5 rounded-lg border border-[#E9ECEF] shadow-xs mb-6 overflow-x-auto">
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveView('preview')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded transition-all ${
                  activeView === 'preview'
                    ? 'bg-[#1A1A1A] text-white font-bold'
                    : 'text-[#495057] hover:text-[#1A1A1A] hover:bg-[#F8F9FA]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume Preview & PDF</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveView('ats_audit')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded transition-all ${
                  activeView === 'ats_audit'
                    ? 'bg-[#1A1A1A] text-white font-bold'
                    : 'text-[#495057] hover:text-[#1A1A1A] hover:bg-[#F8F9FA]'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ATS Audit ({orchestrationResult.atsAnalysis.overallScore}/100)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveView('qa_report')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded transition-all ${
                  activeView === 'qa_report'
                    ? 'bg-[#1A1A1A] text-white font-bold'
                    : 'text-[#495057] hover:text-[#1A1A1A] hover:bg-[#F8F9FA]'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>QA Report ({orchestrationResult.qaReport.overallQualityScore}/100)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveView('editor')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded transition-all ${
                  activeView === 'editor'
                    ? 'bg-[#1A1A1A] text-white font-bold'
                    : 'text-[#495057] hover:text-[#1A1A1A] hover:bg-[#F8F9FA]'
                }`}
              >
                <span>Edit Input Data</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleRunOrchestration}
              disabled={isOrchestrating}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-[#F8F9FA] text-[#1A1A1A] hover:bg-[#E9ECEF] border border-[#E9ECEF] transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isOrchestrating ? 'animate-spin' : ''}`} />
              Re-Orchestrate
            </button>
          </div>
        )}

        {/* Dynamic View Rendering */}
        {activeView === 'editor' ? (
          <InputForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleRunOrchestration}
            isOrchestrating={isOrchestrating}
            onLoadSample={handleSelectSample}
          />
        ) : activeView === 'preview' && orchestrationResult ? (
          <ResumePreview
            resume={orchestrationResult.resume}
            markdownContent={orchestrationResult.markdownContent}
            plainTextContent={orchestrationResult.plainTextContent}
            atsAnalysis={orchestrationResult.atsAnalysis}
            qaReport={orchestrationResult.qaReport}
          />
        ) : activeView === 'ats_audit' && orchestrationResult ? (
          <div className="space-y-6">
            <AtsAnalysisCard analysis={orchestrationResult.atsAnalysis} />
            <ResumePreview
              resume={orchestrationResult.resume}
              markdownContent={orchestrationResult.markdownContent}
              plainTextContent={orchestrationResult.plainTextContent}
            />
          </div>
        ) : activeView === 'qa_report' && orchestrationResult ? (
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

      {/* Footer */}
      <footer className="mt-auto bg-white border-t border-[#E9ECEF] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#868E96]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#1A1A1A]">CrewMyResume</span>
            <span>&bull;</span>
            <span>Multi-Agent AI Resume Generation & Optimization</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsDocsOpen(true)}
              className="hover:text-[#1A1A1A] transition-colors"
            >
              Architecture & Agent Roles
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
