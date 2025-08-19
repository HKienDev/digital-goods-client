import { z } from "zod";

// Schema cho item trong order
const orderItemSchema = z.object({
  product: z.string().min(1, { message: 'ID sản phẩm là bắt buộc' }),
  quantity: z.number().int().min(1, { message: 'Số lượng phải lớn hơn 0' }),
  price: z.number().min(0, { message: 'Giá phải lớn hơn hoặc bằng 0' }),
  discount: z.number().min(0, { message: 'Giảm giá phải lớn hơn hoặc bằng 0' }).max(100, { message: 'Giảm giá không được vượt quá 100%' }).optional(),
  attributes: z.record(z.string(), z.any()).optional()
});

// XÓA shippingAddress khỏi schema FE
// Schema cho tạo order
export const createOrderSchema = z.object({
  user: z.string().min(1, { message: 'ID người dùng là bắt buộc' }),
  items: z.array(orderItemSchema).min(1, { message: 'Đơn hàng phải có ít nhất một sản phẩm' }),
  paymentMethod: z.enum(['payos'], { errorMap: () => ({ message: 'Phương thức thanh toán không hợp lệ' }) }),
  paymentStatus: z.enum(['pending', 'paid', 'failed', 'refunded'], { errorMap: () => ({ message: 'Trạng thái thanh toán không hợp lệ' }) }).default('pending'),
  orderStatus: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled'], { errorMap: () => ({ message: 'Trạng thái đơn hàng không hợp lệ' }) }).default('pending'),
  totalAmount: z.number().min(0, { message: 'Tổng tiền phải lớn hơn hoặc bằng 0' }),
  shippingFee: z.number().min(0, { message: 'Phí vận chuyển phải lớn hơn hoặc bằng 0' }).default(0),
  discount: z.number().min(0, { message: 'Giảm giá phải lớn hơn hoặc bằng 0' }).max(100, { message: 'Giảm giá không được vượt quá 100%' }).optional(),
  coupon: z.string().optional(),
  note: z.string().optional()
});

// Schema cho cập nhật order
export const updateOrderSchema = z.object({
  paymentStatus: z.enum(['pending', 'paid', 'failed', 'refunded'], { errorMap: () => ({ message: 'Trạng thái thanh toán không hợp lệ' }) }).optional(),
  orderStatus: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled'], { errorMap: () => ({ message: 'Trạng thái đơn hàng không hợp lệ' }) }).optional(),
  note: z.string().optional()
});

// Schema cho tìm kiếm đơn hàng
export const searchOrderSchema = z.object({
  keyword: z.string().optional(),
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']).optional(),
  paymentMethod: z.enum(['cod', 'banking', 'momo', 'vnpay']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  sort: z.enum(['createdAt', 'updatedAt', 'totalAmount']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional()
}); 