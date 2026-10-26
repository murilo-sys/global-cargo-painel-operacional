import { LucideIcon, ClipboardList, MapPin } from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: readonly NavItem[] = [
  {
    id: "operational",
    label: "Informações Operacionais",
    href: "/",
    icon: ClipboardList
  },
  {
    id: "routes",
    label: "Roteirizador",
    href: "/route",
    icon: MapPin
  }
] as const;
