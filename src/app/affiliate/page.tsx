import { redirect } from 'next/navigation';

import AffiliateLandingContent from '@/components/affiliate/AffiliateLandingContent';

export default function AffiliatePage({ searchParams }: { searchParams: { partner?: string } }) {
    if (searchParams.partner === 'school') redirect('/affiliate/school');

    return <AffiliateLandingContent isSchoolPartnership={false} />;
}
