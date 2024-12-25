import { z } from 'zod';
export const AddItemSchema = z.object({
  name: z.string().nonempty('Name is required').min(3, 'Name must be at least 3 characters'),
  projectId: z.number(),
  columnId: z.string().optional(),
});

export type AddItemType = z.infer<typeof AddItemSchema>;
