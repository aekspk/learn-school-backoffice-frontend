import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import type { User } from "@/types/api";

interface AppHeaderProps {
  profile: User | undefined;
  onLogout: () => void;
}

export default function AppHeader({ profile, onLogout }: AppHeaderProps) {
  return (
    <header className="h-14 border-b bg-white px-6 flex items-center justify-end shrink-0 ">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-gray-100 outline-none">
          <div className="size-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium shrink-0">
            {profile?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <span>{profile?.name ?? "User"}</span>
          <ChevronDownIcon className="size-3.5 text-muted-foreground" />
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
    </header>
  );
}
