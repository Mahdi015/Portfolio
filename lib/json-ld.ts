import { aboutContent, siteConfig, socialLinks } from "@/data/portfolio";

export function getPersonJsonLd() {
  const linkedIn = socialLinks.find((link) => link.icon === "linkedin")?.href;
  const github = socialLinks.find((link) => link.icon === "github")?.href;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "en-US",
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        jobTitle: "Full-Stack Software Engineer",
        description: aboutContent.bio,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Sfax",
          addressCountry: "TN",
        },
        sameAs: [linkedIn, github].filter(Boolean),
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteConfig.url}/#profile`,
        url: siteConfig.url,
        name: siteConfig.title,
        description: siteConfig.description,
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        about: { "@id": `${siteConfig.url}/#person` },
        inLanguage: "en-US",
      },
    ],
  };
}
