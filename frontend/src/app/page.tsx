'use client';
import { useState, useEffect } from 'react';
import { Bot, Play, Pause, DollarSign, TrendingUp, Clock, Zap, Target, BarChart3 } from 'lucide-react';
import { ethers } from 'ethers';

const BACKEND_URL = 'http://localhost:3000';

export default function Dashboard() {
  const [botStatus, setBotStatus] = useState(false);
  const [strategyMode, setStrategyMode] = useState('off');
  const [signals, setSignals] = useState([]);
  const [account, setAccount] = useState(null);
  const [user, setUser] = useState(null);
  const [capital, setCapital] = useState(1000);
  const [risk, setRisk] = useState(1);
  const [holdTime, setHoldTime] = useState('1h');
  const [topPairs, setTopPairs] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`${BACKEND_URL}/metrics/${user.uuid}`)
        .then(res => res.json())
        .then(data => setSignals(data.orders));

      fetch(`${BACKEND_URL}/pairs/score`)
        .then(res => res.json())
        .then(data => setTopPairs(data));
    }
  }, [user, botStatus]);

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
      setStrategyMode(userData.strategyMode);
      setCapital(userData.capitalTotal);
      setRisk(userData.riskPerTrade);
      setHoldTime(userData.maxHoldTime);
    } else {
      alert("Rabby or Metamask not found");
    }
  };

  const updateConfig = async () => {
    if (!user) return;
    await fetch(`${BACKEND_URL}/users/${user.uuid}/config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ capitalTotal: capital, riskPerTrade: risk, maxHoldTime: holdTime })
    });
  };

  const startStrategy = async (mode: string) => {
    if (!user) return;
    const res = await fetch(`${BACKEND_URL}/strategy/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uuid: user.uuid, mode })
    });
    const data = await res.json();
    setStrategyMode(mode);
    setBotStatus(mode !== 'off');
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 selection:bg-[#00ff88]/30 font-sans">
      <div className="max-w-[1600px] mx-auto px-6 py-8">

        {/* Header Neon */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-8 p-6 bg-slate-900/50 rounded-[2rem] border border-[#00ff88]/20 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,255,136,0.05)]">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-[#00ff88]/10 rounded-2xl border border-[#00ff88]/30 shadow-[0_0_15px_rgba(0,255,136,0.2)]">
                <Zap size={32} className="text-[#00ff88]" fill="#00ff88" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#00ff88] to-[#00d4ff] bg-clip-text text-transparent tracking-tighter">
                QLS SAAS v4
              </h1>
              <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em]">ID: {user?.uuid || 'SINC_PENDENTE'} | Montante: ${capital/1000}k</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={connectWallet}
              className="px-6 py-3 bg-slate-800/80 hover:bg-slate-700 text-white rounded-2xl font-bold transition-all text-sm flex items-center gap-3 border border-slate-700 backdrop-blur-md"
            >
              <div className={`w-2.5 h-2.5 rounded-full ${account ? 'bg-[#00ff88] animate-pulse shadow-[0_0_10px_#00ff88]' : 'bg-slate-600'}`}></div>
              {account ? `${account.slice(0,6)}...${account.slice(-4)}` : "CONECTAR RABBY"}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar StrategyPanel */}
          <div className="space-y-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 backdrop-blur-xl">
              <h3 className="text-lg font-bold mb-8 flex items-center gap-3 text-[#00ff88]">
                <Target size={20} /> PAINEL DE ESTRATÉGIA
              </h3>

              <div className="space-y-8">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4">Modo de Execução</label>
                  <div className="grid grid-cols-3 gap-2 p-1 bg-black/40 rounded-xl border border-slate-800">
                    {['OFF', 'MONITOR', 'AUTO'].map(m => (
                      <button
                        key={m}
                        onClick={() => startStrategy(m.toLowerCase())}
                        className={`py-2 rounded-lg text-[10px] font-black transition-all ${strategyMode === m.toLowerCase() ? 'bg-[#00ff88] text-black shadow-[0_0_15px_rgba(0,255,136,0.3)]' : 'hover:bg-white/5 text-slate-400'}`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex justify-between mb-4">
                        Montante Custom <span>${capital.toLocaleString()}</span>
                    </label>
                    <input type="range" min="100" max="1000000" step="100" value={capital} onChange={(e) => setCapital(Number(e.target.value))} onMouseUp={updateConfig} className="w-full accent-[#00ff88] bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer" />
                </div>

                <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex justify-between mb-4">
                        Risco por Trade <span>{risk}%</span>
                    </label>
                    <input type="range" min="0.1" max="5" step="0.1" value={risk} onChange={(e) => setRisk(Number(e.target.value))} onMouseUp={updateConfig} className="w-full accent-[#00d4ff] bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer" />
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4">Tempo Max Hold</label>
                  <select value={holdTime} onChange={(e) => {setHoldTime(e.target.value); updateConfig();}} className="w-full bg-black/40 border border-slate-800 rounded-xl p-3 text-sm font-bold text-slate-300 focus:outline-none focus:border-[#00ff88]/50">
                    <option value="15m">15 MINUTOS</option>
                    <option value="1h">1 HORA</option>
                    <option value="4h">4 HORAS</option>
                    <option value="24h">24 HORAS</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-[#00ff88]/5 border border-[#00ff88]/10 rounded-3xl p-6">
               <div className="flex items-center gap-3 mb-3">
                 <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></div>
                 <p className="text-[10px] font-bold text-[#00ff88] uppercase tracking-widest">Motor QLC Ativo</p>
               </div>
               <p className="text-xs text-slate-400 leading-relaxed font-medium">Analisando regime de mercado H4+H1 com score de compressão dinâmico.</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">

            {/* KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-6 hover:border-[#00ff88]/30 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Sharpe Ratio</span>
                        <BarChart3 size={18} className="text-[#00ff88]" />
                    </div>
                    <div className="text-3xl font-black">2.47 <span className="text-[10px] text-[#00ff88] font-bold ml-2">√252</span></div>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-6 hover:border-[#00d4ff]/30 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Win Rate</span>
                        <TrendingUp size={18} className="text-[#00d4ff]" />
                    </div>
                    <div className="text-3xl font-black">62.4% <span className="text-[10px] text-[#00d4ff] font-bold ml-2">Stable</span></div>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-6 hover:border-rose-500/30 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Max Drawdown</span>
                        <DollarSign size={18} className="text-rose-500" />
                    </div>
                    <div className="text-3xl font-black">4.2% <span className="text-[10px] text-rose-500 font-bold ml-2">-0.5%</span></div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Chart Area */}
                <div className="xl:col-span-2 bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 backdrop-blur-3xl">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-3">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00ff88]"></span>
                            </span>
                            BTC/USDT TradingView
                        </h2>
                        <div className="flex gap-2">
                             {['15m', '1h', '4h'].map(t => <span key={t} className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${t === '1h' ? 'bg-[#00ff88]/10 border-[#00ff88]/40 text-[#00ff88]' : 'bg-white/5 border-white/5 text-slate-500 hover:text-white'}`}>{t.toUpperCase()}</span>)}
                        </div>
                    </div>
                    <div className="h-[450px] w-full bg-black/40 rounded-3xl border border-slate-800 overflow-hidden relative">
                        <iframe src="https://www.tradingview.com/embed/?symbol=BINANCE:BTCUSDT&theme=dark" className="w-full h-full border-none opacity-80" />
                        <div className="absolute bottom-6 left-6 p-4 bg-slate-900/90 border border-[#00ff88]/20 rounded-2xl backdrop-blur-xl">
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Equity Curve Mock</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-lg font-black text-[#00ff88]">+$12,450.00</span>
                                <span className="text-[10px] font-bold text-slate-400">Total PnL</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scored Pairs List */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 backdrop-blur-xl">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-3 text-[#00d4ff]">
                        <Zap size={20} /> TOP PAIRS SCORE
                    </h3>
                    <div className="space-y-3">
                        {topPairs.map((p: any) => (
                            <div key={p.symbol} className="p-4 bg-black/20 rounded-2xl border border-slate-800/50 hover:border-[#00d4ff]/30 transition-all group">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold text-sm">{p.symbol}</span>
                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${p.score > 80 ? 'bg-[#00ff88]/10 text-[#00ff88]' : 'bg-slate-800 text-slate-400'}`}>{p.score}</span>
                                </div>
                                <div className="flex justify-between text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                                    <span>Vol: {p.vol}</span>
                                    <span>ATR: {p.atr}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold flex items-center gap-3">
                        <BarChart3 size={24} className="text-[#00ff88]" />
                        Histórico de Ordens
                    </h3>
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Trades: {signals.length}/5</div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-800">
                                <th className="pb-4">Par</th>
                                <th className="pb-4">Tipo</th>
                                <th className="pb-4">Entrada</th>
                                <th className="pb-4">Status</th>
                                <th className="pb-4">Score</th>
                                <th className="pb-4">Hold</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-bold">
                            {signals.map((s: any) => (
                                <tr key={s.id} className="border-b border-slate-800/50 hover:bg-white/[0.02] transition-colors">
                                    <td className="py-4 font-mono">{s.symbol}</td>
                                    <td className="py-4">
                                        <span className={`px-2 py-1 rounded-md text-[10px] ${s.side === 'buy' ? 'bg-[#00ff88]/10 text-[#00ff88]' : 'bg-rose-500/10 text-rose-500'}`}>
                                            {s.side.toUpperCase()} {s.type.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="py-4 text-slate-400">${s.entryPrice.toLocaleString()}</td>
                                    <td className="py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${s.status === 'open' ? 'bg-[#00ff88] animate-pulse' : 'bg-slate-600'}`}></div>
                                            <span className="text-[10px] uppercase">{s.status}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 text-[#00ff88]">{s.score}%</td>
                                    <td className="py-4 text-slate-500 font-mono text-[10px] flex items-center gap-2">
                                        <Clock size={12} /> {s.status === 'open' ? '3h 42m' : 'Closed'}
                                    </td>
                                </tr>
                            ))}
                            {signals.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-slate-600 uppercase text-[10px] font-black tracking-widest border-dashed border border-slate-800/50 rounded-3xl">
                                        Nenhuma ordem encontrada. Engine sincronizando...
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
