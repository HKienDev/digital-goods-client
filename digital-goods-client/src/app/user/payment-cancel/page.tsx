"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useOrders } from "@/hooks/useOrders";
import { toast } from "sonner";

export default function PaymentCancel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { cancelOrder } = useOrders();
  const [cancelled, setCancelled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (orderId) {
      setLoading(true);
      cancelOrder(orderId)
        .then(() => {
          setCancelled(true);
          toast.success("Đơn hàng đã được hủy thành công.");
        })
        .catch(() => {
          toast.error("Không thể hủy đơn hàng hoặc đơn đã được xử lý.");
        })
        .finally(() => setLoading(false));
    }
  }, [orderId, cancelOrder]);

  const handleConfirm = () => {
    if (orderId) {
      router.push(`/user/invoice/${orderId}`);
    } else {
      router.push("/user");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
      <div className="bg-white rounded-lg shadow p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Thanh toán thất bại hoặc bị hủy!</h1>
        <p className="mb-6 text-gray-700">
          {loading
            ? "Đang cập nhật trạng thái đơn hàng..."
            : cancelled
            ? "Đơn hàng của bạn đã được hủy. Bạn có thể kiểm tra lại đơn hàng hoặc thử đặt lại."
            : "Giao dịch của bạn chưa hoàn tất. Bạn có thể kiểm tra lại đơn hàng hoặc thử thanh toán lại."}
        </p>
        <button
          onClick={handleConfirm}
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-semibold"
          disabled={loading}
        >
          Xem chi tiết đơn hàng
        </button>
      </div>
    </div>
  );
}
