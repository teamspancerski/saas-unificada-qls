'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Target, BarChart3, History, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Estratégias', icon: Target, href: '/strategies' },
    { name: 'Posições', icon: BarChart3, href: '/positions' },
    { name: 'Histórico', icon: History, href: '/history' },
  ];

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 glass border-r border-white/10 flex flex-col z-50">
      <div className="p-8">
        <h1 className="text-2xl font-black bg-gradient-to-r from-[#00ff88] to-[#00d4ff] bg-clip-text text-transparent tracking-tighter">
          QLS PREMIUM
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
                isActive
                  ? 'bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20 shadow-[0_0_15px_rgba(0,255,136,0.1)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={20} />
              <span className="font-bold text-sm uppercase tracking-wider">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-2">
        <Link
          href="/settings"
          className="flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <Settings size={20} />
          <span className="font-bold text-sm uppercase tracking-wider">Ajustes</span>
        </Link>
        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-rose-500 hover:bg-rose-500/10 transition-all">
          <LogOut size={20} />
          <span className="font-bold text-sm uppercase tracking-wider">Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
