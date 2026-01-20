export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  images?: string[];
  detailedDescription?: string;
  specifications?: { label: string; value: string }[];
  dimensions?: {
    width: number; // cm
    height: number; // cm
    length: number; // cm
    weight: number; // kg
  };
  rating?: number;
  ratingCount?: number;
  isDigital?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
