'use client';
import { Search, Zap, TrendingUp, BarChart3, Activity, Clock, Filter } from 'lucide-react';

const scanData = [
  { pair: 'BTCUSDT', price: '42,350', change: '+2.4%', score: 95, signal: 'STRONG BUY', color: '#00ff88' },
  { pair: 'ETHUSDT', price: '2,480', change: '-1.1%', score: 82, signal: 'BUY', color: '#00ff88' },
  { pair: 'SOLUSDT', price: '102.40', change: '+5.8%', score: 88, signal: 'STRONG BUY', color: '#00ff88' },
  { pair: 'AVAXUSDT', price: '34.15', change: '-4.2%', score: 34, signal: 'NEUTRAL', color: '#94a3b8' },
  { pair: 'LINKUSDT', price: '18.20', change: '+0.5%', score: 67, signal: 'WAIT', color: '#f59e0b' },
  { pair: 'DOTUSDT', price: '7.12', change: '-2.8%', score: 21, signal: 'WEAK', color: '#f43f5e' },
];

export default function ScannerPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-slate-200 selection:bg-[#00ff88]/30 font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
             <div className="w-1.5 h-10 bg-[#00ff88] rounded-full shadow-[0_0_15px_#00ff88]"></div>
             <div>
                <h1 className="text-3xl font-black tracking-tight text-white uppercase">Scanner de Pares</h1>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Análise em Tempo Real de +200 Ativos</p>
             </div>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
                type="text"
                placeholder="BUSCAR PAR (EX: BTC)..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[#00ff88]/50 transition-all"
            />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3 bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                         <Activity size={20} className="text-[#00ff88]" />
                         <span className="text-xs font-black uppercase tracking-widest text-white">Ranking de Oportunidade</span>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
                        <Filter size={14} /> Filtrar Scores
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                                <th className="pb-6">Ativo</th>
                                <th className="pb-6">Preço</th>
                                <th className="pb-6">24h Vol</th>
                                <th className="pb-6">Score QLC</th>
                                <th className="pb-6">Sinal Engine</th>
                                <th className="pb-6 text-right">Ação</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-bold">
                            {scanData.map((d, idx) => (
                                <tr key={idx} className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors group">
                                    <td className="py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-6 bg-white/10 rounded-full group-hover:bg-[#00ff88] transition-colors"></div>
                                            <span className="text-lg font-black">{d.pair}</span>
                                        </div>
                                    </td>
                                    <td className="py-6 text-slate-400 font-mono">${d.price}</td>
                                    <td className="py-6">
                                        <span className={`text-[10px] font-bold ${d.change.startsWith('+') ? 'text-[#00ff88]' : 'text-rose-500'}`}>{d.change}</span>
                                    </td>
                                    <td className="py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 bg-black/40 rounded-full max-w-[60px] overflow-hidden">
                                                <div className="h-full rounded-full transition-all" style={{ width: `${d.score}%`, backgroundColor: d.color }}></div>
                                            </div>
                                            <span className="text-[10px] font-black" style={{ color: d.color }}>{d.score}</span>
                                        </div>
                                    </td>
                                    <td className="py-6">
                                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black tracking-widest border border-white/5`} style={{ backgroundColor: `${d.color}10`, color: d.color }}>
                                            {d.signal}
                                        </span>
                                    </td>
                                    <td className="py-6 text-right">
                                        <button className="p-3 bg-white/5 hover:bg-[#00ff88] hover:text-black rounded-xl transition-all">
                                            <Zap size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-3xl p-8 space-y-6">
                    <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-3">
                        <TrendingUp size={18} className="text-[#00ff88]" /> MÉTRICAS GLOBAIS
                    </h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Fear & Greed</p>
                            <p className="text-xl font-black text-amber-500">64 - Greed</p>
                        </div>
                        <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">BTC Dominance</p>
                            <p className="text-xl font-black text-white">52.4%</p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#00ff88]/5 border border-[#00ff88]/10 rounded-3xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <Clock size={14} className="text-[#00ff88]" />
                        <span className="text-[10px] font-black text-[#00ff88] uppercase tracking-widest">Live Update</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">Os scores são recalculados a cada fechamento de candle de 5 minutos.</p>
                </div>
            </div>
        </div>

      </div>
    </main>
  );
}
