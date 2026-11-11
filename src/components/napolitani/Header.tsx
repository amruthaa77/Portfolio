import React, { useState, useEffect } from 'react';
import { content } from '../../content';
import { FileText, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'experience', 'contact'];
      const scrollY = window.scrollY + 180;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F6F4EF]/95 backdrop-blur-md border-b border-[rgba(0,0,0,0.12)] h-16 flex items-center transition-colors">
      <div className="content-container flex items-center justify-between">
        {/* Left: A/M Monogram */}
        <div className="flex-1 text-left flex items-center">
          <a
            href="#home"
            className="font-anton text-2xl sm:text-3xl tracking-tight text-ink hover:text-[#0B5D3B] transition-colors inline-flex items-center leading-none py-1"
            aria-label="Amrutha M - Home"
          >
            A/M
          </a>
        </div>

        {/* Centre: Desktop Nav (Home, About, Projects, Skills, Experience, Contact) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-sans font-medium uppercase tracking-wider text-ink-muted">
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`py-1 transition-colors relative hover:text-ink ${
                activeSection === item.href.replace('#', '')
                  ? 'text-ink font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#0B5D3B]'
                  : ''
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: Pill Resume Button */}
        <div className="flex-1 flex items-center justify-end gap-3">
          <a
            href={content.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 text-xs font-sans font-semibold uppercase tracking-wider bg-transparent border border-[#0B5D3B] text-[#0B5D3B] hover:bg-[#0B5D3B] hover:text-white rounded-full transition-all duration-200"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-ink hover:text-[#0B5D3B] border border-[rgba(0,0,0,0.12)] rounded-lg"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Slide-out / Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[rgba(0,0,0,0.12)] bg-[#F6F4EF] py-4 px-6 mt-3 flex flex-col gap-3">
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-xs font-sans font-bold uppercase tracking-wider text-ink hover:text-[#0B5D3B]"
            >
              {item.label}
            </a>
          ))}
          <a
            href={content.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 py-2.5 text-xs font-sans font-bold uppercase tracking-wider bg-[#0B5D3B] text-white rounded-full"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Download Resume (PDF)</span>
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
