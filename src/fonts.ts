import { Inter, Roboto } from 'next/font/google';

// Fallbacks since dummy ttf files fail next/font/local validation
export const moniqa = Inter({
  subsets: ['latin'],
  variable: '--font-moniqa',
  display: 'swap',
});

export const centuryGothic = Roboto({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-century-gothic',
  display: 'swap',
});
