import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Каталог автомобилей',
  description: 'Найдите лучшие автомобили',
  keywords: 'автомобиль, машина, продажа, покупка, каталог',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
          {children}
      </body>
    </html>
  );
}
