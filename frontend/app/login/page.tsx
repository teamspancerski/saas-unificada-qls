'use client';
import { useState } from 'react';
import { Mail, Lock, Wallet, ShieldCheck, ArrowRight, Zap } from 'lucide-react';
import { ethers } from 'ethers';

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleWalletAuth = async () => {
    setLoading(true);
    if ((window as any).ethereum) {
      try {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const address = accounts[0];
        const signer = await provider.getSigner();
        const message = `Autenticação Quantum Liquid System\nTimestamp: ${Date.now()}`;
        const signature = await signer.signMessage(message);
        console.log('Autenticado:', address, signature);
        // Aqui iria a chamada para o backend
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("Rabby or Metamask not found");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00ff88]/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00d4ff]/10 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="glass p-10 rounded-[3rem] border-white/10 relative">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="p-5 bg-[#00ff88]/10 rounded-[2rem] border border-[#00ff88]/20 shadow-[0_0_30px_rgba(0,255,136,0.1)] mb-6">
              <Zap size={40} className="text-[#00ff88]" fill="#00ff88" />
            </div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-[#00ff88] to-[#00d4ff] bg-clip-text text-transparent tracking-tighter mb-2">
              {isRegistering ? 'CRIAR CONTA' : 'QUANTUM LIQUID'}
            </h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
              {isRegistering ? 'Junte-se ao futuro do trading' : 'Acesse o seu terminal de elite'}
            </p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#00ff88] transition-colors" size={18} />
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-300 focus:outline-none focus:border-[#00ff88]/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Senha</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#00ff88] transition-colors" size={18} />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-300 focus:outline-none focus:border-[#00ff88]/50 transition-all"
                />
              </div>
            </div>

            {!isRegistering && (
              <div className="flex justify-end">
                <button type="button" className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-[#00ff88] transition-colors">
                  Esqueceu a senha?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-[#00ff88] text-black font-black text-sm rounded-2xl shadow-[0_0_30px_rgba(0,255,136,0.2)] hover:shadow-[#00ff88]/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase tracking-widest"
            >
              {isRegistering ? 'Criar Conta Free' : 'Entrar no Terminal'}
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-white/5"></div>
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Ou</span>
            <div className="h-[1px] flex-1 bg-white/5"></div>
          </div>

          <button
            onClick={handleWalletAuth}
            disabled={loading}
            className="w-full py-4 glass border-white/10 hover:border-[#00d4ff]/50 rounded-2xl text-slate-300 font-black text-sm transition-all flex items-center justify-center gap-3 uppercase tracking-widest group"
          >
            <Wallet size={18} className="text-[#00d4ff] group-hover:scale-110 transition-transform" />
            {loading ? 'Sincronizando...' : 'Acesso via Wallet'}
          </button>

          <div className="mt-10 text-center">
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors"
            >
              {isRegistering ? 'Já tem conta? Login' : 'Não tem conta? Cadastre-se'}
            </button>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-8 text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.15em]">Secure Auth</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.15em]">Low Latency</span>
          </div>
        </div>
      </div>
    </div>
  );
}
