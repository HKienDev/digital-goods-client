import { NextRequest, NextResponse } from 'next/server';
import { getBackendUrl } from '@/utils/backendUrl';

export async function POST(request: NextRequest) {
  try {
    // Thử lấy data từ body trước
    let sku, duration, productType;
    
    try {
      const body = await request.json();
      ({ sku, duration, productType } = body);
    } catch {
      // Nếu không đọc được body, thử lấy từ query params
      const url = new URL(request.url);
      sku = url.searchParams.get('sku');
      duration = url.searchParams.get('duration');
      productType = url.searchParams.get('productType');
    }
    
    console.log('🛒 Cart remove request:', { sku, duration, productType });
    
    if (!sku) {
      return NextResponse.json(
        { success: false, message: 'SKU sản phẩm là bắt buộc' },
        { status: 400 }
      );
    }
    
    // Lấy token từ Authorization header
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
  
      return NextResponse.json(
        { success: false, message: 'Vui lòng đăng nhập để xóa sản phẩm khỏi giỏ hàng' },
        { status: 401 }
      );
    }
    
    // Gọi API backend để xóa sản phẩm khỏi giỏ hàng
    const apiUrl = getBackendUrl("/cart/remove");
    console.log('🌐 Calling backend API:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ sku, duration, productType })
    });
    

    
    if (!response.ok) {
      const errorData = await response.json();
  
      return NextResponse.json(
        { success: false, message: errorData.message || 'Không thể xóa sản phẩm khỏi giỏ hàng' },
        { status: response.status }
      );
    }
    
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error removing from cart:', error);
    return NextResponse.json(
      { success: false, message: 'Không thể xóa sản phẩm khỏi giỏ hàng' },
      { status: 500 }
    );
  }
} 