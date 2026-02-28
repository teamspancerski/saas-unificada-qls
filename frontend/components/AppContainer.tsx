'use client';

import React from 'react';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import { usePathname } from 'next/navigation';

export default function AppContainer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex p-4 md:p-8 gap-8 max-w-[1800px] mx-auto min-h-screen">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <TopHeader />
        {children}
      </main>
    </div>
  );
}
