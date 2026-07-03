import type {
  AwardItem,
  EducationItem,
  ExperienceItem,
  NavLink,
  Profile,
  Project,
  SkillGroup,
} from "./types";

export const profile: Profile = {
  name: "Sathappan S",
  shortName: "Sathappan",
  role: "Software Engineer",
  tagline: "I craft scalable web experiences.",
  summary:
    "Software Engineer with 4+ years building production-grade SaaS, dashboards & AI-powered apps using React, Next.js, TypeScript and modern state libraries.",
  bio: [
    "I'm a frontend-leaning full-stack engineer with 4+ years of hands-on experience designing and shipping React & Next.js applications at scale. From AI-powered learning platforms to enterprise logistics dashboards, I focus on clean architecture, smooth UX, and measurable performance gains.",
    "I love turning complex problems into elegant interfaces — and mentoring others while I do it.",
  ],
  available: true,
  location: "India",
  email: "Sathappan2310@gmail.com",
  phone: "+91 94441 35243",
  links: {
    linkedin: "https://linkedin.com/in/sathappan2310",
    github: "https://github.com/sathappan2310",
    resume: "/resume.pdf",
  },
  stats: [
    { value: "4+", label: "Years of Experience" },
    { value: "5+", label: "Projects Worked In" },
    { value: "3", label: "Awards Received" },
  ],
  highlights: [
    {
      icon: "Zap",
      title: "Performance-First",
      desc: "Optimized SaaS dashboards handling thousands of records with smooth UX.",
    },
    {
      icon: "Palette",
      title: "Design-Minded",
      desc: "Pixel-perfect implementations from Figma using MUI, Tailwind & custom systems.",
    },
    {
      icon: "Rocket",
      title: "Ship Fast",
      desc: "Agile delivery with Azure DevOps CI/CD; ownership end-to-end.",
    },
  ],
};

export const skills: SkillGroup[] = [
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5 / CSS3"],
  },
  {
    category: "UI & Styling",
    items: ["Material UI", "Tailwind CSS", "Styled Components", "Responsive Design"],
  },
  {
    category: "State Management",
    items: ["Redux Toolkit", "Recoil", "Zustand", "React Query", "Context API"],
  },
  {
    category: "Backend & DevOps",
    items: ["Node.js", "REST APIs", "Azure DevOps", "Git / GitHub", "CI/CD"],
  },
];

export const experience: ExperienceItem[] = [
  {
    role: "Software Engineer",
    company: "Logic Valley Technologies",
    period: "Dec 2024 — Present",
    bullets: [
      "Building scalable React & Next.js applications with TypeScript for enterprise SaaS products.",
      "Designing reusable component libraries and optimizing performance for high-traffic interfaces.",
      "Collaborating cross-functionally on architecture, code reviews, and CI/CD via Azure DevOps.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Amphisoft Ventures",
    period: "Jun 2022 — Dec 2024",
    bullets: [
      "Developed Freckled — an AI-powered soft-skills learning platform with interactive React modules.",
      "Engineered Ebox logistics dashboard handling real-time shipment data with Recoil & MUI.",
      "Mentored juniors and championed best practices in code quality and testing.",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Amphisoft Ventures",
    period: "Nov 2021 — Jun 2022",
    bullets: [
      "Built UI components and learned production workflows with React.js and modern tooling.",
      "Contributed to live client features under senior engineering mentorship.",
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "skillnest",
    name: "SkillNest",
    codename: "SKILLNEST",
    description:
      "A premium, frontend-only interview preparation platform with 200+ curated questions, syntax-highlighted code, visual roadmaps, and instant search across 25+ technologies — dark mode, fully responsive, and built into this site.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    href: "/skillnest",
    featured: true,
    internal: true,
  },
  {
    slug: "freckled-ai",
    name: "Freckled AI",
    codename: "FRECKLED",
    description:
      "AI-powered soft-skills learning platform with interactive modules, real-time feedback, and adaptive content delivery for personalised learning paths.",
    tags: ["React.js", "Next.js", "Recoil", "AI Integration"],
    href: "#",
  },
  {
    slug: "ebox-dashboard",
    name: "Ebox Dashboard",
    codename: "EBOX",
    description:
      "Enterprise logistics dashboard handling real-time shipment tracking, analytics & reporting — built with MUI, Recoil, and optimized data tables.",
    tags: ["React.js", "TypeScript", "MUI", "Recoil"],
    href: "#",
  },
];

export const education: EducationItem[] = [
  {
    degree: "B.E. Mechanical Engineering",
    school: "Sri Ramakrishna Engineering College",
    meta: "CGPA 8.0",
  },
];

export const awards: AwardItem[] = [
  {
    icon: "Star",
    title: "Star Performer",
    desc: "Recognized for outstanding contribution & delivery",
  },
  {
    icon: "Smile",
    title: "Mr. Calm & Punctual",
    desc: "Team award for reliability & composure",
  },
];

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
