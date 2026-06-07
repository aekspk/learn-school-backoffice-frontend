import { Navigate, Outlet } from "react-router-dom";
import { useGetProfile } from "@/features/auth/hooks/api";

export function ProtectedRoute() {
  const token = localStorage.getItem("accessToken");
  const { isLoading, isError } = useGetProfile();

  if (!token || isError) return <Navigate to="/login" replace />;
  if (isLoading) return null;
  return <Outlet />;
}
