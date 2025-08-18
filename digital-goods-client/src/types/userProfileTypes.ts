export interface UserProfile {
  _id?: string;
  email: string;
  fullname: string;
  phone?: string;
  dob?: string;
  gender?: 'male' | 'female' | 'other';
  avatar?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  membershipTier?: 'Đồng' | 'Bạc' | 'Vàng' | 'Bạch Kim' | 'Kim Cương';
  totalSpent?: number;
  points?: number;
  nextTier?: {
    name: string;
    requiredSpent: number;
    remainingSpent: number;
  };
} 