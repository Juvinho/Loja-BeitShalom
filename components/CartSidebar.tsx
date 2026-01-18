import React, { useState } from 'react';
import { X, Trash2, ChevronRight, Bookmark, Truck, Percent } from 'lucide-react';
import { CartItem } from '../types';
import { calculateShipping, ShippingQuote } from '../services/melhorEnvioService';
import { createCheckoutPreference } from '../services/mercadoPagoCheckout';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (id: number) => void;
  savedItems: CartItem[];
  onMoveToSaved: (id: number) => void;
  onMoveToCart: (id: number) => void;
  onCheckout: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({
  isOpen,
  onClose,
  cart,
  onRemove,
  savedItems,
  onMoveToSaved,
  onMoveToCart,
  onCheckout
}) => {
  const [cep, setCep] = useState('');
  const [cepError, setCepError] = useState('');
  const [shippingOptions, setShippingOptions] = useState<ShippingQuote[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<ShippingQuote | null>(null);
  const [isLoadingShipping, setIsLoadingShipping] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountValue = (total * discountPercent) / 100;
  const shippingValue = selectedShipping?.price ?? 0;
  const finalTotal = total - discountValue + shippingValue;

  const handleCalcShipping = async () => {
    if (!cep || cep.length < 8) return;

    setIsLoadingShipping(true);
    setShippingOptions([]);
    setSelectedShipping(null);
    setCepError('');
    
    try {
      const viaCepResponse = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!viaCepResponse.ok) {
        setCepError('Não foi possível validar o CEP. Tente novamente.');
        return;
      }

      const viaCepData = await viaCepResponse.json();
      if (viaCepData.erro) {
        setCep('');
        setCepError('CEP não encontrado. Verifique e tente novamente.');
        return;
      }

      const options = await calculateShipping(cep, cart);
      setShippingOptions(options);
      if (options.length > 0) {
        setSelectedShipping(options[0]); // Select cheapest/first by default
      }
    } catch (error) {
      console.error("Failed to calculate shipping", error);
      setCepError('Não foi possível calcular o frete. Tente novamente.');
    } finally {
      setIsLoadingShipping(false);
    }
  };

  const handleCepChange = (value: string) => {
    const onlyDigits = value.replace(/\D/g, '');
    setCep(onlyDigits);
    if (cepError) {
      setCepError('');
    }
  };

  const handleCepBlur = () => {
    if (!cep) {
      setCepError('');
      setShippingOptions([]);
      setSelectedShipping(null);
      return;
    }

    if (cep.length === 8) {
      setCepError('');
      handleCalcShipping();
      return;
    }

    setCep('');
    setShippingOptions([]);
    setSelectedShipping(null);
    setCepError('Por favor, insira um CEP válido com 8 dígitos.');
  };

  const handleApplyCoupon = () => {
    const normalized = coupon.trim().toUpperCase();
    if (normalized === 'SHALOM10') {
      setDiscountPercent(10);
    } else if (normalized === 'FRETEGRATIS') {
      setDiscountPercent(0);
      // setShippingPrice(0); // TODO: Implement free shipping logic with new structure
      alert("Cupom de frete grátis em manutenção. Tente SHALOM10 para 10% de desconto.");
    } else {
      setDiscountPercent(0);
    }
  };

  const handleCheckoutClick = async () => {
    try {
      if (cart.length === 0) {
        return;
      }
      const { init_point } = await createCheckoutPreference(cart, shippingValue);
      window.location.href = init_point;
    } catch (error) {
      console.error('Erro ao iniciar checkout Mercado Pago', error);
      alert('Não foi possível iniciar o pagamento. Tente novamente em instantes.');
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 max-w-sm w-full bg-brand-card bg-[#0F172A] border-l border-white/10 shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-brand-dark/50">
          <h2 className="text-xl font-bold text-white">Seu Carrinho</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                <X className="w-8 h-8 opacity-50" />
              </div>
              <p>Seu carrinho está vazio.</p>
              <button onClick={onClose} className="text-brand-accent hover:underline">Começar a Comprar</button>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-900 border border-white/10 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium line-clamp-1">{item.name}</h4>
                    <p className="text-sm text-gray-400 mb-2">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-brand-accent bg-brand-accent/10 px-2 py-1 rounded">
                        Qtd: {item.quantity}
                      </span>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-gray-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => onMoveToSaved(item.id)}
                      className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-brand-accent transition-colors"
                    >
                      <Bookmark className="w-3 h-3" />
                      Salvar para depois
                    </button>
                  </div>
                </div>
              ))}

              {savedItems.length > 0 && (
                <div className="mt-8 border-t border-white/10 pt-4">
                  <h3 className="text-sm font-semibold text-white mb-3">
                    Salvos para depois
                  </h3>
                  <div className="space-y-3">
                    {savedItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-900 border border-white/10 shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="text-xs text-white line-clamp-1">{item.name}</h4>
                            <span className="text-xs text-gray-400">
                              R$ {item.price.toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => onMoveToCart(item.id)}
                          className="text-xs text-brand-accent hover:underline"
                        >
                          Mover para o carrinho
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-brand-dark/50">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400 uppercase tracking-wide">
                  Progresso da compra
                </span>
                <span className="text-xs text-brand-accent font-semibold">
                  Carrinho 1/4
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-1/4 bg-gradient-to-r from-brand-accent to-cyan-400" />
              </div>
            </div>

            <div className="mb-4 space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Truck className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-white">Calcular frete</span>
                </div>
                <div className="flex gap-2">
                  <input
                    value={cep}
                    onChange={(e) => handleCepChange(e.target.value)}
                    onBlur={handleCepBlur}
                    placeholder="Digite seu CEP"
                    className="flex-1 bg-brand-card border border-white/15 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
                  />
                </div>
                {isLoadingShipping && !cepError && (
                  <p className="text-xs text-brand-accent mt-1">
                    Calculando frete, aguarde...
                  </p>
                )}
                {cepError && (
                  <p className="text-xs text-red-400 mt-1">
                    {cepError}
                  </p>
                )}
                {shippingOptions.length > 0 && (
                  <div className="bg-brand-dark/50 p-3 rounded-lg space-y-2 mt-2">
                    <p className="text-sm text-gray-400">Opções de Frete:</p>
                    {shippingOptions.map((opt, idx) => (
                      <div 
                        key={idx}
                        onClick={() => setSelectedShipping(opt)}
                        className={`p-2 rounded border cursor-pointer flex justify-between items-center transition-colors ${selectedShipping === opt ? 'border-brand-accent bg-brand-accent/10' : 'border-white/10 hover:bg-white/5'}`}
                      >
                        <div>
                            <p className="text-white text-sm font-medium">{opt.serviceName}</p>
                            <p className="text-xs text-gray-400">{opt.days} dias úteis</p>
                        </div>
                        <p className="text-white font-bold">R$ {opt.price.toFixed(2).replace('.', ',')}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Percent className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-white">Cupom de desconto</span>
                </div>
                <div className="flex gap-2">
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Cupom"
                    className="flex-1 bg-brand-card border border-white/15 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent min-w-0"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-brand-accent text-brand-dark font-bold px-4 py-2 rounded-lg hover:bg-cyan-400 transition-colors whitespace-nowrap"
                  >
                    Aplicar
                  </button>
                </div>
                {discountPercent > 0 && (
                  <p className="text-xs text-green-400 mt-1">
                    Desconto aplicado: {discountPercent}% (- R$ {discountValue.toFixed(2).replace('.', ',')})
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1 mb-4">
              <div className="flex items-center justify-between text-sm text-gray-300">
                <span>Subtotal</span>
                <span>R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
              {selectedShipping && (
                <div className="flex items-center justify-between text-sm text-gray-300">
                  <span>Frete ({selectedShipping.serviceName})</span>
                  <span>R$ {shippingValue.toFixed(2).replace('.', ',')}</span>
                </div>
              )}
              {discountPercent > 0 && (
                <div className="flex items-center justify-between text-sm text-green-400">
                  <span>Desconto</span>
                  <span>- R$ {discountValue.toFixed(2).replace('.', ',')}</span>
                </div>
              )}
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm text-gray-300">Total</span>
                <span className="text-2xl font-bold text-white">
                  R$ {finalTotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckoutClick}
              className="w-full bg-brand-accent hover:bg-cyan-500 text-brand-dark font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              Finalizar Compra <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
