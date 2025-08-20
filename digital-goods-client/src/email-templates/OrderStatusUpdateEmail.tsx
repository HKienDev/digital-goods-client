import React from 'react';

interface OrderStatusUpdateEmailProps {
  orderData: {
    shortId: string;
    status: string;
    statusText: string;
    previousStatus?: string;
    previousStatusText?: string;
    updatedAt: string;
    totalPrice: number;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
      image?: string;
    }>;
    customerName: string;
    customerEmail: string;
    note?: string;
  };
}

const OrderStatusUpdateEmail: React.FC<OrderStatusUpdateEmailProps> = ({ orderData }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'paid':
        return 'bg-purple-500';
      case 'processing':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'paid':
        return '💳';
      case 'processing':
        return '⚙️';
      case 'pending':
        return '⏳';
      case 'cancelled':
        return '❌';
      default:
        return '📋';
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#ffffff', padding: '40px 20px', textAlign: 'center', borderBottom: '3px solid #ef4444' }}>
        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px' }}>
          HKZNX
        </div>
        <div style={{ fontSize: '18px', color: '#6b7280', marginBottom: '20px' }}>
          Cập nhật trạng thái đơn hàng
        </div>
        <div style={{ 
          display: 'inline-block', 
          padding: '12px 24px', 
          backgroundColor: getStatusColor(orderData.status), 
          color: 'white', 
          borderRadius: '8px', 
          fontSize: '16px', 
          fontWeight: 'bold' 
        }}>
          {getStatusIcon(orderData.status)} {orderData.statusText}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ backgroundColor: '#ffffff', padding: '40px 20px' }}>
        {/* Greeting */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '24px', color: '#1f2937', marginBottom: '10px' }}>
            Xin chào {orderData.customerName}!
          </h1>
          <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: '1.6' }}>
            Đơn hàng của bạn đã được cập nhật trạng thái. Dưới đây là thông tin chi tiết:
          </p>
        </div>

        {/* Order Info */}
        <div style={{ 
          backgroundColor: '#f9fafb', 
          padding: '24px', 
          borderRadius: '12px', 
          marginBottom: '30px',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '20px', color: '#1f2937', marginBottom: '5px' }}>
                Đơn hàng #{orderData.shortId}
              </h2>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>
                Cập nhật lúc: {formatDate(orderData.updatedAt)}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
                {formatPrice(orderData.totalPrice)}
              </div>
            </div>
          </div>

          {/* Status Change */}
          {orderData.previousStatus && (
            <div style={{ 
              backgroundColor: '#fef3c7', 
              padding: '16px', 
              borderRadius: '8px', 
              marginBottom: '20px',
              border: '1px solid #f59e0b'
            }}>
              <div style={{ fontSize: '14px', color: '#92400e', marginBottom: '8px' }}>
                <strong>Thay đổi trạng thái:</strong>
              </div>
              <div style={{ fontSize: '16px', color: '#92400e' }}>
                {orderData.previousStatusText} → {orderData.statusText}
              </div>
            </div>
          )}

          {/* Note */}
          {orderData.note && (
            <div style={{ 
              backgroundColor: '#dbeafe', 
              padding: '16px', 
              borderRadius: '8px',
              border: '1px solid #3b82f6'
            }}>
              <div style={{ fontSize: '14px', color: '#1e40af', marginBottom: '8px' }}>
                <strong>Ghi chú:</strong>
              </div>
              <div style={{ fontSize: '16px', color: '#1e40af' }}>
                {orderData.note}
              </div>
            </div>
          )}
        </div>

        {/* Order Items */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '18px', color: '#1f2937', marginBottom: '20px' }}>
            Chi tiết sản phẩm
          </h3>
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            {orderData.items.map((item, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '16px', 
                borderBottom: index < orderData.items.length - 1 ? '1px solid #e5e7eb' : 'none',
                backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb'
              }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  backgroundColor: '#f3f4f6', 
                  borderRadius: '8px', 
                  marginRight: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px'
                }}>
                  📦
                </div>
                <div style={{ flex: '1' }}>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', marginBottom: '4px' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    Số lượng: {item.quantity}
                  </div>
                </div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937' }}>
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div style={{ 
          backgroundColor: '#f0fdf4', 
          padding: '24px', 
          borderRadius: '12px',
          border: '1px solid #bbf7d0'
        }}>
          <h3 style={{ fontSize: '18px', color: '#166534', marginBottom: '16px' }}>
            Bước tiếp theo
          </h3>
          {orderData.status === 'completed' && (
            <div style={{ fontSize: '16px', color: '#166534', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '12px' }}>
                🎉 <strong>Đơn hàng đã hoàn tất!</strong> Cảm ơn bạn đã mua sản phẩm của chúng tôi.
              </p>
              <p style={{ marginBottom: '12px' }}>
                💬 Hãy chia sẻ trải nghiệm của bạn bằng cách đánh giá sản phẩm.
              </p>
              <p>
                🔄 Bạn có thể mua thêm sản phẩm khác tại website của chúng tôi.
              </p>
            </div>
          )}
          {orderData.status === 'paid' && (
            <div style={{ fontSize: '16px', color: '#166534', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '12px' }}>
                💳 <strong>Thanh toán thành công!</strong> Đơn hàng của bạn đã được xác nhận thanh toán.
              </p>
              <p>
                ⏳ Chúng tôi sẽ xử lý và giao hàng trong thời gian sớm nhất.
              </p>
            </div>
          )}
          {orderData.status === 'processing' && (
            <div style={{ fontSize: '16px', color: '#166534', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '12px' }}>
                ⚙️ <strong>Đang xử lý!</strong> Đơn hàng của bạn đang được chuẩn bị.
              </p>
              <p>
                📦 Chúng tôi sẽ thông báo khi đơn hàng được giao.
              </p>
            </div>
          )}
          {orderData.status === 'cancelled' && (
            <div style={{ fontSize: '16px', color: '#166534', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '12px' }}>
                ❌ <strong>Đơn hàng đã bị hủy.</strong>
              </p>
              <p>
                📞 Nếu bạn có thắc mắc, vui lòng liên hệ với chúng tôi.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: '#1f2937', padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', marginBottom: '10px' }}>
          HKZNX
        </div>
        <div style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '20px' }}>
          Cảm ơn bạn đã tin tưởng chúng tôi
        </div>
        <div style={{ fontSize: '12px', color: '#6b7280' }}>
          <p style={{ marginBottom: '8px' }}>
            📧 {orderData.customerEmail}
          </p>
          <p style={{ marginBottom: '8px' }}>
            🌐 www.hkzeusvn.com
          </p>
          <p>
            📞 Hotline: 1900-xxxx
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusUpdateEmail;
