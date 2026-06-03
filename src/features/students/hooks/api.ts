import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createStudentApi, deleteStudentApi, getStudentsApi, updateStudentApi } from "@/services/api/students/students.service";

export const studentKeys = {
  all: ["students"] as const,
  list: () => [...studentKeys.all, "list"] as const,
};

export const useGetStudents = () => {
  return useQuery({ queryKey: studentKeys.list(), queryFn: getStudentsApi });
};

export const useCreateStudent = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: createStudentApi, onSuccess: () => qc.invalidateQueries({ queryKey: studentKeys.all }) });
};

export const useUpdateStudent = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: updateStudentApi, onSuccess: () => qc.invalidateQueries({ queryKey: studentKeys.all }) });
};

export const useDeleteStudent = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: deleteStudentApi, onSuccess: () => qc.invalidateQueries({ queryKey: studentKeys.all }) });
};
