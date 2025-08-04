import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            متوفر
          </span>
        </div>
        <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors">
          <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
        </button>
      </div>
      
      <div className="p-6">
        <div className="mb-2">
          <span className="text-sm text-blue-600 font-medium">{product.category}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">
            {product.price} ر.س
          </div>
          
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg flex items-center space-x-2 space-x-reverse transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>أضف للسلة</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;