'use client';

import React, { useState } from 'react';
import { useAgro } from '@/context/AgroContext';
import { Client } from '@/data/initialData';
import {
  Search,
  UserPlus,
  Eye,
  Edit2,
  Trash2,
  X,
  CheckCircle,
  AlertCircle,
  FileText,
  Clock,
  MapPin,
  Tag
} from 'lucide-react';

export default function AdminClientesPage() {
  const { clients, orders, addClient, updateClient, deleteClient } = useAgro();

  // Estados de Busca e Modais
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [selectedClientDetail, setSelectedClientDetail] = useState<Client | null>(null);

  // Mensagens de Feedback
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Estados do Formulário
  const [formData, setFormData] = useState({
    name: '',
    cpfCnpj: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    clientType: 'produtor_rural' as Client['clientType'],
    notes: ''
  });

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleOpenCreate = () => {
    setEditingClient(null);
    setFormData({
      name: '',
      cpfCnpj: '',
      phone: '',
      whatsapp: '',
      email: '',
      address: '',
      clientType: 'produtor_rural',
      notes: ''
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (client: Client, e: React.MouseEvent) => {
    e.stopPropagation(); // Evita abrir o modal de detalhes
    setEditingClient(client);
    setFormData({
      name: client.name,
      cpfCnpj: client.cpfCnpj,
      phone: client.phone,
      whatsapp: client.whatsapp,
      email: client.email,
      address: client.address,
      clientType: client.clientType,
      notes: client.notes
    });
    setIsFormOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      showToast('Nome e Telefone são campos obrigatórios.', 'error');
      return;
    }

    if (editingClient) {
      // Editar
      const updated: Client = {
        ...editingClient,
        name: formData.name,
        cpfCnpj: formData.cpfCnpj,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        email: formData.email,
        address: formData.address,
        clientType: formData.clientType,
        notes: formData.notes
      };
      updateClient(updated);
      showToast('Cliente atualizado com sucesso!');
    } else {
      // Criar
      addClient({
        name: formData.name,
        cpfCnpj: formData.cpfCnpj,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        email: formData.email,
        address: formData.address,
        clientType: formData.clientType,
        notes: formData.notes
      });
      showToast('Cliente cadastrado com sucesso!');
    }

    setIsFormOpen(false);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Deseja realmente remover este cliente? Histórico de orçamentos não será afetado.')) {
      deleteClient(id);
      showToast('Cliente excluído com sucesso!');
    }
  };

  // Filtrar clientes
  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      (c.cpfCnpj && c.cpfCnpj.includes(searchTerm))
  );

  // Rótulos de tipos de clientes
  const getClientTypeLabel = (type: Client['clientType']) => {
    const map: Record<string, string> = {
      produtor_rural: 'Produtor Rural',
      empresa: 'Empresa / Agro',
      cliente_pet: 'Cliente Pet / Urbano',
      fazenda: 'Fazenda / Produtor',
      revendedor: 'Revendedor'
    };
    return map[type] || type;
  };

  const getClientTypeBadge = (type: Client['clientType']) => {
    const map: Record<string, string> = {
      produtor_rural: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      fazenda: 'bg-green-50 text-green-700 border-green-200',
      cliente_pet: 'bg-blue-50 text-blue-700 border-blue-200',
      empresa: 'bg-amber-50 text-amber-700 border-amber-200',
      revendedor: 'bg-purple-50 text-purple-700 border-purple-200'
    };
    return map[type] || 'bg-stone-50 text-stone-750 border-stone-200';
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-stone-900 tracking-tight">
            Gestão de Clientes
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Gerencie perfis de produtores rurais, fazendas e compradores pet para um pós-venda eficiente.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-agro-green-dark hover:bg-agro-green-primary px-5 py-3 text-xs font-bold text-white shadow-md transition-all self-start"
        >
          <UserPlus className="h-4.5 w-4.5" /> Novo Cliente
        </button>
      </div>

      {/* Busca */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex items-center">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome, telefone ou CPF/CNPJ..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-agro-green-light focus:border-transparent text-xs bg-stone-50/50"
          />
        </div>
      </div>

      {/* Tabela de Clientes */}
      <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 font-extrabold uppercase bg-stone-50/60">
                <th className="py-4 px-6">Nome / Cadastro</th>
                <th className="py-4 px-2">CPF / CNPJ</th>
                <th className="py-4 px-2">Telefone</th>
                <th className="py-4 px-2">E-mail</th>
                <th className="py-4 px-2">Tipo de Cliente</th>
                <th className="py-4 px-2">Endereço Principal</th>
                <th className="py-4 px-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredClients.length > 0 ? (
                filteredClients.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedClientDetail(c)}
                    className="hover:bg-stone-50/55 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-6">
                      <div>
                        <p className="font-bold text-stone-900">{c.name}</p>
                        <p className="text-[10px] text-stone-400 font-medium">Cadastrado em {new Date(c.createdAt).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-2 font-mono font-medium text-stone-650">{c.cpfCnpj || '-'}</td>
                    <td className="py-3.5 px-2 font-semibold text-stone-700">{c.phone}</td>
                    <td className="py-3.5 px-2 text-stone-500 font-medium">{c.email || '-'}</td>
                    <td className="py-3.5 px-2">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold border ${getClientTypeBadge(c.clientType)}`}>
                        {getClientTypeLabel(c.clientType)}
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-stone-500 max-w-[200px] truncate">{c.address}</td>
                    <td className="py-3.5 px-6 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedClientDetail(c);
                        }}
                        className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-500 hover:text-agro-green-dark"
                        title="Ver histórico"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => handleOpenEdit(c, e)}
                        className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-500 hover:text-agro-green-dark"
                        title="Editar"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(c.id, e)}
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
                  <td colSpan={7} className="py-12 text-center text-stone-500 font-bold">
                    Nenhum cliente correspondente encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Formulário (Criar / Editar) */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsFormOpen(false)} className="fixed inset-0 bg-black/50 backdrop-blur-xs" />
          
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 sm:p-8 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-6">
              <h2 className="font-display text-xl font-bold text-stone-900">
                {editingClient ? `Editar: ${editingClient.name}` : 'Cadastrar Novo Cliente'}
              </h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-50 hover:text-stone-600"
              >
                <X className="h-5.5 w-5.5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs text-stone-705">
              {/* Nome */}
              <div>
                <label className="block font-bold text-stone-600 mb-1">Nome Completo / Razão Social *</label>
                <input
                  type="text"
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ex: Tiago de Souza Santos"
                  className="w-full border border-stone-200 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-agro-green-light focus:outline-none"
                />
              </div>

              {/* CPF e Tipo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-600 mb-1">CPF / CNPJ</label>
                  <input
                    type="text"
                    name="cpfCnpj"
                    value={formData.cpfCnpj}
                    onChange={handleInputChange}
                    placeholder="Ex: 123.456.789-00"
                    className="w-full border border-stone-200 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-agro-green-light focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-600 mb-1">Tipo de Cliente *</label>
                  <select
                    name="clientType"
                    value={formData.clientType}
                    onChange={handleInputChange}
                    className="w-full border border-stone-200 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-agro-green-light focus:outline-none bg-white"
                  >
                    <option value="produtor_rural">Produtor Rural</option>
                    <option value="cliente_pet">Cliente Pet / Urbano</option>
                    <option value="fazenda">Fazenda / Produtor</option>
                    <option value="empresa">Empresa / Distribuidor</option>
                    <option value="revendedor">Revendedor</option>
                  </select>
                </div>
              </div>

              {/* Telefone e Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-600 mb-1">Telefone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Ex: (61) 99876-5432"
                    className="w-full border border-stone-200 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-agro-green-light focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-600 mb-1">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Ex: tiago@fazenda.com"
                    className="w-full border border-stone-200 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-agro-green-light focus:outline-none"
                  />
                </div>
              </div>

              {/* Endereço */}
              <div>
                <label className="block font-bold text-stone-600 mb-1">Endereço Principal</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Ex: KM 45, Rodovia GO-118, Zona Rural"
                  className="w-full border border-stone-200 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-agro-green-light focus:outline-none"
                />
              </div>

              {/* Observações */}
              <div>
                <label className="block font-bold text-stone-600 mb-1">Observações Internas</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="Instruções de entrega na fazenda, limites de crédito, etc..."
                  className="w-full border border-stone-200 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-agro-green-light focus:outline-none"
                />
              </div>

              {/* Botões do Formulário */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="rounded-xl border border-stone-200 hover:bg-stone-50 px-5 py-2.5 font-bold text-stone-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-agro-green-dark hover:bg-agro-green-primary px-6 py-2.5 font-bold text-white shadow-md hover:shadow-lg transition-all"
                >
                  {editingClient ? 'Salvar Alterações' : 'Cadastrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Histórico e Detalhes de Cliente */}
      {selectedClientDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setSelectedClientDetail(null)} className="fixed inset-0 bg-black/50 backdrop-blur-xs" />
          
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 sm:p-8 animate-in zoom-in-95 duration-200 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div className="space-y-1">
                <h2 className="font-display text-xl font-bold text-stone-900">{selectedClientDetail.name}</h2>
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${getClientTypeBadge(selectedClientDetail.clientType)}`}>
                  {getClientTypeLabel(selectedClientDetail.clientType)}
                </span>
              </div>
              <button
                onClick={() => setSelectedClientDetail(null)}
                className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-50 hover:text-stone-600"
              >
                <X className="h-5.5 w-5.5" />
              </button>
            </div>

            {/* Informações detalhadas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs border-b border-stone-100 pb-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4.5 w-4.5 text-stone-400" />
                  <div>
                    <p className="font-bold text-stone-400 uppercase text-[9px]">Endereço</p>
                    <p className="text-stone-700 font-semibold mt-0.5">{selectedClientDetail.address || 'Não cadastrado'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4.5 w-4.5 text-stone-400" />
                  <div>
                    <p className="font-bold text-stone-400 uppercase text-[9px]">Membro Desde</p>
                    <p className="text-stone-700 font-semibold mt-0.5">{new Date(selectedClientDetail.createdAt).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Tag className="h-4.5 w-4.5 text-stone-400" />
                  <div>
                    <p className="font-bold text-stone-400 uppercase text-[9px]">CPF / CNPJ</p>
                    <p className="text-stone-700 font-semibold mt-0.5 font-mono">{selectedClientDetail.cpfCnpj || 'Não informado'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <FileText className="h-4.5 w-4.5 text-stone-400" />
                  <div>
                    <p className="font-bold text-stone-400 uppercase text-[9px]">Notas Internas</p>
                    <p className="text-stone-600 mt-0.5 leading-relaxed italic">{selectedClientDetail.notes || 'Sem observações adicionais.'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Histórico de Pedidos */}
            <div className="space-y-4 text-xs">
              <h3 className="font-display font-bold text-stone-900 text-sm">Histórico de Orçamentos</h3>
              
              <div className="overflow-x-auto border border-stone-150 rounded-2xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200 text-stone-400 font-bold uppercase text-[9px]">
                      <th className="py-2.5 px-4">Pedido</th>
                      <th className="py-2.5 px-2">Data</th>
                      <th className="py-2.5 px-2">Itens</th>
                      <th className="py-2.5 px-2">Total</th>
                      <th className="py-2.5 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {orders.filter((o) => o.clientId === selectedClientDetail.id).length > 0 ? (
                      orders
                        .filter((o) => o.clientId === selectedClientDetail.id)
                        .map((order) => (
                          <tr key={order.id} className="hover:bg-stone-50/20">
                            <td className="py-2.5 px-4 font-mono font-bold text-stone-900">{order.id}</td>
                            <td className="py-2.5 px-2 font-medium text-stone-500">
                              {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                            </td>
                            <td className="py-2.5 px-2 font-semibold text-stone-700">
                              {order.items.reduce((sum, item) => sum + item.quantity, 0)} unid.
                            </td>
                            <td className="py-2.5 px-2 font-bold text-stone-850">
                              R$ {order.totalValue.toFixed(2)}
                            </td>
                            <td className="py-2.5 px-4 text-right">
                              <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold bg-stone-100 text-stone-700">
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-6 text-center text-stone-450 font-bold">Nenhum orçamento simulado encontrado.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-stone-100">
              <button
                onClick={() => setSelectedClientDetail(null)}
                className="rounded-xl bg-agro-green-dark hover:bg-agro-green-primary px-6 py-2.5 font-bold text-white text-xs shadow-md transition-all"
              >
                Fechar Visualização
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
