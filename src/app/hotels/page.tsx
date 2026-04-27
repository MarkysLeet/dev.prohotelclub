import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GlobalSearch } from "@/components/GlobalSearch";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Каталог отелей",
  description: "Лучшие отели и предложения от экспертов ProHotelClub.",
};

export default function HotelsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-soft-sand">
      <Header />
      <div className="pt-[56px] lg:pt-[64px] flex-1 flex flex-col">
        <GlobalSearch />
      </div>
      <Footer />
    </main>
  );
}
