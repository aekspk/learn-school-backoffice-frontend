import api from "@/lib/api/api";
import type { ClassSession } from "@/types/api";

export const getClassSessionsApi = async (params?: {
  branchId?: number;
}): Promise<ClassSession[]> => {
  const res = await api.get<ClassSession[]>("/class-sessions", { params });
  return res.data;
};

export const createClassSessionApi = async (payload: {
  branchId: number;
  courseId: number;
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
