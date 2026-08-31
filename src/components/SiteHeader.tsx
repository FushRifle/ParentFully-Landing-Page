'use client';

import { usePathname } from 'next/navigation';

import AffiliateHeader from './affiliate/AffiliateHeader';
import Header from './Header';

export default function SiteHeader() {
    const pathname = usePathname();
    return pathname.startsWith('/affiliate') ? <AffiliateHeader /> : <Header />;
}
