import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { StoreProvider } from "@/store/store";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import ScrollManager from "@/components/ScrollManager";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nouilles Nouilles — Nouilles fraîches maison · Rennes",
  description:
    "Restaurant asiatique à Rennes. Nouilles tirées à la main, bouillons mijotés 12 h, gyozas poêlés. Réservez votre table, 48 rue Legraverend.",
  keywords: [
    "restaurant asiatique Rennes",
    "nouilles fraîches",
    "ramen Rennes",
    "phở Rennes",
    "réservation restaurant Rennes",
  ],
  openGraph: {
    title: "Nouilles Nouilles — Nouilles fraîches maison · Rennes",
    description:
      "Nouilles tirées à la main, bouillons mijotés 12 h, au cœur de Rennes.",
    type: "website",
    locale: "fr_FR",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Nouilles Nouilles",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1b1a16",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if('scrollRestoration' in history){history.scrollRestoration='manual';}",
          }}
        />
      </head>
      <body className={`${fraunces.variable} ${inter.variable} grain`}>
        <LanguageProvider>
          <StoreProvider>{children}</StoreProvider>
        </LanguageProvider>
        <ScrollManager />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
