"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AuthForm from "@/components/AuthForm";

export default function AuthPage() {
  return (
    <main className="h-[100dvh] flex bg-soft-sand overflow-hidden font-century-gothic">
      {/* Left side: Image */}
      <motion.div
        className="hidden lg:flex w-1/2 relative bg-evergreen-forest h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="https://images.unsplash.com/photo-1542314831-c6a4d14d8373?q=80&w=2070&auto=format&fit=crop"
          alt="Premium luxury hotel interior"
          fill
          priority
          className="object-cover"
        />
        {/* Overlay gradient to make text on top (if any) readable, though we just keep it clean */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Simple branding badge on image */}
        <div className="absolute top-12 left-12">
          <Link href="/" className="text-white font-moniqa text-5xl tracking-wide hover:opacity-80 transition-opacity">
            ProHotelClub
          </Link>
        </div>
      </motion.div>

      {/* Right side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 h-full">
        <motion.div
          className="w-full max-w-sm sm:max-w-md flex flex-col justify-center h-full max-h-[850px]"
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
