'use client';

import React from 'react';
import { User, Mail, Shield, Wallet, Award, Clock, Camera, ExternalLink } from 'lucide-react';

export default function ProfilePage() {
  const activities = [
    { event: 'Login realizado', date: 'Hoje, 09:42', device: 'Chrome on MacOS' },
    { event: 'Chave API Atualizada', date: 'Ontem, 18:15', device: 'Chrome on MacOS' },
    { event: 'Plano Assinado: Elite', date: '12 Abr, 14:22', device: 'System' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Cover & Profile Header */}
      <div className="relative">
        <div className="h-48 w-full bg-gradient-to-r from-[#00ff88]/20 to-[#00d4ff]/20 rounded-[2.5rem] border border-white/10"></div>
        <div className="absolute -bottom-10 left-10 flex items-end gap-6">
          <div className="relative group">
            <div className="w-32 h-32 rounded-3xl bg-slate-800 border-4 border-[#0a0a0a] flex items-center justify-center overflow-hidden">
               <User size={64} className="text-slate-600" />
            </div>
            <button className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-3xl">
              <Camera size={24} className="text-white" />
            </button>
          </div>
          <div className="mb-4">
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Trader QLS</h1>
            <p className="text-[10px] font-black text-[#00ff88] uppercase tracking-[0.3em]">Membro Elite desde Abr 2026</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-16">
        {/* Left Column: Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-300">Informações Pessoais</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-1 block">Nome de Exibição</label>
                <div className="flex items-center gap-3 p-4 bg-black/40 border border-white/5 rounded-2xl">
                  <User size={16} className="text-slate-500" />
                  <span className="text-[11px] font-bold text-slate-200">Trader QLS</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-1 block">E-mail Principal</label>
                <div className="flex items-center gap-3 p-4 bg-black/40 border border-white/5 rounded-2xl">
                  <Mail size={16} className="text-slate-500" />
                  <span className="text-[11px] font-bold text-slate-200">trader@qls-premium.com</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-1 block">Carteira Web3 (Rabby)</label>
                <div className="flex items-center gap-3 p-4 bg-black/40 border border-white/5 rounded-2xl">
                  <Wallet size={16} className="text-slate-500" />
                  <span className="text-[11px] font-mono text-slate-400">0x71C7...4E5F</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-1 block">Verificação</label>
                <div className="flex items-center gap-3 p-4 bg-[#00ff88]/5 border border-[#00ff88]/10 rounded-2xl">
                  <Shield size={16} className="text-[#00ff88]" />
                  <span className="text-[11px] font-black text-[#00ff88] uppercase tracking-widest">Verificado</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-300">Atividade da Conta</h3>
            <div className="space-y-4">
              {activities.map((act, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-white/[0.02] rounded-2xl transition-all border border-transparent hover:border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-black/40 rounded-xl">
                      <Clock size={16} className="text-slate-500" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-200">{act.event}</p>
                      <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-0.5">{act.device}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{act.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Badges & Stats */}
        <div className="space-y-8">
          <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[#00ff88]/10 to-transparent border border-[#00ff88]/20 backdrop-blur-md space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#00ff88]">Ranking QLS</h3>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-black/40 rounded-3xl border border-[#00ff88]/30 shadow-[0_0_20px_rgba(0,255,136,0.15)]">
                <Award size={40} className="text-[#00ff88]" />
              </div>
              <div>
                <p className="text-2xl font-black text-white uppercase tracking-tighter">Elite Tier</p>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Top 5% dos usuários</p>
              </div>
            </div>
            <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
              <div className="h-full w-[85%] bg-[#00ff88] shadow-[0_0_10px_#00ff88]"></div>
            </div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest text-right">850 / 1000 XP</p>
          </div>

          <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-6">
             <h3 className="text-sm font-black uppercase tracking-widest text-slate-300">Assinatura</h3>
             <div className="p-6 bg-black/40 rounded-3xl border border-white/5">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Plano Atual</p>
                <p className="text-xl font-black text-white mt-1">QLS PREM ELITE</p>
                <p className="text-[10px] text-[#00ff88] font-bold mt-4 flex items-center gap-2 cursor-pointer hover:underline">
                  Gerenciar na Stripe <ExternalLink size={12} />
                </p>
             </div>
             <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white/10 hover:text-white transition-all">
               Fazer Downgrade
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
