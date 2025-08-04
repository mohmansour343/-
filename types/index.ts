export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  };
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}