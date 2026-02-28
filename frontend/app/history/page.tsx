'use client';

import React from 'react';
import { Calendar, Filter, Download, ArrowUpRight, ArrowDownRight, TrendingUp, History, BarChart3, Clock } from 'lucide-react';

export default function HistoryPage() {
  const trades = [
    { date: '12/04 14:22', symbol: 'BTCUSDT', side: 'BUY', result: 'WIN', pnl: '+$425.20', score: '92%' },
    { date: '12/04 11:15', symbol: 'ETHUSDT', side: 'SELL', result: 'WIN', pnl: '+$185.00', score: '88%' },
    { date: '11/04 18:40', symbol: 'SOLUSDT', side: 'BUY', result: 'LOSS', pnl: '-$120.40', score: '76%' },
    { date: '11/04 09:12', symbol: 'BTCUSDT', side: 'SELL', result: 'WIN', pnl: '+$610.15', score: '94%' },
    { date: '10/04 22:30', symbol: 'ADAUSDT', side: 'BUY', result: 'WIN', pnl: '+$85.00', score: '82%' },
    { date: '10/04 16:55', symbol: 'LINKUSDT', side: 'BUY', result: 'LOSS', pnl: '-$45.20', score: '79%' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-[#00ff88] to-[#00d4ff] bg-clip-text text-transparent uppercase tracking-tighter">
            Histórico de Trades
          </h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Performance histórica e auditoria QLC</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-xs font-bold text-slate-300">
            <Filter size={16} /> FILTRAR
          </button>
          <button className="flex items-center gap-2 px-5 py-3 bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-2xl hover:bg-[#00ff88]/20 transition-all text-xs font-bold text-[#00ff88]">
            <Download size={16} /> EXPORTAR
          </button>
        </div>
      </header>

      {/* Grid: Charts + Summary */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* P&L Accumulation Chart Mock */}
        <div className="xl:col-span-2 bg-black/40 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-3xl shadow-2xl overflow-hidden relative group">
           {/* Chart Background Glow */}
           <div className="absolute inset-0 bg-gradient-to-t from-[#00ff88]/5 to-transparent pointer-events-none group-hover:from-[#00ff88]/10 transition-all"></div>

           <div className="relative z-10">
              <div className="flex items-center justify-between mb-10">
                 <h2 className="text-xl font-bold flex items-center gap-3">
                    <BarChart3 size={24} className="text-[#00ff88]" />
                    P&L ACUMULADO
                 </h2>
                 <div className="flex gap-2 p-1 bg-black/40 rounded-xl border border-white/5">
                    {['7D', '30D', '90D', 'MAX'].map(p => <span key={p} className={`px-4 py-1.5 rounded-lg text-[10px] font-black cursor-pointer transition-all ${p === '30D' ? 'bg-[#00ff88] text-black shadow-[0_0_15px_rgba(0,255,136,0.3)]' : 'text-slate-500 hover:text-white'}`}>{p}</span>)}
                 </div>
              </div>

              <div className="h-[300px] w-full bg-black/40 rounded-3xl border border-white/5 overflow-hidden flex items-end px-10 gap-4">
                 {/* Bar Chart Mock */}
                 {[40, 60, 45, 80, 55, 90, 75, 100, 85, 110, 95, 130].map((h, i) => (
                    <div key={i} className="flex-1 group/bar relative">
                       <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 p-2 bg-[#00ff88] text-black text-[9px] font-black rounded-lg opacity-0 group-hover/bar:opacity-100 transition-all pointer-events-none">
                          +${h * 15}
                       </div>
                       <div style={{ height: `${h}%` }} className={`w-full rounded-t-xl transition-all duration-700 delay-[${i*50}ms] ${i === 11 ? 'bg-[#00ff88] shadow-[0_0_20px_#00ff88]' : 'bg-[#00ff88]/20 group-hover/bar:bg-[#00ff88]/40'}`}></div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Stats Column */}
        <div className="space-y-6">
           <div className="p-8 bg-[#00ff88]/5 border border-[#00ff88]/20 rounded-[2.5rem] backdrop-blur-xl">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Total Profit</span>
              <div className="text-4xl font-black text-[#00ff88]">+$12,450.00</div>
              <div className="flex items-center gap-2 mt-4">
                 <TrendingUp size={14} className="text-[#00ff88]" />
                 <span className="text-xs font-bold text-[#00ff88]">+12.4% este mês</span>
              </div>
           </div>
           <div className="p-8 bg-black/40 border border-white/10 rounded-[2.5rem] backdrop-blur-xl">
              <div className="grid grid-cols-2 gap-8">
                 <div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Trades Realizados</span>
                    <span className="text-2xl font-black">247</span>
                 </div>
                 <div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Win Rate</span>
                    <span className="text-2xl font-black text-[#00d4ff]">62.4%</span>
                 </div>
                 <div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Maior Gain</span>
                    <span className="text-2xl font-black text-[#00ff88]">+$1.2k</span>
                 </div>
                 <div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Drawdown Máx</span>
                    <span className="text-2xl font-black text-rose-500">-1.2%</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] backdrop-blur-md overflow-hidden p-2 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                <th className="px-8 py-6">Data & Hora</th>
                <th className="px-8 py-6">Par / Asset</th>
                <th className="px-8 py-6">Side</th>
                <th className="px-8 py-6">Resultado</th>
                <th className="px-8 py-6">Score QLC</th>
                <th className="px-8 py-6">PnL Realizado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-bold">
              {trades.map((trade, idx) => (
                <tr key={idx} className="hover:bg-white/[0.03] transition-colors duration-300">
                  <td className="px-8 py-6 text-slate-500 font-mono text-sm">{trade.date}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                       <History size={16} className="text-slate-600" />
                       <span>{trade.symbol}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest ${
                      trade.side === 'BUY' ? 'bg-[#00ff88]/10 text-[#00ff88]' : 'bg-rose-500/10 text-rose-500'
                    }`}>
                      {trade.side}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${trade.result === 'WIN' ? 'bg-[#00ff88]' : 'bg-rose-500'}`}></div>
                      <span className={`text-[10px] uppercase tracking-widest ${trade.result === 'WIN' ? 'text-[#00ff88]' : 'text-rose-500'}`}>{trade.result}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                     <div className="flex items-center gap-4">
                        <span className="text-slate-100 font-mono text-sm">{trade.score}</span>
                        <div className="w-20 h-1 bg-white/5 rounded-full overflow-hidden">
                           <div style={{ width: trade.score }} className="h-full bg-[#00ff88]"></div>
                        </div>
                     </div>
                  </td>
                  <td className={`px-8 py-6 text-lg font-black tracking-tight ${trade.result === 'WIN' ? 'text-[#00ff88]' : 'text-rose-500'}`}>
                    {trade.pnl}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-8 border-t border-white/5 text-center">
           <button className="text-[10px] font-black text-slate-500 hover:text-[#00ff88] uppercase tracking-[0.4em] transition-colors">Carregar Mais Trades</button>
        </div>
      </div>
    </div>
  );
}
