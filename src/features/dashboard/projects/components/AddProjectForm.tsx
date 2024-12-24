'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ProjectFormSchema } from '../ProjectSchema'
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { AddProjectAction } from '../actions/AddProjectAction'
import { DialogClose } from '@/components/ui/dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Project } from '../types/project'

const AddProjectForm = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['addProject'],
    mutationFn: (values: z.infer<typeof ProjectFormSchema>) => AddProjectAction(values),

    onMutate: async (newProject: z.infer<typeof ProjectFormSchema>) => {
      await queryClient.cancelQueries({ queryKey: ['projects'] })

      const previousProjects = queryClient.getQueryData(['projects'])

      // Update the query data with a fallback for old data
      queryClient.setQueryData(['projects'], (old: Project[] | undefined) => [
        ...(old || []),
        newProject,
      ])

      return { previousProjects }
    },
    onError: (err, newItem, context) => {
      queryClient.setQueryData(['projects'], context?.previousProjects)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })

  const form = useForm<z.infer<typeof ProjectFormSchema>>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof ProjectFormSchema>) => {
    console.log()
    mutation.mutate(values)
  }

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
                <Input placeholder="Project name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogClose className="w-full" asChild>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </DialogClose>
      </form>
    </Form>
  )
}

export default AddProjectForm
