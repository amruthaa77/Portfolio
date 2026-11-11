import React from 'react';
import { content } from '../../content';
import {
  Code2,
  Terminal,
  Database,
  Server,
  Globe,
  GitBranch,
  FileCode,
  Workflow,
  BrainCircuit,
  BarChart3,
  CheckCircle2,
} from 'lucide-react';

const getSkillIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('react') || lower.includes('html')) return <Globe className="w-3.5 h-3.5 text-[#0B5D3B] flex-shrink-0" />;
  if (lower.includes('typescript') || lower.includes('javascript')) return <FileCode className="w-3.5 h-3.5 text-[#0B5D3B] flex-shrink-0" />;
  if (lower.includes('node') || lower.includes('express') || lower.includes('server')) return <Server className="w-3.5 h-3.5 text-[#0B5D3B] flex-shrink-0" />;
  if (lower.includes('python') || lower.includes('terminal')) return <Terminal className="w-3.5 h-3.5 text-[#0B5D3B] flex-shrink-0" />;
  if (lower.includes('mongo') || lower.includes('sql') || lower.includes('data')) return <Database className="w-3.5 h-3.5 text-[#0B5D3B] flex-shrink-0" />;
  if (lower.includes('api') || lower.includes('rest')) return <Workflow className="w-3.5 h-3.5 text-[#0B5D3B] flex-shrink-0" />;
  if (lower.includes('git')) return <GitBranch className="w-3.5 h-3.5 text-[#0B5D3B] flex-shrink-0" />;
  if (lower.includes('claude') || lower.includes('ai') || lower.includes('machine')) return <BrainCircuit className="w-3.5 h-3.5 text-[#0B5D3B] flex-shrink-0" />;
  if (lower.includes('regression') || lower.includes('analysis') || lower.includes('stats')) return <BarChart3 className="w-3.5 h-3.5 text-[#0B5D3B] flex-shrink-0" />;
  if (lower.includes('jest') || lower.includes('pytest') || lower.includes('test')) return <CheckCircle2 className="w-3.5 h-3.5 text-[#0B5D3B] flex-shrink-0" />;
  return <Code2 className="w-3.5 h-3.5 text-[#0B5D3B] flex-shrink-0" />;
};

/**
 * Derives which projects in the repository use a given skill,
 * strictly matching against the project cards' declared tech-stack tags.
 */
const getProjectsUsingSkill = (skillName: string, projects: typeof content.projects): string[] => {
  const matchedProjects: string[] = [];
  const s = skillName.toLowerCase();

  projects.forEach((proj) => {
    const hasMatch = proj.tags.some((tag) => {
      const t = tag.toLowerCase();
      if (s === 'react' && t === 'react') return true;
      if (s === 'typescript' && t === 'typescript') return true;
      if (s.includes('tailwind') && t.includes('tailwind')) return true;
      if (s.includes('node') && (t.includes('node') || t.includes('express'))) return true;
      if ((s.includes('python') || s.includes('fastapi')) && (t.includes('python') || t.includes('fastapi'))) return true;
      if (s.includes('swagger') && t.includes('swagger')) return true;
      if ((s.includes('jest') || s.includes('pytest')) && (t.includes('jest') || t.includes('pytest'))) return true;
      if (s.includes('mongo') && t.includes('mongodb')) return true;
      if (s.includes('postgresql') && t.includes('postgresql')) return true;
      if (s.includes('claude') && t.includes('claude')) return true;
      return false;
    });

    if (hasMatch && !matchedProjects.includes(proj.name)) {
      matchedProjects.push(proj.name);
    }
  });

  return matchedProjects;
};

export const SkillsToolkit: React.FC = () => {
  return (
    <section
      id="skills"
      className="w-full bg-paper section-wrapper"
    >
      <div className="content-container flex flex-col gap-8 sm:gap-10">
        {/* Header Label & Intro */}
        <div className="flex flex-col items-start max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#0B5D3B]">
              SKILLS & TOOLKIT
            </span>
            <span className="w-8 h-[1.5px] bg-[#0B5D3B]" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ink tracking-tight leading-[1.08] font-normal">
            Core Technical{' '}
            <span className="italic text-[#0B5D3B]">Toolkit.</span>
          </h2>

          <div className="w-12 h-[2px] bg-[#0B5D3B] my-5" />

          <p className="font-sans text-sm sm:text-base text-ink-muted leading-relaxed">
            Technologies and frameworks utilized across real-world systems, verifiable test suites, and academic research. Grouped by architectural domain.
          </p>
        </div>

        {/* 3 Categories Grid: Frontend, Backend, Data & AI */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {content.skillsCategories.map((catGroup) => (
            <div
              key={catGroup.category}
              className="bg-[#EFECE6] border border-[rgba(0,0,0,0.12)] p-6 sm:p-7 rounded-2xl flex flex-col justify-start shadow-subtle h-full"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[rgba(0,0,0,0.12)] mb-5">
                <h3 className="font-anton text-2xl text-ink uppercase tracking-wide">
                  {catGroup.category}
                </h3>
                <span className="text-[10px] font-sans uppercase tracking-wider text-[#0B5D3B] font-semibold">
                  DOMAIN // {catGroup.category.toUpperCase()}
                </span>
              </div>

              {/* Skills as Tags/Chips with optional "Used in:" line */}
              <div className="flex flex-col gap-2.5">
                {catGroup.skills.map((skill) => {
                  const usedProjects = getProjectsUsingSkill(skill.name, content.projects);
                  return (
                    <div
                      key={skill.name}
                      className="p-3 sm:p-3.5 bg-paper rounded-xl border border-[rgba(0,0,0,0.08)] flex flex-col gap-1 transition-colors hover:border-[#0B5D3B]/40"
                    >
                      <div className="flex items-center gap-2.5">
                        {getSkillIcon(skill.name)}
                        <span className="font-sans font-medium text-xs sm:text-sm text-ink">
                          {skill.name}
                        </span>
                      </div>
                      {usedProjects.length > 0 && (
                        <span className="font-mono text-[10.5px] text-[#0B5D3B] font-medium pl-6 leading-tight">
                          Used in: {usedProjects.join(', ')}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsToolkit;
