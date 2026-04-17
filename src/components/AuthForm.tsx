"use client";
import { createClient } from "@/lib/supabase-browser";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail01Icon, LockPasswordIcon, UserIcon } from "hugeicons-react";
import { Eye, EyeOff } from "lucide-react";

type AuthMode = "login" | "register";

export default function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");

  const router = useRouter();
  const supabase = createClient();

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "register" : "login"));
    setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      if (mode === "register") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
            }
          }
        });

        if (error) throw error;

        // Auto sign in or show message to check email
        router.push("/");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        router.push("/");
      }
    } catch (error: unknown) {
      console.error("Auth error:", error);
      if (error instanceof Error) {
        let msg = error.message;
        if (msg.includes("Email not confirmed")) {
          msg = "Email не подтвержден. Пожалуйста, проверьте вашу почту.";
        } else if (msg.includes("Invalid login credentials")) {
          msg = "Неверный email или пароль.";
        } else if (msg.includes("User already registered")) {
          msg = "Пользователь с таким email уже зарегистрирован.";
        } else if (msg.includes("Password should be at least")) {
          msg = "Пароль должен содержать минимум 6 символов.";
        }
        setErrorMsg(msg || "Произошла ошибка при авторизации");
      } else {
        setErrorMsg("Произошла ошибка при авторизации");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: unknown) {
      console.error("Google auth error:", error);
      if (error instanceof Error) {
        setErrorMsg(error.message || "Произошла ошибка при авторизации через Google");
      } else {
        setErrorMsg("Произошла ошибка при авторизации через Google");
      }
      setIsLoading(false);
    }
  };

  const animationVariants = {
    initial: { opacity: 0, height: 0, overflow: 'hidden' },
    animate: { opacity: 1, height: 'auto', overflow: 'visible' },
    exit: { opacity: 0, height: 0, overflow: 'hidden' },
  };

  return (
    <div className="w-full flex flex-col">
      {errorMsg && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
          {errorMsg}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <AnimatePresence mode="wait">
          {mode === "register" && (
            <motion.div
              key="name-field"
              variants={animationVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <div className="pb-4 sm:pb-0">
                <label htmlFor="name" className="block text-sm text-secondary-text mb-1.5 ml-1">
                  Имя
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-secondary-text">
                    <UserIcon size={20} strokeWidth={1.5} />
                  </div>
                  <input
                    id="name"
                    type="text"
                    required={mode === "register"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ваше имя"
                    className="w-full pl-11 pr-4 py-3 sm:py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-evergreen-forest focus:border-evergreen-forest transition-colors text-primary-text placeholder-gray-400"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div layout>
          <label htmlFor="email" className="block text-sm text-secondary-text mb-1.5 ml-1">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-secondary-text">
              <Mail01Icon size={20} strokeWidth={1.5} />
            </div>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="agent@example.com"
              className="w-full pl-11 pr-4 py-3 sm:py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-evergreen-forest focus:border-evergreen-forest transition-colors text-primary-text placeholder-gray-400"
            />
          </div>
        </motion.div>

        <motion.div layout>
          <div className="flex justify-between items-center mb-1.5 ml-1">
            <label htmlFor="password" className="block text-sm text-secondary-text">
              Пароль
            </label>
            {mode === "login" && (
              <button type="button" className="text-sm text-secondary-text hover:text-evergreen-forest transition-colors">
                Забыли пароль?
              </button>
            )}
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-secondary-text">
              <LockPasswordIcon size={20} strokeWidth={1.5} />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-11 pr-12 py-3 sm:py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-evergreen-forest focus:border-evergreen-forest transition-colors text-primary-text placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-secondary-text hover:text-evergreen-forest transition-colors"
              aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
            >
              {showPassword ? (
                <EyeOff size={20} strokeWidth={1.5} />
              ) : (
                <Eye size={20} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </motion.div>

        <motion.div layout className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 sm:py-4 bg-evergreen-forest text-soft-sand rounded-xl hover:bg-evergreen-hover transition-colors font-medium flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-soft-sand/30 border-t-soft-sand rounded-full animate-spin" />
            ) : mode === "login" ? (
              "Войти в систему"
            ) : (
              "Создать аккаунт"
            )}
          </button>
        </motion.div>
      </form>

      <motion.div layout className="mt-6 sm:mt-8 relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-soft-sand text-secondary-text">или</span>
        </div>
      </motion.div>

      <motion.div layout className="mt-6 sm:mt-8">
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full py-3 sm:py-3.5 bg-white border border-gray-200 text-primary-text rounded-xl hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {/* Custom minimal Google SVG icon to fit the design system */}
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.89 16.81 15.73 17.58V20.35H19.3C21.39 18.43 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
            <path d="M12 23C14.97 23 17.46 22.02 19.3 20.35L15.73 17.58C14.74 18.25 13.48 18.66 12 18.66C9.14 18.66 6.71 16.73 5.84 14.15H2.15V17C4.01 20.68 7.69 23 12 23Z" fill="#34A853"/>
            <path d="M5.84 14.15C5.61 13.48 5.48 12.76 5.48 12C5.48 11.24 5.61 10.52 5.84 9.85V7H2.15C1.39 8.52 0.95 10.21 0.95 12C0.95 13.79 1.39 15.48 2.15 17L5.84 14.15Z" fill="#FBBC05"/>
            <path d="M12 5.34C13.62 5.34 15.06 5.9 16.2 6.98L19.38 3.8C17.45 2.01 14.96 0.95 12 0.95C7.69 0.95 4.01 3.32 2.15 7L5.84 9.85C6.71 7.27 9.14 5.34 12 5.34Z" fill="#EA4335"/>
          </svg>
          Продолжить с Google
        </button>
      </motion.div>

      <motion.p layout className="mt-6 sm:mt-10 text-center text-sm text-secondary-text pb-2">
        {mode === "login" ? "У вас еще нет аккаунта? " : "Уже есть аккаунт? "}
        <button
          onClick={toggleMode}
          type="button"
          className="text-evergreen-forest font-medium hover:underline focus:outline-none"
        >
          {mode === "login" ? "Зарегистрироваться" : "Войти"}
        </button>
      </motion.p>
    </div>
  );
}
