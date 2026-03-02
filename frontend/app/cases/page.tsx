'use client';
import { useState } from 'react';
import { Briefcase, Gavel, Calendar, Clock, Filter, Search, Plus, User, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CasesPage() {
  const [activeTab, setActiveTab] = useState('Active');

  const cases = [
    {
        id: '1',
        client: 'Marcos Oliveira',
        type: 'Trabalhista',
        status: 'Active',
        date: '2024-11-20',
        timeline: [
            { event: 'Caso Criado', date: '20 Nov', icon: Plus, done: true },
            { event: 'Triagem Processada', date: '20 Nov', icon: Gavel, done: true },
            { event: 'Aguardando Documentos', date: 'Pendente', icon: Clock, done: false },
        ]
    },
    {
        id: '2',
        client: 'Ana Paula Santos',
        type: 'Civil',
        status: 'Priority',
        date: '2024-11-19',
        timeline: [
            { event: 'Caso Criado', date: '19 Nov', icon: Plus, done: true },
            { event: 'Documentos Recebidos', date: '20 Nov', icon: CheckCircle2, done: true },
            { event: 'Revisão Necessária', date: 'Agora', icon: Clock, done: false },
        ]
    },
  ];

  return (
    <div className="p-10 space-y-10">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Gestão de Casos</h1>
          <p className="text-slate-500 font-medium italic">Infraestrutura administrativa AUREX LAW.</p>
        </div>

        <div className="flex gap-4">
            <div className="flex bg-carbon p-1 rounded-xl border border-gold/10">
                {['Active', 'Priority', 'Archived'].map(t => (
                    <button
                        key={t}
                        onClick={() => setActiveTab(t)}
                        className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === t ? 'bg-gold text-obsidian' : 'text-slate-500 hover:text-white'}`}
                    >
                        {t}
                    </button>
                ))}
            </div>
        </div>
      </header>

      <div className="space-y-6">
        {cases.filter(c => c.status === activeTab || activeTab === 'Active').map(c => (
            <div key={c.id} className="p-10 bg-carbon border border-gold/5 rounded-[3rem] hover:border-gold/20 transition-all grid grid-cols-1 lg:grid-cols-4 gap-12 group">
                <div className="lg:col-span-1 space-y-6 border-r border-gold/5 pr-12">
                    <div className="w-20 h-20 bg-obsidian border border-gold/10 rounded-[2rem] flex items-center justify-center text-3xl font-black text-gold group-hover:scale-105 transition-transform">
                        {c.client[0]}
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-white mb-2">{c.client}</h3>
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-gold/10 border border-gold/30 text-gold rounded-lg text-[10px] font-black uppercase tracking-widest">{c.type}</span>
                            <span className="text-xs text-slate-500 font-medium flex items-center gap-2"><Calendar size={14} /> {c.date}</span>
                        </div>
                    </div>
                    <button className="w-full py-4 bg-obsidian border border-gold/10 rounded-2xl text-white font-black text-xs hover:border-gold/30 transition-all flex items-center justify-center gap-3 uppercase tracking-widest">
                        Detalhes <ArrowRight size={14} />
                    </button>
                </div>

                <div className="lg:col-span-3">
                    <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-10 flex items-center gap-3">
                        <Clock size={16} className="text-gold" /> Timeline do Caso
                    </h4>

                    <div className="flex items-start justify-between relative">
                        <div className="absolute top-5 left-0 w-full h-[2px] bg-gold/10 z-0"></div>
                        {c.timeline.map((t, i) => (
                            <div key={i} className="flex flex-col items-center gap-4 relative z-10 w-1/3">
                                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${t.done ? 'bg-gold border-gold text-obsidian shadow-[0_0_20px_#C9A22733]' : 'bg-carbon border-gold/20 text-slate-600'}`}>
                                    <t.icon size={18} />
                                </div>
                                <div className="text-center">
                                    <p className={`text-sm font-bold ${t.done ? 'text-white' : 'text-slate-500'}`}>{t.event}</p>
                                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1">{t.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-6 bg-obsidian/50 border border-gold/5 rounded-2xl flex items-center justify-between">
                        <p className="text-xs text-slate-400 font-medium">Última atualização: <span className="text-white font-bold">Documentos em análise pela IA.</span></p>
                        <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">Compliance LGPD Ativo</span>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}
