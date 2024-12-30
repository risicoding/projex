import BoardItem from './BoardItem';
import AddItem from './AddItem';
import { Droppable } from '@hello-pangea/dnd';
import { useBoardItemsQuery } from '../hooks/useBoardItemsQuery';
import { Card } from '@/components/ui/card';

interface BoardColumnProps {
  id: string;
  name: string;
}

const BoardColumn = ({ id, name }: BoardColumnProps) => {
  const { data } = useBoardItemsQuery(id);

  return (
    <Card className="flex flex-col shrink-0 transition ease-in-out duration-300 space-y-3 min-w-[200px] p-4  rounded-md shadow-inner shadow-slate-900">
      <div className="flex items-center justify-center space-x-2">
        <h4 className="text-lg font-semibold text-gray-100">{name}</h4>
        <span className="text-sm font-bold bg-gray-800 text-gray-400">{data?.length}</span>
      </div>

      <div className="flex flex-col space-y-2">
        <Droppable droppableId={id}>
          {(provided) => (
            <div className="space-y-2 min-h-2" ref={provided.innerRef} {...provided.droppableProps}>
              {data?.map((item) => (
                <BoardItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  position={item.position}
                  boardColumnId={id}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <AddItem boardColumnId={id} />
      {/* Column Header */}
    </Card>
  );
};

export default BoardColumn;
