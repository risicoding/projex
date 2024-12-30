'use server';

import { db } from '@/lib/db';
import { UpdateItemSchema, UpdateItemSchemaType } from '../schema/UpdateItemSchema';

export const UpdateBoardItemAction = async ({ items }: UpdateItemSchemaType) => {
  const parsedData = UpdateItemSchema.safeParse({ items });

  if (!parsedData.success) {
    return { message: 'Invalid data' };
  }

  try {
    const transaction = parsedData.data.items.map((item) =>
      db.boardItem.update({
        where: {
          id: item.id,
        },
        data: {
          boardColumnId: item.boardColumnId,
          position: item.position,
        },
      })
    );

    const result = await db.$transaction(transaction);
    return { message: 'Updated Successfully', result };
  } catch (err) {
    return { err: 'Something went wrong' };
  }
};
