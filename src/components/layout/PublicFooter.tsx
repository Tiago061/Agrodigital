import React from 'react';
import Link from 'next/link';
import { Sprout, Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';

export default function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-agro-green-dark text-stone-200 border-t-4 border-agro-gold pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Institucional */}
          <div className="space-y-6">
            <Link href="/" className="inline-block group bg-white p-3 rounded-2xl max-w-[180px] transition-transform duration-300 hover:scale-[1.02]">
              <img
                src="/logo.png"
                alt="Agrodigital Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-stone-300 leading-relaxed">
              Tudo para o campo, criação e produtividade em um só lugar. Oferecemos insumos de alta tecnologia, medicamentos e suporte especializado para impulsionar o agronegócio nacional.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-900 text-stone-200 hover:bg-agro-gold hover:text-agro-green-dark transition-colors"
                title="Facebook"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-900 text-stone-200 hover:bg-agro-gold hover:text-agro-green-dark transition-colors"
                title="Instagram"
              >
                <svg className="h-5 w-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Links Úteis */}
          <div>
            <h3 className="font-display text-lg font-bold text-white mb-6">Links Úteis</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-agro-gold hover:underline transition-colors">
                  Início (Página Inicial)
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="hover:text-agro-gold hover:underline transition-colors">
                  Catálogo de Produtos
                </Link>
              </li>
              <li>
                <Link href="/carrinho" className="hover:text-agro-gold hover:underline transition-colors">
                  Meu Carrinho / Orçamento
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-agro-gold hover:underline transition-colors">
                  Painel Administrativo
                </Link>
              </li>
              <li>
                <a href="/#sobre" className="hover:text-agro-gold hover:underline transition-colors">
                  Sobre a Agrodigital
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Serviços */}
          <div>
            <h3 className="font-display text-lg font-bold text-white mb-6">Serviços do Campo</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/servicos/consultoria-rural" className="hover:text-agro-gold hover:underline transition-colors">
                  Consultoria Rural & Assistência
                </Link>
              </li>
              <li>
                <Link href="/servicos/vacinacao-animal" className="hover:text-agro-gold hover:underline transition-colors">
                  Campanhas de Vacinação
                </Link>
              </li>
              <li>
                <Link href="/servicos/atendimento-veterinario" className="hover:text-agro-gold hover:underline transition-colors">
                  Atendimento Veterinário
                </Link>
              </li>
              <li>
                <Link href="/servicos/entrega-em-fazendas" className="hover:text-agro-gold hover:underline transition-colors">
                  Logística Dedicada (Fazendas)
                </Link>
              </li>
              <li>
                <Link href="/servicos/analise-de-solo" className="hover:text-agro-gold hover:underline transition-colors">
                  Análise Química de Solo
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contatos e Funcionamento */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold text-white mb-6">Contatos</h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-agro-gold shrink-0 mt-0.5" />
                <span>Rodovia DF-130, KM 15, Galpão A, Sobradinho, Brasília - DF</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-agro-gold shrink-0" />
                <span>(61) 99876-5432 / (61) 3456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-agro-gold shrink-0" />
                <span>atendimento@agrodigital.com.br</span>
              </li>
              <li className="flex items-start gap-3 pt-2">
                <Clock className="h-5 w-5 text-stone-400 shrink-0 mt-0.5" />
                <div className="text-stone-300">
                  <p className="font-semibold text-white">Horário de Atendimento:</p>
                  <p>Segunda a Sexta: 07h às 18h</p>
                  <p>Sábado: 07h às 12h</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha Divisória */}
        <div className="border-t border-emerald-900 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {currentYear} Agrodigital. Todos os direitos reservados. CNPJ: 12.345.678/0001-90</p>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-agro-gold" />
            <span>Site 100% Seguro • Desenvolvido com Foco no Campo</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
