import React, { useEffect, useRef } from 'react';
import { content } from '../../content';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const photoWrapperRef = useRef<HTMLDivElement>(null);
  const photoTiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;

    const ctx = gsap.context(() => {
      // 1. Staggered reveal of name letters on load
      if (!prefersReducedMotion && nameRef.current) {
        const letters = nameRef.current.querySelectorAll('.hero-letter');
        gsap.fromTo(
          letters,
          { autoAlpha: 0, y: 50, rotateX: 35 },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.03,
            ease: 'power3.out',
            immediateRender: false,
          }
        );
      }

      // 2. Parallax on scroll for photo wrapper & circle (animating wrapper transforms only)
      if (!prefersReducedMotion && heroRef.current) {
        if (circleRef.current) {
          gsap.to(circleRef.current, {
            y: -30,
            scale: 0.94,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        }

        if (photoWrapperRef.current) {
          gsap.to(photoWrapperRef.current, {
            y: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      }

      // 3. Mouse move tilt parallax on desktop (applied via GSAP quickTo to inner tilt ref only)
      if (!isTouch && !prefersReducedMotion && photoTiltRef.current) {
        const xTo = gsap.quickTo(photoTiltRef.current, 'rotationY', { duration: 0.5, ease: 'power2.out' });
        const yTo = gsap.quickTo(photoTiltRef.current, 'rotationX', { duration: 0.5, ease: 'power2.out' });

        const handleMouseMove = (e: MouseEvent) => {
          const { innerWidth, innerHeight } = window;
          const xPct = (e.clientX / innerWidth - 0.5) * 2;
          const yPct = (e.clientY / innerHeight - 0.5) * 2;
          xTo(xPct * 4); // Max 4 deg rotation
          yTo(-yPct * 4);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const nameChars = "AMRUTHA M".split('');

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative w-full bg-paper pt-10 sm:pt-12 pb-0 border-b border-[rgba(0,0,0,0.12)] overflow-hidden"
    >
      <div className="content-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
          {/* Left Column (Cols 1-7): Typography, Subtitle, Intro & Pill Buttons */}
          <div className="lg:col-span-7 flex flex-col items-start z-10 pb-6 sm:pb-8">
            {/* Eyebrow label with green line */}
            <div className="flex items-center gap-2 mb-4">
              <span className="font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#0B5D3B]">
                PORTFOLIO
              </span>
              <span className="w-8 h-[1.5px] bg-[#0B5D3B]" />
            </div>

            {/* Oversized Single-Line AMRUTHA M Heading with NO dot and NO green square */}
            <h1
              ref={nameRef}
              className="font-anton text-[clamp(2rem,8.5vw,7.2rem)] leading-[0.88] tracking-[-0.02em] uppercase text-ink select-none whitespace-nowrap overflow-visible"
            >
              <span className="inline-block">
                {nameChars.map((char, idx) => (
                  <span
                    key={`char-${idx}`}
                    className="hero-letter inline-block"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
            </h1>

            {/* Subtitle in deep green uppercase caps */}
            <div className="mt-4 font-sans text-[11px] sm:text-xs md:text-sm tracking-[0.12em] sm:tracking-[0.2em] uppercase text-[#0B5D3B] font-semibold leading-relaxed">
              {content.personal.role}
            </div>

            {/* Short Introduction & Tagline */}
            <p className="mt-5 font-sans text-sm sm:text-base lg:text-lg text-ink/85 max-w-xl leading-relaxed">
              {content.personal.tagline}
            </p>

            <p className="mt-2 font-sans text-xs sm:text-sm text-ink-muted max-w-xl leading-relaxed">
              {content.personal.intro}
            </p>

            {/* Two Pill Buttons: View Projects & GitHub */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto relative z-20">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-full bg-[#0B5D3B] text-white font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#08492E] transition-all shadow-sm hover:shadow active:scale-95 text-center"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </a>

              <a
                href={content.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-full bg-transparent border-2 border-[#0B5D3B] text-[#0B5D3B] font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#0B5D3B] hover:text-white transition-all active:scale-95 text-center"
              >
                <Github className="w-4 h-4 flex-shrink-0" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Right Column (Cols 8-12): Photo in Fixed Aspect-Ratio Wrapper */}
          <div className="lg:col-span-5 relative flex items-end justify-center lg:justify-end">
            {/* Outer Parallax Scroll Wrapper */}
            <div
              ref={photoWrapperRef}
              className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] aspect-[4/5] flex items-end justify-center"
            >
              {/* Inner Mouse Tilt Wrapper containing Amrutha portrait in full natural color */}
              <div
                ref={photoTiltRef}
                className="w-full h-full relative z-10 preserve-3d flex items-end justify-center pointer-events-none"
              >
                <img
                  src="/portrait.png"
                  alt="Amrutha M - Full-Stack Developer & MCA Student"
                  className="w-full h-full object-cover object-top select-none pointer-events-none drop-shadow-xl"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
