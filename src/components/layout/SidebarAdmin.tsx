'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  TrendingUp,
  LogOut,
  Home,
  Menu,
  X,
  Sprout
} from 'lucide-react';

export default function SidebarAdmin() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Produtos', href: '/admin/produtos', icon: Package },
    { name: 'Clientes', href: '/admin/clientes', icon: Users },
    { name: 'Pedidos & Orçamentos', href: '/admin/pedidos', icon: ShoppingCart },
    { name: 'Controle de Estoque', href: '/admin/estoque', icon: TrendingUp },
  ];

  const handleLogout = () => {
    // Limpar token ou estado de autenticação fictício
    if (typeof window !== 'undefined') {
      localStorage.removeItem('agro_admin_logged');
    }
    router.push('/admin/login');
  };

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Toggle Bar */}
      <div className="flex items-center justify-between bg-agro-green-dark px-4 py-4 text-white md:hidden shadow-md">
        <Link href="/admin" className="flex items-center gap-2">
          <img src="/logo.png" alt="Agrodigital Logo" className="h-10 w-auto bg-white p-1 rounded-lg object-contain" />
          <span className="font-display font-bold tracking-tight text-lg text-white">Admin</span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-1.5 text-stone-200 hover:bg-emerald-900 focus:outline-none"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Backdrop for Mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden transition-all duration-300"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-agro-green-dark text-stone-200 border-r border-emerald-900 transition-transform duration-300 md:static md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header/Logo */}
        <div className="flex h-20 items-center justify-center border-b border-emerald-900 px-6 bg-white py-4">
          <img src="/logo.png" alt="Agrodigital Logo" className="h-12 w-auto object-contain" />
        </div>

        {/* User Info (Mock) */}
        <div className="px-6 py-5 border-b border-emerald-900 bg-emerald-950/40">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-agro-gold flex items-center justify-center text-agro-green-dark font-display font-bold">
              AD
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Administrador</p>
              <p className="text-xs text-stone-400">admin@agroconnect.com</p>
            </div>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 space-y-1.5 px-4 py-6 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-agro-gold text-agro-green-dark font-bold shadow-md shadow-amber-500/10'
                    : 'text-stone-300 hover:bg-emerald-900/60 hover:text-white'
                }`}
              >
                <Icon className={`h-5 w-5 ${active ? 'text-agro-green-dark' : 'text-stone-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="border-t border-emerald-900 p-4 space-y-2 bg-emerald-950/20">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium text-stone-300 hover:bg-emerald-900/60 hover:text-white transition-colors"
          >
            <Home className="h-5 w-5 text-stone-400" />
            <span>Voltar ao Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium text-red-300 hover:bg-red-950/30 hover:text-red-200 transition-colors"
          >
            <LogOut className="h-5 w-5 text-red-400" />
            <span>Sair do Painel</span>
          </button>
        </div>
      </aside>
    </>
  );
}
