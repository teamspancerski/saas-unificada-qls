'use client';
import { Target, TrendingUp, Zap, BarChart3, Clock, LayoutGrid } from 'lucide-react';

const strategies = [
  { name: 'Momentum Burst', description: 'Detecta rompimentos de volatilidade e volume acima da média móvel.', winRate: '68%', profitFactor: '2.4', risk: 'Médio', color: '#00ff88' },
  { name: 'Mean Reversion', description: 'Estratégia baseada em retorno à média em zonas de sobrecompra/sobrevenda.', winRate: '72%', profitFactor: '1.9', risk: 'Baixo', color: '#00d4ff' },
  { name: 'Trend Rider', description: 'Segue tendências de longo prazo utilizando EMAs e ADX como filtro.', winRate: '54%', profitFactor: '3.1', risk: 'Médio', color: '#a855f7' },
  { name: 'Scalping Pro', description: 'Execução ultrarrápida em timeframes de 1m a 5m para ganhos curtos.', winRate: '61%', profitFactor: '1.6', risk: 'Alto', color: '#f43f5e' },
];

export default function StrategiesPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-slate-200 selection:bg-[#00ff88]/30 font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
             <div className="w-1.5 h-10 bg-[#00ff88] rounded-full shadow-[0_0_15px_#00ff88]"></div>
             <div>
                <h1 className="text-3xl font-black tracking-tight text-white uppercase">Estratégias QLC</h1>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Configuração de Algoritmos Ativos</p>
             </div>
          </div>
          <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4 backdrop-blur-md">
            <LayoutGrid size={20} className="text-[#00ff88]" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Ativas: 4</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {strategies.map((s, idx) => (
            <div key={idx} className="bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 hover:border-white/10 transition-all group relative overflow-hidden">
               {/* Background Decorative Glow */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full blur-[50px] group-hover:bg-[#00ff88]/5 transition-colors"></div>

               <div className="flex justify-between items-start mb-8 relative">
                 <div className="space-y-2">
                   <h2 className="text-2xl font-black text-white group-hover:text-[#00ff88] transition-colors">{s.name}</h2>
                   <p className="text-slate-500 text-xs font-bold leading-relaxed max-w-[80%]">{s.description}</p>
                 </div>
                 <div className={`p-4 bg-black/40 rounded-2xl border border-white/5 shadow-2xl`}>
                    <Zap size={24} style={{ color: s.color }} fill={s.color} />
                 </div>
               </div>

               <div className="grid grid-cols-3 gap-6 relative">
                 <div className="space-y-1">
                   <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                     <Target size={10} /> Win Rate
                   </p>
                   <p className="text-xl font-black text-white">{s.winRate}</p>
                 </div>
                 <div className="space-y-1">
                   <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                     <TrendingUp size={10} /> Profit Factor
                   </p>
                   <p className="text-xl font-black text-white">{s.profitFactor}</p>
                 </div>
                 <div className="space-y-1">
                   <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                     <BarChart3 size={10} /> Risco
                   </p>
                   <p className="text-xl font-black" style={{ color: s.color }}>{s.risk}</p>
                 </div>
               </div>

               <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center relative">
                 <div className="flex items-center gap-3">
                   <Clock size={14} className="text-slate-600" />
                   <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Último sinal: 12m ago</span>
                 </div>
                 <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-white/5">
                   Configurar Motor
                 </button>
               </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
