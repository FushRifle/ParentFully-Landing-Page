import { affiliateBackendRequest, forwardAffiliateResponse } from '@/lib/affiliate/server';

export async function POST(request: Request) {
    const body = await request.json().catch(() => null);
    if (!body) {
        return Response.json({ message: 'Please complete the application form.' }, { status: 400 });
    }

    try {
        const response = await affiliateBackendRequest('/v2/affiliate/apply', {
            method: 'POST',
            body: JSON.stringify(body),
        });
        if (!response.ok) return forwardAffiliateResponse(response);

        const payload = await response.json().catch(() => null);
        return Response.json({
            success: true,
            message: payload?.message || 'Your affiliate application has been submitted.',
        });
    } catch (error) {
        console.error('[AffiliateApplication] Backend request failed:', error);
        return Response.json(
            { message: 'The affiliate service is temporarily unavailable. Please try again shortly.' },
            { status: 503 },
        );
    }
}
