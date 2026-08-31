'use client';

import Link from 'next/link';
import { ArrowRight, Copy, ExternalLink, Smartphone } from 'lucide-react';
import { useState } from 'react';

type Attribution = {
    code: string;
    type: 'referral' | 'affiliate';
};

export default function AffiliateAppHandoff({ attribution }: { attribution: Attribution | null }) {
    const [copied, setCopied] = useState(false);
    const queryKey = attribution?.type === 'affiliate' ? 'affiliate_code' : 'ref';
    const appUrl = attribution
        ? `parentfully://register?${queryKey}=${encodeURIComponent(attribution.code)}`
        : 'parentfully://register';

    const copyCode = async () => {
        if (!attribution) return;
        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(attribution.code);
            } else {
                const textArea = document.createElement('textarea');
                textArea.value = attribution.code;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                const didCopy = document.execCommand('copy');
                textArea.remove();
                if (!didCopy) return;
            }
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
        } catch {
            return;
        }
    };

    return (
        <div className="min-h-screen bg-[#F4F9F6] px-4 pb-20 pt-28 sm:px-6 sm:pt-36">
            <div className="mx-auto max-w-xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_28px_90px_rgba(15,23,42,0.1)]">
                <div className="bg-[linear-gradient(135deg,#003D22,#007541)] p-8 text-white sm:p-10">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-orange-200"><Smartphone className="h-6 w-6" /></span>
                    <p className="mt-6 text-xs font-black uppercase tracking-[0.15em] text-orange-200">You&apos;ve been invited to Parentfully</p>
                    <h1 className="mt-3 text-3xl font-black leading-tight">Continue in the Parentfully app.</h1>
                    <p className="mt-3 text-sm leading-relaxed text-emerald-50/75">Your partner code is ready and will be filled in automatically when the app opens.</p>
                </div>
                <div className="p-7 sm:p-10">
                    {attribution && (
                        <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#F4F9F6] p-4">
                            <div><p className="text-xs font-bold uppercase tracking-wide text-slate-500">{attribution.type === 'affiliate' ? 'Partner code' : 'Referral code'}</p><p className="mt-1 text-xl font-black tracking-wide text-slate-950">{attribution.code}</p></div>
                            <button onClick={() => void copyCode()} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black text-[#00683A]"><Copy className="h-4 w-4" /> {copied ? 'Copied' : 'Copy'}</button>
                        </div>
                    )}
                    <a href={appUrl} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#00683A] px-6 py-4 text-sm font-black text-white shadow-[0_16px_35px_rgba(0,104,58,0.2)] transition hover:bg-[#00552F]">Open Parentfully <ExternalLink className="h-4 w-4" /></a>
                    <Link href="/download" className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-6 py-4 text-sm font-black text-slate-800 transition hover:bg-slate-50">Get the app <ArrowRight className="h-4 w-4" /></Link>
                    <p className="mt-6 text-center text-xs leading-relaxed text-slate-500">If Parentfully is already installed, choose “Open Parentfully.” Otherwise install it first, then return to this link.</p>
                </div>
            </div>
        </div>
    );
}
