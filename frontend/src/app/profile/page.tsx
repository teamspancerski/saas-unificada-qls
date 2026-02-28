'use client';
import { User, Mail, Wallet, ShieldCheck, Zap, Camera, LogOut } from 'lucide-react';

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-slate-200 selection:bg-[#00ff88]/30 font-sans p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">

        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
             <div className="w-1.5 h-10 bg-[#00ff88] rounded-full shadow-[0_0_15px_#00ff88]"></div>
             <div>
                <h1 className="text-3xl font-black tracking-tight text-white uppercase">Perfil do Usuário</h1>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Identidade QLS Premium</p>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 flex flex-col items-center text-center space-y-6">
             <div className="relative group">
                <div className="w-32 h-32 bg-gradient-to-br from-[#00ff88] to-[#00d4ff] rounded-full p-1 relative overflow-hidden">
                    <div className="w-full h-full bg-[#0a0a0a] rounded-full flex items-center justify-center">
                        <User size={64} className="text-slate-700" />
                    </div>
                </div>
                <button className="absolute bottom-0 right-0 p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 text-white hover:bg-[#00ff88] hover:text-black transition-all">
                    <Camera size={16} />
                </button>
             </div>

             <div>
                <h3 className="text-xl font-black text-white uppercase">Master Trader</h3>
                <p className="text-[#00ff88] text-[10px] font-black uppercase tracking-widest mt-1">Plan Elite Active</p>
             </div>

             <div className="w-full pt-6 border-t border-white/5 space-y-4">
                <div className="flex items-center gap-4 text-slate-500 hover:text-white transition-colors cursor-pointer group">
                   <div className="p-3 bg-white/5 rounded-xl border border-white/5 group-hover:border-[#00ff88]/30">
                      <Mail size={18} />
                   </div>
                   <div className="text-left">
                      <p className="text-[9px] font-black uppercase tracking-widest">Email Ativo</p>
                      <p className="text-xs font-bold">master@qls.com</p>
                   </div>
                </div>
                <div className="flex items-center gap-4 text-slate-500 hover:text-white transition-colors cursor-pointer group">
                   <div className="p-3 bg-white/5 rounded-xl border border-white/5 group-hover:border-[#00d4ff]/30">
                      <Wallet size={18} />
                   </div>
                   <div className="text-left">
                      <p className="text-[9px] font-black uppercase tracking-widest">Wallet Rabby</p>
                      <p className="text-xs font-bold">0x42...88ff</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="md:col-span-2 space-y-8">
             <div className="bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 space-y-8">
                <div className="flex items-center gap-4 text-[#00ff88]">
                    <ShieldCheck size={24} />
                    <h3 className="text-lg font-black uppercase tracking-tighter">Segurança da Conta</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div className="p-6 bg-black/40 rounded-3xl border border-white/5 hover:border-[#00ff88]/20 transition-all">
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4">2FA Authentication</p>
                      <div className="flex justify-between items-center">
                         <span className="text-lg font-black text-white">ATIVADO</span>
                         <Zap size={20} className="text-[#00ff88]" fill="#00ff88" />
                      </div>
                   </div>
                   <div className="p-6 bg-black/40 rounded-3xl border border-white/5 hover:border-[#00d4ff]/20 transition-all">
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4">Acessos Simultâneos</p>
                      <div className="flex justify-between items-center">
                         <span className="text-lg font-black text-white">MAX 3</span>
                         <span className="text-[10px] font-bold text-slate-500">Ilimitado</span>
                      </div>
                   </div>
                </div>

                <div className="space-y-4 pt-8 border-t border-white/5">
                    <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all">
                        Alterar Senha de Acesso
                    </button>
                    <button className="w-full py-4 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3">
                        <LogOut size={18} /> Deletar Conta Permanente
                    </button>
                </div>
             </div>
          </div>

        </div>

      </div>
    </main>
  );
}
