import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ProjectItem } from '../../content';
import { X, ExternalLink, Github, Check, ShieldCheck, Code2 } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!project) return;

    // Capture triggering element to restore focus on modal dismiss
    triggerElementRef.current = document.activeElement as HTMLElement;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus the close button once opened
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Keyboard Focus Trap inside modal dialog
      if (e.key === 'Tab' && dialogRef.current) {
        const focusableEls = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableEls.length === 0) return;

        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstEl || document.activeElement === dialogRef.current) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);

      // Restore focus to original trigger element
      if (triggerElementRef.current && typeof triggerElementRef.current.focus === 'function') {
        triggerElementRef.current.focus();
      }
    };
  }, [project, onClose]);

  if (!project) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-6 md:p-8 overflow-y-auto"
      role="presentation"
    >
      {/* Backdrop with click-to-close (dimmed + blur) */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0E0E0E]/60 backdrop-blur-sm transition-opacity duration-200"
        aria-hidden="true"
      />

      {/* Modal Dialog Container with SOLID #F6F4EF background and NO panel opacity */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
        aria-describedby="modal-project-desc"
        tabIndex={-1}
        style={{ backgroundColor: '#F6F4EF', opacity: 1 }}
        className="relative w-full max-w-2xl max-h-[90svh] overflow-y-auto overflow-x-hidden bg-[#F6F4EF] border border-[rgba(0,0,0,0.12)] p-6 sm:p-8 md:p-9 rounded-2xl shadow-2xl z-10 outline-none flex flex-col gap-6"
      >
        {/* Close Button: pinned inside top-right corner with 16px inset, never overlapping title */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-[rgba(0,0,0,0.12)] bg-[#EFECE6] text-ink hover:text-[#0B5D3B] hover:border-[#0B5D3B] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0B5D3B] z-20 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* 1. Header (Number + Category + Title) */}
        <div className="pr-12 sm:pr-14 pb-4 border-b border-[rgba(0,0,0,0.12)]">
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="font-serif text-2xl text-[#0B5D3B] font-normal">
              {project.number}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#0B5D3B]" />
            <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.16em] uppercase text-[#0B5D3B] font-semibold truncate">
              {project.category}
            </span>
          </div>
          <h3
            id="modal-project-title"
            className="font-serif text-2xl sm:text-3xl text-ink font-normal leading-tight"
          >
            {project.name}
          </h3>
        </div>

        {/* 2. Overview / Full Unedited Description */}
        <div>
          <h4 className="font-sans text-[11px] font-bold uppercase tracking-wider text-ink-muted mb-2">
            System Overview & Architecture
          </h4>
          <p
            id="modal-project-desc"
            className="font-sans text-sm sm:text-base text-ink/90 leading-relaxed"
          >
            {project.description}
          </p>
        </div>

        {/* 3. Tech Stack Tags (Dedicated row with 12px gap) */}
        <div>
          <h4 className="font-sans text-[11px] font-bold uppercase tracking-wider text-ink-muted mb-2.5">
            Technology Stack
          </h4>
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-sans uppercase tracking-wider text-ink-muted bg-[#EFECE6] border border-[rgba(0,0,0,0.08)] rounded-lg font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* 4. Action Buttons (Dedicated row below tags with 12px gap) */}
        <div className="flex flex-wrap gap-3 items-center">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#0B5D3B] text-white font-sans text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#08492E] transition-colors flex items-center gap-2 shadow-sm"
            >
              <span>LIVE SITE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 border border-[rgba(0,0,0,0.16)] bg-paper text-ink font-sans text-xs font-semibold uppercase tracking-wider rounded-lg hover:border-[#0B5D3B] hover:text-[#0B5D3B] transition-colors flex items-center gap-2"
            >
              <Github className="w-3.5 h-3.5" />
              <span>SOURCE</span>
            </a>
          ) : (
            <span className="px-4 py-2.5 border border-[rgba(0,0,0,0.12)] text-ink-muted/60 font-sans text-xs uppercase tracking-wider rounded-lg bg-[#EFECE6] cursor-not-allowed select-none">
              REPO (COMING SOON)
            </span>
          )}
        </div>

        {/* 5. Verified Outcome */}
        <div className="p-4 bg-[rgba(11,93,59,0.08)] border-l-4 border-[#0B5D3B] rounded-r-lg flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#0B5D3B] flex-shrink-0 mt-0.5" />
          <div className="flex flex-col gap-0.5">
            <span className="font-sans text-[10.5px] font-bold uppercase tracking-wider text-[#0B5D3B]">
              Verified Outcome & Invariant
            </span>
            <span className="font-sans text-xs sm:text-sm text-ink font-medium leading-relaxed">
              {project.outcome}
            </span>
          </div>
        </div>

        {/* 6. Code Snippet Block (Strict horizontal scroll inside block without expanding panel) */}
        {project.mockupData.previewCode && (
          <div className="w-full max-w-full min-w-0 rounded-xl overflow-hidden border border-[rgba(0,0,0,0.12)]">
            <div className="px-4 py-2 bg-[#E2DFD8] border-b border-[rgba(0,0,0,0.12)] flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#0B5D3B] font-bold flex items-center gap-1.5 truncate">
                <Code2 className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{project.mockupData.previewTitle || 'SYSTEM CODE INVARIANT'}</span>
              </span>
              <span className="text-[10px] font-mono text-ink-muted flex-shrink-0">
                {project.mockupData.stat}
              </span>
            </div>
            <pre className="p-4 bg-[#141412] text-[#EFECE6] font-mono text-xs overflow-x-auto whitespace-pre max-w-full leading-relaxed">
              <code>{project.mockupData.previewCode}</code>
            </pre>
          </div>
        )}

        {/* 7. Architecture Highlights */}
        <div className="pt-4 border-t border-[rgba(0,0,0,0.12)]">
          <h4 className="font-sans text-[11px] tracking-wider uppercase text-ink-muted font-bold mb-3">
            System Design & Engineering Principles
          </h4>
          <ul className="space-y-2 font-sans text-xs sm:text-sm text-ink/80">
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#0B5D3B] mt-0.5 flex-shrink-0" />
              <span>Full-stack architecture verified with automated unit and integration tests.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#0B5D3B] mt-0.5 flex-shrink-0" />
              <span>Engineered specifically to solve real civic, mobility, and AI system challenges in Bengaluru.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#0B5D3B] mt-0.5 flex-shrink-0" />
              <span>Clean separation of client presentation, transactional backend, and data persistence layers.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProjectModal;
