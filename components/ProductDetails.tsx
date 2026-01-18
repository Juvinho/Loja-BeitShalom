import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Star, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface ProductDetailsProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onAddToCart, onBack }) => {
  const [activeImage, setActiveImage] = useState<string>(product.image);

  const galleryImages = Array.from(
    new Set([product.image, ...(product.images ?? [])].filter(Boolean))
  );

  const relatedProducts = MOCK_PRODUCTS.filter(
    p => p.id !== product.id && p.category === product.category
  ).slice(0, 4);

  const ratingValue = product.rating ?? 4.8;
  const ratingCount = product.ratingCount ?? 25;
  const fullStars = Math.round(ratingValue);

  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-gray-400 hover:text-brand-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Voltar para a Loja</span>
        </button>

        <div className="bg-brand-card border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col lg:border-r border-white/5">
              <div className="relative h-96 lg:h-[480px] bg-gray-900 overflow-hidden group">
                <img 
                  src={activeImage} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-card/80 to-transparent lg:bg-gradient-to-r pointer-events-none"></div>
                
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-brand-accent/90 text-brand-dark text-xs font-bold rounded-full uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
              </div>

              {galleryImages.length > 1 && (
                <div className="px-4 py-3 border-t border-white/10 bg-brand-dark/60 flex gap-3 overflow-x-auto">
                  {galleryImages.map((img) => (
                    <button
                      key={img}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden border transition-all ${
                        img === activeImage ? 'border-brand-accent ring-2 ring-brand-accent/40' : 'border-white/10 hover:border-brand-accent/60'
                      }`}
                    >
                      <img src={img} alt={product.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center text-brand-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < fullStars ? 'fill-current' : ''}`}
                      />
                    ))}
                    <span className="ml-2 text-gray-400 text-sm">
                      {ratingValue.toFixed(1)} ({ratingCount} avaliações)
                    </span>
                  </div>
                  <div className="h-4 w-px bg-white/10"></div>
                  <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" />
                    Compra protegida
                  </span>
                </div>

                <p className="text-gray-300 text-sm uppercase tracking-wide mb-2">
                  Vendido e entregue por Beit Shalom
                </p>

                <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 border-l-2 border-brand-accent/30 pl-4">
                  {product.detailedDescription ?? product.description}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 bg-white/5 rounded-xl border border-white/5 mb-8">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Preço à vista</p>
                    <div className="text-3xl font-bold text-white">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Em até 12x sem juros nas principais bandeiras
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => onAddToCart(product)}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-brand-accent hover:bg-white hover:text-brand-dark text-brand-dark font-bold rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(0,180,216,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Adicionar ao Carrinho
                  </button>
                </div>

                {product.specifications && product.specifications.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Especificações técnicas
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.specifications.map((spec) => (
                        <div
                          key={spec.label}
                          className="flex items-center justify-between bg-brand-dark/50 border border-white/5 rounded-lg px-3 py-2 text-sm"
                        >
                          <span className="text-gray-400">{spec.label}</span>
                          <span className="text-white font-medium ml-4">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-brand-dark/50 border border-white/5">
                    <h4 className="text-brand-accent font-semibold mb-1">Entrega rápida</h4>
                    <p className="text-xs text-gray-400">Envio em até 2 dias úteis</p>
                  </div>
                  <div className="p-4 rounded-lg bg-brand-dark/50 border border-white/5">
                    <h4 className="text-brand-accent font-semibold mb-1">Suporte dedicado</h4>
                    <p className="text-xs text-gray-400">Atendimento para dúvidas sobre o produto</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Produtos relacionados
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Clientes que se interessaram por este item também viram:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-brand-card border border-white/5 rounded-xl p-4 flex flex-col"
                >
                  <div className="w-full aspect-square rounded-lg overflow-hidden mb-3 bg-gray-900">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1 line-clamp-2">
                    {p.name}
                  </h3>
                  <p className="text-xs text-gray-400 mb-2">
                    {p.category}
                  </p>
                  <span className="text-lg font-bold text-brand-accent">
                    R$ {p.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
