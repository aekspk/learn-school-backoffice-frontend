import { Search, Bell, Settings, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "@/types/api";

interface AppHeaderProps {
  profile: User | undefined;
  onLogout: () => void;
}

export default function AppHeader({ profile, onLogout }: AppHeaderProps) {
  return (
    <header className="h-16 border-b bg-background px-8 flex items-center justify-between shrink-0 sticky top-0 z-40 shadow-sm">
      <span className="text-lg font-bold text-primary">
        Learn School : {profile?.branchName ?? ""}
      </span>

      <div className="flex items-center gap-5">
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search students..."
            className="pl-9 pr-4 py-2 bg-muted rounded-full border-none focus:outline-none focus:ring-2 focus:ring-primary/20 w-60 text-sm"
          />
        </div>

        <div className="flex items-center gap-1">
          <button className="h-9 w-9 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <Bell className="h-4.5 w-4.5" />
          </button>
          <button className="h-9 w-9 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <Settings className="h-4.5 w-4.5" />
          </button>
        </div>

        <div className="h-5 w-px bg-border" />

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-muted outline-none transition-colors">
            <div className="size-8 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary text-xs font-bold shrink-0">
              {profile?.name?.[0]?.toUpperCase() ?? "U"}
            </div>
            <span className="font-medium text-muted-foreground hidden sm:block">
              {profile?.name ?? "User"}
            </span>
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>{profile?.email ?? ""}</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={onLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
