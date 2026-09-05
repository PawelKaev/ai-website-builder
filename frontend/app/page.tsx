'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';

export default function HomePage() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">AI Website Builder</h1>
          <nav className="flex gap-4">
            {isAuthenticated ? (
              <>
                <Link href="/builder" className="text-blue-600 hover:underline">Конструктор</Link>
                <Link href="/dashboard" className="text-blue-600 hover:underline">Проекты</Link>
                <span>{user?.full_name || user?.email}</span>
              </>
            ) : (
              <>
                <Link href="/login" className="text-blue-600 hover:underline">Войти</Link>
                <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded">Регистрация</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold mb-4">Создайте сайт с помощью ИИ</h2>
        <p className="text-xl text-gray-600 mb-8">
          Опишите свой бизнес — мы создадим готовый сайт за минуты
        </p>
        <Link href="/builder" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700">
          Начать создание
        </Link>
      </main>
    </div>
  );
}
