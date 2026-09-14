import type { Metadata } from 'next';

import AffiliateLandingContent from '@/components/affiliate/AffiliateLandingContent';

export const metadata: Metadata = {
    title: 'Parentfully School Affiliate Program | School Partnership',
    description: 'Register your school or parent association for the Parentfully School Affiliate Program.',
};

export default function SchoolAffiliatePage() {
    return <AffiliateLandingContent isSchoolPartnership />;
}
