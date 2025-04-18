'use client';
import { usePathname } from 'next/navigation';
import Header from '@/app/(public)/components/Header';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/app/(admin)/components/AppSidebar';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith('/app');

  if (isDashboardRoute) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    );
  }

  return (
    <div className="px-4 sm:px-16">
      <Header />
      {children}
    </div>
  );
}
