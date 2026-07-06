'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAgro } from '@/context/AgroContext';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  FileText,
  User,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Truck,
  Building,
  ArrowRight,
  ClipboardList
} from 'lucide-react';

export default function CarrinhoPage() {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    addOrder,
    clearCart,
    addClient
  } = useAgro();

  // Dados do formulário
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [clientType, setClientType] = useState<'produtor_rural' | 'empresa' | 'cliente_pet' | 'fazenda' | 'revendedor'>('produtor_rural');
  const [deliveryMethod, setDeliveryMethod] = useState<'retirada' | 'entrega'>('retirada');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  // Estados de Fluxo
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCreated, setOrderCreated] = useState<any>(null);

  const totalValue = cart.reduce(
    (sum, item) => {
      const price = item.product.promoPrice !== null ? item.product.promoPrice : item.product.price;
      return sum + price * item.quantity;
    },
    0
  );

  const handleQtyChange = (productId: string, currentQty: number, change: number, maxStock: number) => {
    const nextQty = currentQty + change;
    if (nextQty > maxStock) return; // Não permite exceder estoque
    updateCartQuantity(productId, nextQty);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);

    // 1. Cadastrar cliente no nosso contexto local (para fins de histórico no admin)
    const newClient = addClient({
      name,
      cpfCnpj: '000.000.000-00', // Mock padrão no fluxo rápido
      phone: whatsapp,
      whatsapp: whatsapp.replace(/\D/g, ''),
      email,
      address: deliveryMethod === 'entrega' ? address : 'Retirada na loja física',
      clientType,
      notes: `Cadastrado via formulário de orçamento web. Notas: ${notes}`
    });

    // 2. Registrar o pedido/orçamento no contexto
    const orderItems = cart.map((item) => {
      const price = item.product.promoPrice !== null ? item.product.promoPrice : item.product.price;
      return {
        productId: item.product.id,
        name: item.product.name,
        price,
        quantity: item.quantity,
        unit: item.product.unit
      };
    });

    const newOrder = addOrder({
      clientId: newClient.id,
      clientName: name,
      items: orderItems,
      totalValue,
      deliveryMethod,
      deliveryAddress: deliveryMethod === 'entrega' ? address : 'Retirada na Loja Matriz',
      originChannel: 'web',
      internalNotes: notes
    });

    // 3. Montar mensagem de WhatsApp
    const typeLabel = {
      produtor_rural: 'Produtor Rural',
      empresa: 'Empresa',
      cliente_pet: 'Cliente Pet / Urbano',
      fazenda: 'Fazenda',
      revendedor: 'Revendedor'
    }[clientType];

    const deliveryLabel = deliveryMethod === 'entrega' ? 'Entrega na propriedade' : 'Retirada na loja';

    let message = `*NOVO ORÇAMENTO - AGRODIGITAL (Pedido: ${newOrder.id})*\n\n`;
    message += `*DADOS DO CLIENTE:*\n`;
    message += `• Nome: ${name}\n`;
    message += `• WhatsApp: ${whatsapp}\n`;
    message += `• Tipo de Cliente: ${typeLabel}\n`;
    message += `• Método: ${deliveryLabel}\n`;
    if (deliveryMethod === 'entrega') {
      message += `• Endereço: ${address}\n`;
    }
    if (notes) {
      message += `• Observações: ${notes}\n`;
    }
    message += `\n*ITENS SELECIONADOS:*\n`;
    cart.forEach((item, index) => {
      const price = item.product.promoPrice !== null ? item.product.promoPrice : item.product.price;
      message += `${index + 1}. ${item.product.name}\n   Qtd: ${item.quantity} ${item.product.unit} | R$ ${(price * item.quantity).toFixed(2)}\n`;
    });
    message += `\n*VALOR TOTAL ESTIMADO:* R$ ${totalValue.toFixed(2)}`;

    const whatsappUrl = `https://wa.me/5561998765432?text=${encodeURIComponent(message)}`;

    // 4. Limpar carrinho e avançar tela
    setTimeout(() => {
      setOrderCreated({
        id: newOrder.id,
        whatsappUrl
      });
      clearCart();
      setIsSubmitting(false);
    }, 1000);
  };

  // Se o pedido foi concluído com sucesso
  if (orderCreated) {
    return (
      <div className="flex flex-col min-h-screen">
        <PublicHeader />
        <main className="flex-1 bg-stone-50 py-16 flex items-center justify-center">
          <div className="mx-auto max-w-md w-full px-4 text-center space-y-6">
            <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-xl space-y-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle className="h-10 w-10 animate-bounce" />
              </div>
              
              <div className="space-y-2">
                <h2 className="font-display text-2xl font-bold text-stone-900">Orçamento Gerado!</h2>
                <p className="text-sm text-stone-500">
                  O pedido foi registrado em nossa administração sob o número <span className="font-mono font-bold text-agro-green-dark">{orderCreated.id}</span>.
                </p>
                <p className="text-xs text-stone-500">
                  Para finalizar a cotação, obter prazos de entrega e negociar formas de pagamento, clique no botão abaixo para nos enviar os dados via WhatsApp.
                </p>
              </div>

              <a
                href={orderCreated.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-agro-green-dark hover:bg-agro-green-primary py-3.5 text-sm font-bold text-white shadow-md hover:shadow-lg transition-all"
              >
                <Phone className="h-5 w-5" /> Enviar para o WhatsApp
              </a>

              <div className="pt-4 border-t border-stone-100">
                <Link
                  href="/catalogo"
                  className="text-xs font-bold text-agro-green-dark hover:underline"
                >
                  Voltar para o catálogo de produtos
                </Link>
              </div>
            </div>
          </div>
        </main>
        <PublicFooter />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />

      <main className="flex-1 bg-stone-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="mb-10">
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-agro-green-dark sm:text-4xl">
              Meu Orçamento
            </h1>
            <p className="mt-2 text-sm text-stone-600">
              Gerencie seus produtos e forneça as informações para faturamento rápido ou agendamento de frete.
            </p>
          </div>

          {cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Col 1: Lista de Itens (Tabela/Cards) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
                  <div className="p-6 border-b border-stone-100 flex items-center gap-2">
                    <ClipboardList className="h-5.5 w-5.5 text-agro-green-dark" />
                    <h2 className="font-display font-bold text-stone-900 text-lg">Produtos Escolhidos</h2>
                  </div>

                  <ul className="divide-y divide-stone-100">
                    {cart.map((item) => {
                      const price = item.product.promoPrice !== null ? item.product.promoPrice : item.product.price;
                      return (
                        <li key={item.product.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex gap-4">
                            <div className="h-16 w-16 rounded-xl overflow-hidden bg-stone-50 border border-stone-150 shrink-0">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="text-sm font-bold text-stone-900 leading-tight">
                                {item.product.name}
                              </h3>
                              <p className="text-xs text-stone-500 mt-1">{item.product.brand} • {item.product.unit}</p>
                              <p className="text-xs font-bold text-agro-green-dark mt-1">
                                R$ {price.toFixed(2)}
                              </p>
                            </div>
                          </div>

                          {/* Ações de Quantidade e Remoção */}
                          <div className="flex items-center justify-between sm:justify-end gap-6">
                            <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-stone-50">
                              <button
                                onClick={() => handleQtyChange(item.product.id, item.quantity, -1, item.product.stock)}
                                className="p-2 text-stone-600 hover:bg-stone-200"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="px-3 text-xs font-extrabold text-stone-800 w-10 text-center select-none">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQtyChange(item.product.id, item.quantity, 1, item.product.stock)}
                                className="p-2 text-stone-600 hover:bg-stone-200"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="p-2 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors"
                              title="Remover Item"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* Col 2: Formulário e Fechamento */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Resumo Financeiro */}
                <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
                  <h3 className="font-display font-bold text-stone-900 text-base">Resumo do Orçamento</h3>
                  <div className="flex items-center justify-between border-t border-b border-stone-100 py-3 text-sm">
                    <span className="text-stone-500">Valor Estimado</span>
                    <span className="font-extrabold text-agro-green-dark text-lg">
                      R$ {totalValue.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-400 leading-relaxed">
                    *Os valores são estimativas e podem variar conforme impostos estaduais, frete ou condições especiais de produtor rural.
                  </p>
                </div>

                {/* Formulário de Identificação */}
                <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
                  <div className="flex items-center gap-2 border-b border-stone-100 pb-3 mb-6">
                    <User className="h-5 w-5 text-agro-green-dark" />
                    <h3 className="font-display font-bold text-stone-900 text-base">Identificação e Entrega</h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nome */}
                    <div>
                      <label className="block text-xs font-bold text-stone-600 mb-1">Nome Completo / Razão Social *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Tiago de Souza Santos"
                        className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-agro-green-light focus:border-transparent focus:outline-none"
                      />
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <label className="block text-xs font-bold text-stone-600 mb-1">WhatsApp / Telefone *</label>
                      <input
                        type="tel"
                        required
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="Ex: (61) 99876-5432"
                        className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-agro-green-light focus:border-transparent focus:outline-none"
                      />
                    </div>

                    {/* E-mail */}
                    <div>
                      <label className="block text-xs font-bold text-stone-600 mb-1">E-mail (Opcional)</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ex: tiago@fazenda.com"
                        className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-agro-green-light focus:border-transparent focus:outline-none"
                      />
                    </div>

                    {/* Tipo de Cliente */}
                    <div>
                      <label className="block text-xs font-bold text-stone-600 mb-1">Perfil do Cliente *</label>
                      <select
                        value={clientType}
                        onChange={(e: any) => setClientType(e.target.value)}
                        className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-agro-green-light focus:border-transparent focus:outline-none bg-white"
                      >
                        <option value="produtor_rural">Produtor Rural / Fazendeiro</option>
                        <option value="cliente_pet">Cliente Pet / Jardinagem</option>
                        <option value="fazenda">Pessoa Jurídica / Agroindústria</option>
                        <option value="revendedor">Revendedor / Distribuidor</option>
                      </select>
                    </div>

                    {/* Tipo de Recebimento */}
                    <div>
                      <label className="block text-xs font-bold text-stone-600 mb-1">Forma de Retirada / Entrega *</label>
                      <div className="grid grid-cols-2 gap-3 mt-1">
                        <button
                          type="button"
                          onClick={() => setDeliveryMethod('retirada')}
                          className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                            deliveryMethod === 'retirada'
                              ? 'bg-agro-green-dark text-white border-agro-green-dark'
                              : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                          }`}
                        >
                          <Building className="h-4 w-4" /> Retirada na Loja
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeliveryMethod('entrega')}
                          className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                            deliveryMethod === 'entrega'
                              ? 'bg-agro-green-dark text-white border-agro-green-dark'
                              : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                          }`}
                        >
                          <Truck className="h-4 w-4" /> Entrega
                        </button>
                      </div>
                    </div>

                    {/* Endereço de Entrega condicional */}
                    {deliveryMethod === 'entrega' && (
                      <div className="animate-in fade-in slide-in-from-top-3 duration-200">
                        <label className="block text-xs font-bold text-stone-600 mb-1">Endereço de Entrega (Fazenda/Sítio/Rua) *</label>
                        <textarea
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Informe o endereço detalhado ou referências de acesso (Ex: Fazenda Bela Vista, KM 12 de estrada de terra da rodovia X)"
                          rows={3}
                          className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-agro-green-light focus:border-transparent focus:outline-none"
                        />
                      </div>
                    )}

                    {/* Observações */}
                    <div>
                      <label className="block text-xs font-bold text-stone-600 mb-1">Observações / Instruções Especiais</label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Ex: Preciso que descarregue no galpão norte, faturamento para 30 dias no CPF do produtor, etc."
                        rows={2}
                        className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-agro-green-light focus:border-transparent focus:outline-none"
                      />
                    </div>

                    {/* Botão Enviar */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-agro-gold hover:bg-yellow-450 py-3.5 text-sm font-bold text-agro-green-dark shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Processando...' : 'Gerar e Enviar Orçamento'}
                      <ArrowRight className="h-4.5 w-4.5" />
                    </button>
                  </form>
                </div>
              </div>

            </div>
          ) : (
            /* Carrinho Vazio */
            <div className="text-center py-20 bg-white border border-stone-200 rounded-3xl max-w-lg mx-auto space-y-5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-stone-400">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-stone-900 text-lg">Seu carrinho de orçamento está vazio</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Você ainda não adicionou nenhum insumo ou produto. Acesse nosso catálogo para selecionar o que precisa.
                </p>
              </div>
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2 rounded-xl bg-agro-green-dark text-white px-6 py-3 text-xs font-bold hover:bg-agro-green-primary transition-all shadow-md"
              >
                Ir para o Catálogo
              </Link>
            </div>
          )}
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
