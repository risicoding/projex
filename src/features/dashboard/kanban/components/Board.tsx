'use client';

import { useParams } from 'next/navigation';
import { useBoardColumnQuery } from '../hooks/useBoardColumnQuery';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import BoardColumn from './BoardColumn';
import { useUpdateBoardItem } from '../hooks/useBoardItemMutation';

const Board = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data } = useBoardColumnQuery(projectId);

  const { updateItem } = useUpdateBoardItem();

  const handleDragEnd = (e: DropResult) => {
    const { destination, source, draggableId } = e;

    if (!destination) return;
    console.log(e);

    updateItem({
      itemId: draggableId,
      destBoardColumnId: destination.droppableId,
      sourceBoardColumnId: source.droppableId,
      position: destination.index,
    });
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="">
        <div className="flex flex-row basis-16 space-x-4 overflow-x-scroll p-6 items-start">
          {data?.map((column) => <BoardColumn key={column.id} id={column.id} name={column.name} />)}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;
