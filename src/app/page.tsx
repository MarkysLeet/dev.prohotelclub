import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-soft-sand overflow-x-hidden">
      <Header />
      <Hero />
    </main>
  );
}
