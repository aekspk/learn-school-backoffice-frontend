import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClassSessionApi, deleteClassSessionApi, getClassSessionApi, getClassSessionsApi, updateClassSessionApi } from "@/services/api/class-sessions/class-sessions.service";

export const classSessionKeys = {
  all: ["class-sessions"] as const,
  list: (params?: { branchId?: number }) => [...classSessionKeys.all, params] as const,
  detail: (id: number) => [...classSessionKeys.all, id] as const,
};

export const useGetClassSessions = (params?: { branchId?: number }) => {
  return useQuery({ queryKey: classSessionKeys.list(params), queryFn: () => getClassSessionsApi(params) });
};

export const useGetClassSession = (id: number) => {
  return useQuery({ queryKey: classSessionKeys.detail(id), queryFn: () => getClassSessionApi(id) });
};

export const useCreateClassSession = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: createClassSessionApi, onSuccess: () => qc.invalidateQueries({ queryKey: classSessionKeys.all }) });
};

export const useUpdateClassSession = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: updateClassSessionApi, onSuccess: () => qc.invalidateQueries({ queryKey: classSessionKeys.all }) });
};

export const useDeleteClassSession = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: deleteClassSessionApi, onSuccess: () => qc.invalidateQueries({ queryKey: classSessionKeys.all }) });
};
