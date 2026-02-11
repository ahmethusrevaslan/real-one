import type { MetadataRoute } from 'next';
import { products } from '@/lib/products';

const BASE_URL = 'https://anyway.studio';

export default function sitemap(): MetadataRoute.Sitemap {
  const productUrls = products.map((p) => ({
    url: `${BASE_URL}/product/${p.id}`,
    lastModified: new Date(),
  }));

  return [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/collections`, lastModified: new Date() },
    { url: `${BASE_URL}/about`, lastModified: new Date() },
    { url: `${BASE_URL}/contact`, lastModified: new Date() },
    { url: `${BASE_URL}/legal`, lastModified: new Date() },
    ...productUrls,
  ];
}
