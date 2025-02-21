import { Suspense } from 'react';
import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import ContactSection from "./components/homepage/contact";
import Skills from "./components/homepage/skills";
import Projects from "./components/homepage/projects";
import { ClientWrapper } from './components/client-wrapper';

// Import client components directly
import HeroSection from "./components/homepage/hero-section";
import Experience from "./components/homepage/experience";
import Blog from "./components/homepage/blog";

async function getData() {
  try {
    const res = await fetch(
      `https://dev.to/api/articles?username=${personalData.devUsername}`,
      { 
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const data = await res.json();
    return data.filter((item) => item?.cover_image).sort(() => Math.random() - 0.5);
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return [];
  }
}

export default async function Home() {
  const blogs = await getData();

  return (
    <main>
      <ClientWrapper>
        <HeroSection />
      </ClientWrapper>
      
      <AboutSection />
      
      <ClientWrapper>
        <Experience />
      </ClientWrapper>
      
      <Skills />
      <Projects />
      
      <ClientWrapper>
        <Blog blogs={blogs} />
      </ClientWrapper>
      
      <ContactSection />
    </main>
  );
}