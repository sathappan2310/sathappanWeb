import type { LucideIcon } from "lucide-react";

export type IconName =
  | "Zap"
  | "Palette"
  | "Rocket"
  | "Star"
  | "Smile"
  | "Mail"
  | "Phone"
  | "Linkedin"
  | "Github"
  | "ArrowUpRight"
  | "Moon"
  | "Sun"
  | "Menu"
  | "X"
  | "Download"
  | "MapPin"
  | "GraduationCap"
  | "Award";

export interface Stat {
  value: string;
  label: string;
}

export interface Highlight {
  icon: IconName;
  title: string;
  desc: string;
}

export interface Profile {
  name: string;
  shortName: string;
  role: string;
  tagline: string;
  summary: string;
  bio: string[];
  available: boolean;
  location: string;
  email: string;
  phone: string;
  links: {
    linkedin: string;
    github: string;
    resume: string;
  };
  stats: Stat[];
  highlights: Highlight[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface Project {
  slug: string;
  name: string;
  codename: string;
  description: string;
  tags: string[];
  href: string;
  featured?: boolean;
  internal?: boolean;
}

export interface EducationItem {
  degree: string;
  school: string;
  meta: string;
}

export interface AwardItem {
  icon: IconName;
  title: string;
  desc: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export type LucideIconType = LucideIcon;
