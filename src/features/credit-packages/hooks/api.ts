import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCreditPackageApi,
  deleteCreditPackageApi,
  getCreditPackagesApi,
  updateCreditPackageApi,
} from "@/services/api/credit-packages/credit-packages.service";
import { QueriesKeyEnum } from "@/lib/queries-key/queries-key";

export const creditPackageKeys = {
  all: ["credit-packages"] as const,
  list: (params?: { studentId?: number }) =>
    [...creditPackageKeys.all, params] as const,
};

export const useGetCreditPackages = (params?: { studentId?: number }) => {
  return useQuery({
    queryKey: creditPackageKeys.list(params),
    queryFn: () => getCreditPackagesApi(params),
  });
};

export const useCreateCreditPackage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createCreditPackageApi,
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: [QueriesKeyEnum.get_student] }),
  });
};

export const useUpdateCreditPackage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateCreditPackageApi,
    onSuccess: () => qc.invalidateQueries({ queryKey: creditPackageKeys.all }),
  });
};

export const useDeleteCreditPackage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteCreditPackageApi,
    onSuccess: () => qc.invalidateQueries({ queryKey: creditPackageKeys.all }),
  });
};
