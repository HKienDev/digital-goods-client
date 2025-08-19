export interface BaseEntity {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Category extends BaseEntity {
    name: string;
    slug: string;
    description?: string;
    parentId?: string;
    image?: string;
    isActive: boolean;
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    category: string;
    stock: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CartItem {
    _id: string;
    productId: string;
    quantity: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Coupon {
    _id: string;
    code: string;
    type: 'percentage' | 'fixed';
    value: number;
    usageLimit: number;
    userLimit: number;
    startDate: string;
    endDate: string;
    status: 'active' | 'inactive' | 'expired';
    usageCount: number;
    userUsageCount: Record<string, number>;
    minimumPurchaseAmount: number;
    createdBy?: string;
    updatedBy?: string;
    createdAt: string;
    updatedAt: string;
    isExpired?: boolean;
    isAvailable?: boolean;
    isActive?: boolean;
}

export interface CreateProductData {
    name: string;
    slug: string;
    description: string;
    originalPrice: number;
    salePrice: number;
    stock: number;
    categoryId: string;
    brand: string;
    mainImage: string;
    subImages: string[];
    durations: string[];
    productTypes: string[];
    tags: string[];
    isActive: boolean;
    sku: string;
}

export interface UpdateProductData extends Partial<CreateProductData> {
    id: string;
} 