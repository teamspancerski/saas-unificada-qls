'use client';
import { useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Zap, Clock, Target } from 'lucide-react';

export default function Dashboard() {
  const [topPairs] = useState([
    { symbol: 'BTC/USDT', score: 92, vol: '2.4B', atr: '1.2%' },
    { symbol: 'ETH/USDT', score: 88, vol: '1.8B', atr: '1.5%' },
    { symbol: 'SOL/USDT', score: 85, vol: '900M', atr: '2.8%' },
    { symbol: 'LINK/USDT', score: 79, vol: '400M', atr: '2.1%' },
  ]);

  const kpis = [
    { name: 'Sharpe Ratio', value: '2.47', icon: BarChart3, trend: '+0.12', color: '#00ff88' },
    { name: 'Win Rate', value: '62.4%', icon: TrendingUp, trend: '+2.1%', color: '#00d4ff' },
    { name: 'Max Drawdown', value: '4.2%', icon: DollarSign, trend: '-0.5%', color: '#f43f5e' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi) => (
          <div key={kpi.name} className="glass p-8 rounded-[2rem] hover:border-[#00ff88]/30 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{kpi.name}</span>
              <div className="p-3 bg-black/40 rounded-2xl group-hover:scale-110 transition-transform">
                <kpi.icon size={20} style={{ color: kpi.color }} />
              </div>
            </div>
            <div className="flex items-baseline gap-4">
              <h2 className="text-4xl font-black">{kpi.value}</h2>
              <span className={`text-xs font-bold ${kpi.trend.startsWith('+') ? 'text-[#00ff88]' : 'text-rose-500'}`}>
                {kpi.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Chart Area */}
        <div className="xl:col-span-2 glass rounded-[2.5rem] p-8 relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00ff88]"></span>
              </div>
              <h2 className="text-xl font-bold uppercase tracking-tight">BTC/USDT TradingView</h2>
            </div>
            <div className="flex gap-2">
              {['15m', '1h', '4h'].map((t) => (
                <button key={t} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${t === '1h' ? 'bg-[#00ff88]/10 border-[#00ff88]/30 text-[#00ff88]' : 'bg-white/5 border-white/5 text-slate-500 hover:text-white'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="h-[450px] w-full bg-black/40 rounded-3xl border border-white/10 overflow-hidden relative group">
            <iframe src="https://www.tradingview.com/embed/?symbol=BINANCE:BTCUSDT&theme=dark" className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-6 left-6 p-6 glass rounded-2xl backdrop-blur-3xl border border-white/10">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total PnL Estimado</p>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-black text-[#00ff88]">+$12,450.00</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">+12.4%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Pairs Score */}
        <div className="glass rounded-[2.5rem] p-8">
          <div className="flex items-center gap-3 mb-8">
            <Zap className="text-[#00d4ff]" size={20} />
            <h2 className="text-lg font-bold uppercase tracking-tight text-[#00d4ff]">Top Pairs Score</h2>
          </div>
          <div className="space-y-4">
            {topPairs.map((p) => (
              <div key={p.symbol} className="p-5 bg-black/20 rounded-2xl border border-white/5 hover:border-[#00d4ff]/30 transition-all group cursor-pointer">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-black text-sm uppercase tracking-wider">{p.symbol}</span>
                  <div className={`px-3 py-1 rounded-lg text-[10px] font-black ${p.score > 80 ? 'bg-[#00ff88]/10 text-[#00ff88]' : 'bg-slate-800 text-slate-400'}`}>
                    {p.score}%
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Volume</span>
                    <span className="text-xs font-bold text-slate-400">{p.vol}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">ATR (24h)</span>
                    <span className="text-xs font-bold text-slate-400">{p.atr}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Signals Table */}
      <div className="glass rounded-[2.5rem] p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Target className="text-[#00ff88]" size={24} />
            <h2 className="text-xl font-bold uppercase tracking-tight">Recent Signals Quantum</h2>
          </div>
          <button className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-[#00ff88] transition-colors">
            Ver Todos →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/10">
                <th className="pb-6">Par/Ativo</th>
                <th className="pb-6">Ação</th>
                <th className="pb-6">Entrada</th>
                <th className="pb-6">Score</th>
                <th className="pb-6">Status</th>
                <th className="pb-6">Hold Time</th>
              </tr>
            </thead>
            <tbody className="text-sm font-bold">
              {[1, 2, 3].map((i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                  <td className="py-6 flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-[10px]">
                      B
                    </div>
                    <span>BTC/USDT</span>
                  </td>
                  <td className="py-6">
                    <span className="px-3 py-1.5 rounded-xl bg-[#00ff88]/10 text-[#00ff88] text-[10px] font-black uppercase tracking-widest border border-[#00ff88]/20">
                      BUY LONG
                    </span>
                  </td>
                  <td className="py-6 text-slate-400">$64,245.12</td>
                  <td className="py-6 text-[#00ff88]">92%</td>
                  <td className="py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse"></div>
                      <span className="text-[10px] uppercase tracking-widest font-black">OPEN</span>
                    </div>
                  </td>
                  <td className="py-6 text-slate-500 flex items-center gap-2">
                    <Clock size={14} /> <span className="text-[10px] font-mono tracking-wider">03:42:15</span>
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
