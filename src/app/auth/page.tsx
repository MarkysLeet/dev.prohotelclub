"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AuthForm from "@/components/AuthForm";

export default function AuthPage() {
  return (
    <main className="min-h-screen flex bg-soft-sand overflow-hidden font-century-gothic">
      {/* Left side: Image */}
      <motion.div
        className="hidden lg:flex w-1/2 relative bg-evergreen-forest"
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
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Mobile branding */}
          <div className="lg:hidden mb-12 text-center">
            <Link href="/" className="text-primary-text font-moniqa text-6xl tracking-wide">
              ProHotelClub
            </Link>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h1 className="font-moniqa text-5xl md:text-6xl text-primary-text mb-3">
              Добро пожаловать
            </h1>
            <p className="text-secondary-text text-lg md:text-xl">
              Эксклюзивный доступ к премиальному каталогу
            </p>
          </div>

          <AuthForm />
        </motion.div>
      </div>
    </main>
  );
}
