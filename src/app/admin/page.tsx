'use client';

import React from 'react';
import Link from 'next/link';
import { useAgro } from '@/context/AgroContext';
import {
  DollarSign,
  Package,
  Users,
  AlertTriangle,
  ShoppingCart,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  TrendingDown,
  CheckCircle
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { products, clients, orders } = useAgro();

  // 1. Cálculos de Indicadores
  const totalOrdersValue = orders
    .filter((o) => o.status !== 'cancelado')
    .reduce((sum, o) => sum + o.totalValue, 0);

  const lowStockProducts = products.filter((p) => p.stock <= p.minStock && p.isActive);
  const totalProducts = products.length;
  const totalClients = clients.length;
  const totalOrders = orders.length;

  // Pegar os 5 pedidos mais recentes
  const recentOrders = orders.slice(0, 5);

  // Status color mapper
  const getStatusStyle = (status: string) => {
    const map: Record<string, string> = {
      novo: 'bg-blue-50 text-blue-700 border-blue-200',
      em_analise: 'bg-amber-50 text-amber-700 border-amber-200',
      aguardando_pagamento: 'bg-purple-50 text-purple-700 border-purple-200',
      separado: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      enviado: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      concluido: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      cancelado: 'bg-rose-50 text-rose-700 border-rose-200'
    };
    return map[status] || 'bg-stone-50 text-stone-700 border-stone-200';
  };

  const getStatusLabel = (status: string) => {
    const map: Record<string, string> = {
      novo: 'Novo',
      em_analise: 'Em análise',
      aguardando_pagamento: 'Aguard. pagam.',
      separado: 'Separado',
      enviado: 'Enviado',
      concluido: 'Concluído',
      cancelado: 'Cancelado'
    };
    return map[status] || status;
  };

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-stone-900 tracking-tight">
            Dashboard Geral
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Visão unificada das operações de estoque, orçamentos e clientes.
          </p>
        </div>
        <div className="text-xs text-stone-500 font-medium bg-white px-4 py-2 border border-stone-200 rounded-xl shadow-xs self-start">
          Data atual: <span className="font-bold text-stone-850">06/07/2026</span>
        </div>
      </div>

      {/* Cards de Indicadores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Faturamento */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Orçamentos Fechados</span>
            <h3 className="font-display text-2xl font-extrabold text-stone-900">
              R$ {totalOrdersValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h3>
            <p className="text-[10px] text-stone-500 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-emerald-600" /> +12% vs mês anterior
            </p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <DollarSign className="h-6 w-6" />
          </div>
        </div>

        {/* Card 2: Produtos */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Produtos em Linha</span>
            <h3 className="font-display text-2xl font-extrabold text-stone-900">{totalProducts}</h3>
            <p className="text-[10px] text-stone-500 flex items-center gap-1">
              {products.filter((p) => !p.isActive).length} inativos ou suspensos
            </p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center">
            <Package className="h-6 w-6" />
          </div>
        </div>

        {/* Card 3: Clientes */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Clientes Cadastrados</span>
            <h3 className="font-display text-2xl font-extrabold text-stone-900">{totalClients}</h3>
            <p className="text-[10px] text-stone-500 flex items-center gap-1">
              {clients.filter((c) => c.clientType === 'produtor_rural').length} produtores rurais
            </p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Users className="h-6 w-6" />
          </div>
        </div>

        {/* Card 4: Alertas de Baixo Estoque */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Estoque Crítico</span>
            <h3 className="font-display text-2xl font-extrabold text-stone-900">{lowStockProducts.length}</h3>
            <p className="text-[10px] text-stone-500 flex items-center gap-1">
              {lowStockProducts.length > 0 ? 'Exige reposição imediata' : 'Nível seguro de reposição'}
            </p>
          </div>
          <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
            lowStockProducts.length > 0 ? 'bg-amber-50 text-amber-600 animate-pulse' : 'bg-stone-100 text-stone-650'
          }`}>
            <AlertTriangle className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Grid Central: Gráficos e Alertas Críticos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Gráfico SVG de Vendas por Período */}
        <div className="lg:col-span-8 bg-white border border-stone-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-6">
            <div>
              <h3 className="font-display font-bold text-stone-900 text-base">Evolução do Faturamento</h3>
              <p className="text-[11px] text-stone-450">Histórico mensal consolidado de orçamentos fechados</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-agro-green-light" />
              <span className="text-[10px] font-bold text-stone-600">Faturamento Bruto</span>
            </div>
          </div>

          {/* Gráfico SVG customizado */}
          <div className="relative w-full h-56 flex items-end">
            {/* Linhas de grade horizontal */}
            <div className="absolute inset-x-0 top-0 h-px bg-stone-100" />
            <div className="absolute inset-x-0 top-1/4 h-px bg-stone-100" />
            <div className="absolute inset-x-0 top-2/4 h-px bg-stone-100" />
            <div className="absolute inset-x-0 top-3/4 h-px bg-stone-100" />

            <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Área preenchida sob a curva */}
              <path
                d="M 50 170 L 150 140 L 250 160 L 350 90 L 450 110 L 550 50 L 550 190 L 50 190 Z"
                fill="url(#chart-grad)"
              />
              {/* Linha da curva */}
              <path
                d="M 50 170 L 150 140 L 250 160 L 350 90 L 450 110 L 550 50"
                fill="none"
                stroke="#064e3b"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Círculos nos pontos de dados */}
              <circle cx="50" cy="170" r="5" fill="#eab308" stroke="#064e3b" strokeWidth="2" />
              <circle cx="150" cy="140" r="5" fill="#eab308" stroke="#064e3b" strokeWidth="2" />
              <circle cx="250" cy="160" r="5" fill="#eab308" stroke="#064e3b" strokeWidth="2" />
              <circle cx="350" cy="90" r="5" fill="#eab308" stroke="#064e3b" strokeWidth="2" />
              <circle cx="450" cy="110" r="5" fill="#eab308" stroke="#064e3b" strokeWidth="2" />
              <circle cx="550" cy="50" r="5" fill="#eab308" stroke="#064e3b" strokeWidth="2" />
            </svg>
          </div>
          
          {/* Eixo X labels */}
          <div className="flex justify-between px-4 pt-3 text-[10px] text-stone-500 font-bold">
            <span>Jan</span>
            <span>Fev</span>
            <span>Mar</span>
            <span>Abr</span>
            <span>Mai</span>
            <span>Jun</span>
          </div>
        </div>

        {/* Reposição e Alertas de Estoque Crítico */}
        <div className="lg:col-span-4 bg-white border border-stone-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div className="border-b border-stone-100 pb-4 mb-4">
            <h3 className="font-display font-bold text-stone-900 text-base">Reposição Urgente</h3>
            <p className="text-[11px] text-stone-450">Produtos abaixo do estoque mínimo</p>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto max-h-56 pr-2">
            {lowStockProducts.length > 0 ? (
              lowStockProducts.map((p) => (
                <div key={p.id} className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200 flex items-start gap-3 justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-stone-850 line-clamp-1">{p.name}</p>
                    <p className="text-[10px] text-stone-500 font-semibold">{p.category} • SKU: {p.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-red-650">{p.stock} {p.unit.split(' ')[0]}</p>
                    <p className="text-[9px] text-stone-400">Min: {p.minStock}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-2">
                <CheckCircle className="h-8 w-8 text-emerald-555" />
                <h4 className="font-display font-bold text-stone-850 text-sm">Estoque Equilibrado</h4>
                <p className="text-[10px] text-stone-500">Todos os insumos estão acima do estoque mínimo configurado.</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-stone-100 mt-4">
            <Link
              href="/admin/estoque"
              className="w-full flex items-center justify-center gap-1 text-xs font-bold text-agro-green-dark hover:text-agro-green-light py-2 rounded-xl bg-stone-50 hover:bg-stone-100"
            >
              Fazer Entrada de Insumos <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Grid de Barras das Categorias e Tabela de Pedidos Recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Tabela de Pedidos Recentes */}
        <div className="lg:col-span-8 bg-white border border-stone-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-6">
            <div>
              <h3 className="font-display font-bold text-stone-900 text-base">Pedidos & Orçamentos Recentes</h3>
              <p className="text-[11px] text-stone-450">Últimas transações e contatos efetuados</p>
            </div>
            <Link
              href="/admin/pedidos"
              className="text-xs font-bold text-agro-green-dark hover:underline flex items-center gap-0.5"
            >
              Ver todos <ChevronRight className="h-4.5 w-4.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 font-extrabold uppercase">
                  <th className="py-3 px-2">Pedido</th>
                  <th className="py-3 px-2">Cliente</th>
                  <th className="py-3 px-2">Valor</th>
                  <th className="py-3 px-2">Canal</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-stone-50/50">
                      <td className="py-3 px-2 font-bold font-mono text-stone-900">{order.id}</td>
                      <td className="py-3 px-2 font-semibold text-stone-700 max-w-[150px] truncate">{order.clientName}</td>
                      <td className="py-3 px-2 font-bold text-stone-850">R$ {order.totalValue.toFixed(2)}</td>
                      <td className="py-3 px-2 font-medium uppercase text-[10px] text-stone-400">{order.originChannel}</td>
                      <td className="py-3 px-2">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusStyle(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <Link
                          href="/admin/pedidos"
                          className="p-1.5 rounded-lg hover:bg-stone-100 inline-block text-stone-500 hover:text-agro-green-dark"
                          title="Gerenciar pedido"
                        >
                          <ChevronRight className="h-4.5 w-4.5" />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-stone-500 font-medium">Nenhum orçamento cadastrado.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Gráfico de Categorias Mais Vendidas (Barras Horizontais) */}
        <div className="lg:col-span-4 bg-white border border-stone-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div className="border-b border-stone-100 pb-4 mb-6">
            <h3 className="font-display font-bold text-stone-900 text-base">Categorias em Alta</h3>
            <p className="text-[11px] text-stone-450">Categorias mais requisitadas nos orçamentos</p>
          </div>

          <div className="space-y-4">
            {/* Categoria 1: Rações */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
                <span>Rações</span>
                <span>45%</span>
              </div>
              <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-agro-green-dark rounded-full" style={{ width: '45%' }} />
              </div>
            </div>

            {/* Categoria 2: Fertilizantes */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
                <span>Fertilizantes</span>
                <span>28%</span>
              </div>
              <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-agro-green-light rounded-full" style={{ width: '28%' }} />
              </div>
            </div>

            {/* Categoria 3: Medicamentos veterinários */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
                <span>Medicamentos</span>
                <span>15%</span>
              </div>
              <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-agro-gold rounded-full" style={{ width: '15%' }} />
              </div>
            </div>

            {/* Categoria 4: Outros */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
                <span>Outros</span>
                <span>12%</span>
              </div>
              <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-stone-400 rounded-full" style={{ width: '12%' }} />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-stone-100 mt-6">
            <Link
              href="/admin/produtos"
              className="w-full flex items-center justify-center gap-1 text-xs font-bold text-stone-700 hover:bg-stone-50 py-2 rounded-xl border border-stone-200"
            >
              Ver Catálogo de Insumos
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
