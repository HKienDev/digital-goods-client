"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

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
        <h1 className="text-2xl font-bold text-green-600 mb-4">Thanh toán thành công!</h1>
        <p className="mb-6 text-gray-700">Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được thanh toán thành công qua PayOS.</p>
        <button
          onClick={handleConfirm}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold"
        >
          Xem chi tiết đơn hàng
        </button>
      </div>
    </div>
  );
}
