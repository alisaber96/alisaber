'use client';
import Link from 'next/link';
import { ArrowLeft, Download, Mail, MapPin, ExternalLink } from 'lucide-react';

// ─── Fill in your real CV data here ──────────────────────────────────────────

const CV_DATA = {
  name:      'M. Ali Saber',
  title:     "Master's degree in Electrical and Electronic Engineering",
  email:     'ali.saber@yahoo.com',
  location:  'Shiraz, Fars, Iran',
  scholar:   'scholar.google.com/citations?user=XXXX',
  linkedin:  'linkedin.com/in/your-profile',

  education: [
    {
      degree:   'Master of Science in Electrical and Electronic Engineering',
      school:   'Tehran University',
      location: 'Tehran, Iran',
      dates:    '20XX – 20XX',
      bullets: [
        'Thesis: Title of Your Master Thesis Here',
        'GPA: X.XX / 4.0',
        'Supervisor: Prof. [Name]',
      ],
    },
    {
      degree:   'Bachelor of Science in Electrical Engineering',
      school:   '[University Name]',
      location: '[City], Iran',
      dates:    '20XX – 20XX',
      bullets: [
        'GPA: X.XX / 4.0',
      ],
    },
  ],

  research: [
    'Signal Processing & Time-Frequency Analysis',
    'Machine Learning / Deep Learning',
    'Brain–Computer Interfaces (BCI)',
    'Embedded Systems & FPGA Design',
    'VLSI and Low-Power Circuit Design',
  ],

  publications: [
    'M. Ali Saber, A. Co-Author, B. Co-Author, "Deep Convolutional Networks for EEG Signal Classification," IEEE Trans. Neural Syst. Rehabil. Eng., 2024.',
    'M. Ali Saber, A. Co-Author, "Adaptive Beamforming Algorithms for MIMO Radar," ICSP 2023.',
    'M. Ali Saber, A. Co-Author, B. Co-Author, "Low-Power VLSI for Real-Time FFT," J. Circuits Syst. Comput., 2022.',
  ],

  projects: [
    { title: 'EEG-Based Brain–Computer Interface',   year: '2023–2024', desc: 'Real-time BCI using CNN-based EEG classification on embedded hardware.' },
    { title: 'MIMO Radar Adaptive Beamformer',        year: '2022–2023', desc: 'Wideband adaptive beamforming simulation for MIMO radar arrays.' },
    { title: 'FPGA Real-Time Signal Processor',       year: '2022',      desc: '1024-point FFT pipeline on Xilinx Artix-7 at 100 MHz.' },
    { title: 'Neural Network Hardware Accelerator',   year: '2021–2022', desc: 'Systolic-array inference engine in SystemVerilog for MobileNet-V2.' },
  ],

  skills: {
    'Programming':  'Python, MATLAB, C/C++, SystemVerilog',
    'ML / AI':      'TensorFlow, PyTorch, Keras, scikit-learn',
    'Hardware':     'FPGA (Xilinx), Cadence, Multisim',
    'Tools':        'Git, LaTeX, Linux, Docker',
    'Languages':    'Persian (native), English (fluent)',
  },

  awards: [
    '[Award / Scholarship Name] — [Year]',
    '[Ranked Top X in national entrance exam] — [Year]',
  ],
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function CVSection({ title, children }) {
  return (
    <section className="mb-7 pb-7 border-b border-gray-100 last:border-b-0 last:mb-0 last:pb-0">
      <h2 className="font-display text-[11px] font-semibold uppercase tracking-[0.1em]
                     text-signal mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}

function CVEntry({ title, sub, right, bullets }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-0.5">
        <div>
          <p className="font-display font-semibold text-[14px] text-deep-space">{title}</p>
          {sub && <p className="text-sm text-slate-mid">{sub}</p>}
        </div>
        {right && (
          <span className="text-xs text-slate-mid whitespace-nowrap mt-0.5">{right}</span>
        )}
      </div>
      {bullets && bullets.length > 0 && (
        <ul className="mt-2 ml-1 space-y-1">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-mid">
              <span className="text-signal mt-1.5 text-[8px]">◆</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CVPage() {
  return (
    <main className="pt-[88px] pb-16 min-h-screen bg-lab">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Toolbar */}
        <div className="no-print flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-mid
                       hover:text-deep-space transition-colors"
          >
            <ArrowLeft size={15} /> Back to portfolio
          </Link>

          {/*
            HOW TO USE THIS BUTTON:
            1. Put your CV file in the /public folder and name it "Ali-Saber-CV.pdf"
            2. The button below will download it directly — no extra code needed.
            3. If the file isn't there yet, clicking the button does nothing.
          */}
          <a
            href="/Ali-Saber-CV.pdf"
            download="Ali-Saber-CV.pdf"
            className="inline-flex items-center gap-2 bg-deep-space text-white
                       px-4 py-2 rounded-lg text-sm font-medium
                       hover:bg-circuit transition-colors shadow-sm"
          >
            <Download size={15} /> Download CV
          </a>
        </div>

        {/* PDF not found hint */}
        <div className="no-print mb-4 px-4 py-3 rounded-lg bg-blueprint border border-signal/20
                        text-xs text-circuit flex items-center gap-2">
          <span>📁</span>
          <span>
            To enable the Download button, place your PDF at{' '}
            <code className="font-mono bg-white px-1 py-0.5 rounded">
              /public/Ali-Saber-CV.pdf
            </code>{' '}
            inside the project folder.
          </span>
        </div>

        {/* ── CV paper ── */}
        <div className="print-container bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">

          {/* Header */}
          <div className="pb-6 mb-6 border-b-2 border-deep-space">
            <h1 className="font-display text-3xl font-bold tracking-tight text-deep-space">
              {CV_DATA.name}
            </h1>
            <p className="text-slate-mid mt-1 text-sm">{CV_DATA.title}</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
              <a href={`mailto:${CV_DATA.email}`}
                 className="inline-flex items-center gap-1.5 text-xs text-slate-mid hover:text-signal">
                <Mail size={12} /> {CV_DATA.email}
              </a>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-mid">
                <MapPin size={12} /> {CV_DATA.location}
              </span>
              <a href={`https://${CV_DATA.scholar}`} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-1.5 text-xs text-slate-mid hover:text-signal">
                <ExternalLink size={12} /> Google Scholar
              </a>
              <a href={`https://${CV_DATA.linkedin}`} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-1.5 text-xs text-slate-mid hover:text-signal">
                <ExternalLink size={12} /> LinkedIn
              </a>
            </div>
          </div>

          <CVSection title="Education">
            {CV_DATA.education.map((edu, i) => (
              <CVEntry
                key={i}
                title={edu.degree}
                sub={`${edu.school} · ${edu.location}`}
                right={edu.dates}
                bullets={edu.bullets}
              />
            ))}
          </CVSection>

          <CVSection title="Research Interests">
            <div className="flex flex-wrap gap-2">
              {CV_DATA.research.map((r, i) => (
                <span key={i}
                      className="px-3 py-1 text-xs rounded-full bg-blueprint
                                 text-circuit border border-signal/20">
                  {r}
                </span>
              ))}
            </div>
          </CVSection>

          <CVSection title="Publications">
            <ol className="list-none space-y-3">
              {CV_DATA.publications.map((pub, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-mid leading-relaxed">
                  <span className="font-display font-semibold text-signal flex-shrink-0">
                    [{i + 1}]
                  </span>
                  {pub}
                </li>
              ))}
            </ol>
          </CVSection>

          <CVSection title="Projects">
            {CV_DATA.projects.map((p, i) => (
              <CVEntry key={i} title={p.title} sub={p.desc} right={p.year} />
            ))}
          </CVSection>

          <CVSection title="Technical Skills">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.entries(CV_DATA.skills).map(([cat, val]) => (
                <div key={cat} className="text-sm">
                  <span className="font-semibold text-deep-space">{cat}: </span>
                  <span className="text-slate-mid">{val}</span>
                </div>
              ))}
            </div>
          </CVSection>

          <CVSection title="Awards &amp; Honors">
            <ul className="space-y-2">
              {CV_DATA.awards.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-mid">
                  <span className="text-signal mt-1.5 text-[8px]">◆</span>
                  {a}
                </li>
              ))}
            </ul>
          </CVSection>
        </div>
      </div>
    </main>
  );
}
