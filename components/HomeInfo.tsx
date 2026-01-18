import React from 'react';
import { ChevronRight, BookOpen, Heart, Users } from 'lucide-react';
import { Logo } from './Logo';

interface HomeInfoProps {
  onEnterStore: () => void;
}

export const HomeInfo: React.FC<HomeInfoProps> = ({ onEnterStore }) => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero / Intro Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-brand-dark">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-brand-accent/5 blur-[120px] rounded-full"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-8">
             <Logo className="w-24 h-24 md:w-32 md:h-32" />
          </div>
          
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Uma Jornada de <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-blue-500">
              Retorno às Origens
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            A Beit Shalom nasceu do desejo profundo de reconectar a fé com suas raízes hebraicas, 
            trazendo luz, entendimento e restauração para as famílias.
          </p>

          <button 
            onClick={onEnterStore}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-accent hover:bg-cyan-400 text-brand-dark font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_25px_rgba(0,180,216,0.4)]"
          >
            Acesse Nossa Loja
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* History Section */}
      <section className="py-24 bg-brand-card relative">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
             <div className="absolute -inset-4 bg-brand-accent/20 rounded-xl blur-lg"></div>
             <img 
               src="https://images.unsplash.com/photo-1490122417551-6ee9691429d2?q=80&w=2070&auto=format&fit=crop" 
               alt="Torah Scroll" 
               className="relative rounded-xl shadow-2xl border border-white/10"
             />
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <BookOpen className="text-brand-accent" />
              Como Tudo Começou
            </h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                Tudo começou com uma pequena sala de estudos e uma câmera. O que era apenas um desejo de compartilhar 
                descobertas sobre as Escrituras cresceu e se tornou uma comunidade global.
              </p>
              <p>
                Nosso canal surgiu para preencher uma lacuna: a necessidade de um ensino sério, 
                profundo e acessível sobre a herança judaica da fé messiânica.
              </p>
              <p>
                Hoje, somos milhares de pessoas unidas pelo mesmo propósito: aprender, crescer e 
                viver os princípios eternos do Eterno em nosso dia a dia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Nossos Pilares</h2>
            <div className="h-1 w-20 bg-brand-accent mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: BookOpen, 
                title: "Ensino Profundo", 
                desc: "Compromisso inegociável com a verdade das Escrituras e o contexto histórico." 
              },
              { 
                icon: Heart, 
                title: "Amor ao Próximo", 
                desc: "Acreditamos que o conhecimento sem amor é vazio. Acolhemos a todos." 
              },
              { 
                icon: Users, 
                title: "Comunidade", 
                desc: "Não caminhamos sozinhos. Somos uma família espalhada pelas nações." 
              }
            ].map((item, i) => (
              <div key={i} className="bg-brand-card p-8 rounded-2xl border border-white/5 hover:border-brand-accent/30 transition-colors text-center">
                <div className="w-16 h-16 mx-auto bg-brand-dark rounded-full flex items-center justify-center mb-6 border border-brand-accent/20">
                  <item.icon className="w-8 h-8 text-brand-accent" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-32 bg-gradient-to-b from-brand-card to-black text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">Faça Parte Desta História</h2>
          <p className="text-gray-400 text-lg mb-10">
            Adquirindo nossos materiais, você não apenas enriquece seu conhecimento, 
            mas também sustenta este projeto para que ele alcance mais vidas.
          </p>
          <button 
            onClick={onEnterStore}
            className="px-10 py-5 bg-brand-accent hover:bg-white hover:text-brand-dark text-brand-dark font-bold text-xl rounded-lg transition-all duration-300 shadow-[0_0_30px_rgba(0,180,216,0.2)]"
          >
            Visitar a Loja Oficial
          </button>
        </div>
      </section>
    </div>
  );
};