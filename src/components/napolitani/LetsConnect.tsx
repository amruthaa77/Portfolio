import React, { useState } from 'react';
import { content } from '../../content';
import { Mail, Github, MapPin, ArrowRight, Check, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';

export const LetsConnect: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(content.personal.email);
    setCopied(true);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#0B5D3B', '#0E0E0E', '#EFECE6'],
    });
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section
      id="contact"
      className="w-full bg-paper section-wrapper border-b-0"
    >
      <div className="content-container flex flex-col gap-10 sm:gap-12">
        {/* Three-Column Contact Layout matching reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-stretch">
          {/* Left Column (Cols 1-4): Eyebrow, Heading & Small Green Underline */}
          <div className="lg:col-span-4 flex flex-col items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#0B5D3B]">
                  {content.contact.label}
                </span>
                <span className="w-8 h-[1.5px] bg-[#0B5D3B]" />
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ink tracking-tight leading-[1.08] font-normal">
                Let's Build Something{' '}
                <span className="italic text-[#0B5D3B]">Great.</span>
              </h2>

              <div className="w-12 h-[2px] bg-[#0B5D3B] my-6" />

              <p className="font-sans text-xs sm:text-sm text-ink-muted leading-relaxed max-w-sm">
                {content.contact.description}
              </p>
            </div>

            <div className="mt-8 text-xs font-mono text-ink-muted hidden lg:block">
              // BENGALURU, KARNATAKA, INDIA
            </div>
          </div>

          {/* Middle Column (Cols 5-8): Email, GitHub, Location in Rounded Cards */}
          <div className="lg:col-span-4 flex flex-col gap-5 justify-between">
            {/* Email Card */}
            <div className="p-6 bg-[#EFECE6] border border-[rgba(0,0,0,0.12)] rounded-2xl shadow-subtle">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-ink-muted">
                  EMAIL
                </span>
                <Mail className="w-4 h-4 text-[#0B5D3B]" />
              </div>
              <a
                href={`mailto:${content.contact.email}`}
                className="font-sans text-sm font-semibold text-ink hover:text-[#0B5D3B] transition-colors break-all"
              >
                {content.contact.email}
              </a>
              <div className="mt-3">
                <button
                  onClick={handleCopyEmail}
                  className="text-[11px] font-sans uppercase tracking-wider text-ink-muted hover:text-[#0B5D3B] flex items-center gap-1.5"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#0B5D3B]" />
                      <span className="text-[#0B5D3B] font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* GitHub Card */}
            <div className="p-6 bg-[#EFECE6] border border-[rgba(0,0,0,0.12)] rounded-2xl shadow-subtle">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-ink-muted">
                  GITHUB
                </span>
                <Github className="w-4 h-4 text-[#0B5D3B]" />
              </div>
              <a
                href={content.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm font-semibold text-ink hover:text-[#0B5D3B] transition-colors"
              >
                {content.contact.githubLabel}
              </a>
            </div>

            {/* Location Card */}
            <div className="p-6 bg-[#EFECE6] border border-[rgba(0,0,0,0.12)] rounded-2xl shadow-subtle">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-ink-muted">
                  LOCATION
                </span>
                <MapPin className="w-4 h-4 text-[#0B5D3B]" />
              </div>
              <p className="font-sans text-sm font-semibold text-ink">
                {content.contact.location}
              </p>
            </div>
          </div>

          {/* Right Column (Cols 9-12): Large Outlined Green CTA Box */}
          <div className="lg:col-span-4 flex flex-col h-full">
            <a
              href={`mailto:${content.contact.email}?subject=${encodeURIComponent(
                "Software Opportunity / Project Collaboration"
              )}`}
              className="group block w-full p-8 sm:p-10 border-2 border-[#0B5D3B] bg-paper hover:bg-[#0B5D3B] transition-all duration-300 rounded-2xl text-left cursor-pointer shadow-subtle hover:shadow-card h-full flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-sans uppercase tracking-wider text-[#0B5D3B] group-hover:text-white/80 font-bold block mb-4 transition-colors">
                  OPPORTUNITIES // DIRECT INQUIRY
                </span>
                <h3 className="font-anton text-3xl sm:text-4xl text-[#0B5D3B] group-hover:text-white tracking-tight uppercase leading-[0.98] transition-colors">
                  {content.contact.ctaHeading || "Open to full-time roles"}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-ink-muted group-hover:text-white/80 mt-3 leading-relaxed transition-colors">
                  {content.contact.ctaDescription}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between pt-6 border-t border-[#0B5D3B]/20 group-hover:border-white/20">
                <span className="font-sans text-xs uppercase tracking-wider text-[#0B5D3B] group-hover:text-white font-bold transition-colors">
                  Dispatch Email
                </span>
                <ArrowRight className="w-5 h-5 text-[#0B5D3B] group-hover:text-white transform group-hover:translate-x-2 transition-all" />
              </div>
            </a>
          </div>
        </div>

        {/* Footer: Single Horizontal Line, AMRUTHA M. © 2026 */}
        <footer className="pt-8 border-t border-[rgba(0,0,0,0.12)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-ink-muted">
          <span>{content.footer.copyright}</span>
          <span>Bengaluru, India</span>
        </footer>
      </div>
    </section>
  );
};

export default LetsConnect;
