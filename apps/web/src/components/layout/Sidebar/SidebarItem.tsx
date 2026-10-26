"use client";

import { NavItem } from "@/config/sidebar";
import Link from "next/link";

interface SidebarItemProps {
  item: NavItem;
  isActive: boolean;
}

export default function SidebarItem({ item, isActive }: SidebarItemProps) {
  const Icon = item.icon;

  return (
    <div className="group relative flex items-center">
      <Link
        href={item.href}
        aria-label={item.label}
        aria-current={isActive ? "page" : undefined}
        className={`relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-600/50 scale-105" : "text-blue-300/60 hover:bg-blue-900/40 hover:text-white"}`}
      >
        <Icon className="h-6 w-6 stroke-2" />
      </Link>

      <div className="pointer-events-none absolute left-full ml-3 hidden rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-1.5 text-xs font-medium text-white shadow-xl group-hover:block whitespace-nowrap z-50">
        {item.label}
      </div>
    </div>
  );
}
