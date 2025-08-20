'use client';

import Head from 'next/head';
import { usePathname } from 'next/navigation';
import SchemaMarkup from './SchemaMarkup';

// Type definitions for SEO component

interface ProductData {
  name: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  image: string;
  sku: string;
  rating?: number;
  numReviews?: number;
  reviews?: Array<{
    '@type': 'Review';
    author: {
      '@type': 'Person';
      name: string;
    };
    reviewRating: {
      '@type': 'Rating';
      ratingValue: number;
      bestRating: number;
      worstRating: number;
    };
    reviewBody: string;
    datePublished: string;
  }>;
}

interface BreadcrumbData {
  items: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  productData?: ProductData;
  breadcrumbData?: BreadcrumbData;
}

export default function SEOHead({
  title = 'HKZeus Nexus - Cửa Hàng Sản Phẩm Số Chất Lượng Cao',
  description = 'HKZeus Nexus - Cửa hàng chuyên cung cấp sản phẩm số chất lượng cao như phần mềm, tài khoản, công cụ và dịch vụ số. Thanh toán an toàn, giao hàng tức thì.',
  image = '/Logo_vju.png',
  url = 'https://www.hkzeusvn.com',
  type = 'website',
  productData,
  breadcrumbData
}: SEOHeadProps) {
  const pathname = usePathname();
  const fullUrl = `${url}${pathname || ''}`;

  return (
    <Head>
      {/* Basic Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${url}${image}`} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="HKZeus Nexus" />
      <meta property="og:locale" content="vi_VN" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${url}${image}`} />
      
      {/* Schema.org */}
      {productData && (
        // @ts-expect-error - Type compatibility issue with SchemaMarkup component
        <SchemaMarkup type="Product" data={productData} />
      )}
      {breadcrumbData && (
        // @ts-expect-error - Type compatibility issue with SchemaMarkup component
        <SchemaMarkup type="BreadcrumbList" data={breadcrumbData} />
      )}
    </Head>
  );
}
