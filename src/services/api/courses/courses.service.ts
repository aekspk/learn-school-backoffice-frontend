import api from "@/lib/api/api";
import type { Course } from "@/types/api";

export const getCoursesApi = async (): Promise<Course[]> => {
  const res = await api.get<Course[]>("/courses");
  return res.data;
};

export const createCourseApi = async (payload: {
  name: string;
  totalSessions: number;
}): Promise<Course> => {
  const res = await api.post<Course>("/courses", payload);
  return res.data;
};

export const updateCourseApi = async ({
  id,
  payload,
}: {
  id: number;
  payload: { name?: string; totalSessions?: number };
}): Promise<Course> => {
  const res = await api.patch<Course>(`/courses/${id}`, payload);
  return res.data;
};

export const deleteCourseApi = async (id: number): Promise<void> => {
  await api.delete(`/courses/${id}`);
};
