'use client';
import { useState, useEffect } from 'react';
import { Target, Zap, Shield, Play, Pause, Settings2, Info, Plus } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function Strategies() {
  const [bots, setBots] = useState<any[]>([]);
  const [selectedBot, setSelectedBot] = useState<any>(null);
  const [orgId] = useState('default-org');

  useEffect(() => {
    fetchBots();
  }, []);

  const fetchBots = async () => {
    try {
      const res = await axios.get(`${API_URL}/bots/org/${orgId}`);
      setBots(res.data);
      if (res.data.length > 0 && !selectedBot) {
        setSelectedBot(res.data[0]);
      }
    } catch (err) {
      console.error('Error fetching bots:', err);
    }
  };

  const handleToggle = async (status: string) => {
    if (!selectedBot) return;
    try {
      await axios.post(`${API_URL}/bots/${selectedBot.id}/toggle`, { status });
      const updatedBot = { ...selectedBot, status };
      setSelectedBot(updatedBot);
      setBots(bots.map(b => b.id === updatedBot.id ? updatedBot : b));
    } catch (err) {
      console.error('Error toggling bot:', err);
    }
  };

  const updateConfig = async (newSettings: any) => {
    if (!selectedBot) return;
    try {
      await axios.post(`${API_URL}/bots/${selectedBot.id}/config`, newSettings);
      const updatedBot = { ...selectedBot, settings: { ...selectedBot.settings, ...newSettings } };
      setSelectedBot(updatedBot);
      setBots(bots.map(b => b.id === updatedBot.id ? updatedBot : b));
    } catch (err) {
      console.error('Error updating config:', err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Estratégias Quantum</h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Configure o motor de execução para seus ativos</p>
        </div>
        <button className="flex items-center gap-3 px-6 py-3 bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20 rounded-2xl hover:bg-[#00ff88]/20 transition-all">
          <Plus size={18} />
          <span className="text-xs font-black uppercase tracking-widest">Novo Bot</span>
        </button>
      </header>

      {/* Bot Selector Tabs */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {bots.map(bot => (
          <button
            key={bot.id}
            onClick={() => setSelectedBot(bot)}
            className={`px-6 py-3 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
              selectedBot?.id === bot.id
              ? 'bg-[#00ff88]/10 border-[#00ff88]/30 text-[#00ff88]'
              : 'bg-white/5 border-white/5 text-slate-500 hover:text-white'
            }`}
          >
            {bot.name} ({bot.pair})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {selectedBot ? (
          <>
            <div className="lg:col-span-2 space-y-8">
              <div className="glass p-10 rounded-[3rem] space-y-10">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-3">
                      <Play size={18} className="text-[#00ff88]" /> Modo de Execução: {selectedBot.name}
                    </h3>
                    <Info size={16} className="text-slate-600 cursor-help" />
                  </div>

                  <div className="grid grid-cols-3 gap-4 p-2 bg-black/40 rounded-[2rem] border border-white/5">
                    {['OFF', 'MONITOR', 'AUTO'].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => handleToggle(mode.toLowerCase())}
                        className={`py-4 rounded-[1.5rem] text-[10px] font-black transition-all uppercase tracking-widest ${
                          selectedBot.status === mode.toLowerCase()
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
                      <span className="text-xl font-black text-[#00d4ff]">${(selectedBot.settings?.capitalTotal || 1000).toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="1000"
                      max="100000"
                      step="1000"
                      value={selectedBot.settings?.capitalTotal || 1000}
                      onChange={(e) => updateConfig({ capitalTotal: Number(e.target.value) })}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-black uppercase tracking-widest flex items-center gap-3">
                        <Shield size={18} className="text-rose-500" /> Risco por Trade (%)
                      </label>
                      <span className="text-xl font-black text-rose-500">{selectedBot.settings?.riskPerTrade || 1.0}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="5"
                      step="0.1"
                      value={selectedBot.settings?.riskPerTrade || 1.0}
                      onChange={(e) => updateConfig({ riskPerTrade: Number(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass p-8 rounded-[2.5rem] border-[#00ff88]/10 bg-[#00ff88]/5">
                <h3 className="text-xs font-black uppercase tracking-widest mb-4 text-[#00ff88]">Status do Bot</h3>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full ${selectedBot.status !== 'off' ? 'bg-[#00ff88] animate-pulse' : 'bg-slate-600'}`}></div>
                  <span className="text-[10px] font-black uppercase tracking-widest">{selectedBot.status.toUpperCase()}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  Ativo selecionado: <b>{selectedBot.pair}</b>.
                  O motor QLC analisa o par em 3 timeframes para garantir sinais de alta probabilidade.
                </p>
              </div>

              <div className="glass p-8 rounded-[2.5rem] border-white/10 space-y-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Configuração Atual</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Max Hold</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">{selectedBot.settings?.maxHoldTime || '4h'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Trailing Stop</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#00ff88]">Ativo</span>
                  </div>
                </div>
              </div>

              <div className="p-8 glass rounded-[2.5rem] border-white/10 flex flex-col items-center text-center">
                <Settings2 size={32} className="text-slate-600 mb-4" />
                <h4 className="text-xs font-black uppercase tracking-widest mb-2">Ajustes Avançados</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-6">Em breve para usuários Premium</p>
                <button className="text-[10px] font-black uppercase tracking-widest px-6 py-3 border border-white/10 rounded-xl hover:border-[#00d4ff]/50 hover:text-[#00d4ff] transition-all">
                  Upgrade Now
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="lg:col-span-3 py-20 text-center glass rounded-[3rem]">
            <p className="text-slate-500 font-black uppercase tracking-widest">Nenhum bot configurado nesta organização</p>
          </div>
        )}
      </div>
    </div>
  );
}
