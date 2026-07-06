'use client';

import React, { useState } from 'react';
import { useAgro } from '@/context/AgroContext';
import { Product } from '@/data/initialData';
import {
  TrendingUp,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  SlidersHorizontal,
  X,
  CheckCircle,
  AlertCircle,
  Package,
  AlertTriangle,
  History
} from 'lucide-react';

export default function AdminEstoquePage() {
  const { products, categories, stockHistory, adjustStock } = useAgro();

  // Estados de busca e filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [stockStatus, setStockStatus] = useState<'todos' | 'baixo' | 'normal' | 'esgotado'>('todos');

  // Estados de Movimentação manual
  const [isMoveOpen, setIsMoveOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [moveType, setMoveType] = useState<'entrada' | 'saida'>('entrada');
  const [moveQty, setMoveQty] = useState('');
  const [moveReason, setMoveReason] = useState('');

  // Mensagens de Feedback
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleOpenMovement = (product: Product, type: 'entrada' | 'saida') => {
    setSelectedProduct(product);
    setMoveType(type);
    setMoveQty('');
    setMoveReason('');
    setIsMoveOpen(true);
  };

  const handleSubmitMovement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const qtyNum = parseInt(moveQty);
    if (isNaN(qtyNum) || qtyNum <= 0) {
      showToast('A quantidade deve ser um número inteiro maior que zero.', 'error');
      return;
    }

    if (moveType === 'saida' && qtyNum > selectedProduct.stock) {
      showToast('A quantidade de saída excede o estoque disponível.', 'error');
      return;
    }

    // Processar ajuste
    const reasonText = moveReason || (moveType === 'entrada' ? 'Ajuste manual de entrada' : 'Ajuste manual de saída');
    adjustStock(selectedProduct.id, moveType, qtyNum, reasonText);

    showToast(
      `Estoque ajustado com sucesso! ${moveType === 'entrada' ? 'Entrada' : 'Saída'} de ${qtyNum} ${selectedProduct.unit.split(' ')[0]}.`
    );
    setIsMoveOpen(false);
  };

  // Filtrar produtos
  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());

    const matchCategory = selectedCategory === 'Todas' || p.category === selectedCategory;

    let matchStatus = true;
    if (stockStatus === 'baixo') {
      matchStatus = p.stock <= p.minStock && p.stock > 0;
    } else if (stockStatus === 'esgotado') {
      matchStatus = p.stock === 0;
    } else if (stockStatus === 'normal') {
      matchStatus = p.stock > p.minStock;
    }

    return matchSearch && matchCategory && matchStatus;
  });

  return (
    <div className="space-y-8 relative">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className={`fixed top-6 right-6 z-55 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl border animate-in fade-in slide-in-from-top-6 duration-200 ${
          toastMessage.type === 'success' ? 'bg-agro-green-dark border-emerald-800 text-white' : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {toastMessage.type === 'success' ? <CheckCircle className="h-5 w-5 text-agro-gold" /> : <AlertCircle className="h-5 w-5" />}
          <span className="text-xs font-bold">{toastMessage.text}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-extrabold text-stone-900 tracking-tight">
          Controle de Estoque
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Gerencie a entrada e saída manual de insumos, monitore níveis mínimos e verifique o histórico.
        </p>
      </div>

      {/* Grid de Filtros */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Busca por SKU ou Nome */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar produto por nome ou SKU..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-agro-green-light focus:border-transparent text-xs bg-stone-50/50"
          />
        </div>

        {/* Categoria e Status */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center justify-end">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-stone-500 font-medium whitespace-nowrap">Categoria:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-agro-green-light w-full sm:w-auto"
            >
              <option value="Todas">Todas</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-stone-500 font-medium whitespace-nowrap">Status:</span>
            <select
              value={stockStatus}
              onChange={(e: any) => setStockStatus(e.target.value)}
              className="border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-agro-green-light w-full sm:w-auto"
            >
              <option value="todos">Todos os níveis</option>
              <option value="baixo">Estoque Baixo</option>
              <option value="normal">Estoque Normal</option>
              <option value="esgotado">Esgotado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid Principal: Lista e Histórico */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Tabela de Estoque */}
        <div className="lg:col-span-8 bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-stone-100 flex items-center gap-2">
            <Package className="h-5 w-5 text-agro-green-dark" />
            <h2 className="font-display font-bold text-stone-900 text-base">Insumos e Saldo Físico</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 font-extrabold uppercase bg-stone-50/40">
                  <th className="py-3.5 px-4">Produto</th>
                  <th className="py-3.5 px-2">SKU</th>
                  <th className="py-3.5 px-2">Qtd Atual</th>
                  <th className="py-3.5 px-2">Mínimo</th>
                  <th className="py-3.5 px-2">Status Alerta</th>
                  <th className="py-3.5 px-4 text-right">Movimentar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((p) => {
                    const isLow = p.stock <= p.minStock && p.stock > 0;
                    const isOut = p.stock === 0;
                    return (
                      <tr key={p.id} className="hover:bg-stone-50/20">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-bold text-stone-900 line-clamp-1">{p.name}</p>
                            <p className="text-[10px] text-stone-400 font-semibold">{p.category}</p>
                          </div>
                        </td>
                        <td className="py-3 px-2 font-mono font-bold text-stone-605">{p.sku}</td>
                        <td className="py-3 px-2 font-bold text-stone-850">
                          {p.stock} <span className="text-[10px] text-stone-450 font-normal">/ {p.unit}</span>
                        </td>
                        <td className="py-3 px-2 text-stone-500 font-medium">{p.minStock}</td>
                        <td className="py-3 px-2">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-extrabold border ${
                            isOut
                              ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
                              : isLow
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}>
                            {isOut ? 'Esgotado' : isLow ? 'Estoque Baixo' : 'Normal'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                          <button
                            onClick={() => handleOpenMovement(p, 'entrada')}
                            className="inline-flex items-center gap-0.5 px-2.5 py-1.5 border border-stone-200 rounded-lg text-[10px] font-bold text-stone-700 hover:bg-stone-100 hover:text-agro-green-dark"
                          >
                            <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" /> Entrada
                          </button>
                          <button
                            onClick={() => handleOpenMovement(p, 'saida')}
                            disabled={p.stock === 0}
                            className="inline-flex items-center gap-0.5 px-2.5 py-1.5 border border-stone-200 rounded-lg text-[10px] font-bold text-stone-700 hover:bg-stone-100 hover:text-red-650 disabled:opacity-30 disabled:hover:bg-transparent"
                          >
                            <ArrowDownRight className="h-3.5 w-3.5 text-rose-500" /> Saída
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-stone-500 font-bold">Nenhum insumo corresponde aos filtros.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Histórico de Movimentações */}
        <div className="lg:col-span-4 bg-white border border-stone-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div className="border-b border-stone-100 pb-4 mb-4 flex items-center gap-2">
            <History className="h-5 w-5 text-stone-600" />
            <div>
              <h3 className="font-display font-bold text-stone-900 text-base">Movimentações</h3>
              <p className="text-[11px] text-stone-450 font-medium">Log recente de ajustes e faturamentos</p>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto max-h-96 pr-2">
            {stockHistory.length > 0 ? (
              stockHistory.map((mov) => {
                const isEntrada = mov.type === 'entrada';
                return (
                  <div key={mov.id} className="p-3 rounded-xl bg-stone-50 border border-stone-150 flex items-start gap-2.5 justify-between text-[11px]">
                    <div className="space-y-0.5">
                      <p className="font-bold text-stone-900 line-clamp-1">{mov.productName}</p>
                      <p className="text-[10px] text-stone-450 italic">{mov.reason}</p>
                      <p className="text-[9px] text-stone-400 font-medium">{new Date(mov.createdAt).toLocaleDateString('pt-BR')} {new Date(mov.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                    <div className="text-right shrink-0 flex flex-col items-end">
                      <span className={`inline-flex items-center gap-0.5 font-extrabold px-1.5 py-0.5 rounded text-[10px] ${
                        isEntrada ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                      }`}>
                        {isEntrada ? '+' : '-'}{mov.quantity}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-48 flex items-center justify-center text-center text-stone-400 font-semibold">Sem movimentações.</div>
            )}
          </div>
        </div>

      </div>

      {/* Modal Ajuste Manual de Estoque (Entrada / Saída) */}
      {isMoveOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsMoveOpen(false)} className="fixed inset-0 bg-black/50 backdrop-blur-xs" />
          
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 sm:p-8 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-6">
              <div className="space-y-1">
                <h2 className="font-display text-lg font-bold text-stone-900">
                  Ajustar Estoque: {moveType === 'entrada' ? 'Entrada' : 'Saída'}
                </h2>
                <p className="text-[11px] text-stone-500 font-semibold">{selectedProduct.name} (SKU: {selectedProduct.sku})</p>
              </div>
              <button
                onClick={() => setIsMoveOpen(false)}
                className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-50 hover:text-stone-600"
              >
                <X className="h-5.5 w-5.5" />
              </button>
            </div>

            <form onSubmit={handleSubmitMovement} className="space-y-4 text-xs text-stone-700">
              
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-150 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-stone-400 uppercase">Estoque Físico Atual</p>
                  <p className="text-sm font-bold text-stone-900 mt-0.5">{selectedProduct.stock} {selectedProduct.unit}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-stone-400 uppercase">Ajuste Configurado</p>
                  <p className={`text-sm font-bold mt-0.5 ${moveType === 'entrada' ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {moveType === 'entrada' ? 'Incremento (+)' : 'Decremento (-)'}
                  </p>
                </div>
              </div>

              {/* Quantidade */}
              <div>
                <label className="block font-bold text-stone-600 mb-1">Quantidade a Movimentar *</label>
                <input
                  type="number"
                  required
                  min="1"
                  max={moveType === 'saida' ? selectedProduct.stock : undefined}
                  value={moveQty}
                  onChange={(e) => setMoveQty(e.target.value)}
                  placeholder={`Ex: 5 (Medida em ${selectedProduct.unit.split(' ')[0]})`}
                  className="w-full border border-stone-200 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-agro-green-light focus:outline-none"
                />
              </div>

              {/* Motivo */}
              <div>
                <label className="block font-bold text-stone-600 mb-1">Motivo / Descrição da Ação *</label>
                <input
                  type="text"
                  required
                  value={moveReason}
                  onChange={(e) => setMoveReason(e.target.value)}
                  placeholder={moveType === 'entrada' ? 'Ex: Entrada de nota fiscal da NutriCampo' : 'Ex: Ajuste manual por quebra de sacaria'}
                  className="w-full border border-stone-200 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-agro-green-light focus:outline-none"
                />
              </div>

              {/* Botoes */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsMoveOpen(false)}
                  className="rounded-xl border border-stone-200 hover:bg-stone-50 px-5 py-2.5 font-bold text-stone-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-agro-green-dark hover:bg-agro-green-primary px-6 py-2.5 font-bold text-white shadow-md hover:shadow-lg transition-all"
                >
                  Confirmar Lançamento
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
