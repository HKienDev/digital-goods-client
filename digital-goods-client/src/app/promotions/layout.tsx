import { Metadata } from 'next';
import PromotionsClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: 'Khuyến Mãi - HKZeus Nexus',
  description: 'Khám phá các ưu đãi hấp dẫn và tiết kiệm chi phí mua sắm tại HKZeus Nexus. Tìm kiếm và sử dụng các mã khuyến mãi tốt nhất.',
  keywords: 'khuyến mãi, mã giảm giá, ưu đãi, HKZeus Nexus, thể thao, mua sắm',
  openGraph: {
    title: 'Khuyến Mãi - HKZeus Nexus',
    description: 'Khám phá các ưu đãi hấp dẫn và tiết kiệm chi phí mua sắm tại HKZeus Nexus.',
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