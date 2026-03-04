'use client';
import { BarChart3, Clock, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function Positions() {
  const positions = [
    { symbol: 'BTC/USDT', type: 'BUY', entry: 64245.12, current: 65120.45, pnl: '+1.36%', status: 'open', score: 92 },
    { symbol: 'ETH/USDT', type: 'SELL', entry: 3450.10, current: 3410.25, pnl: '+1.15%', status: 'open', score: 88 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Posições Abertas</h1>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Monitoramento em tempo real de trades ativos</p>
      </header>

      <div className="glass rounded-[2.5rem] p-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/10">
                <th className="pb-6">Par</th>
                <th className="pb-6">Tipo</th>
                <th className="pb-6">Entrada</th>
                <th className="pb-6">Preço Atual</th>
                <th className="pb-6">PnL (%)</th>
                <th className="pb-6">Score QLC</th>
                <th className="pb-6">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm font-bold">
              {positions.map((pos, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-6 font-mono">{pos.symbol}</td>
                  <td className="py-6">
                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                      pos.type === 'BUY' ? 'bg-[#00ff88]/10 text-[#00ff88] border-[#00ff88]/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                    }`}>
                      {pos.type}
                    </span>
                  </td>
                  <td className="py-6 text-slate-400">${pos.entry.toLocaleString()}</td>
                  <td className="py-6 text-slate-200">${pos.current.toLocaleString()}</td>
                  <td className="py-6">
                    <div className="flex items-center gap-2 text-[#00ff88]">
                      <ArrowUpRight size={14} />
                      <span>{pos.pnl}</span>
                    </div>
                  </td>
                  <td className="py-6 text-[#00ff88]">{pos.score}%</td>
                  <td className="py-6">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse"></div>
                      <span className="text-[10px] uppercase font-black">{pos.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
