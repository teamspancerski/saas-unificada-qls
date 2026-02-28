'use client';

import React from 'react';
import { Target, Zap, TrendingUp, BarChart3, Clock, DollarSign, ArrowUpRight, ArrowDownRight, MoreHorizontal, XCircle, Search, Filter, Download, Activity } from 'lucide-react';

export default function PositionsPage() {
  const positions = [
    { symbol: 'BTCUSDT', side: 'LONG', size: '1.25 BTC', entry: '$64,520', current: '$65,340', pnl: '+$1,025.00', status: 'ACTIVE' },
    { symbol: 'ETHUSDT', side: 'SHORT', size: '15.5 ETH', entry: '$3,450', current: '$3,410', pnl: '+$620.00', status: 'ACTIVE' },
    { symbol: 'SOLUSDT', side: 'LONG', size: '250 SOL', entry: '$145.2', current: '$142.8', pnl: '-$600.00', status: 'ACTIVE' },
    { symbol: 'ADAUSDT', side: 'LONG', size: '10,000 ADA', entry: '$0.45', current: '$0.46', pnl: '+$100.00', status: 'CLOSED' },
  ];

  const totalPnL = '+$1,145.00';
  const openPositions = 3;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <h2 className="text-xl font-black bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent uppercase tracking-tighter flex items-center gap-3">
          <Activity size={24} className="text-[#00ff88]" />
          Monitoramento de Execução
        </h2>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#00ff88] transition-colors" size={16} />
            <input
              type="text"
              placeholder="BUSCAR POSIÇÃO..."
              className="pl-12 pr-6 py-3 bg-white/[0.03] border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-200 focus:border-[#00ff88]/30 outline-none w-64 transition-all"
            />
          </div>
          <button className="p-3 bg-white/[0.03] border border-white/10 rounded-2xl text-slate-500 hover:text-white transition-all">
            <Filter size={18} />
          </button>
          <button className="p-3 bg-white/[0.03] border border-white/10 rounded-2xl text-slate-500 hover:text-white transition-all">
            <Download size={18} />
          </button>
        </div>
      </div>

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-10 bg-black/40 border border-[#00ff88]/20 rounded-[2.5rem] backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,136,0.05)]">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-[#00ff88]/10 rounded-2xl border border-[#00ff88]/30 shadow-[0_0_15px_rgba(0,255,136,0.2)]">
            <BarChart3 size={32} className="text-[#00ff88]" fill="#00ff88" />
          </div>
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-[#00ff88] to-[#00d4ff] bg-clip-text text-transparent uppercase tracking-tighter">
              Posições em Aberto
            </h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Monitoramento de execução em tempo real</p>
          </div>
        </div>

        <div className="flex items-center gap-8 border-l border-slate-800 pl-8">
           <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total P&L</span>
              <span className="text-3xl font-black text-[#00ff88] shadow-[#00ff88]/20 drop-shadow-sm">{totalPnL}</span>
           </div>
           <div className="flex flex-col border-l border-slate-800 pl-8">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Open Positions</span>
              <span className="text-3xl font-black text-[#00d4ff]">{openPositions}</span>
           </div>
        </div>
      </header>

      {/* Table Glassmorphism */}
      <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] backdrop-blur-md overflow-hidden p-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                <th className="px-8 py-6">Par</th>
                <th className="px-8 py-6">Side</th>
                <th className="px-8 py-6">Lotes / Size</th>
                <th className="px-8 py-6">Entrada</th>
                <th className="px-8 py-6">Preço Atual</th>
                <th className="px-8 py-6">P&L Dinâmico</th>
                <th className="px-8 py-6 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-bold">
              {positions.map((pos, idx) => {
                const isPnLPositive = pos.pnl.startsWith('+');
                return (
                  <tr key={idx} className="group hover:bg-white/[0.03] transition-colors duration-300">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_10px_#00ff88]"></div>
                        <span className="text-slate-100">{pos.symbol}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest ${
                        pos.side === 'LONG' ? 'bg-[#00ff88]/10 text-[#00ff88]' : 'bg-rose-500/10 text-rose-500'
                      }`}>
                        {pos.side === 'LONG' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {pos.side}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-slate-300 font-mono text-sm">{pos.size}</td>
                    <td className="px-8 py-6 text-slate-500 font-mono text-sm">{pos.entry}</td>
                    <td className="px-8 py-6 text-slate-200 font-mono text-sm">{pos.current}</td>
                    <td className={`px-8 py-6 text-lg font-black tracking-tight ${isPnLPositive ? 'text-[#00ff88]' : 'text-rose-500'}`}>
                       {pos.pnl}
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                         <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all">
                           <Zap size={18} />
                         </button>
                         <button className="p-3 bg-rose-500/10 hover:bg-rose-500/20 rounded-xl text-rose-500 transition-all">
                           <XCircle size={18} />
                         </button>
                       </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
