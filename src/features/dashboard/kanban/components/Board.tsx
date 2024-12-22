'use client'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { boardItem } from '@/db/schema'
import { InferSelectModel } from 'drizzle-orm'
import { useState } from 'react'
import { updateItem } from '../actions/BoardActions'
import AddItem from './AddItem'

type Item = InferSelectModel<typeof boardItem>

const Board = ({ boardItems }: { boardItems: Item[] }) => {
  const [items, setItems] = useState<Item[]>(boardItems)

  // Update task status in the database
  const handleUpdate = async (id: number, columnId: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, columnId } : item)))
    await updateItem(id, columnId)
  }

  // Drag-and-drop logic
  const onDragEnd = (result: DropResult) => {
    const { destination, draggableId } = result
    if (!destination) return

    const newStatus = destination.droppableId
    handleUpdate(Number(draggableId), newStatus)
  }

  type TaskStatus = 'to-do' | 'in-progress' | 'done'

  const groupedTasks: Record<TaskStatus, Item[]> = {
    'to-do': items.filter((task) => task.columnId === 'to-do'),
    'in-progress': items.filter((task) => task.columnId === 'in-progress'),
    done: items.filter((task) => task.columnId === 'done'),
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 py-12 px-8 overflow-x-auto">
        {['to-do', 'in-progress', 'done'].map((status) => (
          <div
            className="space-y-3 bg-gradient-to-b from-gray-800 to-gray-900 p-4 rounded-lg min-w-[250px] shadow-lg"
            key={status}
          >
            <h3 className="text-white font-semibold text-lg">{status.replace('-', ' ')}</h3>
            <div>
              <Droppable droppableId={status}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="min-h-4">
                    {groupedTasks[status as TaskStatus].map((item: Item, index: number) => (
                      <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="bg-gradient-to-r from-gray-700 to-gray-800 p-3 mb-2 rounded-md text-white"
                            style={provided.draggableProps.style}
                          >
                            {item.name}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <AddItem columnId={status} />
            </div>
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}

export default Board
