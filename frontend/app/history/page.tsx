'use client';
import { History, Search, Download, Calendar, Filter } from 'lucide-react';

export default function OrderHistory() {
  const pastOrders = [
    { symbol: 'BTC/USDT', type: 'BUY', entry: 58120.45, exit: 59345.12, pnl: '+2.10%', date: '2026-02-27 14:30', score: 91 },
    { symbol: 'ETH/USDT', type: 'SELL', entry: 3210.25, exit: 3195.10, pnl: '+0.47%', date: '2026-02-27 09:15', score: 87 },
    { symbol: 'SOL/USDT', type: 'BUY', entry: 145.12, exit: 142.45, pnl: '-1.84%', date: '2026-02-26 21:42', score: 79 },
    { symbol: 'LINK/USDT', type: 'BUY', entry: 18.34, exit: 19.56, pnl: '+6.65%', date: '2026-02-26 18:20', score: 94 },
    { symbol: 'BTC/USDT', type: 'SELL', entry: 61245.12, exit: 60120.45, pnl: '+1.84%', date: '2026-02-26 12:05', score: 85 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Histórico de Ordens</h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Análise de performance e registros de execução</p>
        </div>
        <button className="flex items-center gap-3 px-6 py-3 glass border-white/10 hover:border-[#00ff88]/30 rounded-2xl transition-all group">
          <Download size={18} className="text-slate-400 group-hover:text-[#00ff88]" />
          <span className="text-xs font-black uppercase tracking-widest">Exportar CSV</span>
        </button>
      </header>

      <div className="glass p-4 rounded-[2.5rem] flex flex-wrap gap-4 items-center justify-between border-white/5 bg-white/[0.02]">
        <div className="flex flex-1 min-w-[300px] relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#00ff88] transition-colors" size={18} />
          <input
            type="text"
            placeholder="Pesquisar por par ou ID da ordem..."
            className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold text-slate-300 focus:outline-none focus:border-[#00ff88]/50 transition-all placeholder:text-slate-600"
          />
        </div>

        <div className="flex gap-4">
          <button className="flex items-center gap-3 px-6 py-3 glass border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
            <Calendar size={16} /> Últimos 30 Dias
          </button>
          <button className="flex items-center gap-3 px-6 py-3 glass border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
            <Filter size={16} /> Filtros
          </button>
        </div>
      </div>

      <div className="glass rounded-[2.5rem] p-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/10">
                <th className="pb-6">Par/Ativo</th>
                <th className="pb-6">Tipo</th>
                <th className="pb-6">Entrada</th>
                <th className="pb-6">Saída</th>
                <th className="pb-6">PnL Total</th>
                <th className="pb-6">Data Fechamento</th>
                <th className="pb-6">Score QLC</th>
              </tr>
            </thead>
            <tbody className="text-sm font-bold">
              {pastOrders.map((order, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                  <td className="py-6 font-mono">{order.symbol}</td>
                  <td className="py-6">
                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                      order.type === 'BUY' ? 'bg-[#00ff88]/10 text-[#00ff88] border-[#00ff88]/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                    }`}>
                      {order.type}
                    </span>
                  </td>
                  <td className="py-6 text-slate-400">${order.entry.toLocaleString()}</td>
                  <td className="py-6 text-slate-400">${order.exit.toLocaleString()}</td>
                  <td className="py-6">
                    <span className={order.pnl.startsWith('+') ? 'text-[#00ff88]' : 'text-rose-500'}>
                      {order.pnl}
                    </span>
                  </td>
                  <td className="py-6 text-slate-500 flex items-center gap-2">
                    <span className="text-[10px] font-mono tracking-wider">{order.date}</span>
                  </td>
                  <td className="py-6 text-slate-400">{order.score}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
