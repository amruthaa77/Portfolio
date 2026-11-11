import React, { useEffect, useRef } from 'react';
import { content } from '../../content';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ImpactExperience: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const statEls = sectionRef.current?.querySelectorAll('.stat-number-val');
      if (statEls) {
        statEls.forEach((el) => {
          const rawVal = el.getAttribute('data-val') || '0';
          const targetNum = parseInt(rawVal, 10);
          const unit = el.getAttribute('data-unit') || '';
          const obj = { val: 0 };

          gsap.to(obj, {
            val: targetNum,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
            onUpdate: () => {
              el.innerHTML = `${Math.floor(obj.val)}${unit ? `<span class="font-sans font-normal text-2xl sm:text-3xl lg:text-4xl text-[#0B5D3B] ml-1">${unit}</span>` : ''}`;
            },
          });
        });
      }
    }, sectionRef);

    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="w-full bg-paper-secondary section-wrapper"
    >
      <div className="content-container flex flex-col gap-8 sm:gap-10">
        {/* Header Label */}
        <div className="flex flex-col items-start max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#0B5D3B]">
              IMPACT & EXPERIENCE
            </span>
            <span className="w-8 h-[1.5px] bg-[#0B5D3B]" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ink tracking-tight leading-[1.08] font-normal">
            Measured Delivery &{' '}
            <span className="italic text-[#0B5D3B]">Research.</span>
          </h2>

          <div className="w-12 h-[2px] bg-[#0B5D3B] my-5" />
        </div>

        {/* Large Serif Statistics with Thin Vertical Separators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 pb-12 border-b border-[rgba(0,0,0,0.12)]">
          {content.impact.stats.slice(0, 3).map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col sm:px-8 ${
                idx > 0 ? 'sm:border-l sm:border-[rgba(0,0,0,0.12)]' : 'sm:pl-0'
              }`}
            >
              <div
                data-val={stat.value}
                data-unit={stat.unit}
                className="stat-number-val font-serif text-5xl sm:text-6xl lg:text-7xl text-ink leading-none tracking-tight select-none flex items-baseline flex-wrap"
              >
                <span>{stat.value}</span>
                {stat.unit && (
                  <span className="font-sans font-normal text-2xl sm:text-3xl lg:text-4xl text-[#0B5D3B] ml-1">
                    {stat.unit}
                  </span>
                )}
              </div>

              <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-ink mt-4">
                {stat.label}
              </h3>

              <p className="font-sans text-xs text-ink-muted mt-1.5 leading-relaxed">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>

        {/* Experience & Leadership Highlights in Rounded Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {content.experienceHighlights.map((exp, idx) => (
            <div
              key={exp.role}
              className="p-6 bg-paper border border-[rgba(0,0,0,0.12)] rounded-2xl flex flex-col justify-between shadow-subtle h-full"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[rgba(0,0,0,0.12)] mb-3">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#0B5D3B]">
                    0{idx + 1} // {exp.period}
                  </span>
                  <span className="text-[10px] font-sans uppercase text-ink-muted">
                    {exp.location}
                  </span>
                </div>

                <h4 className="font-anton text-xl text-ink uppercase tracking-wide">
                  {exp.role}
                </h4>

                <div className="font-sans text-xs font-semibold text-ink-muted mt-0.5 mb-3">
                  {exp.company}
                </div>

                <p className="font-sans text-xs text-ink/80 leading-relaxed">
                  {exp.summary}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[rgba(0,0,0,0.12)] flex items-center gap-2 text-[11px] font-mono text-ink-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0B5D3B]" />
                <span>Verified Timeline</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bordered Quote Element with Green Quotation Mark & ~16px Radius */}
        <div className="p-8 sm:p-12 md:p-14 bg-paper border-2 border-[#0B5D3B] rounded-2xl relative shadow-subtle">
          <Quote className="w-10 h-10 text-[#0B5D3B] mb-4 stroke-[1.5]" />

          <blockquote className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-ink leading-snug max-w-4xl">
            "{content.impact.quote.text}"
          </blockquote>

          <div className="mt-8 pt-6 border-t border-[rgba(0,0,0,0.12)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="font-sans text-xs uppercase tracking-wider text-ink font-bold">
              {content.impact.quote.author}
            </span>
            <span className="font-sans text-xs text-ink-muted">
              {content.impact.quote.title}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactExperience;
