export type Theme = "light" | "dark";

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
}

export type ServiceIcon = "laptop" | "mobile" | "server";

export interface Service {
  icon: ServiceIcon;
  title: string;
  description: string;
}

export interface TimelineItem {
  period: string;
  title: string;
  subtitle: string;
}

export interface Skill {
  name: string;
  image: string;
  width: number;
  height: number;
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
  subject: string;
  message: string;
}

export interface Web3FormsResponse {
  success: boolean;
  message?: string;
}

export type TimelineType = "education" | "work";
