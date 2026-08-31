import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import {
    AFFILIATE_TOKEN_COOKIE,
    affiliateBackendRequest,
} from '@/lib/affiliate/server';

export async function POST() {
    const cookieStore = cookies();
    const token = cookieStore.get(AFFILIATE_TOKEN_COOKIE)?.value;

    if (token) {
        await affiliateBackendRequest('/v2/affiliate/auth/logout', { method: 'POST' }, token)
            .catch(() => undefined);
    }

    const response = NextResponse.json({ message: 'Logged out.' });
    response.cookies.delete(AFFILIATE_TOKEN_COOKIE);
    return response;
}
