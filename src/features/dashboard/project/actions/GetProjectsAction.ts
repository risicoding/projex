'use server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

export const GetProjectsAction = async () => {
  const { orgId } = await auth();

  if (!orgId) {
    return redirect('/select-organization');
  }

  try {
    const res = await db.project.findMany({
      where: {
        orgId,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};
