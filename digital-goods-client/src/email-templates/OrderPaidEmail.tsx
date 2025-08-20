import React from 'react';

interface OrderPaidEmailProps {
  orderData: {
    shortId: string;
    paidAt: string;
    totalPrice: number;
    paymentMethod: string;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
      image?: string;
    }>;
    customerName: string;
    customerEmail: string;
    transactionId?: string;
  };
}

const OrderPaidEmail: React.FC<OrderPaidEmailProps> = ({ orderData }) => {
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

  const getPaymentMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case 'payos':
        return '💳';
      case 'vnpay':
        return '🏦';
      case 'momo':
        return '📱';
      case 'zalopay':
        return '📱';
      default:
        return '💳';
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#ffffff', padding: '40px 20px', textAlign: 'center', borderBottom: '3px solid #8b5cf6' }}>
        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px' }}>
          HKZNX
        </div>
        <div style={{ fontSize: '18px', color: '#6b7280', marginBottom: '20px' }}>
          Thanh toán thành công
        </div>
        <div style={{ 
          display: 'inline-block', 
          padding: '12px 24px', 
          backgroundColor: '#8b5cf6', 
          color: 'white', 
          borderRadius: '8px', 
          fontSize: '16px', 
          fontWeight: 'bold' 
        }}>
          💳 Thanh toán thành công!
        </div>
      </div>

      {/* Main Content */}
      <div style={{ backgroundColor: '#ffffff', padding: '40px 20px' }}>
        {/* Greeting */}
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '26px', color: '#1f2937', marginBottom: '15px' }}>
            🎉 Cảm ơn {orderData.customerName}!
          </h1>
          <p style={{ fontSize: '18px', color: '#6b7280', lineHeight: '1.6' }}>
            Thanh toán đơn hàng của bạn đã được xác nhận thành công.
          </p>
          <p style={{ fontSize: '16px', color: '#8b5cf6', fontWeight: 'bold', marginTop: '10px' }}>
            Chúng tôi sẽ xử lý đơn hàng trong thời gian sớm nhất!
          </p>
        </div>

        {/* Payment Info */}
        <div style={{ 
          backgroundColor: '#faf5ff', 
          padding: '24px', 
          borderRadius: '12px', 
          marginBottom: '30px',
          border: '2px solid #c4b5fd'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '22px', color: '#581c87', marginBottom: '8px' }}>
                Đơn hàng #{orderData.shortId}
              </h2>
              <p style={{ fontSize: '14px', color: '#7c3aed' }}>
                Thanh toán lúc: {formatDate(orderData.paidAt)}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '26px', fontWeight: 'bold', color: '#581c87' }}>
                {formatPrice(orderData.totalPrice)}
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div style={{ 
            backgroundColor: '#ffffff', 
            padding: '16px', 
            borderRadius: '8px', 
            marginBottom: '16px',
            border: '1px solid #c4b5fd'
          }}>
            <div style={{ fontSize: '14px', color: '#581c87', marginBottom: '8px' }}>
              <strong>💳 Phương thức thanh toán:</strong>
            </div>
            <div style={{ fontSize: '16px', color: '#581c87', fontWeight: 'bold' }}>
              {getPaymentMethodIcon(orderData.paymentMethod)} {orderData.paymentMethod.toUpperCase()}
            </div>
          </div>

          {/* Transaction ID */}
          {orderData.transactionId && (
            <div style={{ 
              backgroundColor: '#ffffff', 
              padding: '16px', 
              borderRadius: '8px',
              border: '1px solid #c4b5fd'
            }}>
              <div style={{ fontSize: '14px', color: '#581c87', marginBottom: '8px' }}>
                <strong>🔢 Mã giao dịch:</strong>
              </div>
              <div style={{ fontSize: '16px', color: '#581c87', fontWeight: 'bold', fontFamily: 'monospace' }}>
                {orderData.transactionId}
              </div>
            </div>
          )}
        </div>

        {/* Order Items */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '20px', color: '#1f2937', marginBottom: '20px', textAlign: 'center' }}>
            📦 Sản phẩm đã đặt
          </h3>
          <div style={{ border: '2px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
            {orderData.items.map((item, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '20px', 
                borderBottom: index < orderData.items.length - 1 ? '1px solid #e5e7eb' : 'none',
                backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb'
              }}>
                <div style={{ 
                  width: '70px', 
                  height: '70px', 
                  backgroundColor: '#faf5ff', 
                  borderRadius: '12px', 
                  marginRight: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  border: '2px solid #c4b5fd'
                }}>
                  📦
                </div>
                <div style={{ flex: '1' }}>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '6px' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    Số lượng: {item.quantity}
                  </div>
                </div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#581c87' }}>
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div style={{ 
          backgroundColor: '#fef3c7', 
          padding: '30px', 
          borderRadius: '16px',
          border: '2px solid #f59e0b',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '22px', color: '#92400e', marginBottom: '20px' }}>
            ⏳ Bước tiếp theo
          </h3>
          <div style={{ fontSize: '16px', color: '#92400e', lineHeight: '1.8' }}>
            <div style={{ marginBottom: '16px' }}>
              ⚙️ <strong>Đang xử lý:</strong> Đơn hàng của bạn đang được chuẩn bị và đóng gói
            </div>
            <div style={{ marginBottom: '16px' }}>
              📦 <strong>Giao hàng:</strong> Chúng tôi sẽ thông báo khi đơn hàng được giao
            </div>
            <div style={{ marginBottom: '16px' }}>
              📱 <strong>Theo dõi:</strong> Bạn có thể theo dõi trạng thái đơn hàng tại trang cá nhân
            </div>
            <div>
              📞 <strong>Hỗ trợ:</strong> Nếu có thắc mắc, vui lòng liên hệ với chúng tôi
            </div>
          </div>
        </div>

        {/* Order Tracking */}
        <div style={{ 
          backgroundColor: '#dbeafe', 
          padding: '24px', 
          borderRadius: '12px',
          border: '1px solid #3b82f6',
          marginTop: '30px',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '20px', color: '#1e40af', marginBottom: '15px' }}>
            📋 Theo dõi đơn hàng
          </h3>
          <p style={{ fontSize: '16px', color: '#1e40af', marginBottom: '20px' }}>
            Bạn có thể theo dõi trạng thái đơn hàng tại trang cá nhân của mình
          </p>
          <div style={{ 
            display: 'inline-block', 
            padding: '12px 30px', 
            backgroundColor: '#3b82f6', 
            color: 'white', 
            borderRadius: '8px', 
            fontSize: '16px', 
            fontWeight: 'bold',
            textDecoration: 'none'
          }}>
            Xem đơn hàng
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: '#1f2937', padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', marginBottom: '15px' }}>
          HKZNX
        </div>
        <div style={{ fontSize: '16px', color: '#9ca3af', marginBottom: '25px' }}>
          Cảm ơn bạn đã tin tưởng chúng tôi
        </div>
        <div style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6' }}>
          <p style={{ marginBottom: '8px' }}>
            📧 {orderData.customerEmail}
          </p>
          <p style={{ marginBottom: '8px' }}>
            🌐 www.hkzeusvn.com
          </p>
          <p style={{ marginBottom: '8px' }}>
            📞 Hotline: 1900-xxxx
          </p>
          <p style={{ marginTop: '20px', fontSize: '12px', color: '#4b5563' }}>
            © 2024 HKZNX. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderPaidEmail;
