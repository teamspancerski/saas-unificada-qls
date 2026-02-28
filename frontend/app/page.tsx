'use client';
import { useState, useEffect } from 'react';
import { Bot, Play, Pause, DollarSign, TrendingUp } from 'lucide-react';
import { ethers } from 'ethers';

const BACKEND_URL = 'http://localhost:3000';

export default function Dashboard() {
  const [botStatus, setBotStatus] = useState(false);
  const [signals, setSignals] = useState([]);
  const [account, setAccount] = useState(null);
  const [user, setUser] = useState(null);

  const connectWallet = async () => {
    if ((window as any).ethereum) {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];
      setAccount(address);

      const res = await fetch(`${BACKEND_URL}/user/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: address })
      });
      const userData = await res.json();
      setUser(userData);
      setBotStatus(userData.botStatus);
    } else {
      alert("Rabby or Metamask not found");
    }
  };

  const toggleBot = async () => {
    if (!user) {
        alert("Please connect wallet first");
        return;
    }
    const res = await fetch(`${BACKEND_URL}/bot/toggle/${user.id}`, { method: 'POST' });
    const data = await res.json();
    setBotStatus(data.status === 'ON');
  };

  return (
    <main className="min-h-screen bg-[#050505] text-slate-200 selection:bg-emerald-500/30 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
              QLS PREMIUM
            </h1>
            <p className="text-slate-500 font-medium tracking-widest text-xs uppercase">SaaS Unificada v4 • Rabby Secured</p>
          </div>

          <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-xl">
            <button
              onClick={connectWallet}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all text-sm flex items-center gap-3 border border-slate-700"
            >
              <div className={`w-2 h-2 rounded-full ${account ? 'bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]' : 'bg-slate-600'}`}></div>
              {account ? `${account.slice(0,6)}...${account.slice(-4)}` : "Conectar Rabby"}
            </button>

            <button
              onClick={toggleBot}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black transition-all duration-500 text-sm ${botStatus ? 'bg-rose-500/10 text-rose-500 border border-rose-500/50' : 'bg-emerald-500 text-black hover:scale-105 shadow-lg shadow-emerald-500/20'}`}
            >
              {botStatus ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
              {botStatus ? 'PARAR BOT' : 'INICIAR BOT'}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-[2rem] p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><DollarSign size={20}/></div>
              <h3 className="text-slate-400 font-bold text-sm tracking-wide">SHARPE RATIO</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">2.47</span>
              <span className="text-emerald-500 text-sm font-bold">+12%</span>
            </div>
          </div>

          <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-[2rem] p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-500"><TrendingUp size={20}/></div>
              <h3 className="text-slate-400 font-bold text-sm tracking-wide">WIN RATE</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">62.4%</span>
              <span className="text-cyan-500 text-sm font-bold">Stable</span>
            </div>
          </div>

          <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-[2rem] p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500"><Bot size={20}/></div>
              <h3 className="text-slate-400 font-bold text-sm tracking-wide">JUROS COMPOSTOS</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">Active</span>
              <span className="text-slate-500 text-xs">QLS v4</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-3xl overflow-hidden">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-xl font-bold flex items-center gap-3">
                 <span className="relative flex h-3 w-3">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                 </span>
                 BTC/USDT Live Feed
               </h2>
               <div className="flex gap-2">
                 {['1H', '4H', '1D'].map(t => <span key={t} className="text-[10px] font-bold px-2 py-1 bg-white/5 rounded-md text-slate-500 hover:text-white cursor-pointer transition-colors">{t}</span>)}
               </div>
            </div>
            <div className="h-[450px] w-full bg-black/40 rounded-3xl border border-white/5 overflow-hidden">
              <iframe
                src="https://www.tradingview.com/embed/?symbol=BINANCE:BTCUSDT\u0026theme=dark"
                className="w-full h-full border-none opacity-60 hover:opacity-100 transition-all duration-700"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
                <Bot size={20} className="text-emerald-400" />
                Sinais Recentes
              </h3>
              <div className="space-y-3">
                {signals.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-slate-600 border border-dashed border-white/5 rounded-3xl">
                    <p className="text-xs font-bold uppercase tracking-widest">Sincronizando Engine...</p>
                  </div>
                ) : (
                  signals.map((s: any) => (
                    <div key={s.id} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                       <span className="text-sm font-bold text-slate-300">{s.symbol}</span>
                       <div className="text-right">
                         <div className={`text-sm font-black ${s.action === 'buy' ? 'text-emerald-400' : 'text-rose-400'}`}>
                           {s.action.toUpperCase()}
                         </div>
                         <div className="text-[9px] font-bold text-slate-500">SCORE: {s.score.toFixed(0)}%</div>
                       </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-3xl p-6">
               <p className="text-[10px] font-bold text-emerald-500/50 uppercase tracking-widest mb-2">Compounding Status</p>
               <p className="text-sm text-slate-400 leading-relaxed">O bot está configurado para reinvestir lucros automaticamente via Rabby wallet permissioning.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
