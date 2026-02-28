'use client';
import { BarChart3, TrendingUp, DollarSign, Target, Zap, Activity } from 'lucide-react';

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-slate-200 selection:bg-[#00ff88]/30 font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Stitch */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-6 p-6 bg-[#0a0a0a] rounded-3xl border border-[#00ff88]/20 shadow-[0_0_50px_rgba(0,255,136,0.1)]">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-[#00ff88]/10 rounded-2xl border border-[#00ff88]/30 shadow-[0_0_20px_rgba(0,255,136,0.2)]">
              <Zap size={28} className="text-[#00ff88]" fill="#00ff88" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-[#00ff88] to-[#00d4ff] bg-clip-text text-transparent tracking-tighter">
                STITCH DASHBOARD
              </h1>
              <div className="flex flex-wrap gap-4 mt-1">
                <span className="text-[#00ff88] font-bold text-[10px] uppercase tracking-widest bg-[#00ff88]/5 px-2 py-0.5 rounded-md border border-[#00ff88]/10">ID: uuid</span>
                <span className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Montante: $12k</span>
                <span className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Trades: 3/5</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-black/40 border border-[#00ff88]/20 rounded-xl flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse shadow-[0_0_10px_#00ff88]"></div>
              <span className="text-[10px] font-black text-[#00ff88] uppercase tracking-widest">SISTEMA ONLINE</span>
            </div>
          </div>
        </header>

        {/* 4 Glassmorphism KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Sharpe Card */}
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-[#00ff88]/40 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Activity size={48} className="text-[#00ff88]" />
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Sharpe Ratio</p>
            <div className="text-4xl font-black text-white">2.1</div>
            <div className="mt-2 text-[10px] font-bold text-[#00ff88] flex items-center gap-1">
              <TrendingUp size={12} /> ESTÁVEL
            </div>
          </div>

          {/* P&L Card */}
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-[#00ff88]/40 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <DollarSign size={48} className="text-[#00ff88]" />
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">P&L Acumulado</p>
            <div className="text-4xl font-black text-[#00ff88]">+$342</div>
            <div className="mt-2 text-[10px] font-bold text-slate-400">Últimas 24h</div>
          </div>

          {/* Win Rate Card */}
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-[#00d4ff]/40 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Target size={48} className="text-[#00d4ff]" />
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Win Rate</p>
            <div className="text-4xl font-black text-white">62%</div>
            <div className="mt-2 text-[10px] font-bold text-[#00d4ff]">Taxa de Acerto</div>
          </div>

          {/* Drawdown Card */}
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-rose-500/40 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <BarChart3 size={48} className="text-rose-500" />
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Max Drawdown</p>
            <div className="text-4xl font-black text-rose-500">-1.2%</div>
            <div className="mt-2 text-[10px] font-bold text-slate-400">Risco Controlado</div>
          </div>
        </div>

        {/* Central TradingView Chart */}
        <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-4 md:p-8 backdrop-blur-3xl shadow-2xl relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#00ff88]/5 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#00d4ff]/5 rounded-full blur-[100px]"></div>

          <div className="flex items-center justify-between mb-8 relative">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-8 bg-[#00ff88] rounded-full shadow-[0_0_15px_#00ff88]"></div>
              <h2 className="text-xl font-black tracking-tight flex items-center gap-3">
                BTCUSDT <span className="text-slate-500 text-xs font-bold px-2 py-1 bg-white/5 rounded-md">1H</span>
              </h2>
            </div>
            <div className="flex gap-2">
              <span className="text-[10px] font-black px-3 py-1.5 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88] shadow-[0_0_10px_rgba(0,255,136,0.1)]">LIVE FEED</span>
            </div>
          </div>

          <div className="h-[500px] w-full bg-black/40 rounded-3xl border border-white/5 overflow-hidden relative group">
            <iframe
              src="https://www.tradingview.com/embed/?symbol=BINANCE:BTCUSDT&theme=dark&interval=60&hidesidetoolbar=1"
              className="w-full h-full border-none opacity-90 transition-opacity group-hover:opacity-100"
            />

            {/* Overlay Gradient for more depth */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.4)]"></div>
          </div>
        </div>

      </div>
    </main>
  );
}
