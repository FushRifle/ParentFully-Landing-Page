'use client';

import { FileText } from 'lucide-react';
import { useEffect, useRef } from 'react';

import { schoolAffiliateTerms } from '@/data/schoolAffiliateTerms';

type SchoolAffiliateTermsModalProps = {
    open: boolean;
    onClose: () => void;
};

export default function SchoolAffiliateTermsModal({ open, onClose }: SchoolAffiliateTermsModalProps) {
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!open) return;
        const previousOverflow = document.body.style.overflow;
        const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        document.body.style.overflow = 'hidden';
        closeButtonRef.current?.focus({ preventScroll: true });

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', handleKeyDown);
            if (previouslyFocused?.isConnected) previouslyFocused.focus({ preventScroll: true });
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="school-affiliate-terms-title" aria-describedby="school-affiliate-terms-intro" onMouseDown={(event) => {
            if (event.currentTarget === event.target) onClose();
        }}>
            <div className="flex max-h-[94dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[1.75rem] bg-white shadow-2xl sm:max-h-[88dvh] sm:rounded-[2rem]">
                <div className="shrink-0 border-b border-slate-200 px-5 pb-5 pt-6 sm:px-8 sm:py-6">
                    <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-[#00683A]"><FileText className="h-5 w-5" /></span>
                        <div className="min-w-0">
                            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#BF6500]">School Affiliate Terms</p>
                            <h2 id="school-affiliate-terms-title" className="mt-1 text-xl font-black leading-tight text-slate-950 sm:text-2xl">Parentfully School Affiliate Program Terms and Conditions</h2>
                            <p className="mt-2 text-xs font-semibold text-slate-500">Last updated: 6 June 2026</p>
                        </div>
                    </div>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8">
                    <p id="school-affiliate-terms-intro" className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-sm leading-relaxed text-slate-700 sm:p-5">These Terms and Conditions govern participation in the Parentfully School Affiliate Program. The Program is operated by Pilandres Solutions Inc., doing business as Parentfully.</p>
                    <div className="mt-5 divide-y divide-slate-200">
                        {schoolAffiliateTerms.map((section) => (
                            <section key={section.title} className="py-5 first:pt-0 sm:py-6">
                                <h3 className="text-base font-extrabold text-[#00683A]">{section.title}</h3>
                                {section.copy.map((paragraph) => <p key={paragraph} className="mt-3 text-sm leading-6 text-slate-700">{paragraph}</p>)}
                                {section.bullets ? <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700 marker:text-[#F38500]">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
                                {section.afterBullets?.map((paragraph) => <p key={paragraph} className="mt-3 text-sm leading-6 text-slate-700">{paragraph}</p>)}
                                {section.secondBullets ? <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700 marker:text-[#F38500]">{section.secondBullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
                                {section.conclusion?.map((paragraph) => <p key={paragraph} className="mt-3 text-sm leading-6 text-slate-700">{paragraph}</p>)}
                            </section>
                        ))}
                    </div>
                </div>

                <div className="shrink-0 border-t border-slate-200 bg-white px-5 py-4 sm:px-8">
                    <div className="flex justify-end">
                        <button ref={closeButtonRef} type="button" onClick={onClose} className="min-w-28 rounded-full bg-[#00683A] px-6 py-3 text-sm font-black text-white transition hover:bg-[#00552F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00683A]">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
