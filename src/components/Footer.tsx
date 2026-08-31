'use client';

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

import { siteDetails } from '@/data/siteDetails';
import { footerDetails } from '@/data/footer';
import { getPlatformIconByName } from '@/utils';
import { FaPhone } from 'react-icons/fa6';
import { Mail } from 'lucide-react';

const Footer: React.FC = () => {
    const taglines = [
        "Parentfully. Parenting works better with a system.",
        "Parentfully. More structure. More clarity. Less chaos.",
        "Parentfully. Helping families raise confident, capable children with consistency.",
        "Parentfully. The family operating system for intentional parenting."
    ];
    const selectedTagline = taglines[1];
    return (
        <footer className="relative overflow-hidden bg-[#005A31] pt-20 pb-10 text-white">
            {/* Subtle Background Pattern */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: "url('/images/HeroBG.png')" }}
            />

            {/* Top Border Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-[minmax(360px,1.45fr)_repeat(3,minmax(0,1fr))] lg:gap-10 xl:gap-14">

                    {/* Brand Section */}
                    <div className="col-span-2 min-w-0 lg:col-span-1">
                        <Link href="/" className="inline-flex shrink-0 transition-transform hover:scale-105">
                            <Image
                                src="/icons/ParentFully.png"
                                alt={siteDetails.siteName}
                                width={150}
                                height={80}
                                className="h-auto w-[150px] max-w-none object-contain"
                            />
                        </Link>
                        <p className="mt-6 max-w-md text-base font-semibold leading-relaxed text-emerald-50/85">
                            {footerDetails.subheading}
                        </p>

                        {/* Tagline */}
                        <div className="mt-1 max-w-md border-t border-white/10 pt-5">
                            <p className="text-sm font-bold italic leading-relaxed text-emerald-50/75">
                                {selectedTagline}
                            </p>
                        </div>

                        {/* Social Icons with Glass Effect */}
                        {footerDetails.socials && (
                            <div className="mt-8 flex flex-wrap items-center gap-3">
                                {Object.entries(footerDetails.socials).map(([platformName, url]) => url && (
                                    <Link
                                        href={url}
                                        key={platformName}
                                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#F38500] transition-all hover:-translate-y-1 hover:border-[#F38500] hover:bg-[#F38500]/90"
                                        aria-label={platformName}
                                    >
                                        <span className="text-xl">
                                            {getPlatformIconByName(platformName)}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Quick Links */}
                    <div className="min-w-0">
                        <h4 className="mb-6 text-base font-black uppercase tracking-wide text-white">Explore</h4>
                        <ul className="space-y-4 text-sm font-bold">
                            {footerDetails.quickLinks.map(link => (
                                <li key={link.text}>
                                    <Link
                                        href={link.url}
                                        className="text-emerald-50/85 transition-colors hover:text-[#F38500]"
                                    >
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support/Legal */}
                    <div className="min-w-0">
                        <h4 className="mb-6 text-base font-black uppercase tracking-wide text-white">Support</h4>
                        <ul className="space-y-4 text-sm font-bold text-emerald-50/85">
                            <li><Link href="/privacy" className="transition-colors hover:text-[#F38500]">Privacy Policy</Link></li>
                            <li><Link href="terms" className="transition-colors hover:text-[#F38500]">Terms of Service</Link></li>
                            <li><Link href="/help" className="transition-colors hover:text-[#F38500]">Help Center</Link></li>
                            <li><Link href="/delete" className="transition-colors hover:text-[#F38500]">Account Deletion</Link></li>
                        </ul>
                    </div>

                    {/* Contact Block */}
                    <div className="col-span-2 min-w-0 lg:col-span-1">
                        <h4 className="mb-6 text-base font-black uppercase tracking-wide text-white">Contact</h4>
                        <div className="space-y-5">
                            {footerDetails.email && (
                                <a
                                    href={`mailto:${footerDetails.email}`}
                                    className="flex min-w-0 items-center gap-3 text-sm font-bold text-emerald-50/85 transition-colors hover:text-[#F38500]"
                                >
                                    <span className="shrink-0 opacity-70"><Mail height={15} width={15} /></span>
                                    <span className="break-all">{footerDetails.email}</span>
                                </a>
                            )}
                            {footerDetails.telephone && (
                                <a
                                    href={`tel:${footerDetails.telephone}`}
                                    className="flex items-center gap-3 text-sm font-bold text-emerald-50/85 transition-colors hover:text-[#F38500]"
                                >
                                    <span className="shrink-0 opacity-70"><FaPhone /></span>
                                    <span className="whitespace-nowrap">{footerDetails.telephone}</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
                    <p className="flex flex-wrap items-center justify-center gap-2 text-center text-sm font-bold tracking-wide text-emerald-50/85 md:justify-start md:text-left">
                        &copy; {new Date().getFullYear()} {siteDetails.siteName}.
                        <span className="h-1 w-1 rounded-full bg-emerald-50/30" />
                        <span>Pilandres Solutions Inc.</span>
                    </p>
                    <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-emerald-50/45">
                        <span className="h-1 w-1 rounded-full bg-emerald-50/30" />
                        <span>English (US)</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
