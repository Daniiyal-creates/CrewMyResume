import { UserResumeInput } from '../src/types.js';

export const SAMPLE_PROFILES: Record<string, UserResumeInput> = {
  software_engineer: {
    targetJobTitle: 'Senior Full-Stack AI Engineer',
    targetIndustry: 'Enterprise SaaS & Generative AI',
    jobDescription: `We are looking for a Senior Full-Stack AI Engineer to lead development of our agentic orchestration platform. 
Requirements:
- 5+ years of experience with TypeScript, React, Node.js, Python, and PostgreSQL
- Strong hands-on experience building LLM pipelines, prompt engineering, LangChain, CrewAI, or autonomous multi-agent workflows
- Proven track record optimizing high-throughput distributed microservices on AWS or GCP (Docker, Kubernetes)
- Experience driving system performance, reducing API latency, and scaling web apps to millions of monthly active users
- Strong CI/CD, unit testing, ATS-compliant code reviews, and cross-functional agile leadership`,
    personalInfo: {
      fullName: 'Alex Morgan',
      jobTitle: 'Senior Software Engineer | Full-Stack & AI Systems',
      email: 'alex.morgan.dev@gmail.com',
      phone: '+1 (415) 890-3412',
      location: 'San Francisco, CA (Open to Remote)',
      linkedin: 'linkedin.com/in/alexmorgan-dev',
      github: 'github.com/alexmorgantech',
      website: 'alexmorgan.io',
    },
    summary: 'Senior Software Engineer with 6+ years specializing in modern TypeScript/React frontends, Node.js/Python microservices, and autonomous multi-agent AI workflows. Led architecture for high-throughput platforms serving 2.5M+ active users with 99.99% uptime.',
    experience: [
      {
        id: 'exp-1',
        company: 'Synthetix AI Systems',
        position: 'Lead Full-Stack AI Engineer',
        location: 'San Francisco, CA',
        startDate: '2022-03',
        endDate: 'Present',
        current: true,
        description: 'Architected and scaled autonomous multi-agent document analysis and synthesis engine.',
        highlights: [
          'Designed and deployed an agentic LLM orchestration engine using LangChain and CrewAI patterns, reducing multi-step document extraction time by 62% for 450k enterprise users.',
          'Built responsive real-time streaming interfaces in React 19 and Tailwind CSS with WebSocket event feeds, lowering UI interaction latency from 450ms to 85ms.',
          'Spearheaded migration of legacy REST endpoints to TypeScript microservices on Kubernetes, saving $140,000 in annual AWS cloud infrastructure costs.',
          'Mentored 6 junior and mid-level engineers in test-driven development, elevating test coverage from 68% to 94% across core services.',
        ],
      },
      {
        id: 'exp-2',
        company: 'Apex Cloud Solutions',
        position: 'Senior Software Engineer',
        location: 'San Jose, CA',
        startDate: '2019-06',
        endDate: '2022-02',
        current: false,
        description: 'Developed scalable customer dashboard and real-time telemetry ingestion pipelines.',
        highlights: [
          'Engineered distributed data ingestion pipelines in Node.js and PostgreSQL processing over 45M telemetry events daily with zero data loss.',
          'Optimized database queries and added Redis caching layers, improving median API response times by 48%.',
          'Automated CI/CD deployment pipelines using GitHub Actions and Docker, reducing release cycle duration from 4 hours to 12 minutes.',
        ],
      },
      {
        id: 'exp-3',
        company: 'Vanguard Interactive',
        position: 'Full-Stack Developer',
        location: 'Austin, TX',
        startDate: '2018-01',
        endDate: '2019-05',
        current: false,
        description: 'Built interactive web applications and internal tools for enterprise clients.',
        highlights: [
          'Developed responsive customer portals using React, Redux, and Node.js for 12 Fortune 500 client accounts.',
          'Implemented OAuth2 authentication and role-based access control, eliminating security vulnerabilities.',
        ],
      },
    ],
    education: [
      {
        id: 'edu-1',
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Computer Science & Data Engineering',
        location: 'Berkeley, CA',
        startDate: '2014-08',
        endDate: '2018-05',
        gpa: '3.85 / 4.0',
        honors: 'Dean’s Honors List (6 Semesters), Magna Cum Laude',
      },
    ],
    skills: {
      technical: [
        'TypeScript',
        'Python',
        'Node.js',
        'React',
        'Next.js',
        'Express',
        'PostgreSQL',
        'Redis',
        'GraphQL',
        'REST APIs',
      ],
      frameworksAndTools: [
        'LangChain',
        'CrewAI',
        'Docker',
        'Kubernetes',
        'AWS (ECS, Lambda, S3)',
        'GCP',
        'Git / GitHub Actions',
        'Tailwind CSS',
        'Jest / Vitest',
      ],
      softSkills: [
        'Technical Leadership',
        'System Architecture Design',
        'Cross-functional Collaboration',
        'Mentorship',
        'Agile / Scrum',
      ],
      languages: ['English (Native)', 'Spanish (Professional)'],
    },
    projects: [
      {
        id: 'proj-1',
        name: 'AgentFlow Studio',
        role: 'Creator & Maintainer',
        link: 'github.com/alexmorgantech/agentflow',
        technologies: ['TypeScript', 'LangChain', 'React', 'Tailwind', 'FastAPI'],
        description: 'Open-source visual workflow builder for multi-agent LLM systems with 2,400+ GitHub stars.',
        highlights: [
          'Built an interactive graph visualizer rendering agent handoffs and tool execution DAGs in real-time.',
          'Adopted by 1,200+ developers worldwide with active community contributions.',
        ],
      },
    ],
    certifications: [
      {
        id: 'cert-1',
        name: 'AWS Certified Solutions Architect - Professional',
        issuer: 'Amazon Web Services',
        date: '2023-11',
        credentialId: 'AWS-SAP-89234',
      },
      {
        id: 'cert-2',
        name: 'DeepLearning.AI: LangChain & Multi-Agent Systems Specialization',
        issuer: 'Coursera / DeepLearning.AI',
        date: '2024-02',
      },
    ],
  },
  product_manager: {
    targetJobTitle: 'Principal Product Manager - AI & Cloud Platforms',
    targetIndustry: 'Enterprise Software & Artificial Intelligence',
    jobDescription: `Looking for a Principal Product Manager to own our core enterprise AI automation suite.
Key responsibilities:
- Lead product strategy from 0 to 1 and scale existing AI platforms to $50M+ ARR
- Partner with Engineering, Design, and GTM leaders to deliver quarterly roadmap milestones
- Define OKRs, track product analytics (Churn, NPS, DAU/MAU, CAC), and conduct customer discovery interviews
- Deep understanding of LLM capabilities, enterprise security, and developer ecosystem tools`,
    personalInfo: {
      fullName: 'Samantha Rivera',
      jobTitle: 'Principal Product Manager | AI & Enterprise Platforms',
      email: 'samantha.rivera.pm@gmail.com',
      phone: '+1 (206) 555-7821',
      location: 'Seattle, WA',
      linkedin: 'linkedin.com/in/samanthariverapm',
      website: 'samantharivera.com',
    },
    summary: 'Data-driven Principal Product Manager with 8+ years scaling B2B SaaS and AI platforms from incubation to $35M+ ARR. Proven leader in defining multi-agent workflows, reducing customer churn by 35%, and driving cross-functional alignment across 40+ engineers and designers.',
    experience: [
      {
        id: 'exp-pm-1',
        company: 'CognitiveScale SaaS',
        position: 'Principal Product Manager, AI Solutions',
        location: 'Seattle, WA',
        startDate: '2021-08',
        endDate: 'Present',
        current: true,
        description: 'Led end-to-end product strategy and execution for enterprise AI automation suite.',
        highlights: [
          'Spearheaded the 0-to-1 launch of an autonomous agent copilot, generating $14.2M in net new ARR within 18 months.',
          'Conducted 80+ customer discovery interviews across Global 2000 enterprises, prioritizing high-impact features that reduced onboarding time by 42%.',
          'Managed 3 cross-functional scrum teams (24 engineers, 3 product designers, 2 data scientists) delivering 100% of quarterly roadmap commitments.',
        ],
      },
      {
        id: 'exp-pm-2',
        company: 'CloudMetrics Inc.',
        position: 'Senior Product Manager',
        location: 'San Francisco, CA',
        startDate: '2018-04',
        endDate: '2021-07',
        current: false,
        description: 'Owned observability dashboard and customer billing self-serve portal.',
        highlights: [
          'Redesigned billing and usage analytics experience, resulting in a 28% increase in self-serve plan upgrades.',
          'Reduced monthly enterprise churn rate from 2.4% to 1.1% by implementing proactive usage alerts and health scores.',
        ],
      },
    ],
    education: [
      {
        id: 'edu-pm-1',
        institution: 'University of Washington',
        degree: 'Master of Business Administration (MBA)',
        fieldOfStudy: 'Technology Management & Strategy',
        location: 'Seattle, WA',
        startDate: '2016-09',
        endDate: '2018-06',
      },
      {
        id: 'edu-pm-2',
        institution: 'University of Washington',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Informatics',
        location: 'Seattle, WA',
        startDate: '2012-09',
        endDate: '2016-06',
      },
    ],
    skills: {
      technical: [
        'Product Strategy & Roadmap',
        'User Research & Customer Discovery',
        'Data Analysis & SQL',
        'A/B Testing & Experimentation',
        'API & LLM Integration Concepts',
      ],
      frameworksAndTools: [
        'Jira / Confluence',
        'Mixpanel / Amplitude',
        'Figma',
        'Tableau',
        'Linear',
        'Notion',
      ],
      softSkills: [
        'Executive Stakeholder Management',
        'Cross-functional Alignment',
        'Strategic Communication',
        'Crisis Management',
      ],
    },
    projects: [],
    certifications: [
      {
        id: 'cert-pm-1',
        name: 'Reforge: Product Strategy & Growth Series',
        issuer: 'Reforge',
        date: '2022-05',
      },
      {
        id: 'cert-pm-2',
        name: 'Pragmatic Institute Certified (PMC-III)',
        issuer: 'Pragmatic Institute',
        date: '2020-03',
      },
    ],
  },
};
