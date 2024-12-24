import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import AddItemForm from './AddItemForm'
import { DialogTitle } from '@radix-ui/react-dialog'

export type AddItemProps = {
  columnId: string
}
const AddItem = ({ columnId }: AddItemProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild className="flex flex-row justify-start w-full">
        <Button
          variant="outline"
          className="p-6 flex flex-row gap-4 bg-gray-800 border-2px border-gray-500"
        >
          <Plus />
          <span>AddItem</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-3/4">
        <DialogTitle className="hidden">Add Item</DialogTitle>
        <AddItemForm columnId={columnId} />
      </DialogContent>
    </Dialog>
  )
}

export default AddItem
