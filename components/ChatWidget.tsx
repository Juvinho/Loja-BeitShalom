import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Loader2, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { getChatResponse } from '../services/geminiService';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Shalom! Bem-vindo à Loja Beit Shalom. Como posso ajudar em seus estudos hoje?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Prepare history for API
    const history = messages.map(m => ({ role: m.role, text: m.text }));
    
    // Call Gemini Service
    const responseText = await getChatResponse(history, userMsg.text);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText, timestamp: new Date() }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-brand-card border border-brand-accent/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-dark to-[#004e92] p-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="bg-brand-accent/20 p-1.5 rounded-full">
                <Sparkles className="w-4 h-4 text-brand-accent" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Assistente Shalom</h3>
                <p className="text-xs text-brand-accent/80">IA Integrada</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-brand-dark/90">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-brand-accent text-brand-dark rounded-br-none font-medium' 
                      : 'bg-white/10 text-gray-100 rounded-bl-none border border-white/5'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 rounded-2xl rounded-bl-none px-4 py-2 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-brand-accent" />
                  <span className="text-xs text-gray-400">Pensando...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-brand-card border-t border-white/10">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pergunte sobre tradições ou itens..."
                className="w-full bg-black/20 text-white border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/50 placeholder-gray-500"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-accent/10 hover:bg-brand-accent text-brand-accent hover:text-brand-dark p-1.5 rounded-full transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-brand-accent"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-brand-accent to-blue-500 rounded-full shadow-[0_0_20px_rgba(0,180,216,0.4)] hover:scale-110 transition-transform duration-200"
      >
        {isOpen ? <X className="w-7 h-7 text-white" /> : <MessageCircle className="w-7 h-7 text-white" />}
      </button>
    </div>
  );
};