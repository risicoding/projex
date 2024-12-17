import React from "react";
import ProjectList from "./ProjectList";
import { getProjects } from "../utils/GetProjects";
import { Project } from "../types/project";

const ProjectsListContainer = async () => {
  const projects = await getProjects() as Project[];
  console.log(projects);

  return <ProjectList projects={projects} />;
};

export default ProjectsListContainer;
