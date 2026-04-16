'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function CheckoutFailurePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Error modal overlay style */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full animate-scale-in text-center">
        {/* Close */}
        <div className="flex justify-end mb-2">
          <button
            onClick={() => router.push('/home')}
            className="text-[#7C7C7C] hover:text-[#181725] text-xl"
          >
            ✕
          </button>
        </div>

        {/* Bag illustration */}
        <div className="w-28 h-28 bg-[#E8F5EE] rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-6xl">🛍️</span>
        </div>

        <h2 className="text-xl font-bold text-[#181725] mb-2">Oops! Order Failed</h2>
        <p className="text-sm text-[#7C7C7C] mb-8">Something went terribly wrong.</p>

        <div className="space-y-3">
          <Button
            fullWidth
            size="lg"
            onClick={() => router.push('/cart')}
          >
            Please Try Again
          </Button>
          <button
            onClick={() => router.push('/home')}
            className="w-full text-sm font-semibold text-[#181725] py-2 hover:text-[#53B175] transition-colors"
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}
