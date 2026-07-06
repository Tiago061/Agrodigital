'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAgro } from '@/context/AgroContext';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import {
  ArrowLeft,
  CheckCircle,
  Phone,
  Calendar,
  FileText,
  HelpCircle,
  Sprout,
  Users,
  Compass,
  Briefcase
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ServiceDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { services } = useAgro();
  
  // Desembrulhar params com React.use
  const resolvedParams = React.use(params);
  const { slug } = resolvedParams;

  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="flex flex-col min-h-screen">
        <PublicHeader />
        <main className="flex-1 flex flex-col items-center justify-center p-8 bg-stone-50">
          <div className="text-center space-y-4 max-w-md">
            <h2 className="font-display text-2xl font-bold text-stone-850">Serviço não encontrado</h2>
            <p className="text-sm text-stone-500">Desculpe, o serviço solicitado não existe ou foi removido.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-agro-green-dark text-white px-5 py-3 font-bold hover:bg-agro-green-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao início
            </Link>
          </div>
        </main>
        <PublicFooter />
      </div>
    );
  }

  // Enviar interesse via WhatsApp
  const handleContact = () => {
    const text = encodeURIComponent(
      `Olá! Gostaria de solicitar mais informações e orçamentos para o serviço de: *${service.name}*`
    );
    window.open(`https://wa.me/5561998765432?text=${text}`, '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />

      <main className="flex-1 bg-stone-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="mb-8 flex items-center gap-2 text-xs text-stone-500 font-medium">
            <Link href="/" className="hover:text-agro-green-dark">Início</Link>
            <span>/</span>
            <span className="text-stone-700 font-bold">{service.name}</span>
          </nav>

          {/* Botão Voltar */}
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-agro-green-dark hover:text-agro-green-light mb-6 transition-colors"
          >
            <ArrowLeft className="h-4.5 w-4.5" />
            Voltar
          </button>

          {/* Conteúdo Principal */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
            {/* Header do Serviço */}
            <div className="bg-agro-green-dark text-white p-8 sm:p-12 relative">
              <div className="absolute right-8 bottom-8 opacity-10 text-white pointer-events-none">
                <Sprout className="h-40 w-40" />
              </div>
              
              <div className="space-y-4 max-w-2xl">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-800 text-agro-gold text-xs font-bold uppercase tracking-wider">
                  <Briefcase className="h-3 w-3" /> Serviço Especializado
                </span>
                <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {service.name}
                </h1>
                <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>

            {/* Corpo */}
            <div className="p-8 sm:p-12 space-y-12">
              {/* Descrição Detalhada */}
              <div className="space-y-4">
                <h2 className="font-display text-xl font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
                  <FileText className="h-5.5 w-5.5 text-agro-green-light" />
                  Sobre o Serviço
                </h2>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {service.fullDescription}
                </p>
              </div>

              {/* Grid Benefícios */}
              <div className="space-y-4">
                <h2 className="font-display text-xl font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
                  <CheckCircle className="h-5.5 w-5.5 text-agro-green-light" />
                  Principais Benefícios
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-stone-50 border border-stone-150">
                      <CheckCircle className="h-5 w-5 text-agro-green-light shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-semibold text-stone-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Caixa de FAQ/Como funciona */}
              <div className="p-6 rounded-2xl bg-amber-50 border border-amber-250 flex items-start gap-4">
                <HelpCircle className="h-6 w-6 text-agro-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display font-bold text-stone-900 text-sm">Como contratar o serviço?</h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Clique no botão de contato abaixo para falar com nossa central pelo WhatsApp. Agendaremos uma pré-conversa para entender sua necessidade ou programaremos a visita técnica de um profissional credenciado à sua propriedade rústica.
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-xs text-stone-500 font-semibold uppercase">Pronto para começar?</p>
                  <p className="text-sm font-bold text-stone-900 mt-0.5">Fale diretamente com um engenheiro ou veterinário responsável.</p>
                </div>
                <button
                  onClick={handleContact}
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-agro-green-dark px-6 py-3.5 font-bold text-white hover:bg-agro-green-primary transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Phone className="h-5 w-5" />
                  Solicitar Agendamento
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
