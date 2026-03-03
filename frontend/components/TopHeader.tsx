'use client';
import { useState } from 'react';
import { Search, Bell, Wallet, User, Zap } from 'lucide-react';
import { ethers } from 'ethers';

const TopHeader = () => {
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    if ((window as any).ethereum) {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
    } else {
      alert("Rabby or Metamask not found");
    }
  };

  return (
    <header className="h-20 glass border-b border-white/10 px-8 flex items-center justify-between z-40 fixed top-0 right-0 left-64 backdrop-blur-3xl shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#00ff88] transition-colors" size={18} />
          <input
            type="text"
            placeholder="Pesquisar ativos, ordens ou sinais..."
            className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold text-slate-300 focus:outline-none focus:border-[#00ff88]/50 transition-all placeholder:text-slate-600"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 px-4 py-2 bg-[#00ff88]/5 border border-[#00ff88]/10 rounded-xl">
          <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></div>
          <span className="text-[10px] font-black text-[#00ff88] uppercase tracking-[0.2em]">Motor QLC: ON</span>
        </div>

        <button className="p-3 glass rounded-xl text-slate-400 hover:text-white hover:border-white/20 transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#00ff88] rounded-full ring-4 ring-[#0a0a0a]"></span>
        </button>

        <button
          onClick={connectWallet}
          className="flex items-center gap-3 px-6 py-3 glass hover:border-[#00ff88]/50 rounded-2xl transition-all group"
        >
          <Wallet size={18} className="text-slate-400 group-hover:text-[#00ff88] transition-colors" />
          <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">
            {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'CONECTAR CARTEIRA'}
          </span>
        </button>

        <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-slate-400 hover:text-[#00ff88] cursor-pointer transition-all hover:border-[#00ff88]/50 overflow-hidden">
          <User size={24} />
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
