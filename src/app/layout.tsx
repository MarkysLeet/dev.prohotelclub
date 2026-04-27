import type { Metadata } from "next";
import { moniqa, centuryGothic } from "@/fonts";
import { AuthProvider } from "@/lib/AuthContext";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://prohotelclub.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | ProHotelClub",
    default: "ProHotelClub - Клуб Про Отели",
  },
  description: "B2B SaaS платформа и рабочая база отелей для турагентов. Реальные инсайды об отелях на основе личных инспекций.",
  openGraph: {
    title: "ProHotelClub - Клуб Про Отели",
    description: "B2B SaaS платформа и рабочая база отелей для турагентов.",
    url: siteUrl,
    siteName: "ProHotelClub",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProHotelClub",
    description: "Рабочая база отелей для турагентов",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${moniqa.variable} ${centuryGothic.variable} antialiased`}>
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
