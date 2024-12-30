import { z } from 'zod';

export const ProjectSchema = z.object({
  name: z.string(),
  orgId: z.string(),
  creatorId: z.string(),
});

export const ProjectFormSchema = z.object({
  name: z.string(),
});
