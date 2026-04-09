import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-soft-sand overflow-hidden">
      <Header />
      <div className="pt-[85px] w-full">
        <Hero />
      </div>
    </main>
  );
}
