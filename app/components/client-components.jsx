"use client"

import { Suspense, useEffect, useState } from 'react';
import HeroSection from "./homepage/hero-section";
import Experience from "./homepage/experience";
import Blog from "./homepage/blog";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-violet-500"></div>
    </div>
  );
}

export default function ClientComponents({ blogs }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Blog blogs={blogs} />
      </Suspense>
    </>
  );
} 