import type {
  DetailItem,
  ContactOption,
  EducationItem,
  ExperienceItem,
  HeroStat,
  Principle,
  Project,
  StackFace,
  SocialLink,
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
    href: "https://github.com/Mahdi015",
    icon: "github",
  }
];

/**
 * The rail, in the order the page actually reads. Every entry has to resolve
 * to a section rendered by `app/page.tsx` — the bar's scroll-spy matches on
 * these hrefs, so a link to a section that isn't there is a dead item that
 * never lights up, and a section with no link is one the bar pretends isn't
 * on the page. Add a section, add it here; the labels are the section's own
 * headings so the bar and the page say the same words.
 */
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

/**
 * The outlined pill on the right of the bar. It lands on the same section as
 * the rail's Contact link by design — the link is the way through the page,
 * this is the ask — so the rail item is the one that carries the active state.
 */
export const navCta = { label: "Get in touch", href: "#contact" } as const;

export const heroContent = {
  role: "Full-Stack Software Engineer",
  location: "Sfax, Tunisia",
  status: "Open to work",
  year: "2026",
  bioLead: "Three years, one standard.",
  bio: "I'm a full-stack engineer based in Sfax, Tunisia, building web and mobile products end to end — TypeScript across Vue, React, React Native, Next and NestJS. Enterprise platforms at Tekab Dev, published mobile apps with WeOps, and freelance MERN delivery before that.",
  bioSecondary:
    "Every project is an exercise in restraint — cutting everything that doesn't serve the product until what's left is clear, fast, and still readable the day someone else has to change it.",
  cvUrl: "/cv/Mahdi-Feriani-Resume.pdf",
  /**
   * Swap for the generated 3D character (transparent PNG, centred, headroom
   * at the top — the hero crops it at the bottom edge).
   */
  character: "/images/header/me-3d.png",
} as const;

/** The three pills flanking the hero title card. */
export const heroTags = ["TypeScript", "React Native", "NestJS"] as const;

/** Two figures only — the CV's other numbers are carried by `principles`. */
export const heroStats: HeroStat[] = [
  { value: 3, suffix: "+", label: "Years shipping" },
  { value: 10, suffix: "+", label: "Projects shipped" },
];

/** The contact block, folded in from the retired standalone About section. */
export const heroDetails: DetailItem[] = [
  { label: "Location", value: siteConfig.location },
  {
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/[ ()]/g, "")}`,
  },
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
];

/** How the work gets done — each one backed by something that actually shipped. */
export const principles: Principle[] = [
  {
    title: "Clean Architecture",
    description:
      "Modular NestJS services behind component-driven frontends, with types shared end to end so an API change can't quietly break a screen.",
  },
  {
    title: "Performance First",
    description:
      "Measured loads and lean bundles, Dockerised builds and CI that ships — deployment time cut by 20% on a platform serving 10,000+ users.",
  },
  {
    title: "Design to Production",
    description:
      "Figma to the App Store. Pixel-accurate React Native and Flutter interfaces, published and maintained past 5,000 downloads.",
  },
];

/**
 * The six faces of the stack cube, in the order the scroll visits them:
 * front, right, back, left, top, bottom.
 *
 * Four items per face, six faces — the cube's geometry is not negotiable, so
 * adding a technology means replacing one rather than appending. Every entry
 * here is something that shipped in `workExperience` or `projects`; the cube
 * is a claim about the CV, not a wishlist.
 *
 * Colours are the moulded colour of each keycap, so they are the brand hex
 * rather than a legible-on-dark variant — the legend now sits below the cap
 * on the face, not on top of the cap, which frees the cap to be properly
 * on-brand. Brands that are black by definition (Next.js, Express, Vercel)
 * take the same charcoal the reference keyboards use. `ink` overrides the
 * default white mark on the few caps too pale to carry one.
 */
export const stackFaces: StackFace[] = [
  {
    id: "core",
    label: "Core",
    items: [
      { name: "TypeScript", icon: "typescript", color: "#3178C6" },
      { name: "JavaScript", icon: "javascript", color: "#F7DF1E", ink: "#16181D" },
      { name: "HTML5", icon: "html5", color: "#E34F26" },
      { name: "CSS", icon: "css", color: "#663399" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: [
      { name: "React", icon: "react", color: "#61DAFB", ink: "#0B2027" },
      { name: "Vue.js", icon: "vue", color: "#42B883" },
      { name: "Next.js", icon: "nextjs", color: "#23272F" },
      { name: "Tailwind", icon: "tailwind", color: "#06B6D4" },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    items: [
      { name: "React Native", icon: "reactnative", color: "#61DAFB", ink: "#0B2027" },
      { name: "Flutter", icon: "flutter", color: "#0553B1" },
      { name: "Dart", icon: "dart", color: "#0175C2" },
      { name: "Firebase", icon: "firebase", color: "#FFCA28", ink: "#16181D" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      { name: "NestJS", icon: "nestjs", color: "#E0234E" },
      { name: "Node.js", icon: "node", color: "#539E43" },
      { name: "Express", icon: "express", color: "#23272F" },
      { name: "Zod", icon: "zod", color: "#3E67B1" },
    ],
  },
  {
    id: "data",
    label: "Data",
    items: [
      { name: "PostgreSQL", icon: "postgresql", color: "#336791" },
      { name: "MongoDB", icon: "mongodb", color: "#47A248" },
      { name: "Prisma", icon: "prisma", color: "#2D3748" },
      { name: "Cloudinary", icon: "cloudinary", color: "#3448C5" },
    ],
  },
  {
    id: "ship",
    label: "Ship",
    items: [
      { name: "Docker", icon: "docker", color: "#2496ED" },
      { name: "GitLab CI", icon: "gitlab", color: "#FC6D26" },
      { name: "AWS", icon: "aws", color: "#FF9900", ink: "#16181D" },
      { name: "Vercel", icon: "vercel", color: "#23272F" },
    ],
  },
];

export const education: EducationItem[] = [
  {
    school: "Polytechnique IPSAS",
    degree: "Computer Engineering",
    period: "2022 — 2025",
    location: "Sfax, Tunisia",
  },
  {
    school: "ISIMA",
    degree: "Bachelor's Degree in Computer Science",
    period: "2019 — 2021",
    location: "Mahdia, Tunisia",
  },
  {
    school: "Mongi Slim Secondary School",
    degree: "High School Diploma",
    period: "2014 — 2018",
  },
];

/**
 * Work history, taken from the CV's PROFESSIONAL EXPERIENCE section.
 *
 * The highlights are the CV's own bullets rather than a paraphrase — this is
 * the page a recruiter cross-checks against the PDF, so the two should not
 * disagree. Msafer/WeOps is deliberately absent: the CV files it under
 * PROJECTS, not employment, and it already has a full entry in `projects`.
 */
export const workExperience: ExperienceItem[] = [
  {
    period: "July 2022 — Present",
    role: "Full-Stack Engineer",
    company: "Tekab Dev",
    location: "Tunisia",
    summary:
      "Enterprise web and mobile applications on a platform serving 10,000+ users, from API to App Store.",
    highlights: [
      "Developed and maintained enterprise web applications using Vue.js and NestJS, contributing to a platform serving 10,000+ users.",
      "Developed RESTful APIs, authentication systems, and backend integrations for enterprise applications.",
      "Built and deployed two cross-platform React Native applications to both the Apple App Store and Google Play Store.",
      "Translated Figma designs into responsive cross-platform interfaces, improving UI consistency.",
      "Built reusable SurveyJS components with conditional logic, validation, multilingual support, and dynamic workflows.",
      "Containerized development environments using Docker, reducing deployment time by approximately 20%.",
      "Collaborated within Agile teams through sprint planning, code reviews, and daily stand-ups to deliver production features.",
    ],
    stack: [
      "TypeScript",
      "Vue.js",
      "NestJS",
      "React Native",
      "PostgreSQL",
      "Docker",
      "GitLab CI/CD",
      "SurveyJS",
      "Figma",
    ],
  },
  {
    period: "2021 — 2022",
    role: "Freelance Full-Stack Developer",
    company: "Independent",
    summary:
      "End-to-end delivery of custom MERN applications for direct clients, from first requirement to handover.",
    highlights: [
      "Designed and developed custom web applications using the MERN stack.",
      "Led the complete software development lifecycle for freelance projects, from client requirements and architecture design to deployment and post-launch support.",
      "Implemented responsive React interfaces and secure JWT authentication, improving application security and user experience across client projects.",
      "Managed the end-to-end delivery of freelance projects, coordinating planning, development, testing, deployment, and client handover to ensure on-time delivery.",
    ],
    stack: [
      "JavaScript",
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
    ],
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
    title: "Adopti.tn",
    slug: "adopti",
    subtitle: "Pet Adoption Platform — Tunisia",
    company: "Personal Project",
    location: "Tunisia",
    description:
      "Full-stack pet adoption platform for Tunisia. Users post pets, admins moderate listings, adopters request homes, and chat unlocks after acceptance. Built with Next.js 15, NestJS, Prisma, and PostgreSQL in a Turborepo monorepo.",
    image: "/images/projects/adopti.png",
    demoUrl: "https://adopti-tn-ashy.vercel.app/",
    linkLabel: "View Live Demo",
    galleryAspectRatio: "16 / 9",
    galleryMaxWidth: "720px",
    /* Byte-identical to the cover above, so it points at the same file:
       two copies meant the same 356KB shipped twice and the image
       optimizer re-encoded it twice under two URLs. */
    gallery: ["/images/projects/adopti.png"],
    highlights: [
      "Built a Tunisia-focused pet adoption platform that replaces scattered social posts with a moderated workflow: list a pet, get admin approval, receive requests, then unlock chat once accepted.",
      "Shipped end-to-end product features including browse/filter, pet detail pages, listings management, favorites, adoption requests, profiles, and email verification / password reset auth.",
      "Implemented an admin dashboard for listing moderation (approve/decline), user/request management, and platform stats.",
      "Architected a TypeScript Turborepo monorepo with Next.js 15, NestJS 11, Prisma/PostgreSQL, Better Auth (httpOnly cookies), shared Zod contracts, Cloudinary media, and Resend email.",
    ],
  },
  {
    title: "FrameFind",
    slug: "framefind",
    subtitle: "AI B-Roll Asset Search",
    company: "Open Source",
    description:
      "Open-source AI tool that turns a video script into ranked B-roll photos and videos from stock libraries and optional social platforms.",
    image: "/images/projects/framefind.png",
    demoUrl: "https://github.com/Mahdi015/FrameFind",
    linkLabel: "View on GitHub",
    galleryAspectRatio: "16 / 9",
    galleryMaxWidth: "720px",
    /* Same file as the cover — see the note on Adopti above. */
    gallery: ["/images/projects/framefind.png"],
    highlights: [
      "Built a full-stack TypeScript monorepo with a Next.js frontend and NestJS API for script-to-visuals search.",
      "Used Gemini/Groq to split narration into scenes, generate visual keywords, and rank B-roll matches by relevance.",
      "Integrated a pluggable provider layer across 9 sources (stock libraries and optional social platforms) with rate limiting and quota-safe toggles.",
      "Added filters for media type, orientation, and duration so creators can find usable photos and videos faster in one workflow.",
    ],
    quickStart: {
      steps: [
        "Clone the repo and install dependencies (Node.js 20+).",
        "Copy the env examples, then add at least a Gemini or Groq key plus one stock API key (e.g. Pexels).",
        "Run the app, open the UI, paste a script, and hit Analyze script to get scenes + ranked B-roll.",
      ],
      commands: [
        "git clone https://github.com/Mahdi015/FrameFind.git",
        "cd FrameFind && npm install",
        "cp apps/backend/.env.example apps/backend/.env",
        "cp apps/frontend/.env.example apps/frontend/.env.local",
        "npm run dev",
      ],
      note: "Frontend: http://localhost:3000 · Backend: http://localhost:3001",
    },
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

/**
 * The contact section's copy and its two selects.
 *
 * The reference this section is modelled on asks for project type and budget,
 * which suits a pure freelancer. These two ask what actually helps here: the
 * hero says "open to full-time roles and freelance projects", and a budget
 * dropdown makes no sense on the first of those. Enquiry type and timeline
 * serve both, and tell him how to pitch the reply.
 */
export const contactContent = {
  heading: "Let's talk",
  lead: "Open to full-time roles and freelance projects. If you have something in mind — or just want to say hello — my inbox is always open.",
  note: "Typical reply time: under 24 hours.",
} as const;

export const enquiryOptions: ContactOption[] = [
  { value: "Full-time role", label: "Full-time role" },
  { value: "Freelance project", label: "Freelance project" },
  { value: "Contract / consulting", label: "Contract / consulting" },
  { value: "Just saying hello", label: "Just saying hello" },
];

export const timelineOptions: ContactOption[] = [
  { value: "Right away", label: "Right away" },
  { value: "Within a month", label: "Within a month" },
  { value: "One to three months", label: "One to three months" },
  { value: "Just exploring", label: "Just exploring" },
];
