'use client'

import Link from 'next/link'
import { ArrowRight, ExternalLink, MoreHorizontal } from 'lucide-react'
import { Project } from '../types/project'
import { useProjectStore } from '../store/projectStore'
import { useEffect } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Variants for project list container
const projectListVariants = cva('flex', {
  variants: {
    variant: {
      vertical: 'flex-col gap-3 items-start justify-start',
      horizontal: 'flex-row flex-wrap gap-6  items-start justify-start',
    },
  },
})

// Variants for the project link component
const projectLinkVariants = cva(
  'group relative flex flex-col   border border-gray-700 rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
  {
    variants: {
      variant: {
        vertical:
          ' items-center justify-start w-full px-4 py-3 text-sm items-start font-medium text-gray-300 hover:bg-gray-700 hover:text-white',
        horizontal:
          'items-center justify-end p-6  w-32 h-32 text-base  font-semibold text-gray-100 hover:from-gray-700 hover:via-gray-800 hover:to-gray-700 shadow-lg',
      },
    },
    defaultVariants: {
      variant: 'vertical',
    },
  }
)

// Icon button styles
const iconButtonVariants =
  'p-2 rounded-md text-gray-400 transition duration-300 hover:invert hover:scale-110'

const ProjectList = ({
  projects,
  variant,
  className,
}: {
  projects: Project[]
  variant: 'horizontal' | 'vertical'
  className?: string
}) => {
  const initializeProject = useProjectStore((state) => state.initializeProject)
  const storedProjects = useProjectStore((state) => state.projects)

  useEffect(() => {
    initializeProject(projects)
  }, [initializeProject, projects])


  if (storedProjects.length===0) {
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
  return (
    <div className={cn(projectListVariants({ variant, className }))}>
      {storedProjects?.map((project) => (
        <ProjectLink href="/home" key={project.id} variant={variant}>
          {project.name}
        </ProjectLink>
      ))}
    </div>
  )
}

type ProjectLinkProps = {
  children: React.ReactNode
  href: string
  variant?: 'horizontal' | 'vertical'
}

const ProjectLink = ({ children, href, variant }: ProjectLinkProps) => {
  return (
    <Link href={href} className={cn(projectLinkVariants({ variant }))}>
      {/* Icons at the top - visible only in horizontal */}
      {variant === 'horizontal' && (
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

      
      <span className={variant === 'horizontal' ? 'mt-2' : ''}>{children}</span>

      {/* Arrow for vertical orientation */}
      {variant === 'vertical' && (
        <ArrowRight className="absolute bottom-2 right-2 w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </Link>
  )
}

export default ProjectList
