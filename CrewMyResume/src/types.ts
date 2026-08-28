export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  highlights: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  role?: string;
  link?: string;
  technologies: string[];
  description: string;
  highlights: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
}

export interface UserResumeInput {
  targetJobTitle: string;
  targetIndustry: string;
  jobDescription?: string;
  personalInfo: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: {
    technical: string[];
    frameworksAndTools: string[];
    softSkills: string[];
    languages?: string[];
  };
  projects: ProjectItem[];
  certifications: Certification[];
}

export interface OptimizedBulletPoint {
  original?: string;
  optimized: string;
  actionVerb: string;
  metric?: string;
  impactType: 'revenue' | 'performance' | 'efficiency' | 'scale' | 'leadership' | 'quality';
}

export interface ATSAnalysis {
  overallScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  keywordDensityScore: number;
  headingCompliance: boolean;
  formatCheckPassed: boolean;
  recommendations: string[];
}

export interface QAAuditReport {
  overallQualityScore: number;
  grammarAndSpellingScore: number;
  tenseConsistencyScore: number;
  quantifiedImpactScore: number;
  chronologyCheckPassed: boolean;
  detectedIssues: Array<{
    severity: 'high' | 'medium' | 'low';
    section: string;
    issue: string;
    fixApplied: string;
  }>;
  summaryFeedback: string;
}

export interface FinalStructuredResume {
  personalInfo: PersonalInfo;
  headline: string;
  summary: string;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    bullets: string[];
  }>;
  education: Education[];
  skills: {
    technical: string[];
    frameworksAndTools: string[];
    softSkills: string[];
    languages?: string[];
  };
  projects: Array<{
    id: string;
    name: string;
    role?: string;
    technologies: string[];
    bullets: string[];
    link?: string;
  }>;
  certifications: Certification[];
}

export type AgentRoleType =
  | 'analyzer'
  | 'strategist'
  | 'ats_optimizer'
  | 'designer'
  | 'qa';

export interface AgentLog {
  id: string;
  agentId: AgentRoleType;
  agentName: string;
  timestamp: string;
  type: 'thought' | 'tool_call' | 'tool_result' | 'handoff' | 'output' | 'error';
  message: string;
  data?: any;
}

export interface AgentStatus {
  id: AgentRoleType;
  name: string;
  role: string;
  goal: string;
  status: 'idle' | 'running' | 'completed' | 'error';
  progress: number;
  executionTimeMs?: number;
  thoughtSummary?: string;
  outputPreview?: string;
}

export interface OrchestrationResult {
  success: boolean;
  resume: FinalStructuredResume;
  atsAnalysis: ATSAnalysis;
  qaReport: QAAuditReport;
  agentStatuses: Record<AgentRoleType, AgentStatus>;
  logs: AgentLog[];
  totalExecutionTimeMs: number;
  markdownContent: string;
  plainTextContent: string;
}

export type ResumeTemplateId = 'modern' | 'executive' | 'minimal' | 'nordic';

export interface TemplateCustomization {
  templateId: ResumeTemplateId;
  accentColor: string;
  fontFamily: 'sans' | 'serif' | 'mono';
  spacingDensity: 'compact' | 'balanced' | 'spacious';
  showBorders: boolean;
}
