import { db } from '@/db/drizzle'
import { boardItem } from '@/db/schema'
import { eq } from 'drizzle-orm'
import Board from './Board'

interface BoardContainerProps {
  projectId: number
}

const BoardContainer = async ({ projectId }: BoardContainerProps) => {
  const boardItems = await db.select().from(boardItem).where(eq(boardItem.projectId, projectId))

  return <Board boardItems={boardItems} />
}

export default BoardContainer
