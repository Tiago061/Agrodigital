'use client';

import React, { useState } from 'react';
import { useAgro } from '@/context/AgroContext';
import { Product } from '@/data/initialData';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  AlertCircle,
  CheckCircle,
  Eye,
  Star,
  Check,
  X,
  XOctagon,
  Image as ImageIcon
} from 'lucide-react';

export default function AdminProdutosPage() {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useAgro();

  // Estados de Busca e Modais
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Mensagens de Feedback
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Estados do Formulário
  const [formData, setFormData] = useState({
    name: '',
    category: categories[0] || 'Rações',
    brand: '',
    description: '',
    price: '',
    promoPrice: '',
    image: '',
    stock: '',
    minStock: '5',
    unit: 'Unidade',
    sku: '',
    isActive: true,
    isFeatured: false,
    isControlled: false,
    useIndication: '',
    technicalDesc: ''
  });

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: categories[0] || 'Rações',
      brand: '',
      description: '',
      price: '',
      promoPrice: '',
      image: '',
      stock: '',
      minStock: '5',
      unit: 'Unidade',
      sku: `PROD-${Date.now().toString().slice(-5)}`,
      isActive: true,
      isFeatured: false,
      isControlled: false,
      useIndication: '',
      technicalDesc: ''
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      brand: product.brand,
      description: product.description,
      price: product.price.toString(),
      promoPrice: product.promoPrice ? product.promoPrice.toString() : '',
      image: product.image,
      stock: product.stock.toString(),
      minStock: product.minStock.toString(),
      unit: product.unit,
      sku: product.sku,
      isActive: product.isActive,
      isFeatured: product.isFeatured,
      isControlled: product.isControlled,
      useIndication: product.useIndication,
      technicalDesc: product.technicalDesc
    });
    setIsFormOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validações básicas
    const priceNum = parseFloat(formData.price);
    const stockNum = parseInt(formData.stock);
    const minStockNum = parseInt(formData.minStock);
    const promoPriceNum = formData.promoPrice ? parseFloat(formData.promoPrice) : null;

    if (isNaN(priceNum) || priceNum <= 0) {
      showToast('O preço deve ser maior que zero.', 'error');
      return;
    }
    if (isNaN(stockNum) || stockNum < 0) {
      showToast('O estoque não pode ser negativo.', 'error');
      return;
    }

    const imageLink = formData.image || 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500&auto=format&fit=crop&q=60';

    if (editingProduct) {
      // Atualizando produto existente
      const updated: Product = {
        ...editingProduct,
        name: formData.name,
        category: formData.category,
        brand: formData.brand,
        description: formData.description,
        price: priceNum,
        promoPrice: promoPriceNum,
        image: imageLink,
        stock: stockNum,
        minStock: minStockNum,
        unit: formData.unit,
        sku: formData.sku,
        isActive: formData.isActive,
        isFeatured: formData.isFeatured,
        isControlled: formData.isControlled,
        useIndication: formData.useIndication,
        technicalDesc: formData.technicalDesc
      };
      updateProduct(updated);
      showToast('Produto atualizado com sucesso!');
    } else {
      // Criando novo produto
      addProduct({
        name: formData.name,
        category: formData.category,
        brand: formData.brand,
        description: formData.description,
        price: priceNum,
        promoPrice: promoPriceNum,
        image: imageLink,
        stock: stockNum,
        minStock: minStockNum,
        unit: formData.unit,
        sku: formData.sku,
        isActive: formData.isActive,
        isFeatured: formData.isFeatured,
        isControlled: formData.isControlled,
        useIndication: formData.useIndication,
        technicalDesc: formData.technicalDesc
      });
      showToast('Produto cadastrado com sucesso!');
    }

    setIsFormOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir permanentemente este produto?')) {
      deleteProduct(id);
      showToast('Produto removido com sucesso!', 'success');
    }
  };

  // Filtrar tabela
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            Gestão de Produtos
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Cadastre novos insumos rurais, medicamentos veterinários e gerencie preços e vitrines.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-agro-green-dark hover:bg-agro-green-primary px-5 py-3 text-xs font-bold text-white shadow-md transition-all self-start"
        >
          <Plus className="h-4.5 w-4.5" /> Cadastrar Produto
        </button>
      </div>

      {/* Barra de Filtros / Busca */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex items-center">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome, marca ou SKU na tabela..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-agro-green-light focus:border-transparent text-xs bg-stone-50/50"
          />
        </div>
      </div>

      {/* Tabela de Produtos */}
      <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 font-extrabold uppercase bg-stone-50/60">
                <th className="py-4 px-4">Imagem</th>
                <th className="py-4 px-2">SKU</th>
                <th className="py-4 px-2">Produto</th>
                <th className="py-4 px-2">Categoria</th>
                <th className="py-4 px-2">Preço Base</th>
                <th className="py-4 px-2">Preço Promo</th>
                <th className="py-4 px-2">Estoque</th>
                <th className="py-4 px-2">Destaque</th>
                <th className="py-4 px-2">Status</th>
                <th className="py-4 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-stone-50/30">
                    <td className="py-3 px-4">
                      <div className="h-10 w-12 rounded-lg bg-stone-100 overflow-hidden border border-stone-150 shrink-0">
                        <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                      </div>
                    </td>
                    <td className="py-3 px-2 font-mono font-bold text-stone-600">{p.sku}</td>
                    <td className="py-3 px-2">
                      <div>
                        <p className="font-bold text-stone-900 line-clamp-1">{p.name}</p>
                        <p className="text-[10px] text-stone-400 font-semibold">{p.brand} {p.isControlled && <span className="text-red-655 font-bold ml-1">• Controlado</span>}</p>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-stone-500 font-medium">{p.category}</td>
                    <td className="py-3 px-2 font-bold text-stone-850">R$ {p.price.toFixed(2)}</td>
                    <td className="py-3 px-2 font-bold text-agro-green-dark">
                      {p.promoPrice !== null ? `R$ ${p.promoPrice.toFixed(2)}` : '-'}
                    </td>
                    <td className="py-3 px-2">
                      <span className={`font-bold ${p.stock <= p.minStock ? 'text-amber-600 font-extrabold' : 'text-stone-700'}`}>
                        {p.stock} ({p.unit.split(' ')[0]})
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      {p.isFeatured ? (
                        <Star className="h-4.5 w-4.5 fill-agro-gold text-agro-gold" />
                      ) : (
                        <span className="text-stone-300">-</span>
                      )}
                    </td>
                    <td className="py-3 px-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold border ${
                        p.isActive
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-stone-50 text-stone-400 border-stone-200'
                      }`}>
                        {p.isActive ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-500 hover:text-agro-green-dark transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 rounded-lg border border-stone-200 hover:bg-red-50 text-stone-500 hover:text-red-650 transition-colors"
                        title="Excluir"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-stone-500 font-bold">
                    Nenhum produto cadastrado com essas características.
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
          
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 sm:p-8 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-6">
              <h2 className="font-display text-xl font-bold text-stone-900">
                {editingProduct ? `Editar: ${editingProduct.name}` : 'Cadastrar Novo Produto'}
              </h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-50 hover:text-stone-600"
              >
                <X className="h-5.5 w-5.5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-xs text-stone-700">
              
              {/* Nome e Marca */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-600 mb-1">Nome do Produto *</label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ex: Ração para Bovinos Forte"
                    className="w-full border border-stone-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-agro-green-light focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-600 mb-1">Marca / Fabricante *</label>
                  <input
                    type="text"
                    required
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    placeholder="Ex: NutriCampo"
                    className="w-full border border-stone-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-agro-green-light focus:outline-none"
                  />
                </div>
              </div>

              {/* Categoria, SKU e Unidade */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-stone-600 mb-1">Categoria *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full border border-stone-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-agro-green-light focus:outline-none bg-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-stone-600 mb-1">Código SKU / Interno *</label>
                  <input
                    type="text"
                    required
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    placeholder="Ex: RAC-BOV-001"
                    className="w-full border border-stone-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-agro-green-light focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-600 mb-1">Unidade de Medida *</label>
                  <input
                    type="text"
                    required
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    placeholder="Ex: Saco 40kg, Galão 5L, Unidade"
                    className="w-full border border-stone-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-agro-green-light focus:outline-none"
                  />
                </div>
              </div>

              {/* Preços e Estoque */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block font-bold text-stone-600 mb-1">Preço Base (R$) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="120.00"
                    className="w-full border border-stone-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-agro-green-light focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-600 mb-1">Preço Promocional (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="promoPrice"
                    value={formData.promoPrice}
                    onChange={handleInputChange}
                    placeholder="Opcional"
                    className="w-full border border-stone-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-agro-green-light focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-600 mb-1">Estoque Inicial *</label>
                  <input
                    type="number"
                    required
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="10"
                    className="w-full border border-stone-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-agro-green-light focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-600 mb-1">Estoque Mínimo *</label>
                  <input
                    type="number"
                    required
                    name="minStock"
                    value={formData.minStock}
                    onChange={handleInputChange}
                    placeholder="5"
                    className="w-full border border-stone-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-agro-green-light focus:outline-none"
                  />
                </div>
              </div>

              {/* Link da Imagem */}
              <div>
                <label className="block font-bold text-stone-600 mb-1">Link da Imagem (URL)</label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://images.unsplash.com/... ou deixe em branco para imagem padrão"
                    className="w-full pl-9 pr-3 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-agro-green-light focus:outline-none"
                  />
                </div>
              </div>

              {/* Descrições */}
              <div>
                <label className="block font-bold text-stone-600 mb-1">Descrição Breve *</label>
                <textarea
                  required
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="Descrição simples para vitrine e catalogação inicial..."
                  className="w-full border border-stone-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-agro-green-light focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-600 mb-1">Indicação de Uso</label>
                  <textarea
                    name="useIndication"
                    value={formData.useIndication}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Instruções de fornecimento diário, aplicação ou manuseio..."
                    className="w-full border border-stone-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-agro-green-light focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-600 mb-1">Descrição Técnica / Níveis de Garantia</label>
                  <textarea
                    name="technicalDesc"
                    value={formData.technicalDesc}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Composição mineral, bula resumida, classes toxicológicas, etc..."
                    className="w-full border border-stone-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-agro-green-light focus:outline-none"
                  />
                </div>
              </div>

              {/* Checkboxes de Configuração */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-150">
                <label className="flex items-center gap-2 font-bold text-stone-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleCheckboxChange}
                    className="rounded text-agro-green-dark focus:ring-agro-green-light h-4 w-4"
                  />
                  <span>Produto Ativo</span>
                </label>

                <label className="flex items-center gap-2 font-bold text-stone-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleCheckboxChange}
                    className="rounded text-agro-green-dark focus:ring-agro-green-light h-4 w-4"
                  />
                  <span>Destacar Vitrine</span>
                </label>

                <label className="flex items-center gap-2 font-bold text-stone-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="isControlled"
                    checked={formData.isControlled}
                    onChange={handleCheckboxChange}
                    className="rounded text-agro-green-dark focus:ring-agro-green-light h-4 w-4"
                  />
                  <span>Venda Controlada</span>
                </label>
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
                  {editingProduct ? 'Salvar Alterações' : 'Cadastrar Produto'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
