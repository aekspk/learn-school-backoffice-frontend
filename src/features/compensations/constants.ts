import type { CompensationStatus } from "@/types/api";

export const TYPE_LABEL: Record<string, string> = {
  MAKEUP_CLASS: "Makeup Class",
  SEAT_CREDIT: "Seat Credit",
  EXPIRY_EXTENSION: "Expiry Extension",
};

export const STATUS_LABEL: Record<CompensationStatus, string> = {
  PENDING: "Pending",
  RESOLVED: "Resolved",
  REJECTED: "Rejected",
};

export const STATUS_BADGE: Record<CompensationStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  RESOLVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};
