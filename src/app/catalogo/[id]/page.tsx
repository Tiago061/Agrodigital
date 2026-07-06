'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAgro } from '@/context/AgroContext';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import {
  ArrowLeft,
  ShoppingCart,
  Phone,
  ShieldCheck,
  CheckCircle,
  Truck,
  Plus,
  Minus,
  AlertTriangle,
  Info,
  BadgeAlert
} from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { products, addToCart } = useAgro();
  
  // Desembrulhar params
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;

  const [quantity, setQuantity] = useState(1);
  const [showAddedToast, setShowAddedToast] = useState(false);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <PublicHeader />
        <main className="flex-1 flex flex-col items-center justify-center p-8 bg-stone-50">
          <div className="text-center space-y-4 max-w-md">
            <h2 className="font-display text-2xl font-bold text-stone-850">Produto não encontrado</h2>
            <p className="text-sm text-stone-500">Desculpe, o produto que você está procurando não existe ou foi removido do catálogo.</p>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 rounded-xl bg-agro-green-dark text-white px-5 py-3 font-bold hover:bg-agro-green-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao catálogo
            </Link>
          </div>
        </main>
        <PublicFooter />
      </div>
    );
  }

  const showPromo = product.promoPrice !== null;
  const currentPrice = showPromo ? product.promoPrice! : product.price;
  const hasStock = product.stock > 0;
  const isLowStock = hasStock && product.stock <= product.minStock;

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Ação de adicionar ao carrinho
  const handleAddToCart = () => {
    if (!hasStock) return;
    addToCart(product, quantity);
    setShowAddedToast(true);
    setTimeout(() => {
      setShowAddedToast(false);
    }, 3000);
  };

  // Ação de orçamento rápido direto via WhatsApp
  const handleDirectWhatsapp = () => {
    const text = encodeURIComponent(
      `Olá! Estou no site da Agrodigital e gostaria de fazer uma cotação rápida para o produto:\n- *${product.name}* (${quantity}x ${product.unit})\nSKU: ${product.sku}\nPor favor, informe a disponibilidade de frete e faturamento.`
    );
    window.open(`https://wa.me/5561998765432?text=${text}`, '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />

      {/* Alerta/Toast de Adicionado ao Carrinho */}
      {showAddedToast && (
        <div className="fixed top-24 right-6 z-55 flex items-center gap-3 bg-agro-green-dark text-white px-6 py-4 rounded-2xl shadow-2xl border border-emerald-800 animate-in fade-in slide-in-from-top-6 duration-300">
          <CheckCircle className="h-6 w-6 text-agro-gold shrink-0" />
          <div>
            <p className="text-sm font-bold">Adicionado ao carrinho!</p>
            <p className="text-[10px] text-stone-300">Orçamento atualizado com sucesso.</p>
          </div>
          <Link
            href="/carrinho"
            className="ml-4 rounded-lg bg-agro-gold text-agro-green-dark text-xs font-bold px-3 py-1.5 hover:bg-yellow-450 transition-colors"
          >
            Ver Carrinho
          </Link>
        </div>
      )}

      <main className="flex-1 bg-stone-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="mb-6 flex items-center gap-2 text-xs text-stone-500 font-medium">
            <Link href="/" className="hover:text-agro-green-dark">Início</Link>
            <span>/</span>
            <Link href="/catalogo" className="hover:text-agro-green-dark">Catálogo</Link>
            <span>/</span>
            <span className="text-stone-700 font-bold">{product.name}</span>
          </nav>

          {/* Botão de Voltar */}
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-agro-green-dark hover:text-agro-green-light mb-8 transition-colors"
          >
            <ArrowLeft className="h-4.5 w-4.5" />
            Voltar
          </button>

          {/* Grid de Detalhes */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 lg:p-12 shadow-xl">
            
            {/* Col 1: Imagem */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-video sm:aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-150">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
                
                {/* Badges de Imagem */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="rounded-xl bg-agro-green-dark/95 text-white text-xs font-bold px-3 py-1.5 shadow-md">
                    {product.category}
                  </span>
                  {showPromo && (
                    <span className="rounded-xl bg-agro-gold text-agro-green-dark text-xs font-extrabold px-3 py-1.5 shadow-md">
                      Preço Especial
                    </span>
                  )}
                  {product.isControlled && (
                    <span className="rounded-xl bg-red-650 text-white text-xs font-extrabold px-3 py-1.5 shadow-md flex items-center gap-1">
                      <BadgeAlert className="h-4 w-4" /> Produto Controlado
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Col 2: Informações de Compra e Detalhes */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">{product.brand}</p>
                  <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 leading-tight">
                    {product.name}
                  </h1>
                  <p className="text-xs text-stone-450 font-mono">SKU / Cód. Interno: {product.sku}</p>
                </div>

                {/* Preços */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-150 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-stone-400 uppercase">Preço Unitário</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      {showPromo ? (
                        <>
                          <span className="text-2xl sm:text-3xl font-extrabold text-agro-green-dark">
                            R$ {product.promoPrice?.toFixed(2)}
                          </span>
                          <span className="text-sm text-stone-400 line-through">
                            R$ {product.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                          R$ {product.price.toFixed(2)}
                        </span>
                      )}
                      <span className="text-xs text-stone-500 font-semibold">/ {product.unit}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] font-bold text-stone-400 uppercase">Estoque Disponível</p>
                    <div className="mt-1 flex flex-col items-end">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                        hasStock ? (isLowStock ? 'text-amber-700' : 'text-emerald-700') : 'text-rose-600'
                      }`}>
                        <span className={`h-2 w-2 rounded-full ${
                          hasStock ? (isLowStock ? 'bg-amber-500 animate-ping' : 'bg-emerald-600') : 'bg-rose-500'
                        }`} />
                        {hasStock ? `${product.stock} ${product.unit.split(' ')[0]}` : 'Sob consulta'}
                      </span>
                      {isLowStock && (
                        <span className="text-[9px] text-amber-600 font-bold mt-0.5">Estoque Baixo!</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Resumo da descrição */}
                <p className="text-sm text-stone-600 leading-relaxed">
                  {product.description}
                </p>

                {/* Informações sobre produto controlado */}
                {product.isControlled && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-750 flex gap-2">
                    <AlertTriangle className="h-5 w-5 shrink-0" />
                    <div>
                      <p className="font-bold">Produto de Venda Controlada</p>
                      <p className="mt-1 leading-relaxed text-red-700">
                        Este produto necessita de receita médica veterinária ou receituário agronômico para faturamento e retirada. Finalize o orçamento normalmente; nossa equipe solicitará o documento.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Controles de Compra */}
              <div className="space-y-4 pt-6 border-t border-stone-100">
                {hasStock ? (
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Seletor de quantidade */}
                    <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-stone-50 w-full sm:w-auto justify-between sm:justify-start">
                      <button
                        onClick={handleDecrement}
                        disabled={quantity <= 1}
                        className="p-3 text-stone-600 hover:bg-stone-200 disabled:opacity-30 disabled:hover:bg-transparent"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-5 text-sm font-extrabold text-stone-800 w-12 text-center select-none">
                        {quantity}
                      </span>
                      <button
                        onClick={handleIncrement}
                        disabled={quantity >= product.stock}
                        className="p-3 text-stone-600 hover:bg-stone-200 disabled:opacity-30 disabled:hover:bg-transparent"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Botão Adicionar ao Orçamento */}
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 flex w-full items-center justify-center gap-2 rounded-xl bg-agro-green-dark hover:bg-agro-green-primary py-3.5 text-sm font-bold text-white shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <ShoppingCart className="h-4.5 w-4.5" />
                      Adicionar ao Orçamento
                    </button>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-stone-100 border border-stone-200 text-center">
                    <p className="text-xs text-stone-500 font-bold">Produto temporariamente indisponível no estoque físico.</p>
                  </div>
                )}

                {/* Botão Rápido WhatsApp */}
                <button
                  onClick={handleDirectWhatsapp}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-agro-green-dark hover:bg-stone-550/10 py-3.5 text-sm font-bold text-agro-green-dark transition-all duration-300"
                >
                  <Phone className="h-4.5 w-4.5" />
                  Orçamento Rápido via WhatsApp
                </button>
              </div>
            </div>
          </div>

          {/* Abas de Informações Adicionais */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Indicação de Uso */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="font-display font-bold text-stone-900 text-lg flex items-center gap-2 border-b border-stone-100 pb-3">
                <Info className="h-5 w-5 text-agro-green-light" />
                Indicações de Uso
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed whitespace-pre-line">
                {product.useIndication}
              </p>
            </div>

            {/* Descrição Técnica */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="font-display font-bold text-stone-900 text-lg flex items-center gap-2 border-b border-stone-100 pb-3">
                <ShieldCheck className="h-5 w-5 text-agro-green-light" />
                Especificações Técnicas
              </h3>
              <p className="text-xs sm:text-sm text-stone-650 leading-relaxed whitespace-pre-line">
                {product.technicalDesc}
              </p>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
