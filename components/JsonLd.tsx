import { getPersonJsonLd } from "@/lib/json-ld";

export default function JsonLd() {
  const jsonLd = getPersonJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
