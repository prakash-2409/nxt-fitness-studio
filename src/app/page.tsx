'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Preloader from '@/components/sections/Preloader';
import Hero from '@/components/sections/Hero';
import Navigation from '@/components/layout/Navigation';

// Dynamic imports for below-fold sections (code-splitting for performance)
const StatsBar = dynamic(() => import('@/components/sections/StatsBar'));
const About = dynamic(() => import('@/components/sections/About'));
const Programs = dynamic(() => import('@/components/sections/Programs'));
const Trainers = dynamic(() => import('@/components/sections/Trainers'));
const Transformations = dynamic(() => import('@/components/sections/Transformations'));
const Reviews = dynamic(() => import('@/components/sections/Reviews'));
const InstagramFeed = dynamic(() => import('@/components/sections/InstagramFeed'));
const Pricing = dynamic(() => import('@/components/sections/Pricing'));
const FAQ = dynamic(() => import('@/components/sections/FAQ'));
const Location = dynamic(() => import('@/components/sections/Location'));
const Footer = dynamic(() => import('@/components/layout/Footer'));
const MobileCTABar = dynamic(() => import('@/components/ui/MobileCTABar'));

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setPreloaderDone(true)} />
      
      <div
        style={{
          opacity: preloaderDone ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      >
        <Navigation />
        <Hero preloaderDone={preloaderDone} />
        <StatsBar />
        <About />
        <Programs />
        <Trainers />
        <Transformations />
        <Reviews />
        <InstagramFeed />
        <Pricing />
        <FAQ />
        <Location />
        <Footer />
        <MobileCTABar />
      </div>
    </>
  );
}
