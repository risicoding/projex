"use client";
import React, { createContext, useOptimistic } from "react";

type OptimisticProject= {
  id: number;
  name: string;
  orgId: string;
};

type ProjectsContextType = {
  optimisticProjects: OptimisticProject[];
  addOptimisticProjects: (_project: OptimisticProject) => void;
};

export const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined,
);

export default function ProjectsProvider({
  children,
  projects,
}: {
  children: React.ReactNode;
  projects: OptimisticProject[];
}) {
  const [optimisticProjects, addOptimisticProjects] = useOptimistic(
    projects,
    (state: OptimisticProject[], newProject: OptimisticProject) => {
      return [...state, newProject];
    },
  );

  return (
    <ProjectsContext.Provider value={{ optimisticProjects, addOptimisticProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = React.useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectsContext");
  }
  return context;
}
