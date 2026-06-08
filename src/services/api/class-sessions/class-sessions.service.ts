import api from "@/lib/api/api";
import type { ClassSession, DateGroupData, Student } from "@/types/api";

export const getClassSessionsApi = async (params?: {
  branchId?: number;
}): Promise<DateGroupData[]> => {
  const res = await api.get<DateGroupData[]>("/class-sessions", { params });
  return res.data;
};

export const createClassSessionApi = async (payload: {
  courseId: number;
  courseLessonId: number;
  scheduledAt: string;
  durationMin?: number;
  totalSeats: number;
}): Promise<ClassSession> => {
  const res = await api.post<ClassSession>("/class-sessions", payload);
  return res.data;
};

export const updateClassSessionApi = async ({
  id,
  payload,
}: {
  id: number;
  payload: { scheduledAt?: string; durationMin?: number; totalSeats?: number };
}): Promise<ClassSession> => {
  const res = await api.patch<ClassSession>(`/class-sessions/${id}`, payload);
  return res.data;
};

export const deleteClassSessionApi = async (id: number): Promise<void> => {
  await api.delete(`/class-sessions/${id}`);
};

export const getClassSessionApi = async (id: number): Promise<ClassSession> => {
  const res = await api.get<ClassSession>(`/class-sessions/${id}`);
  return res.data;
};

export const getEligibleStudentsApi = async (
  id: number,
): Promise<Student[]> => {
  const res = await api.get<Student[]>(
    `/class-sessions/${id}/eligible-students`,
  );
  return res.data;
};
