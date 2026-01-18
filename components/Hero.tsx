import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="relative bg-brand-card overflow-hidden">
      {/* Background Graphic Elements */}
      <div className="absolute inset-0 z-0">
         {/* Gradient imitating the banner */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-accent/20"></div>
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute left-1/2 bottom-0 w-full h-1/2 bg-gradient-to-t from-brand-dark to-transparent"></div>
        
        {/* Geometric Lines */}
        <div className="absolute right-0 top-0 h-full w-1/3 border-l border-white/5 skew-x-12 opacity-20"></div>
        <div className="absolute right-20 top-0 h-full w-1/3 border-l border-white/5 skew-x-12 opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col items-start justify-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-semibold uppercase tracking-wider mb-6">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
          Nova Coleção 2025/5786
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
          Um Projeto Nascido no <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-blue-400">
            Coração do Eterno
          </span>
        </h1>
        
        <p className="max-w-xl text-lg text-gray-400 mb-8 leading-relaxed">
          Explore recursos, livros e artefatos que conectam você às raízes da fé. 
          Aprofunde seus estudos e apoie a comunidade Beit Shalom.
        </p>

        <div className="flex flex-wrap gap-4">
          <button className="px-8 py-3 bg-brand-accent hover:bg-cyan-500 text-brand-dark font-bold rounded-lg shadow-[0_0_20px_rgba(0,180,216,0.3)] transition-all transform hover:-translate-y-1">
            Ver Coleção
          </button>
          <button className="px-8 py-3 bg-transparent border border-gray-600 text-white hover:border-brand-accent hover:text-brand-accent font-medium rounded-lg transition-all">
            Participar da Comunidade
          </button>
        </div>
      </div>
    </div>
  );
};