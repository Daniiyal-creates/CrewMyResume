import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  FileText,
  Gauge,
  Layers3,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  WandSparkles,
} from 'lucide-react';

interface LandingViewProps {
  onEnterStudio: () => void;
}

const crew = [
  {
    number: '01',
    title: 'Resume Analyzer',
    headline: 'Turn your career history into structured intelligence.',
    body: 'Extract your experience, skills, timeline, and professional strengths into a clear career profile.',
    tools: 'Skill taxonomy - Career profile - Timeline check',
    icon: Search,
  },
  {
    number: '02',
    title: 'Content Strategist',
    headline: 'Turn responsibilities into measurable impact.',
    body: 'Transform generic job descriptions into compelling achievement statements with clear outcomes and active language.',
    tools: 'Impact quantification - Active verbs - Achievement rewriting',
    icon: WandSparkles,
  },
  {
    number: '03',
    title: 'ATS Optimizer',
    headline: 'Speak the language recruiters are looking for.',
    body: 'Compare your resume with the job description, surface important keywords, and show you what is missing.',
    tools: 'Match score - Keyword coverage - Role alignment',
    icon: Target,
  },
  {
    number: '04',
    title: 'Resume Designer',
    headline: 'Make your experience easy to scan.',
    body: 'Structure your resume with readable sections, balanced spacing, and a polished layout that still works with ATS systems.',
    tools: 'Clear hierarchy - Readable spacing - ATS-friendly layout',
    icon: Layers3,
  },
  {
    number: '05',
    title: 'QA and Verification',
    headline: 'Check your resume before recruiters do.',
    body: 'Review grammar, verb tense, chronology, career gaps, quantified achievements, and content consistency.',
    tools: 'Grammar - Consistency - Final quality check',
    icon: ShieldCheck,
  },
];

const workflow = [
  ['01', 'Tell us about yourself', 'Add your experience, skills, achievements, education, and career background.'],
  ['02', 'Choose your target role', 'Paste the job description and tell us what kind of role you are pursuing.'],
  ['03', 'Let the crew go to work', 'Your information is analyzed, rewritten, optimized, designed, and checked.'],
  ['04', 'Review your results', 'See your polished resume, match score, keyword analysis, and quality feedback.'],
  ['05', 'Export and apply', 'Download a PDF, save Markdown, or copy plain text for application portals.'],
];

const features = [
  ['ATS-aware', 'Use the language and requirements found in the job description.'],
  ['Achievement-focused', 'Replace generic responsibilities with outcome-driven statements.'],
  ['Human-readable', 'Improve your match without creating a resume nobody wants to read.'],
  ['Multiple templates', 'Choose a visual style that fits your experience and target role.'],
  ['Quality assurance', 'Catch grammar, tense, chronology, and consistency issues early.'],
  ['Export anywhere', 'Generate the format you need for each application.'],
];

const roles = [
  ['AI Engineer', 'Surface technical depth, systems thinking, and measurable engineering outcomes.'],
  ['Full-Stack Engineer', 'Highlight technologies, architecture decisions, products shipped, and business impact.'],
  ['Product Manager', 'Emphasize ownership, strategy, metrics, leadership, and product outcomes.'],
];

export const LandingView: React.FC<LandingViewProps> = ({ onEnterStudio }) => {
  const [pointer, setPointer] = useState({ tiltX: 0, tiltY: 0 });

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    setPointer({ tiltX: (50 - y) * 0.06, tiltY: (x - 50) * 0.08 });
  };

  return (
    <main className="overflow-hidden bg-[#f4f5f0] text-slate-950">
      <section
        className="relative border-b border-slate-200 bg-[#f8f8f4]"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setPointer({ tiltX: 0, tiltY: 0 })}
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-12">
          <div>
            <div className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Resume engineering for the job you want
            </div>
            <h1 className="max-w-2xl text-5xl font-black leading-[0.98] tracking-tight text-slate-950 sm:text-7xl">
              Your resume deserves more than a single AI prompt.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              CrewMyResume analyzes your experience, understands the job description, improves your impact statements, and delivers a polished resume tailored to the role you actually want.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button type="button" onClick={onEnterStudio} className="group inline-flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/15 transition-colors hover:bg-emerald-700">
                Build my resume
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <span className="text-xs text-slate-500">One profile. One target role. One focused resume.</span>
            </div>
          </div>

          <div
            className="relative rounded-2xl border border-slate-300 bg-[#fffdf9] p-5 shadow-2xl shadow-slate-300/60 transition-transform duration-200 ease-out sm:p-7"
            style={{ transform: `perspective(900px) rotateX(${pointer.tiltX}deg) rotateY(${pointer.tiltY}deg)` }}
          >
            <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-white"><FileText className="h-5 w-5" /></div>
                <div><p className="text-sm font-bold">Your resume</p><p className="text-xs text-slate-500">Built around your next opportunity</p></div>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Ready</span>
            </div>
            <div className="space-y-5">
              <div className="h-3 w-2/5 rounded bg-slate-900" /><div className="h-2 w-3/5 rounded bg-slate-200" />
              <div className="grid gap-2 border-t border-slate-200 pt-5"><div className="h-2 w-1/3 rounded bg-emerald-300" /><div className="h-2 w-full rounded bg-slate-200" /><div className="h-2 w-11/12 rounded bg-slate-200" /><div className="h-2 w-4/5 rounded bg-slate-200" /></div>
              <div className="grid gap-2 border-t border-slate-200 pt-5"><div className="h-2 w-1/4 rounded bg-emerald-300" /><div className="h-2 w-10/12 rounded bg-slate-200" /><div className="h-2 w-3/4 rounded bg-slate-200" /></div>
            </div>
            <div className="mt-7 grid grid-cols-3 gap-2 border-t border-slate-200 pt-5 text-center"><div><p className="text-lg font-black">87</p><p className="text-[10px] uppercase tracking-wider text-slate-500">Match</p></div><div><p className="text-lg font-black">34/41</p><p className="text-[10px] uppercase tracking-wider text-slate-500">Keywords</p></div><div><p className="text-lg font-black">94</p><p className="text-[10px] uppercase tracking-wider text-slate-500">Quality</p></div></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10 lg:px-12">
        <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Analyze - Strategize - Optimize - Design - Verify</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Different resume problems need different kinds of thinking.</h2><p className="mt-5 text-base leading-7 text-slate-600">Instead of asking one AI model to do everything, CrewMyResume moves your information through a focused workflow so the final result is targeted, readable, ATS-aware, and checked.</p></div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {crew.map(({ number, title, headline, body, tools, icon: Icon }) => <article key={number} className="group rounded-xl border border-slate-200 bg-[#fbfbf8] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:bg-white hover:shadow-xl hover:shadow-emerald-900/5"><div className="mb-9 flex items-center justify-between"><span className="text-sm font-black text-emerald-700">{number}</span><Icon className="h-5 w-5 text-slate-400 transition-colors group-hover:text-emerald-600" /></div><h3 className="text-lg font-black">{title}</h3><p className="mt-3 font-bold leading-6">{headline}</p><p className="mt-3 text-sm leading-6 text-slate-600">{body}</p><p className="mt-6 border-t border-slate-200 pt-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">{tools}</p></article>)}
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-950 text-white"><div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 lg:px-12"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">One clear workflow</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">From job description to job-ready resume.</h2></div><div className="mt-12 grid gap-8 md:grid-cols-5">{workflow.map(([number, title, body]) => <div key={number} className="border-t border-slate-700 pt-5"><span className="text-sm font-black text-emerald-400">{number}</span><h3 className="mt-5 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{body}</p></div>)}</div></div></section>

      <section className="mx-auto grid max-w-6xl gap-14 px-6 py-20 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:px-12"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">See what your resume is missing</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">A useful review before you apply.</h2><p className="mt-5 text-base leading-7 text-slate-600">Know what is working, what is missing, and where your experience can make a stronger impression.</p></div><div className="grid gap-4 sm:grid-cols-2">{[['87 / 100', 'ATS match score', Gauge], ['34 / 41', 'Keyword coverage', Target], ['94 / 100', 'QA score', CheckCircle2], ['18', 'Impact statements improved', Sparkles]].map(([value, label, Icon]) => <div key={String(label)} className="rounded-xl border border-slate-200 bg-[#fbfbf8] p-5"><Icon className="h-5 w-5 text-emerald-600" /><p className="mt-6 text-3xl font-black">{value as string}</p><p className="mt-1 text-sm text-slate-600">{label as string}</p></div>)}</div></section>

      <section className="bg-[#e6eee4]"><div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 lg:px-12"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">Built for the job you are actually applying for</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Give the crew the job description. Let it find the spotlight.</h2></div><div className="mt-10 grid gap-4 md:grid-cols-3">{roles.map(([title, body]) => <div key={title} className="border-t border-emerald-900/20 pt-5"><h3 className="font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-700">{body}</p></div>)}</div></div></section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10 lg:px-12"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Built for modern job applications</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Strong content. Clear presentation. Useful feedback.</h2></div><div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">{features.map(([title, body]) => <div key={title} className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" /><div><h3 className="font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{body}</p></div></div>)}</div></section>

      <section className="border-t border-slate-200 bg-white"><div className="mx-auto max-w-4xl px-6 py-20 text-center sm:px-10"><p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Your career has the experience</p><h2 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">We help you present it.</h2><p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600">You already did the work. CrewMyResume helps your resume communicate it clearly, strategically, and in a way that is relevant to the role you are pursuing.</p><button type="button" onClick={onEnterStudio} className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700">Build my resume <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></button></div></section>

      <section className="mx-auto max-w-4xl px-6 py-20 sm:px-10"><p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Frequently asked</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Questions, answered.</h2><div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">{[['Is CrewMyResume just another AI resume writer?', 'No. A focused workflow handles analysis, content strategy, ATS optimization, design, and quality checks.'], ['Can I tailor my resume to a specific job?', 'Yes. Paste the target job description and the workflow highlights relevant keywords, skills, and requirements.'], ['Does it optimize for ATS?', 'It evaluates keyword matching, density, semantic headings, and missing skills while keeping the resume readable.'], ['Can I export my resume?', 'Yes. Generate a PDF, download Markdown, or copy plain text for application portals.'], ['What resume styles are available?', 'You can choose from Modern Clean, Executive Serif, Tech Minimal, and Nordic Slate styles after your resume is created.']].map(([question, answer]) => <details key={question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold"><span>{question}</span><span className="text-2xl font-normal text-emerald-700 transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{answer}</p></details>)}</div></section>
    </main>
  );
};
