import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import HoloBlogEmbed from '@/components/blog/HoloBlogEmbed';

export const metadata: Metadata = {
    title: 'Parenting Articles & Practical Family Guidance | Parentfully',
    description: 'Practical guidance for calmer routines, stronger habits, and a more intentional family life.',
    alternates: { canonical: '/blog' },
};

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-[#f8fbf9] pb-20 pt-28 sm:pt-36 lg:pb-28">
            <section className="px-4 sm:px-6">
                <div className="mx-auto max-w-6xl">
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-[#bf6500]">The Parentfully journal</p>
                    <div className="mt-4 grid gap-8 border-b border-gray-200 pb-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                        <h1 className="max-w-3xl text-balance text-4xl font-black leading-[1.04] text-gray-950 sm:text-6xl">
                            Small ideas for the big work of raising children.
                        </h1>
                        <p className="max-w-xl text-lg leading-relaxed text-gray-600">
                            Practical guidance for building calmer routines, stronger habits, and a more intentional family life.
                        </p>
                    </div>
                </div>
            </section>

            <section className="px-4 py-12 sm:px-6 lg:py-16">
                <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] lg:grid-cols-2">
                    <div className="relative min-h-[300px] bg-[#E2FDF8] sm:min-h-[380px]">
                        <Image
                            src="/images/parenting-team-phone-diverse.png"
                            alt="Family using Parentfully together"
                            fill
                            priority
                            className="object-cover"
                            sizes="(min-width: 1024px) 50vw, 100vw"
                        />
                    </div>
                    <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#bf6500]">Parenting, made practical</p>
                        <h2 className="mt-4 text-3xl font-black leading-tight text-gray-950 sm:text-4xl">
                            Useful ideas you can bring into family life today.
                        </h2>
                        <p className="mt-5 text-lg leading-relaxed text-gray-600">
                            Read the latest Parentfully guidance, automatically updated whenever a new article is published.
                        </p>
                        <Link href="#latest" className="group mt-7 inline-flex items-center gap-3 self-start rounded-full bg-[#005A31] px-6 py-3.5 font-black text-white shadow-[0_16px_35px_rgba(0,90,49,0.2)] transition hover:-translate-y-0.5 hover:bg-[#004825]">
                            Explore articles <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </section>

            <section id="latest" className="scroll-mt-28 px-4 sm:px-6">
                <div className="mx-auto max-w-6xl">
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-[#005A31]">Latest from Parentfully</p>
                    <h2 className="mt-3 text-3xl font-black text-gray-950 sm:text-4xl">For the days you&apos;re figuring it out.</h2>
                    <div className="mt-8 rounded-[2rem] border border-gray-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.05)] sm:p-8">
                        <HoloBlogEmbed />
                    </div>
                </div>
            </section>

            <section className="mx-4 mt-16 rounded-[2rem] bg-[#005A31] px-7 py-12 text-center text-white sm:mx-6 sm:px-10 lg:mx-auto lg:mt-24 lg:max-w-6xl lg:py-16">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-orange-200">Take the next step</p>
                <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-black leading-tight sm:text-4xl">Turn useful ideas into everyday family action.</h2>
                <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/80">Use Parentfully to build routines, goals and shared plans around what matters to your family.</p>
                <Link href="/download" className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#F38500] px-7 py-4 font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#d87500]">
                    Start Free <ArrowRight className="h-5 w-5" />
                </Link>
            </section>
        </div>
    );
}
