import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'TupsArt — Заказы',
  description: 'Форма для заказа услуг студии TupsArt',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ru" className="dark">
      <body className="bg-black text-white min-h-screen flex flex-col">
        <header className="p-4 flex justify-center">
          <h1 className="text-4xl font-bold text-primary">TupsArt</h1>
        </header>
        <main className="flex-grow p-4">{children}</main>
        <footer className="p-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} TupsArt. Все права защищены.
        </footer>
      </body>
    </html>
  );
}
