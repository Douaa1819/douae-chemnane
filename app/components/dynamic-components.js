"use client"

import dynamic from 'next/dynamic';

// Loading component
export const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-violet-500"></div>
  </div>
);

// Dynamic imports
export const DynamicHeroSection = dynamic(
  () => import('./homepage/hero-section'),
  { loading: () => <Loading />, ssr: false }
);

export const DynamicExperience = dynamic(
  () => import('./homepage/experience'),
  { loading: () => <Loading />, ssr: false }
);

export const DynamicBlog = dynamic(
  () => import('./homepage/blog'),
  { loading: () => <Loading />, ssr: false }
); 