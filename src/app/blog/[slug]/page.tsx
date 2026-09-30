/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

import { getHoloArticles } from '@/lib/holoBlog';

type Props = { params: { slug: string } };

const getArticle = async (slug: string) => {
    const articles = await getHoloArticles();
    return articles.find(article => article.slug === decodeURIComponent(slug));
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const article = await getArticle(params.slug);
    if (!article) return { title: 'Article not found | Parentfully' };

    return {
        title: `${article.title} | Parentfully`,
        description: article.excerpt,
        alternates: { canonical: `/blog/${article.slug}` },
        openGraph: {
            type: 'article',
            title: article.title,
            description: article.excerpt,
            publishedTime: article.isoDate,
            images: article.imageUrl ? [article.imageUrl] : undefined,
        },
    };
}

export default async function BlogArticlePage({ params }: Props) {
    const article = await getArticle(params.slug);
    if (!article) notFound();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.excerpt,
        datePublished: article.isoDate,
        image: article.imageUrl || undefined,
        url: `https://parentfully.app/blog/${article.slug}`,
        publisher: { '@type': 'Organization', name: 'Parentfully' },
    };

    return (
        <main className="min-h-screen bg-[#f8fbf9] px-4 pb-24 pt-28 sm:px-6 sm:pt-36">
            <article className="mx-auto max-w-3xl">
                <Link href="/blog" className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-[#005A31] transition hover:border-[#005A31]">
                    <ArrowLeft className="h-4 w-4" /> Back to all articles
                </Link>

                <header className="mt-8">
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-[#bf6500]">The Parentfully journal</p>
                    <h1 className="mt-4 text-balance text-4xl font-black leading-tight text-gray-950 sm:text-6xl">{article.title}</h1>
                    <p className="mt-5 text-xl leading-relaxed text-gray-600">{article.excerpt}</p>
                    <time className="mt-5 block text-sm font-bold text-gray-500" dateTime={article.isoDate}>{article.date}</time>
                </header>

                {article.imageUrl && (
                    <img src={article.imageUrl} alt={article.title} className="mt-9 max-h-[480px] w-full rounded-[2rem] object-cover shadow-sm" />
                )}

                <div
                    className="holo-article-content mt-10 rounded-[2rem] border border-gray-200 bg-white p-6 text-[1.05rem] leading-8 text-gray-700 shadow-[0_18px_45px_rgba(15,23,42,0.05)] sm:p-10"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </article>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </main>
    );
}
