'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAgro } from '@/context/AgroContext';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ShoppingBag,
  Sparkles,
  RefreshCw,
  Eye,
  AlertCircle
} from 'lucide-react';

export default function CatalogoPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-screen items-center justify-center bg-stone-50 text-stone-600 font-medium">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-agro-green-dark" />
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Carregando Catálogo...</span>
        </div>
      </div>
    }>
      <CatalogoContent />
    </Suspense>
  );
}

function CatalogoContent() {
  const searchParams = useSearchParams();
  const { products, categories } = useAgro();

  // Estados de Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [sortBy, setSortBy] = useState('destaques');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Efeito para sincronizar categoria da URL (ex: de cliques na Landing Page)
  useEffect(() => {
    const catParam = searchParams.get('categoria');
    if (catParam && categories.includes(catParam)) {
      setSelectedCategory(catParam);
    } else {
      setSelectedCategory('Todas');
    }
  }, [searchParams, categories]);

  // Limpar todos os filtros
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Todas');
    setSortBy('destaques');
  };

  // Processamento de Filtragem e Ordenação
  const filteredProducts = products
    .filter((product) => {
      // Apenas produtos ativos
      if (!product.isActive) return false;

      // Filtro de Categoria
      const matchCategory =
        selectedCategory === 'Todas' || product.category === selectedCategory;

      // Filtro de Busca por Texto
      const matchSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase());

      return matchCategory && matchSearch;
    })
    .sort((a, b) => {
      // Ordenação
      const priceA = a.promoPrice !== null ? a.promoPrice : a.price;
      const priceB = b.promoPrice !== null ? b.promoPrice : b.price;

      if (sortBy === 'preco-crescente') {
        return priceA - priceB;
      }
      if (sortBy === 'preco-decrescente') {
        return priceB - priceA;
      }
      if (sortBy === 'nome-az') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'destaques') {
        // Ordena por Destaque primeiro, depois por estoque
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return b.stock - a.stock;
      }
      return 0;
    });

  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />

      <main className="flex-1 bg-stone-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header do Catálogo */}
          <div className="mb-10 text-center md:text-left">
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-agro-green-dark sm:text-4xl">
              Catálogo de Produtos
            </h1>
            <p className="mt-2 text-sm text-stone-600">
              Encontre o melhor em insumos agrícolas, nutrição, veterinária e ferramentas com preços especiais.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* 1. Barra Lateral de Filtros (Desktop) */}
            <aside className="hidden lg:block lg:col-span-3 space-y-6">
              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-6">
                  <h3 className="font-display font-bold text-stone-900 flex items-center gap-2">
                    <SlidersHorizontal className="h-4.5 w-4.5 text-agro-green-dark" />
                    Filtros
                  </h3>
                  <button
                    onClick={handleClearFilters}
                    className="text-xs font-bold text-agro-green-light hover:text-agro-green-dark flex items-center gap-1 transition-colors"
                  >
                    <RefreshCw className="h-3 w-3" /> Limpar
                  </button>
                </div>

                {/* Filtro por Categorias */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-500">Categorias</h4>
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedCategory('Todas')}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        selectedCategory === 'Todas'
                          ? 'bg-agro-green-dark text-white'
                          : 'text-stone-700 hover:bg-stone-50 hover:text-agro-green-dark'
                      }`}
                    >
                      Todas as Categorias
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                          selectedCategory === cat
                            ? 'bg-agro-green-dark text-white'
                            : 'text-stone-700 hover:bg-stone-50 hover:text-agro-green-dark'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* 2. Conteúdo Principal e Busca */}
            <div className="lg:col-span-9 space-y-6">
              
              {/* Barra de Ações Superior (Busca e Ordenação) */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
                
                {/* Input de Busca */}
                <div className="relative w-full sm:max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-stone-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por nome, marca ou SKU..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-agro-green-light focus:border-transparent text-sm bg-stone-50/50"
                  />
                </div>

                {/* Ordenação e Botão de Filtros Mobile */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <button
                    onClick={() => setMobileFiltersOpen(true)}
                    className="lg:hidden flex items-center gap-1.5 px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-bold text-stone-700 hover:bg-stone-50 shrink-0"
                  >
                    <SlidersHorizontal className="h-4 w-4" /> Filtros
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-500 font-medium hidden md:inline">Ordenar:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-stone-200 rounded-xl px-3 py-2.5 text-xs font-semibold bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-agro-green-light focus:border-transparent"
                    >
                      <option value="destaques">Destaques / Relevância</option>
                      <option value="preco-crescente">Preço: Menor para Maior</option>
                      <option value="preco-decrescente">Preço: Maior para Menor</option>
                      <option value="nome-az">Nome: A a Z</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Grid de Produtos */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => {
                    const showPromo = product.promoPrice !== null;
                    const hasStock = product.stock > 0;
                    
                    return (
                      <div
                        key={product.id}
                        className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm hover:shadow-lg hover:border-stone-300 transition-all duration-300"
                      >
                        {/* Imagem */}
                        <div className="relative aspect-video w-full overflow-hidden bg-stone-100 border-b border-stone-100">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-103"
                          />
                          
                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-1">
                            <span className="inline-flex rounded-lg bg-agro-green-dark/90 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-sm">
                              {product.category}
                            </span>
                            {showPromo && (
                              <span className="inline-flex rounded-lg bg-agro-gold px-2 py-0.5 text-[10px] font-bold text-agro-green-dark">
                                Oferta
                              </span>
                            )}
                            {product.isControlled && (
                              <span className="inline-flex rounded-lg bg-red-650 px-2 py-0.5 text-[10px] font-bold text-white">
                                Controlado
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Detalhes do Card */}
                        <div className="flex flex-1 flex-col p-5 space-y-4">
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">{product.brand}</p>
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
                                <span className="text-lg font-bold text-agro-green-dark">
                                  R$ {product.promoPrice?.toFixed(2)}
                                </span>
                                <span className="text-xs text-stone-400 line-through">
                                  R$ {product.price.toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span className="text-lg font-bold text-stone-900">
                                R$ {product.price.toFixed(2)}
                              </span>
                            )}
                            <span className="text-[10px] text-stone-500">/ {product.unit}</span>
                          </div>

                          {/* Disponibilidade */}
                          <div className="flex items-center justify-between text-xs pt-3 border-t border-stone-100">
                            <span className={`inline-flex items-center gap-1 font-semibold ${
                              hasStock ? 'text-emerald-700' : 'text-rose-600'
                            }`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${hasStock ? 'bg-emerald-600' : 'bg-rose-500'}`} />
                              {hasStock ? 'Em Estoque' : 'Esgotado'}
                            </span>
                            <span className="text-[10px] text-stone-400 font-mono">SKU: {product.sku}</span>
                          </div>

                          {/* Botão */}
                          <Link
                            href={`/catalogo/${product.id}`}
                            className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-stone-100 hover:bg-agro-green-dark hover:text-white py-3 text-xs font-bold text-stone-850 transition-all duration-300"
                          >
                            <Eye className="h-4 w-4" /> Detalhes
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Empty State */
                <div className="text-center py-16 bg-white border border-stone-200 rounded-3xl space-y-4 max-w-xl mx-auto">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-stone-100 text-stone-400">
                    <AlertCircle className="h-8 w-8" />
                  </div>
                  <h3 className="font-display font-bold text-stone-900 text-lg">Nenhum produto encontrado</h3>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">
                    Não encontramos resultados para os filtros selecionados. Tente ajustar os termos de busca ou mude de categoria.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-agro-green-dark hover:underline"
                  >
                    Resetar Filtros
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modal/Gaveta de Filtros no Mobile */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            onClick={() => setMobileFiltersOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
          />
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col bg-white py-6 shadow-xl animate-in slide-in-from-right duration-250">
            <div className="flex items-center justify-between px-6 pb-4 border-b border-stone-100">
              <h3 className="font-display font-bold text-stone-900 text-lg">Filtros</h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-50 hover:text-stone-700"
              >
                Fechar
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {/* Categorias Mobile */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-500">Categorias</h4>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setSelectedCategory('Todas');
                      setMobileFiltersOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                      selectedCategory === 'Todas'
                        ? 'bg-agro-green-dark text-white font-bold'
                        : 'text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    Todas as Categorias
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setMobileFiltersOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                        selectedCategory === cat
                          ? 'bg-agro-green-dark text-white font-bold'
                          : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-stone-100 p-6">
              <button
                onClick={() => {
                  handleClearFilters();
                  setMobileFiltersOpen(false);
                }}
                className="w-full text-center py-2.5 rounded-xl border border-stone-200 text-xs font-bold text-stone-700 hover:bg-stone-50"
              >
                Limpar Todos os Filtros
              </button>
            </div>
          </div>
        </div>
      )}

      <PublicFooter />
    </div>
  );
}
