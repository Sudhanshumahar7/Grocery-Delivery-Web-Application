'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export default function RootPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/home');
    } else {
      router.replace('/splash');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-[#53B175] flex items-center justify-center">
      <div className="text-center text-white animate-pulse">
        <div className="text-5xl mb-4">🥕</div>
        <p className="text-xl font-bold">nectar</p>
      </div>
    </div>
  );
}
