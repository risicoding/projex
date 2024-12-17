"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, MoreHorizontal } from "lucide-react";
import { Project } from "../types/project";
import { useProjectStore } from "../store/projectStore";
import { useEffect } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Variants for project list container
const projectListVariants = cva("flex", {
  variants: {
    variant: {
      vertical: "flex-col gap-3 p-4 items-start justify-start",
      horizontal: "flex-row flex-wrap gap-6 p-12 items-start justify-start",
    },
  },
});

// Variants for the project link component
const projectLinkVariants = cva(
  "group relative flex flex-col items-center justify-center  border border-gray-700 rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",
  {
    variants: {
      variant: {
        vertical:
          "w-full px-4 py-3 text-sm items-start font-medium text-gray-300 hover:bg-gray-700 hover:text-white",
        horizontal:
          "px-6 py-4 w-40 h-40 text-base  font-semibold text-gray-100 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 hover:from-gray-700 hover:via-gray-800 hover:to-gray-700 shadow-lg",
      },
    },
    defaultVariants: {
      variant: "vertical",
    },
  },
);

// Icon button styles
const iconButtonVariants =
  "p-2 rounded-md text-gray-400 transition duration-300 hover:invert hover:scale-110";

const ProjectList = ({
  projects,
  variant,
  className,
}: {
  projects: Project[];
  variant: "horizontal" | "vertical";
  className?: string;
}) => {
  const initializeProject = useProjectStore((state) => state.initializeProject);
  const storedProjects = useProjectStore((state) => state.projects);

  useEffect(() => {
    initializeProject(projects);
  }, [initializeProject, projects]);

  return (
    <div className={cn(projectListVariants({ variant, className }))}>
      {storedProjects?.map((project) => (
        <ProjectLink href="/home" key={project.id} variant={variant}>
          {project.name}
        </ProjectLink>
      ))}
    </div>
  );
};

type ProjectLinkProps = {
  children: React.ReactNode;
  href: string;
  variant?: "horizontal" | "vertical";
};

const ProjectLink = ({ children, href, variant }: ProjectLinkProps) => {
  return (
    <Link href={href} className={cn(projectLinkVariants({ variant }))}>
      {/* Icons at the top - visible only in horizontal */}
      {variant === "horizontal" && (
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className={iconButtonVariants}>
            <ExternalLink className="w-5 h-5" />
          </button>
          <button className={iconButtonVariants}>
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Text */}
      <span className={variant === "horizontal" ? "mt-2" : ""}>{children}</span>

      {/* Arrow for vertical orientation */}
      {variant === "vertical" && (
        <ArrowRight className="absolute bottom-2 right-2 w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </Link>
  );
};

export default ProjectList;
