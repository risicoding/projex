import BoardContainer from '@/features/dashboard/kanban/components/BoardContainer'
import React from 'react'
const Page = async ({ params }: { params: Promise<{ projectId: number }> }) => {
  const { projectId } = await params

  return (
    <div className=''>
      <BoardContainer projectId={projectId} />
    </div>
  )
}

export default Page
