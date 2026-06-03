import api from "@/lib/api/api";
import type { CreditPackage } from "@/types/api";

export const getCreditPackagesApi = async (params?: {
  studentId?: number;
}): Promise<CreditPackage[]> => {
  const res = await api.get<CreditPackage[]>("/credit-packages", { params });
  return res.data;
};

export const createCreditPackageApi = async (payload: {
  studentId: number;
  courseId?: number;
  totalCredits: number;
  expiresAt: string;
}): Promise<CreditPackage> => {
  const res = await api.post<CreditPackage>("/credit-packages", payload);
  return res.data;
};

export const updateCreditPackageApi = async ({
  id,
  payload,
}: {
  id: number;
  payload: { totalCredits?: number; expiresAt?: string };
}): Promise<CreditPackage> => {
  const res = await api.patch<CreditPackage>(`/credit-packages/${id}`, payload);
  return res.data;
};

export const deleteCreditPackageApi = async (id: number): Promise<void> => {
  await api.delete(`/credit-packages/${id}`);
};
