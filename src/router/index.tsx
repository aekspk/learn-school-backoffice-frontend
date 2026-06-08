import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "@/features/auth/login-page";
import AppShell from "@/components/layout/app-shell";
import StudentDetailPage from "@/features/students/student-detail-page";
import StudentManagementPage from "@/features/students/student-management-page";
import ClassManagementPage from "@/features/class-management/class-management-page";
import { ProtectedRoute } from "./protected-route";
import ClassSessionDetailPage from "@/features/class-management/class-session-detail-page";
import CompensationsPage from "@/features/compensations/compensations-page";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppShell />,
        children: [
          { path: "/", element: <Navigate to="/student-management" replace /> },
          { path: "/student-management", element: <StudentManagementPage /> },
          { path: "/student-management/:id", element: <StudentDetailPage /> },
          { path: "/class-management", element: <ClassManagementPage /> },
          {
            path: "/class-management/:id",
            element: <ClassSessionDetailPage />,
          },
          { path: "/compensations", element: <CompensationsPage /> },
          // { path: "/bookings/:id", element: <BookingSessionDetailPage /> },
          // { path: "/credit-packages", element: <CreditPackagesPage /> },
          // { path: "/branches", element: <BranchesPage /> },
          // { path: "/courses", element: <CoursesPage /> },
        ],
      },
    ],
  },
]);
