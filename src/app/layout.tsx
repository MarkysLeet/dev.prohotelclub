import type { Metadata } from "next";
import { moniqa, centuryGothic } from "@/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProHotelClub",
  description: "Exclusive B2B SaaS platform for travel agents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${moniqa.variable} ${centuryGothic.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
