import { z } from "zod";
export const createCreditPackageSchema = z.object({
  studentId: z.number().min(1, "Student is required"),
  courseId: z.number().optional(),
  totalCredits: z.number().min(1, "Must be at least 1 credit"),
  expiresAt: z.string().min(1, "Expiry date is required"),
});
export type CreateCreditPackageFormValues = z.infer<typeof createCreditPackageSchema>;
