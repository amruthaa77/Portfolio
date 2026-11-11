import React from 'react';
import { content } from '../../content';
import { GraduationCap, Award, ShieldCheck } from 'lucide-react';

export const About: React.FC = () => {
  const highlightIcons = [
    <GraduationCap className="w-5 h-5 text-[#0B5D3B]" key="grad" />,
    <Award className="w-5 h-5 text-[#0B5D3B]" key="award" />,
    <ShieldCheck className="w-5 h-5 text-[#0B5D3B]" key="shield" />,
  ];

  return (
    <section
      id="about"
      className="w-full bg-paper section-wrapper"
    >
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          {/* Left Column (Cols 1-5): Eyebrow & Refined Serif Heading with Green Italic Accent */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#0B5D3B]">
                {content.about.label}
              </span>
              <span className="w-8 h-[1.5px] bg-[#0B5D3B]" />
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ink tracking-tight leading-[1.08] font-normal">
              A Developer, Researcher & Problem{' '}
              <span className="italic text-[#0B5D3B]">Solver.</span>
            </h2>

            <div className="w-12 h-[2px] bg-[#0B5D3B] my-6 sm:my-8" />
          </div>

          {/* Right Column (Cols 6-12): Blurb Narrative & 3 Stats Strip */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            {/* Professional Narrative */}
            <div className="space-y-4 font-sans text-sm sm:text-base text-ink/85 leading-relaxed">
              {content.about.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* 3 Stats Strip with Icons, Large Serif Numbers & Vertical Separators */}
            <div className="pt-8 border-t border-[rgba(0,0,0,0.12)] grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0">
              {content.about.highlights.map((item, idx) => (
                <div
                  key={item.number}
                  className={`flex flex-col sm:px-6 ${
                    idx > 0 ? 'sm:border-l sm:border-[rgba(0,0,0,0.12)]' : 'sm:pl-0'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-2.5">
                    {highlightIcons[idx] || <Award className="w-4 h-4 text-[#0B5D3B]" />}
                    <span className="font-serif text-3xl sm:text-4xl text-[#0B5D3B] font-normal">
                      {item.number}
                    </span>
                  </div>
                  <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-ink mb-1.5">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-ink-muted leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
