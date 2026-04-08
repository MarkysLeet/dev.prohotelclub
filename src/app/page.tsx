import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";

export default function Home() {
  return (
    <main className="min-h-screen bg-soft-sand selection:bg-evergreen-forest selection:text-soft-sand">
      <Header />
      <HeroSlider />
    </main>
  );
}
