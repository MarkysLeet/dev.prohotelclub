import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-soft-sand overflow-hidden">
      <Header />
      <Hero />
    </main>
  );
}
