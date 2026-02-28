'use client';
import './globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Target, Activity, History, LogOut, Zap } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Estratégias', href: '/strategies', icon: Target },
  { name: 'Posições', href: '/positions', icon: Activity },
  { name: 'Histórico', href: '/history', icon: History },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return (
      <html lang="en">
        <body className="bg-[#0a0a0a] text-slate-200 antialiased font-sans">
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-slate-200 antialiased font-sans flex min-h-screen">

        {/* Sidebar */}
        <aside className="fixed left-0 top-0 bottom-0 w-24 md:w-72 bg-white/[0.01] backdrop-blur-3xl border-r border-white/5 flex flex-col items-center py-10 z-50">
           <div className="p-4 bg-[#00ff88]/10 rounded-2xl border border-[#00ff88]/30 shadow-[0_0_20px_rgba(0,255,136,0.2)] mb-12">
              <Zap size={28} className="text-[#00ff88]" fill="#00ff88" />
           </div>

           <nav className="flex-1 w-full px-4 space-y-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all group relative ${isActive ? 'bg-[#00ff88]/10 border border-[#00ff88]/20 text-white' : 'text-slate-500 hover:text-white hover:bg-white/[0.03]'}`}
                  >
                    <item.icon size={20} className={isActive ? 'text-[#00ff88]' : 'group-hover:text-[#00ff88] transition-colors'} />
                    <span className="hidden md:block text-xs font-black uppercase tracking-widest">{item.name}</span>
                    {isActive && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#00ff88] rounded-l-full shadow-[0_0_15px_#00ff88]"></div>
                    )}
                  </Link>
                );
              })}
           </nav>

           <div className="w-full px-4 mt-auto">
              <Link
                href="/login"
                className="flex items-center gap-4 px-6 py-4 rounded-2xl text-rose-500 hover:bg-rose-500/10 transition-all group"
              >
                <LogOut size={20} />
                <span className="hidden md:block text-xs font-black uppercase tracking-widest">Logout</span>
              </Link>
           </div>
        </aside>

        {/* Content */}
        <div className="flex-1 ml-24 md:ml-72 transition-all relative">
          {/* Global Background Glow */}
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
             <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00ff88]/5 rounded-full blur-[120px]"></div>
             <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00d4ff]/5 rounded-full blur-[120px]"></div>
          </div>
          {children}
        </div>

      </body>
    </html>
  );
}
