import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCompensationApi, getCompensationsApi, resolveCompensationApi } from "@/services/api/compensations/compensations.service";
import type { CompensationStatus } from "@/types/api";

export const compensationKeys = {
  all: ["compensations"] as const,
  list: (params?: { status?: CompensationStatus }) => [...compensationKeys.all, params] as const,
};

export const useGetCompensations = (params?: { status?: CompensationStatus }) => {
  return useQuery({ queryKey: compensationKeys.list(params), queryFn: () => getCompensationsApi(params) });
};

export const useCreateCompensation = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: createCompensationApi, onSuccess: () => qc.invalidateQueries({ queryKey: compensationKeys.all }) });
};

export const useResolveCompensation = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: resolveCompensationApi, onSuccess: () => qc.invalidateQueries({ queryKey: compensationKeys.all }) });
};
