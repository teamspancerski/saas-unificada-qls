'use client';
import { useState } from 'react';
import { ShieldCheck, FileText, Lock, Eye, Download, Search, Filter, ShieldAlert } from 'lucide-react';

export default function VaultPage() {
  const documents = [
    { id: '1', name: 'Contrato_Social_Marcos.pdf', case: 'Marcos Oliveira', size: '1.2MB', date: '20 Nov 2024', encrypted: true },
    { id: '2', name: 'RG_Frente_Verso.jpg', case: 'Ana Paula Santos', size: '0.8MB', date: '19 Nov 2024', encrypted: true },
    { id: '3', name: 'Comprovante_Residencia.pdf', case: 'Ana Paula Santos', size: '2.1MB', date: '19 Nov 2024', encrypted: true },
  ];

  return (
    <div className="p-10 space-y-10">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-4">
            <ShieldCheck className="text-gold" size={32} /> Vault Criptografado
          </h1>
          <p className="text-slate-500 font-medium">Segurança AES-256 e Compliance LGPD para seus documentos.</p>
        </div>
        <div className="p-4 bg-gold/5 border border-gold/10 rounded-2xl flex items-center gap-4">
            <ShieldAlert className="text-gold" size={20} />
            <p className="text-[10px] font-black uppercase text-gold tracking-widest leading-tight">
                Acesso Restrito <br /> <span className="text-slate-500">Log de Auditoria Ativo</span>
            </p>
        </div>
      </header>

      <div className="bg-carbon border border-gold/5 rounded-[3rem] overflow-hidden">
        <div className="p-8 border-b border-gold/5 flex justify-between items-center bg-obsidian/20">
            <div className="flex gap-4">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input type="text" placeholder="Filtrar documentos..." className="bg-obsidian border border-gold/10 rounded-xl py-3 pl-12 pr-6 text-sm font-medium text-white focus:border-gold/30 outline-none w-64" />
                </div>
                <button className="px-6 py-3 bg-obsidian border border-gold/10 rounded-xl text-slate-400 font-bold text-xs flex items-center gap-2 hover:border-gold/30">
                    <Filter size={14} /> Especialidade
                </button>
            </div>
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Total: {documents.length} Arquivos</p>
        </div>

        <table className="w-full text-left">
            <thead>
                <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-gold/5">
                    <th className="p-8">Documento</th>
                    <th className="p-8">Caso Relacionado</th>
                    <th className="p-8">Tamanho</th>
                    <th className="p-8">Data de Upload</th>
                    <th className="p-8 text-right">Ações</th>
                </tr>
            </thead>
            <tbody>
                {documents.map((doc) => (
                    <tr key={doc.id} className="border-b border-gold/5 hover:bg-gold/[0.02] transition-colors group">
                        <td className="p-8">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-obsidian rounded-xl border border-gold/10 text-gold">
                                    <FileText size={18} />
                                </div>
                                <div>
                                    <p className="font-bold text-white group-hover:text-gold transition-colors">{doc.name}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Lock size={10} className="text-gold" />
                                        <span className="text-[9px] font-black uppercase text-gold tracking-widest">AES-256 Encrypted</span>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="p-8 text-sm font-bold text-slate-400">{doc.case}</td>
                        <td className="p-8 text-sm font-bold text-slate-500 font-mono">{doc.size}</td>
                        <td className="p-8 text-sm font-bold text-slate-500">{doc.date}</td>
                        <td className="p-8 text-right">
                            <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-3 bg-obsidian border border-gold/10 rounded-xl text-slate-400 hover:text-gold hover:border-gold/30 transition-all">
                                    <Eye size={16} />
                                </button>
                                <button className="p-3 bg-obsidian border border-gold/10 rounded-xl text-slate-400 hover:text-gold hover:border-gold/30 transition-all">
                                    <Download size={16} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <div className="p-10 bg-gold/5 text-center">
            <p className="text-xs text-slate-500 font-medium italic">
                Todos os acessos a este Vault são registrados com timestamp, IP e Hash de integridade. <br />
                Em conformidade com as normas de sigilo profissional da OAB.
            </p>
        </div>
      </div>
    </div>
  );
}
