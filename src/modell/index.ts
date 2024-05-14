import { z } from "zod";

export const PeopleSchema = z
  .object({
    name: z.string(),
  })
  .array();

export type People = z.infer<typeof PeopleSchema>;
