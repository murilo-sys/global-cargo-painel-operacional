import Logout from "@/components/layout/Sidebar/Logout/Logout";
import Sidebar from "@/components/layout/Sidebar/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh bg-blue-950 text-white flex flex-row">
      <div className="fixed flex flex-col items-center gap-3 left-4 top-1/2 -translate-y-1/2 animate-in fade-in duration-1000 z-40">
        <Sidebar />
        <Logout />
      </div>

      <main className="flex-1 pl-24 pr-6 py-6">{children}</main>
    </div>
  );
}
