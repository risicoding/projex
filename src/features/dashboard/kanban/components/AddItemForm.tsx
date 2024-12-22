'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
import { AddBoardItemAction } from '../actions/AddItemAction'

export const addItemSchema = z.object({
  name: z.string().nonempty('Name is required').min(3, 'Name must be at least 3 characters'),
  projectId: z.number(),
  columnId: z.string().optional(),
})

type AddItemFormValues = z.infer<typeof addItemSchema>

const AddItemForm = ({ columnId }: { columnId: string }) => {
  const { projectId } = useParams<{ projectId: string }>()
  const projectIdNum = Number(projectId)

  const form = useForm<AddItemFormValues>({
    resolver: zodResolver(addItemSchema),
    defaultValues: {
      name: '',
      columnId,
      projectId: projectIdNum,
    },
  })

  const onSubmit = (data: AddItemFormValues) => {
    AddBoardItemAction(data)
    console.log('Form submitted with data:', data)
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
