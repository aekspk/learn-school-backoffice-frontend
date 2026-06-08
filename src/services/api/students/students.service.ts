import api from "@/lib/api/api";
import type {
  Booking,
  CreditPackage,
  Student,
  StudentDetail,
} from "@/types/api";

export const getStudentListApi = async (): Promise<Student[]> => {
  const res = await api.get<Student[]>("/students");
  return res.data;
};

export const getStudentApi = async (id: number): Promise<StudentDetail> => {
  const res = await api.get<StudentDetail>(`/students/${id}`);
  return res.data;
};

export const createStudentApi = async (payload: {
  name: string;
  email: string;
  phone?: string;
}): Promise<Student> => {
  const res = await api.post<Student>("/students", payload);
  return res.data;
};

export const updateStudentApi = async ({
  id,
  payload,
}: {
  id: number;
  payload: { name?: string; email?: string; phone?: string };
}): Promise<Student> => {
  const res = await api.patch<Student>(`/students/${id}`, payload);
  return res.data;
};

export const deleteStudentApi = async (id: number): Promise<void> => {
  await api.delete(`/students/${id}`);
};

export const getStudentPackagesApi = async (
  id: number,
): Promise<CreditPackage[]> => {
  const res = await api.get<CreditPackage[]>(`/students/${id}/packages`);
  return res.data;
};

export const getStudentBookingsApi = async (id: number): Promise<Booking[]> => {
  const res = await api.get<Booking[]>(`/students/${id}/bookings`);
  return res.data;
};
