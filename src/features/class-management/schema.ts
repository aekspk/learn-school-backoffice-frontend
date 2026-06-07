import { z } from "zod";
export const classSessionSchema = z.object({
  branchId: z.number().min(1, "Branch is required"),
  courseId: z.number().min(1, "Course is required"),
  scheduledAt: z.string().min(1, "Date/time is required"),
  durationMin: z.number().min(1),
  totalSeats: z.number().min(1, "Must have at least 1 seat"),
});
export type ClassSessionFormValues = z.infer<typeof classSessionSchema>;
