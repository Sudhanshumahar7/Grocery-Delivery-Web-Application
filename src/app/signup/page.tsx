'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/store/useAuthStore';

export default function SignupPage() {
  const router = useRouter();
  const signup = useAuthStore((s) => s.signup);
  const isLoading = useAuthStore((s) => s.isLoading);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailValid, setEmailValid] = useState<boolean | null>(null);

  const validateEmail = (val: string) => {
    setEmail(val);
    setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await signup(name, email, password);
    if (success) router.push('/home');
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(160deg, #fdf6f0 0%, #f9f1fb 40%, #eef8f3 100%)' }}>
      <div className="flex-1 flex flex-col px-6 pt-16 pb-10 max-w-sm mx-auto w-full">
        {/* Carrot */}
        <div className="flex justify-center mb-10">
          <span className="text-5xl animate-bounce-gentle">🥕</span>
        </div>

        <h1 className="text-3xl font-bold text-[#181725] mb-1">Sign Up</h1>
        <p className="text-sm text-[#7C7C7C] mb-8">Enter your credentials to continue</p>

        <div className="bg-white rounded-3xl shadow-sm border border-[#F0F0F0] px-5 py-6 mb-4">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-[#181725] mb-1.5">Username</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Afsar Hossen Shuvo"
              required
              className="w-full px-0 py-3 border-b border-[#E2E2E2] text-sm text-[#181725] placeholder-[#7C7C7C] outline-none focus:border-[#53B175] transition-colors bg-transparent"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#181725] mb-1.5">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => validateEmail(e.target.value)}
                placeholder="imshuvo97x@gmail.com"
                required
                className="w-full px-0 py-3 border-b border-[#E2E2E2] text-sm text-[#181725] placeholder-[#7C7C7C] outline-none focus:border-[#53B175] transition-colors bg-transparent pr-6"
              />
              {emailValid !== null && (
                <span className="absolute right-0 top-1/2 -translate-y-1/2">
                  {emailValid ? '✅' : '❌'}
                </span>
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#181725] mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
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
          </div>

          <p className="text-xs text-[#7C7C7C] pt-1">
            By continuing you agree to our{' '}
            <span className="text-[#53B175] font-medium">Terms of Service</span> and{' '}
            <span className="text-[#53B175] font-medium">Privacy Policy</span>.
          </p>

          <div className="pt-2">
            <Button type="submit" fullWidth isLoading={isLoading} size="lg">
              Sign Up
            </Button>
          </div>
        </form>
        </div>

        <p className="text-center text-sm text-[#181725] mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[#53B175] font-semibold">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
