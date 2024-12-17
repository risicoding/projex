import React from 'react'
import ProjectList from './ProjectList'
import { getProjects } from '../utils/GetProjects'
import { Project } from '../types/project'

const ProjectsListContainer = async ({ variant }: { variant: 'horizontal' | 'vertical' }) => {
  const projects = (await getProjects()) as Project[]
  console.log(projects)

  return <ProjectList projects={projects} variant={variant} />
}

export default ProjectsListContainer
