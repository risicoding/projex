'use server';

import { db } from '@/db/drizzle';
import { boardItem } from '@/db/schema';
import { AddItemSchema, AddItemType } from '../schema/AddItemSchema';

// Define Zod schema for validation

export const AddBoardItemAction = async (values: AddItemType) => {
  const parsedValues = AddItemSchema.safeParse(values);

  if (!parsedValues.success) {
    throw new Error('Invalid data', parsedValues.error);
  }

  const { name, projectId, columnId } = parsedValues.data;

  try {
    const res = await db
      .insert(boardItem)
      .values({
        name,
        projectId,
        columnId,
      })
      .returning();

    return { message: 'success', res: res[0] };
  } catch (err) {
    console.error('Error inserting board item:', err);
    throw err;
  }
};
