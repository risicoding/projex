import React from 'react';
import Image from 'next/image';
import Navbar from '@/features/marketing/components/MarketingNavbar';
import Hero from '@/features/marketing/sections/Hero';
import Features from '@/features/marketing/sections/Features';
import CtaSection from '@/features/marketing/sections/Cta';
import Footer from '@/features/marketing/sections/Footer';
import ContactUs from '@/features/marketing/sections/ContactUs';

const page = () => {
  return (
    <div className="overflow-clip  ">
      <div className="bg-gradient-to-br  w-full from-gray-900 to-transparent">
        <Navbar />
        <Hero />
      </div>
      <div className=" mx-auto">
        <Image
          src="/dashboard.jpg"
          alt="dashboard image"
          className="w-full max-w-6xl mx-auto"
          width={500}
          height={500}
        />

        <Features />
        <CtaSection />
        <ContactUs />
        <Footer />
      </div>
    </div>
  );
};

export default page;
