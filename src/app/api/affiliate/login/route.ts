import { NextResponse } from 'next/server';
import {
    AFFILIATE_TOKEN_COOKIE,
    affiliateBackendRequest,
    forwardAffiliateResponse,
} from '@/lib/affiliate/server';

export async function POST(request: Request) {
    const body = await request.json().catch(() => null);
    if (!body?.email || !body?.password) {
        return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    try {
        const backendResponse = await affiliateBackendRequest('/v2/affiliate/auth/login', {
            method: 'POST',
            body: JSON.stringify(body),
        });

        if (!backendResponse.ok) return forwardAffiliateResponse(backendResponse);

        const payload = await backendResponse.json().catch(() => null);
        if (!payload || typeof payload.token !== 'string' || !payload.token.trim()) {
            console.error('[AffiliateLogin] Backend returned an invalid login response.');
            return NextResponse.json(
                { message: 'We could not start your affiliate session. Please try again shortly.' },
                { status: 502 },
            );
        }

        const response = NextResponse.json({
            message: payload.message,
            affiliate: payload.affiliate,
        });
        response.cookies.set(AFFILIATE_TOKEN_COOKIE, payload.token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 24 * 30,
        });
        return response;
    } catch (error) {
        console.error('[AffiliateLogin] Backend request failed:', error);
        return NextResponse.json(
            { message: 'The affiliate portal is temporarily unavailable. Please try again shortly.' },
            { status: 503 },
        );
    }
}
