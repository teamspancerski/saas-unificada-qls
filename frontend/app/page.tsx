'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Gavel, ShieldCheck, Zap, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Essential',
      price: billingCycle === 'monthly' ? 297 : 249,
      features: ['15 casos ativos', '3 especialidades', 'Vault básico', 'Audit Log'],
      cta: 'Começar Agora',
      popular: false
    },
    {
      name: 'Professional',
      price: billingCycle === 'monthly' ? 697 : 597,
      features: ['Casos ilimitados', 'IA de Resumo', 'Alertas de prazo', 'Prioridade Geo'],
      cta: 'Obter Professional',
      popular: true
    },
    {
      name: 'Elite',
      price: billingCycle === 'monthly' ? 1297 : 1097,
      features: ['5 usuários inclusos', 'White-label', 'IA de Risco', 'Suporte VIP'],
      cta: 'Assinar Elite',
      popular: false
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gold/5 blur-[120px] rounded-full"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-widest mb-10">
            <ShieldCheck size={14} /> Compliance OAB Provimento 205/2021
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-8 leading-[1.1]">
            Infraestrutura Jurídica <br />
            <span className="text-gold">Premium</span> para Escritórios.
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-medium">
            Gestão administrativa, triagem inteligente com IA e segurança de nível bancário para advogados de alta performance.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link
              href="/register"
              className="px-10 py-5 bg-gold text-obsidian rounded-2xl font-black text-lg hover:bg-white transition-all shadow-[0_0_40px_rgba(201,162,39,0.2)] flex items-center gap-3"
            >
              SOU ADVOGADO <ArrowRight size={20} />
            </Link>
            <Link
              href="/triage"
              className="px-10 py-5 bg-carbon border border-gold/30 text-white rounded-2xl font-black text-lg hover:bg-gold/10 transition-all flex items-center gap-3"
            >
              SOU CLIENTE
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 px-6 bg-carbon/20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: "Triagem com IA",
              desc: "Entrevistas estruturadas que extraem fatos e classificam casos automaticamente."
            },
            {
              icon: Globe,
              title: "Geo-Discovery",
              desc: "Matching inteligente entre clientes e advogados baseado em localização e especialidade."
            },
            {
              icon: ShieldCheck,
              title: "Vault Criptografado",
              desc: "Documentos protegidos por AES-256 com logs de acesso imutáveis para LGPD."
            },
          ].map((benefit, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] bg-carbon border border-gold/5 hover:border-gold/20 transition-all group">
              <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <benefit.icon className="text-gold" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{benefit.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-6 tracking-tight">Planos de Infraestrutura</h2>

            <div className="inline-flex items-center p-1 bg-carbon rounded-xl border border-gold/10">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${billingCycle === 'monthly' ? 'bg-gold text-obsidian' : 'text-slate-400'}`}
              >
                Mensal
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${billingCycle === 'annual' ? 'bg-gold text-obsidian' : 'text-slate-400'}`}
              >
                Anual (-20%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <div key={i} className={`p-10 rounded-[3rem] bg-carbon border flex flex-col ${plan.popular ? 'border-gold shadow-[0_0_50px_rgba(201,162,39,0.1)]' : 'border-gold/10'}`}>
                {plan.popular && <div className="text-[10px] font-black uppercase text-gold mb-6 tracking-[0.2em]">Mais Escolhido</div>}
                <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black text-gold">R${plan.price}</span>
                  <span className="text-slate-500 font-bold text-sm">/mês</span>
                </div>

                <div className="space-y-4 flex-1 mb-10">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-3 text-slate-300 font-medium text-sm">
                      <CheckCircle2 size={16} className="text-gold" /> {f}
                    </div>
                  ))}
                </div>

                <Link
                  href="/register"
                  className={`w-full py-4 rounded-2xl font-black text-center transition-all ${plan.popular ? 'bg-gold text-obsidian shadow-lg' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
