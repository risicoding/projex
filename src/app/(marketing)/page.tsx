import React from "react";
import Hero from "./_sections/Hero";
import Image from "next/image";
import Features from "./_sections/Features";

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
    </div>
  );
};

export default page;
