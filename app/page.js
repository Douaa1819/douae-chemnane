import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { personalData } from "@/utils/data/personal-data";

// Server Components
import AboutSection from "./components/homepage/about";
import ContactSection from "./components/homepage/contact";
import Skills from "./components/homepage/skills";
import Projects from "./components/homepage/projects";

// Client Components with proper loading state
const ClientComponents = dynamic(
  () => import('./components/client-components'),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    )
  }
);

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
      <ClientComponents blogs={blogs} />
      <AboutSection />
      <Skills />
      <Projects />
      <ContactSection />
    </main>
  );
}