import React, { useState } from 'react';
import { ArrowRight, CreditCard, Truck, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';

interface CheckoutProps {
  setCurrentPage: (page: string) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ setCurrentPage }) => {
  const { state, dispatch } = useCart();
  const { addOrder } = useOrders();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'card'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitOrder = async () => {
    setIsProcessing(true);
    
    // محاكاة معالجة الطلب
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const order = {
      items: state.items,
      total: state.total * 1.15,
      customerInfo: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city
      },
      status: 'pending' as const
    };
    
    addOrder(order);
    dispatch({ type: 'CLEAR_CART' });
    setIsProcessing(false);
    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">تم تأكيد طلبك!</h2>
          <p className="text-gray-600 mb-8">
            سيتم التواصل معك قريباً لتأكيد تفاصيل الشحن
          </p>
          <button
            onClick={() => setCurrentPage('products')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            متابعة التسوق
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <button
          onClick={() => setCurrentPage('cart')}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowRight className="w-5 h-5 ml-2" />
          العودة للسلة
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <h3 className="text-xl font-bold">معلومات الشحن</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الاسم الكامل *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  البريد الإلكتروني *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رقم الهاتف *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المدينة *
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">اختر المدينة</option>
                  <option value="الرياض">الرياض</option>
                  <option value="جدة">جدة</option>
                  <option value="الدمام">الدمام</option>
                  <option value="مكة المكرمة">مكة المكرمة</option>
                  <option value="المدينة المنورة">المدينة المنورة</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  العنوان التفصيلي *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="الحي، الشارع، رقم المبنى"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <h3 className="text-xl font-bold">طريقة الدفع</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleInputChange}
                  className="ml-3"
                />
                <CreditCard className="w-6 h-6 text-blue-600 ml-3" />
                <div>
                  <div className="font-medium">بطاقة ائتمانية</div>
                  <div className="text-sm text-gray-600">فيزا، ماستركارد، مادا</div>
                </div>
              </div>
              
              <div className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleInputChange}
                  className="ml-3"
                />
                <Truck className="w-6 h-6 text-green-600 ml-3" />
                <div>
                  <div className="font-medium">الدفع عند الاستلام</div>
                  <div className="text-sm text-gray-600">ادفع نقداً عند وصول الطلب</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <h3 className="text-xl font-bold text-gray-800 mb-6">ملخص الطلب</h3>
            
            <div className="space-y-4 mb-6">
              {state.items.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-3 space-x-reverse">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{item.product.name}</div>
                    <div className="text-gray-600 text-xs">الكمية: {item.quantity}</div>
                  </div>
                  <div className="font-medium">
                    {(item.product.price * item.quantity).toFixed(2)} ر.س
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">المجموع الفرعي</span>
                <span>{state.total.toFixed(2)} ر.س</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">الشحن</span>
                <span>مجاني</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">الضريبة (15%)</span>
                <span>{(state.total * 0.15).toFixed(2)} ر.س</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-2 border-t">
                <span>المجموع الكلي</span>
                <span className="text-blue-600">{(state.total * 1.15).toFixed(2)} ر.س</span>
              </div>
            </div>
            
            <button
              onClick={handleSubmitOrder}
              disabled={!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || isProcessing}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg"
            >
              {isProcessing ? 'جاري المعالجة...' : 'تأكيد الطلب'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;