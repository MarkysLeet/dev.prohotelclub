import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Script from "next/script";
import dynamic from "next/dynamic";

const RecentNews = dynamic(() => import("@/components/RecentNews"), {
  ssr: true, // We can keep SSR true but it will lazy load on client navigation
});

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: true,
});

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ProHotelClub",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://prohotelclub.vercel.app",
    "description": "Exclusive B2B SaaS platform for travel agents",
    "publisher": {
      "@type": "Organization",
      "name": "ProHotelClub",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://prohotelclub.vercel.app"}/window.svg`
      }
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-soft-sand overflow-hidden">
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <div className="pt-[56px] lg:pt-[64px] w-full">
        <Hero />
        <RecentNews />
      </div>
      <Footer />
    </main>
  );
}
