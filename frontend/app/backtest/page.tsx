'use client';
import { History, Play, BarChart3, Calendar, Settings2, Target, TrendingUp, Zap } from 'lucide-react';

export default function BacktestPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-slate-200 selection:bg-[#00ff88]/30 font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
             <div className="w-1.5 h-10 bg-[#00d4ff] rounded-full shadow-[0_0_15px_#00d4ff]"></div>
             <div>
                <h1 className="text-3xl font-black tracking-tight text-white uppercase">Backtest QLC</h1>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Simulação de Performance Histórica</p>
             </div>
          </div>
          <button className="flex items-center gap-3 px-8 py-4 bg-[#00d4ff] text-black font-black text-xs uppercase tracking-widest rounded-2xl shadow-[0_0_30px_rgba(0,212,255,0.3)] hover:scale-105 transition-all">
            <Play size={18} fill="currentColor" /> Iniciar Backtest
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Config */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 space-y-8">
                    <h3 className="text-sm font-black text-[#00d4ff] flex items-center gap-3">
                        <Settings2 size={18} /> PARÂMETROS
                    </h3>

                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Estratégia</label>
                            <select className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs font-bold focus:border-[#00d4ff]/50 outline-none">
                                <option>Momentum Burst</option>
                                <option>Mean Reversion</option>
                                <option>Trend Rider</option>
                            </select>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Par de Ativos</label>
                            <input type="text" defaultValue="BTCUSDT" className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs font-bold focus:border-[#00d4ff]/50 outline-none" />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Calendar size={12} /> Período
                            </label>
                            <div className="grid grid-cols-1 gap-2">
                                <input type="date" className="bg-black/40 border border-white/10 rounded-xl p-3 text-xs font-bold outline-none" />
                                <input type="date" className="bg-black/40 border border-white/10 rounded-xl p-3 text-xs font-bold outline-none" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#00d4ff]/5 border border-[#00d4ff]/10 rounded-3xl p-6">
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">O backtest utiliza dados históricos da Binance Spot com precisão de 1 minuto.</p>
                </div>
            </div>

            {/* Main Results */}
            <div className="lg:col-span-3 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6">
                        <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-2">Total Profit</p>
                        <div className="text-3xl font-black text-[#00ff88]">+$8,420.00</div>
                    </div>
                    <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6">
                        <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-2">Sharpe Ratio</p>
                        <div className="text-3xl font-black text-white">2.84</div>
                    </div>
                    <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6">
                        <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-2">Drawdown</p>
                        <div className="text-3xl font-black text-rose-500">-2.1%</div>
                    </div>
                </div>

                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 min-h-[500px] flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                         <BarChart3 size={200} className="text-white" />
                    </div>
                    <div className="text-center relative">
                        <Zap size={48} className="text-[#00d4ff] mx-auto mb-4 animate-pulse" />
                        <h4 className="text-xl font-black text-white uppercase">Aguardando Execução</h4>
                        <p className="text-slate-500 text-xs font-bold mt-2">Configure os parâmetros e clique em iniciar</p>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </main>
  );
}
