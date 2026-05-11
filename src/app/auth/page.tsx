"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

import Link from "next/link";
import { motion } from "framer-motion";
import AuthForm from "@/components/AuthForm";

export default function AuthPage() {
  const { isAuth, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuth) {
      router.push("/dashboard");
    }
  }, [isAuth, isLoading, router]);

  if (isLoading || isAuth) {
    return (
      <div className="min-h-screen bg-soft-sand flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-evergreen-forest/20 border-t-evergreen-forest rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="h-[100dvh] flex bg-soft-sand overflow-hidden font-century-gothic">
      {/* Left side: Branding / Design */}
      <motion.div
        className="hidden lg:flex flex-col justify-between w-1/2 relative bg-evergreen-forest h-full p-12 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Abstract typography background element */}
        <div className="absolute -right-20 -bottom-20 text-[20rem] font-moniqa text-soft-sand opacity-5 pointer-events-none leading-none select-none">
          PHC
        </div>

        {/* Branding header */}
        <div className="relative z-10">
          <Link href="/" className="text-soft-sand font-moniqa text-6xl tracking-wide hover:opacity-80 transition-opacity">
            ProHotelClub
          </Link>
        </div>

        {/* Messaging */}
        <div className="relative z-10 max-w-md">
          <h2 className="font-moniqa text-5xl text-soft-sand mb-6 leading-tight">
            Эксклюзивная коллекция.
            <br />
            Личные инспекции.
          </h2>
          <p className="font-century-gothic text-soft-sand/80 text-lg leading-relaxed">
            Закрытая B2B платформа для профессиональных турагентов. Только реальные инсайды и проверенные данные об отелях премиум-сегмента.
          </p>
        </div>
      </motion.div>

      {/* Right side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 h-full overflow-y-auto">
        <motion.div
          className="w-full max-w-sm sm:max-w-md flex flex-col pt-8 sm:pt-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Mobile branding */}
          <div className="lg:hidden mb-4 sm:mb-8 text-center shrink-0">
            <Link href="/" className="text-primary-text font-moniqa text-5xl sm:text-6xl tracking-wide">
              ProHotelClub
            </Link>
          </div>

          <div className="mb-6 sm:mb-8 text-center lg:text-left shrink-0">
            <h1 className="font-moniqa text-4xl sm:text-5xl lg:text-6xl text-primary-text mb-2">
              Добро пожаловать
            </h1>
            <p className="text-secondary-text text-base sm:text-lg">
              Эксклюзивный доступ
            </p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col justify-center">
             <AuthForm />
          </div>
        </motion.div>
      </div>
    </main>
  );
}
