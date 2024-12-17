"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Project } from "../types/project";
import { useProjectStore } from "../store/projectStore";
import { useEffect } from "react";

const ProjectList = ({ projects }: { projects: Project[] }) => {
  const initializeProject = useProjectStore((state) => state.initializeProject);
  const storedProjects = useProjectStore((state) => state.projects);

  useEffect(() => {
    initializeProject(projects);
  },[initializeProject,projects]);


  return (
    <div className="flex flex-col px-3 gap-3 mt-3">
      {storedProjects?.map((project) => (
        <ProjectLink href="/home" key={project.id}>
          {project.name}
        </ProjectLink>
      ))}
    </div>
  );
};

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

export default ProjectList;
