"use client";

import React from 'react';
import Script from 'next/script';
import { MessageCircleHeart, Quote } from 'lucide-react';
import { BsSend } from 'react-icons/bs';

declare global {
    interface Window {
        SenjaCollector?: {
            open: () => void;
        };
        SenjaCollectorConfig?: {
            url: string;
            trigger: {
                type: string;
            };
        };
    }
}

const senjaCollectorUrl = 'https://senja.io/p/parentfullyapp/r/R3Qc5w';

const Testimonials: React.FC = () => {
    const openSenjaCollector = () => {
        window.SenjaCollector?.open();
    };

    return (
        <section className="relative mx-auto overflow-hidden bg-[#E2FDF8] px-4 py-20 sm:px-6 lg:py-28">
            <Script id="senja-collector-config" strategy="afterInteractive">
                {`
                    window.SenjaCollectorConfig = {
                        url: "${senjaCollectorUrl}",
                        trigger: {"type":"none"}
                    }
                `}
            </Script>
            <Script
                id="senja-collector"
                type="text/javascript"
                async
                src="https://widget.senja.io/js/collector.js"
                strategy="afterInteractive"
            />

            <div
                className="absolute inset-0 bg-cover bg-center opacity-[0.04]"
                style={{ backgroundImage: "url('/images/HeroBG.webp')" }}
            />
            <div className="absolute left-0 top-0 h-24 w-full bg-gradient-to-b from-white/70 to-transparent" />
            <div className="absolute bottom-0 left-0 h-28 w-full bg-gradient-to-t from-white/45 to-transparent" />
            <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-[#005A31]/10 blur-[120px]" />
            <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#F38500]/15 blur-[120px]" />

            <div className="relative mx-auto max-w-8xl">
                <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/80 bg-white/70 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:p-8 lg:p-10">
                    <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
                        <div>
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#005A31]/10 bg-[#E2FDF8]/80 px-4 py-2 shadow-sm">
                                <Quote className="h-4 w-4 text-[#F38500]" />
                                <span className="text-sm font-black text-[#005A31]">Real parent stories</span>
                            </div>

                            <h2 className="text-4xl font-black leading-[1.05] text-gray-950 text-balance sm:text-5xl md:text-6xl">
                                Tell Us What Parentfully
                                <span className="text-[#F38500]"> Changed For You.</span>
                            </h2>

                            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
                                Share your experience so other families can hear what changed at home,
                                in routines, and across the parenting team.
                            </p>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#F38500]/18 via-white/40 to-[#005A31]/18 blur-2xl" />
                            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/90 bg-[#005A31] p-6 text-white shadow-[0_24px_70px_rgba(0,90,49,0.24)] sm:p-8">
                                <div className="absolute right-5 top-5 text-white/10">
                                    <Quote className="h-24 w-24 fill-current" />
                                </div>

                                <div className="relative">
                                    <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/14 ring-1 ring-white/20">
                                        <MessageCircleHeart className="h-7 w-7 text-[#F38500]" />
                                    </div>

                                    <p className="max-w-sm text-2xl font-black leading-tight text-balance sm:text-3xl">
                                        Your story could help another parent start with confidence.
                                    </p>

                                    <div className="mt-8 flex flex-wrap gap-2">
                                        {['Quick', 'Personal', 'Direct'].map((item) => (
                                            <span
                                                key={item}
                                                className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-bold text-white/85"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        data-senja-collector-open="parentfullyapp"
                                        data-url={senjaCollectorUrl}
                                        onClick={openSenjaCollector}
                                        className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#F38500] px-6 py-4 text-base font-black text-white shadow-[0_18px_45px_rgba(243,133,0,0.34)] transition hover:-translate-y-0.5 hover:bg-[#DD7900] focus:outline-none focus:ring-4 focus:ring-white/25 sm:w-auto"
                                    >
                                        <BsSend className="h-5 w-5" />
                                        Share your story
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
