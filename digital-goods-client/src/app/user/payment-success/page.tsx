"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

type OrderData = {
  orderId?: string;
  status?: string;
  amount?: number;
};

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // PayOS trả về orderCode và status, không phải orderId
  const orderCode = searchParams.get("orderCode");
  const paymentStatus = searchParams.get("status");
  
  console.log('🔍 Payment success page - orderCode:', orderCode);
  console.log('🔍 Payment success page - paymentStatus:', paymentStatus);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  const verifyPaymentStatus = useCallback(async (orderCode: string) => {
    try {
      console.log('🔍 Verifying payment with orderCode:', orderCode);
      
      // Gọi API verify với orderCode (PayOS orderCode, không phải MongoDB orderId)
      const response = await fetch(`/api/orders/verify/${orderCode}`);
      const data = await response.json();
      
      console.log('🔍 Verify response:', data);
      
      if (data.success && data.order) {
        setOrderData(data.order);
        // Tự động redirect sau 5 giây tới trang đơn hàng
        setTimeout(() => {
          if (data.order.orderId) {
            console.log('🔍 Redirecting to invoice:', data.order.orderId);
            router.push(`/user/invoice/${data.order.orderId}`);
          } else {
            console.log('🔍 No orderId, redirecting to orders');
            router.push("/user/orders");
          }
        }, 5000);
      } else {
        setError(data.message || "Không xác thực được trạng thái đơn hàng.");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      setError("Lỗi kết nối tới máy chủ.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (orderCode) {
      verifyPaymentStatus(orderCode);
    } else {
      console.log('⚠️ No orderCode in URL, checking if this is a direct redirect');
      // Fallback: có thể đây là redirect trực tiếp từ PayOS sau khi webhook thành công
      // Redirect về trang orders để user có thể xem đơn hàng mới nhất
      setTimeout(() => {
        console.log('🔍 Redirecting to orders page as fallback');
        router.push("/user/orders");
      }, 3000);
      setLoading(false);
    }
  }, [orderCode, verifyPaymentStatus, router]);

  const handleConfirm = () => {
    if (orderData?.orderId) {
      router.push(`/user/invoice/${orderData.orderId}`);
    } else {
      router.push("/user/orders");
    }
  };

  // Xử lý case thanh toán thất bại
  if (paymentStatus === "CANCELLED" || paymentStatus === "FAILED") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
        <div className="bg-white rounded-lg shadow p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Thanh toán thất bại!</h1>
          <p className="mb-6 text-gray-700">
            Thanh toán của bạn đã bị hủy hoặc thất bại. Vui lòng thử lại.
          </p>
          <button
            onClick={() => router.push("/user")}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-semibold"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <div className="bg-white rounded-lg shadow p-8 max-w-md w-full text-center">
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-green-600 mb-4">Đang xác thực thanh toán...</h1>
            <p className="mb-6 text-gray-700">Vui lòng chờ trong giây lát.</p>
            {orderCode && (
              <p className="text-sm text-gray-500">Mã giao dịch: {orderCode}</p>
            )}
          </>
        ) : error ? (
          <>
            <h1 className="text-2xl font-bold text-red-600 mb-4">Có lỗi xảy ra!</h1>
            <p className="mb-6 text-gray-700">{error}</p>
            <button
              onClick={handleConfirm}
              className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 font-semibold"
            >
              Về trang đơn hàng
            </button>
          </>
        ) : (
          <>
            <div className="text-green-600 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-green-600 mb-4">Thanh toán thành công!</h1>
            <p className="mb-2 text-gray-700">Đơn hàng của bạn đã được thanh toán thành công qua PayOS.</p>
            {orderData && (
              <div className="mb-4 p-4 bg-gray-50 rounded">
                <p className="text-sm"><strong>Mã giao dịch:</strong> {orderCode}</p>
                <p className="text-sm"><strong>Số tiền:</strong> {orderData.amount?.toLocaleString('vi-VN')} VND</p>
                <p className="text-sm"><strong>Trạng thái:</strong> {orderData.status}</p>
              </div>
            )}
            <p className="mb-6 text-gray-700">Đang chuyển hướng tới chi tiết đơn hàng...</p>
            <button
              onClick={handleConfirm}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold"
            >
              Xem chi tiết đơn hàng
            </button>
          </>
        )}
      </div>
    </div>
  );
}