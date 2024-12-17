import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="px-4 py-4">
      <nav className="w-full px-8 py-3 bg-black border border-1px border-gray-700 shadow-md shadow-gray-700 rounded-full  flex flex-row justify-between">
        <div className="flex flex-row gap-3 items-center">
          <Image
            className="select-none"
            src="/logo.svg"
            width={40}
            height={40}
            alt="logo"
          />
          <h2 className="text-xl">Projex</h2>
        </div>
        <div className="hidden sm:flex flex-row gap-3 items-center">
          <NavbarItem name="Home" href="/" />
          <NavbarItem name="Features" href="/" />
          <NavbarItem name="Dashboard" href="/" />
        </div>

        <div className="flex flex-row gap-4">
          <Link href="/signup">
            <button className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-md font-medium text-white backdrop-blur-3xl">
                Signup
              </span>
            </button>
          </Link>

          <Link href="/login">
          <button className="px-6 py-2 rounded-full relative text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600">
            <span className="relative z-20">Login</span>
          </button>
          </Link>
        </div>
      </nav>
    </div>
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
      <div
        className={cn(
          "text-neutral-300 hover:text-200 cursor-pointer",
          className,
        )}
      >
        {name}
      </div>
    </Link>
  );
};

export default Navbar;
