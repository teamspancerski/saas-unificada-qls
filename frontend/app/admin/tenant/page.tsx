'use client';
import { Shield, Users, Server, Settings, Database, Activity, Globe, Lock } from 'lucide-react';

export default function AdminTenantPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-slate-200 selection:bg-[#00ff88]/30 font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
             <div className="w-1.5 h-10 bg-amber-500 rounded-full shadow-[0_0_15px_#f59e0b]"></div>
             <div>
                <h1 className="text-3xl font-black tracking-tight text-white uppercase">Admin Tenant</h1>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Configurações de Instância QLS</p>
             </div>
          </div>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center gap-4 backdrop-blur-md">
                <Shield size={20} className="text-amber-500" />
                <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Master Auth</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-3xl p-8 space-y-6">
                <div className="flex items-center gap-4 text-white">
                    <Users size={24} className="text-[#00ff88]" />
                    <h3 className="text-lg font-black uppercase tracking-tighter">Usuários Totais</h3>
                </div>
                <div className="text-4xl font-black">1,452</div>
                <div className="pt-4 border-t border-white/5 space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-500">Ativos Hoje</span>
                        <span className="text-[#00ff88]">342</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-500">Novos (7d)</span>
                        <span className="text-[#00d4ff]">89</span>
                    </div>
                </div>
            </div>

            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-3xl p-8 space-y-6">
                <div className="flex items-center gap-4 text-white">
                    <Server size={24} className="text-[#00d4ff]" />
                    <h3 className="text-lg font-black uppercase tracking-tighter">Status Cluster</h3>
                </div>
                <div className="text-4xl font-black text-[#00ff88]">99.9%</div>
                <div className="pt-4 border-t border-white/5 space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-500">Latency</span>
                        <span className="text-[#00ff88]">12ms</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-500">Uptime</span>
                        <span className="text-[#00d4ff]">45d 12h</span>
                    </div>
                </div>
            </div>

            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-3xl p-8 space-y-6">
                <div className="flex items-center gap-4 text-white">
                    <Database size={24} className="text-rose-500" />
                    <h3 className="text-lg font-black uppercase tracking-tighter">Database Load</h3>
                </div>
                <div className="text-4xl font-black">12.4%</div>
                <div className="pt-4 border-t border-white/5 space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-500">Connections</span>
                        <span className="text-white">84 / 500</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-500">Storage</span>
                        <span className="text-white">4.2 GB</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
            <h3 className="text-xl font-black text-white uppercase mb-8 flex items-center gap-4">
                <Settings size={24} /> Configurações de Tenant
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <Globe size={12} /> Domínio Principal
                        </label>
                        <input type="text" defaultValue="app.qls.com" className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm font-bold text-white focus:border-[#00ff88]/50 outline-none" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <Lock size={12} /> Default User Limit
                        </label>
                        <input type="number" defaultValue="5000" className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm font-bold text-white focus:border-[#00ff88]/50 outline-none" />
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="flex justify-between items-center p-6 bg-black/40 rounded-3xl border border-white/5">
                        <div className="space-y-1">
                            <p className="text-xs font-black text-white uppercase">Maintenance Mode</p>
                            <p className="text-[10px] font-bold text-slate-500">Derruba todas conexões ativas</p>
                        </div>
                        <div className="w-14 h-7 bg-slate-800 rounded-full relative cursor-pointer p-1">
                            <div className="w-5 h-5 bg-slate-600 rounded-full absolute left-1"></div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center p-6 bg-black/40 rounded-3xl border border-white/5">
                        <div className="space-y-1">
                            <p className="text-xs font-black text-white uppercase">New Registrations</p>
                            <p className="text-[10px] font-bold text-slate-500">Permitir novos usuários</p>
                        </div>
                        <div className="w-14 h-7 bg-[#00ff88]/20 border border-[#00ff88]/30 rounded-full relative cursor-pointer p-1">
                            <div className="w-5 h-5 bg-[#00ff88] rounded-full shadow-[0_0_10px_#00ff88] absolute right-1"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </main>
  );
}
