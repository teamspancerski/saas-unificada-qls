'use client';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import { usePathname } from 'next/navigation';

export default function AppContainer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login';

  if (isAuthPage) {
    return <main className="min-h-screen bg-[#0a0a0a] text-slate-200">{children}</main>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64 min-h-screen">
        <TopHeader />
        <main className="flex-1 pt-20 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
