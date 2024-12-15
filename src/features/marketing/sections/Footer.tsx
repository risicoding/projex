import { cn } from "@/lib/utils";
import { Open_Sans } from "next/font/google";
import { FaGithub } from "react-icons/fa";

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

      <div className="text-sm text-gray-500 py-4 flex flex-row justify-center gap-3">
        <p>Developed and Managed by </p>

        <div className="flex flex-row gap-2 items-center">
          <FaGithub className="text-gray-500" />
          <a
            href="https://github.com/risicoding"
            className="text-blue-500 hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            risicoding
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
