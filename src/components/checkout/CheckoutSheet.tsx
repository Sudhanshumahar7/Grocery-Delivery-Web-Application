'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import Button from '@/components/ui/Button';

interface CheckoutSheetProps {
  total: number;
  onClose: () => void;
}

type PaymentMethod = 'card' | 'cash' | 'bkash';
type DeliveryMethod = 'standard' | 'express';

const DELIVERY_OPTIONS: { id: DeliveryMethod; label: string; cost: number }[] = [
  { id: 'standard', label: 'Standard (45-60 min)', cost: 1.99 },
  { id: 'express', label: 'Express (15-25 min)', cost: 4.99 },
];

export default function CheckoutSheet({ total, onClose }: CheckoutSheetProps) {
  const router = useRouter();
  const clearCart = useCartStore((s) => s.clearCart);

  const [delivery, setDelivery] = useState<DeliveryMethod>('standard');
  const [payment, setPayment] = useState<PaymentMethod>('card');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deliveryCost = DELIVERY_OPTIONS.find((d) => d.id === delivery)?.cost ?? 1.99;
  const discount = promoApplied ? total * 0.1 : 0;
  const finalTotal = total + deliveryCost - discount;

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    // 80% success rate simulation
    const success = Math.random() > 0.2;
    clearCart();
    onClose();
    if (success) {
      router.push('/checkout/success');
    } else {
      router.push('/checkout/failure');
    }
  };

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'nectar10') {
      setPromoApplied(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Sheet */}
      <div className="relative bg-white w-full max-w-lg rounded-t-3xl p-6 animate-slide-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#181725]">Checkout</h2>
          <button onClick={onClose} className="text-[#181725] text-xl hover:opacity-70">
            ✕
          </button>
        </div>

        {/* Delivery */}
        <div className="border-b border-[#E2E2E2] pb-4 mb-4">
          <p className="text-sm font-semibold text-[#7C7C7C] mb-2">Delivery</p>
          <div className="space-y-2">
            {DELIVERY_OPTIONS.map((opt) => (
              <label
                key={opt.id}
                className="flex items-center justify-between cursor-pointer p-3 rounded-xl hover:bg-[#F2F3F2] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      delivery === opt.id ? 'border-[#53B175]' : 'border-[#E2E2E2]'
                    }`}
                    onClick={() => setDelivery(opt.id)}
                  >
                    {delivery === opt.id && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#53B175]" />
                    )}
                  </div>
                  <span className="text-sm text-[#181725]">{opt.label}</span>
                </div>
                <span className="text-sm font-semibold text-[#181725]">
                  +${opt.cost.toFixed(2)}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Payment */}
        <div className="flex items-center justify-between py-4 border-b border-[#E2E2E2]">
          <p className="text-sm font-semibold text-[#181725]">Payment</p>
          <div className="flex gap-2">
            {(['card', 'cash', 'bkash'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPayment(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  payment === p
                    ? 'bg-[#53B175] text-white'
                    : 'bg-[#F2F3F2] text-[#7C7C7C] hover:bg-[#E8F5EE]'
                }`}
              >
                {p === 'card' ? '💳 Card' : p === 'cash' ? '💵 Cash' : '📱 bKash'}
              </button>
            ))}
          </div>
        </div>

        {/* Promo Code */}
        <div className="flex items-center justify-between py-4 border-b border-[#E2E2E2]">
          <p className="text-sm font-semibold text-[#181725]">Promo Code</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="NECTAR10"
              disabled={promoApplied}
              className="w-28 px-3 py-1.5 border border-[#E2E2E2] rounded-lg text-xs outline-none focus:border-[#53B175] disabled:bg-[#F2F3F2] disabled:text-[#7C7C7C]"
            />
            <button
              onClick={handleApplyPromo}
              disabled={promoApplied || !promoCode}
              className="text-xs font-semibold text-[#53B175] disabled:opacity-40"
            >
              {promoApplied ? 'Applied ✓' : 'Apply'}
            </button>
          </div>
        </div>

        {/* Total Cost */}
        <div className="py-4 space-y-2">
          <div className="flex justify-between text-sm text-[#7C7C7C]">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-[#7C7C7C]">
            <span>Delivery</span>
            <span>+${deliveryCost.toFixed(2)}</span>
          </div>
          {promoApplied && (
            <div className="flex justify-between text-sm text-[#53B175]">
              <span>Promo (10%)</span>
              <span>−${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-base font-bold text-[#181725] pt-2 border-t border-[#E2E2E2]">
            <span>Total Cost</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>

        <p className="text-xs text-[#7C7C7C] mb-5">
          By placing an order you agree to our{' '}
          <span className="text-[#181725] font-semibold">Terms</span> And{' '}
          <span className="text-[#181725] font-semibold">Conditions</span>
        </p>

        <Button fullWidth size="lg" isLoading={isLoading} onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </div>
    </div>
  );
}
