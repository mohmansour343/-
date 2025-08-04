import React, { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AdminDashboard from './components/AdminDashboard';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { OrderProvider } from './context/OrderContext';

function App() {
  const [currentPage, setCurrentPage] = useState('products');
  const [searchTerm, setSearchTerm] = useState('');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'products':
        return <ProductList searchTerm={searchTerm} />;
      case 'cart':
        return <Cart setCurrentPage={setCurrentPage} />;
      case 'checkout':
        return <Checkout setCurrentPage={setCurrentPage} />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <ProductList searchTerm={searchTerm} />;
    }
  };

  return (
    <ProductProvider>
      <CartProvider>
        <OrderProvider>
          <div className="min-h-screen bg-gray-50" dir="rtl">
            <Header
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <main>
              {renderCurrentPage()}
            </main>
            <footer className="bg-gray-800 text-white py-12 mt-16">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">متجر إلكتروني</h3>
                    <p className="text-gray-400">
                      متجرك الموثوق للتسوق الإلكتروني مع أفضل المنتجات وأسرع خدمة توصيل
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-4">روابط سريعة</h4>
                    <ul className="space-y-2 text-gray-400">
                      <li><a href="#" className="hover:text-white transition-colors">الرئيسية</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">المنتجات</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">من نحن</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">اتصل بنا</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-4">خدمة العملاء</h4>
                    <ul className="space-y-2 text-gray-400">
                      <li><a href="#" className="hover:text-white transition-colors">الدعم الفني</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">سياسة الإرجاع</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">الشحن والتوصيل</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">الأسئلة الشائعة</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-4">تواصل معنا</h4>
                    <ul className="space-y-2 text-gray-400">
                      <li>📧 info@store.com</li>
                      <li>📱 +966 50 123 4567</li>
                      <li>📍 الرياض، المملكة العربية السعودية</li>
                    </ul>
                  </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                  <p>&copy; 2024 متجر إلكتروني. جميع الحقوق محفوظة.</p>
                </div>
              </div>
            </footer>
          </div>
        </OrderProvider>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;