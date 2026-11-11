export interface ProjectArchitectureNode {
  label: string;
  sublabel?: string;
  type?: 'client' | 'gateway' | 'service' | 'db' | 'event' | 'ai';
}

export interface ProjectArchitectureDiagram {
  title: string;
  description: string;
  steps: {
    number: number;
    title: string;
    detail: string;
    badge?: string;
  }[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  period?: string;
  stack: string[];
  problem: string;
  built: string[];
  keyDecisions: {
    decision: string;
    rationale: string;
    metricOrOutcome?: string;
  }[];
  concurrencyOrTestMetric?: string;
  architecture: ProjectArchitectureDiagram;
  liveUrl?: string; // If undefined or 'TODO', handled gracefully
  githubUrl?: string; // If undefined or 'TODO', handled gracefully
  featured: boolean;
  accentColor?: string;
}

export interface StatMetric {
  value: string;
  label: string;
  description: string;
  highlight?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  skills: string[];
  bullets: string[];
  focusArea?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  badge: string;
  description: string;
  paperTitle?: string;
  highlight?: boolean;
}

export interface SkillCategory {
  category: string;
  description?: string;
  skills: {
    name: string;
    featured?: boolean;
  }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location?: string;
  period: string;
  gradeOrFocus?: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  scoreOrDetail?: string;
  badge?: string;
}

export interface ContactInfo {
  name: string;
  location: string;
  email: string;
  phoneHidden: string;
  github: string;
  linkedin: string;
  formspreeEndpoint: string;
}

export interface SiteContent {
  personal: {
    name: string;
    taglines: string[];
    pitch: string;
    statusPill: string;
    bioParagraph: string;
    resumePdfPath: string;
  };
  contact: ContactInfo;
  stats: StatMetric[];
  projects: Project[];
  experience: ExperienceItem[];
  achievements: AchievementItem[];
  skills: SkillCategory[];
  education: EducationItem[];
  certifications: CertificationItem[];
}
