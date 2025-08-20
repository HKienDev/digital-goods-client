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
          url: 'https://www.hkzeusvn.com',
          logo: 'https://www.hkzeusvn.com/Logo_vju.png',
          description: 'HKZeus Nexus - Cửa hàng bán lẻ sản phẩm số chất lượng cao: Tài khoản CapCut, Photoshop, AI tools, khóa học online giá rẻ',
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
            email: 'contact@hkzeusvn.com'
          },
          sameAs: [
            'https://www.facebook.com/ZeussHk0981/',
            'https://www.instagram.com/hoang_kien_0981/'
          ]
        };
      }
      case 'WebSite': {
        const websiteData = data as WebSiteSchema;
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: websiteData.name || 'HKZeus Nexus',
          url: websiteData.url || 'https://www.hkzeusvn.com',
          description: websiteData.description || 'HKZeus Nexus - Cửa hàng bán Tài khoản Pro, Công cụ AI, Phần mềm bản quyền',
          potentialAction: websiteData.potentialAction
        };
      }
      case 'Product': {
        const productData = data as ProductSchema & { 
          category?: string; 
          image?: string; 
          price?: number; 
          brand?: string;
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
        };
        return {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: productData.name || 'Sản phẩm số',
          description: productData.description || 'Tài khoản Pro, Công cụ AI, Phần mềm bản quyền',
          brand: {
            '@type': 'Brand',
            name: productData.brand || 'HKZeus Nexus'
          },
          category: productData.category || 'Sản phẩm số',
          image: productData.image || 'https://www.hkzeusvn.com/default-image.png',
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: productData.rating || 5.0,
            reviewCount: productData.numReviews || 0,
            bestRating: 5,
            worstRating: 1
          },
          review: productData.reviews || [],
          offers: {
            '@type': 'Offer',
            price: productData.price || 0,
            priceCurrency: 'VND',
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'Organization',
              name: 'HKZeus Nexus'
            },
            hasMerchantReturnPolicy: {
              '@type': 'MerchantReturnPolicy',
              returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
              merchantReturnDays: 3,
              returnMethod: 'https://schema.org/ReturnByEmail',
              returnFees: 'https://schema.org/FreeReturn',
              returnPolicyCountry: 'VN'
            },
            deliveryTime: {
              '@type': 'ShippingDeliveryTime',
              handlingTime: {
                '@type': 'QuantitativeValue',
                minValue: 0,
                maxValue: 1,
                unitCode: 'HUR'
              },
              transitTime: {
                '@type': 'QuantitativeValue',
                minValue: 0,
                maxValue: 1,
                unitCode: 'HUR'
              }
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