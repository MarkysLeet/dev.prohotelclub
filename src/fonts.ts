import localFont from 'next/font/local';

export const moniqa = localFont({
  src: [
    {
      path: '../public/fonts/Moniqa-BoldParagraph.otf', // Used for bold (e.g. 700)
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Moniqa-ExtraBoldParagraph.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/Moniqa-BlackParagraph.otf',
      weight: '900',
      style: 'normal',
    }
  ],
  variable: '--font-moniqa',
  display: 'swap',
});

export const centuryGothic = localFont({
  src: [
    {
      path: '../public/fonts/centurygothic.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/centurygothic_bold.ttf',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-century-gothic',
  display: 'swap',
});
