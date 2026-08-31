import { NextResponse } from 'next/server';

export const AFFILIATE_TOKEN_COOKIE = 'parentfully_affiliate_token';

const DEFAULT_API_BASE_URL = 'https://parentfully-prod-api.axetechinnovations.com/api';

function resolveApiBaseUrl(): string {
    const configured = (
        process.env.PARENTFULLY_API_URL ||
        process.env.NEXT_PUBLIC_PARENTFULLY_API_URL ||
        DEFAULT_API_BASE_URL
    ).trim().replace(/^["']|["']$/g, '');
    const candidate = /^https?:\/\//i.test(configured) ? configured : `https://${configured}`;

    try {
        return new URL(candidate).toString().replace(/\/$/, '');
    } catch {
        console.error('[AffiliateAPI] Invalid API base URL; using the production fallback.');
        return DEFAULT_API_BASE_URL;
    }
}

const API_BASE_URL = resolveApiBaseUrl();

export async function affiliateBackendRequest(
    path: string,
    init: RequestInit = {},
    token?: string,
): Promise<Response> {
    const headers = new Headers(init.headers);
    headers.set('Accept', 'application/json');
    if (init.body) headers.set('Content-Type', 'application/json');
    if (token) headers.set('Authorization', `Bearer ${token}`);

    const endpoint = new URL(path.replace(/^\/+/, ''), `${API_BASE_URL}/`).toString();

    return fetch(endpoint, {
        ...init,
        headers,
        cache: 'no-store',
    });
}

export async function forwardAffiliateResponse(response: Response): Promise<NextResponse> {
    const payload = await response.json().catch(() => ({
        message: 'The affiliate service returned an invalid response.',
    }));

    return NextResponse.json(payload, { status: response.status });
}
