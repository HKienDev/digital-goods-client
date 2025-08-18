import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import GoogleAnalytics from "@/components/common/GoogleAnalytics";
import SchemaMarkup from "@/components/common/SchemaMarkup";

export const metadata: Metadata = {
  title: "HKZeus Nexus - Cửa Hàng Thể Thao Chất Lượng Cao",
  description: "HKZeus Nexus - Cửa hàng thể thao chuyên cung cấp các sản phẩm thể thao chất lượng cao, giày thể thao, quần áo thể thao, phụ kiện thể thao. Giao hàng toàn quốc, giá tốt nhất.",
  keywords: "thể thao, giày thể thao, quần áo thể thao, phụ kiện thể thao, HKZeus Nexus, cửa hàng thể thao",
  authors: [{ name: "HKZeus Nexus" }],
  creator: "HKZeus Nexus",
  publisher: "HKZeus Nexus",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vjusport.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "HKZeus Nexus - Cửa Hàng Thể Thao Chất Lượng Cao",
    description: "HKZeus Nexus - Cửa hàng thể thao chuyên cung cấp các sản phẩm thể thao chất lượng cao, giày thể thao, quần áo thể thao, phụ kiện thể thao.",
    url: '/',
    siteName: 'HKZeus Nexus',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: '/Logo_vju.png',
        width: 1200,
        height: 630,
        alt: 'HKZeus Nexus Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "HKZeus Nexus - Cửa Hàng Thể Thao Chất Lượng Cao",
    description: "HKZeus Nexus - Cửa hàng thể thao chuyên cung cấp các sản phẩm thể thao chất lượng cao.",
    images: ['/Logo_vju.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/Logo_vju.png',
    apple: '/Logo_vju.png',
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/vju-logo-main.png" type="image/png" />
        <link rel="apple-touch-icon" href="/vju-logo-main.png" />
        <link rel="apple-touch-icon-precomposed" href="/vju-logo-main.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="HKZeus Nexus" />
        <meta name="application-name" content="HKZeus Nexus" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="min-h-screen bg-background antialiased">
        <ClientLayout>
          {children}
        </ClientLayout>
        <SpeedInsights />
        <Analytics />
        <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        <SchemaMarkup
          type="Organization"
          data={{
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
          }}
        />
        <SchemaMarkup
          type="WebSite"
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'HKZeus Nexus',
            url: 'https://www.vjusport.com',
            description: 'Cửa hàng thể thao HKZeus Nexus'
          }}
        />
      </body>
    </html>
  );
}