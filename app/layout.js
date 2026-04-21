import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JsonLd from "./components/seo/json-ld";
import "./css/globals.scss";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

function getMetadataBase() {
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

const titleDefault = "Douaa Chemnane | Full Stack Engineer";
const description =
  "Full Stack Developer focused on backend systems, AI automation, and scalable architecture. Spring Boot, React, Node.js, n8n, and production-grade delivery.";

export const metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: titleDefault,
    template: "%s | Douaa Chemnane",
  },
  description,
  keywords: [
    "Douaa Chemnane",
    "Full Stack Developer",
    "Backend",
    "AI Automation",
    "Spring Boot",
    "Next.js",
    "System Design",
  ],
  authors: [{ name: "Douaa Chemnane" }],
  creator: "Douaa Chemnane",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_FR"],
    url: "/",
    siteName: "Douaa Chemnane",
    title: titleDefault,
    description,
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Douaa Chemnane",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description,
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  category: "technology",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafbfc" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <JsonLd />
        {children}
        <ToastContainer theme="colored" position="bottom-right" />
      </body>
    </html>
  );
}
