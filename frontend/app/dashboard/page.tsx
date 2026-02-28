'use client';

import React from 'react';
import { Zap, Activity, TrendingUp, BarChart3, Clock, User } from 'lucide-react';

export default function StitchDashboard() {
  const kpis = [
    { label: 'Sharpe Ratio', value: '2.1', icon: <BarChart3 size={20} />, color: 'text-[#00ff88]' },
    { label: 'P&L', value: '+$342', icon: <Activity size={20} />, color: 'text-[#00ff88]' },
    { label: 'Win Rate', value: '62%', icon: <TrendingUp size={20} />, color: 'text-[#00ff88]' },
    { label: 'Max Drawdown', value: '-1.2%', icon: <Zap size={20} />, color: 'text-rose-500' },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-slate-200 font-sans selection:bg-[#00ff88]/30 overflow-x-hidden">
      {/* Dark Glow Effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#00ff88]/5 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#00d4ff]/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 py-6 md:px-8 md:py-10">
        {/* Header #00ff88 neon */}
        <header className="flex flex-col lg:flex-row justify-between items-center gap-6 p-6 mb-8 rounded-3xl bg-black/40 border border-[#00ff88]/20 backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,136,0.05)]">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#00ff88]/10 rounded-2xl border border-[#00ff88]/30 shadow-[0_0_15px_rgba(0,255,136,0.2)]">
              <Zap size={24} className="text-[#00ff88]" fill="#00ff88" />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-[#00ff88] to-[#00d4ff] bg-clip-text text-transparent uppercase tracking-tighter">
                Stitch Dashboard
              </h1>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                <User size={12} />
                <span>ID: 550e8400-e29b-41d4-a716-446655440000</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 w-full lg:w-auto">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Montante</span>
              <span className="text-xl font-black text-[#00ff88] shadow-[#00ff88]/20 drop-shadow-sm">$12k</span>
            </div>
            <div className="flex flex-col border-l border-slate-800 pl-4 md:pl-8">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Trades</span>
              <span className="text-xl font-black text-[#00ff88]">3/5</span>
            </div>
            <div className="flex flex-col border-l border-slate-800 pl-4 md:pl-8 col-span-2 md:col-span-1">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
                <Clock size={10} /> Next Close
              </span>
              <span className="text-xl font-black text-[#00ff88]">16:32</span>
            </div>
          </div>
        </header>

        {/* 4 cards glassmorphism KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, idx) => (
            <div key={idx} className="group relative p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:bg-white/[0.05] hover:border-[#00ff88]/30 transition-all duration-500">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{kpi.label}</span>
                <div className={`p-2 rounded-lg bg-black/40 border border-white/5 ${kpi.color}`}>
                  {kpi.icon}
                </div>
              </div>
              <div className="text-3xl font-black tracking-tight group-hover:scale-105 transition-transform origin-left duration-500">
                {kpi.value}
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00ff88]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>

        {/* Central TradingView BTCUSDT 1h */}
        <div className="bg-black/40 border border-white/10 rounded-[2.5rem] p-4 md:p-8 backdrop-blur-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <h2 className="text-lg font-bold flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00ff88]"></span>
              </span>
              LIVE MARKET: BTCUSDT
            </h2>
            <div className="flex items-center gap-2 p-1 bg-black/40 rounded-xl border border-white/5">
              {['15m', '1h', '4h', '1d'].map((tf) => (
                <button
                  key={tf}
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${
                    tf === '1h' ? 'bg-[#00ff88] text-black shadow-[0_0_10px_rgba(0,255,136,0.3)]' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {tf.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-full aspect-video md:h-[600px] bg-black/60 rounded-[2rem] border border-white/5 overflow-hidden">
             <iframe
              src="https://www.tradingview.com/embed/?symbol=BINANCE:BTCUSDT&interval=60&theme=dark"
              className="w-full h-full border-none"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
}
