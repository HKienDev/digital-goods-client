import { Metadata } from 'next';
import BrandsClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: 'Đối Tác & Nhà Cung Cấp - HKZeus Nexus',
  description: 'Khám phá các đối tác và nhà cung cấp sản phẩm số uy tín: phần mềm, tài khoản, công cụ và dịch vụ số tại HKZeus Nexus.',
  keywords: 'đối tác, sản phẩm số, phần mềm, tài khoản, công cụ, dịch vụ số, HKZeus Nexus, digital goods, premium providers',
  openGraph: {
    title: 'Đối Tác & Nhà Cung Cấp - HKZeus Nexus',
    description: 'Khám phá các đối tác và nhà cung cấp sản phẩm số chất lượng cao tại HKZeus Nexus.',
    type: 'website',
    locale: 'vi_VN',
  },
};

export default function BrandsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BrandsClientLayout>{children}</BrandsClientLayout>;
} 