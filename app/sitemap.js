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

export default function sitemap() {
  const base = baseUrl();
  return [
    {
      url: base.toString().replace(/\/$/, "") + "/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
