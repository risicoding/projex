import { db } from '@/db/drizzle'
import { project } from '@/db/schema'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export const getProjects = async () => {
  const { orgId } = await auth()
  if (!orgId) {
    return redirect('/select-organization')
  }

  try {
    const res = await db.select().from(project).where(eq(project.orgId, orgId))
    return res
  } catch (err) {
    return err
  }
}
