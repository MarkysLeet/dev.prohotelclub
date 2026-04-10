import Link from "next/link";
import Header from "@/components/Header";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col bg-soft-sand overflow-hidden font-century-gothic">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10 relative pt-[64px]">
        <h1 className="font-moniqa text-[clamp(100px,15vw,200px)] text-primary-text leading-none m-0 text-evergreen-forest/20">
          404
        </h1>
        <h2 className="font-moniqa text-[clamp(40px,5vw,60px)] text-primary-text mt-4">
          Страница не найдена
        </h2>
        <p className="text-secondary-text text-[clamp(16px,2vw,20px)] mt-4 max-w-md">
          Возможно, она была удалена, переименована или вы ошиблись в адресе.
        </p>
        <Link
          href="/"
          className="mt-8 px-8 py-3 bg-evergreen-forest text-soft-sand rounded-xl hover:bg-evergreen-hover transition-colors font-medium inline-block"
        >
          Вернуться на главную
        </Link>
      </div>
    </main>
  );
}
