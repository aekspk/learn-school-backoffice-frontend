import { z } from "zod";
export const resolveCompensationSchema = z
  .object({
    status: z.enum(["RESOLVED", "REJECTED"]),
    type: z.enum(["MAKEUP_CLASS", "SEAT_CREDIT", "EXPIRY_EXTENSION"]).optional(),
    note: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.status === "RESOLVED" && !data.type) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Compensation type is required when resolving",
        path: ["type"],
      });
    }
  });
export type ResolveCompensationFormValues = z.infer<typeof resolveCompensationSchema>;
