import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
    subheading: string;
    quickLinks: IMenuItem[];
    email: string;
    telephone: string;
    socials: ISocials;
} = {
    subheading: "Parenting Together Made Simple, Connected & Effective.",
    quickLinks: [
        {
            text: "Features",
            url: "#features"
        },
        {
            text: "About Us",
            url: "#about"
        },
        {
            text: "Benefits",
            url: "#benefits"
        },
        {
            text: "Affiliate",
            url: "/affiliate"
        },

    ],
    email: 'admin@parentfullyapp.com',
    telephone: '+15142497924',
    socials: {
        youtube: 'https://youtube.com',
        instagram: 'https://www.instagram.com/parentfully?igsh=MTMwMzBsbWRwZjk1NA==',
        whatsapp: 'https://wa.me/15142497924',
        facebook: 'https://www.facebook.com/share/1CssLYZ5hR/',
    }
}
