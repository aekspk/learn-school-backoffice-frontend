import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createClassSessionApi,
  deleteClassSessionApi,
  getClassSessionApi,
  getClassSessionsApi,
  getEligibleStudentsApi,
  updateClassSessionApi,
} from "@/services/api/class-sessions/class-sessions.service";
import { QueriesKeyEnum } from "@/lib/queries-key/queries-key";

export const classSessionKeys = {
  all: ["class-sessions"] as const,
  list: (params?: { branchId?: number }) =>
    [...classSessionKeys.all, params] as const,
  detail: (id: number) => [...classSessionKeys.all, id] as const,
};

export const useGetClassSessionList = (params?: { branchId?: number }) => {
  return useQuery({
    queryKey: [QueriesKeyEnum.get_class_session_list, params?.branchId],
    queryFn: () => getClassSessionsApi(params),
  });
};

export const useGetClassSession = (id: number) => {
  return useQuery({
    queryKey: [QueriesKeyEnum.get_class_session, id],
    queryFn: () => getClassSessionApi(id),
  });
};

export const useGetEligibleStudents = (id: number | undefined) => {
  return useQuery({
    queryKey: [QueriesKeyEnum.get_eligible_students, id],
    queryFn: () => getEligibleStudentsApi(id!),
    enabled: id != null && id > 0,
  });
};

export const useCreateClassSession = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createClassSessionApi,
    onSuccess: () =>
      qc.invalidateQueries({
        queryKey: [QueriesKeyEnum.get_class_session_list],
      }),
  });
};

export const useUpdateClassSession = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateClassSessionApi,
    onSuccess: () => qc.invalidateQueries({ queryKey: classSessionKeys.all }),
  });
};

export const useDeleteClassSession = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteClassSessionApi,
    onSuccess: () => qc.invalidateQueries({ queryKey: classSessionKeys.all }),
  });
};
