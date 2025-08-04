import React, { useState } from 'react';
import { Plus, Edit, Trash2, Package, ShoppingBag, Users, TrendingUp, Eye, CheckCircle, Clock, Truck, AlertCircle } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useOrders } from '../context/OrderContext';
import { Product } from '../types';

const AdminDashboard: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { orders, updateOrderStatus } = useOrders();
  const [activeTab, setActiveTab] = useState('overview');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: '',
    inStock: true
  });

  const categories = ['كتب', 'تكنولوجيا', 'إلكترونيات', 'تصوير', 'إكسسوارات'];

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...productForm,
        price: parseFloat(productForm.price)
      });
    } else {
      addProduct({
        ...productForm,
        price: parseFloat(productForm.price)
      });
    }
    
    setProductForm({
      name: '',
      price: '',
      image: '',
      description: '',
      category: '',
      inStock: true
    });
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      description: product.description,
      category: product.category,
      inStock: product.inStock
    });
    setShowProductForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      deleteProduct(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'processing': return <AlertCircle className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'في الانتظار';
      case 'processing': return 'قيد المعالجة';
      case 'shipped': return 'تم الشحن';
      case 'delivered': return 'تم التسليم';
      default: return status;
    }
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">لوحة التحكم</h1>
        <p className="text-gray-600">إدارة المتجر والمنتجات والطلبات</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">إجمالي المنتجات</p>
              <p className="text-3xl font-bold">{products.length}</p>
            </div>
            <Package className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">إجمالي الطلبات</p>
              <p className="text-3xl font-bold">{orders.length}</p>
            </div>
            <ShoppingBag className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">الطلبات المعلقة</p>
              <p className="text-3xl font-bold">{pendingOrders}</p>
            </div>
            <Clock className="w-12 h-12 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">إجمالي المبيعات</p>
              <p className="text-3xl font-bold">{totalRevenue.toFixed(0)} ر.س</p>
            </div>
            <TrendingUp className="w-12 h-12 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-lg mb-8">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'overview'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            نظرة عامة
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'products'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            إدارة المنتجات
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'orders'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            إدارة الطلبات
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">أحدث الطلبات</h3>
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">طلب #{order.id}</div>
                        <div className="text-sm text-gray-600">{order.customerInfo.name}</div>
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-blue-600">{order.total.toFixed(2)} ر.س</div>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="mr-1">{getStatusText(order.status)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">المنتجات الأكثر مبيعاً</h3>
                <div className="space-y-4">
                  {products.slice(0, 5).map((product) => (
                    <div key={product.id} className="flex items-center space-x-4 space-x-reverse p-4 bg-gray-50 rounded-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-600">{product.category}</div>
                      </div>
                      <div className="font-bold text-blue-600">{product.price} ر.س</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">إدارة المنتجات</h3>
                <button
                  onClick={() => setShowProductForm(true)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg flex items-center space-x-2 space-x-reverse transition-all duration-200 transform hover:scale-105"
                >
                  <Plus className="w-5 h-5" />
                  <span>إضافة منتج جديد</span>
                </button>
              </div>

              {showProductForm && (
                <div className="bg-gray-50 p-6 rounded-xl mb-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">
                    {editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}
                  </h4>
                  <form onSubmit={handleProductSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        اسم المنتج *
                      </label>
                      <input
                        type="text"
                        value={productForm.name}
                        onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        السعر (ر.س) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={productForm.price}
                        onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        رابط الصورة *
                      </label>
                      <input
                        type="url"
                        value={productForm.image}
                        onChange={(e) => setProductForm({...productForm, image: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://example.com/image.jpg"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الفئة *
                      </label>
                      <select
                        value={productForm.category}
                        onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">اختر الفئة</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        وصف المنتج *
                      </label>
                      <textarea
                        value={productForm.description}
                        onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="md:col-span-2 flex justify-end space-x-4 space-x-reverse">
                      <button
                        type="button"
                        onClick={() => {
                          setShowProductForm(false);
                          setEditingProduct(null);
                          setProductForm({
                            name: '',
                            price: '',
                            image: '',
                            description: '',
                            category: '',
                            inStock: true
                          });
                        }}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
                      >
                        {editingProduct ? 'تحديث المنتج' : 'إضافة المنتج'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-lg">{product.name}</h4>
                        <span className="text-blue-600 font-bold">{product.price} ر.س</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                      <p className="text-gray-700 text-sm mb-4 line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2 space-x-reverse">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {product.inStock ? 'متوفر' : 'غير متوفر'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6">إدارة الطلبات</h3>
              
              {orders.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">لا توجد طلبات بعد</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <div className="flex items-center space-x-4 space-x-reverse mb-4 lg:mb-0">
                          <div>
                            <h4 className="text-lg font-bold">طلب #{order.id}</h4>
                            <p className="text-gray-600">{new Date(order.createdAt).toLocaleDateString('ar-SA')}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 space-x-reverse">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="pending">في الانتظار</option>
                            <option value="processing">قيد المعالجة</option>
                            <option value="shipped">تم الشحن</option>
                            <option value="delivered">تم التسليم</option>
                          </select>
                          
                          <div className="text-left">
                            <div className="font-bold text-xl text-blue-600">{order.total.toFixed(2)} ر.س</div>
                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)}
                              <span className="mr-1">{getStatusText(order.status)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-bold mb-3">معلومات العميل</h5>
                          <div className="space-y-2 text-sm">
                            <p><span className="font-medium">الاسم:</span> {order.customerInfo.name}</p>
                            <p><span className="font-medium">البريد الإلكتروني:</span> {order.customerInfo.email}</p>
                            <p><span className="font-medium">الهاتف:</span> {order.customerInfo.phone}</p>
                            <p><span className="font-medium">المدينة:</span> {order.customerInfo.city}</p>
                            <p><span className="font-medium">العنوان:</span> {order.customerInfo.address}</p>
                          </div>
                        </div>

                        <div>
                          <h5 className="font-bold mb-3">المنتجات ({order.items.length})</h5>
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                                <div className="flex items-center space-x-3 space-x-reverse">
                                  <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-10 h-10 object-cover rounded"
                                  />
                                  <div>
                                    <div className="font-medium">{item.product.name}</div>
                                    <div className="text-gray-600">الكمية: {item.quantity}</div>
                                  </div>
                                </div>
                                <div className="font-medium">
                                  {(item.product.price * item.quantity).toFixed(2)} ر.س
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;