import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { personalData } from "@/utils/data/personal-data";
import Loading from './loading';

// Dynamically import components with client-side features
const HeroSection = dynamic(() => import("./components/homepage/hero-section"), {
  loading: () => <Loading />,
  ssr: false
});

const Experience = dynamic(() => import("./components/homepage/experience"), {
  loading: () => <Loading />,
  ssr: false
});

const Blog = dynamic(() => import("./components/homepage/blog"), {
  loading: () => <Loading />,
  ssr: false
});

// Import other components normally
import AboutSection from "./components/homepage/about";
import ContactSection from "./components/homepage/contact";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";

async function getData() {
  const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await res.json();
  return data.filter((item) => item?.cover_image).sort(() => Math.random() - 0.5);
}

export default async function Home() {
  const blogs = await getData();

  return (
    <main>
      <Suspense fallback={<Loading />}>
        <HeroSection />
      </Suspense>
      <AboutSection />
      <Suspense fallback={<Loading />}>
        <Experience />
      </Suspense>
      <Skills />
      <Projects />
      <Suspense fallback={<Loading />}>
        <Blog blogs={blogs} />
      </Suspense>
      <ContactSection />
    </main>
  );
}