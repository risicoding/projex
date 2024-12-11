import React from "react";
import Hero from "./_sections/Hero";
import Image from "next/image";
import Features from "./_sections/Features";
import CtaButton from "./_sections/Cta";
import ContactUs from "./_sections/ContactUs";
import Footer from "./_sections/Footer";

const page = () => {
  return (
    <div className="overflow-clip ">
      <Hero />
        <Image
          src="/dashboard.png"
          alt="dashboard image"
          className="w-full"
          width={500}
          height={500}
        />

      <Features/>
      <CtaButton/>
      <ContactUs/>
      <Footer/>
    </div>
  );
};

export default page;
