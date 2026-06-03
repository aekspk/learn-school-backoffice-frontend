import { z } from "zod";
export const branchSchema = z.object({ name: z.string().min(1, "Name is required") });
export type BranchFormValues = z.infer<typeof branchSchema>;
