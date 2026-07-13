import type {
  Project,
  Service,
  Skill,
  SocialLink,
  TimelineItem,
} from "@/types/portfolio";

export const siteConfig = {
  name: "Mahdi Feriani",
  title: "Mahdi Feriani | Full-Stack Software Engineer",
  description:
    "Full-Stack Software Engineer with 3+ years of experience building scalable web and mobile applications with TypeScript, Vue.js, React, React Native, and NestJS.",
  url: "https://mahdiferiani.netlify.app",
  email: "mahdiferiani@proton.me",
  phone: "(+216) 22 890 202",
  location: "Sfax, Tunisia",
} as const;

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mahdi-feriani/",
    icon: "linkedin",
  },
  {
    label: "GitHub",
    href: "https://github.com/Mahdiferiani",
    icon: "github",
  }
];

export const navLinks = [
  { label: "Who am I", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

export const heroContent = {
  greeting: "Welcome!",
  roles: ["Full-Stack Engineer", "Software Engineer", "Mobile Developer"],
  bio: "Full-Stack Software Engineer with 3+ years of experience building scalable web and mobile applications.",
  image: "/images/header/me.png",
} as const;

export const aboutContent = {
  title: "Hello, I Am Mahdi Feriani",
  bio: "Full-Stack Software Engineer with 3+ years of experience building scalable web and mobile applications using TypeScript,Vue.js, React, React Native, and NestJS. Delivered production systems serving 10,000+ users, published mobile applications to the Apple App Store and Google Play Store, and improved deployment efficiency with Docker. Passionate about building reliable software and solving complex engineering problems in Agile teams.",
  image:
    "https://res.cloudinary.com/ds5eqdcxk/image/upload/v1661893169/3dchar_cfepdx.png",
  details: [
    { label: "Name", value: "Mahdi Feriani" },
    { label: "Location", value: "Sfax, Tunisia" },
    { label: "Phone", value: "(+216) 22 890 202" },
    { label: "Email", value: "mahdiferiani@proton.me" },
    { label: "Experience", value: "3+ Years" },
  ],
  cvUrl: "/cv/Mahdi-Feriani-Resume.pdf",
} as const;

export const skills: Skill[] = [
  { name: "React", image: "/images/skills/react.png", width: 120, height: 80 },
  { name: "Next.js", image: "/images/skills/next.png", width: 120, height: 80 },
  {
    name: "MongoDB",
    image: "/images/skills/mongo.png",
    width: 200,
    height: 80,
  },
  { name: "Node.js", image: "/images/skills/node.png", width: 150, height: 80 },
  { name: "NestJS", image: "/images/skills/nest.png", width: 150, height: 80 },
];

export const services: Service[] = [
  {
    icon: "laptop",
    title: "Full-Stack Development",
    description:
      "Designing and developing scalable web applications using React, Vue.js, Next.js, and NestJS. Experienced in building RESTful APIs, authentication systems, dynamic dashboards, and responsive user interfaces for production environments.",
  },
  {
    icon: "mobile",
    title: "Mobile Development",
    description:
      "Building cross-platform mobile applications with React Native and Flutter, from Figma designs to production deployment on the Apple App Store and Google Play Store.",
  },
  {
    icon: "server",
    title: "Backend & DevOps",
    description:
      "Developing secure backend services with NestJS, PostgreSQL, and MongoDB, while streamlining development and deployment using Docker, GitLab CI/CD, and cloud services.",
  },
];

export const education: TimelineItem[] = [
  {
    period: "2019 – 2021",
    title: "Computer Engineering",
    subtitle: "Polytechnique IPSAS, Sfax, Tunisia",
  },
  {
    period: "2016 – 2019",
    title: "Bachelor's Degree in Computer Science",
    subtitle: "ISIMA, Mahdia, Tunisia",
  },
  {
    period: "2014 – 2016",
    title: "High School",
    subtitle: "Mongi Slim School Secondary",
  },
];

export const workExperience: TimelineItem[] = [
  {
    period: "July 2022 – Present",
    title: "Full-Stack Engineer — Tekab Dev",
    subtitle:
      "Developed and maintained enterprise web and mobile applications using Vue.js, NestJS, and React Native, contributing to a platform serving 10,000+ users. Built RESTful APIs, responsive user interfaces, reusable SurveyJS components, and optimized deployment workflows with Docker.",
  },
  {
    period: "2021 – 2022",
    title: "Freelance Full-Stack Developer",
    subtitle:
      "Designed and delivered custom full-stack web applications using the MERN stack, managing the complete development lifecycle from client requirements and system architecture to deployment and post-launch support.",
  },
];

export const projects: Project[] = [
  {
    title: "Msafer",
    slug: "msafer",
    subtitle: "Collaborative Delivery Mobile Application",
    company: "WeOps",
    location: "Paris, France",
    description:
      "Production Flutter app with 5,000+ Google Play downloads. AWS Lambda automation, Firebase auth, and Figma-to-mobile UI implementation.",
    image: "/images/projects/msafer-icon.webp",
    imageStyle: "iconBackground",
    demoUrl:
      "https://play.google.com/store/apps/details?id=com.weops.msefer&hl=en",
    linkLabel: "View on Play Store",
    highlights: [
      "Developed production-ready Flutter interfaces from Figma designs for Android and iOS, contributing to an application with 5,000+ Google Play downloads.",
      "Automated user provisioning using AWS Lambda, eliminating manual onboarding processes.",
      "Integrated Firebase backend services and authentication.",
    ],
    gallery: [
      "/images/projects/msafer/screenshot-1.webp",
      "/images/projects/msafer/screenshot-2.webp",
      "/images/projects/msafer/screenshot-3.webp",
      "/images/projects/msafer/screenshot-4.webp"
    ],
  },
  {
    title: "Enterprise Platform",
    subtitle: "Tekab Dev — Vue.js & NestJS",
    description:
      "Enterprise web platform serving 10,000+ users with RESTful APIs, authentication, SurveyJS dynamic forms, and multilingual workflows.",
    image: "/images/projects/placeholder.svg",
    demoUrl: null,
  },
  {
    title: "Ilias Shop",
    slug: "ilias-shop",
    subtitle: "E-commerce Website — Freelance",
    company: "Ilias Shop",
    location: "Sfax, Tunisia",
    description:
      "Full-stack MERN e-commerce platform for a children's clothing store, with responsive React UI, JWT authentication, and end-to-end freelance delivery.",
    image: "/images/projects/ilias.webp",
    demoUrl: "https://inspiring-joliot-f65422.netlify.app/",
    linkLabel: "View Live Demo",
    galleryAspectRatio: "16 / 10",
    galleryMaxWidth: "560px",
    highlights: [
      "Designed and developed custom web applications using the MERN stack.",
      "Led the complete software development lifecycle for freelance projects, from client requirements and architecture design to deployment and post-launch support.",
      "Implemented responsive React interfaces and secure JWT authentication, improving application security and user experience across client projects.",
      "Managed the end-to-end delivery of freelance projects, coordinating planning, development, testing, deployment, and client handover to ensure on-time delivery.",
    ],
  },
];
