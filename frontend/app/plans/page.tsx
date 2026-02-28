'use client';

import React from 'react';
import { Check, Zap, Rocket, Crown, Star } from 'lucide-react';

export default function PlansPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Ideal para monitoramento básico de mercado.',
      features: ['Monitoramento 1 par', 'Alertas Webhook', 'Delay 5min', 'Comunidade Discord'],
      icon: <Star size={24} className="text-slate-500" />,
      button: 'Plano Atual',
      active: false,
      color: 'border-white/10'
    },
    {
      name: 'Pro',
      price: '$49',
      description: 'Acesso completo ao motor QLC com execução rápida.',
      features: ['Multi-par (10+)', 'Execução Real-time', 'Score QLC > 75', 'Suporte Prioritário', 'Stops Emocionais'],
      icon: <Rocket size={24} className="text-[#00d4ff]" />,
      button: 'Upgrade para Pro',
      active: false,
      featured: true,
      color: 'border-[#00d4ff]/30 shadow-[0_0_30px_rgba(0,212,255,0.1)]'
    },
    {
      name: 'Elite',
      price: '$99',
      description: 'O poder máximo da engine para traders institucionais.',
      features: ['Unlimited Pairs', 'Prioridade de Pool', 'MTF Analysis', 'API Key Whitelabel', 'Consultoria VIP'],
      icon: <Crown size={24} className="text-[#00ff88]" />,
      button: 'Seu Plano Atual',
      active: true,
      color: 'border-[#00ff88]/40 shadow-[0_0_40px_rgba(0,255,136,0.15)]'
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#00ff88] via-[#00d4ff] to-white bg-clip-text text-transparent uppercase tracking-tighter">
          Evolua seu Trading
        </h1>
        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest leading-relaxed">
          Escolha o poder de processamento da sua engine QLC e domine o mercado com precisão institucional.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`relative p-10 rounded-[3rem] bg-white/[0.03] border backdrop-blur-xl flex flex-col transition-all duration-500 hover:scale-105 ${plan.color} ${plan.active ? 'bg-[#00ff88]/[0.02]' : ''}`}
          >
            {plan.featured && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-[#00d4ff] text-black text-[9px] font-black uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(0,212,255,0.5)]">
                Mais Popular
              </div>
            )}

            <div className="flex justify-between items-start mb-8">
              <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                {plan.icon}
              </div>
              <div className="text-right">
                <span className="text-4xl font-black text-white">{plan.price}</span>
                <span className="text-[10px] font-black text-slate-500 uppercase block">/mês</span>
              </div>
            </div>

            <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">{plan.name}</h3>
            <p className="text-[11px] text-slate-500 font-bold leading-relaxed mb-8">{plan.description}</p>

            <div className="space-y-4 flex-1 mb-10">
              {plan.features.map((feat, j) => (
                <div key={j} className="flex items-center gap-3">
                  <div className={`p-1 rounded-full ${plan.active ? 'bg-[#00ff88]/20 text-[#00ff88]' : 'bg-white/10 text-slate-500'}`}>
                    <Check size={12} />
                  </div>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-wide">{feat}</span>
                </div>
              ))}
            </div>

            <button
              className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all duration-300 ${
                plan.active
                  ? 'bg-transparent border border-[#00ff88]/50 text-[#00ff88] cursor-default'
                  : plan.featured
                    ? 'bg-[#00d4ff] text-black shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)]'
                    : 'bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {plan.button}
            </button>
          </div>
        ))}
      </div>

      <div className="p-10 rounded-[3rem] bg-black/40 border border-white/5 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/30">
            <Zap size={32} className="text-amber-500" />
          </div>
          <div>
            <h4 className="text-xl font-black text-white uppercase tracking-tighter">Precisa de algo customizado?</h4>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Soluções White-label e API institucional para fundos.</p>
          </div>
        </div>
        <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-300 hover:bg-white/10 hover:text-white transition-all">
          Falar com Especialista
        </button>
      </div>
    </div>
  );
}
