import type { Product } from './product';

export interface Stats {
    totalUsers: number;
    totalOrders: number;
    totalProducts: number;
    totalRevenue: number;
    topProducts: Product[];
}
