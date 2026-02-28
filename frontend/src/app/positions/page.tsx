'use client';
import { Target, TrendingUp, Zap, BarChart3, Clock, DollarSign, Activity } from 'lucide-react';

const positions = [
  { symbol: 'BTCUSDT', side: 'BUY', size: '0.45', entry: '42,350', pnl: '+$420', pnlPercent: '+2.4%', color: '#00ff88', score: '92%' },
  { symbol: 'ETHUSDT', side: 'SELL', size: '2.10', entry: '2,480', pnl: '-$120', pnlPercent: '-1.1%', color: '#f43f5e', score: '78%' },
  { symbol: 'SOLUSDT', side: 'BUY', size: '12.5', entry: '102.40', pnl: '+$58', pnlPercent: '+0.8%', color: '#00ff88', score: '85%' },
];

export default function PositionsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-slate-200 selection:bg-[#00ff88]/30 font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
             <div className="w-1.5 h-10 bg-[#00ff88] rounded-full shadow-[0_0_15px_#00ff88]"></div>
             <div>
                <h1 className="text-3xl font-black tracking-tight text-white uppercase">Posições Abertas</h1>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Terminal de Execução ao Vivo</p>
             </div>
          </div>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4 backdrop-blur-md">
                <Activity size={20} className="text-[#00ff88]" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ativo: 3/5 Max</span>
            </div>
          </div>
        </header>

        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                        <th className="pb-6">Par/Symbol</th>
                        <th className="pb-6">Lado</th>
                        <th className="pb-6">Lotes</th>
                        <th className="pb-6">Entrada</th>
                        <th className="pb-6">PnL Total</th>
                        <th className="pb-6">Score Engine</th>
                        <th className="pb-6 text-right">Ações</th>
                    </tr>
                </thead>
                <tbody className="text-sm font-bold">
                    {positions.map((p, idx) => (
                        <tr key={idx} className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors group">
                            <td className="py-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-6 bg-white/10 rounded-full group-hover:bg-[#00ff88] transition-colors"></div>
                                    <span className="text-lg font-black">{p.symbol}</span>
                                </div>
                            </td>
                            <td className="py-6">
                                <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black tracking-widest border border-white/5 shadow-sm`} style={{ backgroundColor: `${p.color}10`, color: p.color }}>
                                    {p.side}
                                </span>
                            </td>
                            <td className="py-6 font-mono text-slate-400">{p.size}</td>
                            <td className="py-6 text-slate-400 font-mono">${p.entry}</td>
                            <td className="py-6">
                                <div className="flex flex-col">
                                    <span className="text-lg font-black" style={{ color: p.color }}>{p.pnl}</span>
                                    <span className="text-[10px] font-bold text-slate-500">{p.pnlPercent}</span>
                                </div>
                            </td>
                            <td className="py-6">
                                <span className="text-[10px] font-black text-[#00ff88] px-2 py-0.5 bg-[#00ff88]/5 rounded-md border border-[#00ff88]/10">{p.score}</span>
                            </td>
                            <td className="py-6 text-right">
                                <button className="px-5 py-2.5 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-rose-500/20">
                                    Fechar Mercado
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-4">Margem Utilizada</p>
                <div className="text-3xl font-black text-white">42.5%</div>
                <div className="mt-4 w-full bg-black/40 h-2 rounded-full overflow-hidden border border-white/5">
                    <div className="bg-[#00ff88] h-full w-[42.5%] shadow-[0_0_15px_#00ff88]"></div>
                </div>
            </div>
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-4">PnL Aberto</p>
                <div className="text-3xl font-black text-[#00ff88]">+$358.00</div>
                <div className="mt-2 text-[10px] font-bold text-slate-500">Lucro não realizado</div>
            </div>
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-4">Exposição Total</p>
                <div className="text-3xl font-black text-[#00d4ff]">$5,240.00</div>
                <div className="mt-2 text-[10px] font-bold text-slate-500">3 pares ativos</div>
            </div>
        </div>

      </div>
    </main>
  );
}
