# CrewMyResume 🤖📄

> **Autonomous Multi-Agent Resume Generation & ATS Optimization Platform**  
> Engineered with Google Gemini, CrewAI & LangChain architectural principles, React 19, and Tailwind CSS.

---

## 🌟 Overview

**CrewMyResume** is an intelligent, multi-agent resume engineering workspace. Instead of treating resume creation as a single prompt, CrewMyResume orchestrates a specialized crew of **5 autonomous AI agents** that collaborate sequentially and in parallel to analyze, strategize, optimize, style, and verify job-winning resumes tailored to specific target positions and job descriptions.

---

## 🏗️ Multi-Agent Architecture

The orchestration engine follows a Directed Acyclic Graph (DAG) workflow:

```
                  ┌───────────────────────────────┐
                  │      User Input / Preset      │
                  │  (Target Job, JD, Experience) │
                  └──────────────┬────────────────┘
                                 │
                                 ▼
                  ┌───────────────────────────────┐
                  │    1. Resume Analyzer Agent   │
                  │   Normalizes career taxonomy  │
                  └──────────────┬────────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
  ┌─────────────────────────────┐ ┌─────────────────────────────┐
  │ 2A. Content Strategist Agent│ │  2B. ATS Optimizer Agent    │
  │    Google XYZ Achievements  │ │   Keyword Matching & Density│
  └──────────────┬──────────────┘ └──────────────┬──────────────┘
                 └───────────────┬───────────────┘
                                 │
                                 ▼
                  ┌───────────────────────────────┐
                  │    3. Resume Designer Agent   │
                  │  Layout, Typography & Density │
                  └──────────────┬────────────────┘
                                 │
                                 ▼
                  ┌───────────────────────────────┐
                  │     4. QA & Verifier Agent    │
                  │  Grammar, Tenses, Chronology  │
                  └──────────────┬────────────────┘
                                 │
                                 ▼
                  ┌───────────────────────────────┐
                  │     Polished Resume Suite     │
                  │ (PDF, Markdown, ATS/QA Audit) │
                  └───────────────────────────────┘
```

### 👥 The 5 Specialized Agents

1. **Resume Analyzer Agent** (`Extractor`)
   - Normalizes raw career input, extracts core skill taxonomies, and standardizes timelines.
   - Tools: `SchemaNormalizer`, `SkillTaxonomyExtractor`, `ChronologyValidator`.

2. **Content Strategist Agent** (`Narrative Architect`)
   - Rewrites generic task descriptions into quantified **Google XYZ Formula** statements (*"Accomplished [X], as measured by [Y], by doing [Z]"*).
   - Tools: `GoogleXYZTransformer`, `ImpactQuantifier`, `ActiveVerbEnhancer`.

3. **ATS Optimizer Agent** (`Algorithmic Scanner`)
   - Scans the target Job Description (JD) to extract critical search tokens, computes keyword density, and ensures compatibility with applicant tracking systems (Workday, Greenhouse, Lever, Taleo).
   - Tools: `ATSScoringEngine`, `KeywordDensityAnalyzer`, `JobDescriptionParser`.

4. **Resume Designer Agent** (`Layout & Typography`)
   - Formats content into ATS-compliant semantic sections, adjusts visual density, and structures markdown representations.
   - Tools: `LayoutFormatter`, `HierarchyEngine`, `MarkdownGenerator`.

5. **Quality Assurance Agent** (`Senior Recruiter QA`)
   - Performs automated audits for grammatical precision, verb tense harmony, and chronological gap detection.
   - Tools: `GrammarConsistencyChecker`, `TenseAuditor`, `ChronologyGapValidator`.

---

## ✨ Features

- **Autonomous Agent Orchestration**: Watch the 5 agents run in real-time with step-by-step reasoning logs and status badges.
- **ATS Compliance Audit**: Detailed score cards measuring overall match (0–100), keyword density, semantic headings, and matched vs. missing skills.
- **QA Certification Report**: Recruiter-level verification scores evaluating grammar, tense consistency, and quantified impact.
- **Multiple Aesthetic Templates**:
  - **Modern Clean**: Balanced, high-readability contemporary layout.
  - **Executive Serif**: Elegant editorial layout designed for senior/leadership roles.
  - **Tech Minimal**: Monospaced, developer-focused technical layout.
  - **Nordic Slate**: High-contrast, clean-lined structural design.
- **Export & Sharing Tools**:
  - 📄 **Direct PDF Generation**: Pixel-perfect vector PDF export via `jspdf` and `html2canvas`.
  - 📝 **Markdown Download**: Clean, formatted markdown file for developer portfolios.
  - 📋 **Plain Text Copy**: One-click copy for easy pasting into application portals.
- **1-Click Sample Profiles**: Instant testing with pre-loaded profiles for AI Engineers, Full-Stack Architects, and Product Managers.
- **Editorial Minimalist UI**: Clean `#F8F9FA` canvas with high-contrast typography and responsive layouts across all device sizes.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS v4](https://tailwindcss.com/)
- **Backend / API**: [Express.js](https://expressjs.com/), Node.js
- **AI & LLM**: [@google/genai](https://www.npmjs.com/package/@google/genai) (Google Gemini Flash & Pro)
- **PDF & Document Engine**: [jspdf](https://github.com/parallax/jsPDF), [html2canvas](https://html2canvas.hertzen.com/)
- **Animations & Icons**: [Motion](https://motion.dev/), [Lucide React](https://lucide.dev/)
- **Bundler & Tooling**: [Vite](https://vitejs.dev/), [esbuild](https://esbuild.github.io/), [tsx](https://github.com/privatenumber/tsx)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A **Google Gemini API Key** from [Google AI Studio](https://aistudio.google.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/crew-my-resume.git
cd crew-my-resume
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory (or copy from `.env.example`):

```bash
cp .env.example .env
```

Add your Gemini API key:

```env
GEMINI_API_KEY="your_actual_gemini_api_key_here"
```

### 4. Run Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3000`.

### 5. Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
├── .env.example               # Environment variables specification
├── package.json               # Dependencies and scripts
├── server.ts                  # Express server & Gemini API orchestration endpoints
├── metadata.json              # Platform configuration & metadata
├── src/
│   ├── main.tsx               # React application entry point
│   ├── App.tsx                # Main container & orchestration state
│   ├── index.css              # Global styling & Tailwind CSS imports
│   ├── types.ts               # Shared TypeScript schemas & interfaces
│   ├── data/
│   │   └── sampleProfiles.ts  # Pre-configured test profiles & job descriptions
│   ├── services/
│   │   └── geminiService.ts   # Multi-agent client orchestration service & fallbacks
│   └── components/
│       ├── Navbar.tsx         # Top navigation bar with sample profile quick-pickers
│       ├── InputForm.tsx      # Comprehensive candidate background & JD input tabs
│       ├── AgentStatusCard.tsx# Live visual execution stream for the 5 agents
│       ├── ResumePreview.tsx  # Interactive resume previewer with template & export tools
│       ├── AtsAnalysisCard.tsx# ATS scoring gauge, keyword matching & recommendations
│       ├── QAReportCard.tsx   # Recruiter QA score card, tense audit & applied fixes
│       └── ArchitectureModal.tsx # Architectural DAG diagram & agent tool directory
```

---

## 🔒 Security Best Practices

- **Server-Side API Key Protection**: The Google Gemini API key is accessed exclusively on the server (`server.ts`) and is never leaked to the client browser.
- **Data Privacy**: Resume data and job postings are processed in-memory for orchestration and never permanently stored without user authorization.

---

## 📄 License

This project is licensed under the **MIT License**.
