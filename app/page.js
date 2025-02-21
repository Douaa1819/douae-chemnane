import { Suspense } from 'react';
import { personalData } from "@/utils/data/personal-data";

// Server Components
import AboutSection from "./components/homepage/about";
import ContactSection from "./components/homepage/contact";
import Skills from "./components/homepage/skills";
import Projects from "./components/homepage/projects";

// Import dynamic components
import { 
  Loading,
  DynamicHeroSection,
  DynamicExperience,
  DynamicBlog 
} from './components/dynamic-components';

async function getData() {
  try {
    const res = await fetch(
      `https://dev.to/api/articles?username=${personalData.devUsername}`,
      { next: { revalidate: 3600 } } // Revalidate every hour
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
      <Suspense fallback={<Loading />}>
        <DynamicHeroSection />
      </Suspense>
      <AboutSection />
      <Suspense fallback={<Loading />}>
        <DynamicExperience />
      </Suspense>
      <Skills />
      <Projects />
      <Suspense fallback={<Loading />}>
        <DynamicBlog blogs={blogs} />
      </Suspense>
      <ContactSection />
    </main>
  );
}