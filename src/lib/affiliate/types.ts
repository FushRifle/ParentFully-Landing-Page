export type AffiliateCode = {
    id: number;
    code: string;
    is_active: boolean;
};

export type AffiliatePartner = {
    id: number;
    name: string;
    email: string;
    type: 'standard' | 'strategic' | string;
    status: 'active' | 'disabled' | string;
    commission_rate: string | number;
    default_currency: string;
    minimum_payout_minor: number;
    last_login_at?: string | null;
    codes: AffiliateCode[];
};

export type AffiliateDashboardStats = {
    total_referrals: number;
    qualified_referrals: number;
    paid_referrals: number;
    pending_commissions_minor: number;
    payable_commissions_minor: number;
    paid_commissions_minor: number;
    total_commissions_minor: number;
};

export type AffiliateDashboard = {
    partner: AffiliatePartner;
    stats: AffiliateDashboardStats;
};

export type AffiliateReferral = {
    id: number;
    status: string;
    signup_at: string;
    first_family_item_at?: string | null;
    paid_conversion_at?: string | null;
    code?: AffiliateCode | null;
    referred_user?: {
        id: number;
        name: string;
        email: string;
        created_at: string;
    } | null;
};

export type AffiliateCommission = {
    id: number;
    amount_minor: number;
    currency: string;
    commission_rate: string | number;
    commission_amount_minor: number;
    status: string;
    earned_at: string;
    paid_out_at?: string | null;
    referral?: AffiliateReferral | null;
};

export type AffiliatePayout = {
    id: number;
    currency: string;
    amount_minor: number;
    status: string;
    requested_at: string;
    approved_at?: string | null;
    paid_at?: string | null;
    payment_reference?: string | null;
};

export type PaginatedData<T> = {
    current_page: number;
    data: T[];
    last_page: number;
    per_page: number;
    total: number;
};

export type AffiliateApplicationPayload = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone?: string;
    country?: string;
    city?: string;
    audience_type?: string;
    audience_size?: number;
    website_url?: string;
    social_links?: string[];
    payout_method?: string;
    reason?: string;
    requested_commission_rate?: number;
};

export type ApiEnvelope<T> = {
    success?: boolean;
    data: T;
    message?: string;
};
