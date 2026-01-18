import React from 'react';
import { ShoppingCart, Menu } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onNavigate: (page: 'home' | 'store') => void;
  currentPage: 'home' | 'store' | 'product-details';
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick, onNavigate, currentPage }) => {
  return (
    <nav className="sticky top-0 z-50 bg-brand-dark/95 backdrop-blur-md border-b border-brand-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <Logo className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
            <div>
              <h1 className="text-xl font-bold text-white tracking-wide group-hover:text-brand-accent transition-colors">BEIT SHALOM</h1>
              <p className="text-xs text-brand-accent tracking-widest uppercase">Oficial</p>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => onNavigate('home')}
              className={`text-sm font-medium transition-colors ${currentPage === 'home' ? 'text-brand-accent' : 'text-gray-300 hover:text-brand-accent'}`}
            >
              NOSSA HISTÓRIA
            </button>
            <button 
              onClick={() => onNavigate('store')}
              className={`text-sm font-medium transition-colors ${currentPage === 'store' || currentPage === 'product-details' ? 'text-brand-accent' : 'text-gray-300 hover:text-brand-accent'}`}
            >
              LOJA
            </button>
            <a href="#" className="text-gray-300 hover:text-brand-accent transition-colors text-sm font-medium">CURSOS</a>
            <a href="#" className="text-gray-300 hover:text-brand-accent transition-colors text-sm font-medium">DOAR</a>
          </div>

          <div className="flex items-center gap-4">
            {currentPage === 'store' && (
              <button 
                onClick={onCartClick}
                className="relative text-brand-accent hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-brand-dark transform translate-x-1/4 -translate-y-1/4 bg-brand-accent rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
            
            <button className="md:hidden text-gray-300">
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};
