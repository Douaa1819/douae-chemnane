import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import ContactSection from "./components/homepage/contact";
import Skills from "./components/homepage/skills";
import Projects from "./components/homepage/projects";

// Create a Loading component inline to avoid circular dependencies
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-violet-500"></div>
  </div>
);

// Dynamically import components with client-side features
const HeroSection = dynamic(
  () => import("./components/homepage/hero-section"),
  { loading: () => <LoadingSpinner />, ssr: false }
);

const Experience = dynamic(
  () => import("./components/homepage/experience"),
  { loading: () => <LoadingSpinner />, ssr: false }
);

const Blog = dynamic(
  () => import("./components/homepage/blog"),
  { loading: () => <LoadingSpinner />, ssr: false }
);

async function getData() {
  const res = await fetch(
    `https://dev.to/api/articles?username=${personalData.devUsername}`,
    { cache: 'no-store' }
  );
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  const data = await res.json();
  return data.filter((item) => item?.cover_image).sort(() => Math.random() - 0.5);
}

export default async function Home() {
  const blogs = await getData();

  return (
    <main>
      <Suspense fallback={<LoadingSpinner />}>
        <HeroSection />
      </Suspense>
      <AboutSection />
      <Suspense fallback={<LoadingSpinner />}>
        <Experience />
      </Suspense>
      <Skills />
      <Projects />
      <Suspense fallback={<LoadingSpinner />}>
        <Blog blogs={blogs} />
      </Suspense>
      <ContactSection />
    </main>
  );
}