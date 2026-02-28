'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Target,
  Activity,
  History,
  Zap,
  ChevronRight,
  User,
  LogOut,
  Settings,
  CreditCard
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Estratégias', href: '/strategies', icon: <Target size={20} /> },
    { name: 'Posições', href: '/positions', icon: <Activity size={20} /> },
    { name: 'Histórico', href: '/history', icon: <History size={20} /> },
    { name: 'Configurações', href: '/settings', icon: <Settings size={20} /> },
    { name: 'Meu Perfil', href: '/profile', icon: <User size={20} /> },
    { name: 'Planos', href: '/plans', icon: <CreditCard size={20} /> },
  ];

  const isAuthPage = pathname === '/login' || pathname === '/register';
  if (isAuthPage) return null;

  return (
    <aside className="w-[280px] h-[calc(100vh-4rem)] sticky top-8 left-8 hidden xl:flex flex-col bg-white/[0.03] border border-white/10 backdrop-blur-3xl rounded-[2.5rem] p-8 shadow-2xl overflow-hidden group">
      {/* Background Glows */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#00ff88]/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-[#00ff88]/10 transition-all"></div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex items-center gap-4 mb-14 px-2">
          <div className="p-3 bg-[#00ff88]/10 rounded-xl border border-[#00ff88]/30 shadow-[0_0_15px_rgba(0,255,136,0.1)]">
             <Zap size={22} className="text-[#00ff88]" fill="#00ff88" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black bg-gradient-to-r from-[#00ff88] to-[#00d4ff] bg-clip-text text-transparent tracking-tighter uppercase">QLS PREM</span>
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">SaaS Quant Engine</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-3">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 group/link ${
                  isActive
                    ? 'bg-[#00ff88] text-black border-[#00ff88] shadow-[0_0_15px_rgba(0,255,136,0.2)]'
                    : 'bg-white/0 text-slate-400 border-white/0 hover:bg-white/5 hover:text-white hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-4">
                  {link.icon}
                  <span className="text-[10px] font-black uppercase tracking-widest">{link.name}</span>
                </div>
                <ChevronRight size={14} className={`transition-transform duration-300 ${isActive ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover/link:translate-x-0 group-hover/link:opacity-100'}`} />
              </Link>
            );
          })}
        </nav>

        {/* User Dropdown / Profile Section */}
        <div className="mt-auto space-y-4">
          <div className="p-4 bg-black/40 border border-white/5 rounded-2xl group/user cursor-pointer transition-all hover:border-white/10">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-slate-800 rounded-xl text-slate-400 group-hover/user:text-white transition-colors">
                 <User size={20} />
              </div>
              <div className="flex flex-col">
                 <span className="text-[10px] font-black text-white uppercase tracking-widest truncate max-w-[120px]">Trader QLS</span>
                 <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Plano Elite</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
             <button className="p-4 bg-white/5 border border-white/0 hover:border-white/10 rounded-2xl text-slate-500 hover:text-white transition-all flex items-center justify-center">
                <Settings size={18} />
             </button>
             <Link href="/login" className="p-4 bg-rose-500/5 border border-rose-500/0 hover:border-rose-500/10 rounded-2xl text-rose-500 transition-all flex items-center justify-center">
                <LogOut size={18} />
             </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
