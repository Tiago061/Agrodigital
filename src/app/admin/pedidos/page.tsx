'use client';

import React, { useState } from 'react';
import { useAgro } from '@/context/AgroContext';
import { Order } from '@/data/initialData';
import {
  Search,
  Eye,
  Trash2,
  X,
  CheckCircle,
  AlertCircle,
  FileText,
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  ShoppingBag,
  DollarSign
} from 'lucide-react';

export default function AdminPedidosPage() {
  const { orders, updateOrderStatus, deleteOrder } = useAgro();

  // Estados de busca e modais
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Estados do Modal de Edição de Status
  const [statusVal, setStatusVal] = useState<Order['status']>('novo');
  const [internalNotesVal, setInternalNotesVal] = useState('');

  // Mensagens de Feedback
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleOpenDetail = (order: Order) => {
    setSelectedOrder(order);
    setStatusVal(order.status);
    setInternalNotesVal(order.internalNotes);
  };

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    updateOrderStatus(selectedOrder.id, statusVal, internalNotesVal);
    
    // Atualizar estado local do modal
    setSelectedOrder((prev) =>
      prev ? { ...prev, status: statusVal, internalNotes: internalNotesVal } : null
    );

    showToast('Pedido atualizado com sucesso!');
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Deseja realmente excluir permanentemente este registro de pedido?')) {
      deleteOrder(id);
      showToast('Pedido removido do histórico!');
    }
  };

  // Filtrar pedidos
  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mapeamentos visuais
  const getStatusStyle = (status: Order['status']) => {
    const map: Record<string, string> = {
      novo: 'bg-blue-50 text-blue-700 border-blue-200',
      em_analise: 'bg-amber-50 text-amber-700 border-amber-200',
      aguardando_pagamento: 'bg-purple-50 text-purple-700 border-purple-200',
      separado: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      enviado: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      concluido: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      cancelado: 'bg-rose-50 text-rose-700 border-rose-200'
    };
    return map[status] || 'bg-stone-50 text-stone-705 border-stone-200';
  };

  const getStatusLabel = (status: Order['status']) => {
    const map: Record<string, string> = {
      novo: 'Novo Orçamento',
      em_analise: 'Em Análise',
      aguardando_pagamento: 'Aguardando Pagamento',
      separado: 'Separado / Embalado',
      enviado: 'Despachado / Enviado',
      concluido: 'Concluído',
      cancelado: 'Cancelado'
    };
    return map[status] || status;
  };

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
          Gestão de Pedidos & Orçamentos
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Acompanhe orçamentos gerados pelo site, altere status de entrega e insira anotações internas.
        </p>
      </div>

      {/* Busca */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex items-center">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por número do pedido ou nome do cliente..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-agro-green-light focus:border-transparent text-xs bg-stone-50/50"
          />
        </div>
      </div>

      {/* Tabela de Pedidos */}
      <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 font-extrabold uppercase bg-stone-50/60">
                <th className="py-4 px-6">Pedido</th>
                <th className="py-4 px-2">Cliente</th>
                <th className="py-4 px-2">Data de Criação</th>
                <th className="py-4 px-2">Canal</th>
                <th className="py-4 px-2">Método</th>
                <th className="py-4 px-2">Itens</th>
                <th className="py-4 px-2">Valor Total</th>
                <th className="py-4 px-2">Status</th>
                <th className="py-4 px-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((o) => (
                  <tr
                    key={o.id}
                    onClick={() => handleOpenDetail(o)}
                    className="hover:bg-stone-50/55 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-6 font-mono font-bold text-stone-900">{o.id}</td>
                    <td className="py-3.5 px-2 font-semibold text-stone-700">{o.clientName}</td>
                    <td className="py-3.5 px-2 text-stone-550">
                      {new Date(o.createdAt).toLocaleDateString('pt-BR')} {new Date(o.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3.5 px-2 uppercase text-[10px] font-bold text-stone-400">{o.originChannel}</td>
                    <td className="py-3.5 px-2">
                      <span className="inline-flex items-center gap-1 font-semibold text-stone-600">
                        {o.deliveryMethod === 'entrega' ? 'Entrega' : 'Retirada'}
                      </span>
                    </td>
                    <td className="py-3.5 px-2 font-medium text-stone-500">
                      {o.items.reduce((sum, item) => sum + item.quantity, 0)} itens
                    </td>
                    <td className="py-3.5 px-2 font-bold text-stone-850">R$ {o.totalValue.toFixed(2)}</td>
                    <td className="py-3.5 px-2">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold border ${getStatusStyle(o.status)}`}>
                        {getStatusLabel(o.status)}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDetail(o);
                        }}
                        className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-500 hover:text-agro-green-dark"
                        title="Ver detalhes / Alterar Status"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(o.id, e)}
                        className="p-1.5 rounded-lg border border-stone-200 hover:bg-red-50 text-stone-500 hover:text-red-650"
                        title="Excluir"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-stone-500 font-bold">
                    Nenhum pedido/orçamento correspondente encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Detalhes e Ajuste de Status */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setSelectedOrder(null)} className="fixed inset-0 bg-black/50 backdrop-blur-xs" />
          
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 sm:p-8 animate-in zoom-in-95 duration-200 space-y-6">
            
            {/* Header Modal */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <h2 className="font-display text-xl font-bold text-stone-900">Pedido {selectedOrder.id}</h2>
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${getStatusStyle(selectedOrder.status)} mt-1`}>
                  {getStatusLabel(selectedOrder.status)}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-50 hover:text-stone-600"
              >
                <X className="h-5.5 w-5.5" />
              </button>
            </div>

            {/* Infos do Cliente */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-stone-50 p-4 rounded-2xl border border-stone-150">
              <div className="space-y-1.5">
                <p className="font-bold text-stone-450 uppercase text-[9px]">Cliente</p>
                <p className="font-bold text-stone-900">{selectedOrder.clientName}</p>
                <p className="text-stone-500 font-medium flex items-center gap-1">
                  <Phone className="h-3 w-3" /> WhatsApp no histórico
                </p>
              </div>
              <div className="space-y-1.5">
                <p className="font-bold text-stone-450 uppercase text-[9px]">Entrega e Logística</p>
                <p className="font-semibold text-stone-700 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  {selectedOrder.deliveryAddress}
                </p>
                <p className="text-[10px] text-stone-400 font-semibold">Método: {selectedOrder.deliveryMethod === 'entrega' ? 'Entrega na propriedade' : 'Retirada na loja física'}</p>
              </div>
            </div>

            {/* Produtos do Pedido */}
            <div className="space-y-3 text-xs">
              <h3 className="font-display font-bold text-stone-900 text-sm flex items-center gap-1.5">
                <ShoppingBag className="h-4.5 w-4.5 text-agro-green-light" /> Itens Escolhidos
              </h3>
              
              <div className="border border-stone-150 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200 text-stone-400 font-bold uppercase text-[9px]">
                      <th className="py-2.5 px-4">Produto</th>
                      <th className="py-2.5 px-2">Preço Unit.</th>
                      <th className="py-2.5 px-2 text-center">Quantidade</th>
                      <th className="py-2.5 px-4 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td className="py-3 px-4 font-bold text-stone-900">{item.name}</td>
                        <td className="py-3 px-2 text-stone-600">R$ {item.price.toFixed(2)}</td>
                        <td className="py-3 px-2 text-center font-bold text-stone-700">
                          {item.quantity} ({item.unit.split(' ')[0]})
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-stone-900">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    {/* Linha de Total */}
                    <tr className="bg-stone-50/50 font-bold border-t border-stone-200">
                      <td colSpan={3} className="py-3 px-4 text-right text-stone-500 text-xs">Valor Total Estimado:</td>
                      <td className="py-3 px-4 text-right text-agro-green-dark text-sm">
                        R$ {selectedOrder.totalValue.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Formulário de Alteração de Status */}
            <form onSubmit={handleSaveStatus} className="space-y-4 pt-4 border-t border-stone-100 text-xs text-stone-700">
              <h3 className="font-display font-bold text-stone-900 text-sm flex items-center gap-1.5">
                <FileText className="h-4.5 w-4.5 text-agro-green-light" /> Processamento e Observações
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Alterar Status */}
                <div>
                  <label className="block font-bold text-stone-600 mb-1">Mudar Status do Pedido *</label>
                  <select
                    value={statusVal}
                    onChange={(e: any) => setStatusVal(e.target.value)}
                    className="w-full border border-stone-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-agro-green-light focus:outline-none bg-white"
                  >
                    <option value="novo">Novo Orçamento (Aguardando contato)</option>
                    <option value="em_analise">Em análise (Calculando frete/impostos)</option>
                    <option value="aguardando_pagamento">Aguardando Pagamento</option>
                    <option value="separado">Separado / Embalado no Estoque</option>
                    <option value="enviado">Despachado / Enviado à Propriedade</option>
                    <option value="concluido">Concluído / Pago e Retirado</option>
                    <option value="cancelado">Cancelado / Expirado</option>
                  </select>
                </div>

                {/* Canal de Origem (Somente leitura para demonstrar metadados) */}
                <div>
                  <label className="block font-bold text-stone-400 mb-1">Canal de Origem</label>
                  <input
                    type="text"
                    disabled
                    value={`Web / Integração (${selectedOrder.originChannel.toUpperCase()})`}
                    className="w-full border border-stone-200 bg-stone-50 text-stone-400 rounded-xl px-3 py-2 focus:outline-none"
                  />
                </div>
              </div>

              {/* Notas Internas */}
              <div>
                <label className="block font-bold text-stone-600 mb-1">Observações Internas (Visível apenas para funcionários)</label>
                <textarea
                  value={internalNotesVal}
                  onChange={(e) => setInternalNotesVal(e.target.value)}
                  placeholder="Ex: Cliente vai pagar no boleto 30 dias. Entregar de trator se chover muito na estrada vicinal."
                  rows={2}
                  className="w-full border border-stone-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-agro-green-light focus:outline-none"
                />
              </div>

              {/* Botões */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="rounded-xl border border-stone-200 hover:bg-stone-50 px-5 py-2.5 font-bold text-stone-600"
                >
                  Fechar
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-agro-green-dark hover:bg-agro-green-primary px-6 py-2.5 font-bold text-white shadow-md hover:shadow-lg transition-all"
                >
                  Salvar Alterações
                </button>
              </div>

            </form>

          </div>
        </div>
      )}
    </div>
  );
}
