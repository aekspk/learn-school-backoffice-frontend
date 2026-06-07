import { Outlet, useNavigate } from "react-router-dom";
import { useGetProfile, useLogout } from "@/features/auth/hooks/api";
import AppSidebar from "@/components/layout/app-sidebar";
import AppHeader from "@/components/layout/app-header";

export default function AppShell() {
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();
  const { data: profile } = useGetProfile();

  const handleLogout = () => {
    logout(undefined, {
      onSettled: () => {
        localStorage.clear();
        navigate("/login");
      },
    });
  };

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader profile={profile} onLogout={handleLogout} />
        <main className="flex-1 p-6 bg-gray-50 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
