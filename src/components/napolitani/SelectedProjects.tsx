import React, { useEffect, useRef, useState } from 'react';
import { content } from '../../content';
import { ProjectModal } from './ProjectModal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ExternalLink, Github, Lock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  project: (typeof content.projects)[0];
  onOpenDetails: (p: (typeof content.projects)[0]) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouch(true);
      return;
    }

    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const xPct = (e.clientX - rect.left) / rect.width - 0.5;
      const yPct = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({
        x: -yPct * 5,
        y: xPct * 5,
      });
    };

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      role="button"
      aria-label={`Inspect specifications for ${project.name}`}
      onClick={() => onOpenDetails(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenDetails(project);
        }
      }}
      style={
        !isTouch
          ? {
              transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.15s ease-out, border-color 0.2s ease, box-shadow 0.2s ease',
            }
          : undefined
      }
      className="project-card-item group relative bg-paper border border-[rgba(0,0,0,0.12)] hover:border-[#0B5D3B] p-6 sm:p-7 rounded-2xl transition-all cursor-pointer shadow-subtle hover:shadow-card preserve-3d flex flex-col justify-between h-full focus:outline-none focus:ring-2 focus:ring-[#0B5D3B]"
    >
      <div className="flex flex-col h-full">
        {/* Top Header: Number (01, 02, 03) & Category */}
        <div className="flex items-baseline gap-4 pb-4 border-b border-[rgba(0,0,0,0.12)]">
          <span className="font-serif text-3xl sm:text-4xl text-ink font-normal flex-shrink-0">
            {project.number}
          </span>
          <span className="font-sans text-[10.5px] sm:text-xs tracking-[0.16em] uppercase text-[#0B5D3B] font-semibold truncate">
            {project.category}
          </span>
        </div>

        {/* Title & Short Description */}
        <div className="mt-5 mb-2">
          <h3 className="font-serif text-2xl sm:text-3xl text-ink font-normal normal-case group-hover:text-[#0B5D3B] transition-colors leading-tight">
            {project.name}
          </h3>
          <p className="font-sans text-xs sm:text-sm text-ink-muted mt-2 leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Realistic CSS-Based Browser Mockup Window with 16:10 Screenshot */}
        <div className="my-4 border border-[rgba(0,0,0,0.12)] bg-[#EFECE6] rounded-xl overflow-hidden shadow-inner flex flex-col">
          {/* Browser Chrome Header */}
          <div className="px-3 py-2 bg-[#E2DFD8] border-b border-[rgba(0,0,0,0.12)] flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#CBC8C1]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#CBC8C1]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#CBC8C1]" />
            </div>

            {/* URL bar with text truncation */}
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-paper text-[10px] font-mono text-ink-muted border border-[rgba(0,0,0,0.12)] rounded-sm min-w-0 max-w-[170px] truncate">
              <Lock className="w-2.5 h-2.5 text-[#0B5D3B] flex-shrink-0" />
              <span className="truncate">{project.mockupData.url}</span>
            </div>

            {/* Non-overlapping green status badge */}
            <span className="text-[9px] font-mono uppercase bg-[#0B5D3B] text-white px-2 py-0.5 font-bold rounded-sm flex-shrink-0">
              {project.mockupData.badge}
            </span>
          </div>

          {/* Browser Mockup Image Window (16:10 aspect ratio) */}
          <div className="w-full aspect-[16/10] bg-[#0E0E0E] overflow-hidden">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover object-top block group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        </div>

        {/* Compact Measurable Outcome / Result */}
        <div className="p-3 bg-[rgba(11,93,59,0.08)] border-l-2 border-[#0B5D3B] rounded-r-lg text-xs font-sans text-ink leading-relaxed">
          <strong className="text-[#0B5D3B] font-bold uppercase tracking-wider text-[10px] block mb-0.5">
            Verified Outcome:
          </strong>
          <span className="line-clamp-2">{project.outcome}</span>
        </div>

        {/* Technology Tags */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] font-sans uppercase tracking-wider text-ink-muted bg-[#EFECE6] border border-[rgba(0,0,0,0.08)] rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Bar: Interaction link */}
      <div className="mt-5 pt-4 border-t border-[rgba(0,0,0,0.12)] flex items-center justify-between">
        <span className="font-sans text-xs font-bold uppercase tracking-wider text-ink group-hover:text-[#0B5D3B] transition-colors flex items-center gap-1.5">
          <span>Inspect Specifications</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
        </span>

        <div className="flex items-center gap-2">
          {project.liveUrl && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                if (project.liveUrl) {
                  window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                }
              }}
              className="p-1.5 text-ink-muted hover:text-[#0B5D3B] transition-colors cursor-pointer"
              title="Open Live Deployment"
            >
              <ExternalLink className="w-4 h-4" />
            </span>
          )}
          {project.githubUrl && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                if (project.githubUrl) {
                  window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
                }
              }}
              className="p-1.5 text-ink-muted hover:text-[#0B5D3B] transition-colors cursor-pointer"
              title="View Repository"
            >
              <Github className="w-4 h-4" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export const SelectedProjects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<(typeof content.projects)[0] | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const modalId = params.get('modal');
      if (modalId) {
        return content.projects.find((p) => p.id === modalId) || null;
      }
      if (window.location.hash.startsWith('#modal')) {
        return content.projects[0] || null;
      }
    }
    return null;
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.project-card-item');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 35, rotateX: 10 },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    // Refresh ScrollTrigger once fonts and images are ready to ensure perfect coordinate calculation
    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="w-full bg-paper-secondary section-wrapper"
    >
      <div className="content-container flex flex-col gap-8 sm:gap-10">
        {/* Header Bar: Left Intro Column */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[rgba(0,0,0,0.12)]">
          <div className="flex flex-col items-start max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#0B5D3B]">
                SELECTED PROJECTS
              </span>
              <span className="w-8 h-[1.5px] bg-[#0B5D3B]" />
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ink tracking-tight leading-[1.08] font-normal">
              Real-World Solutions with Measurable{' '}
              <span className="italic text-[#0B5D3B]">Impact.</span>
            </h2>

            <div className="w-12 h-[2px] bg-[#0B5D3B] my-5" />

            <p className="font-sans text-sm sm:text-base text-ink-muted leading-relaxed">
              Full-stack applications engineered for concurrency safety, data integrity, and low-latency execution. Each project features verified automated test suites and production deployments.
            </p>
          </div>

          <a
            href={content.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 h-11 px-6 rounded-full bg-transparent border-2 border-[#0B5D3B] text-[#0B5D3B] font-sans text-xs font-semibold tracking-wider uppercase hover:bg-[#0B5D3B] hover:text-white transition-all self-start lg:self-end pb-0.5 active:scale-95"
          >
            <span>View All on GitHub</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Three Horizontally Aligned Equal Project Cards on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 perspective-1200 items-stretch">
          {content.projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </div>

      {/* Deep-Dive Spec Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject as any}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default SelectedProjects;
