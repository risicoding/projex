import BoardContainer from '@/features/dashboard/kanban/components/BoardContainer';
import React from 'react';
const Page = async ({ params }: { params: Promise<{ projectId: string }> }) => {
  const { projectId } = await params;

  return <BoardContainer projectId={projectId} />;
};

export default Page;
