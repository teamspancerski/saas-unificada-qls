'use client';
import { Zap, Mail, Lock, Chrome } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 selection:bg-[#00ff88]/30">
      <div className="w-full max-w-md space-y-8 bg-white/[0.02] backdrop-blur-3xl border border-white/5 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        {/* Decorative Glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00ff88]/10 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#00d4ff]/10 rounded-full blur-[100px]"></div>

        <div className="text-center relative">
          <div className="inline-flex p-4 bg-[#00ff88]/10 rounded-2xl border border-[#00ff88]/30 shadow-[0_0_20px_rgba(0,255,136,0.2)] mb-6">
            <Zap size={32} className="text-[#00ff88]" fill="#00ff88" />
          </div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-[#00ff88] to-[#00d4ff] bg-clip-text text-transparent tracking-tighter">
            QLS PREMIUM
          </h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">Acesso Restrito</p>
        </div>

        <form className="mt-8 space-y-6 relative">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="email"
                placeholder="EMAIL"
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[#00ff88]/50 transition-all"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="password"
                placeholder="SENHA"
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[#00ff88]/50 transition-all"
              />
            </div>
          </div>

          <button className="w-full py-4 bg-[#00ff88] text-black font-black text-xs uppercase tracking-widest rounded-2xl shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:shadow-[0_0_30px_rgba(0,255,136,0.5)] transition-all transform hover:-translate-y-0.5">
            Entrar no Terminal
          </button>

          <div className="relative flex items-center justify-center py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <span className="relative bg-[#0a0a0a] px-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">Ou continue com</span>
          </div>

          <button className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
            <Chrome size={18} /> Google Account
          </button>
        </form>

        <p className="text-center text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-8">
          Protegido por QLS Engine v4.0.1
        </p>
      </div>
    </main>
  );
}
