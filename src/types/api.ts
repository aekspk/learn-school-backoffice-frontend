export type Role = "HQ_ADMIN" | "BRANCH_MANAGER" | "BRANCH_STAFF";

export type BookingStatus =
  | "BOOKED"
  | "ATTENDED"
  | "SKIPPED"
  | "ABSENT"
  | "CANCELLED";

export type CompensationType =
  | "MAKEUP_CLASS"
  | "SEAT_CREDIT"
  | "EXPIRY_EXTENSION";

export type CompensationStatus = "PENDING" | "RESOLVED" | "REJECTED";

export type PackageStatus = "ACTIVE" | "EXPIRED" | "DEPLETED" | "CANCELLED";

export interface User {
  id: number;
  name: string;
  email: string;
  image: string | null;
  role: Role;
  branchId: number | null;
  branchName: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Branch {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourseLesson {
  id: number;
  courseId: number;
  order: number;
  topic: string;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: number;
  name: string;
  totalSessions: number;
  createdAt: string;
  updatedAt: string;
  classSessions?: ClassSession[];
}

export interface Student {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreditPackage {
  id: number;
  studentId: number;
  courseId: number | null;
  totalCredits: number;
  remainingCredits: number;
  expiresAt: string;
  status: PackageStatus;
  createdAt: string;
  updatedAt: string;
  student?: Student;
  course?: Course | null;
}

export interface ClassSession {
  id: number;
  branchId: number;
  courseId: number;
  courseLessonId: number | null;
  scheduledAt: string;
  durationMin: number;
  totalSeats: number;
  bookedSeats: number;
  createdAt: string;
  updatedAt: string;
  branch?: Branch;
  course?: Course;
  courseLesson?: CourseLesson | null;
  bookings: Booking[];
}

export interface Booking {
  id: number;
  studentId: number;
  classSessionId: number;
  packageId: number;
  markedById: number | null;
  status: BookingStatus;
  markedAt: string | null;
  createdAt: string;
  updatedAt: string;
  student?: Student;
  classSession?: ClassSession;
  package?: CreditPackage;
}

export interface Compensation {
  id: number;
  bookingId: number;
  type: CompensationType;
  status: CompensationStatus;
  note: string | null;
  resolvedById: number | null;
  resolvedAt: string | null;
  createdAt: string;
  updatedAt: string;
  booking?: Booking;
}

export interface CompensationStats {
  pending: number;
  resolve: number;
  rejectCount: number;
}

export interface CompensationListResponse {
  statusStats: CompensationStats;
  compensations: Compensation[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
