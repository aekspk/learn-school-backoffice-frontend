import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import LoginPage from "@/features/auth/LoginPage";
import AppShell from "@/components/layout/AppShell";
import BookingsPage from "@/features/bookings/BookingsPage";
import CreditPackagesPage from "@/features/credit-packages/CreditPackagesPage";
import StudentsPage from "@/features/students/StudentsPage";
import ClassSessionsPage from "@/features/class-sessions/ClassSessionsPage";
import AttendanceListPage from "@/features/class-sessions/AttendanceListPage";
import ClassSessionRosterPage from "@/features/class-sessions/ClassSessionRosterPage";
import CompensationsPage from "@/features/compensations/CompensationsPage";
import BranchesPage from "@/features/branches/BranchesPage";
import CoursesPage from "@/features/courses/CoursesPage";

function ProtectedRoute() {
  const token = localStorage.getItem("accessToken");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    element: <ProtectedRoute />,
    children: [{
      element: <AppShell />,
      children: [
        { path: "/", element: <BookingsPage /> },
        { path: "/attendance", element: <AttendanceListPage /> },
        { path: "/attendance/:id", element: <ClassSessionRosterPage /> },
        { path: "/credit-packages", element: <CreditPackagesPage /> },
        { path: "/students", element: <StudentsPage /> },
        { path: "/class-sessions", element: <ClassSessionsPage /> },
        { path: "/compensations", element: <CompensationsPage /> },
        { path: "/branches", element: <BranchesPage /> },
        { path: "/courses", element: <CoursesPage /> },
      ],
    }],
  },
]);
