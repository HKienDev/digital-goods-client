export interface OrderEmailProps {
  shortId: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  directDiscount: number;
  couponDiscount: number;
  totalPrice: number;
  createdAt: string;
} 