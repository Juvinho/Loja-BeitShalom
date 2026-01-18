import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize the client
// IMPORTANT: The API key is injected via the environment variable process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getChatResponse = async (
  history: { role: string; text: string }[],
  newMessage: string
): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';

    // Construct a context-aware prompt
    const systemInstruction = `
      Você é o "Assistente Shalom", um guia prestativo e conhecedor da "Loja Beit Shalom".
      A loja vende artigos religiosos judaicos, livros e cursos educacionais.
      Tom: Respeitoso, acolhedor, espiritual, mas moderno e prestativo.
      Idioma: Português do Brasil.
      
      Se perguntarem sobre produtos, sugira itens genéricos como "Bíblias de Estudo", "Menorás", "Kipás" ou "Cursos de Hebraico".
      Se perguntarem sobre fé, responda brevemente e respeitosamente com uma perspectiva judaico-messiânica (baseada no tema do canal).
      Mantenha as respostas concisas (menos de 100 palavras), pois este é um chat widget.
    `;

    // Combine history into a conversation format for the model
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: systemInstruction,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }],
      })),
    });

    const result: GenerateContentResponse = await chat.sendMessage({ message: newMessage });
    
    return result.text || "Shalom! Estou com dificuldades para conectar agora. Por favor, tente novamente.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Peço desculpas, mas não consigo processar sua solicitação no momento.";
  }
};