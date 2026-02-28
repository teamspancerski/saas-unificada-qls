'use client';
import './globals.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Target, Activity, History, LogOut, Zap,
  Settings, User, Star, Search, Microscope, Shield
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Estratégias', href: '/strategies', icon: Target },
  { name: 'Posições', href: '/positions', icon: Activity },
  { name: 'Histórico', href: '/history', icon: History },
  { name: 'Backtest', href: '/backtest', icon: Microscope },
  { name: 'Scanner', href: '/scanner', icon: Search },
  { name: 'Planos', href: '/plans', icon: Star },
  { name: 'Config', href: '/settings', icon: Settings },
  { name: 'Perfil', href: '/profile', icon: User },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isCyan, setIsCyan] = useState(false);
  const isLoginPage = pathname === '/login';

  const accentColor = isCyan ? '#00d4ff' : '#00ff88';
  const accentGlow = isCyan ? 'shadow-[0_0_15px_#00d4ff]' : 'shadow-[0_0_15px_#00ff88]';
  const accentBorder = isCyan ? 'border-[#00d4ff]/30' : 'border-[#00ff88]/30';
  const accentBg = isCyan ? 'bg-[#00d4ff]/10' : 'bg-[#00ff88]/10';

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
      <body className={`bg-[#0a0a0a] text-slate-200 antialiased font-sans flex min-h-screen ${isCyan ? 'cyan-mode' : 'green-mode'}`}>

        {/* Sidebar */}
        <aside className="fixed left-0 top-0 bottom-0 w-24 md:w-64 bg-white/[0.01] backdrop-blur-3xl border-r border-white/5 flex flex-col items-center py-8 z-50">
           <div className={`p-4 ${accentBg} rounded-2xl border ${accentBorder} shadow-[0_0_20px_rgba(0,255,136,0.1)] mb-10`}>
              <Zap size={28} style={{ color: accentColor }} fill={accentColor} />
           </div>

           <nav className="flex-1 w-full px-4 space-y-1 overflow-y-auto scrollbar-hide">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all group relative ${isActive ? `${accentBg} border ${accentBorder} text-white` : 'text-slate-500 hover:text-white hover:bg-white/[0.03]'}`}
                  >
                    <item.icon size={18} className={isActive ? '' : 'group-hover:text-white transition-colors'} style={{ color: isActive ? accentColor : undefined }} />
                    <span className="hidden md:block text-[10px] font-black uppercase tracking-widest">{item.name}</span>
                    {isActive && (
                      <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-l-full ${accentGlow}`} style={{ backgroundColor: accentColor }}></div>
                    )}
                  </Link>
                );
              })}

              {/* Admin Link if path includes admin */}
              <Link
                href="/admin/tenant"
                className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all group relative ${pathname.startsWith('/admin') ? 'bg-amber-500/10 border border-amber-500/20 text-white' : 'text-slate-500 hover:text-white hover:bg-white/[0.03]'}`}
              >
                <Shield size={18} className={pathname.startsWith('/admin') ? 'text-amber-500' : 'group-hover:text-amber-500 transition-colors'} />
                <span className="hidden md:block text-[10px] font-black uppercase tracking-widest">Admin</span>
              </Link>
           </nav>

           <div className="w-full px-4 mt-auto space-y-4 pt-6 border-t border-white/5">
              {/* Cyan Toggle */}
              <button
                onClick={() => setIsCyan(!isCyan)}
                className="w-full flex items-center justify-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 transition-all group"
                title="Trocar Cor de Sotaque"
              >
                <div className={`w-3 h-3 rounded-full ${isCyan ? 'bg-[#00d4ff]' : 'bg-[#00ff88]'} ${accentGlow}`}></div>
                <span className="hidden md:block text-[9px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white">Trocar Tema</span>
              </button>

              <Link
                href="/login"
                className="flex items-center gap-4 px-6 py-4 rounded-2xl text-rose-500 hover:bg-rose-500/10 transition-all group"
              >
                <LogOut size={20} />
                <span className="hidden md:block text-[10px] font-black uppercase tracking-widest">Logout</span>
              </Link>
           </div>
        </aside>

        {/* Content */}
        <div className="flex-1 ml-24 md:ml-64 transition-all relative">
          {/* Global Background Glow */}
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
             <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] opacity-20 rounded-full blur-[120px]" style={{ backgroundColor: isCyan ? '#00d4ff' : '#00ff88' }}></div>
             <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] opacity-20 rounded-full blur-[120px]" style={{ backgroundColor: isCyan ? '#00ff88' : '#00d4ff' }}></div>
          </div>
          {children}
        </div>

      </body>
    </html>
  );
}
