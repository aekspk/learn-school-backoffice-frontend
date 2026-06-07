import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createStudentApi,
  deleteStudentApi,
  getStudentApi,
  getStudentBookingsApi,
  getStudentPackagesApi,
  getStudentsApi,
  updateStudentApi,
} from "@/services/api/students/students.service";
import { QueriesKeyEnum } from "@/lib/queries-key/queries-key";

export const studentKeys = {
  all: ["students"] as const,
  list: () => [...studentKeys.all, "list"] as const,
  detail: (id: number) => [...studentKeys.all, "detail", id] as const,
  packages: (id: number) => [...studentKeys.all, id, "packages"] as const,
  bookings: (id: number) => [...studentKeys.all, id, "bookings"] as const,
};

export const useGetStudentList = () => {
  return useQuery({
    queryKey: [QueriesKeyEnum.get_student_list],
    queryFn: getStudentsApi,
  });
};

export const useGetStudent = (id: number) => {
  return useQuery({
    queryKey: studentKeys.detail(id),
    queryFn: () => getStudentApi(id),
  });
};

export const useGetStudentPackages = (id: number) => {
  return useQuery({
    queryKey: studentKeys.packages(id),
    queryFn: () => getStudentPackagesApi(id),
  });
};

export const useGetStudentBookings = (id: number) => {
  return useQuery({
    queryKey: studentKeys.bookings(id),
    queryFn: () => getStudentBookingsApi(id),
  });
};

export const useCreateStudent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createStudentApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QueriesKeyEnum.get_student_list] });
      qc.invalidateQueries({ queryKey: [QueriesKeyEnum.get_eligible_students] });
    },
  });
};

export const useUpdateStudent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateStudentApi,
    onSuccess: () => qc.invalidateQueries({ queryKey: studentKeys.all }),
  });
};

export const useDeleteStudent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteStudentApi,
    onSuccess: () => qc.invalidateQueries({ queryKey: studentKeys.all }),
  });
};
