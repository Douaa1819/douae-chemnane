import { portfolioContent } from "@/utils/data/portfolio-content";

function siteUrlString() {
  const raw = process.env.NEXT_PUBLIC_APP_URL;
  if (!raw) return undefined;
  try {
    return new URL(raw.startsWith("http") ? raw : `https://${raw}`).origin;
  } catch {
    return undefined;
  }
}

export default function JsonLd() {
  const p = portfolioContent.personal;
  const origin = siteUrlString();

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.name,
    jobTitle: p.roleLine.split("|")[0]?.trim() || "Software Developer",
    email: p.email,
    ...(origin ? { url: origin, image: `${origin}/profile.jpg` } : {}),
    sameAs: [p.linkedIn, p.github].filter(Boolean),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Marrakesh",
      addressCountry: "MA",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
