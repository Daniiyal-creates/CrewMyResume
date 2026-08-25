import React, { useState } from 'react';
import { UserResumeInput, WorkExperience, Education, ProjectItem, Certification } from '../types.js';
import {
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  User,
  Target,
  Plus,
  Trash2,
  Sparkles,
  Play,
  FileText,
  HelpCircle,
  Zap,
  CheckCircle2,
} from 'lucide-react';

interface InputFormProps {
  formData: UserResumeInput;
  setFormData: React.Dispatch<React.SetStateAction<UserResumeInput>>;
  onSubmit: (e: React.FormEvent) => void;
  isOrchestrating: boolean;
  onLoadSample: (key: string) => void;
}

type TabType = 'target' | 'personal' | 'experience' | 'skills' | 'education' | 'projects' | 'certifications';

export const InputForm: React.FC<InputFormProps> = ({
  formData,
  setFormData,
  onSubmit,
  isOrchestrating,
  onLoadSample,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('target');

  // Input helper handlers
  const updatePersonalInfo = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const addExperience = () => {
    const newExp: WorkExperience = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      highlights: [''],
    };
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }));
  };

  const updateExperience = (index: number, field: keyof WorkExperience, value: any) => {
    setFormData((prev) => {
      const nextExp = [...prev.experience];
      nextExp[index] = { ...nextExp[index], [field]: value };
      return { ...prev, experience: nextExp };
    });
  };

  const removeExperience = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const updateHighlight = (expIdx: number, hlIdx: number, val: string) => {
    setFormData((prev) => {
      const nextExp = [...prev.experience];
      const nextHl = [...nextExp[expIdx].highlights];
      nextHl[hlIdx] = val;
      nextExp[expIdx].highlights = nextHl;
      return { ...prev, experience: nextExp };
    });
  };

  const addHighlight = (expIdx: number) => {
    setFormData((prev) => {
      const nextExp = [...prev.experience];
      nextExp[expIdx].highlights = [...nextExp[expIdx].highlights, ''];
      return { ...prev, experience: nextExp };
    });
  };

  const removeHighlight = (expIdx: number, hlIdx: number) => {
    setFormData((prev) => {
      const nextExp = [...prev.experience];
      nextExp[expIdx].highlights = nextExp[expIdx].highlights.filter((_, i) => i !== hlIdx);
      return { ...prev, experience: nextExp };
    });
  };

  // Education handlers
  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      fieldOfStudy: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      honors: '',
    };
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }));
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    setFormData((prev) => {
      const nextEdu = [...prev.education];
      nextEdu[index] = { ...nextEdu[index], [field]: value };
      return { ...prev, education: nextEdu };
    });
  };

  const removeEducation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  // Skills tag string helper
  const handleSkillsChange = (category: keyof typeof formData.skills, text: string) => {
    const arr = text.split(',').map((s) => s.trim()).filter(Boolean);
    setFormData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: arr,
      },
    }));
  };

  // Projects handlers
  const addProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: '',
      role: '',
      link: '',
      technologies: [],
      description: '',
      highlights: [''],
    };
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProj],
    }));
  };

  const updateProject = (index: number, field: keyof ProjectItem, value: any) => {
    setFormData((prev) => {
      const nextProj = [...prev.projects];
      nextProj[index] = { ...nextProj[index], [field]: value };
      return { ...prev, projects: nextProj };
    });
  };

  const removeProject = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  // Certifications handlers
  const addCertification = () => {
    const newCert: Certification = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: '',
      credentialId: '',
    };
    setFormData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newCert],
    }));
  };

  const updateCertification = (index: number, field: keyof Certification, value: string) => {
    setFormData((prev) => {
      const nextCert = [...prev.certifications];
      nextCert[index] = { ...nextCert[index], [field]: value };
      return { ...prev, certifications: nextCert };
    });
  };

  const removeCertification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  const tabs: Array<{ id: TabType; label: string; icon: React.ReactNode; count?: number }> = [
    { id: 'target', label: 'Target Job & JD', icon: <Target className="w-4 h-4" /> },
    { id: 'personal', label: 'Contact Info', icon: <User className="w-4 h-4" /> },
    { id: 'experience', label: 'Work History', icon: <Briefcase className="w-4 h-4" />, count: formData.experience.length },
    { id: 'skills', label: 'Skills & Tech', icon: <Wrench className="w-4 h-4" /> },
    { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" />, count: formData.education.length },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-4 h-4" />, count: formData.projects.length },
    { id: 'certifications', label: 'Certifications', icon: <Award className="w-4 h-4" />, count: formData.certifications.length },
  ];

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Form top banner & trigger button */}
      <div className="p-6 bg-white border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold tracking-tight text-slate-900">
              Candidate Profile & Job Target Specifications
            </h2>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono-code font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100">
              Studio Input
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Fill in candidate details or load a sample preset, then launch the 5 autonomous agents.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Quick presets pills */}
          <div className="hidden sm:flex items-center gap-1 text-xs text-slate-500">
            <span className="text-[10px] font-mono-code uppercase font-bold text-slate-400">Presets:</span>
            <button
              type="button"
              onClick={() => onLoadSample('software_engineer')}
              className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer"
            >
              AI Eng
            </button>
            <button
              type="button"
              onClick={() => onLoadSample('product_manager')}
              className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer"
            >
              PM
            </button>
            <button
              type="button"
              onClick={() => onLoadSample('cloud_architect')}
              className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer"
            >
              Architect
            </button>
          </div>

          <button
            type="submit"
            disabled={isOrchestrating}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold tracking-wide uppercase bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isOrchestrating ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Orchestrating Pipeline...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Orchestrate Resume Crew</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                isActive
                  ? 'border-indigo-600 text-indigo-600 bg-white font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && tab.count > 0 && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono-code font-bold ${
                    isActive ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* TAB 1: TARGET JOB & JD */}
        {activeTab === 'target' && (
          <div className="space-y-5">
            <div className="bg-indigo-50/60 rounded-xl p-4 border border-indigo-100 flex items-start gap-3 text-xs text-slate-700">
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900">Target Role & ATS Vector Extraction:</p>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  The ATS Optimizer Agent extracts technical keywords, required tools, and domain taxonomy from the job description to align your resume keyword density to 90%+.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-mono-code">
                  Target Job Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Full-Stack AI Engineer"
                  value={formData.targetJobTitle}
                  onChange={(e) => setFormData({ ...formData, targetJobTitle: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none text-slate-900 transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-mono-code">
                  Target Industry / Domain
                </label>
                <input
                  type="text"
                  placeholder="e.g. Enterprise SaaS, FinTech, Generative AI"
                  value={formData.targetIndustry}
                  onChange={(e) => setFormData({ ...formData, targetIndustry: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none text-slate-900 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-mono-code">
                Target Job Description (Paste from Job Posting)
              </label>
              <textarea
                rows={6}
                placeholder="Paste requirements, qualifications, and role responsibilities from LinkedIn, Greenhouse, Lever, or company careers page..."
                value={formData.jobDescription || ''}
                onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none font-mono-code text-slate-900 leading-relaxed transition-all"
              />
            </div>
          </div>
        )}

        {/* TAB 2: PERSONAL INFO */}
        {activeTab === 'personal' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-mono-code">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none text-slate-900 transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-mono-code">
                  Current Professional Headline *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Software Engineer | Full-Stack & AI Systems"
                  value={formData.personalInfo.jobTitle}
                  onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none text-slate-900 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-mono-code">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="alex.morgan@gmail.com"
                  value={formData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none text-slate-900 transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-mono-code">Phone</label>
                <input
                  type="text"
                  placeholder="+1 (415) 890-3412"
                  value={formData.personalInfo.phone || ''}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none text-slate-900 transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-mono-code">Location</label>
                <input
                  type="text"
                  placeholder="San Francisco, CA (Open to Remote)"
                  value={formData.personalInfo.location || ''}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none text-slate-900 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-mono-code">LinkedIn URL</label>
                <input
                  type="text"
                  placeholder="linkedin.com/in/alexmorgan-dev"
                  value={formData.personalInfo.linkedin || ''}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none text-slate-900 transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-mono-code">GitHub URL</label>
                <input
                  type="text"
                  placeholder="github.com/alexmorgantech"
                  value={formData.personalInfo.github || ''}
                  onChange={(e) => updatePersonalInfo('github', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none text-slate-900 transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-mono-code">Portfolio Website</label>
                <input
                  type="text"
                  placeholder="alexmorgan.io"
                  value={formData.personalInfo.website || ''}
                  onChange={(e) => updatePersonalInfo('website', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none text-slate-900 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-mono-code">
                Draft Executive Summary (Optional - Content Strategist will optimize)
              </label>
              <textarea
                rows={3}
                placeholder="Brief summary of your career background, core domains, and major leadership achievements..."
                value={formData.summary || ''}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none text-slate-900 leading-relaxed transition-all"
              />
            </div>
          </div>
        )}

        {/* TAB 3: WORK HISTORY (GOOGLE XYZ FORMULA HERO) */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            {/* Google XYZ Guidance Banner */}
            <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-3">
              <Zap className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <span className="font-bold text-indigo-950 font-mono-code uppercase">
                  Content Strategist: Google XYZ Optimization
                </span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Enter rough bullet points or duties. The agent will transform each into the formula:
                  <strong className="text-indigo-900 font-mono-code block mt-0.5">
                    &quot;Accomplished [X], as measured by [Y], by doing [Z]&quot;
                  </strong>
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-500">
                Work Experience Positions ({formData.experience.length})
              </span>
              <button
                type="button"
                onClick={addExperience}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Position
              </button>
            </div>

            {formData.experience.map((exp, expIdx) => (
              <div key={exp.id || expIdx} className="p-5 rounded-xl bg-slate-50/80 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="font-bold text-xs text-slate-900 font-mono-code">
                    Position #{expIdx + 1}: {exp.position || 'Untitled Role'} @ {exp.company || 'Company'}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeExperience(expIdx)}
                    className="p-1 rounded-md text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Remove position"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Company *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Synthetix AI Systems"
                      value={exp.company}
                      onChange={(e) => updateExperience(expIdx, 'company', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Job Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lead Full-Stack AI Engineer"
                      value={exp.position}
                      onChange={(e) => updateExperience(expIdx, 'position', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Start Date *</label>
                    <input
                      type="text"
                      placeholder="e.g. 2022-03"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(expIdx, 'startDate', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">End Date *</label>
                    <input
                      type="text"
                      placeholder="e.g. Present or 2024-01"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(expIdx, 'endDate', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Location</label>
                    <input
                      type="text"
                      placeholder="e.g. San Francisco, CA"
                      value={exp.location || ''}
                      onChange={(e) => updateExperience(expIdx, 'location', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                {/* Highlights / Bullets */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 font-mono-code">
                      Key Accomplishments & Bullet Points
                    </label>
                    <button
                      type="button"
                      onClick={() => addHighlight(expIdx)}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" /> Add Bullet Point
                    </button>
                  </div>

                  {exp.highlights.map((hl, hlIdx) => (
                    <div key={hlIdx} className="flex items-start gap-2">
                      <textarea
                        rows={2}
                        placeholder="e.g. Designed and deployed an agentic LLM orchestration engine using LangChain, reducing multi-step extraction time by 62% for 450k enterprise users."
                        value={hl}
                        onChange={(e) => updateHighlight(expIdx, hlIdx, e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 outline-none focus:border-indigo-600 font-mono-code text-[11px]"
                      />
                      <button
                        type="button"
                        onClick={() => removeHighlight(expIdx, hlIdx)}
                        className="p-1.5 rounded text-slate-400 hover:text-rose-600 transition-colors cursor-pointer mt-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: SKILLS */}
        {activeTab === 'skills' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">
              Provide comma-separated lists. The ATS Optimizer Agent will match these against target job keywords.
            </p>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1 font-mono-code">
                Technical Skills & Programming Languages *
              </label>
              <textarea
                rows={2}
                placeholder="TypeScript, Python, Node.js, React 19, Go, SQL, PostgreSQL, Redis"
                value={formData.skills.technical.join(', ')}
                onChange={(e) => handleSkillsChange('technical', e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-600 outline-none font-mono-code text-slate-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1 font-mono-code">
                Frameworks, Cloud & Developer Tools *
              </label>
              <textarea
                rows={2}
                placeholder="LangChain, CrewAI, Kubernetes, Docker, AWS (ECS, Lambda), Terraform, Git, CI/CD"
                value={formData.skills.frameworksAndTools.join(', ')}
                onChange={(e) => handleSkillsChange('frameworksAndTools', e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-600 outline-none font-mono-code text-slate-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1 font-mono-code">
                Leadership, Methodologies & Soft Skills
              </label>
              <textarea
                rows={2}
                placeholder="Technical Leadership, System Architecture Design, Cross-functional Mentorship, Agile/Scrum"
                value={formData.skills.softSkills.join(', ')}
                onChange={(e) => handleSkillsChange('softSkills', e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-600 outline-none text-slate-900"
              />
            </div>
          </div>
        )}

        {/* TAB 5: EDUCATION */}
        {activeTab === 'education' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-500">
                Education Entries ({formData.education.length})
              </span>
              <button
                type="button"
                onClick={addEducation}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Degree
              </button>
            </div>

            {formData.education.map((edu, eduIdx) => (
              <div key={edu.id || eduIdx} className="p-5 rounded-xl bg-slate-50/80 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 font-mono-code">
                    Degree #{eduIdx + 1}: {edu.degree || 'Degree'} ({edu.institution || 'University'})
                  </span>
                  <button
                    type="button"
                    onClick={() => removeEducation(eduIdx)}
                    className="p-1 rounded text-rose-600 hover:bg-rose-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Institution *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. UC Berkeley"
                      value={edu.institution}
                      onChange={(e) => updateEducation(eduIdx, 'institution', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Degree & Major *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bachelor of Science in Computer Science"
                      value={edu.degree}
                      onChange={(e) => updateEducation(eduIdx, 'degree', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Graduation Year / Dates</label>
                    <input
                      type="text"
                      placeholder="e.g. 2018 - 2022"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(eduIdx, 'endDate', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">GPA / Honors</label>
                    <input
                      type="text"
                      placeholder="e.g. 3.85 / 4.0, Magna Cum Laude"
                      value={edu.honors || ''}
                      onChange={(e) => updateEducation(eduIdx, 'honors', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Berkeley, CA"
                      value={edu.location || ''}
                      onChange={(e) => updateEducation(eduIdx, 'location', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 6: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-500">
                Key Technical Projects ({formData.projects.length})
              </span>
              <button
                type="button"
                onClick={addProject}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Project
              </button>
            </div>

            {formData.projects.map((proj, pIdx) => (
              <div key={proj.id || pIdx} className="p-5 rounded-xl bg-slate-50/80 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 font-mono-code">
                    Project #{pIdx + 1}: {proj.name || 'Untitled Project'}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeProject(pIdx)}
                    className="p-1 rounded text-rose-600 hover:bg-rose-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Project Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. AgentFlow Studio"
                      value={proj.name}
                      onChange={(e) => updateProject(pIdx, 'name', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Project URL / GitHub</label>
                    <input
                      type="text"
                      placeholder="github.com/username/project"
                      value={proj.link || ''}
                      onChange={(e) => updateProject(pIdx, 'link', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Technologies Used (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="TypeScript, LangChain, React, FastAPI"
                    value={proj.technologies ? proj.technologies.join(', ') : ''}
                    onChange={(e) =>
                      updateProject(
                        pIdx,
                        'technologies',
                        e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                      )
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 outline-none focus:border-indigo-600 font-mono-code"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Project Impact & Architecture</label>
                  <textarea
                    rows={2}
                    placeholder="Describe problem solved, metrics achieved, and architecture..."
                    value={proj.description}
                    onChange={(e) => updateProject(pIdx, 'description', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 outline-none focus:border-indigo-600 font-mono-code"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 7: CERTIFICATIONS */}
        {activeTab === 'certifications' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-500">
                Certifications ({formData.certifications.length})
              </span>
              <button
                type="button"
                onClick={addCertification}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Certification
              </button>
            </div>

            {formData.certifications.map((cert, cIdx) => (
              <div key={cert.id || cIdx} className="p-5 rounded-xl bg-slate-50/80 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 font-mono-code">
                    Certification #{cIdx + 1}: {cert.name || 'Untitled'}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeCertification(cIdx)}
                    className="p-1 rounded text-rose-600 hover:bg-rose-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Certification Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. AWS Certified Solutions Architect"
                      value={cert.name}
                      onChange={(e) => updateCertification(cIdx, 'name', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Issuing Organization *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Amazon Web Services"
                      value={cert.issuer}
                      onChange={(e) => updateCertification(cIdx, 'issuer', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Date / Credential ID</label>
                    <input
                      type="text"
                      placeholder="e.g. 2023-11 [ID: AWS-9812]"
                      value={cert.date}
                      onChange={(e) => updateCertification(cIdx, 'date', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </form>
  );
};
