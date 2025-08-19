"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (orderId) {
      fetch(`/api/orders/verify/${orderId}`)
        .then(async (res) => {
          const data = await res.json();
          if (data.success) {
            setTimeout(() => {
              router.push(`/user/invoice/${orderId}`);
            }, 3000);
          } else {
            setError(data.message || "Không xác thực được trạng thái đơn hàng.");
          }
        })
        .catch(() => setError("Lỗi kết nối tới máy chủ."))
        .finally(() => setLoading(false));
    } else {
      setError("Thiếu mã đơn hàng.");
      setLoading(false);
    }
  }, [orderId, router]);

  const handleConfirm = () => {
    if (orderId) {
      router.push(`/user/invoice/${orderId}`);
    } else {
      router.push("/user");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <div className="bg-white rounded-lg shadow p-8 max-w-md w-full text-center">
        {loading ? (
          <>
            <h1 className="text-2xl font-bold text-green-600 mb-4">Đang xác thực thanh toán...</h1>
            <p className="mb-6 text-gray-700">Vui lòng chờ trong giây lát.</p>
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
            <h1 className="text-2xl font-bold text-green-600 mb-4">Thanh toán thành công!</h1>
            <p className="mb-2 text-gray-700">Đơn hàng của bạn đã được thanh toán thành công qua PayOS.</p>
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
