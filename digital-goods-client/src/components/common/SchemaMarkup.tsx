'use client';

import Script from 'next/script';

interface OrganizationSchema {
  '@context': string;
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  description: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint: {
    '@type': 'ContactPoint';
    telephone: string;
    contactType: string;
    email: string;
  };
  sameAs: string[];
}

interface WebSiteSchema {
  '@context': string;
  '@type': 'WebSite';
  name: string;
  url: string;
  description?: string;
  potentialAction?: unknown;
}

interface ProductSchema {
  '@context': string;
  '@type': 'Product';
  name: string;
  image: string[];
  description: string;
  sku: string;
  brand: {
    '@type': 'Brand';
    name: string;
  };
  offers: unknown;
}

interface BreadcrumbListSchema {
  '@context': string;
  '@type': 'BreadcrumbList';
  itemListElement: unknown[];
}

type SchemaData = OrganizationSchema | WebSiteSchema | ProductSchema | BreadcrumbListSchema;

interface SchemaMarkupProps {
  type: 'Organization' | 'WebSite' | 'Product' | 'BreadcrumbList';
  data: SchemaData;
}

export default function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  const getSchemaData = () => {
    switch (type) {
      case 'Organization': {
        // Không dùng data, trả về cứng
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'HKZeus Nexus',
          url: 'https://www.vjusport.com',
          logo: 'https://www.vjusport.com/Logo_vju.png',
          description: 'Cửa hàng thể thao HKZeus Nexus - Chuyên cung cấp các sản phẩm thể thao chất lượng cao',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Phạm Văn Đồng, Cầu Giấy',
            addressLocality: 'Hà Nội',
            addressRegion: 'Hà Nội',
            postalCode: '100000',
            addressCountry: 'VN'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+84-xxx-xxx-xxxx',
            contactType: 'customer service',
            email: 'contact@vjusport.com'
          },
          sameAs: [
            'https://www.facebook.com/vjusport',
            'https://www.instagram.com/vjusport'
          ]
        };
      }
      case 'WebSite': {
        const websiteData = data as WebSiteSchema;
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: websiteData.name || 'HKZeus Nexus',
          url: websiteData.url || 'https://www.vjusport.com',
          description: websiteData.description || 'Cửa hàng thể thao HKZeus Nexus',
          potentialAction: websiteData.potentialAction
        };
      }
      case 'Product': {
        const productData = data as ProductSchema & { category?: string; image?: string; price?: number; brand?: string };
        return {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: productData.name || 'Sản phẩm thể thao',
          description: productData.description || 'Sản phẩm thể thao chất lượng cao',
          brand: {
            '@type': 'Brand',
            name: productData.brand || 'HKZeus Nexus'
          },
          category: productData.category || 'Thể thao',
          image: productData.image || 'https://www.vjusport.com/default-image.png',
          offers: {
            '@type': 'Offer',
            price: productData.price || 0,
            priceCurrency: 'VND',
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'Organization',
              name: 'HKZeus Nexus'
            }
          }
        };
      }
      case 'BreadcrumbList': {
        const breadcrumbData = data as BreadcrumbListSchema & { items?: unknown[] };
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbData.items || []
        };
      }
      default:
        return {};
    }
  };

  return (
    <Script
      id={`schema-${type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getSchemaData())
      }}
    />
  );
} 