'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAgro } from '@/context/AgroContext';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import {
  Sprout,
  ArrowRight,
  TrendingUp,
  Award,
  Truck,
  ShieldCheck,
  Star,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  ShoppingBag,
  ExternalLink,
  Info
} from 'lucide-react';

export default function HomePage() {
  const { products, services, categories } = useAgro();

  // Pegar produtos em destaque
  const featuredProducts = products.filter((p) => p.isFeatured && p.isActive).slice(0, 4);

  // Benefícios para produtores rurais
  const benefits = [
    {
      title: 'Insumos Certificados',
      desc: 'Sementes e defensivos homologados pelo MAPA com garantia de origem.',
      icon: ShieldCheck
    },
    {
      title: 'Logística Especializada',
      desc: 'Entregamos em fazendas e sítios com estradas de difícil acesso.',
      icon: Truck
    },
    {
      title: 'Apoio Técnico Integrado',
      desc: 'Agrônomos e veterinários prontos para prestar assistência técnica.',
      icon: Sprout
    },
    {
      title: 'Aumento de Rendimento',
      desc: 'Nutrição animal de ponta e fertilização precisa para melhorar sua margem.',
      icon: TrendingUp
    }
  ];

  // Depoimentos
  const testimonials = [
    {
      name: 'Tiago de Souza Santos',
      role: 'Produtor Rural - Planaltina/GO',
      content: 'A AgroConnect mudou a forma como compramos insumos na fazenda. O atendimento pelo WhatsApp é rápido, a entrega do adubo e ração na fazenda é pontual e a assistência dos agrônomos na análise de solo nos ajudou a aumentar a produtividade do milho em 15%. Recomendo muito!',
      rating: 5
    },
    {
      name: 'Dr. Roberto Mendes',
      role: 'Criador de Cavalos Quarto de Milha - Bragança/SP',
      content: 'Excelente selaria e medicamentos veterinários. A sela americana que adquiri com eles é de couro legítimo impecável e as vacinas sempre chegam resfriadas corretamente. O controle e cuidado deles são nota 10.',
      rating: 5
    },
    {
      name: 'Luciana Martins',
      role: 'Proprietária de AgroPet - Rio Verde/GO',
      content: 'Comprei as ferramentas e sementes de jardinagem no atacado para revenda e me surpreendi com a agilidade. Margens ótimas e atendimento profissional.',
      rating: 5
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <section className="relative overflow-hidden bg-stone-900 text-white py-24 lg:py-32">
          {/* Background image overlay */}
          <div className="absolute inset-0 z-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600&auto=format&fit=crop&q=80"
              alt="Campo agrícola no amanhecer"
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 max-w-xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-agro-gold/20 text-agro-gold text-xs font-bold uppercase tracking-wider">
                  <Award className="h-4 w-4" /> Parceiro do Produtor Rural
                </span>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
                  Tudo para o campo, criação e <span className="text-agro-gold">produtividade</span> em um só lugar.
                </h1>
                <p className="text-stone-300 text-lg leading-relaxed">
                  Oferecemos rações de alta performance, sementes selecionadas, defensivos, ferramentas e assessoria de agrônomos e veterinários para que sua terra produza sempre o melhor.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Link
                    href="/catalogo"
                    className="flex items-center justify-center gap-2 rounded-xl bg-agro-gold px-6 py-3.5 text-base font-bold text-agro-green-dark shadow-lg shadow-amber-500/20 hover:bg-yellow-400 transition-all duration-300 hover:scale-[1.02]"
                  >
                    Explorar Catálogo
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <a
                    href="#contato"
                    className="flex items-center justify-center gap-2 rounded-xl border-2 border-stone-400 bg-transparent px-6 py-3.5 text-base font-bold text-white hover:bg-stone-800/80 hover:border-white transition-all duration-300"
                  >
                    Fale Conosco
                  </a>
                </div>
              </div>
              
              {/* Feature card mockup inside hero */}
              <div className="relative lg:block hidden">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-agro-gold to-agro-green-light opacity-30 blur-lg"></div>
                <div className="relative rounded-2xl bg-stone-850/90 border border-stone-700/80 p-8 shadow-2xl backdrop-blur-md">
                  <div className="flex items-center gap-3 border-b border-stone-700 pb-4 mb-6">
                    <img src="/logo.png" alt="Agrodigital Logo" className="h-10 w-auto object-contain bg-white p-1 rounded-lg" />
                    <div>
                      <h3 className="font-display font-bold text-white text-lg">Agrodigital</h3>
                      <p className="text-xs text-stone-400">Tecnologia no Campo, Conexão com o Produtor</p>
                    </div>
                  </div>
                  <ul className="space-y-4 text-sm text-stone-300">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-agro-gold shrink-0" />
                      <span>Orçamentos rápidos via WhatsApp</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-agro-gold shrink-0" />
                      <span>Pedidos faturados e entrega na fazenda</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-agro-gold shrink-0" />
                      <span>Produtos controlados autorizados por veterinário</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-agro-gold shrink-0" />
                      <span>Consultoria técnica agronômica presencial</span>
                    </li>
                  </ul>
                  <div className="mt-8 rounded-xl bg-agro-green-dark/40 border border-emerald-800/60 p-4 text-center">
                    <p className="text-xs text-stone-300">Precisa de cotação de grande volume?</p>
                    <a
                      href="https://wa.me/5561998765432"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-agro-gold hover:underline"
                    >
                      Solicitar cotação corporativa <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Categorias Section */}
        <section className="py-20 bg-stone-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-display text-3xl font-extrabold text-agro-green-dark sm:text-4xl">
                Navegue pelas Categorias
              </h2>
              <p className="mt-4 text-stone-600 leading-relaxed">
                Tudo o que sua criação, pastagem, pet ou cultivo precisam com entrega ágil e preços competitivos.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/catalogo?categoria=${encodeURIComponent(cat)}`}
                  className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-stone-200/60 shadow-sm hover:shadow-md hover:border-agro-green-light transition-all duration-300"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 text-agro-green-dark group-hover:bg-agro-green-dark group-hover:text-white transition-all duration-300 mb-4">
                    <ShoppingBag className="h-6 w-6" />
                  </div>
                  <span className="font-display text-sm font-bold text-stone-800 group-hover:text-agro-green-dark transition-colors">
                    {cat}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Produtos em Destaque Section */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
              <div>
                <h2 className="font-display text-3xl font-extrabold text-agro-green-dark sm:text-4xl">
                  Destaques da Vitrine
                </h2>
                <p className="mt-4 text-stone-600">
                  Os produtos mais procurados pelos produtores rurais e criadores de animais.
                </p>
              </div>
              <Link
                href="/catalogo"
                className="mt-4 md:mt-0 flex items-center gap-1.5 text-sm font-bold text-agro-green-dark hover:text-agro-green-light group"
              >
                Ver catálogo completo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => {
                const showPromo = product.promoPrice !== null;
                const hasStock = product.stock > 0;
                
                return (
                  <div
                    key={product.id}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm hover:shadow-xl hover:border-stone-300 transition-all duration-300"
                  >
                    {/* Imagem */}
                    <div className="relative aspect-video w-full overflow-hidden bg-stone-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        <span className="inline-flex rounded-lg bg-agro-green-dark px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
                          {product.category}
                        </span>
                        {showPromo && (
                          <span className="inline-flex rounded-lg bg-agro-gold px-2.5 py-1 text-xs font-bold text-agro-green-dark shadow-sm">
                            Oferta
                          </span>
                        )}
                        {product.isControlled && (
                          <span className="inline-flex rounded-lg bg-red-600 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                            Controlado
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Conteúdo */}
                    <div className="flex flex-1 flex-col p-6 space-y-4">
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{product.brand}</p>
                        <h3 className="font-display font-bold text-stone-900 group-hover:text-agro-green-dark transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      <div className="flex items-baseline gap-2 mt-auto">
                        {showPromo ? (
                          <>
                            <span className="text-xl font-bold text-agro-green-dark">
                              R$ {product.promoPrice?.toFixed(2)}
                            </span>
                            <span className="text-xs text-stone-400 line-through">
                              R$ {product.price.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-xl font-bold text-stone-900">
                            R$ {product.price.toFixed(2)}
                          </span>
                        )}
                        <span className="text-xs text-stone-500">/ {product.unit}</span>
                      </div>

                      <div className="border-t border-stone-100 pt-4 flex items-center justify-between">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                          hasStock ? 'text-emerald-700' : 'text-rose-600'
                        }`}>
                          <span className={`h-2 w-2 rounded-full ${hasStock ? 'bg-emerald-600' : 'bg-rose-500'}`} />
                          {hasStock ? 'Disponível' : 'Sob consulta'}
                        </span>
                      </div>

                      <Link
                        href={`/catalogo/${product.id}`}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-stone-100 text-stone-800 py-3 text-sm font-bold hover:bg-agro-green-dark hover:text-white transition-all duration-300"
                      >
                        Detalhes do Produto
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. Sobre a Empresa Section */}
        <section id="sobre" className="py-24 bg-stone-50 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-agro-green-light to-agro-gold opacity-20 blur-xl"></div>
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-stone-200">
                  <img
                    src="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&auto=format&fit=crop&q=80"
                    alt="Agrônomo examinando cultivo de trigo"
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* Stats absolute overlay */}
                <div className="absolute -bottom-6 -right-6 bg-agro-green-dark text-white rounded-2xl p-6 shadow-xl border border-emerald-800 max-w-xs hidden sm:block">
                  <p className="text-3xl font-extrabold text-agro-gold font-display">15+ Anos</p>
                  <p className="text-sm font-semibold text-stone-200 mt-1">Lado a lado com o produtor brasileiro no campo</p>
                </div>
              </div>

              <div className="space-y-8">
                <span className="text-xs font-extrabold uppercase tracking-widest text-agro-green-light">A Agropecuária do Século XXI</span>
                <h2 className="font-display text-3xl font-extrabold text-agro-green-dark sm:text-4xl">
                  Parceria forte que gera produtividade e crescimento.
                </h2>
                <p className="text-stone-600 leading-relaxed text-base">
                  A **Agrodigital** nasceu com o propósito de unir a tradição da agricultura de confiança às inovações tecnológicas do mercado. Mais do que vender produtos, nós fornecemos as ferramentas e a assessoria científica para impulsionar a colheita do pequeno agricultor e maximizar os rebanhos de grandes pecuaristas.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-agro-green-dark">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-stone-900">Origem Assegurada</h4>
                      <p className="text-xs text-stone-500 mt-1">Trabalhamos apenas com fabricantes certificados nacionais e importados.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-agro-green-dark">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-stone-900">Atendimento no Campo</h4>
                      <p className="text-xs text-stone-500 mt-1">Nossa equipe faz visitas periódicas para acompanhamento de resultados.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Serviços Oferecidos Section */}
        <section id="servicos" className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-display text-3xl font-extrabold text-agro-green-dark sm:text-4xl">
                Serviços de Excelência Rural
              </h2>
              <p className="mt-4 text-stone-600">
                Além do catálogo, prestamos assistência técnica especializada com agrônomos e médicos veterinários dedicados.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.slug}
                  className="group flex flex-col justify-between p-8 rounded-2xl border border-stone-200 hover:border-agro-green-light bg-white shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="space-y-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-550/10 text-agro-green-dark group-hover:bg-agro-green-dark group-hover:text-white transition-all duration-300">
                      <Sprout className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-stone-900 group-hover:text-agro-green-dark transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div className="pt-8 border-t border-stone-100 mt-6 flex items-center justify-between">
                    <Link
                      href={`/servicos/${service.slug}`}
                      className="flex items-center gap-1.5 text-sm font-bold text-agro-green-dark hover:text-agro-green-light"
                    >
                      Conhecer Serviço
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Benefícios Section */}
        <section className="py-24 bg-stone-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
            <img
              src="https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=1600&auto=format&fit=crop&q=80"
              alt="Hortas agrícolas"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
              <div className="lg:col-span-1 space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-agro-gold">Diferenciais do Campo</span>
                <h2 className="font-display text-3xl font-extrabold sm:text-4xl text-white">
                  Por que escolher a Agrodigital?
                </h2>
                <p className="text-stone-300 leading-relaxed text-sm">
                  Desenvolvemos parcerias de longo prazo com produtores de todo o país, oferecendo flexibilidade de faturamento e entrega inteligente.
                </p>
                <div className="pt-4">
                  <Link
                    href="/catalogo"
                    className="inline-flex items-center gap-2 rounded-xl bg-agro-gold px-5 py-3 text-sm font-bold text-agro-green-dark hover:bg-yellow-400 transition-colors"
                  >
                    Ver Insumos Disponíveis
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                {benefits.map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.title} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-agro-gold/10 text-agro-gold mb-5">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h4 className="font-display font-bold text-white text-lg">{b.title}</h4>
                      <p className="text-xs text-stone-400 mt-2 leading-relaxed">{b.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 7. Depoimentos Section */}
        <section className="py-20 bg-stone-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-display text-3xl font-extrabold text-agro-green-dark sm:text-4xl">
                O que dizem os produtores
              </h2>
              <p className="mt-4 text-stone-600">
                A satisfação e o crescimento dos nossos clientes são o nosso maior compromisso.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <div key={t.name} className="flex flex-col justify-between p-8 rounded-2xl bg-white border border-stone-200/60 shadow-sm relative">
                  <div className="space-y-4">
                    <div className="flex gap-1">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-4.5 w-4.5 fill-agro-gold text-agro-gold" />
                      ))}
                    </div>
                    <p className="text-stone-600 text-sm italic leading-relaxed">
                      "{t.content}"
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-agro-green-dark text-white flex items-center justify-center font-display font-bold text-sm shrink-0">
                      {t.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-display font-bold text-stone-900 text-sm">{t.name}</p>
                      <p className="text-xs text-stone-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Localização e Contato Section */}
        <section id="contato" className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Form / Infos */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <h2 className="font-display text-3xl font-extrabold text-agro-green-dark sm:text-4xl">
                    Contato e Localização
                  </h2>
                  <p className="mt-4 text-stone-600">
                    Estamos localizados estrategicamente na região produtora do DF para melhor atendê-lo. Venha nos visitar ou faça uma cotação direta.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-agro-green-dark">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-stone-900 text-sm">Nosso Endereço</h4>
                      <p className="text-xs text-stone-500 mt-1">Rodovia DF-130, KM 15, Galpão A, Sobradinho, Brasília - DF</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-agro-green-dark">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-stone-900 text-sm">Telefones e WhatsApp</h4>
                      <p className="text-xs text-stone-500 mt-1">(61) 99876-5432 (Cel/WhatsApp)</p>
                      <p className="text-xs text-stone-500">(61) 3456-7890 (Fixo)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-agro-green-dark">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-stone-900 text-sm">Fale Conosco</h4>
                      <p className="text-xs text-stone-500 mt-1">atendimento@agrodigital.com.br</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Simulator / Form */}
              <div className="lg:col-span-7 space-y-6">
                <div className="rounded-2xl border border-stone-200 overflow-hidden shadow-md h-80 relative bg-stone-100">
                  {/* Mock Map Image */}
                  <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80"
                    alt="Mapa de localização fictício"
                    className="h-full w-full object-cover filter grayscale"
                  />
                  <div className="absolute inset-0 bg-agro-green-dark/10 backdrop-blur-[1px]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-agro-green-dark text-agro-gold flex items-center justify-center shadow-lg animate-bounce">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <span className="bg-agro-green-dark text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md mt-2">
                      Agrodigital Matriz
                    </span>
                  </div>
                </div>
                
                <div className="rounded-2xl border border-stone-200/80 bg-stone-50/50 p-6 flex items-center gap-4">
                  <Info className="h-6 w-6 text-agro-gold shrink-0" />
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Você pode selecionar produtos diretamente em nosso catálogo digital e enviar um orçamento de forma simplificada sem compromisso! A finalização é concluída rapidamente pelo WhatsApp com um de nossos consultores de vendas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
