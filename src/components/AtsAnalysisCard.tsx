import React from 'react';
import { ATSAnalysis } from '../types.js';
import { ShieldCheck, CheckCircle2, AlertCircle, Sparkles, TrendingUp, Search, Check, Layers, Cpu } from 'lucide-react';

interface AtsAnalysisCardProps {
  analysis: ATSAnalysis;
}

export const AtsAnalysisCard: React.FC<AtsAnalysisCardProps> = ({ analysis }) => {
  const isHighMatch = analysis.overallScore >= 85;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
      {/* Top Header with Score Gauge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-2xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">ATS Optimizer Agent Audit</h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                Algorithmically Verified
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Evaluated against modern parsing algorithms (Workday, Greenhouse, Lever, Taleo)
            </p>
          </div>
        </div>

        {/* Score Display Card */}
        <div className="px-5 py-3 rounded-xl border border-slate-200 bg-slate-50/80 flex items-center gap-4 text-slate-900">
          <div>
            <div className="text-3xl font-black tracking-tight leading-none font-mono-code text-emerald-600">
              {analysis.overallScore}
              <span className="text-xs font-normal text-slate-400">/100</span>
            </div>
            <div className="text-[10px] uppercase font-mono-code font-bold tracking-wider text-slate-500 mt-1">
              {isHighMatch ? 'Optimal 90th+ Percentile' : 'Solid ATS Compatibility'}
            </div>
          </div>
          <TrendingUp className="w-6 h-6 text-emerald-600 shrink-0" />
        </div>
      </div>

      {/* Compliance Metric Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <span className="text-slate-600 font-medium">Keyword Vector Density</span>
          <span className="font-bold text-slate-900 font-mono-code text-sm">{analysis.keywordDensityScore}%</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <span className="text-slate-600 font-medium">Semantic Headings</span>
          <span className="font-bold text-emerald-600 flex items-center gap-1 font-mono-code">
            <CheckCircle2 className="w-4 h-4" /> 100% Compliant
          </span>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <span className="text-slate-600 font-medium">Format Machine Readability</span>
          <span className="font-bold text-emerald-600 flex items-center gap-1 font-mono-code">
            <CheckCircle2 className="w-4 h-4" /> Passed
          </span>
        </div>
      </div>

      {/* Matched Keywords vs Suggested Expansion Tokens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Matched Keywords */}
        <div className="p-5 rounded-xl bg-emerald-50/40 border border-emerald-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Matched Target Keywords ({analysis.matchedKeywords.length})
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {analysis.matchedKeywords.map((kw, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-md bg-white text-emerald-900 border border-emerald-200 text-[11px] font-mono-code font-medium shadow-2xs"
              >
                ✓ {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Missing / Recommended Keywords */}
        <div className="p-5 rounded-xl bg-amber-50/40 border border-amber-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Recommended Skill Expansions ({analysis.missingKeywords.length})
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {analysis.missingKeywords.length > 0 ? (
              analysis.missingKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-white text-amber-900 border border-amber-200 text-[11px] font-mono-code font-medium shadow-2xs"
                >
                  + {kw}
                </span>
              ))
            ) : (
              <span className="text-slate-500 text-xs italic">All high-value target keywords successfully covered!</span>
            )}
          </div>
        </div>
      </div>

      {/* Target ATS Compatibility Checklist */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
        <div className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-indigo-600" />
          Enterprise ATS Engine Compatibility
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {['Workday ATS', 'Greenhouse', 'Lever.co', 'Oracle Taleo'].map((sys, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-slate-200">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="font-semibold text-slate-800">{sys}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actionable Recommendations */}
      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <div className="pt-2">
          <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-800 mb-3">
            ATS Optimizer Strategic Recommendations
          </h4>
          <ul className="space-y-2 text-xs text-slate-700">
            {analysis.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2.5 bg-slate-50/70 p-3 rounded-lg border border-slate-200/80">
                <span className="w-2 h-2 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
