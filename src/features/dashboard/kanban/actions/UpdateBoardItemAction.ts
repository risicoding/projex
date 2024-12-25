'use server';

import { db } from '@/db/drizzle';
import { boardItem } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const updateItem = async (id: number, columnId: string) => {
  if (id && columnId) {
    await db.update(boardItem).set({ columnId }).where(eq(boardItem.id, id));
  }
};
