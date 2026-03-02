'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, FileText, CheckCircle2, Gavel, User, Mail, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { api } from '@/lib/api';

export default function TriagePage() {
  const [step, setStep] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const steps = [
    {
      id: 'name',
      label: 'Qual o seu nome?',
      icon: User,
      placeholder: 'Digite seu nome completo',
      type: 'text'
    },
    {
      id: 'email',
      label: 'Qual o seu email?',
      icon: Mail,
      placeholder: 'ex: contato@exemplo.com',
      type: 'email'
    },
    {
      id: 'description',
      label: 'Descreva seu caso brevemente',
      icon: MessageSquare,
      placeholder: 'O que aconteceu? (ex: Problema trabalhista, divórcio, etc.)',
      type: 'textarea'
    }
  ];

  useEffect(() => {
    api.post('/triage/start', {})
      .then(data => setSessionId(data.sessionId));
  }, []);

  const handleNext = async () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setLoading(true);
      if (!sessionId) return;
      const data = await api.post(`/triage/process/${sessionId}`, formData);
      setResult(data);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        <div className="mb-12 text-center">
          <div className="w-16 h-16 bg-gold/10 border border-gold/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Gavel className="text-gold" size={32} />
          </div>
          <h1 className="text-3xl font-black text-white mb-3">Triagem Administrativa</h1>
          <p className="text-slate-500 font-medium">Entrevista estruturada assistida por Inteligência Artificial.</p>
        </div>

        <div className="bg-carbon border border-gold/10 p-10 rounded-[3rem] shadow-[0_0_100px_rgba(201,162,39,0.05)] relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 text-gold mb-2">
                  <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center">
                    {(() => {
                        const Icon = steps[step].icon;
                        return <Icon size={20} />;
                    })()}
                  </div>
                  <span className="text-sm font-black uppercase tracking-widest">Passo {step + 1} de {steps.length}</span>
                </div>

                <h2 className="text-2xl font-black text-white">{steps[step].label}</h2>

                {steps[step].type === 'textarea' ? (
                  <textarea
                    autoFocus
                    placeholder={steps[step].placeholder}
                    value={(formData as any)[steps[step].id]}
                    onChange={(e) => setFormData({ ...formData, [steps[step].id]: e.target.value })}
                    className="w-full bg-obsidian border border-gold/10 rounded-2xl p-6 text-white text-lg font-medium focus:border-gold/50 outline-none transition-all h-40 resize-none"
                  />
                ) : (
                  <input
                    autoFocus
                    type={steps[step].type}
                    placeholder={steps[step].placeholder}
                    value={(formData as any)[steps[step].id]}
                    onChange={(e) => setFormData({ ...formData, [steps[step].id]: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                    className="w-full bg-obsidian border border-gold/10 rounded-2xl p-6 text-white text-lg font-medium focus:border-gold/50 outline-none transition-all"
                  />
                )}

                <button
                  onClick={handleNext}
                  disabled={loading || !(formData as any)[steps[step].id]}
                  className="w-full py-5 bg-gold text-obsidian rounded-2xl font-black text-lg hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {loading ? 'Processando IA...' : step === steps.length - 1 ? 'Finalizar Triagem' : 'Próximo Passo'} <Send size={20} />
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8"
              >
                <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="text-emerald-500" size={40} />
                </div>
                <h2 className="text-3xl font-black text-white">Triagem Concluída</h2>
                <div className="p-6 bg-obsidian rounded-2xl border border-gold/10 text-left space-y-4">
                  <p className="text-xs font-black uppercase tracking-widest text-gold">Resumo da IA</p>
                  <p className="text-slate-400 font-medium leading-relaxed">{result.ai_summary}</p>
                  <div className="flex items-center gap-3 mt-4">
                    <span className="px-3 py-1 bg-gold/10 border border-gold/30 text-gold rounded-lg text-[10px] font-black uppercase">{result.auto_classification}</span>
                  </div>
                </div>

                <div className="p-6 bg-rose-500/5 border border-rose-500/20 rounded-2xl">
                    <p className="text-xs text-rose-500 font-bold italic">“Revisão Profissional Obrigatória: A triagem acima foi gerada por infraestrutura tecnológica e deve ser analisada por um advogado devidamente inscrito na OAB.”</p>
                </div>

                <Link
                  href="/lawyers/discover"
                  className="w-full py-5 bg-gold text-obsidian rounded-2xl font-black text-lg hover:bg-white transition-all flex items-center justify-center gap-3"
                >
                  Descobrir Advogados <FileText size={20} />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
