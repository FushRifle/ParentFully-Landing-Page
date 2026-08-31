'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    ArrowUpRight,
    BadgeCheck,
    Banknote,
    Check,
    CircleDollarSign,
    Clock3,
    Copy,
    ExternalLink,
    Loader2,
    LogOut,
    RefreshCw,
    Share2,
    TrendingUp,
    UserCheck,
    Users,
    WalletCards,
} from 'lucide-react';

import type {
    AffiliateCommission,
    AffiliateDashboard,
    AffiliatePayout,
    AffiliateReferral,
    ApiEnvelope,
    PaginatedData,
} from '@/lib/affiliate/types';

type DashboardTab = 'overview' | 'referrals' | 'commissions' | 'payouts';

const tabs: Array<{ id: DashboardTab; label: string }> = [
    { id: 'overview', label: 'Overview' },
    { id: 'referrals', label: 'Referrals' },
    { id: 'commissions', label: 'Commissions' },
    { id: 'payouts', label: 'Payouts' },
];

const readableStatus = (status: string) => status.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

const formatDate = (value?: string | null) => {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '—';
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(date);
};

const maskEmail = (email?: string | null) => {
    if (!email) return 'Email protected';
    const [name, domain] = email.split('@');
    if (!name || !domain) return 'Email protected';
    const visibleName = name.length <= 2 ? name[0] : name.slice(0, 2);
    return `${visibleName}${'•'.repeat(Math.max(2, Math.min(name.length - visibleName.length, 5)))}@${domain}`;
};

const formatMoney = (amountMinor: number, currency = 'USD') => {
    try {
        return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amountMinor / 100);
    } catch {
        return `${currency} ${(amountMinor / 100).toFixed(2)}`;
    }
};

const statusClass = (status: string) => {
    if (['paid', 'qualified', 'approved', 'payable', 'active'].includes(status)) return 'bg-emerald-100 text-emerald-800';
    if (['pending', 'signed_up'].includes(status)) return 'bg-amber-100 text-amber-800';
    if (['rejected', 'reversed', 'cancelled', 'refunded'].includes(status)) return 'bg-red-100 text-red-700';
    return 'bg-slate-100 text-slate-700';
};

async function getAffiliateData<T>(resource: string): Promise<T> {
    const response = await fetch(`/api/affiliate/data/${resource}`, { cache: 'no-store' });
    const payload = await response.json().catch(() => null);
    if (response.status === 401) throw Object.assign(new Error('SESSION_EXPIRED'), { status: 401 });
    if (!response.ok) throw new Error(payload?.message || 'Unable to load affiliate data.');
    if (!payload || !('data' in payload)) throw new Error('The affiliate service returned an invalid response.');
    return (payload as ApiEnvelope<T>).data;
}

async function getAllAffiliateData<T>(resource: string): Promise<T[]> {
    const firstPage = await getAffiliateData<PaginatedData<T>>(`${resource}?page=1&per_page=100`);
    if (firstPage.last_page <= 1) return firstPage.data;

    const remainingPages = await Promise.all(
        Array.from({ length: firstPage.last_page - 1 }, (_, index) =>
            getAffiliateData<PaginatedData<T>>(`${resource}?page=${index + 2}&per_page=100`),
        ),
    );
    return [firstPage, ...remainingPages].flatMap((page) => page.data);
}

async function writeClipboard(value: string): Promise<void> {
    if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        return;
    }

    const textArea = document.createElement('textarea');
    textArea.value = value;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    const copied = document.execCommand('copy');
    textArea.remove();
    if (!copied) throw new Error('COPY_FAILED');
}

function StatusBadge({ status }: { status: string }) {
    return <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-black ${statusClass(status)}`}>{readableStatus(status)}</span>;
}

function EmptyState({ title, copy }: { title: string; copy: string }) {
    return <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center"><p className="font-black text-slate-900">{title}</p><p className="mt-2 text-sm text-slate-500">{copy}</p></div>;
}

export default function AffiliateDashboardPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
    const [dashboard, setDashboard] = useState<AffiliateDashboard | null>(null);
    const [referrals, setReferrals] = useState<AffiliateReferral[]>([]);
    const [commissions, setCommissions] = useState<AffiliateCommission[]>([]);
    const [payouts, setPayouts] = useState<AffiliatePayout[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const loadDashboard = useCallback(async (refresh = false) => {
        if (refresh) setRefreshing(true);
        else setLoading(true);
        setError('');
        try {
            const [dashboardData, referralData, commissionData, payoutData] = await Promise.all([
                getAffiliateData<AffiliateDashboard>('dashboard'),
                getAllAffiliateData<AffiliateReferral>('referrals'),
                getAllAffiliateData<AffiliateCommission>('commissions'),
                getAllAffiliateData<AffiliatePayout>('payouts'),
            ]);
            setDashboard(dashboardData);
            setReferrals(referralData);
            setCommissions(commissionData);
            setPayouts(payoutData);
        } catch (loadError) {
            const requestError = loadError as Error & { status?: number };
            if (requestError.status === 401 || requestError.message === 'SESSION_EXPIRED') {
                router.replace('/affiliate/login');
                return;
            }
            setError(requestError.message || 'Unable to load your dashboard.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [router]);

    useEffect(() => { void loadDashboard(); }, [loadDashboard]);

    const partner = dashboard?.partner;
    const stats = dashboard?.stats;
    const primaryCode = useMemo(
        () => partner?.codes?.find((code) => code.is_active)?.code || partner?.codes?.[0]?.code || '',
        [partner?.codes],
    );
    const affiliateLink = primaryCode
        ? `https://parentfully.app/register?affiliate_code=${encodeURIComponent(primaryCode)}`
        : '';

    const copyLink = async () => {
        if (!affiliateLink) return;
        try {
            await writeClipboard(affiliateLink);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
        } catch {
            setError('We could not copy your link automatically. Please select and copy it manually.');
        }
    };

    const shareLink = async () => {
        if (!affiliateLink) return;
        if (navigator.share) {
            try {
                await navigator.share({ title: 'Parentfully', text: 'Build calmer, more intentional family routines with Parentfully.', url: affiliateLink });
            } catch (shareError) {
                if (shareError instanceof DOMException && shareError.name === 'AbortError') return;
                await copyLink();
            }
        } else {
            await copyLink();
        }
    };

    const logout = async () => {
        await fetch('/api/affiliate/logout', { method: 'POST' }).catch(() => undefined);
        router.replace('/affiliate/login');
        router.refresh();
    };

    if (loading) {
        return <div className="flex min-h-screen items-center justify-center bg-[#F4F9F6] pt-28"><div className="text-center"><Loader2 className="mx-auto h-8 w-8 animate-spin text-[#00683A]" /><p className="mt-3 text-sm font-bold text-slate-600">Loading your partner portal…</p></div></div>;
    }

    return (
        <div className="min-h-screen bg-[#F4F9F6] pb-20 pt-28 sm:pt-36">
            <section className="px-4 sm:px-6">
                <div className="mx-auto max-w-7xl">
                    <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#003D22,#007541)] p-6 text-white shadow-[0_25px_70px_rgba(0,61,34,0.2)] sm:p-9">
                        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#F38500]/20 blur-3xl" />
                        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
                            <div><p className="text-xs font-black uppercase tracking-[0.16em] text-orange-200">Affiliate partner portal</p><h1 className="mt-3 text-3xl font-black sm:text-4xl">Welcome back, {partner?.name?.split(' ')[0] || 'Partner'}.</h1><p className="mt-2 max-w-xl text-sm leading-relaxed text-emerald-50/75">Track your community&apos;s journey from first signup to paid Parentfully family.</p></div>
                            <div className="flex flex-wrap gap-2"><button onClick={() => void loadDashboard(true)} disabled={refreshing} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-xs font-black backdrop-blur transition hover:bg-white/15"><RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} /> Refresh</button><button onClick={() => void logout()} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-xs font-black backdrop-blur transition hover:bg-white/15"><LogOut className="h-4 w-4" /> Sign out</button></div>
                        </div>
                    </div>

                    {error && <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700"><span>{error}</span><button onClick={() => void loadDashboard()} className="shrink-0 font-black underline">Try again</button></div>}

                    <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_360px]">
                        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                            {[
                                { label: 'Total referrals', value: stats?.total_referrals ?? 0, icon: Users, tone: 'bg-blue-50 text-blue-700' },
                                { label: 'Qualified families', value: stats?.qualified_referrals ?? 0, icon: UserCheck, tone: 'bg-violet-50 text-violet-700' },
                                { label: 'Paid families', value: stats?.paid_referrals ?? 0, icon: BadgeCheck, tone: 'bg-emerald-50 text-emerald-700' },
                                { label: 'Commission rate', value: `${Number(partner?.commission_rate ?? 0)}%`, icon: TrendingUp, tone: 'bg-orange-50 text-orange-700' },
                            ].map(({ label, value, icon: Icon, tone }) => (
                                <div key={label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><span className={`flex h-10 w-10 items-center justify-center rounded-2xl ${tone}`}><Icon className="h-5 w-5" /></span><p className="mt-5 text-2xl font-black text-slate-950">{value}</p><p className="mt-1 text-xs font-bold text-slate-500">{label}</p></div>
                            ))}
                        </div>

                        <div className="rounded-3xl bg-[#083E28] p-5 text-white shadow-sm">
                            <div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[0.12em] text-orange-200">Your share link</p><p className="mt-2 font-black">{primaryCode || 'Code unavailable'}</p></div><Share2 className="h-5 w-5 text-emerald-200" /></div>
                            <p className="mt-4 truncate rounded-xl bg-white/10 px-3 py-2.5 text-xs text-emerald-50/75">{affiliateLink || 'Your code appears after approval.'}</p>
                            <div className="mt-3 grid grid-cols-2 gap-2"><button disabled={!affiliateLink} onClick={() => void copyLink()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-3 py-2.5 text-xs font-black text-[#00683A] disabled:opacity-50">{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copied ? 'Copied' : 'Copy'}</button><button disabled={!affiliateLink} onClick={() => void shareLink()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F38500] px-3 py-2.5 text-xs font-black text-white disabled:opacity-50"><ExternalLink className="h-4 w-4" /> Share</button></div>
                        </div>
                    </div>

                    <div className="mt-7 overflow-x-auto"><div className="inline-flex min-w-full gap-1 rounded-2xl border border-slate-200 bg-white p-1 sm:min-w-0">{tabs.map((tab) => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`min-w-28 flex-1 rounded-xl px-4 py-3 text-sm font-black transition ${activeTab === tab.id ? 'bg-[#00683A] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'}`}>{tab.label}</button>)}</div></div>

                    <div className="mt-5 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                        {activeTab === 'overview' && <Overview stats={stats} currency={partner?.default_currency || 'USD'} referrals={referrals} commissions={commissions} onOpen={setActiveTab} />}
                        {activeTab === 'referrals' && <ReferralsTable referrals={referrals} />}
                        {activeTab === 'commissions' && <CommissionsTable commissions={commissions} />}
                        {activeTab === 'payouts' && <PayoutsTable payouts={payouts} />}
                    </div>

                    <div className="mt-6 flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-5 text-sm sm:flex-row sm:items-center sm:justify-between"><div><p className="font-black text-slate-900">Need help with your partnership?</p><p className="mt-1 text-xs text-slate-500">Contact the Parentfully team for campaign or payout support.</p></div><a href="mailto:admin@parentfullyapp.com" className="inline-flex items-center gap-2 font-black text-[#00683A]">Contact partner support <ArrowUpRight className="h-4 w-4" /></a></div>
                </div>
            </section>
        </div>
    );
}

function Overview({ stats, currency, referrals, commissions, onOpen }: { stats?: AffiliateDashboard['stats']; currency: string; referrals: AffiliateReferral[]; commissions: AffiliateCommission[]; onOpen: (tab: DashboardTab) => void }) {
    const moneyCards = [
        { label: 'Pending', value: stats?.pending_commissions_minor ?? 0, icon: Clock3, color: 'text-amber-700 bg-amber-50' },
        { label: 'Ready for payout', value: stats?.payable_commissions_minor ?? 0, icon: WalletCards, color: 'text-violet-700 bg-violet-50' },
        { label: 'Paid to you', value: stats?.paid_commissions_minor ?? 0, icon: Banknote, color: 'text-emerald-700 bg-emerald-50' },
        { label: 'Total earned', value: stats?.total_commissions_minor ?? 0, icon: CircleDollarSign, color: 'text-blue-700 bg-blue-50' },
    ];
    return <div><div className="flex items-end justify-between gap-4"><div><h2 className="text-xl font-black text-slate-950">Commission overview</h2><p className="mt-1 text-sm text-slate-500">A live view of your partner earnings.</p></div><button onClick={() => onOpen('commissions')} className="text-xs font-black text-[#00683A]">View history</button></div><div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{moneyCards.map(({ label, value, icon: Icon, color }) => <div key={label} className="rounded-2xl border border-slate-200 p-4"><span className={`flex h-9 w-9 items-center justify-center rounded-xl ${color}`}><Icon className="h-4 w-4" /></span><p className="mt-4 text-xl font-black text-slate-950">{formatMoney(value, currency)}</p><p className="mt-1 text-xs font-bold text-slate-500">{label}</p></div>)}</div><div className="mt-8 grid gap-6 lg:grid-cols-2"><div><div className="flex items-center justify-between"><h3 className="font-black text-slate-900">Recent referrals</h3><button onClick={() => onOpen('referrals')} className="text-xs font-black text-[#00683A]">See all</button></div><div className="mt-3 space-y-2">{referrals.slice(0, 4).map((referral) => <div key={referral.id} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3"><div className="min-w-0"><p className="truncate text-sm font-black text-slate-900">{referral.referred_user?.name || 'Parentfully member'}</p><p className="mt-0.5 text-xs text-slate-500">Joined {formatDate(referral.signup_at)}</p></div><StatusBadge status={referral.status} /></div>)}{!referrals.length && <EmptyState title="No referrals yet" copy="Share your partner link to begin tracking signups." />}</div></div><div><div className="flex items-center justify-between"><h3 className="font-black text-slate-900">Recent commission</h3><button onClick={() => onOpen('commissions')} className="text-xs font-black text-[#00683A]">See all</button></div><div className="mt-3 space-y-2">{commissions.slice(0, 4).map((commission) => <div key={commission.id} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3"><div><p className="text-sm font-black text-slate-900">{formatMoney(commission.commission_amount_minor, commission.currency)}</p><p className="mt-0.5 text-xs text-slate-500">Earned {formatDate(commission.earned_at)}</p></div><StatusBadge status={commission.status} /></div>)}{!commissions.length && <EmptyState title="No commission yet" copy="Commission appears after an eligible paid conversion." />}</div></div></div></div>;
}

function ReferralsTable({ referrals }: { referrals: AffiliateReferral[] }) {
    if (!referrals.length) return <EmptyState title="No referrals yet" copy="Share your affiliate link and new signups will appear here." />;
    return <div><h2 className="text-xl font-black text-slate-950">Referral activity</h2><p className="mt-1 text-sm text-slate-500">Follow each family from signup to qualification and paid conversion.</p><div className="mt-5 overflow-x-auto"><table className="min-w-full text-left text-sm"><thead><tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500"><th className="px-3 py-3">Family</th><th className="px-3 py-3">Code</th><th className="px-3 py-3">Joined</th><th className="px-3 py-3">Qualified</th><th className="px-3 py-3">Status</th></tr></thead><tbody>{referrals.map((referral) => <tr key={referral.id} className="border-b border-slate-100 last:border-0"><td className="px-3 py-4"><p className="font-black text-slate-900">{referral.referred_user?.name || 'Parentfully member'}</p><p className="mt-0.5 text-xs text-slate-500">{maskEmail(referral.referred_user?.email)}</p></td><td className="px-3 py-4 font-bold text-slate-700">{referral.code?.code || '—'}</td><td className="whitespace-nowrap px-3 py-4 text-slate-600">{formatDate(referral.signup_at)}</td><td className="whitespace-nowrap px-3 py-4 text-slate-600">{formatDate(referral.first_family_item_at)}</td><td className="px-3 py-4"><StatusBadge status={referral.status} /></td></tr>)}</tbody></table></div></div>;
}

function CommissionsTable({ commissions }: { commissions: AffiliateCommission[] }) {
    if (!commissions.length) return <EmptyState title="No commission history" copy="Eligible paid conversions will create commission records here." />;
    return <div><h2 className="text-xl font-black text-slate-950">Commission history</h2><p className="mt-1 text-sm text-slate-500">Amounts move from pending to payable and finally paid.</p><div className="mt-5 overflow-x-auto"><table className="min-w-full text-left text-sm"><thead><tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500"><th className="px-3 py-3">Earned</th><th className="px-3 py-3">Sale</th><th className="px-3 py-3">Rate</th><th className="px-3 py-3">Commission</th><th className="px-3 py-3">Status</th></tr></thead><tbody>{commissions.map((commission) => <tr key={commission.id} className="border-b border-slate-100 last:border-0"><td className="whitespace-nowrap px-3 py-4 text-slate-600">{formatDate(commission.earned_at)}</td><td className="px-3 py-4 font-bold text-slate-700">{formatMoney(commission.amount_minor, commission.currency)}</td><td className="px-3 py-4 text-slate-600">{Number(commission.commission_rate)}%</td><td className="px-3 py-4 font-black text-slate-950">{formatMoney(commission.commission_amount_minor, commission.currency)}</td><td className="px-3 py-4"><StatusBadge status={commission.status} /></td></tr>)}</tbody></table></div></div>;
}

function PayoutsTable({ payouts }: { payouts: AffiliatePayout[] }) {
    if (!payouts.length) return <EmptyState title="No payouts yet" copy="Payout records will appear here when payable commission is processed." />;
    return <div><h2 className="text-xl font-black text-slate-950">Payout history</h2><p className="mt-1 text-sm text-slate-500">See when payouts were requested, approved, and completed.</p><div className="mt-5 overflow-x-auto"><table className="min-w-full text-left text-sm"><thead><tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500"><th className="px-3 py-3">Requested</th><th className="px-3 py-3">Amount</th><th className="px-3 py-3">Reference</th><th className="px-3 py-3">Paid</th><th className="px-3 py-3">Status</th></tr></thead><tbody>{payouts.map((payout) => <tr key={payout.id} className="border-b border-slate-100 last:border-0"><td className="whitespace-nowrap px-3 py-4 text-slate-600">{formatDate(payout.requested_at)}</td><td className="px-3 py-4 font-black text-slate-950">{formatMoney(payout.amount_minor, payout.currency)}</td><td className="px-3 py-4 font-mono text-xs text-slate-600">{payout.payment_reference || '—'}</td><td className="whitespace-nowrap px-3 py-4 text-slate-600">{formatDate(payout.paid_at)}</td><td className="px-3 py-4"><StatusBadge status={payout.status} /></td></tr>)}</tbody></table></div></div>;
}
