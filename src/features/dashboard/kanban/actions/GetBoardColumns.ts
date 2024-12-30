'use server';
import { db } from '@/lib/db';
import { z } from 'zod';

const GetProjectBoardColumnsSchema = z.object({
  projectId: z.string().nonempty('Project ID is required'),
});

export const GetProjectBoardColumns = async (
  input: z.infer<typeof GetProjectBoardColumnsSchema>
) => {
  // Validate the input
  const parsedInput = GetProjectBoardColumnsSchema.safeParse(input);

  if (!parsedInput.success) {
    return {
      error: 'Invalid input',
      issues: parsedInput.error.errors,
    };
  }

  const { projectId } = parsedInput.data;

  try {
    // Fetch all board columns for the project
    const columns = await db.boardColumn.findMany({
      where: { projectId },
    });

    return { data: columns };
  } catch (error) {
    console.error('Error fetching board columns:', error);
    return { error: 'Failed to fetch board columns' };
  }
};
