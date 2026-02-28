'use client';
import { Settings, Shield, Cpu, Key, Bell, Save, Zap } from 'lucide-react';

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-slate-200 selection:bg-[#00ff88]/30 font-sans p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">

        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
             <div className="w-1.5 h-10 bg-[#00ff88] rounded-full shadow-[0_0_15px_#00ff88]"></div>
             <div>
                <h1 className="text-3xl font-black tracking-tight text-white uppercase">Configurações QLS</h1>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Preferências do Terminal e Engine</p>
             </div>
          </div>
          <button className="flex items-center gap-3 px-8 py-4 bg-[#00ff88] text-black font-black text-xs uppercase tracking-widest rounded-2xl shadow-[0_0_30px_rgba(0,255,136,0.3)] hover:scale-105 transition-all">
            <Save size={18} /> Salvar Alterações
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bot Engine Settings */}
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 space-y-6">
            <div className="flex items-center gap-4 text-[#00ff88] mb-2">
                <Cpu size={24} />
                <h3 className="text-lg font-black uppercase tracking-tighter">Motor QLC Core</h3>
            </div>
            <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-black/40 rounded-2xl border border-white/5">
                    <span className="text-xs font-bold text-slate-400">Auto-Compound (Juros)</span>
                    <div className="w-12 h-6 bg-[#00ff88]/20 border border-[#00ff88]/30 rounded-full relative cursor-pointer p-1">
                        <div className="w-4 h-4 bg-[#00ff88] rounded-full shadow-[0_0_10px_#00ff88] absolute right-1"></div>
                    </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-black/40 rounded-2xl border border-white/5">
                    <span className="text-xs font-bold text-slate-400">Modo de Alta Precisão</span>
                    <div className="w-12 h-6 bg-slate-800 rounded-full relative cursor-pointer p-1">
                        <div className="w-4 h-4 bg-slate-600 rounded-full absolute left-1"></div>
                    </div>
                </div>
            </div>
          </div>

          {/* API Exchange Settings */}
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 space-y-6">
            <div className="flex items-center gap-4 text-[#00d4ff] mb-2">
                <Key size={24} />
                <h3 className="text-lg font-black uppercase tracking-tighter">API Exchange</h3>
            </div>
            <div className="space-y-4">
                <input type="text" placeholder="API KEY" className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-xs font-bold text-slate-400 focus:outline-none focus:border-[#00d4ff]/50" />
                <input type="password" placeholder="SECRET KEY" className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-xs font-bold text-slate-400 focus:outline-none focus:border-[#00d4ff]/50" />
            </div>
          </div>

          {/* Risk Management */}
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 space-y-6">
            <div className="flex items-center gap-4 text-rose-500 mb-2">
                <Shield size={24} />
                <h3 className="text-lg font-black uppercase tracking-tighter">Gestão de Risco</h3>
            </div>
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex justify-between">Max Daily Drawdown <span>-5%</span></label>
                    <input type="range" className="w-full accent-rose-500 bg-slate-800 h-1 rounded-lg appearance-none cursor-pointer" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex justify-between">Stop Loss Global <span>$500.00</span></label>
                    <input type="range" className="w-full accent-rose-500 bg-slate-800 h-1 rounded-lg appearance-none cursor-pointer" />
                </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 space-y-6">
            <div className="flex items-center gap-4 text-amber-500 mb-2">
                <Bell size={24} />
                <h3 className="text-lg font-black uppercase tracking-tighter">Notificações</h3>
            </div>
            <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-black/40 rounded-2xl border border-white/5">
                    <span className="text-xs font-bold text-slate-400">Sinais via Telegram</span>
                    <div className="w-12 h-6 bg-amber-500/20 border border-amber-500/30 rounded-full relative cursor-pointer p-1">
                        <div className="w-4 h-4 bg-amber-500 shadow-[0_0_10px_#f59e0b] rounded-full absolute right-1"></div>
                    </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-black/40 rounded-2xl border border-white/5">
                    <span className="text-xs font-bold text-slate-400">Alertas de Execução</span>
                    <div className="w-12 h-6 bg-amber-500/20 border border-amber-500/30 rounded-full relative cursor-pointer p-1">
                        <div className="w-4 h-4 bg-amber-500 shadow-[0_0_10px_#f59e0b] rounded-full absolute right-1"></div>
                    </div>
                </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
