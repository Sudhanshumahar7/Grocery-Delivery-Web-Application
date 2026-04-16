'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProductStore } from '@/store/useProductStore';
import { useCartStore } from '@/store/useCartStore';
import { fetchProductById } from '@/lib/mockData';
import type { Product } from '@/types';
import Button from '@/components/ui/Button';
import QuantitySelector from '@/components/ui/QuantitySelector';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const isInCart = useCartStore((s) => s.isInCart);
  const getItemQuantity = useCartStore((s) => s.getItemQuantity);
  const toggleFavorite = useProductStore((s) => s.toggleFavorite);
  const isFavorite = useProductStore((s) => s.isFavorite);

  useEffect(() => {
    fetchProductById(id).then((p) => {
      setProduct(p ?? null);
      if (p) {
        const q = getItemQuantity(p.id);
        setQuantity(q > 0 ? q : 1);
      }
      setIsLoading(false);
    });
  }, [id, getItemQuantity]);

  const handleAddToBasket = () => {
    if (!product) return;
    if (isInCart(product.id)) {
      updateQuantity(product.id, quantity);
    } else {
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
    }
    router.push('/cart');
  };

  if (isLoading) {
    return (
      <div className="px-4 pt-4">
        <div className="w-full aspect-square skeleton rounded-2xl mb-4" />
        <div className="h-6 w-3/4 skeleton mb-2" />
        <div className="h-4 w-1/2 skeleton mb-4" />
        <div className="h-10 w-full skeleton rounded-2xl" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <span className="text-5xl mb-4">😕</span>
        <p className="text-lg font-semibold text-[#181725]">Product not found</p>
        <button onClick={() => router.back()} className="mt-4 text-[#53B175] font-medium">
          Go back
        </button>
      </div>
    );
  }

  const fav = isFavorite(product.id);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Product image hero */}
      <div className="relative bg-[#F2F3F2] w-full aspect-square lg:aspect-video flex items-center justify-center">
        <span className="text-[160px] select-none">{product.image}</span>

        {/* Top controls */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow text-[#181725]"
        >
          ←
        </button>
        <button
          onClick={() => toggleFavorite(product.id)}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow text-xl"
        >
          {fav ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pt-5 pb-32 lg:max-w-2xl lg:mx-auto lg:w-full">
        {/* Name & qty */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-[#181725]">{product.name}</h1>
            <p className="text-sm text-[#7C7C7C] mt-0.5">{product.unit}</p>
          </div>
          <span className="text-2xl font-extrabold text-[#181725] mt-1">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Quantity selector */}
        <div className="flex items-center gap-4 mb-6">
          <QuantitySelector
            quantity={quantity}
            onIncrement={() => setQuantity((q) => q + 1)}
            onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
            size="md"
          />
        </div>

        {/* Product Detail accordion */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center justify-between w-full py-3 border-b border-[#E2E2E2]"
        >
          <span className="text-sm font-bold text-[#181725]">Product Detail</span>
          <span className="text-[#7C7C7C]">{showDetails ? '↑' : '↓'}</span>
        </button>
        {showDetails && (
          <p className="text-sm text-[#7C7C7C] py-3 leading-relaxed">
            {product.description}
          </p>
        )}

        {/* Nutrition */}
        {product.nutrition && (
          <div className="flex items-center justify-between py-3 border-b border-[#E2E2E2]">
            <span className="text-sm font-bold text-[#181725]">Nutritions</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#7C7C7C] bg-[#F2F3F2] px-2 py-1 rounded-lg">
                {product.nutrition.calories} kcal
              </span>
              <span className="text-[#7C7C7C]">→</span>
            </div>
          </div>
        )}

        {/* Reviews */}
        {product.rating && (
          <div className="flex items-center justify-between py-3 border-b border-[#E2E2E2]">
            <span className="text-sm font-bold text-[#181725]">Review</span>
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400 text-sm">
                {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
              </div>
              <span className="text-[#7C7C7C]">→</span>
            </div>
          </div>
        )}
      </div>

      {/* Add to basket CTA */}
      <div className="fixed bottom-16 left-0 right-0 px-5 pb-4 bg-white border-t border-[#E2E2E2] lg:bottom-0 lg:relative lg:border-0 lg:px-0 lg:pb-0 lg:pt-4 lg:max-w-2xl lg:mx-auto lg:w-full">
        <Button fullWidth size="lg" onClick={handleAddToBasket}>
          Add To Basket
        </Button>
      </div>
    </div>
  );
}
