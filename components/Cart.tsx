import React from 'react';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartProps {
  setCurrentPage: (page: string) => void;
}

const Cart: React.FC<CartProps> = ({ setCurrentPage }) => {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">السلة فارغة</h2>
          <p className="text-gray-600 mb-8">لم تقم بإضافة أي منتجات إلى السلة بعد</p>
          <button
            onClick={() => setCurrentPage('products')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            تسوق الآن
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <button
          onClick={() => setCurrentPage('products')}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowRight className="w-5 h-5 ml-2" />
          العودة للتسوق
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">سلة التسوق</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {state.items.map((item) => (
                <div key={item.product.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {item.product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {item.product.category}
                      </p>
                      <div className="text-xl font-bold text-blue-600">
                        {item.product.price} ر.س
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="text-lg font-bold text-gray-800">
                      {(item.product.price * item.quantity).toFixed(2)} ر.س
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-2 rounded-full hover:bg-red-100 text-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <h3 className="text-xl font-bold text-gray-800 mb-6">ملخص الطلب</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">المجموع الفرعي</span>
                <span className="font-medium">{state.total.toFixed(2)} ر.س</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">الشحن</span>
                <span className="font-medium">مجاني</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">الضريبة</span>
                <span className="font-medium">{(state.total * 0.15).toFixed(2)} ر.س</span>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>المجموع الكلي</span>
                  <span className="text-blue-600">
                    {(state.total * 1.15).toFixed(2)} ر.س
                  </span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setCurrentPage('checkout')}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              إكمال الطلب
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;