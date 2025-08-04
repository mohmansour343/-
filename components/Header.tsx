import React from 'react';
import { ShoppingCart, User, Search, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, searchTerm, setSearchTerm }) => {
  const { state } = useCart();
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <h1 
              className="text-2xl font-bold cursor-pointer hover:text-blue-200 transition-colors"
              onClick={() => setCurrentPage('products')}
            >
              متجر الكتروني
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
            <button
              onClick={() => setCurrentPage('products')}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentPage === 'products' 
                  ? 'bg-blue-700 text-white' 
                  : 'hover:bg-blue-700 hover:text-white'
              }`}
            >
              المنتجات
            </button>
            <button
              onClick={() => setCurrentPage('admin')}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentPage === 'admin' 
                  ? 'bg-blue-700 text-white' 
                  : 'hover:bg-blue-700 hover:text-white'
              }`}
            >
              لوحة التحكم
            </button>
          </nav>

          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="relative hidden md:block">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="ابحث عن المنتجات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-10 py-2 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 w-64"
              />
            </div>
            
            <button
              onClick={() => setCurrentPage('cart')}
              className="relative p-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -left-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            <button className="p-2 rounded-lg hover:bg-blue-700 transition-colors">
              <User className="w-6 h-6" />
            </button>

            <button className="md:hidden p-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="ابحث عن المنتجات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-2 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;