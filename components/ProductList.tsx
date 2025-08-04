import React, { useState } from 'react';
import { Filter, SortAsc } from 'lucide-react';
import ProductCard from './ProductCard';
import { useProducts } from '../context/ProductContext';

interface ProductListProps {
  searchTerm: string;
}

const ProductList: React.FC<ProductListProps> = ({ searchTerm }) => {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [...new Set(products.map(product => product.category))];

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || product.category === selectedCategory)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name, 'ar');
      }
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">التصفية </h3>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
            
            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  الفئة
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">جميع الفئات</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  ترتيب حسب
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="name">الاسم</option>
                  <option value="price-low">السعر: من الأقل للأعلى</option>
                  <option value="price-high">السعر: من الأعلى للأقل</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-3/4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              المنتجات ({filteredProducts.length})
            </h2>
            <div className="flex items-center space-x-2 space-x-reverse">
              <SortAsc className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-600">مرتب حسب: {
                sortBy === 'name' ? 'الاسم' :
                sortBy === 'price-low' ? 'السعر: الأقل أولاً' :
                'السعر: الأعلى أولاً'
              }</span>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 text-lg mb-4">
                لا توجد منتجات مطابقة للبحث
              </div>
              <p className="text-gray-500">
                جرب البحث بكلمات مختلفة أو تغيير الفئة
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;