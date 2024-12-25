'use server';
import { z } from 'zod';
import { ProjectFormSchema } from '../ProjectSchema';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db/drizzle';
import { project } from '@/db/schema';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export const AddProjectAction = async (values: z.infer<typeof ProjectFormSchema>) => {
  console.log('values:', values);
  const parsedValues = ProjectFormSchema.safeParse(values);
  console.log(parsedValues);

  if (!parsedValues.success) {
    return {
      error: 'Invalid data',
    };
  }
  const { userId, orgId } = await auth();

  if (!userId && !orgId) {
    return redirect('/login');
  }

  try {
    const res = await db
      .insert(project)
      .values({
        orgId: orgId as string,
        creatorId: userId as string,
        name: parsedValues.data.name,
      })
      .returning();
    revalidatePath(`/org/${orgId}`);

    console.log(res);
    return { message: 'success', res: res[0] };
  } catch (err) {
    return err;
  }
};
