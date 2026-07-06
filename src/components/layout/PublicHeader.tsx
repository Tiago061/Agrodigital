'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sprout, ShoppingCart, Menu, X, LayoutDashboard, Phone } from 'lucide-react';
import { useAgro } from '@/context/AgroContext';

export default function PublicHeader() {
  const { cart } = useAgro();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navigation = [
    { name: 'Início', href: '/' },
    { name: 'Catálogo', href: '/catalogo' },
    { name: 'Serviços', href: '/#servicos' },
    { name: 'Sobre Nós', href: '/#sobre' },
    { name: 'Contato', href: '/#contato' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false; // Âncoras da home
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200/80 bg-white/95 backdrop-blur shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <img
                src="/logo.png"
                alt="Agrodigital Logo"
                className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-agro-green-dark font-bold border-b-2 border-agro-green-light pb-1'
                    : 'text-stone-600 hover:text-agro-green-dark'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/admin"
              className="flex items-center gap-2 text-stone-600 hover:text-agro-green-dark text-sm font-semibold py-2 px-3 rounded-lg hover:bg-stone-100 transition-colors"
              title="Painel Administrativo"
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Painel</span>
            </Link>

            <Link
              href="/carrinho"
              className="relative p-2 text-stone-600 hover:text-agro-green-dark hover:bg-stone-100 rounded-full transition-all"
              title="Carrinho de Orçamento"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-agro-gold text-[10px] font-bold text-agro-green-dark ring-2 ring-white">
                  {totalItems}
                </span>
              )}
            </Link>

            <a
              href="https://wa.me/5561998765432"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-agro-green-dark px-4 py-2.5 text-sm font-bold text-white shadow-md hover:bg-agro-green-primary transition-all duration-300 hover:shadow-lg"
            >
              <Phone className="h-4 w-4" />
              Falar com Consultor
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <Link
              href="/carrinho"
              className="relative p-2 text-stone-600 hover:text-agro-green-dark"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-agro-gold text-[10px] font-bold text-agro-green-dark ring-2 ring-white">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-xl p-2 text-stone-600 hover:bg-stone-100 hover:text-agro-green-dark focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white py-4 px-6 shadow-inner animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-base font-semibold rounded-lg px-3 transition-colors ${
                  isActive(item.href)
                    ? 'bg-agro-green-dark text-white'
                    : 'text-stone-700 hover:bg-stone-50 hover:text-agro-green-dark'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-stone-100 space-y-3">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-stone-700 hover:text-agro-green-dark py-2 px-3 rounded-lg hover:bg-stone-50 text-base font-semibold"
              >
                <LayoutDashboard className="h-5 w-5 text-stone-500" />
                Painel Administrativo
              </Link>
              
              <a
                href="https://wa.me/5561998765432"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-agro-green-dark py-3 text-center text-base font-bold text-white shadow-md hover:bg-agro-green-primary"
              >
                <Phone className="h-5 w-5" />
                Falar com Consultor
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
