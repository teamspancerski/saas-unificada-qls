'use client';
import { Check, Zap, Rocket, Crown, Star } from 'lucide-react';

const plans = [
  { name: 'Starter', price: '$49', description: 'Para iniciantes que buscam automação básica.', features: ['1 Bot Ativo', '3 Estratégias Core', 'Suporte Comunidade', 'Scan 15m/1h'], icon: Rocket, color: '#94a3b8' },
  { name: 'Pro', price: '$149', description: 'O equilíbrio perfeito para traders consistentes.', features: ['5 Bots Ativos', 'Todas Estratégias', 'Suporte Prioritário', 'Scan Todos TFs', 'Auto-Compound'], icon: Zap, color: '#00ff88', popular: true },
  { name: 'Elite', price: '$299', description: 'Para fundos e traders de alta performance.', features: ['Ilimitados Bots', 'Custom Strategies', 'Suporte 1:1 VIP', 'API Whitelabel', 'High Frequency Mode'], icon: Crown, color: '#00d4ff' },
];

export default function PlansPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-slate-200 selection:bg-[#00ff88]/30 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">

        <header className="text-center space-y-4 mb-16">
          <div className="inline-flex p-3 bg-[#00ff88]/10 rounded-2xl border border-[#00ff88]/30 mb-4">
             <Star size={24} className="text-[#00ff88]" fill="#00ff88" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#00ff88] to-[#00d4ff] bg-clip-text text-transparent tracking-tighter">
            PLANOS E ASSINATURA
          </h1>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Escolha a potência do seu motor QLC</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div key={idx} className={`bg-white/[0.03] backdrop-blur-xl border ${plan.popular ? 'border-[#00ff88]/40 shadow-[0_0_50px_rgba(0,255,136,0.1)]' : 'border-white/5'} rounded-[2.5rem] p-10 relative flex flex-col group hover:translate-y-[-8px] transition-all duration-500`}>
                {plan.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00ff88] text-black text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(0,255,136,0.4)]">
                        Mais Popular
                    </div>
                )}

                <div className="flex justify-between items-start mb-8">
                    <div className="p-4 bg-black/40 rounded-2xl border border-white/5 group-hover:scale-110 transition-transform">
                        <plan.icon size={32} style={{ color: plan.color }} fill={plan.popular ? plan.color : 'none'} />
                    </div>
                    <div className="text-right">
                        <span className="text-3xl font-black text-white">{plan.price}</span>
                        <span className="text-slate-500 text-xs font-bold">/mês</span>
                    </div>
                </div>

                <h3 className="text-2xl font-black text-white uppercase mb-4">{plan.name}</h3>
                <p className="text-slate-500 text-xs font-bold leading-relaxed mb-8">{plan.description}</p>

                <div className="space-y-4 flex-1">
                    {plan.features.map((feat, fidx) => (
                        <div key={fidx} className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center">
                                <Check size={12} className="text-[#00ff88]" />
                            </div>
                            <span className="text-xs font-bold text-slate-400">{feat}</span>
                        </div>
                    ))}
                </div>

                <button className={`w-full py-5 rounded-2xl mt-12 font-black text-xs uppercase tracking-widest transition-all ${plan.popular ? 'bg-[#00ff88] text-black shadow-[0_0_30px_rgba(0,255,136,0.3)] hover:shadow-[0_0_40px_rgba(0,255,136,0.5)]' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}>
                    Assinar Agora
                </button>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
