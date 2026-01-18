import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onClick }) => {
  const ratingValue = product.rating ?? 4.8;
  const ratingCount = product.ratingCount ?? 12;

  return (
    <div
      onClick={onClick}
      className={`group relative bg-gradient-to-b from-white/5 via-brand-card/80 to-brand-card border border-white/5 rounded-2xl overflow-hidden hover:border-brand-accent/60 hover:shadow-[0_18px_45px_rgba(0,0,0,0.65)] transition-all duration-300 flex flex-col h-full ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500">
        <div className="absolute -inset-32 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.15),_transparent_55%)]" />
      </div>

      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.12em] bg-brand-accent text-brand-dark shadow-md">
          Destaque
        </span>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-black/40 text-gray-200 border border-white/10 backdrop-blur-sm">
          {product.category}
        </span>
      </div>

      <div className="relative aspect-square overflow-hidden bg-gray-900">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="absolute bottom-4 right-4 bg-brand-accent text-brand-dark p-3 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.6)] opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-white"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="p-5 flex-1 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-white text-base sm:text-lg font-semibold leading-snug group-hover:text-brand-accent transition-colors line-clamp-2">
            {product.name}
          </h3>
          <div className="flex flex-col items-end text-right">
            <span className="text-[11px] text-yellow-300 font-semibold leading-none">
              {ratingValue.toFixed(1)}★
            </span>
            <span className="text-[10px] text-gray-500">
              {ratingCount}+ avaliações
            </span>
          </div>
        </div>

        <p className="text-gray-400 text-xs sm:text-sm line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 mb-0.5">A partir de</span>
            <span className="text-xl font-bold text-white tracking-tight">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
            <span className="text-[11px] text-gray-500">
              em até 12x sem juros
            </span>
          </div>
          <div className="flex flex-col items-end text-right text-[11px] text-emerald-300">
            <span className="uppercase tracking-[0.14em] font-semibold">
              Entrega segura
            </span>
            <span className="text-gray-400">
              Calcule o frete no carrinho
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
