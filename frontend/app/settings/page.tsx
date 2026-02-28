'use client';

import React, { useState } from 'react';
import { Settings, Save, Shield, Key, Cpu, Bell, Sliders } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: 'Geral', icon: <Settings size={18} /> },
    { id: 'api', name: 'Chaves API', icon: <Key size={18} /> },
    { id: 'risk', name: 'Risco & Capital', icon: <Shield size={18} /> },
    { id: 'notifications', name: 'Notificações', icon: <Bell size={18} /> },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 bg-black/40 border border-[#00ff88]/20 rounded-[2.5rem] backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-[#00ff88]/10 rounded-2xl border border-[#00ff88]/30 shadow-[0_0_15px_rgba(0,255,136,0.1)]">
            <Sliders size={32} className="text-[#00ff88]" />
          </div>
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-[#00ff88] to-[#00d4ff] bg-clip-text text-transparent uppercase tracking-tighter">
              Configurações QLS
            </h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Personalize sua engine de alta performance</p>
          </div>
        </div>
        <button className="px-8 py-4 bg-[#00ff88] text-black rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:scale-105 transition-all flex items-center gap-2">
          <Save size={16} /> Salvar Alterações
        </button>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full lg:w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-[#00ff88]/10 text-[#00ff88] border-[#00ff88]/30'
                  : 'bg-white/0 text-slate-500 border-transparent hover:bg-white/5 hover:text-slate-300'
              }`}
            >
              {tab.icon}
              <span className="text-[10px] font-black uppercase tracking-widest">{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-8">
          {activeTab === 'general' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
                  <Cpu size={16} className="text-[#00ff88]" /> Sistema QLC
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-200">Execução Automática</p>
                      <p className="text-[9px] text-slate-500 mt-1">O bot abrirá ordens assim que o score {'>'} 75%</p>
                    </div>
                    <div className="w-12 h-6 bg-[#00ff88]/20 rounded-full relative cursor-pointer border border-[#00ff88]/30">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-[#00ff88] rounded-full shadow-[0_0_10px_#00ff88]"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-200">Modo Monitoramento</p>
                      <p className="text-[9px] text-slate-500 mt-1">Apenas envia alertas sem executar</p>
                    </div>
                    <div className="w-12 h-6 bg-white/10 rounded-full relative cursor-pointer border border-white/10">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-slate-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-300">Idioma & Região</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Idioma da Interface</label>
                    <select className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-[11px] font-bold text-slate-200 outline-none focus:border-[#00ff88]/50 transition-all appearance-none">
                      <option>Português (Brasil)</option>
                      <option>English (US)</option>
                      <option>Español</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Fuso Horário</label>
                    <select className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-[11px] font-bold text-slate-200 outline-none focus:border-[#00ff88]/50 transition-all appearance-none">
                      <option>UTC-3 (São Paulo)</option>
                      <option>UTC+0 (Londres)</option>
                      <option>UTC-5 (Nova York)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-300">Conexão Exchange</h3>
                <span className="px-3 py-1 bg-[#00ff88]/10 text-[#00ff88] text-[9px] font-black rounded-lg border border-[#00ff88]/20">BINANCE CONNECTED</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-1 block">API Key</label>
                  <div className="relative">
                    <input
                      type="password"
                      value="************************"
                      className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-[11px] font-mono text-slate-400 outline-none focus:border-[#00ff88]/50 transition-all"
                      readOnly
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-[#00ff88] hover:underline uppercase">Editar</button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-1 block">Secret Key</label>
                  <div className="relative">
                    <input
                      type="password"
                      value="************************"
                      className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-[11px] font-mono text-slate-400 outline-none focus:border-[#00ff88]/50 transition-all"
                      readOnly
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-[#00ff88] hover:underline uppercase">Editar</button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex items-start gap-4">
                <Shield size={20} className="text-amber-500 shrink-0" />
                <p className="text-[10px] text-amber-500/80 leading-relaxed font-bold uppercase tracking-tight">
                  Suas chaves API são criptografadas em repouso (AES-256). Certifique-se de habilitar apenas permissões de "Spot Trading" e desabilitar "Withdrawals" na sua exchange.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'risk' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Capital Alocado</h3>
                <div className="text-4xl font-black text-white text-center">$12,000</div>
                <input type="range" className="w-full accent-[#00ff88]" />
                <div className="flex justify-between text-[9px] font-black text-slate-600 uppercase">
                  <span>$1k</span>
                  <span>$50k</span>
                </div>
              </div>
              <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Risco por Trade</h3>
                <div className="text-4xl font-black text-[#00ff88] text-center">1.5%</div>
                <div className="grid grid-cols-3 gap-2">
                  {['0.5%', '1.0%', '2.0%'].map(v => (
                    <button key={v} className="py-2 rounded-lg bg-white/5 border border-white/10 text-[9px] font-black text-slate-400 hover:text-white hover:border-[#00ff88]/30 transition-all">{v}</button>
                  ))}
                </div>
              </div>
              <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Max Drawdown Stop</h3>
                <div className="text-4xl font-black text-rose-500 text-center">-5.0%</div>
                <p className="text-[9px] text-slate-500 text-center font-bold uppercase leading-tight">O bot pausará todas as operações se o DD atingir este valor.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
