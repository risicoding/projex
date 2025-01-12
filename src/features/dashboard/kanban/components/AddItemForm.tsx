'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { AddBoardItemAction } from '../actions/AddBoardItemAction';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddItemFormSchema, AddItemFormType } from '../schema/AddItemSchema';
import { BoardItem } from '@prisma/client';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import AssignUser from './AssignUser';

const AddItemForm = ({ columnId }: { columnId: string }) => {
  const queryClient = useQueryClient();

  const previousItems = queryClient.getQueryData(['itemQuery', columnId]) as BoardItem[];

  let position = 0;
  if (previousItems.length !== 0) {
    position = previousItems[previousItems.length - 1].position + 1;
  }

  const mutation = useMutation({
    mutationKey: ['addItem', columnId],
    mutationFn: (values: AddItemFormType) =>
      AddBoardItemAction({
        ...values,
        position,
      }),

    onMutate: async (newItem: AddItemFormType) => {
      await queryClient.cancelQueries({ queryKey: ['itemQuery'] });

      queryClient.setQueryData(['itemQuery', columnId], (old: BoardItem[]) => [
        ...old,
        { ...newItem, boardColumnId: columnId, position },
      ]);

      return { previousItems };
    },

    onError: (err, newItem, context) => {
      queryClient.setQueryData(['itemQuery', columnId], context?.previousItems);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['itemQuery', columnId] });
    },
  });

  const form = useForm<AddItemFormType>({
    resolver: zodResolver(AddItemFormSchema),
    defaultValues: {
      name: '',
      columnId,
      description: '',
      date: undefined,
      users: [],
    },
  });

  const onSubmit = async (values: AddItemFormType) => {
    console.log(values);
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter item name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="users"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Members</FormLabel>
              <FormControl>
                <AssignUser value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Hidden Fields */}
        <input type="hidden" {...form.register('columnId')} />

        {/* Submit Button */}
        <DialogClose className="w-full" asChild>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </DialogClose>
      </form>
    </Form>
  );
};

export default AddItemForm;
