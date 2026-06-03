import { z } from "zod";
export const courseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  totalSessions: z.number().min(1, "Must be at least 1"),
});
export type CourseFormValues = z.infer<typeof courseSchema>;
