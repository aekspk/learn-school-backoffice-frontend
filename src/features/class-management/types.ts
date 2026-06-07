export interface SessionItem {
  id: number;
  topic: string;
  scheduledAt: string;
  durationMin: number;
  bookedSeats: number;
  totalSeats: number;
}

export interface CourseGroup {
  courseId: number;
  courseName: string;
  branchName: string;
  sessions: SessionItem[];
}

export interface DateGroupData {
  key: string;
  date: string;
  courseGroups: CourseGroup[];
}
