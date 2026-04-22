'use client';

import { useState } from 'react';
import Preloader from '@/components/sections/Preloader';
import Hero from '@/components/sections/Hero';
import StatsBar from '@/components/sections/StatsBar';
import About from '@/components/sections/About';
import Programs from '@/components/sections/Programs';
import Trainers from '@/components/sections/Trainers';
import Transformations from '@/components/sections/Transformations';
import Reviews from '@/components/sections/Reviews';
import InstagramFeed from '@/components/sections/InstagramFeed';
import Pricing from '@/components/sections/Pricing';
import FAQ from '@/components/sections/FAQ';
import Location from '@/components/sections/Location';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import MobileCTABar from '@/components/ui/MobileCTABar';

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
