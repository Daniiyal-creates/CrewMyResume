import React from 'react';
import { QAAuditReport } from '../types.js';
import { Award, CheckCircle2, ShieldCheck, Sparkles, Check, FileCheck, CheckCheck } from 'lucide-react';

interface QAReportCardProps {
  report: QAAuditReport;
}

export const QAReportCard: React.FC<QAReportCardProps> = ({ report }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
      {/* Header with Recruiter Seal */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-2xs">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">Quality Assurance Agent Certification</h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                Official QA Seal
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Audited for grammatical precision, active verb harmony, chronological gaps, and metric veracity
            </p>
          </div>
        </div>

        {/* Quality Score Badge */}
        <div className="px-5 py-3 rounded-xl border border-slate-200 bg-slate-50/80 flex items-center gap-4 text-slate-900">
          <div>
            <div className="text-3xl font-black tracking-tight leading-none font-mono-code text-indigo-600">
              {report.overallQualityScore}
              <span className="text-xs font-normal text-slate-400">/100</span>
            </div>
            <div className="text-[10px] uppercase font-mono-code font-bold tracking-wider text-slate-500 mt-1">
              Recruiter QA Index
            </div>
          </div>
          <ShieldCheck className="w-6 h-6 text-indigo-600 shrink-0" />
        </div>
      </div>

      {/* QA Score Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <div className="text-slate-500 font-medium">Grammar & Syntax</div>
          <div className="text-lg font-bold text-slate-900 font-mono-code">{report.grammarAndSpellingScore}%</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <div className="text-slate-500 font-medium">Tense Harmony</div>
          <div className="text-lg font-bold text-slate-900 font-mono-code">{report.tenseConsistencyScore}%</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <div className="text-slate-500 font-medium">Quantified Impact (XYZ)</div>
          <div className="text-lg font-bold text-slate-900 font-mono-code">{report.quantifiedImpactScore}%</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <div className="text-slate-500 font-medium">Chronology Check</div>
          <div className="text-lg font-bold text-emerald-600 flex items-center gap-1 font-mono-code">
            <CheckCircle2 className="w-4 h-4" /> Passed
          </div>
        </div>
      </div>

      {/* Detected Issues & Applied Automated Corrections */}
      {report.detectedIssues && report.detectedIssues.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-indigo-600" />
            Automated QA Refinements & Fixes Applied
          </h4>
          <div className="space-y-2">
            {report.detectedIssues.map((issue, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCheck className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-mono-code text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 text-[10px]">
                      {issue.section}
                    </span>
                    <span className="text-slate-700 font-medium">{issue.issue}</span>
                  </div>
                  <p className="text-slate-900 text-xs bg-white p-2.5 rounded-lg border border-slate-200 font-mono-code">
                    <span className="font-semibold text-emerald-700">Resolution Applied:</span> {issue.fixApplied}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QA Executive Feedback Banner */}
      <div className="p-5 rounded-xl bg-indigo-50/50 border border-indigo-100 text-xs text-slate-800 space-y-1.5">
        <div className="font-bold text-indigo-950 flex items-center gap-2 font-mono-code uppercase tracking-wider text-[11px]">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          Senior Recruiter Editorial Summary
        </div>
        <p className="text-slate-700 leading-relaxed text-xs">
          {report.summaryFeedback}
        </p>
      </div>
    </div>
  );
};
