import { Metadata } from 'next';
import ContactClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: 'Liên Hệ - HKZeus Nexus',
  description: 'Liên hệ với HKZeus Nexus để được tư vấn và hỗ trợ về các sản phẩm số. Chúng tôi luôn sẵn sàng phục vụ bạn 24/7.',
  keywords: 'liên hệ, hỗ trợ, tư vấn, HKZeus Nexus, sản phẩm số, tài khoản, phần mềm, customer service',
  openGraph: {
    title: 'Liên Hệ - HKZeus Nexus',
    description: 'Kết nối với HKZeus Nexus để nhận hỗ trợ nhanh chóng và chuyên nghiệp về sản phẩm số.',
    type: 'website',
    locale: 'vi_VN',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ContactClientLayout>{children}</ContactClientLayout>;
} 