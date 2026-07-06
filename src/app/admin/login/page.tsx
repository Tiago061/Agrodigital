'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sprout, Lock, User, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulação de delay de rede
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('agro_admin_logged', 'true');
        router.push('/admin');
      } else {
        setError('Usuário ou senha incorretos. Dica: use admin / admin123');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-900 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background visual elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1000&auto=format&fit=crop&q=80"
          alt="Textura agro"
          className="h-full w-full object-cover filter grayscale"
        />
      </div>

      <div className="w-full max-w-md z-10 space-y-6">
        <div className="text-center space-y-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white text-xs font-bold transition-colors">
            <ArrowLeft className="h-4 w-4" /> Voltar ao Site Público
          </Link>
          
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-3xl shadow-xl flex items-center justify-center">
              <img src="/logo.png" alt="Agrodigital Logo" className="h-20 w-auto object-contain" />
            </div>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white">
              Painel Administrativo
            </h2>
            <p className="mt-1.5 text-xs text-stone-400">
              Gerenciamento integrado da Agrodigital
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-stone-200/20 p-8 shadow-2xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Campo Usuário */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Usuário</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Seu usuário (admin)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-agro-green-light focus:border-transparent focus:outline-none"
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha (admin123)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-agro-green-light focus:border-transparent focus:outline-none"
                />
              </div>
            </div>

            {/* Alerta de erro */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-750">
                <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Botão de Entrar */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-agro-green-dark hover:bg-agro-green-primary py-3.5 text-xs font-bold text-white shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-60"
            >
              {loading ? 'Autenticando...' : 'Entrar no Sistema'}
            </button>
          </form>
          
          <div className="text-center pt-2 border-t border-stone-100">
            <p className="text-[10px] text-stone-400 leading-relaxed">
              Acesso exclusivo para funcionários autorizados da AgroConnect.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
