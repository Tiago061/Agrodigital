'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import SidebarAdmin from '@/components/layout/SidebarAdmin';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLogged = localStorage.getItem('agro_admin_logged') === 'true';

      if (isLoginPage) {
        if (isLogged) {
          // Se já está logado e tenta ir pro login, redireciona pro dashboard
          router.push('/admin');
        } else {
          setAuthorized(true);
        }
      } else {
        if (!isLogged) {
          // Se não está logado, redireciona pro login
          router.push('/admin/login');
        } else {
          setAuthorized(true);
        }
      }
      setLoading(false);
    }
  }, [pathname, isLoginPage, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-stone-50 text-stone-600 font-medium">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-agro-green-dark" />
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Verificando Credenciais...</span>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  // Na página de login não exibe a Sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-stone-50">
      <SidebarAdmin />
      <main className="flex-1 overflow-x-hidden p-6 md:p-10">
        {children}
      </main>
    </div>
  );
}
