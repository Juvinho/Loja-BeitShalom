import React from 'react';
import { Instagram, Youtube, Facebook, Mail, Phone, MapPin, CreditCard, Send } from 'lucide-react';

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateStore: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateHome, onNavigateStore }) => {
  return (
    <footer className="bg-brand-card border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Institutional Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
               <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-900 to-brand-accent flex items-center justify-center border border-brand-accent/50">
                  <span className="text-white text-xs font-bold">BS</span>
               </div>
               <span className="text-xl font-bold text-white">Beit Shalom</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Uma comunidade acolhedora dedicada ao estudo das escrituras, conectando as palavras eternas à vida moderna.
            </p>
            <div className="text-sm text-gray-400 space-y-2 pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 text-brand-accent" />
                <span>Av. Oswaldo Ferro, 5420, Res. São Jerônimo<br/>Franca - SP, 14412-382</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-accent" />
                <span>(16) 99454-7023</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-accent" />
                <span>contato@sinagogabeitshalom.com</span>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                CNPJ: 17.214.357/0001-75
              </div>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-brand-accent">
              Institucional
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><button onClick={onNavigateHome} className="hover:text-brand-accent transition-colors text-left">Sobre Nós</button></li>
              <li><button onClick={onNavigateStore} className="hover:text-brand-accent transition-colors text-left">Nossa Loja</button></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Fale Conosco</a></li>
            </ul>
          </div>

          {/* Payment & Social */}
          <div>
            <h4 className="text-white font-bold mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-brand-accent">
              Pagamento & Social
            </h4>
            
            <div className="mb-6">
              <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Redes Sociais</h5>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/sinagogabeitshalom" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-accent hover:text-brand-dark transition-all duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.youtube.com/@BeitShalom-0" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-accent hover:text-brand-dark transition-all duration-300">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="https://www.facebook.com/p/Sinagoga-Beit-Shalom-100091560291158/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-accent hover:text-brand-dark transition-all duration-300">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Formas de Pagamento</h5>
              <div className="flex flex-wrap gap-2">
                <div className="bg-white/5 px-3 py-2 rounded flex items-center gap-2 text-xs text-gray-300 border border-white/10" title="Cartão de Crédito">
                  <CreditCard className="w-4 h-4" /> Cartão
                </div>
                <div className="bg-white/5 px-3 py-2 rounded flex items-center gap-2 text-xs text-gray-300 border border-white/10" title="PIX">
                  <span className="font-bold text-brand-accent">❖</span> PIX
                </div>
                <div className="bg-white/5 px-3 py-2 rounded flex items-center gap-2 text-xs text-gray-300 border border-white/10" title="Boleto">
                  <span className="font-bold">|||</span> Boleto
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-brand-accent">
              Newsletter
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Receba novidades, estudos e ofertas exclusivas diretamente no seu e-mail.
            </p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                className="bg-brand-dark border border-white/10 rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all placeholder:text-gray-600"
              />
              <button 
                type="submit"
                className="bg-brand-accent hover:bg-cyan-400 text-brand-dark font-bold py-3 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
              >
                Inscrever-se <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Beit Shalom. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-accent transition-colors">Privacidade</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
