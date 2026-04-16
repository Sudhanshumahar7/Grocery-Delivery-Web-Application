'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import CheckoutSheet from '@/components/checkout/CheckoutSheet';
import type { CartItem } from '@/types';

function CartRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex items-center gap-4 py-4 border-b border-[#E2E2E2]">
      {/* Image */}
      <div className="w-16 h-16 bg-[#F2F3F2] rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
        {item.product.image}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-[#181725] truncate">{item.product.name}</p>
        <p className="text-xs text-[#7C7C7C] mt-0.5">{item.product.unit}</p>

        {/* Qty controls */}
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
            className="w-7 h-7 rounded-full border border-[#E2E2E2] flex items-center justify-center text-[#53B175] font-bold hover:bg-[#E8F5EE] transition-colors"
          >
            −
          </button>
          <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
            className="w-7 h-7 rounded-full bg-[#53B175] flex items-center justify-center text-white font-bold hover:bg-[#3a8a55] transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Price & Remove */}
      <div className="flex flex-col items-end gap-2">
        <button
          onClick={() => removeItem(item.product.id)}
          className="text-[#B3B3B3] hover:text-[#F4442E] transition-colors text-sm"
          aria-label="Remove item"
        >
          ✕
        </button>
        <span className="text-sm font-bold text-[#181725]">
          ${(item.product.price * item.quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { items, totalPrice, itemCount, clearCart } = useCartStore();
  const router = useRouter();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const total = totalPrice();
  const count = itemCount();

  if (count === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <span className="text-6xl mb-4">🛒</span>
        <h2 className="text-xl font-bold text-[#181725] mb-2">Your cart is empty</h2>
        <p className="text-sm text-[#7C7C7C] mb-8">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
        <Button onClick={() => router.push('/home')}>Start Shopping</Button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div className="px-4 pt-4 pb-36 lg:px-6 lg:pt-6 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-[#181725]">My Cart</h1>
          <button
            onClick={clearCart}
            className="text-sm text-[#F4442E] font-medium hover:opacity-70 transition-opacity"
          >
            Clear All
          </button>
        </div>

        {/* Cart items */}
        <div>
          {items.map((item) => (
            <CartRow key={item.product.id} item={item} />
          ))}
        </div>
      </div>

      {/* Checkout CTA */}
      <div className="fixed bottom-16 left-0 right-0 px-4 pb-4 bg-white border-t border-[#E2E2E2] lg:bottom-0 lg:relative lg:px-0 lg:pb-0 lg:pt-6 lg:border-0 lg:max-w-2xl lg:mx-auto">
        <Button
          fullWidth
          size="lg"
          onClick={() => setIsCheckoutOpen(true)}
        >
          Go to Checkout
          <span className="ml-auto bg-white/20 px-2.5 py-0.5 rounded-lg text-sm">
            ${total.toFixed(2)}
          </span>
        </Button>
      </div>

      {/* Checkout Sheet */}
      {isCheckoutOpen && (
        <CheckoutSheet
          total={total}
          onClose={() => setIsCheckoutOpen(false)}
        />
      )}
    </div>
  );
}
