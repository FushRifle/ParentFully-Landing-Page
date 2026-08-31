import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
    AFFILIATE_TOKEN_COOKIE,
    affiliateBackendRequest,
    forwardAffiliateResponse,
} from '@/lib/affiliate/server';

const RESOURCES = new Set(['me', 'dashboard', 'referrals', 'commissions', 'payouts']);

export async function GET(
    request: NextRequest,
    { params }: { params: { resource: string } },
) {
    if (!RESOURCES.has(params.resource)) {
        return NextResponse.json({ message: 'Unknown affiliate resource.' }, { status: 404 });
    }

    const token = cookies().get(AFFILIATE_TOKEN_COOKIE)?.value;
    if (!token) {
        return NextResponse.json({ message: 'Your affiliate session has expired.' }, { status: 401 });
    }

    try {
        const query = request.nextUrl.search;
        const backendResponse = await affiliateBackendRequest(
            `/v2/affiliate/${params.resource}${query}`,
            {},
            token,
        );

        const response = await forwardAffiliateResponse(backendResponse);
        if (backendResponse.status === 401) response.cookies.delete(AFFILIATE_TOKEN_COOKIE);
        return response;
    } catch (error) {
        console.error(`[AffiliateData] Failed to load ${params.resource}:`, error);
        return NextResponse.json(
            { message: 'The affiliate portal is temporarily unavailable. Please try again shortly.' },
            { status: 503 },
        );
    }
}
