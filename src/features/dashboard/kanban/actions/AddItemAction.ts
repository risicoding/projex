'use server'

import { z } from 'zod'
import { db } from '@/db/drizzle'
import { boardItem } from '@/db/schema'
import { revalidatePath } from 'next/cache'
import { addItemSchema } from '../components/AddItemForm'

// Define Zod schema for validation

export const AddBoardItemAction = async (values: z.infer<typeof addItemSchema>) => {
  const parsedValues = addItemSchema.safeParse(values)

  if (!parsedValues.success) {
    return {
      error: 'Invalid data',
      details: parsedValues.error.errors,
    }
  }

  const { name, projectId, columnId } = parsedValues.data

  try {
    const res = await db
      .insert(boardItem)
      .values({
        name,
        projectId,
        columnId,
      })
      .returning()

    // Revalidate the path for the corresponding project page (adjust as needed)
    revalidatePath(`/project/${projectId}`)

    return { message: 'success', res: res[0] }
  } catch (err) {
    console.error('Error inserting board item:', err)
    return { error: 'Failed to add board item', details: err }
  }
}
