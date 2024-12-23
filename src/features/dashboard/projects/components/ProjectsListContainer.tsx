import React from 'react'
import ProjectList from './ProjectList'
import { getProjects } from '../utils/GetProjects'
import { Project } from '../types/project'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { GetProjectsAction } from '../actions/GetProjectsAction'

const ProjectsListContainer = async ({ variant }: { variant: 'horizontal' | 'vertical' }) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await GetProjectsAction()
      return res
    },
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectList variant={variant} />
    </HydrationBoundary>
  )
}

export default ProjectsListContainer
