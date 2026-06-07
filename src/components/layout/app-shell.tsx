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
    <div className="flex h-screen w-full overflow-hidden">
      <AppSidebar profile={profile} />
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <AppHeader profile={profile} onLogout={handleLogout} />
        <main className="flex-1 p-8 bg-background overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
