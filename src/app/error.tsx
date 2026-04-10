"use client";

import { useEffect } from "react";
import Header from "@/components/Header";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col bg-soft-sand overflow-hidden font-century-gothic">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10 relative pt-[64px]">
        <h1 className="font-moniqa text-[clamp(60px,8vw,100px)] text-red-600/20 leading-none m-0">
          Ошибка
        </h1>
        <h2 className="font-moniqa text-[clamp(30px,4vw,50px)] text-primary-text mt-4">
          Что-то пошло не так
        </h2>
        <p className="text-secondary-text text-[clamp(16px,2vw,20px)] mt-4 max-w-md">
          Мы уже знаем о проблеме и работаем над ее устранением. Пожалуйста, попробуйте снова.
        </p>
        <button
          onClick={() => reset()}
          className="mt-8 px-8 py-3 bg-evergreen-forest text-soft-sand rounded-xl hover:bg-evergreen-hover transition-colors font-medium"
        >
          Попробовать снова
        </button>
      </div>
    </main>
  );
}
