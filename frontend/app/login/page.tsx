'use client';
import { useState } from 'react';
import { Gavel, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await api.post('/login/lawyer', { email, password });
      if (data.token) {
        localStorage.setItem('aurex_token', data.token);
        router.push('/dashboard');
      } else {
        setError(data.error || 'Credenciais inválidas');
      }
    } catch (err) {
      setError('Erro ao conectar ao servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gold/10 border border-gold/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Gavel className="text-gold" size={32} />
          </div>
          <h1 className="text-3xl font-black text-white">Acesse seu Painel</h1>
          <p className="text-slate-500 font-medium">AUREX LAW - Infraestrutura Jurídica</p>
        </div>

        <form onSubmit={handleLogin} className="bg-carbon border border-gold/10 p-10 rounded-[3rem] space-y-6">
          {error && <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 text-sm font-bold">{error}</div>}

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Profissional</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-obsidian border border-gold/10 rounded-2xl py-4 pl-12 pr-6 text-white font-medium focus:border-gold/50 outline-none transition-all"
                placeholder="ex: oab@escritorio.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Senha</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-obsidian border border-gold/10 rounded-2xl py-4 pl-12 pr-6 text-white font-medium focus:border-gold/50 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-gold text-obsidian rounded-2xl font-black text-lg hover:bg-white transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <>ENTRAR NO PAINEL <ArrowRight size={20} /></>}
          </button>
        </form>

        <p className="mt-8 text-center text-slate-500 text-sm font-medium">
          Ainda não possui infraestrutura? <Link href="/register" className="text-gold font-bold hover:underline">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}
