import api from "@/lib/api/api";
import type { Booking, BookingStatus } from "@/types/api";

export const getBookingsApi = async (params?: {
  classSessionId?: number;
  studentId?: number;
}): Promise<Booking[]> => {
  const res = await api.get<Booking[]>("/bookings", { params });
  return res.data;
};

export const createBookingApi = async (payload: {
  studentId: number;
  classSessionId: number;
  packageId?: number;
}): Promise<Booking> => {
  const res = await api.post<Booking>("/bookings", payload);
  return res.data;
};

export const markAttendanceApi = async ({
  id,
  status,
}: {
  id: number;
  status: BookingStatus;
}): Promise<Booking> => {
  const res = await api.patch<Booking>(`/bookings/${id}/attendance`, { status });
  return res.data;
};

export const markAttendancesApi = async (
  payload: { bookingId: number; status: BookingStatus }[],
): Promise<Booking[]> => {
  const res = await api.patch<Booking[]>("/bookings/attendances", payload);
  return res.data;
};

export const cancelBookingApi = async (id: number): Promise<Booking> => {
  const res = await api.delete<Booking>(`/bookings/${id}`);
  return res.data;
};
