'use client';

import { useEffect, useRef } from 'react';

import { HOLO_EMBED_URL } from '@/lib/holoBlog';

export default function HoloBlogEmbed() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const updateLinks = () => {
            container.querySelectorAll<HTMLAnchorElement>('.holo-blog-card[data-slug]').forEach(card => {
                const slug = card.dataset.slug;
                if (slug) card.href = `/blog/${encodeURIComponent(slug)}`;
            });
        };
        const observer = new MutationObserver(updateLinks);
        observer.observe(container, { childList: true, subtree: true });

        const openArticle = (event: MouseEvent) => {
            const target = event.target as Element | null;
            const card = target?.closest<HTMLAnchorElement>('.holo-blog-card[data-slug]');
            const slug = card?.dataset.slug;
            if (!slug) return;
            event.preventDefault();
            event.stopPropagation();
            window.location.assign(`/blog/${encodeURIComponent(slug)}`);
        };
        container.addEventListener('click', openArticle, true);

        const script = document.createElement('script');
        script.src = HOLO_EMBED_URL;
        script.defer = true;
        script.dataset.holoParentfully = 'true';
        document.body.appendChild(script);

        return () => {
            observer.disconnect();
            container.removeEventListener('click', openArticle, true);
            script.remove();
        };
    }, []);

    return <div id="holo-blog" ref={containerRef} />;
}
