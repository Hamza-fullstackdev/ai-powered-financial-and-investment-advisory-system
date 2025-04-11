"use client";
import { usePathname } from "next/navigation";
import Header from "@/app/(public)/components/Header";
import AdminSidebar from "@/app/(admin)/components/Sidebar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith("/app");

  if (isDashboardRoute) {
    return (
      <div className="flex h-screen">
        <AdminSidebar/>
        <div className="w-full p-5 h-screen overflow-y-scroll">{children}</div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      {children}
    </div>
  );
}