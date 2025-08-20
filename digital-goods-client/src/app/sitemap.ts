import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.hkzeusvn.com'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/user`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/brands`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/promotions`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // Try to fetch products for dynamic sitemap
  let productPages: MetadataRoute.Sitemap = []
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://digital-goods-api-production.up.railway.app'}/api/products/public`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (response.ok) {
      const products = await response.json()
      
      if (products.success && products.data) {
        productPages = products.data.map((product: { sku: string; updatedAt?: string; createdAt?: string }) => ({
          url: `${baseUrl}/user/products/details/${product.sku}`,
          lastModified: new Date(product.updatedAt || product.createdAt || Date.now()),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        }))
      }
    }
  } catch (error) {
    console.error('Error fetching products for sitemap:', error)
  }

  // Try to fetch categories for dynamic sitemap
  let categoryPages: MetadataRoute.Sitemap = []
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://digital-goods-api-production.up.railway.app'}/api/categories/public`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (response.ok) {
      const categories = await response.json()
      
      if (categories.success && categories.data) {
        categoryPages = categories.data.map((category: { slug: string; updatedAt?: string; createdAt?: string }) => ({
          url: `${baseUrl}/brands/${category.slug}`,
          lastModified: new Date(category.updatedAt || category.createdAt || Date.now()),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }))
      }
    }
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error)
  }

  return [...staticPages, ...productPages, ...categoryPages]
}
