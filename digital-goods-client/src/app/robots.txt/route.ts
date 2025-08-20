import { NextResponse } from 'next/server'

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Disallow admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /static/

# Allow important pages
Allow: /user/
Allow: /auth/
Allow: /brands/
Allow: /contact/
Allow: /promotions/

# Sitemap
Sitemap: https://www.hkzeusvn.com/sitemap.xml

# Crawl delay for better server performance
Crawl-delay: 1`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
