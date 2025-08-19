export enum MembershipLevel {
    BRONZE = "Đồng",
    SILVER = "Bạc",
    GOLD = "Vàng",
    PLATINUM = "Bạch Kim",
    DIAMOND = "Kim Cương"
}

export enum Gender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other"
}

export enum UserRole {
    USER = "user",
    ADMIN = "admin"
}

export enum AuthStatus {
    PENDING = "pending",
    VERIFIED = "verified",
    BLOCKED = "blocked"
}

export interface User {
    _id: string;
    customId?: string;
    email: string;
    password?: string;
    fullname: string;
    phone: string;
    avatar?: string;
    gender: Gender;
    dob?: Date;
    googleId?: string;
    googleEmail?: string;
    role: UserRole;
    membershipLevel: MembershipLevel;
    points: number;
    totalSpent: number;
    orderCount: number;
    authStatus: AuthStatus;
    lastLogin?: Date;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    verificationToken?: string;
    verificationTokenExpires?: Date;
    loginAttempts: number;
    lockedUntil?: Date;
    pendingUpdate?: Record<string, unknown>;
    createdAt: Date;
    updatedAt: Date;
}
