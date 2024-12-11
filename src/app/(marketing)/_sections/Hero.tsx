"use client";
import { cn } from "@/lib/utils";
import { Open_Sans } from "next/font/google";

const opensans = Open_Sans({
  weight: "300",
  subsets: ["latin"],
});

const Hero = () => {
  return (
    <section className="flex flex-col bg-gradient-to-br  from-gray-900 to-transparent gap-6 items-center justify-center sm:px-6 px-3 py-10 ">
      <h1 className="bg-gradient-to-b from-neutral-50 to-neutral-500 animate-in fade-in duration-700 bg-clip-text text-transparent text-6xl text-center font-semibold">
        Manage your projects with ease
      </h1>
      <p className={cn("text-lg text-center text-neutral-500", opensans.className)}>
        Projex is a purpose-built tool for modern product management
      </p>

      <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-md font-medium text-white backdrop-blur-3xl">
          Get started
        </span>
      </button>
    </section>
  );
};

export default Hero;
