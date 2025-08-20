import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import GoogleAnalytics from "@/components/common/GoogleAnalytics";
import SchemaMarkup from "@/components/common/SchemaMarkup";

export const metadata: Metadata = {
  title: "HKZeus Nexus - Kho Tiện Ích & Sản Phẩm Kỹ Thuật Số Uy Tín",
  description: "HKZeus Nexus - Cửa hàng sản phẩm kỹ thuật số: tài khoản CapCut, Photoshop, AI tools, khóa học online và nhiều tiện ích số chính hãng. Uy tín, giá tốt, hỗ trợ nhanh chóng.",
  keywords: "HKZeus Nexus, sản phẩm số, tiện ích số, tài khoản CapCut, Photoshop, AI tools, khóa học online, phần mềm chính hãng, cửa hàng sản phẩm kỹ thuật số",
  authors: [{ name: "HKZeus Nexus" }],
  creator: "HKZeus Nexus",
  publisher: "HKZeus Nexus",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hkzeusvn.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "HKZeus Nexus - Kho Tiện Ích & Sản Phẩm Kỹ Thuật Số Uy Tín",
    description: "HKZeus Nexus - Chuyên cung cấp sản phẩm số chất lượng: tài khoản CapCut, Photoshop, AI tools, khóa học online, tiện ích số giá tốt.",
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
    title: "HKZeus Nexus - Kho Tiện Ích & Sản Phẩm Kỹ Thuật Số Uy Tín",
    description: "HKZeus Nexus - Nơi mua tài khoản, phần mềm, tiện ích số chất lượng cao. Uy tín, giá rẻ, giao dịch nhanh chóng.",
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
              telephone: '+84 362 195 258',
              contactType: 'customer service',
              email: 'contact@hkzeusvn.com'
            },
            sameAs: [
              'https://www.facebook.com/ZeussHk0981',
              'https://www.instagram.com/hoang_kien_0981/'
            ]
          }}
        />
        <SchemaMarkup
          type="WebSite"
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'HKZeus Nexus',
            url: 'https://www.hkzeusvn.com',
            description: 'HKZeus Nexus - Cửa hàng bán lẻ sản phẩm số chất lượng cao'
          }}
        />
      </body>
    </html>
  );
}