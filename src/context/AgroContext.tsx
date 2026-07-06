'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Client,
  Order,
  StockMovement,
  Service,
  INITIAL_PRODUCTS,
  INITIAL_CLIENTS,
  INITIAL_ORDERS,
  INITIAL_STOCK_HISTORY,
  INITIAL_SERVICES,
  INITIAL_CATEGORIES
} from '../data/initialData';

interface CartItem {
  product: Product;
  quantity: number;
}

interface AgroContextType {
  products: Product[];
  categories: string[];
  clients: Client[];
  orders: Order[];
  stockHistory: StockMovement[];
  services: Service[];
  cart: CartItem[];
  
  // Produtos CRUD
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  // Clientes CRUD
  addClient: (client: Omit<Client, 'id' | 'createdAt'>) => Client;
  updateClient: (client: Client) => void;
  deleteClient: (id: string) => void;

  // Pedidos CRUD
  addOrder: (orderData: {
    clientId: string;
    clientName: string;
    items: { productId: string; name: string; price: number; quantity: number; unit: string }[];
    totalValue: number;
    deliveryMethod: 'retirada' | 'entrega';
    deliveryAddress: string;
    originChannel: 'whatsapp' | 'web' | 'balcao';
    internalNotes: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: Order['status'], notes?: string) => void;
  deleteOrder: (id: string) => void;

  // Carrinho
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Controle de Estoque
  adjustStock: (productId: string, type: 'entrada' | 'saida', quantity: number, reason: string) => void;
}

const AgroContext = createContext<AgroContextType | undefined>(undefined);

export const AgroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories] = useState<string[]>(INITIAL_CATEGORIES);
  const [clients, setClients] = useState<Client[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stockHistory, setStockHistory] = useState<StockMovement[]>([]);
  const [services] = useState<Service[]>(INITIAL_SERVICES);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carregar dados iniciais do localStorage ou do initialData
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedProducts = localStorage.getItem('agro_products');
      const storedClients = localStorage.getItem('agro_clients');
      const storedOrders = localStorage.getItem('agro_orders');
      const storedStock = localStorage.getItem('agro_stock_history');
      const storedCart = localStorage.getItem('agro_cart');

      setProducts(storedProducts ? JSON.parse(storedProducts) : INITIAL_PRODUCTS);
      setClients(storedClients ? JSON.parse(storedClients) : INITIAL_CLIENTS);
      setOrders(storedOrders ? JSON.parse(storedOrders) : INITIAL_ORDERS);
      setStockHistory(storedStock ? JSON.parse(storedStock) : INITIAL_STOCK_HISTORY);
      setCart(storedCart ? JSON.parse(storedCart) : []);
      
      setIsLoaded(true);
    }
  }, []);

  // Salvar no localStorage sempre que os estados mudarem
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('agro_products', JSON.stringify(products));
    }
  }, [products, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('agro_clients', JSON.stringify(clients));
    }
  }, [clients, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('agro_orders', JSON.stringify(orders));
    }
  }, [orders, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('agro_stock_history', JSON.stringify(stockHistory));
    }
  }, [stockHistory, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('agro_cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  // --- PRODUTOS ---
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`
    };
    setProducts((prev) => [newProduct, ...prev]);

    // Registrar movimentação de entrada inicial de estoque se for > 0
    if (newProduct.stock > 0) {
      const movement: StockMovement = {
        id: `mov-${Date.now()}`,
        productId: newProduct.id,
        productName: newProduct.name,
        type: 'entrada',
        quantity: newProduct.stock,
        reason: 'Cadastro inicial de produto',
        createdAt: new Date().toISOString()
      };
      setStockHistory((prev) => [movement, ...prev]);
    }
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === updatedProduct.id ? updatedProduct : prod))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((prod) => prod.id !== id));
  };

  // --- CLIENTES ---
  const addClient = (clientData: Omit<Client, 'id' | 'createdAt'>): Client => {
    const newClient: Client = {
      ...clientData,
      id: `cli-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setClients((prev) => [newClient, ...prev]);
    return newClient;
  };

  const updateClient = (updatedClient: Client) => {
    setClients((prev) =>
      prev.map((cli) => (cli.id === updatedClient.id ? updatedClient : cli))
    );
  };

  const deleteClient = (id: string) => {
    setClients((prev) => prev.filter((cli) => cli.id !== id));
  };

  // --- PEDIDOS ---
  const addOrder = (orderData: {
    clientId: string;
    clientName: string;
    items: { productId: string; name: string; price: number; quantity: number; unit: string }[];
    totalValue: number;
    deliveryMethod: 'retirada' | 'entrega';
    deliveryAddress: string;
    originChannel: 'whatsapp' | 'web' | 'balcao';
    internalNotes: string;
  }): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `AD-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'novo',
      createdAt: new Date().toISOString()
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Reduzir estoque dos produtos correspondentes e registrar saídas
    orderData.items.forEach((item) => {
      adjustStock(item.productId, 'saida', item.quantity, `Venda via Pedido ${newOrder.id}`);
    });

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status'], notes?: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            status,
            internalNotes: notes !== undefined ? notes : order.internalNotes
          };
        }
        return order;
      })
    );
  };

  const deleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  // --- CARRINHO ---
  const addToCart = (product: Product, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // --- AJUSTE DE ESTOQUE ---
  const adjustStock = (productId: string, type: 'entrada' | 'saida', quantity: number, reason: string) => {
    // 1. Atualizar quantidade de estoque do produto
    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id === productId) {
          const newStock = type === 'entrada' ? prod.stock + quantity : Math.max(0, prod.stock - quantity);
          return { ...prod, stock: newStock };
        }
        return prod;
      })
    );

    // 2. Registrar no histórico de movimentações
    const targetProduct = products.find((p) => p.id === productId);
    const newMovement: StockMovement = {
      id: `mov-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      productId,
      productName: targetProduct ? targetProduct.name : 'Produto Desconhecido',
      type,
      quantity,
      reason,
      createdAt: new Date().toISOString()
    };
    setStockHistory((prev) => [newMovement, ...prev]);
  };

  return (
    <AgroContext.Provider
      value={{
        products,
        categories,
        clients,
        orders,
        stockHistory,
        services,
        cart,
        addProduct,
        updateProduct,
        deleteProduct,
        addClient,
        updateClient,
        deleteClient,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        adjustStock
      }}
    >
      {children}
    </AgroContext.Provider>
  );
};

export const useAgro = () => {
  const context = useContext(AgroContext);
  if (context === undefined) {
    throw new Error('useAgro must be used within an AgroProvider');
  }
  return context;
};
