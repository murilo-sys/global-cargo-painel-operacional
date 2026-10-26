"use client";

import { logoutAction } from "@/actions/sidebar/logout.actions";
import { LogOut } from "lucide-react";

export default function Logout() {
  return (
    <button
      onClick={() => {
        logoutAction();
      }}
      aria-label="Sair da conta"
      className="group h-11 w-11 cursor-pointer flex justify-center items-center"
    >
      <LogOut className="group-hover:stroke-red-500 transition-all duration-300" />
    </button>
  );
}
