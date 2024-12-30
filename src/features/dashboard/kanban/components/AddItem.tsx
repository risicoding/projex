import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import AddItemForm from './AddItemForm';
import { DialogTitle } from '@radix-ui/react-dialog';

export type AddItemProps = {
  boardColumnId: string;
};
const AddItem = ({ boardColumnId }: AddItemProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild className="flex flex-row justify-start w-full">
        <Button
          variant="outline"
          className="py-5 px-3 flex flex-row gap-4 bg-gray-000 border-1px border-gray-700"
        >
          <Plus />
          <span>AddItem</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-3/4">
        <DialogTitle className="hidden">Add Item</DialogTitle>
        <AddItemForm columnId={boardColumnId} />
      </DialogContent>
    </Dialog>
  );
};

export default AddItem;
