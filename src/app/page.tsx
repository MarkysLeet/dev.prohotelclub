import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RecentNews from "@/components/RecentNews";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-soft-sand overflow-hidden">
      <Header />
      <div className="pt-[56px] lg:pt-[64px] w-full">
        <Hero />
        <RecentNews />
      </div>
    </main>
  );
}
