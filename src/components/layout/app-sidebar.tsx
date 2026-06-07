import { Link, useLocation } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { navItems } from "./nav-items";
import type { User } from "@/types/api";

interface AppSidebarProps {
  profile: User | undefined;
}

export default function AppSidebar({ profile }: AppSidebarProps) {
  const location = useLocation();
  return (
    <aside className="w-64 shrink-0 fixed left-0 top-0 h-full bg-muted/40 border-r border-border flex flex-col z-50">
      <div className="px-6 pt-6 pb-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
          <GraduationCap className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-base font-bold text-foreground leading-tight">
            Learn School
          </h1>
          <p className="text-[11px] text-muted-foreground">Admin Portal</p>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-0.5">
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
                  "flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-150",
                  active
                    ? "text-primary font-bold border-r-4 border-primary bg-primary/10"
                    : "text-muted-foreground font-medium hover:bg-muted hover:text-foreground border-r-4 border-transparent"
                )}
              >
                <Icon
                  className={cn(
                    "size-4 shrink-0",
                    active ? "text-primary" : "text-muted-foreground"
                  )}
                />
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 mt-auto">
        <div className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border shadow-sm">
          <div className="w-9 h-9 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary text-xs font-bold shrink-0">
            {profile?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-foreground truncate">
              {profile?.name ?? "User"}
            </p>
            <p className="text-[11px] text-muted-foreground truncate">
              {profile?.email ?? ""}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
