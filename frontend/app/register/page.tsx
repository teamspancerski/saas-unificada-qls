'use client';
import { useState } from 'react';
import { Gavel, Mail, Lock, User, Briefcase, Globe, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    OAB_UF: '',
    OAB_Number: '',
    specialties: [] as string[]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await api.post('/register/lawyer', formData);
      if (data.token) {
        localStorage.setItem('aurex_token', data.token);
        router.push('/dashboard');
      } else {
        setError(data.error || 'Erro ao realizar cadastro');
      }
    } catch (err) {
      setError('Erro ao conectar ao servidor');
    } finally {
      setLoading(false);
    }
  };

  const toggleSpecialty = (s: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(s)
        ? prev.specialties.filter(item => item !== s)
        : [...prev.specialties, s]
    }));
  };

  return (
    <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center px-6 py-24">
      <div className="max-w-xl w-full">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gold/10 border border-gold/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Gavel className="text-gold" size={32} />
          </div>
          <h1 className="text-3xl font-black text-white">Nova Infraestrutura</h1>
          <p className="text-slate-500 font-medium italic">Cadastre seu escritório na AUREX LAW</p>
        </div>

        <form onSubmit={handleRegister} className="bg-carbon border border-gold/10 p-10 rounded-[3rem] space-y-8">
          {error && <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 text-sm font-bold">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nome Completo</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                <input
                  type="text" required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-obsidian border border-gold/10 rounded-2xl py-4 pl-12 pr-6 text-white text-sm font-medium focus:border-gold/50 outline-none transition-all"
                  placeholder="Nome do Advogado"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Profissional</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                <input
                  type="email" required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-obsidian border border-gold/10 rounded-2xl py-4 pl-12 pr-6 text-white text-sm font-medium focus:border-gold/50 outline-none transition-all"
                  placeholder="oab@exemplo.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                <input
                  type="password" required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-obsidian border border-gold/10 rounded-2xl py-4 pl-12 pr-6 text-white text-sm font-medium focus:border-gold/50 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">OAB (UF + Número)</label>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text" required maxLength={2}
                  value={formData.OAB_UF}
                  onChange={(e) => setFormData({ ...formData, OAB_UF: e.target.value.toUpperCase() })}
                  className="bg-obsidian border border-gold/10 rounded-2xl py-4 text-center text-white text-sm font-black focus:border-gold/50 outline-none transition-all"
                  placeholder="UF"
                />
                <input
                  type="text" required
                  value={formData.OAB_Number}
                  onChange={(e) => setFormData({ ...formData, OAB_Number: e.target.value })}
                  className="col-span-2 bg-obsidian border border-gold/10 rounded-2xl py-4 px-6 text-white text-sm font-medium focus:border-gold/50 outline-none transition-all"
                  placeholder="Número OAB"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Especialidades (Selecione)</label>
            <div className="flex flex-wrap gap-2">
              {['Civil', 'Trabalhista', 'Criminal', 'Família', 'Empresarial', 'Tributário'].map(s => (
                <button
                  key={s} type="button"
                  onClick={() => toggleSpecialty(s)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${formData.specialties.includes(s) ? 'bg-gold border-gold text-obsidian' : 'bg-obsidian border-gold/10 text-slate-500 hover:border-gold/30'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || formData.specialties.length === 0}
            className="w-full py-5 bg-gold text-obsidian rounded-2xl font-black text-lg hover:bg-white transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <>CRIAR INFRAESTRUTURA <ArrowRight size={20} /></>}
          </button>
        </form>

        <p className="mt-8 text-center text-slate-500 text-sm font-medium">
          Já possui conta? <Link href="/login" className="text-gold font-bold hover:underline">Entre no Painel</Link>
        </p>
      </div>
    </div>
  );
}
