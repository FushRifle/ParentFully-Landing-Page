'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';
import KidModeMockup from './KidModeMockup';

const proofPoints = [
    'Ready-made goals & routines',
    'Your child follows along in Kid Mode',
    'Set it up once. Use it every day.'
];

const Hero: React.FC = () => (
    <section className="relative w-full overflow-hidden bg-[#E2FDF8] pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.035]" style={{ backgroundImage: "url('/images/HeroBG.png')" }} />
        <div className="absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),rgba(255,255,255,0.12)_50%,transparent_72%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            <div className="max-w-3xl text-center lg:text-left">
                <h1 className="mt-6 text-5xl font-black leading-[0.98] tracking-[-0.025em] text-gray-950 text-balance sm:text-6xl md:text-7xl">
                    Raise Thriving Children With More Clarity and Less Overwhelm
                </h1>
                <p className="mt-6 max-w-2xl text-lg font-semibold leading-relaxed text-gray-700 md:text-xl">
                    Think about who you want your child to become. Parentfully helps you intentionally nurture that growth, one day at a time.
                </p>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
                    Set whole-child growth goals, build habits, responsibility and independence through everyday routines, and keep your family organized. All in one place.
                </p>
                <Link href="/download" className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#005A31] px-7 py-4 font-black text-white shadow-[0_18px_45px_rgba(0,90,49,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#004825] hover:shadow-[0_22px_55px_rgba(0,90,49,0.34)] active:scale-95">
                    Start Free
                    <span className="flex -space-x-1.5"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-black ring-2 ring-[#005A31]"><Image src="/icons/apple5.png" alt="iOS" width={13} height={13} className="invert" /></span><span className="flex h-6 w-6 items-center justify-center rounded-full bg-white ring-2 ring-[#005A31]"><Image src="/icons/google.png" alt="Android" width={13} height={13} /></span></span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <p className="mt-8 max-w-2xl text-base leading-relaxed text-gray-600">
                    Start with ready-made goals and routines, customize what you need, and let your child follow along from their own Kid Mode.
                </p>
                <ul className="mx-auto mt-5 max-w-xl space-y-3 text-left lg:mx-0">
                    {proofPoints.map((point) => (
                        <li key={point} className="flex items-center gap-3 font-bold text-gray-800">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#005A31] text-white"><Check className="h-4 w-4" /></span>
                            {point}
                        </li>
                    ))}
                </ul>
            </div>

            {/** The MockUp */}
            <div className="relative mx-auto w-full max-w-[390px] py-4 sm:max-w-[430px] lg:max-w-none">
                <div className="absolute inset-10 rounded-full bg-[#F38500]/20 blur-[85px]" />
                <div className="relative">
                    <KidModeMockup />
                </div>
            </div>
        </div>
    </section>
);

export default Hero;
