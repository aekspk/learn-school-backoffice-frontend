import { z } from "zod";

export const createBookingSchema = z.object({
  studentId: z.number().min(1, "Student is required"),
  classSessionId: z.number().min(1, "Class session is required"),
  packageId: z.number().optional(),
});

export type CreateBookingFormValues = z.infer<typeof createBookingSchema>;

export const attendanceSchema = z.object({
  status: z.enum(["ATTENDED", "SKIPPED", "ABSENT", "CANCELLED"]),
});

export type AttendanceFormValues = z.infer<typeof attendanceSchema>;
