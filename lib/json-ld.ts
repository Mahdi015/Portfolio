import {
  education,
  heroContent,
  siteConfig,
  socialLinks,
  workExperience,
} from "@/data/portfolio";

/**
 * Structured data for the site.
 *
 * The homepage has to win a query that is a person's name, and for that Google
 * is not matching strings so much as deciding whether there is an entity
 * behind them. What makes that case is corroboration: the schools, the
 * employer, the skills and the off-site profiles, all stated here and all
 * verifiable against the pages they point at. `sameAs` is the load-bearing
 * part — it is the claim that the person on this site is the person on those
 * profiles, which is what lets the three reinforce each other instead of
 * competing as three unrelated pages about similarly-named people.
 */
export function getPersonJsonLd() {
  const linkedIn = socialLinks.find((link) => link.icon === "linkedin")?.href;
  const github = socialLinks.find((link) => link.icon === "github")?.href;

  /** The current role, which is the one `worksFor` should name. */
  const current = workExperience[0];

  /** Schools, most recent first — the data is already in that order. */
  const alumniOf = education.map((item) => ({
    "@type": "EducationalOrganization" as const,
    name: item.school,
  }));

  /**
   * Deduplicated across every role's stack. These are the terms someone
   * actually searches alongside the name ("Mahdi Feriani NestJS"), and the
   * stack lists are already maintained per role, so deriving them here keeps
   * the schema from becoming a second copy that drifts.
   */
  const knowsAbout = Array.from(
    new Set(workExperience.flatMap((job) => job.stack)),
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { "@id": `${siteConfig.url}/#person` },
        inLanguage: "en-US",
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: siteConfig.name,
        givenName: "Mahdi",
        familyName: "Feriani",
        url: siteConfig.url,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        image: `${siteConfig.url}/og-image.jpg`,
        jobTitle: "Full-Stack Software Engineer",
        description: heroContent.bio,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Sfax",
          addressCountry: "TN",
        },
        ...(current
          ? {
              worksFor: {
                "@type": "Organization",
                name: current.company,
              },
            }
          : {}),
        alumniOf,
        knowsAbout,
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
        mainEntity: { "@id": `${siteConfig.url}/#person` },
        inLanguage: "en-US",
      },
    ],
  };
}
