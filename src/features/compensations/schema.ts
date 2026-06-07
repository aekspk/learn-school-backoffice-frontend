import { z } from "zod";
export const resolveCompensationSchema = z.object({
  status: z.enum(["RESOLVED", "REJECTED"]),
  type: z.enum(["MAKEUP_CLASS", "SEAT_CREDIT", "EXPIRY_EXTENSION"]).optional(),
  note: z.string().optional(),
});
export type ResolveCompensationFormValues = z.infer<typeof resolveCompensationSchema>;
