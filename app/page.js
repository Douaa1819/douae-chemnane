import { Suspense } from 'react';
import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import Loading from './loading';

async function getData() {
  const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`)
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
        <AboutSection />
        <Experience />
        <Skills />
        <Projects />
        <Blog blogs={blogs} />
        <ContactSection />
      </Suspense>
    </main>
  )
}