import { Draggable } from '@hello-pangea/dnd';

interface BoardItemProps {
  id: string;
  name: string;
  position: number;
  boardColumnId: string;
}

const BoardItem = ({ id, name, position }: BoardItemProps) => {
  return (
    <Draggable draggableId={id} index={position}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-gray-800 border-2px border-gray-700 text-gray-200 p-3 rounded-md shadow-inner hover:shadow-none shadow-gray-900  flex items-center space-x-3  overflow-clip"
        >
          {/* Circle/Icon */}

          {/* Item Name */}
          <span className="text-sm font-medium">{name}</span>
        </div>
      )}
    </Draggable>
  );
};

export default BoardItem;
