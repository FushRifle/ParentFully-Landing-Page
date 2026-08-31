'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FormEvent, useMemo, useState } from 'react';
import countryList from 'react-select-country-list';
import {
    ArrowRight,
    BadgeCheck,
    BarChart3,
    Check,
    ChevronRight,
    Eye,
    EyeOff,
    Handshake,
    Loader2,
    Megaphone,
    ShieldCheck,
    Users,
} from 'lucide-react';

import type { AffiliateApplicationPayload } from '@/lib/affiliate/types';

const inputClass = 'h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-[15px] text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#00683A] focus:bg-white focus:ring-4 focus:ring-[#00683A]/10';
const labelClass = 'grid gap-2 text-sm font-bold text-slate-800';
const audienceTypes = [
    'Parenting coach',
    'Family creator or influencer',
    'Teacher or educator',
    'Therapist or counsellor',
    'Community organisation',
    'School or childcare provider',
    'Other',
];
const countryOptions = countryList().getData() as Array<{ label: string; value: string }>;
const initialForm: AffiliateApplicationPayload = {
    name: '', email: '', password: '', password_confirmation: '', phone: '',
    country: '', city: '', audience_type: '', audience_size: undefined,
    website_url: '', social_links: [], payout_method: 'bank_transfer', reason: '',
    requested_commission_rate: undefined,
};

const backendFieldMessages: Record<string, string> = {
    name: 'Please enter your full name.',
    email: 'That email is invalid or already has an affiliate application.',
    password: 'Create a password with at least 8 characters.',
    password_confirmation: 'Please confirm your password.',
    country: 'Please select a valid country.',
    audience_size: 'Audience size must be a valid number of zero or more.',
    website_url: 'Please enter a valid website link, such as https://example.com.',
    social_links: 'Please enter a valid social profile link.',
    requested_commission_rate: 'Requested commission must be between 0% and 100%.',
};

function getErrorMessage(payload: unknown, status: number): string {
    const errorPayload = payload as {
        errors?: Record<string, string[]>;
        message?: string;
    } | null;
    const field = errorPayload?.errors ? Object.keys(errorPayload.errors)[0] : null;
    if (field) {
        const normalizedField = field.replace(/\.\d+$/, '');
        return backendFieldMessages[normalizedField] || 'Please review the highlighted application details and try again.';
    }
    if (status === 409 || (status === 422 && errorPayload?.message?.toLowerCase().includes('already'))) {
        return 'An affiliate application already exists for this email. If you are approved, use the Login button instead.';
    }
    if (status === 429) return 'Too many registration attempts were made. Please wait a minute and try again.';
    if (status >= 500) return 'The affiliate service is temporarily unavailable. Your form is still here—please try again shortly.';
    return errorPayload?.message || 'We could not submit your application. Please check your details and try again.';
}

function normalizeOptionalUrl(value: string | undefined, label: string): string | undefined {
    const trimmed = value?.trim();
    if (!trimmed) return undefined;
    const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    try {
        const parsed = new URL(candidate);
        if (!parsed.hostname.includes('.')) throw new Error('Invalid hostname');
        return parsed.toString();
    } catch {
        throw new Error(`Please enter a valid ${label} link, such as https://example.com.`);
    }
}

export default function AffiliatePage() {
    const [form, setForm] = useState(initialForm);
    const [socialLink, setSocialLink] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const passwordsMatch = useMemo(
        () => !form.password_confirmation || form.password === form.password_confirmation,
        [form.password, form.password_confirmation],
    );

    const updateField = <Key extends keyof AffiliateApplicationPayload>(key: Key, value: AffiliateApplicationPayload[Key]) => {
        setForm((current) => ({ ...current, [key]: value }));
        if (error) setError('');
    };

    const submitApplication = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!form.name.trim()) return setError('Please enter your full name.');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return setError('Please enter a valid email address.');
        if (form.password.length < 8) return setError('Create a password with at least 8 characters.');
        if (!form.password_confirmation) return setError('Please confirm your password.');
        if (!passwordsMatch) return setError('Your passwords do not match. Please enter them again.');
        setSubmitting(true);
        setError('');
        try {
            const websiteUrl = normalizeOptionalUrl(form.website_url, 'website');
            const socialUrl = normalizeOptionalUrl(socialLink, 'social profile');
            const response = await fetch('/api/affiliate/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    country: form.country || undefined,
                    audience_size: form.audience_size ?? undefined,
                    requested_commission_rate: form.requested_commission_rate ?? undefined,
                    website_url: websiteUrl,
                    social_links: socialUrl ? [socialUrl] : [],
                }),
            });
            const payload = await response.json().catch(() => null);
            if (!response.ok) throw new Error(getErrorMessage(payload, response.status));
            setSubmitted(true);
        } catch (submissionError) {
            const message = submissionError instanceof Error ? submissionError.message : '';
            setError(
                message && !message.includes('expected pattern')
                    ? message
                    : 'We could not submit your application. Please check your links and try again.',
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F6FAF7] pt-24 sm:pt-32">
            <section className="relative overflow-hidden bg-[linear-gradient(135deg,#003D22_0%,#00683A_58%,#008B4C_100%)] px-4 pb-20 pt-16 text-white sm:px-6 sm:pb-24 sm:pt-20">
                <div className="absolute -right-24 top-4 h-80 w-80 rounded-full bg-[#F38500]/20 blur-3xl" />
                <div className="absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-emerald-300/10 blur-3xl" />
                <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                    <div>
                        <h1 className="mt-7 max-w-3xl text-4xl font-black leading-[1.03] text-balance sm:text-6xl">Turn your trusted voice into meaningful family impact.</h1>
                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-emerald-50/80 sm:text-xl">Recommend a family operating system you believe in, help parents build calmer homes, and earn commission when your community chooses Parentfully Premium.</p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <a href="#apply" className="inline-flex items-center gap-2 rounded-full bg-[#F38500] px-6 py-3.5 text-sm font-black text-white shadow-xl shadow-black/15 transition hover:-translate-y-0.5 hover:bg-[#db7700]">Register <ArrowRight className="h-4 w-4" /></a>
                            <Link href="/affiliate/login" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-black text-white backdrop-blur transition hover:bg-white/15">Login <ChevronRight className="h-4 w-4" /></Link>
                        </div>
                    </div>
                    <div className="relative mx-auto w-full max-w-xl">
                        <div className="absolute -inset-3 rotate-3 rounded-[2.5rem] border border-white/15 bg-white/5" />
                        <div className="relative overflow-hidden rounded-[2.25rem] border border-white/20 bg-white/10 p-2 shadow-[0_30px_80px_rgba(0,0,0,0.25)] backdrop-blur">
                            <Image src="/images/parenting-team-phone-diverse.png" alt="A happy family using Parentfully together" width={1536} height={1024} priority className="aspect-[4/3] w-full rounded-[1.85rem] object-cover" />
                            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-[#073E27]/90 p-4 backdrop-blur-md">
                                <div className="flex items-center justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.12em] text-orange-200">Share real family support</p><p className="mt-1 text-sm font-bold text-white">Recommend tools that help families follow through.</p></div><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F38500]"><Handshake className="h-5 w-5" /></span></div>
                            </div>
                        </div>
                        {/**
                        <div className="absolute -left-5 top-8 hidden rounded-2xl border border-white/20 bg-white p-4 text-slate-950 shadow-xl sm:block"><p className="text-xs font-bold text-slate-500">Partner portal</p><p className="mt-1 flex items-center gap-2 text-sm font-black text-[#00683A]"><BarChart3 className="h-4 w-4" /> Live reporting</p></div>
                        <div className="absolute -right-4 bottom-16 hidden rounded-2xl border border-white/20 bg-white p-4 text-slate-950 shadow-xl sm:block"><p className="text-xs font-bold text-slate-500">Commission</p><p className="mt-1 flex items-center gap-2 text-sm font-black text-[#00683A]"><CircleDollarSign className="h-4 w-4" /> Clear tracking</p></div>
                         */}
                    </div>
                </div>
            </section>

            <section className="relative z-10 -mt-7 px-4 sm:px-6">
                <div className="mx-auto grid max-w-6xl gap-3 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:grid-cols-3 sm:p-5">
                    {[
                        { icon: Users, title: 'Share with purpose', copy: 'Introduce genuinely useful family tools.' },
                        { icon: BarChart3, title: 'Track every step', copy: 'See signups, qualification, and conversions.' },
                        { icon: ShieldCheck, title: 'Trusted partnership', copy: 'Human-reviewed partners and clear reporting.' },
                    ].map(({ icon: Icon, title, copy }) => <div key={title} className="flex items-start gap-3 rounded-2xl p-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF8F0] text-[#00683A]"><Icon className="h-5 w-5" /></span><div><h2 className="text-sm font-black text-slate-950">{title}</h2><p className="mt-1 text-xs leading-relaxed text-slate-500">{copy}</p></div></div>)}
                </div>
            </section>

            <section className="px-4 py-16 sm:px-6 lg:py-24">
                <div className="mx-auto max-w-6xl">
                    <div className="mx-auto max-w-2xl text-center"><p className="text-sm font-black uppercase tracking-[0.16em] text-[#BF6500]">How partnership works</p><h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">Simple to share. Easy to understand.</h2></div>
                    <div className="mt-10 grid gap-4 md:grid-cols-3">
                        {[
                            ['01', 'Register', 'Tell us about your audience, values, and how you support families.'],
                            ['02', 'Get approved', 'Our team reviews your application and activates your private partner portal.'],
                            ['03', 'Share and earn', 'Use your code, monitor referrals, and follow commission through payout.'],
                        ].map(([number, title, copy]) => (
                            <div key={number} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.05)]"><span className="text-sm font-black text-[#F38500]">{number}</span><h3 className="mt-5 text-xl font-black text-slate-950">{title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">{copy}</p></div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="apply" className="scroll-mt-32 px-4 pb-20 sm:px-6 lg:pb-28">
                <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
                    <aside className="rounded-[2rem] bg-[#073E27] p-7 text-white lg:sticky lg:top-28 sm:p-9">
                        <Handshake className="h-9 w-9 text-orange-300" /><h2 className="mt-6 text-3xl font-black leading-tight">Built for people families already trust.</h2><p className="mt-4 text-sm leading-relaxed text-emerald-50/75">We welcome educators, coaches, creators, therapists, community leaders, schools, and family-focused organisations.</p>
                        <div className="mt-8 space-y-4 border-t border-white/10 pt-7">
                            {['A unique trackable affiliate code', 'Live referral and commission reporting', 'Clear pending and payout statuses', 'Resources to introduce Parentfully well'].map((item) => <div key={item} className="flex gap-3 text-sm font-bold text-emerald-50/90"><BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-orange-300" /> {item}</div>)}
                        </div>
                    </aside>

                    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-9">
                        {submitted ? (
                            <div className="py-14 text-center sm:py-20">
                                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#E2F8EC] text-[#00683A]"><Check className="h-8 w-8" /></span>
                                <p className="mt-6 text-sm font-black uppercase tracking-[0.14em] text-[#BF6500]">Application received</p><h2 className="mt-3 text-3xl font-black text-slate-950">Your application is pending review.</h2>
                                <p className="mx-auto mt-4 max-w-lg leading-relaxed text-slate-600">We&apos;ll review your details and contact you by email. Your affiliate code becomes available only after approval.</p>
                                <div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/" className="rounded-full bg-[#00683A] px-6 py-3 text-sm font-black text-white">Return home</Link><Link href="/affiliate/login" className="rounded-full border border-slate-200 px-6 py-3 text-sm font-black text-slate-800">Already approved? Sign in</Link></div>
                            </div>
                        ) : (
                            <>
                                <div className="border-b border-slate-200 pb-6"><p className="text-sm font-black uppercase tracking-[0.14em] text-[#BF6500]">Partner application</p><h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">Tell us about your community</h2><p className="mt-2 text-sm leading-relaxed text-slate-600">Fields marked with * are required. Applications are reviewed before portal access is activated.</p></div>
                                <form noValidate onSubmit={submitApplication} className="mt-7 grid gap-5 sm:grid-cols-2">
                                    <label className={labelClass}><span>Full name *</span><input required autoComplete="name" className={inputClass} value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Your full name" /></label>
                                    <label className={labelClass}><span>Email address *</span><input required type="email" autoComplete="email" className={inputClass} value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder="you@example.com" /></label>
                                    <label className={labelClass}><span>Phone number <span className="font-medium text-slate-400">(optional)</span></span><input autoComplete="tel" className={inputClass} value={form.phone} onChange={(event) => updateField('phone', event.target.value)} placeholder="+1 555 000 0000" /></label>
                                    <label className={labelClass}><span>City <span className="font-medium text-slate-400">(optional)</span></span><input autoComplete="address-level2" className={inputClass} value={form.city} onChange={(event) => updateField('city', event.target.value)} placeholder="Your city" /></label>
                                    <label className={labelClass}><span>Country <span className="font-medium text-slate-400">(optional)</span></span><select className={inputClass} value={form.country} onChange={(event) => updateField('country', event.target.value)}><option value="">Select country</option>{countryOptions.map((country) => <option key={country.value} value={country.value}>{country.label}</option>)}</select></label>
                                    <label className={labelClass}><span>Audience type <span className="font-medium text-slate-400">(optional)</span></span><select className={inputClass} value={form.audience_type} onChange={(event) => updateField('audience_type', event.target.value)}><option value="">Select audience type</option>{audienceTypes.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>
                                    <label className={labelClass}><span>Audience size <span className="font-medium text-slate-400">(optional)</span></span><input min="0" type="number" className={inputClass} value={form.audience_size ?? ''} onChange={(event) => updateField('audience_size', event.target.value ? Number(event.target.value) : undefined)} placeholder="e.g. 5000" /></label>
                                    <label className={labelClass}><span>Preferred payout method <span className="font-medium text-slate-400">(optional)</span></span><select className={inputClass} value={form.payout_method} onChange={(event) => updateField('payout_method', event.target.value)}><option value="bank_transfer">Bank transfer</option><option value="paypal">PayPal</option><option value="wise">Wise</option><option value="other">Other</option></select></label>
                                    <label className={labelClass}><span>Requested commission rate (%) <span className="font-medium text-slate-400">(optional)</span></span><input min="0" max="100" step="0.5" type="number" className={inputClass} value={form.requested_commission_rate ?? ''} onChange={(event) => updateField('requested_commission_rate', event.target.value ? Number(event.target.value) : undefined)} placeholder="e.g. 20" /></label>
                                    <label className={`${labelClass} sm:col-span-2`}><span>Website <span className="font-medium text-slate-400">(optional)</span></span><input inputMode="url" className={inputClass} value={form.website_url} onChange={(event) => updateField('website_url', event.target.value)} placeholder="yourwebsite.com" /></label>
                                    <label className={`${labelClass} sm:col-span-2`}><span>Primary social profile <span className="font-medium text-slate-400">(optional)</span></span><input inputMode="url" className={inputClass} value={socialLink} onChange={(event) => { setSocialLink(event.target.value); if (error) setError(''); }} placeholder="instagram.com/yourprofile" /></label>
                                    <label className={`${labelClass} sm:col-span-2`}><span>Why would you like to partner with Parentfully? <span className="font-medium text-slate-400">(optional)</span></span><textarea rows={5} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#00683A] focus:bg-white focus:ring-4 focus:ring-[#00683A]/10" value={form.reason} onChange={(event) => updateField('reason', event.target.value)} placeholder="Tell us about your community and how you would introduce Parentfully." /></label>
                                    <label className={labelClass}><span>Create portal password *</span><span className="relative"><input required minLength={8} type={showPassword ? 'text' : 'password'} autoComplete="new-password" className={`${inputClass} pr-12`} value={form.password} onChange={(event) => updateField('password', event.target.value)} placeholder="At least 8 characters" /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></span></label>
                                    <label className={labelClass}><span>Confirm password *</span><input required minLength={8} type={showPassword ? 'text' : 'password'} autoComplete="new-password" className={`${inputClass} ${passwordsMatch ? '' : 'border-red-400 focus:border-red-500 focus:ring-red-100'}`} value={form.password_confirmation} onChange={(event) => updateField('password_confirmation', event.target.value)} placeholder="Repeat your password" />{!passwordsMatch && <span className="text-xs font-semibold text-red-600">Passwords do not match.</span>}</label>
                                    {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700 sm:col-span-2">{error}</div>}
                                    <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs leading-relaxed text-slate-500">Pending applicants cannot sign in until approved.</p><button disabled={submitting || !passwordsMatch} type="submit" className="inline-flex min-w-48 items-center justify-center gap-2 rounded-full bg-[#00683A] px-7 py-4 text-sm font-black text-white shadow-[0_16px_35px_rgba(0,104,58,0.22)] transition hover:-translate-y-0.5 hover:bg-[#00552F] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0">{submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</> : <>Register <ArrowRight className="h-4 w-4" /></>}</button></div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </section>

            <section className="border-t border-slate-200 bg-white px-4 py-14 sm:px-6"><div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center"><div><p className="text-sm font-black uppercase tracking-[0.14em] text-[#BF6500]">Already a partner?</p><h2 className="mt-2 text-2xl font-black text-slate-950">Your live reporting portal is ready.</h2></div><Link href="/affiliate/login" className="inline-flex items-center gap-2 rounded-full border border-[#00683A]/20 bg-[#EAF8F0] px-6 py-3 text-sm font-black text-[#00683A] transition hover:border-[#00683A]">Open Affiliate Dashboard<Megaphone className="h-4 w-4" /></Link></div></section>
        </div>
    );
}
