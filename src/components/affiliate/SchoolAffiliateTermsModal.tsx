'use client';

import Link from 'next/link';
import { FileText, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { schoolAffiliateTerms } from '@/data/schoolAffiliateTerms';

type SchoolAffiliateTermsModalProps = {
    open: boolean;
    onClose: () => void;
    accepted: boolean;
    onAcceptedChange: (accepted: boolean) => void;
    onConfirm: () => void;
    busy?: boolean;
};

export default function SchoolAffiliateTermsModal({
    open,
    onClose,
    accepted,
    onAcceptedChange,
    onConfirm,
    busy = false,
}: SchoolAffiliateTermsModalProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [hasReachedBottom, setHasReachedBottom] = useState(false);

    useEffect(() => {
        if (!open) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        setHasReachedBottom(false);

        const frame = window.requestAnimationFrame(() => {
            const content = contentRef.current;
            if (content && content.scrollHeight <= content.clientHeight + 2) {
                setHasReachedBottom(true);
            }
        });

        return () => {
            document.body.style.overflow = previousOverflow;
            window.cancelAnimationFrame(frame);
        };
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="school-affiliate-terms-title" onMouseDown={(event) => {
            if (event.currentTarget === event.target) onClose();
        }}>
            <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[2rem] bg-white shadow-2xl sm:rounded-[2rem]">
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-5 sm:px-7">
                    <div className="flex min-w-0 items-start gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-[#00683A]"><FileText className="h-5 w-5" /></span>
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#BF6500]">School Affiliate Terms</p>
                            <h2 id="school-affiliate-terms-title" className="mt-1 text-xl font-black leading-tight text-slate-950 sm:text-2xl">Parentfully School Affiliate Program Terms and Conditions</h2>
                            <p className="mt-1 text-xs text-slate-500">ast Updated: 6 June 2026</p>
                        </div>
                    </div>
                    <button type="button" onClick={onClose} disabled={busy} className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 disabled:opacity-50" aria-label="Close school affiliate terms"><X className="h-5 w-5" /></button>
                </div>

                <div
                    ref={contentRef}
                    onScroll={(event) => {
                        const content = event.currentTarget;
                        if (content.scrollTop + content.clientHeight >= content.scrollHeight - 2) {
                            setHasReachedBottom(true);
                        }
                    }}
                    className="overflow-y-auto px-5 py-5 sm:px-7"
                >
                    <p className="text-sm leading-relaxed text-slate-600">These Terms and Conditions govern participation in the Parentfully School Affiliate Program. The Program is operated by Pilandres Solutions Inc., doing business as Parentfully.</p>
                    <div className="mt-5 space-y-4">
                        {schoolAffiliateTerms.map((section) => (
                            <section key={section.title} className="rounded-2xl bg-slate-50 p-4">
                                <h3 className="text-sm font-black text-slate-900">{section.title}</h3>
                                {section.copy.map((paragraph) => <p key={paragraph} className="mt-1 text-sm leading-relaxed text-slate-600">{paragraph}</p>)}
                                {section.bullets ? <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-relaxed text-slate-600 marker:text-[#F38500]">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
                            </section>
                        ))}
                    </div>
                    <p className="mt-5 text-xs leading-relaxed text-slate-500">These terms work alongside Parentfully&apos;s <Link href="/terms" target="_blank" className="font-black text-[#00683A] underline underline-offset-2">Terms of Use</Link> and <Link href="/privacy" target="_blank" className="font-black text-[#00683A] underline underline-offset-2">Privacy Policy</Link>.</p>
                </div>

                <div className="border-t border-slate-200 bg-white px-5 py-4 sm:px-7">
                    <label className={`flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 ${hasReachedBottom ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}>
                        <input type="checkbox" checked={accepted} disabled={!hasReachedBottom || busy} onChange={(event) => onAcceptedChange(event.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#00683A]" />
                        <span className="text-sm font-semibold leading-relaxed text-slate-700">I confirm that I am authorized to register this school or parent association, and I have read and agree to the Parentfully School Partnership Terms and Conditions.</span>
                    </label>
                    {!hasReachedBottom ? <p className="mt-2 text-xs font-semibold text-slate-500">Please scroll to the end of the terms to enable acceptance.</p> : null}
                    <div className="mt-4 flex justify-end gap-3">
                        <button type="button" onClick={onClose} disabled={busy} className="rounded-full border border-slate-200 px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50 disabled:opacity-50">Not now</button>
                        <button type="button" onClick={onConfirm} disabled={!accepted || busy} className="rounded-full bg-[#00683A] px-6 py-3 text-sm font-black text-white transition hover:bg-[#00552F] disabled:cursor-not-allowed disabled:opacity-50">{busy ? 'Submitting…' : 'Agree and submit interest'}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
