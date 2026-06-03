import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLogout } from "@/features/auth/hooks/api";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Bookings", to: "/" },
  { label: "Attendance", to: "/attendance" },
  { label: "Credit Packages", to: "/credit-packages" },
  { label: "Students", to: "/students" },
  { label: "Class Sessions", to: "/class-sessions" },
  { label: "Compensations", to: "/compensations" },
  { label: "Branches", to: "/branches" },
  { label: "Courses", to: "/courses" },
];

export default function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();
  const handleLogout = () => {
    logout(undefined, { onSettled: () => { localStorage.clear(); navigate("/login"); } });
  };
  return (
    <div className="flex min-h-screen">
      <aside className="w-52 shrink-0 border-r bg-white flex flex-col">
        <div className="p-4 font-semibold text-sm">Learn School</div>
        <Separator />
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>
              <span className={cn("block rounded px-3 py-2 text-sm hover:bg-gray-100", (item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to)) && "bg-gray-100 font-medium")}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
        <Separator />
        <div className="p-2">
          <Button variant="ghost" size="sm" className="w-full justify-start text-red-600 hover:text-red-600" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-6 bg-gray-50 overflow-auto"><Outlet /></main>
    </div>
  );
}
