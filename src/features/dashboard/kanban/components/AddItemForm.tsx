'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { useParams } from 'next/navigation'
import { AddBoardItemAction } from '../actions/AddBoardItemAction'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AddItemSchema, AddItemType } from '../schema/AddItemSchema'
import { Item } from './Board'

const AddItemForm = ({ columnId }: { columnId: string }) => {
  const queryClient = useQueryClient()
  const { projectId } = useParams<{ projectId: string }>()

  const form = useForm<AddItemType>({
    resolver: zodResolver(AddItemSchema),
    defaultValues: {
      name: '',
      columnId,
      projectId: Number(projectId),
    },
  })

  const mutation = useMutation({
    mutationKey: ['items', projectId],
    mutationFn: (values: AddItemType) => AddBoardItemAction(values),
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ['projects'] })
      const previousItems = queryClient.getQueryData(['board', projectId])

      queryClient.setQueryData(['board', projectId], (old: Item[]) => [...old, newItem])

      return { previousItems }
    },
    onError: (err, newItem, context) => {
      queryClient.setQueryData(['board', projectId], context?.previousItems)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['board', projectId] })
    },
  })

  const onSubmit = async (values: AddItemType) => {
    mutation.mutate(values)
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
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

        {/* Hidden Fields */}
        <input type="hidden" {...form.register('projectId')} />
        <input type="hidden" {...form.register('columnId')} />

        {/* Submit Button */}
        <DialogClose className="w-full" asChild>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </DialogClose>
      </form>
    </Form>
  )
}

export default AddItemForm
