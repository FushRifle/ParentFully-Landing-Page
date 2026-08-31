'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    ArrowRight,
    BarChart3,
    Eye,
    EyeOff,
    Loader2,
    LockKeyhole,
    ShieldCheck,
} from 'lucide-react';

export default function AffiliateLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setError('Please enter a valid email address.');
            return;
        }
        if (!password) {
            setError('Please enter your password.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const response = await fetch('/api/affiliate/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim(), password }),
            });
            const payload = await response.json().catch(() => null);
            if (!response.ok) {
                throw new Error(
                    response.status === 401
                        ? 'Your account is not approved yet, or those details are incorrect.'
                        : payload?.message || 'Unable to sign in.',
                );
            }
            router.replace('/affiliate/dashboard');
            router.refresh();
        } catch (loginError) {
            setError(loginError instanceof Error ? loginError.message : 'Unable to sign in.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F4F9F6] px-4 pb-20 pt-28 sm:px-6 sm:pt-36">
            <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_28px_90px_rgba(15,23,42,0.1)] lg:grid-cols-[0.9fr_1.1fr]">
                <aside className="relative overflow-hidden bg-[linear-gradient(145deg,#003D22,#00713F)] p-8 text-white sm:p-11">
                    <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#F38500]/20 blur-3xl" />
                    <div className="relative flex h-full flex-col">
                        <Link href="/affiliate" className="inline-flex w-fit items-center gap-2 text-sm font-black text-emerald-50/80 transition hover:text-white"><ArrowLeft className="h-4 w-4" /> Partner program</Link>
                        <div className="my-auto py-12">
                            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-orange-200"><BarChart3 className="h-6 w-6" /></span>
                            <h1 className="mt-6 text-3xl font-black leading-tight sm:text-4xl">Everything your partnership needs, in one clear view.</h1>
                            <p className="mt-4 text-sm leading-relaxed text-emerald-50/75">Track who signed up, which families qualified, what you earned, and when commission becomes payable.</p>
                        </div>
                        <div className="flex items-center gap-3 border-t border-white/10 pt-6 text-xs font-bold text-emerald-50/70"><ShieldCheck className="h-4 w-4 text-orange-200" /> Secure access for approved partners only</div>
                    </div>
                </aside>

                <main className="p-7 sm:p-11 lg:p-14">
                    <p className="text-sm font-black uppercase tracking-[0.14em] text-[#BF6500]">Affiliate portal</p>
                    <h2 className="mt-3 text-3xl font-black text-slate-950">Welcome back</h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">Use the email and password from your approved application.</p>

                    <form noValidate onSubmit={handleSubmit} className="mt-8 space-y-5">
                        <label className="grid gap-2 text-sm font-bold text-slate-800">
                            <span>Email address</span>
                            <input required type="email" autoComplete="email" value={email} onChange={(event) => { setEmail(event.target.value); setError(''); }} className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-[#00683A] focus:bg-white focus:ring-4 focus:ring-[#00683A]/10" placeholder="you@example.com" />
                        </label>
                        <label className="grid gap-2 text-sm font-bold text-slate-800">
                            <span>Password</span>
                            <span className="relative">
                                <input required type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(event) => { setPassword(event.target.value); setError(''); }} className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 pr-12 outline-none transition focus:border-[#00683A] focus:bg-white focus:ring-4 focus:ring-[#00683A]/10" placeholder="Your password" />
                                <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                            </span>
                        </label>

                        {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold leading-relaxed text-red-700">{error}</div>}

                        <button disabled={loading} type="submit" className="flex h-13 min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#00683A] px-6 py-4 text-sm font-black text-white shadow-[0_16px_35px_rgba(0,104,58,0.2)] transition hover:bg-[#00552F] disabled:cursor-wait disabled:opacity-70">
                            {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in…</> : <>Continue <ArrowRight className="h-4 w-4" /></>}
                        </button>
                    </form>

                    <div className="mt-7 rounded-2xl bg-[#F4F9F6] p-4">
                        <div className="flex gap-3"><LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-[#00683A]" /><p className="text-sm leading-relaxed text-slate-600"><strong className="text-slate-900">Application pending?</strong> Portal access starts after approval. We&apos;ll contact you using the email on your application.</p></div>
                    </div>
                    <p className="mt-7 text-center text-sm text-slate-600">Not a partner yet? <Link href="/affiliate#apply" className="font-black text-[#00683A] hover:underline">Submit an application</Link></p>
                </main>
            </div>
        </div>
    );
}
