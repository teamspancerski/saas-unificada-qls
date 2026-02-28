'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Lock, LogIn, Chrome, Zap } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-slate-200 font-sans flex items-center justify-center p-6 selection:bg-[#00ff88]/30 overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-[#00ff88]/5 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-[#00d4ff]/5 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="w-full max-w-[450px] relative z-10">
        {/* Logo QLS Central */}
        <div className="flex flex-col items-center mb-10 group">
          <div className="p-5 bg-black/40 border border-[#00ff88]/30 rounded-[2rem] shadow-[0_0_40px_rgba(0,255,136,0.15)] group-hover:shadow-[0_0_60px_rgba(0,255,136,0.25)] transition-all duration-500 mb-6">
            <Zap size={48} className="text-[#00ff88]" fill="#00ff88" />
          </div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-[#00ff88] via-[#00d4ff] to-[#00ff88] bg-clip-text text-transparent uppercase tracking-tighter">
            QLS PREMIUM
          </h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Quantitative Logic System</p>
        </div>

        {/* Form Glassmorphism */}
        <div className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-10 shadow-2xl">
          <h2 className="text-xl font-bold mb-8 text-center">Acessar Plataforma</h2>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Email</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#00ff88] transition-colors" size={18} />
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-[#00ff88]/50 focus:bg-black/60 transition-all font-medium text-sm placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-4 mr-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Senha</label>
                <a href="#" className="text-[10px] font-bold text-[#00ff88]/70 hover:text-[#00ff88]">Esqueceu?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#00ff88] transition-colors" size={18} />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-[#00ff88]/50 focus:bg-black/60 transition-all font-medium text-sm placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* Botão Neon #00ff88 */}
            <button className="w-full bg-[#00ff88] hover:bg-[#00ff88]/90 text-black font-black py-4 rounded-2xl shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:shadow-[0_0_30px_rgba(0,255,136,0.5)] transition-all duration-300 flex items-center justify-center gap-3 text-sm uppercase tracking-widest active:scale-95 mt-4">
              <LogIn size={20} />
              Entrar Agora
            </button>
          </form>

          <div className="relative my-10 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <span className="relative px-4 bg-[#0e0e0e] text-[10px] font-black text-slate-600 uppercase tracking-widest">Ou entrar com</span>
          </div>

          <button className="w-full bg-white/5 hover:bg-white/10 border border-white/5 text-slate-200 font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-4 text-sm active:scale-95 group">
            <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
              <Chrome size={20} className="text-[#00d4ff]" />
            </div>
            Conta Google
          </button>

          <p className="mt-10 text-center text-xs font-medium text-slate-500">
            Ainda não tem conta? {' '}
            <Link href="/register" className="text-[#00ff88] font-black hover:underline underline-offset-4">Crie Agora</Link>
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">© 2026 QLS SAAS • Todos os direitos reservados</p>
        </div>
      </div>
    </main>
  );
}
