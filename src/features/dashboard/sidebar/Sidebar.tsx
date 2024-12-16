import Image from "next/image";
import Link from "next/link";
import { Home, Users, Settings, ArrowRight, PlusCircle } from "lucide-react";
import { OrganizationSwitcher } from "@clerk/nextjs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import AddProjectForm from "../projects/components/AddProjectForm";

// Custom Link Component for Projects
const ProjectLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-between gap-2 px-4 py-2 text-sm font-medium border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      {children}
      <ArrowRight className="w-4 h-4 text-gray-600" />
    </Link>
  );
};

const Sidebar = () => {
  return (
    <aside className="w-full h-full bg-gray-900 text-gray-300">
      {/* Logo Section */}
      <div className="flex flex-row gap-3 p-3 items-center border-b border-gray-700">
        <Image
          className="select-none"
          src="/logo.svg"
          width={40}
          height={40}
          alt="logo"
        />
        <h2 className="text-xl font-semibold">Projex</h2>
      </div>

      {/* Workspaces Label */}
      <div className="px-3 mt-5">
        <h3 className="text-sm uppercase tracking-wide text-gray-500">
          Workspaces
        </h3>
      </div>
      <div className="py-3 pl-3">
        <OrganizationSwitcher />
      </div>
      {/* Navigation Links */}
      <div className="flex flex-col px-3 gap-3 mt-2">
        <Link
          href="/org"
          className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700 hover:text-white transition"
        >
          <Home size={20} />
          <span>Home</span>
        </Link>
        <Link
          href="/org"
          className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700 hover:text-white transition"
        >
          <Users size={20} />
          <span>Users</span>
        </Link>
        <Link
          href="/org"
          className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700 hover:text-white transition"
        >
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </div>

      {/* Projects Label */}
      <div className="flex flex-row justify-between px-3 mt-8">
        <h3 className="text-sm uppercase tracking-wide text-gray-500">
          Projects
        </h3>

        <Dialog>
          <DialogTitle className="hidden">Add project</DialogTitle>
          <DialogTrigger>
            <PlusCircle className="size-5 cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="w-3/4">
            <DialogHeader>Add a new project</DialogHeader>
          <DialogDescription className="hidden">new project dialog</DialogDescription>
            <AddProjectForm />
          </DialogContent>
        </Dialog>

      </div>

      {/* Projects Section with Custom ProjectLink */}
      <div className="flex flex-col px-3 gap-3 mt-3">
        <ProjectLink href="/projects/1">Project 1</ProjectLink>
        <ProjectLink href="/projects/2">Project 2</ProjectLink>
      </div>
    </aside>
  );
};

export default Sidebar;
