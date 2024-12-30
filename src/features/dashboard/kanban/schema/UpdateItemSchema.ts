import { z } from 'zod';

export const UpdateItemSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      position: z.number(),
      boardColumnId: z.string(),
    })
  ),
});

export type UpdateItemSchemaType = z.infer<typeof UpdateItemSchema>;
