import { z } from 'zod';

export const AddItemFormSchema = z.object({
  name: z.string().nonempty('Name is required'),
  description: z.string().optional(),
  date: z.date().optional(),
  users: z.array(z.string()),
  columnId: z.string(),
});

export const AddItemSchema = z.object({
  name: z.string().nonempty('Name is required'),
  columnId: z.string(),
  description: z.string().optional(),
  date: z.date().optional(),
  users: z.array(z.string()),
  position: z.number(),
});

export type AddItemType = z.infer<typeof AddItemSchema>;
export type AddItemFormType = z.infer<typeof AddItemFormSchema>;
