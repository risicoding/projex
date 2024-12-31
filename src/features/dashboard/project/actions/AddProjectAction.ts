'use server';
import { z } from 'zod';
import { ProjectFormSchema } from '../schema/project';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { DEFAULT_KANBAN_COLUMNS } from '../constants';
import logger from '@/lib/logger';

export const AddProjectAction = async (values: z.infer<typeof ProjectFormSchema>) => {
  const parsedValues = ProjectFormSchema.safeParse(values);

  logger.info(`Posted project : ${JSON.stringify(parsedValues)}`);

  if (!parsedValues.success) {
    return {
      error: 'Invalid data',
    };
  }

  const { userId, orgId } = await auth();

  if (userId && orgId) {
    try {
      // Create the project
      const project = await db.project.create({
        data: {
          name: parsedValues.data.name,
          orgId: orgId,
          creatorId: userId,
        },
      });

      // Add default columns with slug
      const defaultColumns = DEFAULT_KANBAN_COLUMNS.map(({ name, slug }) => ({
        name,
        slug,
        projectId: project.id,
      }));

      await db.boardColumn.createMany({
        data: defaultColumns,
      });

      return { message: 'success', project };
    } catch (err) {
      console.error('Error creating project:', err);
      return { error: 'Failed to create project' };
    }
  }

  redirect('/login');
};
