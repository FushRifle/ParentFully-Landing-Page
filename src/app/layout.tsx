import "./globals.css";
import type { Metadata } from "next";
import { Source_Sans_3, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { siteDetails } from "@/data/siteDetails";

const manrope = Manrope({ subsets: ["latin"] });
const sourceSans = Source_Sans_3({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Parentfully | The Family Operating System',
  description: 'Parentfully is the Family Operating System that helps parents turn good intentions into everyday action. Create routines, build positive habits, set growth goals, coordinate caregivers, and raise thriving children with more clarity and less overwhelm.',
  keywords: [
    "Parenting app",
    "family organizer",
    "shared calendar",
    "child development",
    "life skills for kids",
    "chore tracking",
    "parenting team",
    "nanny app",
    "emotional intelligence kids",
    "character education",
    "family schedule",
  ],
  openGraph: {
    title: 'Raise Thriving Children With More Clarity and Less Overwhelm',
    description: 'Parenting does not have to feel overwhelming. Parentfully helps your family create routines, build habits, achieve growth goals, and stay aligned—all in one simple app.',
    url: siteDetails.siteUrl,
    type: "website",
    images: [
      {
        url: "/images/emote-normal.png",
        width: 1200,
        height: 675,
        alt: siteDetails.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    images: ["/images/emote-zoom.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${siteDetails.googleAnalyticsId}');
            `,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className={`${manrope.className} ${sourceSans.className} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${siteDetails.googleAnalyticsId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <SiteHeader />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
