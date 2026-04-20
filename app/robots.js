function baseUrl() {
  const raw = process.env.NEXT_PUBLIC_APP_URL;
  if (!raw) {
    return new URL("http://localhost:3000");
  }
  try {
    return new URL(raw.startsWith("http") ? raw : `https://${raw}`);
  } catch {
    return new URL("http://localhost:3000");
  }
}

export default function robots() {
  const origin = baseUrl();
  const root = origin.toString().replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${root}/sitemap.xml`,
  };
}
