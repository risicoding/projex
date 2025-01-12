'use client';

import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ProjectFormSchema } from '../schema/project';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AddProjectAction } from '../actions/AddProjectAction';
import { DialogClose } from '@/components/ui/dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import FadeLoader from 'react-spinners/FadeLoader';
import { cn } from '@/lib/utils';

const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4 text-gray-300 mr-2"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
  </svg>
);

const AddProjectForm = () => {
  const queryClient = useQueryClient();
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const mutation = useMutation({
    mutationKey: ['addProject'],
    mutationFn: (values: z.infer<typeof ProjectFormSchema>) => AddProjectAction(values),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      closeRef.current?.click();
    },
  });

  const form = useForm<z.infer<typeof ProjectFormSchema>>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (values: z.infer<typeof ProjectFormSchema>) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  className={mutation.isPending ? 'border-gray-600 outline-gray-600 ring-gray-600' : ''}
                  placeholder="Project name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogClose className="hidden" asChild>
          <Button className="hidden" ref={closeRef} />
        </DialogClose>
        <Button
          type="submit"
          className={cn(
            'w-full flex items-center justify-center gap-2 rounded-md py-2',
            mutation.isPending
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-500 text-white'
          )}
          disabled={mutation.isPending}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AddProjectForm;
