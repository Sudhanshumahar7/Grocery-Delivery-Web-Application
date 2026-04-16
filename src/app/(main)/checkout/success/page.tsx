'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { useEffect, useState } from 'react';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const [confetti, setConfetti] = useState<{ x: number; y: number; color: string }[]>([]);

  useEffect(() => {
    setConfetti(
      Array.from({ length: 20 }).map((_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: ['#53B175', '#F4442E', '#FFD700', '#4B9CF5', '#FF69B4', '#FF6B35'][i % 6],
      }))
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #fef9f2 50%, #f0f4ff 100%)' }}
    >
      {/* Confetti dots */}
      {confetti.map((c, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 rounded-full animate-bounce-gentle"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            backgroundColor: c.color,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}

      <div className="relative z-10 text-center animate-scale-in">
        {/* Big checkmark */}
        <div className="w-32 h-32 bg-[#53B175] rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <span className="text-6xl text-white">✓</span>
        </div>

        <h1 className="text-2xl font-bold text-[#181725] mb-3">
          Your Order has been accepted
        </h1>
        <p className="text-sm text-[#7C7C7C] max-w-xs mx-auto mb-12">
          Your items has been placed and is on its way to being processed
        </p>

        <div className="space-y-3 w-full max-w-xs mx-auto">
          <Button
            fullWidth
            size="lg"
            onClick={() => router.push('/home')}
          >
            Track Order
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
