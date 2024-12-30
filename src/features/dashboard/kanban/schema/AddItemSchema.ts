import { z } from 'zod';

export const AddItemFormSchema = z.object({
  name: z.string().nonempty('Name is required'),
  columnId: z.string(),
});

export const AddItemSchema = z.object({
  name: z.string().nonempty('Name is required'),
  columnId: z.string(),
  position: z.number(),
});

export type AddItemType = z.infer<typeof AddItemSchema>;
export type AddItemFormType = z.infer<typeof AddItemFormSchema>;
