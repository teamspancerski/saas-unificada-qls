'use client';

import React, { useState } from 'react';
import { Target, Zap, TrendingUp, BarChart3, Rocket, Activity, CheckCircle2, XCircle } from 'lucide-react';

export default function StrategiesPage() {
  const [activeStrategies, setActiveStrategies] = useState<string[]>(['Momentum']);

  const strategies = [
    { name: 'Momentum', description: 'Trend-following strategy utilizing EMA and ADX for strong trend identification.', sharpe: '2.4', win: '68%', dd: '-2.1%' },
    { name: 'Mean Reversion', description: 'Counter-trend strategy identifying overbought/oversold conditions using RSI and BB.', sharpe: '1.9', win: '62%', dd: '-3.4%' },
    { name: 'Scalping', description: 'High-frequency strategy capturing small price movements on M5/M1 timeframes.', sharpe: '2.1', win: '74%', dd: '-1.8%' },
    { name: 'HFT Grid', description: 'Market-making strategy providing liquidity with dynamic grid placement.', sharpe: '2.8', win: '81%', dd: '-0.9%' },
  ];

  const toggleStrategy = (name: string) => {
    setActiveStrategies(prev =>
      prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]
    );
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-[#00ff88] to-[#00d4ff] bg-clip-text text-transparent uppercase tracking-tighter">
            Estratégias de Trading
          </h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Selecione e faça o deploy dos algoritmos QLC</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-[#00ff88]/5 border border-[#00ff88]/20 rounded-2xl">
          <Activity size={18} className="text-[#00ff88]" />
          <span className="text-xs font-bold text-[#00ff88] uppercase tracking-widest">{activeStrategies.length} Ativas</span>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {strategies.map((strategy, idx) => {
          const isActive = activeStrategies.includes(strategy.name);
          return (
            <div key={idx} className={`group relative p-8 rounded-[2.5rem] bg-white/[0.03] border ${isActive ? 'border-[#00ff88]/40' : 'border-white/10'} backdrop-blur-md hover:bg-white/[0.05] transition-all duration-500 overflow-hidden`}>
              {/* Active Glow */}
              {isActive && (
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#00ff88]/10 rounded-full blur-[60px] pointer-events-none animate-pulse"></div>
              )}

              <div className="flex justify-between items-start mb-8">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black tracking-tight">{strategy.name}</h3>
                  <p className="text-slate-500 text-xs font-medium max-w-[280px] leading-relaxed">{strategy.description}</p>
                </div>
                <div className={`p-4 rounded-2xl bg-black/40 border border-white/5 ${isActive ? 'text-[#00ff88] shadow-[0_0_15px_rgba(0,255,136,0.2)]' : 'text-slate-600'}`}>
                  {strategy.name === 'Momentum' && <TrendingUp size={28} />}
                  {strategy.name === 'Mean Reversion' && <Target size={28} />}
                  {strategy.name === 'Scalping' && <Zap size={28} />}
                  {strategy.name === 'HFT Grid' && <Rocket size={28} />}
                </div>
              </div>

              {/* KPIs glassmorphism */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-white/10 transition-colors">
                   <div className="flex items-center gap-2 mb-2">
                     <BarChart3 size={14} className="text-[#00ff88]" />
                     <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Sharpe</span>
                   </div>
                   <div className="text-lg font-black">{strategy.sharpe}</div>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-white/10 transition-colors">
                   <div className="flex items-center gap-2 mb-2">
                     <CheckCircle2 size={14} className="text-[#00d4ff]" />
                     <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Win %</span>
                   </div>
                   <div className="text-lg font-black">{strategy.win}</div>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-white/10 transition-colors">
                   <div className="flex items-center gap-2 mb-2">
                     <XCircle size={14} className="text-rose-500" />
                     <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">DD</span>
                   </div>
                   <div className="text-lg font-black text-rose-500">{strategy.dd}</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#00ff88] shadow-[0_0_10px_#00ff88]' : 'bg-slate-700'}`}></div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-[#00ff88]' : 'text-slate-500'}`}>
                    {isActive ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
                <button
                  onClick={() => toggleStrategy(strategy.name)}
                  className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                    isActive
                      ? 'bg-rose-500/10 text-rose-500 border border-rose-500/30 hover:bg-rose-500/20'
                      : 'bg-[#00ff88] text-black shadow-[0_0_15px_rgba(0,255,136,0.2)] hover:shadow-[0_0_25px_rgba(0,255,136,0.4)] active:scale-95'
                  }`}
                >
                  {isActive ? 'Stop Algo' : 'Deploy Neon'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
