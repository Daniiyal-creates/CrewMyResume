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
    <form onSubmit={onSubmit} className="bg-white rounded-lg border border-[#E9ECEF] shadow-xs overflow-hidden">
      {/* Form top banner & trigger button */}
      <div className="p-6 bg-white border-b border-[#E9ECEF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold tracking-tight text-[#1A1A1A]">
              Candidate Profile & Target Specifications
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#F1F3F5] text-[#495057]">
              Input Data
            </span>
          </div>
          <p className="text-xs text-[#868E96] mt-0.5">
            Fill in candidate details or load a preset, then orchestrate the 5 autonomous agents.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="submit"
            disabled={isOrchestrating}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded text-xs font-bold tracking-wide uppercase bg-[#1A1A1A] hover:bg-black text-white shadow-xs transition-all disabled:opacity-50 cursor-pointer"
          >
            {isOrchestrating ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Orchestrating Crew...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                Orchestrate Resume Crew
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-[#E9ECEF] bg-[#F8F9FA] overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                isActive
                  ? 'border-[#1A1A1A] text-[#1A1A1A] bg-white font-bold'
                  : 'border-transparent text-[#868E96] hover:text-[#1A1A1A] hover:bg-white/50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && tab.count > 0 && (
                <span
                  className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                    isActive ? 'bg-[#1A1A1A] text-white' : 'bg-[#E9ECEF] text-[#495057]'
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
      <div className="p-6 space-y-6">
        {/* TAB 1: TARGET JOB & JD */}
        {activeTab === 'target' && (
          <div className="space-y-4">
            <div className="bg-[#F8F9FA] rounded-lg p-4 border border-[#E9ECEF] flex items-start gap-3 text-xs text-[#495057]">
              <Sparkles className="w-4 h-4 text-[#1A1A1A] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#1A1A1A]">Target Job Role & ATS Extraction Context:</p>
                <p className="text-[11px] text-[#868E96] mt-0.5 leading-relaxed">
                  The agents will extract technical keywords, industry competencies, and seniority expectations from the job description to align your resume score above 90%+.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#495057] mb-1">
                  Target Job Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Full-Stack AI Engineer"
                  value={formData.targetJobTitle}
                  onChange={(e) => setFormData({ ...formData, targetJobTitle: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded border border-[#E9ECEF] bg-[#F8F9FA] focus:bg-white focus:border-[#1A1A1A] outline-none text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#495057] mb-1">
                  Target Industry / Domain
                </label>
                <input
                  type="text"
                  placeholder="e.g. Enterprise SaaS, FinTech, Generative AI"
                  value={formData.targetIndustry}
                  onChange={(e) => setFormData({ ...formData, targetIndustry: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded border border-[#E9ECEF] bg-[#F8F9FA] focus:bg-white focus:border-[#1A1A1A] outline-none text-[#1A1A1A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#495057] mb-1">
                Target Job Description (Paste from Job Posting)
              </label>
              <textarea
                rows={5}
                placeholder="Paste requirements, qualifications, and role responsibilities from LinkedIn, Indeed, or company careers page..."
                value={formData.jobDescription || ''}
                onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded border border-[#E9ECEF] bg-[#F8F9FA] focus:bg-white focus:border-[#1A1A1A] outline-none font-mono text-[#1A1A1A]"
              />
            </div>
          </div>
        )}

        {/* TAB 2: PERSONAL & CONTACT */}
        {activeTab === 'personal' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#495057] mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Alex Morgan"
                  value={formData.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded border border-[#E9ECEF] bg-[#F8F9FA] focus:bg-white focus:border-[#1A1A1A] outline-none text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#495057] mb-1">Professional Title / Headline *</label>
                <input
                  type="text"
                  required
                  placeholder="Senior Software Engineer | Full-Stack & AI"
                  value={formData.personalInfo.jobTitle}
                  onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded border border-[#E9ECEF] bg-[#F8F9FA] focus:bg-white focus:border-[#1A1A1A] outline-none text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#495057] mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="alex.morgan.dev@gmail.com"
                  value={formData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded border border-[#E9ECEF] bg-[#F8F9FA] focus:bg-white focus:border-[#1A1A1A] outline-none text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#495057] mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="+1 (415) 890-3412"
                  value={formData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded border border-[#E9ECEF] bg-[#F8F9FA] focus:bg-white focus:border-[#1A1A1A] outline-none text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#495057] mb-1">Location</label>
                <input
                  type="text"
                  placeholder="San Francisco, CA (Open to Remote)"
                  value={formData.personalInfo.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded border border-[#E9ECEF] bg-[#F8F9FA] focus:bg-white focus:border-[#1A1A1A] outline-none text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#495057] mb-1">LinkedIn Profile</label>
                <input
                  type="text"
                  placeholder="linkedin.com/in/alexmorgan"
                  value={formData.personalInfo.linkedin || ''}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded border border-[#E9ECEF] bg-[#F8F9FA] focus:bg-white focus:border-[#1A1A1A] outline-none text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#495057] mb-1">GitHub / Code Portfolio</label>
                <input
                  type="text"
                  placeholder="github.com/alexmorgantech"
                  value={formData.personalInfo.github || ''}
                  onChange={(e) => updatePersonalInfo('github', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded border border-[#E9ECEF] bg-[#F8F9FA] focus:bg-white focus:border-[#1A1A1A] outline-none text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#495057] mb-1">Personal Website / Portfolio</label>
                <input
                  type="text"
                  placeholder="alexmorgan.io"
                  value={formData.personalInfo.website || ''}
                  onChange={(e) => updatePersonalInfo('website', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded border border-[#E9ECEF] bg-[#F8F9FA] focus:bg-white focus:border-[#1A1A1A] outline-none text-[#1A1A1A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#495057] mb-1">
                Current Professional Summary (The Strategist Agent will polish this)
              </label>
              <textarea
                rows={3}
                placeholder="Briefly state your core technical focus, years of experience, and key areas of expertise..."
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded border border-[#E9ECEF] bg-[#F8F9FA] focus:bg-white focus:border-[#1A1A1A] outline-none text-[#1A1A1A]"
              />
            </div>
          </div>
        )}

        {/* TAB 3: WORK HISTORY */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-xs text-[#868E96]">
                Add your relevant roles. The Content Strategist will rewrite duty bullets into metric-driven Google XYZ statements.
              </p>
              <button
                type="button"
                onClick={addExperience}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-[#F1F3F5] text-[#1A1A1A] border border-[#E9ECEF] hover:bg-[#E9ECEF] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Position
              </button>
            </div>

            {formData.experience.map((exp, expIdx) => (
              <div key={exp.id || expIdx} className="p-4 rounded-lg bg-[#F8F9FA] border border-[#E9ECEF] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#1A1A1A]">
                    Position #{expIdx + 1}: {exp.position || 'Untitled Role'}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeExperience(expIdx)}
                    className="p-1 rounded text-[#E03131] hover:bg-[#FFE3E3]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#495057] mb-0.5">Company Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Synthetix Systems"
                      value={exp.company}
                      onChange={(e) => updateExperience(expIdx, 'company', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-[#E9ECEF] bg-white text-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#495057] mb-0.5">Job Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lead Full-Stack AI Engineer"
                      value={exp.position}
                      onChange={(e) => updateExperience(expIdx, 'position', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-[#E9ECEF] bg-white text-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#495057] mb-0.5">Start Date</label>
                    <input
                      type="text"
                      placeholder="e.g. 2022-03"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(expIdx, 'startDate', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-[#E9ECEF] bg-white text-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#495057] mb-0.5">End Date</label>
                    <input
                      type="text"
                      placeholder="e.g. Present or 2024-01"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(expIdx, 'endDate', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-[#E9ECEF] bg-white text-[#1A1A1A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#495057] mb-0.5">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. San Francisco, CA"
                    value={exp.location}
                    onChange={(e) => updateExperience(expIdx, 'location', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-[#E9ECEF] bg-white text-[#1A1A1A]"
                  />
                </div>

                {/* Highlights / Bullets */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#495057]">
                      Key Highlights & Accomplishments
                    </label>
                    <button
                      type="button"
                      onClick={() => addHighlight(expIdx)}
                      className="text-[11px] font-semibold text-[#1A1A1A] hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add Bullet
                    </button>
                  </div>
                  <div className="space-y-2">
                    {exp.highlights.map((hl, hlIdx) => (
                      <div key={hlIdx} className="flex items-center gap-2">
                        <span className="text-[#868E96] text-xs">•</span>
                        <input
                          type="text"
                          placeholder="e.g. Built multi-agent LLM pipeline reducing processing time by 60%..."
                          value={hl}
                          onChange={(e) => updateHighlight(expIdx, hlIdx, e.target.value)}
                          className="flex-1 px-2.5 py-1.5 text-xs rounded border border-[#E9ECEF] bg-white text-[#1A1A1A]"
                        />
                        {exp.highlights.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeHighlight(expIdx, hlIdx)}
                            className="text-[#ADB5BD] hover:text-[#E03131]"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: SKILLS */}
        {activeTab === 'skills' && (
          <div className="space-y-4">
            <p className="text-xs text-[#868E96]">
              Enter comma-separated skills. The Analyzer & ATS Optimizer agents will categorize and align these with high-value search tokens.
            </p>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#495057] mb-1">
                Core Programming Languages & Technologies (Comma-separated)
              </label>
              <input
                type="text"
                placeholder="TypeScript, Python, Node.js, React, Next.js, PostgreSQL, GraphQL, REST APIs"
                value={formData.skills.technical.join(', ')}
                onChange={(e) => handleSkillsChange('technical', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded border border-[#E9ECEF] bg-[#F8F9FA] focus:bg-white focus:border-[#1A1A1A] outline-none text-[#1A1A1A]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#495057] mb-1">
                Frameworks, Cloud & Developer Tools (Comma-separated)
              </label>
              <input
                type="text"
                placeholder="LangChain, CrewAI, Docker, Kubernetes, AWS, GCP, GitHub Actions, Tailwind CSS"
                value={formData.skills.frameworksAndTools.join(', ')}
                onChange={(e) => handleSkillsChange('frameworksAndTools', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded border border-[#E9ECEF] bg-[#F8F9FA] focus:bg-white focus:border-[#1A1A1A] outline-none text-[#1A1A1A]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#495057] mb-1">
                Methodologies, Leadership & Soft Skills (Comma-separated)
              </label>
              <input
                type="text"
                placeholder="System Architecture, Cross-functional Leadership, Agile / Scrum, Mentorship"
                value={formData.skills.softSkills.join(', ')}
                onChange={(e) => handleSkillsChange('softSkills', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded border border-[#E9ECEF] bg-[#F8F9FA] focus:bg-white focus:border-[#1A1A1A] outline-none text-[#1A1A1A]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#495057] mb-1">
                Spoken Languages (Comma-separated)
              </label>
              <input
                type="text"
                placeholder="English (Native), Spanish (Conversational)"
                value={(formData.skills.languages || []).join(', ')}
                onChange={(e) => handleSkillsChange('languages', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded border border-[#E9ECEF] bg-[#F8F9FA] focus:bg-white focus:border-[#1A1A1A] outline-none text-[#1A1A1A]"
              />
            </div>
          </div>
        )}

        {/* TAB 5: EDUCATION */}
        {activeTab === 'education' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-[#868E96]">Add degrees, institutions, GPA, and academic honors.</p>
              <button
                type="button"
                onClick={addEducation}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-[#F1F3F5] text-[#1A1A1A] border border-[#E9ECEF] hover:bg-[#E9ECEF] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Education
              </button>
            </div>

            {formData.education.map((edu, eduIdx) => (
              <div key={edu.id || eduIdx} className="p-4 rounded-lg bg-[#F8F9FA] border border-[#E9ECEF] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#1A1A1A]">
                    Education #{eduIdx + 1}: {edu.institution || 'University'}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeEducation(eduIdx)}
                    className="p-1 rounded text-[#E03131] hover:bg-[#FFE3E3]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#495057] mb-0.5">Institution *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. UC Berkeley"
                      value={edu.institution}
                      onChange={(e) => updateEducation(eduIdx, 'institution', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-[#E9ECEF] bg-white text-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#495057] mb-0.5">Degree *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bachelor of Science"
                      value={edu.degree}
                      onChange={(e) => updateEducation(eduIdx, 'degree', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-[#E9ECEF] bg-white text-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#495057] mb-0.5">Field of Study</label>
                    <input
                      type="text"
                      placeholder="e.g. Computer Science"
                      value={edu.fieldOfStudy}
                      onChange={(e) => updateEducation(eduIdx, 'fieldOfStudy', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-[#E9ECEF] bg-white text-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#495057] mb-0.5">Start Date</label>
                    <input
                      type="text"
                      placeholder="e.g. 2014-08"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(eduIdx, 'startDate', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-[#E9ECEF] bg-white text-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#495057] mb-0.5">End Date / Grad Year</label>
                    <input
                      type="text"
                      placeholder="e.g. 2018-05"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(eduIdx, 'endDate', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-[#E9ECEF] bg-white text-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#495057] mb-0.5">GPA & Honors</label>
                    <input
                      type="text"
                      placeholder="e.g. 3.85 GPA, Magna Cum Laude"
                      value={edu.honors || edu.gpa || ''}
                      onChange={(e) => updateEducation(eduIdx, 'honors', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-[#E9ECEF] bg-white text-[#1A1A1A]"
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
              <p className="text-xs text-[#868E96]">Showcase open-source repositories, client apps, or research.</p>
              <button
                type="button"
                onClick={addProject}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-[#F1F3F5] text-[#1A1A1A] border border-[#E9ECEF] hover:bg-[#E9ECEF] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Project
              </button>
            </div>

            {formData.projects.map((proj, pIdx) => (
              <div key={proj.id || pIdx} className="p-4 rounded-lg bg-[#F8F9FA] border border-[#E9ECEF] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#1A1A1A]">
                    Project #{pIdx + 1}: {proj.name || 'Untitled Project'}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeProject(pIdx)}
                    className="p-1 rounded text-[#E03131] hover:bg-[#FFE3E3]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#495057] mb-0.5">Project Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. AgentFlow Studio"
                      value={proj.name}
                      onChange={(e) => updateProject(pIdx, 'name', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-[#E9ECEF] bg-white text-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#495057] mb-0.5">Role / Contribution</label>
                    <input
                      type="text"
                      placeholder="e.g. Creator & Lead Maintainer"
                      value={proj.role || ''}
                      onChange={(e) => updateProject(pIdx, 'role', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-[#E9ECEF] bg-white text-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#495057] mb-0.5">Link / Repository</label>
                    <input
                      type="text"
                      placeholder="e.g. github.com/username/project"
                      value={proj.link || ''}
                      onChange={(e) => updateProject(pIdx, 'link', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-[#E9ECEF] bg-white text-[#1A1A1A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#495057] mb-0.5">
                    Technologies Used (Comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. TypeScript, LangChain, React, FastAPI"
                    value={proj.technologies.join(', ')}
                    onChange={(e) =>
                      updateProject(
                        pIdx,
                        'technologies',
                        e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                      )
                    }
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-[#E9ECEF] bg-white text-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#495057] mb-0.5">Project Overview / Results</label>
                  <textarea
                    rows={2}
                    placeholder="Describe problem solved, metrics achieved, and architecture..."
                    value={proj.description}
                    onChange={(e) => updateProject(pIdx, 'description', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-[#E9ECEF] bg-white text-[#1A1A1A]"
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
              <p className="text-xs text-[#868E96]">Industry certificates, cloud badges, and verified credentials.</p>
              <button
                type="button"
                onClick={addCertification}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-[#F1F3F5] text-[#1A1A1A] border border-[#E9ECEF] hover:bg-[#E9ECEF] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Certification
              </button>
            </div>

            {formData.certifications.map((cert, cIdx) => (
              <div key={cert.id || cIdx} className="p-4 rounded-lg bg-[#F8F9FA] border border-[#E9ECEF] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#1A1A1A]">
                    Certification #{cIdx + 1}: {cert.name || 'Untitled'}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeCertification(cIdx)}
                    className="p-1 rounded text-[#E03131] hover:bg-[#FFE3E3]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#495057] mb-0.5">Certification Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. AWS Certified Solutions Architect"
                      value={cert.name}
                      onChange={(e) => updateCertification(cIdx, 'name', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-[#E9ECEF] bg-white text-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#495057] mb-0.5">Issuing Organization *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Amazon Web Services"
                      value={cert.issuer}
                      onChange={(e) => updateCertification(cIdx, 'issuer', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-[#E9ECEF] bg-white text-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#495057] mb-0.5">Date Received / Credential ID</label>
                    <input
                      type="text"
                      placeholder="e.g. 2023-11 [ID: AWS-9812]"
                      value={cert.date}
                      onChange={(e) => updateCertification(cIdx, 'date', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-[#E9ECEF] bg-white text-[#1A1A1A]"
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
