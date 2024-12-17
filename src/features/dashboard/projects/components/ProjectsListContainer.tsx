import React from 'react'
import ProjectList from './ProjectList'
import { getProjects } from '../utils/GetProjects'
import { Project } from '../types/project'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const ProjectsListContainer = async ({ variant }: { variant: 'horizontal' | 'vertical' }) => {
  const projects = (await getProjects()) as Project[]
  console.log(projects)

  if (projects.length===0) {
    return (
      <div className="flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center shadow-md">
          <CardHeader>
            <CardTitle className="text-lg text-gray-700 dark:text-gray-200">
              No Projects Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
              You currently have no projects. Start by adding a new one to get organized and manage
              your tasks effectively.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <ProjectList projects={projects} variant={variant} />
}

export default ProjectsListContainer
