import { Link, useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils/cn";
import { navItems } from "./nav-items";

export default function AppSidebar() {
  const location = useLocation();
  return (
    <aside className="w-52 shrink-0 border-r bg-white flex flex-col">
      <div className="p-4 font-semibold text-sm">Learn School</div>
      <Separator />
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active =
            item.to === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.to);
          return (
            <Link key={item.to} to={item.to}>
              <span
                className={cn(
                  "flex items-center gap-2.5 rounded px-3 py-2 text-sm hover:bg-gray-100",
                  active && "bg-gray-100 font-medium",
                )}
              >
                <Icon className="size-4 shrink-0 text-muted-foreground" />
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
