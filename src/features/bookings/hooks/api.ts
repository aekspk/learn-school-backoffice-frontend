import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cancelBookingApi,
  createBookingApi,
  getBookingsApi,
  markAttendanceApi,
  markAttendancesApi,
} from "@/services/api/bookings/bookings.service";
import { QueriesKeyEnum } from "@/lib/queries-key/queries-key";

export const bookingKeys = {
  all: ["bookings"] as const,
  list: (params?: { classSessionId?: number; studentId?: number }) =>
    [...bookingKeys.all, params] as const,
};

export const useGetBookings = (params?: {
  classSessionId?: number;
  studentId?: number;
}) => {
  return useQuery({
    queryKey: bookingKeys.list(params),
    queryFn: () => getBookingsApi(params),
  });
};

export const useCreateBooking = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createBookingApi,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: [QueriesKeyEnum.get_class_session],
      });
      qc.invalidateQueries({
        queryKey: [QueriesKeyEnum.get_class_session_list],
      });
      qc.invalidateQueries({
        queryKey: [QueriesKeyEnum.get_eligible_students],
      });
      qc.invalidateQueries({
        queryKey: [QueriesKeyEnum.get_student],
      });
    },
  });
};

export const useMarkAttendance = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: markAttendanceApi,
    onSuccess: () => qc.invalidateQueries({ queryKey: bookingKeys.all }),
  });
};

export const useMarkAttendances = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: markAttendancesApi,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: [QueriesKeyEnum.get_class_session],
      });
      qc.invalidateQueries({
        queryKey: [QueriesKeyEnum.get_class_session],
      });
    },
  });
};

export const useCancelBooking = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: cancelBookingApi,
    onSuccess: () => qc.invalidateQueries({ queryKey: bookingKeys.all }),
  });
};
