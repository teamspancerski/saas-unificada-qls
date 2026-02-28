'use client';

import React, { useState } from 'react';
import { Bell, Search, User, LogOut, Settings, CreditCard, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function TopHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="flex items-center justify-between mb-8 px-2">
      {/* Search Bar Glass */}
      <div className="hidden md:flex items-center gap-4 px-6 py-3 bg-white/[0.03] border border-white/10 rounded-2xl w-96 backdrop-blur-md group focus-within:border-[#00ff88]/30 transition-all">
        <Search size={18} className="text-slate-500 group-focus-within:text-[#00ff88] transition-colors" />
        <input
          type="text"
          placeholder="BUSCAR ESTRATÉGIA OU PAR..."
          className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-widest text-slate-200 w-full placeholder:text-slate-600"
        />
      </div>

      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative p-3 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/5 transition-all group">
          <Bell size={20} className="text-slate-400 group-hover:text-white transition-colors" />
          <span className="absolute top-3 right-3 w-2 h-2 bg-[#00ff88] rounded-full shadow-[0_0_10px_#00ff88]"></span>
        </button>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 p-1.5 pr-4 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/5 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-white/5">
              <User size={20} className="text-slate-400" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-[10px] font-black text-white uppercase tracking-widest">Trader QLS</p>
              <p className="text-[9px] font-bold text-[#00ff88] uppercase tracking-widest">Elite</p>
            </div>
            <ChevronDown size={14} className={`text-slate-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-4 w-56 bg-[#0a0a0a] border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-3xl z-[100] animate-in fade-in zoom-in-95 duration-200">
              <Link href="/profile" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all">
                <User size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Meu Perfil</span>
              </Link>
              <Link href="/settings" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all">
                <Settings size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Configurações</span>
              </Link>
              <Link href="/plans" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all">
                <CreditCard size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Meu Plano</span>
              </Link>
              <div className="h-px bg-white/5 my-2"></div>
              <Link href="/login" className="flex items-center gap-3 p-3 rounded-xl hover:bg-rose-500/10 text-rose-500 transition-all">
                <LogOut size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Sair da Conta</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
