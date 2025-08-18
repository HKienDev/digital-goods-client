import React from 'react';
import { OrderEmailProps } from '@/types/email';

export const NewOrderEmail: React.FC<OrderEmailProps> = (order) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.6, color: '#333' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1>Xin chào Quý khách!</h1>
          <p>Cảm ơn bạn đã đặt hàng tại HKZeus Nexus</p>
        </div>
        
        <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '5px', marginBottom: '20px' }}>
          <h2>Thông tin đơn hàng</h2>
          <p>Mã đơn hàng: {order.shortId}</p>
          <p>Ngày đặt: {new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
          
          <div style={{ margin: '20px 0' }}>
            <h3>Chi tiết sản phẩm</h3>
            {order.items.map((item, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>{item.name} x {item.quantity}</span>
                <span>{item.price.toLocaleString('vi-VN')}đ</span>
              </div>
            ))}
          </div>
          
          <div style={{ fontWeight: 'bold', textAlign: 'right', marginTop: '20px' }}>
            <p>Tổng tiền hàng: {order.subtotal.toLocaleString('vi-VN')}đ</p>
            {order.directDiscount > 0 && (
              <p>Giảm giá: -{order.directDiscount.toLocaleString('vi-VN')}đ</p>
            )}
            {order.couponDiscount > 0 && (
              <p>Mã giảm giá: -{order.couponDiscount.toLocaleString('vi-VN')}đ</p>
            )}
            <p>Tổng thanh toán: {order.totalPrice.toLocaleString('vi-VN')}đ</p>
          </div>
        </div>

        
        <div style={{ textAlign: 'center', marginTop: '30px', fontSize: '12px', color: '#666' }}>
          <p>© 2025 HKZeus Nexus. Tất cả các quyền được bảo lưu.</p>
          <p>Email này được gửi tự động, vui lòng không trả lời.</p>
        </div>
      </div>
    </div>
  );
}; 