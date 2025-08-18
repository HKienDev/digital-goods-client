"use client";

import { useState, useCallback, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/admin/customers/details/header";
import CustomerInfo from "@/components/admin/customers/details/customerInfo";
import MembershipTier from "@/components/admin/customers/details/membershipTier";
import OrderList from "@/components/admin/customers/details/orderList";
import ResetPasswordModal from "@/components/admin/customers/details/resetPasswordModal";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { Order } from "@/types/order";
import { useAuth } from "@/context/authContext";
import { 
  Customer, 
} from "@/types";
import { 
  User, 
  Calendar, 
  ShoppingBag, 
  TrendingUp, 
  AlertCircle,
  ArrowLeft,
  RefreshCw
} from "lucide-react";

export default function CustomerDetail() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [customerOrders, setCustomerOrders] = useState<Order[]>([]);
  const [customerError, setCustomerError] = useState<string | null>(null);
  const { user, isAuthenticated, loading } = useAuth();

  // Hàm chuyển đổi ID từ định dạng URL sang MongoDB ID
  const getMongoIdFromUrlId = (urlId: string) => {
    // Nếu ID đã là MongoDB ID hợp lệ, trả về luôn
    if (/^[0-9a-fA-F]{24}$/.test(urlId)) {
      return urlId;
    }
    
    // Nếu ID có định dạng VJUSPORTUSER-, trả về nguyên ID
    if (urlId.startsWith('VJUSPORTUSER-')) {
      return urlId;
    }
    
    // Nếu không phải cả hai trường hợp trên, trả về null
    return null;
  };

  // Fetch customer data
  const fetchCustomerData = useCallback(async () => {
    try {
      setIsLoading(true);
      setCustomerError(null);

      const mongoId = getMongoIdFromUrlId(params.id as string);

      // Lấy thông tin khách hàng
      const userResponse = await fetchWithAuth(`/admin/users/${mongoId}`);
      if (!userResponse.success) {
        throw new Error(userResponse.message || "Không thể tải thông tin khách hàng");
      }
      const customerData = userResponse.data as Customer;
      setCustomer(customerData);

      try {
        // Lấy lịch sử đơn hàng - tìm theo cả userId và phone
        let allOrders: Order[] = [];
        
        console.log("Customer data:", customerData);
        console.log("Searching orders for userId:", customerData._id);
        console.log("Searching orders for phone:", customerData.phone);
        
        // Tìm theo userId
        const ordersByUserIdResponse = await fetchWithAuth(`/orders?userId=${customerData._id}`);
        console.log("Orders by userId response:", ordersByUserIdResponse);
        if (ordersByUserIdResponse.success) {
          const userIdOrders = ordersByUserIdResponse.data as Order[];
          allOrders = [...allOrders, ...userIdOrders];
          console.log("Orders found by userId:", userIdOrders.length);
        }
        
        // Tìm theo phone - tìm tất cả đơn hàng có số điện thoại này
        const ordersByPhoneResponse = await fetchWithAuth(`/orders/phone/${customerData.phone}`);
        console.log("Orders by phone response:", ordersByPhoneResponse);
        if (ordersByPhoneResponse.success) {
          const phoneOrders = ordersByPhoneResponse.data as Order[];
          console.log("Orders found by phone:", phoneOrders.length);
          // Loại bỏ trùng lặp dựa trên _id
          const existingIds = new Set(allOrders.map(order => order._id));
          const uniquePhoneOrders = phoneOrders.filter(order => !existingIds.has(order._id));
          allOrders = [...allOrders, ...uniquePhoneOrders];
        }
        
        // Sắp xếp theo ngày tạo mới nhất
        allOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        
        console.log("Total orders found:", allOrders.length);
        setCustomerOrders(allOrders);
      } catch (orderError) {
        console.error("Lỗi khi tải danh sách đơn hàng:", orderError);
        // Không throw error, chỉ log và để danh sách đơn hàng trống
        setCustomerOrders([]);
      }
    } catch (error) {
      console.error("Lỗi khi tải thông tin:", error);
      setCustomerError(error instanceof Error ? error.message : "Có lỗi xảy ra khi tải thông tin");
    } finally {
      setIsLoading(false);
    }
  }, [params.id]);

  // Fetch initial data
  useEffect(() => {
    fetchCustomerData();
  }, [fetchCustomerData]);

  // Tính toán stats
  const getCustomerStats = () => {
    if (!customer || !customerOrders) return null;

    // Tính tất cả đơn hàng đã thanh toán (không chỉ đơn đã giao hàng)
    const paidOrders = customerOrders.filter(order => 
      order.status === 'paid' || 
      order.status === 'completed' || 
      order.paymentStatus === 'paid'
    );
    
    const totalOrders = paidOrders.length; // Tính tất cả đơn đã thanh toán
    const totalSpent = paidOrders.reduce((sum, order) => sum + order.totalPrice, 0); // Tính tổng đơn đã thanh toán
    const completedOrders = customerOrders.filter(order => order.status === 'completed').length; // Chỉ đơn đã hoàn tất
    const averageOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;

    return {
      totalOrders,
      totalSpent,
      completedOrders,
      averageOrderValue
    };
  };

  if (!loading && (!isAuthenticated || user?.role !== 'admin')) {
    router.push('/admin/login');
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Loading Header */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-6 bg-slate-200 rounded-lg animate-pulse mb-2 w-48"></div>
                  <div className="h-4 bg-slate-200 rounded-lg animate-pulse w-32"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Loading Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="space-y-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-12 bg-slate-200 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-8 bg-slate-200 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-rose-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Không tìm thấy khách hàng</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Thông tin khách hàng không tồn tại hoặc đã bị xóa. Vui lòng kiểm tra lại đường dẫn.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => router.push('/admin/customers')}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 font-medium flex items-center gap-2 justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại danh sách
            </button>
            <button
              onClick={() => fetchCustomerData()}
              className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all duration-200 font-medium flex items-center gap-2 justify-center"
            >
              <RefreshCw className="w-4 h-4" />
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stats = getCustomerStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {customerError ? (
          <div className="bg-white rounded-2xl shadow-sm border border-rose-200 p-8 text-center">
            <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-rose-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Có lỗi xảy ra</h3>
            <p className="text-slate-600 mb-6">{customerError}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => fetchCustomerData()}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 font-medium flex items-center gap-2 justify-center"
              >
                <RefreshCw className="w-4 h-4" />
                Thử lại
              </button>
              <button
                onClick={() => router.push('/admin/customers')}
                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all duration-200 font-medium flex items-center gap-2 justify-center"
              >
                <ArrowLeft className="w-4 h-4" />
                Quay lại
              </button>
            </div>
          </div>
        ) : (
          <>
            <Header
              onUpdate={() => {}}
              onDelete={() => {}}
              onResetPassword={() => setIsResetPasswordModalOpen(true)}
              isUpdating={false}
            />
            
            {/* Customer Stats */}
            {stats && (
              <div className="mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-600">Tổng đơn hàng</p>
                        <p className="text-2xl font-bold text-slate-800">{stats.totalOrders}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-600">Tổng chi tiêu</p>
                        <p className="text-2xl font-bold text-slate-800">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(stats.totalSpent)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-600">Đơn hoàn thành</p>
                        <p className="text-2xl font-bold text-slate-800">{stats.completedOrders}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-600">Giá trị TB</p>
                        <p className="text-2xl font-bold text-slate-800">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(stats.averageOrderValue)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              <div className="lg:col-span-2">
                <CustomerInfo customer={{
                  id: customer._id,
                  name: customer.fullname,
                  avatar: customer.avatar,
                  phone: customer.phone,
                }} />
              </div>
              
              <div className="lg:col-span-2">
                <MembershipTier
                  totalSpent={customer.totalSpent || 0}
                />
              </div>
            </div>

            <OrderList orders={customerOrders} />

            <ResetPasswordModal
              isOpen={isResetPasswordModalOpen}
              onClose={() => setIsResetPasswordModalOpen(false)}
              onSubmit={() => {}}
              customerName={customer?.fullname || "Khách hàng"}
            />
          </>
        )}
      </div>
    </div>
  );
}