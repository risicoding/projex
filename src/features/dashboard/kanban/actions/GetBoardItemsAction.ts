'use server'
import { db } from '@/db/drizzle'
import { boardItem } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const GetBoardItemsAction = async (projectId: number) => {
  try {
    const boardItems = await db.select().from(boardItem).where(eq(boardItem.projectId, projectId))
    console.log(boardItems)
    return boardItems
  } catch (err) {
    console.error(err)
    return { err: 'Something went wrong', message: err }
  }
}
