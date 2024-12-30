'use server';
import { db } from '@/lib/db';

export const GetBoardItemsAction = async (boardColumnId: string) => {
  try {
    const boardItems = await db.boardItem.findMany({
      where: {
        boardColumnId,
      },
    });

    return boardItems;
  } catch (err) {
    return { err: 'Something went wrong', message: err };
  }
};
