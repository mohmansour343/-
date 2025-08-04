import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | null>(null);

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'كتاب البرمجة المتقدمة',
    price: 85,
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'كتاب شامل في البرمجة المتقدمة يغطي أحدث التقنيات والممارسات',
    category: 'كتب',
    inStock: true
  },
  {
    id: '2',
    name: 'لابتوب احترافي',
    price: 2500,
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=500',
    description: 'لابتوب عالي الأداء مناسب للمطورين والمصممين',
    category: 'تكنولوجيا',
    inStock: true
  },
  {
    id: '3',
    name: 'سماعات لاسلكية',
    price: 350,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'سماعات عالية الجودة مع إلغاء الضوضاء',
    category: 'إلكترونيات',
    inStock: true
  },
  {
    id: '4',
    name: 'كاميرا رقمية',
    price: 1200,
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'كاميرا احترافية لالتقاط أجمل اللحظات',
    category: 'تصوير',
    inStock: true
  },
  {
    id: '5',
    name: 'ساعة ذكية',
    price: 450,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'ساعة ذكية مع مميزات صحية وتقنية متطورة',
    category: 'إلكترونيات',
    inStock: true
  },
  {
    id: '6',
    name: 'حقيبة جلدية',
    price: 180,
    image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'حقيبة أنيقة من الجلد الطبيعي عالي الجودة',
    category: 'إكسسوارات',
    inStock: true
  }
];

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts(initialProducts);
      }
    } else {
      setProducts(initialProducts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, productData: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...product, ...productData } : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};