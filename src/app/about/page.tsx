import Header from "@/components/Header";
import AboutUs from "@/components/AboutUs";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-soft-sand flex flex-col">
      <Header />
      <div className="pt-[56px] lg:pt-[64px] flex-grow w-full">
        <AboutUs />
      </div>
    </main>
  );
}
