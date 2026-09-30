export const HOLO_BLOG_ID = '665abf97-b701-4a4c-805d-a6694e0c8f2e';
export const HOLO_EMBED_URL = `https://prod-api-holo-ai.fly.dev/public/seo/embed/${HOLO_BLOG_ID}.js`;

export type HoloArticle = {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    isoDate: string;
    imageUrl?: string | null;
};

export async function getHoloArticles(): Promise<HoloArticle[]> {
    const response = await fetch(HOLO_EMBED_URL, {
        next: { revalidate: 300 },
        headers: { Accept: 'application/javascript' },
    });

    if (!response.ok) throw new Error(`Holo returned ${response.status}`);

    const source = await response.text();
    const match = source.match(/var HOLO_ARTICLES = (\[[\s\S]*?\]);\s*\n\s*var container/);
    if (!match?.[1]) return [];

    try {
        const articles = JSON.parse(match[1]) as HoloArticle[];
        return Array.isArray(articles) ? articles : [];
    } catch (error) {
        console.error('[HoloBlog] Could not parse published articles:', error);
        return [];
    }
}
