'use client';

import Link from 'next/link';
import type { FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';

export type SchoolAffiliateFormValues = {
    schoolName: string;
    schoolLocation: string;
    contactPerson: string;
    email: string;
    phone: string;
    classCount: string;
    familyCount: string;
    password: string;
    passwordConfirmation: string;
};

type SchoolAffiliateApplicationFormProps = {
    form: SchoolAffiliateFormValues;
    error: string;
    submitting: boolean;
    onChange: (key: keyof SchoolAffiliateFormValues, value: string) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const inputClass = 'h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-[15px] text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#00683A] focus:bg-white focus:ring-4 focus:ring-[#00683A]/10';
const labelClass = 'grid gap-2 text-sm font-bold text-slate-800';

export default function SchoolAffiliateApplicationForm({ form, error, submitting, onChange, onSubmit }: SchoolAffiliateApplicationFormProps) {
    return (
        <>
            <div className="border-b border-slate-200 pb-6">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-[#BF6500]">School partnership</p>
                <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">Parentfully School Partnership Interest Form</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">Interested in partnering with Parentfully? Complete this short form. We will use the information to create your school partner account and referral link.</p>
            </div>
            <form noValidate onSubmit={onSubmit} className="mt-7 grid gap-5 sm:grid-cols-2">
                <label className={`${labelClass} sm:col-span-2`}><span>School name *</span><input required className={inputClass} value={form.schoolName} onChange={(event) => onChange('schoolName', event.target.value)} placeholder="Enter the school name" /></label>
                <label className={`${labelClass} sm:col-span-2`}><span>School location *</span><input required autoComplete="street-address" className={inputClass} value={form.schoolLocation} onChange={(event) => onChange('schoolLocation', event.target.value)} placeholder="City, state or full address" /></label>
                <label className={`${labelClass} sm:col-span-2`}><span>Contact person’s name and role *</span><input required autoComplete="name" className={inputClass} value={form.contactPerson} onChange={(event) => onChange('contactPerson', event.target.value)} placeholder="e.g. Amaka Obi, Head Teacher" /></label>
                <label className={labelClass}><span>Official email address *</span><input required type="email" autoComplete="email" className={inputClass} value={form.email} onChange={(event) => onChange('email', event.target.value)} placeholder="admin@school.org" /></label>
                <label className={labelClass}><span>Phone number *</span><input required type="tel" autoComplete="tel" className={inputClass} value={form.phone} onChange={(event) => onChange('phone', event.target.value)} placeholder="+234 000 000 0000" /></label>
                <label className={labelClass}><span>Number of classes (optional) </span><input min="1" type="number" inputMode="numeric" className={inputClass} value={form.classCount} onChange={(event) => onChange('classCount', event.target.value)} placeholder="e.g. 12" /></label>
                <label className={labelClass}><span>Approximate number of families (optional) </span><input min="1" type="number" inputMode="numeric" className={inputClass} value={form.familyCount} onChange={(event) => onChange('familyCount', event.target.value)} placeholder="e.g. 300" /></label>
                <label className={labelClass}><span>Create portal password *</span><input required minLength={8} type="password" autoComplete="new-password" className={inputClass} value={form.password} onChange={(event) => onChange('password', event.target.value)} placeholder="At least 8 characters" /></label>
                <label className={labelClass}><span>Confirm portal password *</span><input required minLength={8} type="password" autoComplete="new-password" className={inputClass} value={form.passwordConfirmation} onChange={(event) => onChange('passwordConfirmation', event.target.value)} placeholder="Repeat your password" /></label>
                {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700 sm:col-span-2">{error}</div>}
                <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-md text-xs leading-relaxed text-slate-500">By continuing, you&apos;ll review and accept the <span className="font-black text-[#00683A]">School Partnership Terms and Conditions</span>, <Link href="/terms" target="_blank" className="font-black text-[#00683A] underline underline-offset-2">Terms of Use</Link>, and <Link href="/privacy" target="_blank" className="font-black text-[#00683A] underline underline-offset-2">Privacy Policy</Link> before anything is submitted.</p>
                    <button disabled={submitting} type="submit" className="inline-flex min-w-60 items-center justify-center gap-2 rounded-full bg-[#00683A] px-9 py-4 text-sm font-black text-white shadow-[0_16px_35px_rgba(0,104,58,0.22)] transition hover:-translate-y-0.5 hover:bg-[#00552F] disabled:cursor-not-allowed disabled:opacity-55">Submit Application <ArrowRight className="h-4 w-4" /></button>
                </div>
            </form>
        </>
    );
}
