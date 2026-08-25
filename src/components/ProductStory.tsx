import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const growthAreas = [
    'Social',
    'Emotional',
    'Character & Values',
    'Life Skills & Responsibility',
    'Academic & Learning',
    'Health, Safety & Well-being',
];

const StartFree = ({ accent = false }: { accent?: boolean }) => (
    <Link
        href="/download"
        className={`group inline-flex items-center gap-3 rounded-full px-7 py-4 font-black shadow-lg transition hover:-translate-y-0.5 ${accent ? 'bg-[#F38500] text-white hover:bg-[#d87500]' : 'bg-[#005A31] text-white hover:bg-[#004825]'}`}
    >
        Start Free
        <span className="flex -space-x-1.5">
            <span className={`flex h-6 w-6 items-center justify-center rounded-full bg-black ring-2 ${accent ? 'ring-[#F38500]' : 'ring-[#005A31]'}`}>
                <Image src="/icons/apple5.png" alt="iOS" width={13} height={13} className="invert" />
            </span>
            <span className={`flex h-6 w-6 items-center justify-center rounded-full bg-white ring-2 ${accent ? 'ring-[#F38500]' : 'ring-[#005A31]'}`}>
                <Image src="/icons/google.png" alt="Android" width={13} height={13} />
            </span>
        </span>
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
    </Link>
);

export default function ProductStory() {
    return (
        <>
            <section className="bg-white py-20 lg:py-28">
                <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:items-center">
                    <div>
                        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#bf6500]">01 — Intentional growth</p>
                        <h2 className="mt-4 text-4xl font-black leading-[1.04] text-gray-950 text-balance sm:text-5xl">Don&apos;t Just Hope They&apos;ll Grow Into It. Build It.</h2>
                        <p className="mt-6 max-w-2xl text-xl font-bold leading-relaxed text-[#005A31]">You want your child to become confident. Responsible. Independent. Emotionally strong. Kind. Capable.</p>
                        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">Parentfully helps you intentionally build the habits that help them get there.</p>
                        <div className="mt-8"><StartFree /></div>
                    </div>
                    <div className="border-l-2 border-[#F38500] bg-[#f8fbf9] px-6 py-7 sm:px-8">
                        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#005A31]">What this looks like</p>
                        <h3 className="mt-4 text-2xl font-black text-[#005A31]">Set Whole-Child Growth Goals</h3>
                        <p className="mt-3 leading-relaxed text-gray-600">Choose what you want to develop in your child, or start with an age-appropriate goal already created for you.</p>
                        <p className="mt-3 leading-relaxed text-gray-600">Break bigger goals into practical skills and everyday actions you can teach, practise and track.</p>
                        <p className="mt-6 text-sm font-black uppercase tracking-wide text-[#005A31]">Build skills and habits across</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {growthAreas.map((area) => <span key={area} className="border-b border-[#005A31]/15 py-1 text-sm font-bold text-gray-700">{area}</span>)}
                        </div>
                    </div>
                </div>
            </section>

            <section className="overflow-hidden bg-[#005A31] py-20 lg:py-28">
                <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                    <div className="relative order-2 mx-auto w-full max-w-[280px] lg:order-1">
                        <Image src="/images/Hero.png" alt="Parentfully routines screen" width={623} height={1280} className="h-auto w-full" />
                    </div>
                    <div className="order-1 text-center lg:order-2 lg:text-left">
                        <p className="text-sm font-black uppercase tracking-[0.16em] text-orange-200">02 — Everyday independence</p>
                        <h2 className="mt-4 text-4xl font-black leading-[1.04] text-white text-balance sm:text-5xl">Build Habits, Responsibility &amp; Independence</h2>
                        <p className="mt-6 text-lg leading-relaxed text-white/85">Turn the things you constantly remind your child to do into routines they can learn to manage themselves.</p>
                        <p className="mt-4 text-lg leading-relaxed text-white/85">Start with a ready-made routine or create your own. Your child can open Kid Mode, see what they need to do, check off their tasks, earn points, build streaks and work toward rewards.</p>
                        <p className="mt-6 text-xl font-black text-orange-100">Less reminding for you. More ownership for them.</p>
                    </div>
                </div>
            </section>

            <section className="bg-[#fffaf5] py-20 lg:py-28">
                <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                    <div>
                        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#bf6500]">03 — Family structure</p>
                        <h2 className="mt-4 text-4xl font-black leading-[1.04] text-gray-950 text-balance sm:text-5xl">Bring More Structure to Family Life</h2>
                        <p className="mt-6 text-lg leading-relaxed text-gray-600">Whether you&apos;re parenting on your own, together under one roof, across households, or co-parenting after separation or divorce, Parentfully gives you one place to keep parenting and family life organized.</p>
                        <p className="mt-4 text-lg leading-relaxed text-gray-600">Keep routines, schedules, responsibilities, house rules, discipline plans, meals, journals and child-related expenses together.</p>
                        <p className="mt-4 text-lg leading-relaxed text-gray-600">Invite a partner, co-parent or caregiver when you need to, so everyone supporting your child can stay informed and aligned.</p>
                        <p className="mt-6 text-xl font-black text-[#005A31]">Less to hold in your head. More clarity for everyone raising your child.</p>
                    </div>
                    <aside className="border border-gray-200 bg-white p-7 sm:p-9">
                        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#005A31]">Built to fit real life</p>
                        <h3 className="mt-4 text-2xl font-black text-gray-950">However You Parent, Parentfully Fits</h3>
                        <p className="mt-5 text-lg font-bold leading-relaxed text-[#005A31]">Parenting Solo · Together · Across Households · Co-Parenting · With Caregivers</p>
                        <div className="mt-8"><StartFree /></div>
                    </aside>
                </div>
            </section>

            <section className="bg-[#E2FDF8] py-20 text-center lg:py-28">
                <div className="mx-auto max-w-4xl px-4 sm:px-6">
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-[#bf6500]">A system that grows with your family</p>
                    <h2 className="mt-4 text-4xl font-black leading-[1.04] text-gray-950 text-balance sm:text-5xl">From “I Want My Child To…” to “This Is How We&apos;re Building It.”</h2>
                    <p className="mt-6 text-xl leading-relaxed text-gray-700">Parenting intentions are easy to have. Consistency is harder.</p>
                    <p className="mt-4 text-lg leading-relaxed text-gray-600">Parentfully gives your intentions somewhere to live—and helps you bring them into everyday family life.</p>
                    <p className="mt-7 text-xl font-bold leading-relaxed text-[#005A31]">Whole-child growth. Stronger habits. Greater responsibility and independence. More consistent parenting. A more organized family.</p>
                    <p className="mt-4 text-2xl font-black text-gray-950">One Family Operating System for raising thriving children.</p>
                    <div className="mt-8"><StartFree /></div>
                </div>
            </section>
        </>
    );
}
