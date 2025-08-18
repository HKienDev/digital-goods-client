"use client";
import { useState, useCallback, useEffect } from "react";
import { Clock, Package, Home, CheckCircle } from "lucide-react";
import OrderHeader from "./orderHeader";
import DeliveryTracking from "./deliveryTracking";
import OrderTable from "./orderTable";
import { Order, OrderStatus } from "@/types/base";
import { AdminProduct } from "@/types/product";
import { toast } from "sonner";

import { fetchWithAuth } from "@/utils/fetchWithAuth";

type OrderItemProduct = AdminProduct;

// Mô tả chi tiết từng trạng thái
export const orderStatusInfo = {
  [OrderStatus.PENDING]: {
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    icon: Clock,
    nextStatus: OrderStatus.PROCESSING,
    buttonText: "Xác nhận đơn hàng",
    buttonColor: "bg-blue-500 hover:bg-blue-600",
    description: "Đơn hàng đang chờ xác nhận từ nhân viên bán hàng",
    date: "",
    time: ""
  },
  [OrderStatus.PROCESSING]: {
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    icon: Package,
    nextStatus: OrderStatus.PAID,
    buttonText: "Xác nhận đã thanh toán",
    buttonColor: "bg-purple-500 hover:bg-purple-600",
    description: "Đơn hàng đang được xử lý và chuẩn bị giao",
    date: "",
    time: ""
  },
  [OrderStatus.PAID]: {
    color: "text-green-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    icon: CheckCircle,
    nextStatus: OrderStatus.COMPLETED,
    buttonText: "Hoàn tất đơn hàng",
    buttonColor: "bg-green-500 hover:bg-green-600",
    description: "Đơn hàng đã thanh toán, chờ hoàn tất",
    date: "",
    time: ""
  },
  [OrderStatus.COMPLETED]: {
    color: "text-gray-500",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    icon: Home,
    nextStatus: null,
    buttonText: "",
    buttonColor: "",
    description: "Đơn hàng đã hoàn tất",
    date: "",
    time: ""
  },
  [OrderStatus.CANCELLED]: {
    color: "text-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    icon: Clock,
    nextStatus: null,
    buttonText: "",
    buttonColor: "",
    description: "Đơn hàng đã bị hủy",
    date: "",
    time: ""
  }
} as const;

interface OrderDetailsProps {
  order: Order;
  orderId: string;
  onStatusUpdate?: (orderId: string, status: OrderStatus) => void;
}

export default function OrderDetails({ order, orderId, onStatusUpdate }: OrderDetailsProps) {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order.status);
  const [isUpdating, setIsUpdating] = useState(false);

  // Hàm để lấy lại thông tin đơn hàng mới nhất
  const refreshOrderDetails = useCallback(async () => {
    try {
      
      const response = await fetchWithAuth<{ status: OrderStatus }>(`/api/orders/${orderId}`);
      
      
      if (response.success && response.data && typeof response.data.status === 'string') {
        setCurrentStatus(response.data.status as OrderStatus);
      } else {
        throw new Error(response.message || 'Không thể cập nhật thông tin đơn hàng');
      }
    } catch (error) {
      console.error("❌ Error refreshing order details:", error);
      toast.error("Không thể cập nhật thông tin đơn hàng");
    }
  }, [orderId]);

  useEffect(() => {
    refreshOrderDetails();
  }, [refreshOrderDetails]);

  // Hàm xử lý cập nhật trạng thái đơn hàng
  const handleUpdateStatus = (newStatus: OrderStatus) => {
    const updateStatus = async () => {
      try {
        setIsUpdating(true);
        
        const response = await fetchWithAuth(`/api/orders/${orderId}/status`, {
          method: "PUT",
          body: JSON.stringify({ status: newStatus }),
        });

        if (response.success) {
          setCurrentStatus(newStatus);
          toast.success("Cập nhật trạng thái đơn hàng thành công");
          if (onStatusUpdate) {
            onStatusUpdate(orderId, newStatus);
          }
          // Refresh order details after update
          await refreshOrderDetails();
        } else {
          toast.error(response.message || "Không thể cập nhật trạng thái đơn hàng");
        }
      } catch (error) {
        console.error("❌ Error updating order status:", error);
        toast.error("Không thể cập nhật trạng thái đơn hàng");
      } finally {
        setIsUpdating(false);
      }
    };

    updateStatus();
  };

  // Hàm xử lý hủy đơn hàng
  const handleCancelOrderStatusUpdate = (id: string, newStatus: OrderStatus) => {
    const updateStatus = async () => {
      try {
        setIsUpdating(true);
        
        const response = await fetchWithAuth(`/api/orders/${id}/status`, {
          method: "PUT",
          body: JSON.stringify({ 
            status: newStatus,
            note: "Đơn hàng đã bị hủy bởi admin"
          }),
        });

        if (response.success) {
          setCurrentStatus(newStatus);
          toast.success("Hủy đơn hàng thành công");
          if (onStatusUpdate) {
            onStatusUpdate(id, newStatus);
          }
          // Refresh order details after update
          await refreshOrderDetails();
        } else {
          toast.error(response.message || "Không thể hủy đơn hàng");
        }
      } catch (error) {
        console.error("❌ Error canceling order:", error);
        toast.error("Không thể hủy đơn hàng");
      } finally {
        setIsUpdating(false);
      }
    };

    updateStatus();
  };

  return (
    <div className="space-y-6">
      {/* Order Header */}
      <OrderHeader
        shortId={order.shortId || ""}
        customerId={order.user?.customId || "Không có dữ liệu"}
        lastUpdated={order.updatedAt ? new Date(order.updatedAt).toLocaleString("vi-VN") : "Không có dữ liệu"}
        status={currentStatus}
        paymentStatus={currentStatus === OrderStatus.COMPLETED ? "Đã thanh toán" : (order.paymentStatus === "paid" ? "Đã thanh toán" : "Chưa thanh toán")}
      />
      
      {/* Main Content Container */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden">
        {/* Delivery Tracking Section */}
        <div className="p-6 sm:p-8 border-b border-slate-100">
          <DeliveryTracking 
            status={currentStatus}
            onChangeStatus={handleUpdateStatus}
            isLoading={isUpdating}
            orderId={orderId}
            items={(order.items || []).map(item => ({
              product: {
                _id: typeof item.product === 'string' ? item.product : (item.product?._id || 'unknown'),
                name: typeof item.product === 'string' ? '' : (item.product?.name || 'Sản phẩm không xác định'),
                price: item.price,
                images: {
                  main: typeof item.product === 'string' ? '' : (item.product?.mainImage || ''),
                  sub: typeof item.product === 'string' ? [] : (item.product?.subImages || [])
                },
                isFeatured: false,
                durations: typeof item.product === 'string' ? [] : (item.product?.durations || []),
                productTypes: typeof item.product === 'string' ? [] : (item.product?.productTypes || []),
              },
              quantity: item.quantity,
              price: item.price,
              productType: item.productType,
              duration: item.duration,
            }))}
            onCancelOrder={handleCancelOrderStatusUpdate}
          />
        </div>
        
        {/* Order Items and Summary */}
        <div className="p-6 sm:p-8">
          <OrderTable 
            items={(order.items || []).map(item => {
              const productData: OrderItemProduct = typeof item.product === 'string' ? {
                _id: item.product,
                name: '',
                description: '',
                originalPrice: item.price,
                salePrice: item.price,
                mainImage: '',
                subImages: [],
                categoryId: '',
                stock: 0,
                isActive: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                brand: '',
                sku: '',
                durations: [],
                productTypes: [],
                tags: [],
                rating: 0,
                numReviews: 0,
                soldCount: 0,
                viewCount: 0,
                discountPercentage: 0,
                isOutOfStock: false,
                isLowStock: false,
                isFeatured: false,
              } : {
                _id: item.product?._id || 'unknown',
                name: item.product?.name || 'Sản phẩm không xác định',
                description: item.product?.description || '',
                originalPrice: item.product?.originalPrice ?? item.price,
                salePrice: item.product?.salePrice ?? item.price,
                mainImage: item.product?.mainImage || '',
                subImages: item.product?.subImages || [],
                categoryId: item.product?.categoryId || '',
                stock: item.product?.stock || 0,
                isActive: item.product?.isActive || true,
                createdAt: item.product?.createdAt || new Date().toISOString(),
                updatedAt: item.product?.updatedAt || new Date().toISOString(),
                brand: item.product?.brand || '',
                sku: item.product?.sku || '',
                durations: item.product?.durations || [],
                productTypes: item.product?.productTypes || [],
                tags: item.product?.tags || [],
                rating: item.product?.rating || 0,
                numReviews: item.product?.numReviews || 0,
                soldCount: item.product?.soldCount || 0,
                viewCount: item.product?.viewCount || 0,
                discountPercentage: item.product?.discountPercentage || 0,
                isOutOfStock: item.product?.isOutOfStock || false,
                isLowStock: item.product?.isLowStock || false,
                isFeatured: item.product?.isFeatured || false,
              };
              return {
                product: productData,
                quantity: item.quantity,
                price: item.price,
                productType: item.productType,
                duration: item.duration,
              };
            })}
            discount={order.directDiscount || 0}
            couponDiscount={order.couponDiscount || 0}
            couponCode={order.couponCode || ""}
            totalPrice={order.totalPrice}
            subtotal={order.subtotal}
          />
        </div>
      </div>
    </div>
  );
}