'use client';

import { FormEvent, useState } from 'react';
import { ArrowRight, Check, Handshake, Users } from 'lucide-react';

const audienceOptions = [
    'Under 1,000',
    '1,000–5,000',
    '5,001–25,000',
    '25,001–100,000',
    '100,000+',
];

export default function AffiliatePage() {
    const [submitted, setSubmitted] = useState(false);

    const submitApplication = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-[#f8fbf9] pt-24 sm:pt-32">
            <section className="bg-[#005A31] px-4 py-16 text-white sm:px-6 sm:py-20">
                <div className="mx-auto max-w-6xl">
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-orange-200">Parentfully affiliate program</p>
                    <div className="mt-5 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
                        <div>
                            <h1 className="max-w-3xl text-4xl font-black leading-[1.04] text-balance sm:text-6xl">Help families build calmer, more intentional days.</h1>
                            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">Share Parentfully with parents and caregivers in your community. We&apos;re building the application experience now—join the early affiliate list to be first in line.</p>
                        </div>
                        <div className="border-l border-white/20 pl-5 sm:pl-7">
                            <p className="text-sm font-bold text-orange-200">A simple partnership</p>
                            <p className="mt-2 text-xl font-black leading-snug">You introduce Parentfully. Families get a better system for everyday life.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-4 py-16 sm:px-6 lg:py-24">
                <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                    <aside className="lg:pt-4">
                        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#bf6500]">Built for your community</p>
                        <h2 className="mt-4 text-3xl font-black leading-tight text-gray-950 sm:text-4xl">A partnership with purpose.</h2>
                        <div className="mt-8 space-y-6 border-t border-gray-200 pt-7">
                            <div className="flex gap-4">
                                <Handshake className="mt-0.5 h-5 w-5 shrink-0 text-[#F38500]" />
                                <div><h3 className="font-black text-gray-900">Share something useful</h3><p className="mt-1 text-sm leading-relaxed text-gray-600">Give families a practical way to build routines, independence, and clarity.</p></div>
                            </div>
                            <div className="flex gap-4">
                                <Users className="mt-0.5 h-5 w-5 shrink-0 text-[#F38500]" />
                                <div><h3 className="font-black text-gray-900">Grow with us</h3><p className="mt-1 text-sm leading-relaxed text-gray-600">Tell us about your audience so we can shape an affiliate program that serves everyone well.</p></div>
                            </div>
                        </div>
                    </aside>

                    <div className="border border-gray-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] sm:p-9">
                        {submitted ? (
                            <div className="py-12 text-center sm:py-16">
                                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E2FDF8] text-[#005A31]"><Check className="h-6 w-6" /></span>
                                <h2 className="mt-5 text-3xl font-black text-gray-950">You&apos;re on the list.</h2>
                                <p className="mx-auto mt-3 max-w-md leading-relaxed text-gray-600">Thanks for your interest. We&apos;ll be in touch when the Parentfully affiliate program is ready.</p>
                                <button type="button" onClick={() => setSubmitted(false)} className="mt-7 text-sm font-black text-[#005A31] underline decoration-[#F38500] decoration-2 underline-offset-4">Submit another application</button>
                            </div>
                        ) : (
                            <>
                                <div className="border-b border-gray-200 pb-6">
                                    <h2 className="text-2xl font-black text-gray-950">Join the affiliate waitlist</h2>
                                    <p className="mt-2 text-sm leading-relaxed text-gray-600">This is an expression of interest, not a commitment. We&apos;ll only use these details to follow up about the program.</p>
                                </div>
                                <form onSubmit={submitApplication} className="mt-7 grid gap-5 sm:grid-cols-2">
                                    <label className="grid gap-2 text-sm font-bold text-gray-800"><span>Full name</span><input required name="name" autoComplete="name" className="h-12 border border-gray-300 bg-white px-3 outline-none transition focus:border-[#005A31] focus:ring-2 focus:ring-[#005A31]/10" placeholder="Your name" /></label>
                                    <label className="grid gap-2 text-sm font-bold text-gray-800"><span>Email address</span><input required type="email" name="email" autoComplete="email" className="h-12 border border-gray-300 bg-white px-3 outline-none transition focus:border-[#005A31] focus:ring-2 focus:ring-[#005A31]/10" placeholder="you@example.com" /></label>
                                    <label className="grid gap-2 text-sm font-bold text-gray-800"><span>Website or social profile</span><input required type="url" name="profile" className="h-12 border border-gray-300 bg-white px-3 outline-none transition focus:border-[#005A31] focus:ring-2 focus:ring-[#005A31]/10" placeholder="https://" /></label>
                                    <label className="grid gap-2 text-sm font-bold text-gray-800"><span>Audience size</span><select required name="audience" defaultValue="" className="h-12 border border-gray-300 bg-white px-3 outline-none transition focus:border-[#005A31] focus:ring-2 focus:ring-[#005A31]/10"><option value="" disabled>Select a range</option>{audienceOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
                                    <label className="grid gap-2 text-sm font-bold text-gray-800 sm:col-span-2"><span>How do you support parents or families?</span><textarea required name="message" rows={4} className="border border-gray-300 bg-white px-3 py-3 outline-none transition focus:border-[#005A31] focus:ring-2 focus:ring-[#005A31]/10" placeholder="Tell us a little about your community and how you would share Parentfully." /></label>
                                    <label className="flex items-start gap-3 text-sm leading-relaxed text-gray-600 sm:col-span-2"><input required type="checkbox" className="mt-1 h-4 w-4 accent-[#005A31]" /><span>I&apos;d like Parentfully to contact me about the affiliate program.</span></label>
                                    <div className="sm:col-span-2"><button type="submit" className="group inline-flex items-center gap-3 bg-[#005A31] px-6 py-3.5 font-black text-white transition hover:bg-[#004825]">Join the waitlist <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></button></div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
