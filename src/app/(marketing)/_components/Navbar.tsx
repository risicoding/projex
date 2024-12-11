import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full px-6 py-4 border-b shadow-neutral-700 shadow-md border-neutral-500 flex flex-row justify-between">
      <div className="flex flex-row gap-3 items-center">
        <Image className="select-none" src="/logo.svg" width={40} height={40} alt="logo" />
        <h2 className="text-xl">Projex</h2>
      </div>
      <div className="hidden sm:flex flex-row gap-3 items-center">
        <NavbarItem name="Home" href="/" />
        <NavbarItem name="Features" href="/" />
        <NavbarItem name="Dashboard" href="/" />
      </div>

      <button className="px-8 py-2 rounded-full relative text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600">
        <div className="absolute inset-x-0 h-px w-1/2 mx-auto -bottom-px left-4 shadow-2xl  bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px right-4 shadow-2xl  bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        <span className="relative z-20">Sign Up</span>
      </button>
    </nav>
  );
};

type NavbarItemProps = {
  name: string;
  href: string;
  className?: string;
};
const NavbarItem = ({ name, href, className }: NavbarItemProps) => {
  return (
    <Link href={href}>
      <div className={cn("text-neutral-300 hover:text-200 cursor-pointer", className)}>{name}</div>
    </Link>
  );
};

export default Navbar;
