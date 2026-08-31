import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Parentfully Affiliate Program | Partner Portal',
    description: 'Partner with Parentfully, share practical family tools, and track referrals, commission, and payouts from one secure dashboard.',
};

export default function AffiliateLayout({ children }: { children: React.ReactNode }) {
    return children;
}
