import { BookOpenIcon, ClipboardListIcon, UsersIcon } from "lucide-react";
import type { ComponentType } from "react";

export interface NavItem {
  label: string;
  to: string;
  icon: ComponentType<{ className?: string }>;
}

export const navItems: NavItem[] = [
  { label: "Student Management", to: "/student-management", icon: UsersIcon },
  { label: "Class Management", to: "/class-management", icon: BookOpenIcon },
  { label: "Compensations", to: "/compensations", icon: ClipboardListIcon },
  // { label: "Bookings", to: "/", icon: BookmarkIcon },
  // { label: "Credit Packages", to: "/credit-packages", icon: CreditCardIcon },
  // { label: "Class Sessions", to: "/class-sessions", icon: BookOpenIcon },
  // { label: "Branches", to: "/branches", icon: BuildingIcon },
  // { label: "Courses", to: "/courses", icon: GraduationCapIcon },
];
