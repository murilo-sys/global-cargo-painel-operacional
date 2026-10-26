"use client";

import { NAV_ITEMS } from "@/config/sidebar";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Menu de Navegação Principal"
      className="flex flex-col gap-3 rounded-full border border-blue-900/40 bg-[#001026]/90 p-2 shadow-2xl"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return <SidebarItem key={item.id} item={item} isActive={isActive} />;
      })}
    </aside>
  );
}
