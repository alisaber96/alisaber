'use client';
import { useState, useRef, useEffect } from 'react';
import {
  Mail, MapPin, ExternalLink, BookOpen,
  Play, Pause, Volume2, VolumeX,
  ChevronDown, ChevronUp,
  Linkedin, Send, Github,
} from 'lucide-react';

// ─── Replace placeholder data with your real content ─────────────────────────

const PROFILE = {
  name:        'M. Ali Saber',
  degree:      "Master's degree in EEE",
  university:  'Tehran University',
  gradYear:    '2024',
  field:       'Signal Processing & Embedded Systems',
  email:       'ali.saber@yahoo.com',
  location:    'Shiraz, Fars, Iran',
  scholarUrl:  'https://scholar.google.com/citations?user=XXXX',
  telegramUrl: 'https://t.me/your_username',
  linkedinUrl: 'https://linkedin.com/in/your-profile',
  address:     'Shiraz, Fars, Iran',
  bio: `Replace this paragraph with your own academic biography. Describe your
  research interests, what problems you work on, your methodology, and what
  motivates your work. A couple of sentences about your background and where
  you are headed makes this section compelling to collaborators and recruiters.`,
};

const PUBLICATIONS = [
  {
    id: 1,
    title:   'Deep Convolutional Networks for EEG Signal Classification in BCI Systems',
    authors: 'M. Ali Saber, Co-Author A, Co-Author B',
    venue:   'IEEE Transactions on Neural Systems and Rehabilitation Engineering, 2024',
    link:    '#',
    img:     null,
  },
  {
    id: 2,
    title:   'Adaptive Beamforming Algorithms for MIMO Radar Under Clutter Conditions',
    authors: 'M. Ali Saber, Co-Author A',
    venue:   'IEEE International Conference on Signal Processing, 2023',
    link:    '#',
    img:     null,
  },
  {
    id: 3,
    title:   'Low-Power VLSI Architecture for Real-Time FFT in Embedded Signal Processors',
    authors: 'M. Ali Saber, Co-Author A, Co-Author B, Co-Author C',
    venue:   'Journal of Circuits, Systems and Computers, 2022',
    link:    '#',
    img:     null,
  },
];

const PROJECTS = [
  {
    id:          1,
    title:       'EEG-Based Brain–Computer Interface',
    description: 'Real-time BCI system using CNN-based EEG classification. 94% accuracy on motor imagery tasks with <50 ms latency.',
    details:     'Full pipeline from EEG acquisition to motor intent classification. Uses an 8-channel amplifier with bandpass filtering (8–30 Hz) and common spatial patterns before a 4-layer CNN. Verified on 10 subjects and deployed on embedded hardware for real-time use.',
    tech:        ['Python', 'TensorFlow', 'MNE-Python', 'CNN', 'Raspberry Pi 4'],
    github:      '#',
    demo:        null,
    video:       null,
  },
  {
    id:          2,
    title:       'MIMO Radar Adaptive Beamformer',
    description: 'MATLAB simulation of wideband adaptive beamforming for MIMO radar in clutter environments.',
    details:     'Implements and benchmarks five adaptive beamforming algorithms (MVDR, LCMV, GSC, SMI, DL-SMI) on a 12-element virtual array. Evaluated under simulated terrain clutter at 5–30 dB CNR, with SINR and beam-pattern analysis.',
    tech:        ['MATLAB', 'Signal Processing', 'Array Processing', 'MIMO'],
    github:      '#',
    demo:        null,
    video:       null,
  },
  {
    id:          3,
    title:       'FPGA Real-Time Signal Processor',
    description: 'Xilinx Artix-7 implementation of a 1024-point FFT pipeline at 100 MHz, consuming 0.8 W.',
    details:     'Radix-4 FFT engine written in SystemVerilog with AXI-Stream interface. Synthesised on Xilinx Artix-7 (XC7A35T). Achieves 100 MHz clock at 0.8 W and fits inside 4,200 LUTs. Interfaced with an external ADC via SPI for live signal capture.',
    tech:        ['SystemVerilog', 'Xilinx Vivado', 'AXI-Stream', 'RTL Design', 'SPI'],
    github:      '#',
    demo:        null,
    video:       null,
  },
  {
    id:          4,
    title:       'Neural Network Hardware Accelerator',
    description: 'Systolic-array inference engine for MobileNet-V2 in SystemVerilog. 4× speedup over CPU at 200 mW.',
    details:     'Systolic array designed in SystemVerilog for 8-bit quantised MobileNet-V2 inference. Verified against a PyTorch floating-point baseline. Post-synthesis timing analysis shows 4× throughput improvement over an ARM Cortex-A53 at 200 mW power draw.',
    tech:        ['SystemVerilog', 'PyTorch', 'Hardware Quantisation', 'Systolic Array'],
    github:      '#',
    demo:        null,
    video:       null,
  },
];

const SKILLS = [
  { category: 'Programming', items: ['Python', 'MATLAB', 'C/C++', 'SystemVerilog'] },
  { category: 'ML / AI',     items: ['TensorFlow', 'PyTorch', 'Keras', 'scikit-learn'] },
  { category: 'Hardware',    items: ['FPGA (Xilinx)', 'Cadence', 'Multisim', 'AXI-Stream'] },
  { category: 'Tools',       items: ['Git', 'LaTeX', 'Linux', 'Docker'] },
  { category: 'Languages',   items: ['Persian (native)', 'English (fluent)'] },
];

// ─── Shared UI ────────────────────────────────────────────────────────────────

function TraceRule() {
  return (
    <div className="flex items-center gap-[5px] mt-3 mb-10">
      <div className="h-[2px] w-12 bg-signal rounded-full" />
      <div className="w-[7px] h-[7px] bg-signal rotate-45 rounded-[1px]" />
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold tracking-tight text-deep-space">
        {children}
      </h2>
      <TraceRule />
    </div>
  );
}

// ─── Video + controls ─────────────────────────────────────────────────────────

function VideoContainer({ proj, videoRef, isPlaying, isMuted, onTogglePlay, onToggleMute, className }) {
  return (
    <div className={`relative overflow-hidden flex items-center justify-center bg-blueprint ${className}`}>

      {/* Video or placeholder */}
      {proj.video ? (
        <video
          ref={videoRef}
          src={proj.video}
          className="w-full h-full object-cover"
          loop
          playsInline
          /* no muted attribute — plays with sound */
        />
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(46,125,200,0.07) 1px, transparent 1px),' +
                'linear-gradient(90deg, rgba(46,125,200,0.07) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <div className="relative z-10 w-11 h-11 rounded-full bg-white/80 flex items-center justify-center shadow-sm">
            <Play size={18} className="text-signal ml-0.5" />
          </div>
        </>
      )}

      {/* Controls bar — only shown when a real video is set */}
      {proj.video && (
        <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between
                        px-3 py-2 bg-gradient-to-t from-black/65 to-transparent">
          <button
            onClick={(e) => { e.stopPropagation(); onTogglePlay(); }}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/35 text-white transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleMute(); }}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/35 text-white transition-colors"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({ proj, isExpanded, onToggle }) {
  const videoRef   = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted,   setIsMuted]   = useState(false);

  // Keep isPlaying in sync with actual video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !proj.video) return;
    const onPlay  = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    video.addEventListener('play',  onPlay);
    video.addEventListener('pause', onPause);
    return () => {
      video.removeEventListener('play',  onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, [proj.video]);

  // Hover: auto-play with sound (browser may require a prior click on page)
  const handleMouseEnter = () => {
    if (videoRef.current && proj.video) {
      videoRef.current.play().catch(() => {});
    }
  };
  const handleMouseLeave = () => {
    if (videoRef.current && proj.video) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    isPlaying
      ? videoRef.current.pause()
      : videoRef.current.play().catch(() => {});
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const videoProps = { proj, videoRef, isPlaying, isMuted, onTogglePlay: togglePlay, onToggleMute: toggleMute };

  return (
    <article
      className={`bg-white rounded-2xl overflow-hidden border flex flex-col
        transition-shadow duration-200
        ${isExpanded
          ? 'md:col-span-2 border-signal/40 shadow-[0_4px_32px_0_rgba(46,125,200,0.13)]'
          : 'border-gray-100 hover:shadow-[0_4px_24px_0_rgba(10,22,40,0.10)]'
        }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isExpanded ? (
        /* ── Expanded layout ─────────────────────────────────────────────── */
        <div className="flex flex-col md:flex-row">
          <VideoContainer {...videoProps} className="md:w-[42%] aspect-video md:aspect-auto" />

          <div className="flex-1 p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display font-semibold text-xl text-deep-space leading-snug">
                {proj.title}
              </h3>
              <button
                onClick={onToggle}
                className="flex-shrink-0 p-1.5 rounded-lg text-slate-mid
                           hover:text-deep-space hover:bg-gray-100 transition-colors"
                aria-label="Collapse"
              >
                <ChevronUp size={18} />
              </button>
            </div>

            <p className="text-sm text-slate-mid leading-relaxed">{proj.details}</p>

            {proj.tech?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {proj.tech.map((t) => (
                  <span key={t}
                        className="px-2.5 py-1 text-xs rounded-full bg-blueprint
                                   text-circuit border border-signal/20">
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-3 mt-auto pt-1">
              {proj.github && (
                <a href={proj.github} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-1.5 text-sm font-medium
                              text-slate-mid border border-gray-200 rounded-lg px-3.5 py-1.5
                              hover:border-deep-space hover:text-deep-space transition-all">
                  <Github size={14} /> GitHub
                </a>
              )}
              {proj.demo && (
                <a href={proj.demo} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-1.5 text-sm font-medium
                              text-white bg-signal rounded-lg px-3.5 py-1.5
                              hover:bg-circuit transition-colors">
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ── Collapsed layout ────────────────────────────────────────────── */
        <>
          <VideoContainer {...videoProps} className="aspect-video" />
          <div className="p-5 flex flex-col flex-1">
            <h3 className="font-display font-semibold text-[15px] text-deep-space mb-1.5">
              {proj.title}
            </h3>
            <p className="text-sm text-slate-mid leading-relaxed flex-1">
              {proj.description}
            </p>
            <button
              onClick={onToggle}
              className="mt-4 self-start inline-flex items-center gap-1 text-sm font-medium
                         text-signal border border-signal/30 rounded-lg px-3.5 py-1.5
                         hover:bg-signal hover:text-white hover:border-signal
                         transition-all duration-150"
            >
              View details <ChevronDown size={14} />
            </button>
          </div>
        </>
      )}
    </article>
  );
}

// ─── Section: Hero ────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section id="home" className="pt-[88px] pb-16 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
          <div className="flex-shrink-0">
            <div className="w-36 h-36 rounded-2xl bg-blueprint border-2 border-signal/20
                            flex items-center justify-center overflow-hidden">
              <img
                src="/profile.jpg"
                alt="Ali Saber"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="font-display text-3xl font-bold tracking-tight text-deep-space">
              {PROFILE.name}
            </h1>
            <div className="flex flex-col gap-2">
              <span className="inline-flex items-center gap-2 text-slate-mid text-sm">
                <BookOpen size={15} className="text-signal flex-shrink-0" />
                {PROFILE.degree} · {PROFILE.university}
              </span>
              <a href={`mailto:${PROFILE.email}`}
                 className="inline-flex items-center gap-2 text-slate-mid text-sm hover:text-signal transition-colors group">
                <Mail size={15} className="text-signal flex-shrink-0" />
                <span className="group-hover:underline underline-offset-2">{PROFILE.email}</span>
              </a>
              <span className="inline-flex items-center gap-2 text-slate-mid text-sm">
                <MapPin size={15} className="text-signal flex-shrink-0" />
                {PROFILE.location}
              </span>
              <a href={PROFILE.scholarUrl} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 text-slate-mid text-sm hover:text-signal transition-colors group">
                <ExternalLink size={15} className="text-signal flex-shrink-0" />
                <span className="group-hover:underline underline-offset-2">Google Scholar</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: About ───────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section className="py-14 bg-lab">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-2xl">
          <p className="font-display font-semibold text-lg text-deep-space mb-1">
            {PROFILE.name}
          </p>
          <p className="text-slate-mid text-sm mb-5 italic">
            From {PROFILE.university}, graduated in {PROFILE.gradYear} in {PROFILE.field}
          </p>
          <p className="border-l-[3px] border-signal pl-4 text-slate-mid leading-7 text-[15px]">
            {PROFILE.bio}
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Publications ───────────────────────────────────────────────────

function PublicationsSection() {
  return (
    <section id="publications" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading>Publications</SectionHeading>
        <ul className="flex flex-col gap-4">
          {PUBLICATIONS.map((pub) => (
            <li
              key={pub.id}
              className="flex items-start gap-4 p-4 rounded-xl
                         border border-gray-100 hover:border-signal/40
                         hover:shadow-[0_2px_16px_0_rgba(46,125,200,0.08)]
                         transition-all duration-200"
            >
              <div className="flex-shrink-0 w-[72px] h-[72px] rounded-lg
                              bg-blueprint border border-gray-200
                              flex items-center justify-center overflow-hidden">
                {pub.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={pub.img} alt={pub.title} className="object-cover w-full h-full" />
                ) : (
                  <BookOpen size={22} className="text-signal/50" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display font-semibold text-[15px] text-deep-space
                             hover:text-signal transition-colors leading-snug line-clamp-2"
                >
                  {pub.title}
                </a>
                <p className="mt-1 text-sm text-slate-mid">{pub.authors}</p>
                <p className="mt-0.5 text-xs text-signal italic">{pub.venue}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── Section: Projects ───────────────────────────────────────────────────────

function ProjectsSection() {
  const [expandedId, setExpandedId] = useState(null);
  const toggle = (id) => setExpandedId((prev) => (prev === id ? null : id));

  return (
    <section id="projects" className="py-16 bg-lab">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading>Projects</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROJECTS.map((proj) => (
            <ProjectCard
              key={proj.id}
              proj={proj}
              isExpanded={expandedId === proj.id}
              onToggle={() => toggle(proj.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Skills ─────────────────────────────────────────────────────────

function SkillsSection() {
  return (
    <section id="skills" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading>Skills</SectionHeading>
        <div className="flex flex-col gap-6">
          {SKILLS.map(({ category, items }) => (
            <div key={category} className="flex flex-col sm:flex-row sm:items-start gap-3">
              <span className="w-28 flex-shrink-0 text-sm font-semibold text-deep-space pt-0.5">
                {category}
              </span>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-sm rounded-full bg-lab
                               text-slate-mid border border-gray-200
                               hover:border-signal/50 hover:text-circuit transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Contact ────────────────────────────────────────────────────────

const CONTACT_ITEMS = [
  { Icon: Mail,     label: PROFILE.email,    href: `mailto:${PROFILE.email}`  },
  { Icon: Send,     label: 'Telegram',       href: PROFILE.telegramUrl        },
  { Icon: Linkedin, label: 'LinkedIn',       href: PROFILE.linkedinUrl        },
  { Icon: MapPin,   label: PROFILE.address,  href: null                       },
];

function ContactSection() {
  return (
    <section id="contact" className="py-16 bg-lab">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading>Contact</SectionHeading>
        <ul className="flex flex-col gap-4 max-w-sm">
          {CONTACT_ITEMS.map(({ Icon, label, href }, i) => (
            <li key={i} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blueprint flex items-center justify-center flex-shrink-0">
                <Icon size={17} className="text-signal" />
              </div>
              {href ? (
                <a
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="text-[15px] text-slate-mid hover:text-signal
                             transition-colors hover:underline underline-offset-2"
                >
                  {label}
                </a>
              ) : (
                <span className="text-[15px] text-slate-mid">{label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-8 border-t border-gray-100 bg-white">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row justify-between
                      items-center gap-2 text-xs text-slate-mid/70">
        <span>© {new Date().getFullYear()} M. Ali Saber</span>
        <span>Built with Next.js · Tehran University</span>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <PublicationsSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
