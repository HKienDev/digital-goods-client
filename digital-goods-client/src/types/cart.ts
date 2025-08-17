import { UserProduct } from './product';

export interface CartItem {
  product: UserProduct;
  quantity: number;
  duration: string;
  productType: string;
  totalPrice: number;
  _id: string;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  totalQuantity: number;
  cartTotal: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  cartTotal: number;
  loading: boolean;
  error: string | null;
  createdAt?: string;
  updatedAt?: string;
} 