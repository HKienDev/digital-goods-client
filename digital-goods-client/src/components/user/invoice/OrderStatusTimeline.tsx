'use client';

import { Clock, Package, CheckCircle, Home } from 'lucide-react';

interface StatusHistory {
  status: string;
  updatedAt: string;
  updatedBy: string;
  note: string;
  _id: string;
}

interface OrderStatusTimelineProps {
  currentStatus: string;
  paymentStatus: string;
  paymentMethod: string;
  orderDate: Date;
  statusHistory: StatusHistory[];
}

const OrderStatusTimeline = ({
  currentStatus,
  paymentStatus,
  paymentMethod,
  orderDate,
  statusHistory
}: OrderStatusTimelineProps) => {
  // Chỉ giữ các trạng thái: pending, processing, paid, completed, cancelled
  // Xóa các trạng thái cũ và logic liên quan
  const statuses = [
    {
      status: 'pending',
      label: 'Chờ xác nhận',
      date: orderDate
    },
    {
      status: 'processing',
      label: 'Đang xử lý',
      date: null
    },
    {
      status: 'paid',
      label: 'Đã thanh toán',
      date: null
    },
    {
      status: 'completed',
      label: 'Hoàn thành',
      date: null
    },
    {
      status: 'cancelled',
      label: 'Đã hủy',
      date: null
    }
  ];

  // Cập nhật ngày cho các trạng thái từ lịch sử
  statusHistory.forEach(history => {
    // Đồng bộ trạng thái 'shipping' với 'shipped' trong statusHistory
    const statusKey = history.status === 'shipped' ? 'shipping' : history.status;
    const status = statuses.find(s => s.status === statusKey);
    if (status) {
      status.date = new Date(history.updatedAt);
    }
  });

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-500';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-yellow-500';
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Đã thanh toán';
      case 'failed':
        return 'Thanh toán thất bại';
      default:
        return 'Chờ thanh toán';
    }
  };

  const steps = [
    { key: 'pending', label: 'Chờ xác nhận', sub: 'Đơn hàng mới', icon: Clock },
    { key: 'processing', label: 'Đang xử lý', sub: 'Chuẩn bị hàng', icon: Package },
    { key: 'paid', label: 'Đã thanh toán', sub: 'Hoàn tất', icon: CheckCircle },
    { key: 'completed', label: 'Hoàn tất', sub: 'Hoàn thành', icon: Home },
  ];
  const currentIdx = steps.findIndex(s => s.key === currentStatus);

  return (
    <div className="timeline-container border-t border-b">
      {/* Timeline - Responsive */}
      <div className="relative">
        {/* Progress Bar */}
        <div className="hidden sm:block absolute top-5 left-0 right-0 h-1 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-1000 ease-in-out"
            style={{ width: `${((currentIdx + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
        {/* Status Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((step, idx) => {
            const isActive = currentIdx === idx;
            const isComplete = currentIdx > idx;
            const Icon = step.icon;
            return (
              <div key={step.key} className="flex flex-col items-center text-center">
                <div className={`relative w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-500 ${
                  isActive || isComplete ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' : 'bg-slate-100 text-slate-400'
                }`}>
                  <Icon size={24} />
                  {/* Dấu tích nhỏ cho các bước đã hoàn thành, trừ bước đầu tiên */}
                  {isComplete && idx > 0 && (
                    <CheckCircle className="absolute -top-1 -right-1 w-5 h-5 text-white bg-green-500 rounded-full" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className={`font-medium text-sm ${
                    isActive || isComplete ? 'text-slate-800' : 'text-slate-500'
                  }`}>
                    {step.label}
                  </div>
                  <div className="text-xs text-slate-400">
                    {step.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Mobile Progress Indicator */}
        <div className="sm:hidden mt-6">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Bước {currentIdx + 1}/{steps.length}</span>
            <span>{Math.round(((currentIdx + 1) / steps.length) * 100)}% hoàn thành</span>
          </div>
          <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-1000 ease-in-out"
              style={{ width: `${((currentIdx + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Payment Info - Responsive */}
      <div className="payment-info mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div className="text-center sm:text-left">
          <span className="font-medium">Phương thức thanh toán: </span>
          <span className="break-words">
            {paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng' : 'Thanh toán qua thẻ'}
          </span>
        </div>
        <div className="text-center sm:text-right">
          <span className="font-medium">Trạng thái thanh toán: </span>
          <span className={`break-words ${getPaymentStatusColor(paymentStatus)}`}>
            {getPaymentStatusText(paymentStatus)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusTimeline; 