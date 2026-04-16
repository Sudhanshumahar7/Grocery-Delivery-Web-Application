'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const isLoading = useAuthStore((s) => s.isLoading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) router.push('/home');
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(160deg, #fdf6f0 0%, #f9f1fb 40%, #eef8f3 100%)' }}>
      <div className="flex-1 flex flex-col px-6 pt-16 pb-10 max-w-sm mx-auto w-full">
        {/* Carrot */}
        <div className="flex justify-center mb-10">
          <span className="text-5xl animate-bounce-gentle">🥕</span>
        </div>

        <h1 className="text-3xl font-bold text-[#181725] mb-1">Login</h1>
        <p className="text-sm text-[#7C7C7C] mb-8">Enter your emails and password</p>

        <div className="bg-white rounded-3xl shadow-sm border border-[#F0F0F0] px-5 py-6 mb-4">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#181725] mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full px-0 py-3 border-b border-[#E2E2E2] text-sm text-[#181725] placeholder-[#7C7C7C] outline-none focus:border-[#53B175] transition-colors bg-transparent"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#181725] mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-0 py-3 border-b border-[#E2E2E2] text-sm text-[#181725] placeholder-[#7C7C7C] outline-none focus:border-[#53B175] transition-colors bg-transparent pr-8"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[#7C7C7C] text-lg"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            <div className="text-right mt-1">
              <button type="button" className="text-xs text-[#53B175] font-medium">
                Forgot Password?
              </button>
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" fullWidth isLoading={isLoading} size="lg">
              Log In
            </Button>
          </div>
        </form>
        </div>

        <p className="text-center text-sm text-[#181725] mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-[#53B175] font-semibold">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
