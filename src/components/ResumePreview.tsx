import React, { useState } from 'react';
import {
  FinalStructuredResume,
  ResumeTemplateId,
  TemplateCustomization,
  ATSAnalysis,
  QAAuditReport,
} from '../types.js';
import { exportResumeToPdf } from './PdfExportHelper.js';
import {
  Download,
  FileCode,
  Copy,
  Check,
  Palette,
  Type,
  Layout,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  Share2,
  Printer,
  Sparkles,
  FileJson,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ResumePreviewProps {
  resume: FinalStructuredResume;
  markdownContent: string;
  plainTextContent: string;
  atsAnalysis?: ATSAnalysis;
  qaReport?: QAAuditReport;
}

const COLOR_OPTIONS = [
  { name: 'Emerald / Focus', value: '#047857' },
  { name: 'Emerald / Growth', value: '#059669' },
  { name: 'Moss / Calm', value: '#4D7C0F' },
  { name: 'Sage / Nordic', value: '#0F766E' },
  { name: 'Obsidian / Slate', value: '#0F172A' },
];

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  resume,
  markdownContent,
  plainTextContent,
  atsAnalysis,
  qaReport,
}) => {
  const [customization, setCustomization] = useState<TemplateCustomization>({
    templateId: 'modern',
    accentColor: '#047857',
    fontFamily: 'sans',
    spacingDensity: 'balanced',
    showBorders: true,
  });

  const [copied, setCopied] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const handleCopyPlainText = () => {
    navigator.clipboard.writeText(plainTextContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const blob = new Blob([JSON.stringify(resume, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportPdf = async () => {
    try {
      setIsExportingPdf(true);
      await exportResumeToPdf('resume-document-container', resume.personalInfo.fullName);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const p = resume.personalInfo;

  // Density spacing styles
  const densityStyles = {
    compact: {
      pad: 'p-6 sm:p-8',
      gap: 'space-y-3.5',
      sectionGap: 'space-y-1.5',
      bulletGap: 'space-y-1',
      fontSize: 'text-xs',
    },
    balanced: {
      pad: 'p-8 sm:p-10',
      gap: 'space-y-5',
      sectionGap: 'space-y-2.5',
      bulletGap: 'space-y-1.5',
      fontSize: 'text-xs sm:text-[13px]',
    },
    spacious: {
      pad: 'p-10 sm:p-12',
      gap: 'space-y-6',
      sectionGap: 'space-y-3',
      bulletGap: 'space-y-2',
      fontSize: 'text-sm',
    },
  }[customization.spacingDensity];

  // Font family styles
  const fontClass = {
    sans: 'font-sans',
    serif: 'font-serif',
    mono: 'font-mono-code',
  }[customization.fontFamily];

  return (
    <div className="space-y-6">
      {/* Top Toolbar & Customization Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
        {/* Template Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono-code font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Layout className="w-3.5 h-3.5 text-emerald-700" /> Template:
          </span>
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
            {(
              [
                { id: 'modern', label: 'Modern Clean' },
                { id: 'executive', label: 'Executive Serif' },
                { id: 'minimal', label: 'Tech Minimal' },
                { id: 'nordic', label: 'Nordic Slate' },
              ] as const
            ).map((tpl) => (
              <button
                key={tpl.id}
                type="button"
                onClick={() => {
                  setCustomization({
                    ...customization,
                    templateId: tpl.id,
                    fontFamily: tpl.id === 'executive' ? 'serif' : tpl.id === 'minimal' ? 'mono' : 'sans',
                  });
                }}
                className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
                  customization.templateId === tpl.id
                    ? 'bg-slate-900 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tpl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Color Picker & Spacing */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Palette className="w-3.5 h-3.5 text-slate-400" />
            <div className="flex items-center gap-1.5">
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  title={c.name}
                  onClick={() => setCustomization({ ...customization, accentColor: c.value })}
                  style={{ backgroundColor: c.value }}
                  className={`w-5 h-5 rounded-full transition-transform cursor-pointer ${
                    customization.accentColor === c.value
                      ? 'ring-2 ring-offset-2 ring-slate-900 scale-110'
                      : 'hover:scale-105 opacity-80 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          {/* Density Selector */}
          <select
            value={customization.spacingDensity}
            onChange={(e) =>
              setCustomization({
                ...customization,
                spacingDensity: e.target.value as TemplateCustomization['spacingDensity'],
              })
            }
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-800 outline-none font-medium cursor-pointer"
          >
            <option value="compact">Compact (1-Page Target)</option>
            <option value="balanced">Balanced (Standard)</option>
            <option value="spacious">Spacious (2-Page Flow)</option>
          </select>
        </div>

        {/* Export Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyPlainText}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Text'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Download formatted Markdown"
          >
            <FileCode className="w-3.5 h-3.5 text-slate-700" />
            <span className="hidden sm:inline">Markdown</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadJson}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Export raw JSON schema"
          >
            <FileJson className="w-3.5 h-3.5 text-slate-700" />
            <span className="hidden sm:inline">JSON</span>
          </button>

          <button
            type="button"
            onClick={handleExportPdf}
            disabled={isExportingPdf}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isExportingPdf ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* The Authentic Document Simulation Paper Container */}
      <div className="overflow-x-auto pb-8 pt-2">
        <div
          id="resume-document-container"
          className={`mx-auto bg-white text-[#0F172A] resume-paper-shadow rounded-xl border border-slate-200 max-w-[850px] min-h-[1100px] ${densityStyles.pad} ${densityStyles.gap} ${fontClass} leading-normal transition-all`}
        >
          {/* ==================================================== */}
          {/* HEADER SECTION */}
          {/* ==================================================== */}
          <div
            className={`border-b pb-4 space-y-2 ${
              customization.templateId === 'executive' ? 'text-center' : ''
            }`}
            style={{ borderColor: `${customization.accentColor}30` }}
          >
            <div
              className={`flex flex-col ${
                customization.templateId === 'executive'
                  ? 'items-center justify-center'
                  : 'sm:flex-row sm:items-baseline justify-between gap-1'
              }`}
            >
              <h1
                className="text-2xl sm:text-3xl font-black tracking-tight"
                style={{ color: customization.accentColor }}
              >
                {p.fullName}
              </h1>
              <span className="text-sm font-semibold text-slate-600">{p.jobTitle}</span>
            </div>

            {/* Contact details row */}
            <div
              className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 font-medium ${
                customization.templateId === 'executive' ? 'justify-center' : ''
              }`}
            >
              {p.email && (
                <div className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-slate-400" />
                  <span>{p.email}</span>
                </div>
              )}
              {p.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span>{p.phone}</span>
                </div>
              )}
              {p.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{p.location}</span>
                </div>
              )}
              {p.linkedin && (
                <div className="flex items-center gap-1">
                  <Linkedin className="w-3 h-3 text-slate-400" />
                  <span>{p.linkedin.replace(/^https?:\/\//, '')}</span>
                </div>
              )}
              {p.github && (
                <div className="flex items-center gap-1">
                  <Github className="w-3 h-3 text-slate-400" />
                  <span>{p.github.replace(/^https?:\/\//, '')}</span>
                </div>
              )}
              {p.website && (
                <div className="flex items-center gap-1">
                  <Globe className="w-3 h-3 text-slate-400" />
                  <span>{p.website.replace(/^https?:\/\//, '')}</span>
                </div>
              )}
            </div>
          </div>

          {/* ==================================================== */}
          {/* PROFESSIONAL SUMMARY */}
          {/* ==================================================== */}
          {resume.summary && (
            <div className={densityStyles.sectionGap}>
              <h2
                className="text-xs font-bold uppercase tracking-wider border-b pb-1 font-mono-code"
                style={{ color: customization.accentColor, borderColor: `${customization.accentColor}25` }}
              >
                Executive Summary
              </h2>
              <p className={`${densityStyles.fontSize} text-slate-700 leading-relaxed text-justify`}>
                {resume.summary}
              </p>
            </div>
          )}

          {/* ==================================================== */}
          {/* WORK EXPERIENCE */}
          {/* ==================================================== */}
          {resume.experience && resume.experience.length > 0 && (
            <div className={densityStyles.sectionGap}>
              <h2
                className="text-xs font-bold uppercase tracking-wider border-b pb-1 font-mono-code"
                style={{ color: customization.accentColor, borderColor: `${customization.accentColor}25` }}
              >
                Professional Experience
              </h2>
              <div className="space-y-4 pt-1">
                {resume.experience.map((exp, idx) => (
                  <div key={exp.id || idx} className="space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-900 text-sm sm:text-xs">{exp.position}</span>
                        <span className="text-slate-600 font-medium"> &mdash; {exp.company}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono-code">
                        <span>
                          {exp.startDate} &ndash; {exp.endDate}
                        </span>
                        {exp.location && <span> | {exp.location}</span>}
                      </div>
                    </div>

                    <ul className={`${densityStyles.bulletGap} list-disc list-outside pl-4 ${densityStyles.fontSize} text-slate-700 leading-relaxed`}>
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* KEY PROJECTS */}
          {/* ==================================================== */}
          {resume.projects && resume.projects.length > 0 && (
            <div className={densityStyles.sectionGap}>
              <h2
                className="text-xs font-bold uppercase tracking-wider border-b pb-1 font-mono-code"
                style={{ color: customization.accentColor, borderColor: `${customization.accentColor}25` }}
              >
                Key Projects & Technical Initiatives
              </h2>
              <div className="space-y-3 pt-1">
                {resume.projects.map((proj, idx) => (
                  <div key={proj.id || idx} className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{proj.name}</span>
                        {proj.role && <span className="text-slate-500 italic">({proj.role})</span>}
                        {proj.link && (
                          <span className="text-[11px] text-emerald-700 font-medium">
                            {proj.link.replace(/^https?:\/\//, '')}
                          </span>
                        )}
                      </div>
                      {proj.technologies && proj.technologies.length > 0 && (
                        <span className="text-[11px] text-slate-500 font-mono-code">
                          [{proj.technologies.join(', ')}]
                        </span>
                      )}
                    </div>

                    <ul className={`${densityStyles.bulletGap} list-disc list-outside pl-4 ${densityStyles.fontSize} text-slate-700 leading-relaxed`}>
                      {proj.bullets.map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TECHNICAL & PROFESSIONAL SKILLS */}
          {/* ==================================================== */}
          {resume.skills && (
            <div className={densityStyles.sectionGap}>
              <h2
                className="text-xs font-bold uppercase tracking-wider border-b pb-1 font-mono-code"
                style={{ color: customization.accentColor, borderColor: `${customization.accentColor}25` }}
              >
                Technical & Core Competencies
              </h2>
              <div className={`space-y-1 pt-1 ${densityStyles.fontSize} text-slate-700`}>
                {resume.skills.technical && resume.skills.technical.length > 0 && (
                  <div>
                    <span className="font-bold text-slate-900">Languages & Core: </span>
                    <span>{resume.skills.technical.join(', ')}</span>
                  </div>
                )}
                {resume.skills.frameworksAndTools && resume.skills.frameworksAndTools.length > 0 && (
                  <div>
                    <span className="font-bold text-slate-900">Frameworks & Cloud: </span>
                    <span>{resume.skills.frameworksAndTools.join(', ')}</span>
                  </div>
                )}
                {resume.skills.softSkills && resume.skills.softSkills.length > 0 && (
                  <div>
                    <span className="font-bold text-slate-900">Methodologies & Leadership: </span>
                    <span>{resume.skills.softSkills.join(', ')}</span>
                  </div>
                )}
                {resume.skills.languages && resume.skills.languages.length > 0 && (
                  <div>
                    <span className="font-bold text-slate-900">Spoken Languages: </span>
                    <span>{resume.skills.languages.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* EDUCATION */}
          {/* ==================================================== */}
          {resume.education && resume.education.length > 0 && (
            <div className={densityStyles.sectionGap}>
              <h2
                className="text-xs font-bold uppercase tracking-wider border-b pb-1 font-mono-code"
                style={{ color: customization.accentColor, borderColor: `${customization.accentColor}25` }}
              >
                Education
              </h2>
              <div className="space-y-2 pt-1">
                {resume.education.map((edu, idx) => (
                  <div key={edu.id || idx} className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900">
                        {edu.degree} in {edu.fieldOfStudy}
                      </span>
                      <span className="text-slate-600"> &mdash; {edu.institution}</span>
                      {edu.honors && <span className="text-slate-500 italic"> ({edu.honors})</span>}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono-code">
                      <span>
                        {edu.startDate} &ndash; {edu.endDate}
                      </span>
                      {edu.location && <span> | {edu.location}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* CERTIFICATIONS */}
          {/* ==================================================== */}
          {resume.certifications && resume.certifications.length > 0 && (
            <div className={densityStyles.sectionGap}>
              <h2
                className="text-xs font-bold uppercase tracking-wider border-b pb-1 font-mono-code"
                style={{ color: customization.accentColor, borderColor: `${customization.accentColor}25` }}
              >
                Certifications & Accreditations
              </h2>
              <div className={`space-y-1 pt-1 ${densityStyles.fontSize} text-slate-700`}>
                {resume.certifications.map((cert, idx) => (
                  <div key={cert.id || idx} className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-slate-900">{cert.name}</span>
                      <span className="text-slate-500"> &mdash; {cert.issuer}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono-code">{cert.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
