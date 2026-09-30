import type { MetadataRoute } from 'next';

import { siteDetails } from '@/data/siteDetails';
import { getHoloArticles } from '@/lib/holoBlog';

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = siteDetails.siteUrl.replace(/\/$/, '');
    const staticPages: MetadataRoute.Sitemap = [
        '',
        '/blog',
        '/download',
        '/help',
        '/privacy',
        '/terms',
    ].map(path => ({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
    }));

    try {
        const articles = await getHoloArticles();
        return [
            ...staticPages,
            ...articles.map(article => ({
                url: `${baseUrl}/blog/${article.slug}`,
                lastModified: new Date(article.isoDate),
            })),
        ];
    } catch (error) {
        console.error('[Sitemap] Could not load Holo articles:', error);
        return staticPages;
    }
}
