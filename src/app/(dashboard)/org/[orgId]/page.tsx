import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import AddProjectForm from '@/features/dashboard/project/components/AddProjectForm';
import ProjectsListContainer from '@/features/dashboard/project/components/ProjectsListContainer';
import { DialogTitle } from '@/components/ui/dialog';
import { PlusCircleIcon } from 'lucide-react';

const page = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-row justify-between">
        <h1 className="bg-gradient-to-b from-neutral-50 to-neutral-500 animate-in fade-in duration-700 bg-clip-text text-transparent text-2xl text- font-semibold">
          Projects
        </h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex flex-row text-white items-center justify-between hover:bg-black hover:text-primary ring-2 ring-primary transition ease-in-out duration-200">
              <span className="font-semibold">Create</span>
              <PlusCircleIcon />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-3/5">
            <DialogDescription className='hidden'>Add project dialog</DialogDescription>
            <DialogTitle className="hidden">Add a new project</DialogTitle>
            <AddProjectForm />
          </DialogContent>
        </Dialog>
      </div>
      <ProjectsListContainer variant="horizontal" />
    </div>
  );
};

export default page;
