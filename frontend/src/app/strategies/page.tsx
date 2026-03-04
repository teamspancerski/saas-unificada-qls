'use client';
import { useState } from 'react';
import { Target, Zap, Shield, Play, Pause, Settings2, Info } from 'lucide-react';

export default function Strategies() {
  const [strategyMode, setStrategyMode] = useState('monitor');
  const [capital, setCapital] = useState(10000);
  const [risk, setRisk] = useState(1.5);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Estratégias QLC</h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Configure o motor de execução e gerenciamento de risco</p>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 glass rounded-2xl border-[#00ff88]/20">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00ff88] animate-pulse shadow-[0_0_10px_#00ff88]"></div>
          <span className="text-xs font-black uppercase tracking-widest">Motor v4.2 Ativo</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Controls */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass p-10 rounded-[3rem] space-y-10">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-3">
                  <Play size={18} className="text-[#00ff88]" /> Modo de Execução
                </h3>
                <Info size={16} className="text-slate-600 cursor-help" />
              </div>

              <div className="grid grid-cols-3 gap-4 p-2 bg-black/40 rounded-[2rem] border border-white/5">
                {['OFF', 'MONITOR', 'AUTO'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setStrategyMode(mode.toLowerCase())}
                    className={`py-4 rounded-[1.5rem] text-[10px] font-black transition-all uppercase tracking-widest ${
                      strategyMode === mode.toLowerCase()
                        ? 'bg-[#00ff88] text-black shadow-[0_0_30px_rgba(0,255,136,0.3)]'
                        : 'text-slate-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-black uppercase tracking-widest flex items-center gap-3">
                    <Zap size={18} className="text-[#00d4ff]" /> Capital Total (USD)
                  </label>
                  <span className="text-xl font-black text-[#00d4ff]">${capital.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={capital}
                  onChange={(e) => setCapital(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-[10px] font-black text-slate-600 uppercase tracking-widest">
                  <span>$1k</span>
                  <span>$100k</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-black uppercase tracking-widest flex items-center gap-3">
                    <Shield size={18} className="text-rose-500" /> Risco por Trade (%)
                  </label>
                  <span className="text-xl font-black text-rose-500">{risk}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={risk}
                  onChange={(e) => setRisk(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-[10px] font-black text-slate-600 uppercase tracking-widest">
                  <span>0.1%</span>
                  <span>5.0%</span>
                </div>
              </div>
            </div>

            <button className="w-full py-5 bg-white/5 hover:bg-[#00ff88]/10 border border-white/10 hover:border-[#00ff88]/30 rounded-[2rem] text-sm font-black uppercase tracking-[0.2em] transition-all group">
              <span className="group-hover:text-[#00ff88]">Salvar Configurações</span>
            </button>
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
          <div className="glass p-8 rounded-[2.5rem] border-[#00ff88]/10 bg-[#00ff88]/5">
            <h3 className="text-xs font-black uppercase tracking-widest mb-4 text-[#00ff88]">Status do Algoritmo</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              O motor QLC está analisando o regime de mercado atual em 3 timeframes (15m, 1h, 4h).
              Sinais de alta probabilidade (Score {'>'} 85) serão executados automaticamente se o modo AUTO estiver ligado.
            </p>
          </div>

          <div className="glass p-8 rounded-[2.5rem] border-white/10 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Parâmetros Atuais</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Max Hold</span>
                <span className="text-[10px] font-black uppercase tracking-widest">4 Horas</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Trailing Stop</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#00ff88]">Ativo</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Compounding</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#00ff88]">Ativo</span>
              </div>
            </div>
          </div>

          <div className="p-8 glass rounded-[2.5rem] border-white/10 flex flex-col items-center text-center">
            <Settings2 size={32} className="text-slate-600 mb-4" />
            <h4 className="text-xs font-black uppercase tracking-widest mb-2">Ajustes Avançados</h4>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-6">Disponível apenas para usuários ELITE</p>
            <button className="text-[10px] font-black uppercase tracking-widest px-6 py-3 border border-white/10 rounded-xl hover:border-[#00d4ff]/50 hover:text-[#00d4ff] transition-all">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
