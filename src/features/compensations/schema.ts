import { z } from "zod";
export const resolveCompensationSchema = z.object({
  status: z.enum(["RESOLVED", "REJECTED"]),
  note: z.string().optional(),
});
export type ResolveCompensationFormValues = z.infer<typeof resolveCompensationSchema>;
