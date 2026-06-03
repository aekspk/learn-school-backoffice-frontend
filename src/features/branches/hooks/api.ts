import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBranchApi, deleteBranchApi, getBranchesApi, updateBranchApi } from "@/services/api/branches/branches.service";

export const branchKeys = {
  all: ["branches"] as const,
  list: () => [...branchKeys.all, "list"] as const,
};

export const useGetBranches = () => {
  return useQuery({ queryKey: branchKeys.list(), queryFn: getBranchesApi });
};

export const useCreateBranch = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: createBranchApi, onSuccess: () => qc.invalidateQueries({ queryKey: branchKeys.all }) });
};

export const useUpdateBranch = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: updateBranchApi, onSuccess: () => qc.invalidateQueries({ queryKey: branchKeys.all }) });
};

export const useDeleteBranch = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: deleteBranchApi, onSuccess: () => qc.invalidateQueries({ queryKey: branchKeys.all }) });
};
