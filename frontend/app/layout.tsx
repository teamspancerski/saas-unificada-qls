'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Briefcase, FileText, Clock, Users, Settings, LogOut, Gavel } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPublicRoute = ['/', '/login', '/register', '/triage'].includes(pathname);

  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-obsidian text-slate-200 min-h-screen flex`}>
        {!isPublicRoute && (
          <aside className="w-64 bg-carbon border-r border-gold/10 flex flex-col p-6 space-y-8 h-screen sticky top-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold/10 border border-gold/30 rounded-xl flex items-center justify-center">
                  <Gavel className="text-gold" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tighter text-white">AUREX <span className="text-gold">LAW</span></h1>
                <p className="text-[9px] uppercase font-bold text-slate-500 tracking-widest">Infraestrutura</p>
              </div>
            </div>

            <nav className="flex-1 space-y-2">
              {[
                { label: 'Painel', icon: LayoutDashboard, href: '/dashboard' },
                { label: 'Casos', icon: Briefcase, href: '/cases' },
                { label: 'Documentos', icon: FileText, href: '/vault' },
                { label: 'Prazos', icon: Clock, href: '/deadlines' },
                { label: 'Clientes', icon: Users, href: '/clients' },
                { label: 'Configurações', icon: Settings, href: '/settings' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-4 p-3 rounded-xl hover:bg-gold/5 hover:text-gold transition-all group font-medium text-sm ${pathname === item.href ? 'bg-gold/10 text-gold' : ''}`}
                >
                  <item.icon size={18} className={`group-hover:text-gold ${pathname === item.href ? 'text-gold' : 'text-slate-500'}`} />
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link href="/login" className="flex items-center gap-4 p-3 rounded-xl hover:bg-rose-500/10 hover:text-rose-500 transition-all text-sm font-medium">
              <LogOut size={18} /> Sair
            </Link>
          </aside>
        )}

        <div className="flex-1 flex flex-col">
          <main className="flex-1">
            {children}
          </main>

          <footer className="p-8 border-t border-gold/5 bg-carbon/50 backdrop-blur-md">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-xs text-slate-500 font-medium">© 2024 AUREX LAW - Infraestrutura Jurídica Premium.</p>
              <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-slate-600">
                <Link href="#" className="hover:text-gold">Termos</Link>
                <Link href="#" className="hover:text-gold">Privacidade</Link>
                <Link href="#" className="hover:text-gold">Compliance</Link>
              </div>
            </div>
            <p className="mt-8 text-[10px] text-center text-slate-600 border border-gold/10 p-4 rounded-xl max-w-4xl mx-auto italic bg-obsidian/50">
              “Aurex Law é uma infraestrutura tecnológica administrativa em total conformidade com o Provimento 205/2021 da OAB e com a LGPD. Não presta serviços jurídicos, intermediação de advogados ou aconselhamento jurídico.”
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
