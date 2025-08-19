import { NextRequest, NextResponse } from 'next/server';
import { callBackendAPIWithAuth } from '@/utils/apiAuth';

export async function GET(
  request: NextRequest,
  { params }: { params: { orderCode: string } }
) {
  try {
    const { orderCode } = params;
    const response = await callBackendAPIWithAuth(`/orders/verify/${orderCode}`, {
      method: 'GET',
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Không thể xác thực trạng thái đơn hàng' },
      { status: 500 }
    );
  }
}
