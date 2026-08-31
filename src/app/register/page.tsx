import type { Metadata } from 'next';

import AffiliateAppHandoff from './AffiliateAppHandoff';

export const metadata: Metadata = {
    title: 'Join Parentfully',
    description: 'Open Parentfully and continue creating your family account.',
};

const normalizeCode = (value?: string): string | null => {
    const code = value?.trim().toUpperCase() || '';
    return /^[A-Z0-9_-]{2,50}$/.test(code) ? code : null;
};

export default function RegisterHandoffPage({
    searchParams,
}: {
    searchParams: { affiliate_code?: string; affiliate?: string; referral_code?: string; ref?: string };
}) {
    const affiliateCode = normalizeCode(searchParams.affiliate_code || searchParams.affiliate);
    const referralCode = normalizeCode(searchParams.referral_code || searchParams.ref);
    const attribution = affiliateCode
        ? { type: 'affiliate' as const, code: affiliateCode }
        : referralCode
            ? { type: 'referral' as const, code: referralCode }
            : null;

    return <AffiliateAppHandoff attribution={attribution} />;
}
