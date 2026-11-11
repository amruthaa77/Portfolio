import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from './components/napolitani/Header';
import { Hero } from './components/napolitani/Hero';
import { About } from './components/napolitani/About';
import { SelectedProjects } from './components/napolitani/SelectedProjects';
import { SkillsToolkit } from './components/napolitani/SkillsToolkit';
import { ImpactExperience } from './components/napolitani/ImpactExperience';
import { LetsConnect } from './components/napolitani/LetsConnect';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger once fonts are ready
    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);

    const params = new URLSearchParams(window.location.search);
    const scrollTarget = params.get('scroll') || window.location.hash;
    if (scrollTarget) {
      lenis.scrollTo(scrollTarget, { immediate: true });
      ScrollTrigger.refresh();
      setTimeout(() => {
        lenis.scrollTo(scrollTarget, { immediate: true });
        ScrollTrigger.refresh();
      }, 50);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-paper text-ink selection:bg-accent-green selection:text-white font-sans overflow-x-hidden">
      {/* 1. Header (A/M monogram, center nav, resume button) */}
      <Header />

      <main>
        {/* 2. Hero (AMRUTHA M Anton heading, green subtitle, intro, green circle & reserved portrait) */}
        <Hero />

        {/* 3. About (ABOUT ME label, Anton heading, 3 verified serif achievements) */}
        <About />

        {/* 4. Selected Projects (3 numbered cards, CSS browser mockups, 1200px perspective) */}
        <SelectedProjects />

        {/* 5. Skills & Toolkit (Frontend, Backend, Data & AI, animated progress bars) */}
        <SkillsToolkit />

        {/* 6. Impact & Experience (Serif statistics, vertical dividers, quote box) */}
        <ImpactExperience />

        {/* 7. Let's Connect (Three-column layout, contact channels & green bordered CTA box) */}
        <LetsConnect />
      </main>
    </div>
  );
};

export default App;
