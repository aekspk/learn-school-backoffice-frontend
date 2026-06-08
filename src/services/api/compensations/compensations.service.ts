import api from "@/lib/api/api";
import type {
  Compensation,
  CompensationListResponse,
  CompensationStatus,
  CompensationType,
} from "@/types/api";

export const getCompensationListApi = async (params?: {
  status?: CompensationStatus;
}): Promise<CompensationListResponse> => {
  const res = await api.get<CompensationListResponse>("/compensations", {
    params,
  });
  return res.data;
};

export const createCompensationApi = async (payload: {
  bookingId: number;
  type: CompensationType;
  note?: string;
}): Promise<Compensation> => {
  const res = await api.post<Compensation>("/compensations", payload);
  return res.data;
};

export const resolveCompensationApi = async ({
  id,
  payload,
}: {
  id: number;
  payload: { status: "RESOLVED" | "REJECTED"; note?: string };
}): Promise<Compensation> => {
  const res = await api.patch<Compensation>(
    `/compensations/${id}/resolve`,
    payload,
  );
  return res.data;
};
