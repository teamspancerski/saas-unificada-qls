'use client';
import { useState, useEffect } from 'react';
import { Briefcase, Users, FileText, TrendingUp, Search, Filter, Plus, ChevronRight, Gavel } from 'lucide-react';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    activeCases: 12,
    triageConversion: '84%',
    revenue: 'R$ 14.250,00',
    pendingDocs: 5
  });

  const recentCases = [
    { id: '1', client: 'Marcos Oliveira', type: 'Trabalhista', status: 'Active', date: '2 horas atrás' },
    { id: '2', client: 'Ana Paula Santos', type: 'Civil', status: 'Priority', date: '5 horas atrás' },
    { id: '3', client: 'Roberto Silva', type: 'Família', status: 'Active', date: 'Ontem' },
  ];

  return (
    <div className="p-10 space-y-10">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Painel Executivo</h1>
          <p className="text-slate-500 font-medium">Bem-vindo à sua infraestrutura AUREX LAW.</p>
        </div>
        <div className="flex gap-4">
            <button className="px-6 py-3 bg-carbon border border-gold/10 rounded-xl text-slate-400 font-bold text-sm hover:border-gold/30 transition-all flex items-center gap-2">
                <Search size={16} /> Pesquisar
            </button>
            <button className="px-6 py-3 bg-gold text-obsidian rounded-xl font-black text-sm hover:bg-white transition-all flex items-center gap-2">
                <Plus size={16} /> Novo Caso
            </button>
        </div>
      </header>

      {/* Bento Grid Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Casos Ativos', value: metrics.activeCases, icon: Briefcase, trend: '+2 este mês', color: 'text-gold' },
          { label: 'Conversão Triagem', value: metrics.triageConversion, icon: TrendingUp, trend: 'Alta performance', color: 'text-emerald-500' },
          { label: 'Receita Stripe', value: metrics.revenue, icon: TrendingUp, trend: 'Mensal Bruto', color: 'text-gold' },
          { label: 'Docs Pendentes', value: metrics.pendingDocs, icon: FileText, trend: 'Ação requerida', color: 'text-rose-500' },
        ].map((m, i) => (
          <div key={i} className="p-8 bg-carbon border border-gold/5 rounded-[2.5rem] hover:border-gold/20 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-obsidian rounded-xl border border-gold/10 group-hover:border-gold/30 transition-all">
                <m.icon className={m.color} size={20} />
              </div>
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{m.trend}</span>
            </div>
            <p className="text-sm font-bold text-slate-500 mb-1">{m.label}</p>
            <p className="text-3xl font-black text-white">{m.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Cases */}
        <div className="lg:col-span-2 bg-carbon border border-gold/5 rounded-[3rem] p-10">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-black text-white flex items-center gap-3">
              <Gavel className="text-gold" size={24} /> Casos Recentes
            </h3>
            <button className="text-xs font-black text-gold uppercase tracking-widest hover:underline">Ver Todos</button>
          </div>

          <div className="space-y-4">
            {recentCases.map((c) => (
              <div key={c.id} className="p-6 bg-obsidian/50 border border-gold/5 rounded-[2rem] flex items-center justify-between group hover:border-gold/20 transition-all cursor-pointer">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-carbon rounded-full flex items-center justify-center border border-gold/10 font-black text-gold">
                    {c.client[0]}
                  </div>
                  <div>
                    <p className="font-bold text-white group-hover:text-gold transition-colors">{c.client}</p>
                    <p className="text-xs text-slate-500 font-medium">{c.type} • {c.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${c.status === 'Priority' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-gold/10 text-gold border border-gold/20'}`}>
                    {c.status}
                  </span>
                  <ChevronRight size={18} className="text-slate-600 group-hover:text-gold transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions / Triage Feed */}
        <div className="bg-carbon border border-gold/5 rounded-[3rem] p-10">
          <h3 className="text-xl font-black text-white mb-8">Feed de Triagem</h3>
          <div className="space-y-8">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="relative pl-8 border-l border-gold/20 pb-8 last:pb-0">
                <div className="absolute top-0 left-[-5px] w-2 h-2 bg-gold rounded-full shadow-[0_0_10px_#C9A227]"></div>
                <p className="text-xs font-black text-gold uppercase tracking-widest mb-2">Nova Triagem IA</p>
                <p className="text-sm font-bold text-white mb-1">Potencial Caso Civil</p>
                <p className="text-xs text-slate-500 font-medium mb-4">Aguardando revisão de documentos.</p>
                <button className="text-[10px] font-black text-white bg-obsidian border border-gold/10 px-4 py-2 rounded-lg hover:bg-gold hover:text-obsidian transition-all uppercase tracking-widest">
                  Analisar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
