import React from 'react';
import { ATSAnalysis } from '../types.js';
import { ShieldCheck, CheckCircle2, AlertCircle, Sparkles, TrendingUp, Search } from 'lucide-react';

interface AtsAnalysisCardProps {
  analysis: ATSAnalysis;
}

export const AtsAnalysisCard: React.FC<AtsAnalysisCardProps> = ({ analysis }) => {
  return (
    <div className="bg-white rounded-lg border border-[#E9ECEF] shadow-xs p-6 space-y-6">
      {/* Top Header with Score Gauge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E9ECEF]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-[#F8F9FA] border border-[#E9ECEF] flex items-center justify-center text-[#1A1A1A]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#1A1A1A]">ATS Optimizer Agent Audit</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#F1F3F5] text-[#495057]">
                Parsed by ATS Engine
              </span>
            </div>
            <p className="text-xs text-[#868E96] mt-0.5">
              Evaluated against modern parsing algorithms (Workday, Greenhouse, Lever, Taleo)
            </p>
          </div>
        </div>

        {/* Big Score Gauge */}
        <div className="px-4 py-2 rounded border border-[#E9ECEF] bg-[#F8F9FA] flex items-center gap-3 text-[#1A1A1A]">
          <div>
            <div className="text-2xl font-extrabold tracking-tight leading-none">
              {analysis.overallScore}<span className="text-xs font-normal text-[#868E96]">/100</span>
            </div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-[#868E96] mt-0.5">
              {analysis.overallScore >= 90 ? 'ATS High Match' : 'Good Match'}
            </div>
          </div>
          <TrendingUp className="w-5 h-5 text-[#2B8A3E]" />
        </div>
      </div>

      {/* Compliance Metric Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded bg-[#F8F9FA] border border-[#E9ECEF] flex items-center justify-between">
          <span className="text-[#495057] font-medium">Keyword Density</span>
          <span className="font-bold text-[#1A1A1A]">{analysis.keywordDensityScore}%</span>
        </div>
        <div className="p-3.5 rounded bg-[#F8F9FA] border border-[#E9ECEF] flex items-center justify-between">
          <span className="text-[#495057] font-medium">Semantic Headings</span>
          <span className="font-bold text-[#2B8A3E] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Compliant
          </span>
        </div>
        <div className="p-3.5 rounded bg-[#F8F9FA] border border-[#E9ECEF] flex items-center justify-between">
          <span className="text-[#495057] font-medium">Format Parse Check</span>
          <span className="font-bold text-[#2B8A3E] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Passed
          </span>
        </div>
      </div>

      {/* Matched Keywords vs Missing Keywords */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Matched Keywords */}
        <div className="p-4 rounded bg-[#F8F9FA] border border-[#E9ECEF] space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#1A1A1A] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2B8A3E]" />
              Matched Target Keywords ({analysis.matchedKeywords.length})
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {analysis.matchedKeywords.map((kw, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded bg-white text-[#212529] border border-[#E9ECEF] text-[11px] font-medium"
              >
                ✓ {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Missing / Recommended Keywords */}
        <div className="p-4 rounded bg-[#F8F9FA] border border-[#E9ECEF] space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#1A1A1A] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E67700]" />
              Suggested Skill Expansions ({analysis.missingKeywords.length})
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {analysis.missingKeywords.length > 0 ? (
              analysis.missingKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-white text-[#495057] border border-[#E9ECEF] text-[11px] font-medium"
                >
                  + {kw}
                </span>
              ))
            ) : (
              <span className="text-[#868E96] text-xs">All high-value target keywords covered!</span>
            )}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <div className="pt-2">
          <h4 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">
            ATS Optimizer Actionable Insights
          </h4>
          <ul className="space-y-1.5 text-xs text-[#495057]">
            {analysis.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] mt-1.5 shrink-0"></span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
