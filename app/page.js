import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { personalData } from "@/utils/data/personal-data";

// Server Components
import AboutSection from "./components/homepage/about";
import ContactSection from "./components/homepage/contact";
import Skills from "./components/homepage/skills";
import Projects from "./components/homepage/projects";

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-violet-500"></div>
  </div>
);

// Client Components with proper Next.js dynamic import
const HeroSection = dynamic(() => import('./components/homepage/hero-section'), {
  loading: () => <Loading />,
  ssr: false
});

const Experience = dynamic(() => import('./components/homepage/experience'), {
  loading: () => <Loading />,
  ssr: false
});

const BlogSection = dynamic(() => import('./components/homepage/blog'), {
  loading: () => <Loading />,
  ssr: false
});

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
        <HeroSection />
      </Suspense>
      <AboutSection />
      <Suspense fallback={<Loading />}>
        <Experience />
      </Suspense>
      <Skills />
      <Projects />
      <Suspense fallback={<Loading />}>
        <BlogSection blogs={blogs} />
      </Suspense>
      <ContactSection />
    </main>
  );
}