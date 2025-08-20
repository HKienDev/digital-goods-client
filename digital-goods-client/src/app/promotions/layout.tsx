import { Metadata } from 'next';
import PromotionsClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: 'Khuyến Mãi - HKZeus Nexus',
  description: 'Khám phá các ưu đãi hấp dẫn và tiết kiệm khi mua sản phẩm số tại HKZeus Nexus. Nhận ngay mã khuyến mãi độc quyền cho phần mềm, tài khoản, và công cụ online.',
  keywords: 'khuyến mãi, mã giảm giá, ưu đãi, HKZeus Nexus, sản phẩm số, phần mềm, tài khoản online',
  openGraph: {
    title: 'Khuyến Mãi - HKZeus Nexus',
    description: 'Khám phá các ưu đãi hấp dẫn và tiết kiệm khi mua sản phẩm số tại HKZeus Nexus.',
    type: 'website',
    locale: 'vi_VN',
  },
};

export default function PromotionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PromotionsClientLayout>{children}</PromotionsClientLayout>;
} 