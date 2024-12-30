'use server';
import { db } from '@/lib/db';
import { AddItemSchema, AddItemType } from '../schema/AddItemSchema';

export const AddBoardItemAction = async (values: AddItemType) => {
  const parsedValues = AddItemSchema.safeParse(values);
  console.log(parsedValues);

  if (!parsedValues.success) {
    throw new Error('Invalid data', parsedValues.error);
  }

  const { name, columnId, position } = parsedValues.data;

  try {
    const res = await db.boardItem.create({
      data: {
        name,
        boardColumnId: columnId,
        position,
      },
    });

    return { message: 'success', res };
  } catch (err) {
    console.error('Error inserting board item:', err);
    throw err;
  }
};
