'use client';
import { Target, TrendingUp, Zap, BarChart3, Clock, DollarSign, Activity } from 'lucide-react';

const history = [
  { symbol: 'BTCUSDT', side: 'BUY', entry: '41,120', exit: '42,350', pnl: '+$1,230', status: 'Lucro', color: '#00ff88', time: '12:42' },
  { symbol: 'ETHUSDT', side: 'SELL', entry: '2,510', exit: '2,480', pnl: '+$60', status: 'Lucro', color: '#00ff88', time: '10:15' },
  { symbol: 'SOLUSDT', side: 'BUY', entry: '104.20', exit: '102.10', pnl: '-$210', status: 'Loss', color: '#f43f5e', time: '08:30' },
  { symbol: 'BTCUSDT', side: 'SELL', entry: '43,000', exit: '42,950', pnl: '+$50', status: 'Lucro', color: '#00ff88', time: '04:12' },
];

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-slate-200 selection:bg-[#00ff88]/30 font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
             <div className="w-1.5 h-10 bg-[#00ff88] rounded-full shadow-[0_0_15px_#00ff88]"></div>
             <div>
                <h1 className="text-3xl font-black tracking-tight text-white uppercase">Histórico de Trades</h1>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Registros Permanentes QLC Motor</p>
             </div>
          </div>
          <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4 backdrop-blur-md">
            <BarChart3 size={20} className="text-[#00d4ff]" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Fechado: 1,242</span>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-8 relative">
                    <h2 className="text-xl font-black tracking-tight flex items-center gap-3">
                        EQUITY CURVE <span className="text-slate-500 text-xs font-bold px-2 py-1 bg-white/5 rounded-md uppercase">Performance Real</span>
                    </h2>
                </div>
                <div className="h-[400px] w-full bg-black/40 rounded-3xl border border-white/5 overflow-hidden relative group">
                    <iframe
                        src="https://www.tradingview.com/embed/?symbol=BINANCE:BTCUSDT&theme=dark&interval=60&hidesidetoolbar=1"
                        className="w-full h-full border-none opacity-90 transition-opacity group-hover:opacity-100"
                    />
                </div>
            </div>

            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center text-center">
                <div className="p-6 bg-[#00ff88]/5 rounded-3xl border border-[#00ff88]/20 mb-8 mx-auto w-fit">
                    <TrendingUp size={48} className="text-[#00ff88]" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase mb-2">Sharpe de 2.1</h3>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-6">Métrica de Eficiência QLC</p>
                <div className="space-y-4">
                    <div className="flex justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Lucro Total</span>
                        <span className="text-sm font-black text-[#00ff88]">+$12,450.00</span>
                    </div>
                    <div className="flex justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Taxa Acerto</span>
                        <span className="text-sm font-black text-[#00d4ff]">62.4%</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                        <th className="pb-6">Par</th>
                        <th className="pb-6">Tipo</th>
                        <th className="pb-6">Entrada</th>
                        <th className="pb-6">Saída</th>
                        <th className="pb-6">PnL Líquido</th>
                        <th className="pb-6">Horário</th>
                        <th className="pb-6 text-right">Resultado</th>
                    </tr>
                </thead>
                <tbody className="text-sm font-bold">
                    {history.map((h, idx) => (
                        <tr key={idx} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors">
                            <td className="py-6 font-black text-white">{h.symbol}</td>
                            <td className="py-6">
                                <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black tracking-widest border border-white/5`} style={{ backgroundColor: `${h.color}10`, color: h.color }}>
                                    {h.side}
                                </span>
                            </td>
                            <td className="py-6 text-slate-500 font-mono">${h.entry}</td>
                            <td className="py-6 text-slate-500 font-mono">${h.exit}</td>
                            <td className="py-6 font-black" style={{ color: h.color }}>{h.pnl}</td>
                            <td className="py-6 text-slate-500 font-mono text-xs">{h.time}</td>
                            <td className="py-6 text-right">
                                <span className={`text-[10px] font-black uppercase tracking-widest`} style={{ color: h.color }}>{h.status}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}
