"use client";

import { motion } from "framer-motion";

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-10 h-10 border-4 border-evergreen-forest/20 border-t-evergreen-forest rounded-full animate-spin"></div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="text-secondary-text font-century-gothic text-sm font-medium"
      >
        Подождите немного, страница загружается...
      </motion.p>
    </div>
  );
}
