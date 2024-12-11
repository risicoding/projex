import { cn } from "@/lib/utils";
import { Github } from "lucide-react";
import { Open_Sans } from "next/font/google";

const opensans = Open_Sans({
  weight: "300",
  subsets: ["latin"],
});

const Footer = () => {
  return (
    <footer className="bg-black text-center text-gray-400 py-6 mt-20">
      <p className={cn("text-sm", opensans.className)}>
        © 2024 Your Company. All rights reserved.
      </p>
      <div className="flex justify-center space-x-6 mt-4">
        <a
          href="#"
          className="text-gray-500 hover:text-white transition duration-300"
        >
          Privacy Policy
        </a>
        <a
          href="#"
          className="text-gray-500 hover:text-white transition duration-300"
        >
          Terms of Service
        </a>
        <a
          href="#"
          className="text-gray-500 hover:text-white transition duration-300"
        >
          Contact Us
        </a>
      </div>
      <p className="text-sm text-gray-500 mt-4 flex flex-row justify-center gap-4">
        Developed and Managed by{" "}

        <div className="flex flex-row gap-1">
          <Github />
        <a
          href="https://github.com/risicoding"
          className="text-blue-500 hover:text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          risicoding
        </a>
        </div>
      </p>
    </footer>
  );
};

export default Footer;
