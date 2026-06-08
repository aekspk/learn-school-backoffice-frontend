import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCompensationApi,
  getCompensationListApi,
  resolveCompensationApi,
} from "@/services/api/compensations/compensations.service";
import type { CompensationStatus } from "@/types/api";
import { QueriesKeyEnum } from "@/lib/queries-key/queries-key";

export const compensationKeys = {
  all: ["compensations"] as const,
  list: (params?: { status?: CompensationStatus }) =>
    [...compensationKeys.all, params] as const,
};

export const useGetCompensationList = (params?: {
  status?: CompensationStatus;
}) => {
  return useQuery({
    queryKey: [QueriesKeyEnum.get_compensation_list],
    queryFn: () => getCompensationListApi(params),
  });
};

export const useCreateCompensation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createCompensationApi,
    onSuccess: () => qc.invalidateQueries({ queryKey: compensationKeys.all }),
  });
};

export const useResolveCompensation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: resolveCompensationApi,
    onSuccess: () =>
      qc.invalidateQueries({
        queryKey: [QueriesKeyEnum.get_compensation_list],
      }),
  });
};
