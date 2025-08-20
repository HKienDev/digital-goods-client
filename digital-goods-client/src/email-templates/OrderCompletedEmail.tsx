import React from 'react';

interface OrderCompletedEmailProps {
  orderData: {
    shortId: string;
    completedAt: string;
    totalPrice: number;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
      image?: string;
    }>;
    customerName: string;
    customerEmail: string;
    deliveryAddress?: string;
    trackingNumber?: string;
  };
}

const OrderCompletedEmail: React.FC<OrderCompletedEmailProps> = ({ orderData }) => {
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

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#ffffff', padding: '40px 20px', textAlign: 'center', borderBottom: '3px solid #10b981' }}>
        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px' }}>
          HKZNX
        </div>
        <div style={{ fontSize: '18px', color: '#6b7280', marginBottom: '20px' }}>
          Đơn hàng đã hoàn tất
        </div>
        <div style={{ 
          display: 'inline-block', 
          padding: '12px 24px', 
          backgroundColor: '#10b981', 
          color: 'white', 
          borderRadius: '8px', 
          fontSize: '16px', 
          fontWeight: 'bold' 
        }}>
          🎉 Hoàn tất thành công!
        </div>
      </div>

      {/* Main Content */}
      <div style={{ backgroundColor: '#ffffff', padding: '40px 20px' }}>
        {/* Greeting */}
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '28px', color: '#1f2937', marginBottom: '15px' }}>
            🎊 Chúc mừng {orderData.customerName}!
          </h1>
          <p style={{ fontSize: '18px', color: '#6b7280', lineHeight: '1.6' }}>
            Đơn hàng của bạn đã được giao thành công và hoàn tất.
          </p>
          <p style={{ fontSize: '16px', color: '#10b981', fontWeight: 'bold', marginTop: '10px' }}>
            Cảm ơn bạn đã tin tưởng và mua sản phẩm của chúng tôi!
          </p>
        </div>

        {/* Order Info */}
        <div style={{ 
          backgroundColor: '#f0fdf4', 
          padding: '24px', 
          borderRadius: '12px', 
          marginBottom: '30px',
          border: '2px solid #bbf7d0'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '22px', color: '#166534', marginBottom: '8px' }}>
                Đơn hàng #{orderData.shortId}
              </h2>
              <p style={{ fontSize: '14px', color: '#16a34a' }}>
                Hoàn tất lúc: {formatDate(orderData.completedAt)}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '26px', fontWeight: 'bold', color: '#166534' }}>
                {formatPrice(orderData.totalPrice)}
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          {orderData.deliveryAddress && (
            <div style={{ 
              backgroundColor: '#ffffff', 
              padding: '16px', 
              borderRadius: '8px', 
              marginBottom: '16px',
              border: '1px solid #bbf7d0'
            }}>
              <div style={{ fontSize: '14px', color: '#166534', marginBottom: '8px' }}>
                <strong>📍 Địa chỉ giao hàng:</strong>
              </div>
              <div style={{ fontSize: '16px', color: '#166534' }}>
                {orderData.deliveryAddress}
              </div>
            </div>
          )}

          {orderData.trackingNumber && (
            <div style={{ 
              backgroundColor: '#ffffff', 
              padding: '16px', 
              borderRadius: '8px',
              border: '1px solid #bbf7d0'
            }}>
              <div style={{ fontSize: '14px', color: '#166534', marginBottom: '8px' }}>
                <strong>📦 Mã theo dõi:</strong>
              </div>
              <div style={{ fontSize: '16px', color: '#166534', fontWeight: 'bold' }}>
                {orderData.trackingNumber}
              </div>
            </div>
          )}
        </div>

        {/* Order Items */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '20px', color: '#1f2937', marginBottom: '20px', textAlign: 'center' }}>
            📦 Sản phẩm đã nhận
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
                  backgroundColor: '#f0fdf4', 
                  borderRadius: '12px', 
                  marginRight: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  border: '2px solid #bbf7d0'
                }}>
                  ✅
                </div>
                <div style={{ flex: '1' }}>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '6px' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    Số lượng: {item.quantity}
                  </div>
                </div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#166534' }}>
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
            🎯 Bước tiếp theo
          </h3>
          <div style={{ fontSize: '16px', color: '#92400e', lineHeight: '1.8' }}>
            <div style={{ marginBottom: '16px' }}>
              💬 <strong>Đánh giá sản phẩm:</strong> Chia sẻ trải nghiệm của bạn để giúp chúng tôi cải thiện dịch vụ
            </div>
            <div style={{ marginBottom: '16px' }}>
              🔄 <strong>Mua thêm:</strong> Khám phá các sản phẩm khác tại website của chúng tôi
            </div>
            <div style={{ marginBottom: '16px' }}>
              📧 <strong>Liên hệ:</strong> Nếu có vấn đề gì, đừng ngần ngại liên hệ với chúng tôi
            </div>
            <div>
              ⭐ <strong>Đánh giá dịch vụ:</strong> Hãy cho chúng tôi biết về trải nghiệm mua sắm của bạn
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div style={{ 
          backgroundColor: '#1f2937', 
          padding: '30px', 
          borderRadius: '16px',
          textAlign: 'center',
          marginTop: '30px'
        }}>
          <h3 style={{ fontSize: '20px', color: '#ffffff', marginBottom: '15px' }}>
            🛒 Mua sắm thêm
          </h3>
          <p style={{ fontSize: '16px', color: '#9ca3af', marginBottom: '20px' }}>
            Khám phá các sản phẩm mới và ưu đãi hấp dẫn
          </p>
          <div style={{ 
            display: 'inline-block', 
            padding: '12px 30px', 
            backgroundColor: '#ef4444', 
            color: 'white', 
            borderRadius: '8px', 
            fontSize: '16px', 
            fontWeight: 'bold',
            textDecoration: 'none'
          }}>
            Xem sản phẩm mới
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: '#1f2937', padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', marginBottom: '15px' }}>
          HKZNX
        </div>
        <div style={{ fontSize: '16px', color: '#9ca3af', marginBottom: '25px' }}>
          Cảm ơn bạn đã tin tưởng và ủng hộ chúng tôi
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

export default OrderCompletedEmail;
