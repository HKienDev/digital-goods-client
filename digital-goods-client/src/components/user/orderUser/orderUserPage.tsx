'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { TOKEN_CONFIG } from '@/config/token';

interface OrderItem {
  product: string;
  quantity: number;
  price: number;
  name: string;
  sku: string;
}

interface Order {
  _id: string;
  shortId: string;
  items: OrderItem[];
  totalPrice: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  isPaid: boolean;
  isDelivered: boolean;
}

export default function OrderUserPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  
  // Thêm state cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const limit = 8; // Số đơn hàng trên mỗi trang

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      
      // Lấy token từ localStorage
      const token = localStorage.getItem(TOKEN_CONFIG.ACCESS_TOKEN.STORAGE_KEY);
      
      if (!token) {
        setError('Vui lòng đăng nhập để xem đơn hàng');
        return;
      }
      
      console.log('🔍 Fetching orders with token length:', token.length);
      
      const response = await fetch(`/api/orders/my-orders?page=${currentPage}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('🔍 Response status:', response.status);
      
      const data = await response.json();
      console.log('🔍 Response data:', data);
      console.log('🔍 data.data:', data.data);
      console.log('🔍 data.data.orders:', data.data?.orders);

      if (data.success) {
        const ordersArray = data.data?.orders || [];
        console.log('🔍 Setting orders to:', ordersArray);
        setOrders(ordersArray);
        
        // Cập nhật thông tin phân trang
        if (data.data?.pagination) {
          setTotalPages(data.data.pagination.totalPages);
          setTotalOrders(data.data.pagination.totalItems);
          setHasNextPage(data.data.pagination.currentPage < data.data.pagination.totalPages);
          setHasPrevPage(data.data.pagination.currentPage > 1);
        }
      } else {
        setError(data.message || 'Không thể tải danh sách đơn hàng');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Đã có lỗi xảy ra khi tải đơn hàng');
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    } else {
      setError('Vui lòng đăng nhập để xem đơn hàng');
      setLoading(false);
    }
  }, [isAuthenticated, currentPage, activeTab, fetchOrders]);

  // Hàm chuyển trang
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'HH:mm dd/MM/yyyy', { locale: vi });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold">
            HOÀN TẤT
          </span>
        );
      case 'processing':
        return (
          <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-xs font-bold">
            ĐANG XỬ LÝ
          </span>
        );
      case 'paid':
        return (
          <span className="flex items-center gap-1 text-purple-600 bg-purple-50 px-3 py-1 rounded-full text-xs font-bold">
            ĐÃ THANH TOÁN
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full text-xs font-bold">
            CHỜ XÁC NHẬN
          </span>
        );
      case 'cancelled':
        return (
          <span className="flex items-center gap-1 text-red-600 bg-red-50 px-3 py-1 rounded-full text-xs font-bold">
            ĐÃ HỦY
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-gray-600 bg-gray-50 px-3 py-1 rounded-full text-xs font-bold">
            {status.toUpperCase()}
          </span>
        );
    }
  };

  console.log('🔍 orders type:', typeof orders, 'orders value:', orders);
  console.log('🔍 orders is array:', Array.isArray(orders));
  
  // Ensure orders is always an array
  const safeOrders = Array.isArray(orders) ? orders : [];
  console.log('🔍 safeOrders:', safeOrders);
  
  const filteredOrders = safeOrders.filter(order => {
    if (activeTab === 'all') return true;
    if (activeTab === 'processing') return order.status === 'processing';
    if (activeTab === 'completed') return order.status === 'completed';
    return true;
  });

  const handleViewOrderDetail = (orderId: string) => {
    router.push(`/user/invoice/${orderId}`);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">Đang tải danh sách đơn hàng...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Đơn hàng của bạn</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tab Navigation - Mobile Friendly */}
        <div className="flex border-b overflow-x-auto scrollbar-hide">
          <button
            className={`px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-medium text-xs sm:text-sm flex-shrink-0 whitespace-nowrap transition-colors ${
              activeTab === 'all' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('all')}
          >
            Tất cả
          </button>
          <button
            className={`px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-medium text-xs sm:text-sm flex-shrink-0 whitespace-nowrap transition-colors ${
              activeTab === 'processing' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('processing')}
          >
            Đang xử lý
          </button>
          <button
            className={`px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-medium text-xs sm:text-sm flex-shrink-0 whitespace-nowrap transition-colors ${
              activeTab === 'completed' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('completed')}
          >
            Hoàn tất
          </button>
        </div>

        {/* Mobile Card View */}
        <div className="block sm:hidden">
          {filteredOrders.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <p className="text-sm">Không có đơn hàng nào</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <div key={order._id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        #{order.shortId}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="ml-3">
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-gray-900">
                      {formatPrice(order.totalPrice)}
                    </span>
                    <button 
                      className="px-3 py-1.5 text-xs rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                      onClick={() => handleViewOrderDetail(order._id)}
                    >
                      Xem chi tiết
                    </button>
                  </div>
                  
                  {/* Order Items Preview */}
                  <div className="text-xs text-gray-500">
                    {(order.items || []).length} sản phẩm
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-3 sm:px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Mã đơn hàng</th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày đặt</th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng tiền</th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      <p className="text-sm">Không có đơn hàng nào</p>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td 
                        className="px-3 sm:px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600"
                        onClick={() => handleViewOrderDetail(order._id)}
                      >
                        #{order.shortId}
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.createdAt)}</td>
                      <td className="px-3 sm:px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatPrice(order.totalPrice)}</td>
                      <td className="px-3 sm:px-4 md:px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button 
                          className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                          onClick={() => handleViewOrderDetail(order._id)}
                        >
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination - Responsive */}
        {orders.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-t border-gray-200 gap-3 sm:gap-0">
            <div className="text-xs sm:text-sm text-gray-700 text-center sm:text-left">
              Hiển thị <span className="font-medium">{orders.length}</span> trong tổng số <span className="font-medium">{totalOrders}</span> đơn hàng
            </div>
            
            {/* Mobile Pagination */}
            <div className="flex items-center justify-center sm:hidden">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={!hasPrevPage}
                  className={`p-2 rounded-md ${
                    hasPrevPage
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft size={16} />
                </button>
                
                <span className="px-3 py-1 text-sm font-medium">
                  Trang {currentPage} / {totalPages}
                </span>
                
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={!hasNextPage}
                  className={`p-2 rounded-md ${
                    hasNextPage
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            
            {/* Desktop Pagination */}
            <div className="hidden sm:flex items-center space-x-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={!hasPrevPage}
                className={`px-3 py-1 rounded-md text-sm ${
                  hasPrevPage
                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ChevronLeft size={16} />
              </button>
              
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let page;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={!hasNextPage}
                className={`px-3 py-1 rounded-md text-sm ${
                  hasNextPage
                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}