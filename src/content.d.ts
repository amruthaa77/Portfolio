export interface ProjectMockupData {
  url: string;
  badge: string;
  stat: string;
  previewTitle: string;
  previewCode: string;
}

export interface ProjectItem {
  id: string;
  number: string;
  name: string;
  category: string;
  description: string;
  outcome: string;
  tags: string[];
  image: string;
  mockupType: string;
  mockupData: ProjectMockupData;
  liveUrl?: string | null;
  githubUrl?: string | null;
}

export interface SkillItem {
  name: string;
  percentage?: number;
}

export interface SkillCategoryGroup {
  category: string;
  skills: SkillItem[];
}

export interface StatItem {
  value: string;
  unit: string;
  label: string;
  sublabel: string;
}

export interface ExperienceHighlight {
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
}

export interface ContentData {
  personal: {
    name: string;
    fullName: string;
    role: string;
    tagline: string;
    intro: string;
    email: string;
    github: string;
    githubLabel?: string;
    githubUsername: string;
    linkedin: string;
    linkedinLabel?: string;
    linkedinUsername: string;
    location: string;
    resumeUrl: string;
    portfolioYear: string;
  };
  nav: { label: string; href: string }[];
  about: {
    label: string;
    heading: string;
    bio: string[];
    highlights: { number: string; title: string; detail: string }[];
  };
  projects: ProjectItem[];
  skillsCategories: SkillCategoryGroup[];
  impact: {
    stats: StatItem[];
    quote: {
      text: string;
      author: string;
      title: string;
    };
  };
  experienceHighlights: ExperienceHighlight[];
  contact: {
    label: string;
    heading: string;
    description: string;
    email: string;
    github: string;
    githubLabel: string;
    linkedin: string;
    linkedinLabel: string;
    location: string;
    ctaText: string;
    ctaHeading?: string;
    ctaDescription?: string;
  };
  footer: {
    copyright: string;
    credit: string;
  };
}

export const content: ContentData;
export default content;
