import Header from "@/components/Header";
import AboutUs from "@/components/AboutUs";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-soft-sand overflow-hidden">
      <Header />
      <div className="pt-[56px] lg:pt-[64px] w-full">
        <AboutUs />
      </div>
    </main>
  );
}
