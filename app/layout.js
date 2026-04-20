import { Plus_Jakarta_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JsonLd from "./components/seo/json-ld";
import "./css/globals.scss";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap" });

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

const titleDefault = "Douaa Chemnane | Full Stack Developer Portfolio";
const description =
  "Premium portfolio of Douaa Chemnane — Full Stack Developer and Automation Engineer. Spring Boot, Next.js, cloud, and scalable product engineering.";

export const metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: titleDefault,
    template: "%s | Douaa Chemnane",
  },
  description,
  keywords: [
    "Douaa Chemnane",
    "Portfolio",
    "Full Stack Developer",
    "Automation Engineer",
    "Next.js",
    "Spring Boot",
    "Marrakesh",
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
        alt: "Douaa Chemnane — portrait",
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
    { media: "(prefers-color-scheme: light)", color: "#f5f7ff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={plusJakarta.className}>
        <JsonLd />
        {children}
        <ToastContainer theme="colored" position="bottom-right" />
      </body>
    </html>
  );
}
