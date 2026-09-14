'use client';

import Link from 'next/link';
import { type FormEvent, useState } from 'react';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';

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
    accepted: boolean;
    onChange: (key: keyof SchoolAffiliateFormValues, value: string) => void;
    onAcceptedChange: (accepted: boolean) => void;
    onOpenTerms: () => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const inputClass = 'h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-[15px] text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#00683A] focus:bg-white focus:ring-4 focus:ring-[#00683A]/10';
const labelClass = 'grid gap-2 text-sm font-bold text-slate-800';

export default function SchoolAffiliateApplicationForm({ form, error, submitting, accepted, onChange, onAcceptedChange, onOpenTerms, onSubmit }: SchoolAffiliateApplicationFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

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
                <label className={labelClass}><span>(optional) Number of classes</span><input min="1" step="1" type="number" inputMode="numeric" className={inputClass} value={form.classCount} onChange={(event) => onChange('classCount', event.target.value)} placeholder="e.g. 12" /></label>
                <label className={labelClass}><span>(optional) Approximate number of families</span><input min="1" step="1" type="number" inputMode="numeric" className={inputClass} value={form.familyCount} onChange={(event) => onChange('familyCount', event.target.value)} placeholder="e.g. 300" /></label>
                <label className={labelClass}><span>Create portal password *</span><span className="relative"><input required minLength={8} type={showPassword ? 'text' : 'password'} autoComplete="new-password" className={`${inputClass} pr-12`} value={form.password} onChange={(event) => onChange('password', event.target.value)} placeholder="At least 8 characters" /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword}>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></span></label>
                <label className={labelClass}><span>Confirm portal password *</span><span className="relative"><input required minLength={8} type={showPasswordConfirmation ? 'text' : 'password'} autoComplete="new-password" className={`${inputClass} pr-12`} value={form.passwordConfirmation} onChange={(event) => onChange('passwordConfirmation', event.target.value)} placeholder="Repeat your password" /><button type="button" onClick={() => setShowPasswordConfirmation((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label={showPasswordConfirmation ? 'Hide confirmation password' : 'Show confirmation password'} aria-pressed={showPasswordConfirmation}>{showPasswordConfirmation ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></span></label>
                <div className="grid grid-cols-[1.5rem_minmax(0,1fr)] items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
                    <input id="school-partnership-consent" type="checkbox" checked={accepted} onChange={(event) => onAcceptedChange(event.target.checked)} aria-describedby="school-partnership-consent-copy" className="mt-1 h-5 w-5 cursor-pointer accent-[#00683A]" />
                    <p id="school-partnership-consent-copy" className="min-w-0 break-words text-[15px] font-semibold leading-relaxed text-slate-700 [overflow-wrap:anywhere]">
                        <label htmlFor="school-partnership-consent" className="cursor-pointer">
                            By submitting this application, you confirm that you have read and agreed to
                        </label>{' '}
                        <button type="button" onClick={onOpenTerms} className="inline whitespace-normal text-left font-bold text-[#00683A] underline underline-offset-2">School Partnership Terms and Conditions</button>,{' '}
                        <Link href="/terms" target="_blank" rel="noopener noreferrer" className="font-bold text-[#00683A] underline underline-offset-2">Terms of Use</Link>, and{' '}
                        <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="font-bold text-[#00683A] underline underline-offset-2">Privacy Policy</Link>.
                    </p>
                </div>
                {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700 sm:col-span-2">{error}</div>}
                <div className="flex justify-end border-t border-slate-200 pt-6 sm:col-span-2">
                    <button disabled={submitting || !accepted} type="submit" className="inline-flex min-w-60 items-center justify-center gap-2 rounded-full bg-[#00683A] px-9 py-4 text-sm font-black text-white shadow-[0_16px_35px_rgba(0,104,58,0.22)] transition hover:-translate-y-0.5 hover:bg-[#00552F] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600 disabled:shadow-none disabled:hover:translate-y-0">{submitting ? 'Submitting…' : 'Submit Application'} <ArrowRight className="h-4 w-4" /></button>
                </div>
            </form>
        </>
    );
}
