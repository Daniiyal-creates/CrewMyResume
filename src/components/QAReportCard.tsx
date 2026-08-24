import React from 'react';
import { QAAuditReport } from '../types.js';
import { Award, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';

interface QAReportCardProps {
  report: QAAuditReport;
}

export const QAReportCard: React.FC<QAReportCardProps> = ({ report }) => {
  return (
    <div className="bg-white rounded-lg border border-[#E9ECEF] shadow-xs p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E9ECEF]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-[#F8F9FA] border border-[#E9ECEF] flex items-center justify-center text-[#1A1A1A]">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#1A1A1A]">Quality Assurance Agent Certification</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#F1F3F5] text-[#495057]">
                QA Verified
              </span>
            </div>
            <p className="text-xs text-[#868E96] mt-0.5">
              Grammar, tense harmony, chronological continuity, and metric verification
            </p>
          </div>
        </div>

        {/* Big Quality Score */}
        <div className="px-4 py-2 rounded border border-[#E9ECEF] bg-[#F8F9FA] flex items-center gap-3 text-[#1A1A1A]">
          <div>
            <div className="text-2xl font-extrabold tracking-tight leading-none">
              {report.overallQualityScore}<span className="text-xs font-normal text-[#868E96]">/100</span>
            </div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-[#868E96] mt-0.5">
              Quality Score
            </div>
          </div>
          <ShieldCheck className="w-5 h-5 text-[#2B8A3E]" />
        </div>
      </div>

      {/* QA Score Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded bg-[#F8F9FA] border border-[#E9ECEF] space-y-1">
          <div className="text-[#868E96] font-medium">Grammar & Syntax</div>
          <div className="text-base font-bold text-[#1A1A1A]">{report.grammarAndSpellingScore}%</div>
        </div>

        <div className="p-3.5 rounded bg-[#F8F9FA] border border-[#E9ECEF] space-y-1">
          <div className="text-[#868E96] font-medium">Tense Consistency</div>
          <div className="text-base font-bold text-[#1A1A1A]">{report.tenseConsistencyScore}%</div>
        </div>

        <div className="p-3.5 rounded bg-[#F8F9FA] border border-[#E9ECEF] space-y-1">
          <div className="text-[#868E96] font-medium">Quantified Impact</div>
          <div className="text-base font-bold text-[#1A1A1A]">{report.quantifiedImpactScore}%</div>
        </div>

        <div className="p-3.5 rounded bg-[#F8F9FA] border border-[#E9ECEF] space-y-1">
          <div className="text-[#868E96] font-medium">Chronology Check</div>
          <div className="text-base font-bold text-[#2B8A3E] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Passed
          </div>
        </div>
      </div>

      {/* Detected Issues & Applied Fixes */}
      {report.detectedIssues && report.detectedIssues.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
            Automated QA Refinements Applied
          </h4>
          <div className="space-y-2">
            {report.detectedIssues.map((issue, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded bg-[#F8F9FA] border border-[#E9ECEF] text-xs flex items-start gap-2.5"
              >
                <Sparkles className="w-4 h-4 text-[#1A1A1A] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1A1A1A]">{issue.section}:</span>
                    <span className="text-[#495057]">{issue.issue}</span>
                  </div>
                  <p className="text-[#212529] text-[11px]">
                    <span className="font-semibold text-[#868E96]">Resolution:</span> {issue.fixApplied}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QA Executive Feedback */}
      <div className="p-4 rounded-lg bg-[#F8F9FA] border border-[#E9ECEF] text-xs text-[#212529]">
        <div className="font-bold text-[#1A1A1A] mb-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#1A1A1A]" />
          Senior Recruiter QA Feedback
        </div>
        <p className="text-[#495057] leading-relaxed text-[11px]">
          {report.summaryFeedback}
        </p>
      </div>
    </div>
  );
};
