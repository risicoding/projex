import React from "react";
import Navbar from "./_components/Navbar";
import Hero from "./_sections/Hero";
import Image from "next/image";
import Features from "./_sections/Features";
import CtaButton from "./_sections/Cta";
import ContactUs from "./_sections/ContactUs";
import Footer from "./_sections/Footer";

const page = () => {
  return (
    <div className="overflow-clip ">
      <div className="bg-gradient-to-br  from-gray-900 to-transparent">
        <Navbar />
        <Hero />
      </div>
      <Image
        src="/dashboard.jpg"
        alt="dashboard image"
        className="w-full"
        width={500}
        height={500}
      />

      <Features />
      <CtaButton />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default page;
