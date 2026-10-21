export type SocialIcon =
  | "linkedin"
  | "github"
  | "globe"
  | "facebook"
  | "instagram"
  | "twitter";

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIcon;
}

export interface DetailItem {
  label: string;
  value: string;
  /** Makes the value actionable — a mailto: or tel: target. */
  href?: string;
}

/** A working principle in the about block: short claim, evidenced follow-up. */
export interface Principle {
  title: string;
  description: string;
}

/**
 * One role in the work timeline.
 *
 * Replaces the old TimelineItem, whose single `subtitle` paragraph could only
 * hold a flattened version of what the CV actually says. Highlights and stack
 * are separate fields because they are rendered as separate things.
 */
export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  /** Omitted where the CV does not state one. */
  location?: string;
  /** One line framing the role, read before the bullets. */
  summary: string;
  /** The CV's bullets, verbatim. */
  highlights: string[];
  /** Rendered as chips; order is roughly language → framework → infra. */
  stack: string[];
}

/** Education reads as a record, not a timeline — school, award, dates. */
export interface EducationItem {
  school: string;
  degree: string;
  period: string;
  location?: string;
}

/**
 * Keys into the icon map in Skills.tsx. The data layer names an icon rather
 * than importing one, the same way SocialIcon already does —
 * it keeps the portfolio data free of component references.
 */
export type StackIcon =
  | "typescript"
  | "javascript"
  | "html5"
  | "css"
  | "react"
  | "vue"
  | "nextjs"
  | "tailwind"
  | "reactnative"
  | "flutter"
  | "dart"
  | "firebase"
  | "nestjs"
  | "node"
  | "express"
  | "zod"
  | "postgresql"
  | "mongodb"
  | "prisma"
  | "cloudinary"
  | "docker"
  | "gitlab"
  | "aws"
  | "vercel";

export interface StackTech {
  name: string;
  icon: StackIcon;
  /** The keycap's moulded colour. Its skirt is derived from this in CSS. */
  color: string;
  /**
   * The legend colour printed on the cap. Defaults to white, which is right
   * for most brands; the few pale caps (JavaScript, Firebase, AWS) override it
   * because a white mark on yellow is a mark nobody can read.
   */
  ink?: string;
}

/**
 * One face of the stack cube. Exactly four items per face and exactly six
 * faces — the geometry is fixed, so the data has to be too.
 */
export interface StackFace {
  id: string;
  label: string;
  items: StackTech[];
}

/** One segment of a masked hero line; `accent` colours the phrase. */
export interface HeroLineSegment {
  text: string;
  accent?: boolean;
}

export interface HeroStat {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export interface Project {
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  demoUrl: string | null;
  imageStyle?: "default" | "iconBackground";
  linkLabel?: string;
  slug?: string;
  company?: string;
  location?: string;
  highlights?: string[];
  quickStart?: {
    steps: string[];
    commands?: string[];
    note?: string;
  };
  gallery?: string[];
  galleryAspectRatio?: string;
  galleryMaxWidth?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  /** Optional — plenty of enquiries are from individuals. */
  company: string;
  /** Which of the two things he is open to, so the reply can match. */
  enquiry: string;
  timeline: string;
  message: string;
}

/** A labelled choice in one of the contact form's two selects. */
export interface ContactOption {
  value: string;
  label: string;
}

export interface Web3FormsResponse {
  success: boolean;
  message?: string;
}

