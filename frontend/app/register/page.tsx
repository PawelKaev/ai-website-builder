'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await register(email, password, fullName);
      router.push('/builder');
    } catch (err) {
      setError('Ошибка регистрации');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Регистрация</h2>
        {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Имя" required className="w-full px-4 py-2 border rounded" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full px-4 py-2 border rounded" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль (минимум 8 символов)" required minLength={8} className="w-full px-4 py-2 border rounded" />
          <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50">
            {isLoading ? 'Регистрируем...' : 'Зарегистрироваться'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Уже есть аккаунт? <Link href="/login" className="text-blue-600 hover:underline">Войдите</Link>
        </p>
      </div>
    </div>
  );
}
