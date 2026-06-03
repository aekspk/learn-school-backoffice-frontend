import api from "@/lib/api/api";
import type { Branch } from "@/types/api";

export const getBranchesApi = async (): Promise<Branch[]> => {
  const res = await api.get<Branch[]>("/branches");
  return res.data;
};

export const createBranchApi = async (payload: { name: string }): Promise<Branch> => {
  const res = await api.post<Branch>("/branches", payload);
  return res.data;
};

export const updateBranchApi = async ({
  id,
  payload,
}: {
  id: number;
  payload: { name: string };
}): Promise<Branch> => {
  const res = await api.patch<Branch>(`/branches/${id}`, payload);
  return res.data;
};

export const deleteBranchApi = async (id: number): Promise<void> => {
  await api.delete(`/branches/${id}`);
};
