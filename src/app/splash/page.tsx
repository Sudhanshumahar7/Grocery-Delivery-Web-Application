'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/onboarding');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#53B175] flex flex-col items-center justify-center px-8">
      <div className="animate-scale-in text-center flex-1 flex flex-col items-center justify-center">
        {/* Logo mark */}
        <div className="flex items-center justify-center mb-5">
          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center shadow-lg">
            <span className="text-5xl select-none">🥕</span>
          </div>
        </div>
        <h1 className="text-white text-5xl font-bold tracking-tight">nectar</h1>
        <p className="text-white/70 text-sm mt-2 tracking-widest uppercase">online grocer</p>
      </div>

      <div className="mb-16 w-full max-w-xs animate-fade-in">
        <button
          onClick={() => router.push('/onboarding')}
          style={{ backgroundColor: '#ffffff', color: '#53B175' }}
          className="w-full py-4 rounded-2xl text-base font-bold shadow-xl hover:opacity-90 active:scale-[0.98] transition-all duration-200"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
