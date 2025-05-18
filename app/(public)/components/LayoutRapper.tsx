'use client';
import { usePathname } from 'next/navigation';
import Header from '@/app/(public)/components/Header';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/app/(admin)/components/AppSidebar';
import AppHeader from '@/app/(admin)/components/Header';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith('/app');

  if (isDashboardRoute) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full bg-white dark:bg-slate-900">
          <SidebarTrigger />
          <AppHeader />
          <div className="px-4 sm:px-6">{children}</div>
        </main>
      </SidebarProvider>
    );
  }

  return (
    <div className="px-4 sm:px-16 dark:bg-slate-900">
      <Header />
      {children}
    </div>
  );
}
