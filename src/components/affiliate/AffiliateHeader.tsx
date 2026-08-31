'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Headphones, HelpCircle, Home, Menu, X } from 'lucide-react';

const navigation = [
    { label: 'Home', href: '/affiliate', icon: Home },
    { label: 'Help', href: '/help', icon: HelpCircle },
    { label: 'Support', href: 'mailto:admin@parentfullyapp.com', icon: Headphones },
];

export default function AffiliateHeader() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => setMenuOpen(false), [pathname]);

    return (
        <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
            <nav className="mx-auto max-w-7xl rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-[0_16px_45px_rgba(0,61,34,0.12)] backdrop-blur-xl sm:px-5">
                <div className="flex items-center justify-between gap-4">
                    <Link href="/affiliate" className="flex min-w-0 items-center gap-3" aria-label="Parentfully Affiliate home">
                        <Image
                            src="/icons/ParentFully.png"
                            alt="Parentfully"
                            width={132}
                            height={48}
                            priority
                            className="h-9 w-auto object-contain sm:h-10"
                        />
                        <span className="hidden h-7 w-px bg-slate-200 sm:block" />
                        <span className="hidden text-xs font-black uppercase tracking-[0.15em] text-[#00683A] sm:block">
                            Parentfully Affiliate
                        </span>
                    </Link>

                    <div className="hidden items-center gap-1 md:flex">
                        {navigation.map(({ label, href, icon: Icon }) => {
                            const active = href === '/affiliate' && pathname === '/affiliate';
                            return (
                                <Link
                                    key={label}
                                    href={href}
                                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${active
                                        ? 'bg-[#EAF8F0] text-[#00683A]'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-[#00683A]'
                                        }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {label}
                                </Link>
                            );
                        })}
                    </div>

                    <button
                        type="button"
                        onClick={() => setMenuOpen((open) => !open)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00683A] text-white transition active:scale-95 md:hidden"
                        aria-label={menuOpen ? 'Close affiliate navigation' : 'Open affiliate navigation'}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                {menuOpen && (
                    <div className="mt-3 grid gap-1 border-t border-slate-100 pt-3 md:hidden">
                        {navigation.map(({ label, href, icon: Icon }) => (
                            <Link
                                key={label}
                                href={href}
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-slate-700 transition hover:bg-[#EAF8F0] hover:text-[#00683A]"
                            >
                                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF8F0] text-[#00683A]">
                                    <Icon className="h-4 w-4" />
                                </span>
                                {label}
                            </Link>
                        ))}
                    </div>
                )}
            </nav>
        </header>
    );
}
