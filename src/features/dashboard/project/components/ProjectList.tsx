'use client';

import Link from 'next/link';
import { ArrowRight, ExternalLink, MoreHorizontal } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useParams, usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Project } from '@prisma/client';

// Variants for project list container
const projectListVariants = cva('flex', {
  variants: {
    variant: {
      vertical: 'flex-col gap-3 items-start justify-start',
      horizontal: 'flex-row flex-wrap gap-6 items-center justify-start',
    },
  },
});

// Variants for the project link component
const projectLinkVariants = cva(
  'group relative flex flex-col   border border-gray-700 rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
  {
    variants: {
      variant: {
        vertical:
          ' flex flex-row items-center justify-between w-full px-4 py-3 text-sm items-start font-medium text-gray-300 hover:bg-gray-700 hover:text-white',
        horizontal:
          'items-center justify-center p-0  w-32 h-32 text-base  font-semibold text-gray-100 hover:from-gray-700 hover:via-gray-800 hover:to-gray-700 shadow-lg',
      },
    },
    defaultVariants: {
      variant: 'vertical',
    },
  }
);

// Icon button styles
const iconButtonVariants =
  'p-2 rounded-md text-gray-400 transition duration-300 hover:invert hover:scale-110';

const ProjectList = ({
  variant,
  className,
}: {
  variant: 'horizontal' | 'vertical';
  className?: string;
}) => {
  const { data } = useQuery<Project[]>({
    queryKey: ['projects'],
  });

  const { orgId } = useParams();
  const pathname = usePathname();

  if (data?.length === 0) {
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
    );
  }
  return (
    <div className={cn(projectListVariants({ variant, className }))}>
      {data?.map((project: Project, index) => {
        let urlPath = '';
        if (project.id) {
          urlPath = `/org/${orgId}/project/${project.id}`;
        } else {
          urlPath = pathname;
        }
        return (
          <ProjectLink href={urlPath} key={index} variant={variant}>
            {project.name}
          </ProjectLink>
        );
      })}
    </div>
  );
};

type ProjectLinkProps = {
  children: React.ReactNode;
  href: string;
  variant?: 'horizontal' | 'vertical';
};

const ProjectLink = ({ children, href, variant }: ProjectLinkProps) => {
  return (
    <Link href={href} className={cn(projectLinkVariants({ variant }))}>
      {/* Icons at the top - visible only in horizontal */}
      {variant === 'horizontal' && (
        <div className="items-center gap-2 hidden group-hover:flex transitiony ease-in duration-700">
          <button className={iconButtonVariants}>
            <ExternalLink className="w-5 h-5" />
          </button>
          <button className={iconButtonVariants}>
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Text */}

      <span
        className={
          variant === 'horizontal'
            ? 'flex group-hover:hidden transition ease-in duration-700 mt-2'
            : ''
        }
      >
        {children}
      </span>

      {/* Arrow for vertical orientation */}
      {variant === 'vertical' && (
        <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </Link>
  );
};

export default ProjectList;
