import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { CartSidebar } from './components/CartSidebar';
import { ChatWidget } from './components/ChatWidget';
import { HomeInfo } from './components/HomeInfo';
import { ProductDetails } from './components/ProductDetails';
import { Footer } from './components/Footer';
import { MOCK_PRODUCTS } from './constants';
import { Product, CartItem } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'store' | 'product-details'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [savedItems, setSavedItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('beitshalom_cart');
      const storedSaved = localStorage.getItem('beitshalom_saved');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
      if (storedSaved) {
        setSavedItems(JSON.parse(storedSaved));
      }
    } catch {
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('beitshalom_cart', JSON.stringify(cart));
      localStorage.setItem('beitshalom_saved', JSON.stringify(savedItems));
    } catch {
    }
  }, [cart, savedItems]);

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleMoveToSaved = (id: number) => {
    setCart(prev => {
      const item = prev.find(p => p.id === id);
      if (!item) return prev;
      setSavedItems(current => {
        if (current.find(p => p.id === id)) return current;
        return [...current, item];
      });
      return prev.filter(p => p.id !== id);
    });
  };

  const handleMoveToCartFromSaved = (id: number) => {
    setSavedItems(prev => {
      const item = prev.find(p => p.id === id);
      if (!item) return prev;
      setCart(current => {
        const existing = current.find(c => c.id === id);
        if (existing) {
          return current.map(c =>
            c.id === id ? { ...c, quantity: c.quantity + item.quantity } : c
          );
        }
        return [...current, item];
      });
      return prev.filter(p => p.id !== id);
    });
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navigateToStore = () => {
    setCurrentPage('store');
    setSelectedProduct(null);
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    setSelectedProduct(null);
    window.scrollTo(0, 0);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-details');
    window.scrollTo(0, 0);
  };

  const handleCheckout = () => {
    setCart([]);
    setIsCartOpen(false);
    setCurrentPage('home');
    setSelectedProduct(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-brand-dark text-brand-text font-sans selection:bg-brand-accent selection:text-brand-dark">
      
      <Navbar 
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)}
        currentPage={currentPage}
        onNavigate={(page) => page === 'store' ? navigateToStore() : navigateToHome()}
      />
      
      <main>
        {currentPage === 'home' ? (
          <HomeInfo onEnterStore={navigateToStore} />
        ) : currentPage === 'product-details' && selectedProduct ? (
          <ProductDetails 
            product={selectedProduct} 
            onAddToCart={handleAddToCart}
            onBack={navigateToStore}
          />
        ) : (
          <>
            <Hero />
            
            <div className="relative">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.08),_transparent_55%)]" />

              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-white/10 pb-6" id="products">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.22em] text-brand-accent/80 uppercase mb-2">
                      Anúncios selecionados
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                      Produtos em destaque da Beit Shalom
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base max-w-xl">
                      Livros, itens rituais e cursos preparados com carinho para sua jornada espiritual.
                    </p>
                  </div>
                  <div className="mt-6 md:mt-0 flex flex-col items-start md:items-end gap-3">
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs text-gray-200">
                        Entrega para todo o Brasil com acompanhamento de rastreio
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-brand-accent text-brand-dark">
                        Todos
                      </button>
                      <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 text-gray-300 border border-white/10">
                        Livros
                      </button>
                      <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 text-gray-300 border border-white/10">
                        Itens rituais
                      </button>
                      <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 text-gray-300 border border-white/10">
                        Cursos digitais
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                  {MOCK_PRODUCTS.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={handleAddToCart} 
                      onClick={() => handleProductClick(product)}
                    />
                  ))}
                </div>

                <div className="mt-20 relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-900 via-slate-900 to-brand-dark border border-white/10 p-8 md:p-12 text-center md:text-left">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-60" />
                  <div className="relative z-10 flex flex-col md:flex-row items-center md:items-center justify-between gap-8">
                    <div className="max-w-xl">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                        Apoie a missão da Beit Shalom
                      </h2>
                      <p className="text-gray-300 text-sm md:text-base">
                        Cada recurso adquirido aqui fortalece projetos, transmissões e materiais de ensino para alcançar ainda mais vidas.
                      </p>
                    </div>
                    <button className="bg-white text-brand-dark hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-colors">
                      Fazer uma doação
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigateHome={navigateToHome} onNavigateStore={navigateToStore} />

      <CartSidebar  
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onRemove={handleRemoveFromCart}
        savedItems={savedItems}
        onMoveToSaved={handleMoveToSaved}
        onMoveToCart={handleMoveToCartFromSaved}
        onCheckout={handleCheckout}
      />
      
      <ChatWidget />
    </div>
  );
};

export default App;
