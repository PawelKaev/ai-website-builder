import type { Metadata } from 'next';
import { AuthProvider } from '@/lib/AuthContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Website Builder',
  description: 'ИИ-конструктор сайтов',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
