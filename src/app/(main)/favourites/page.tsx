'use client';

import { useProductStore } from '@/store/useProductStore';
import { useCartStore } from '@/store/useCartStore';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function FavouritesPage() {
  const favorites = useProductStore((s) => s.favorites);
  const toggleFavorite = useProductStore((s) => s.toggleFavorite);
  const addItem = useCartStore((s) => s.addItem);

  const favoriteProducts = MOCK_PRODUCTS.filter((p) => favorites.includes(p.id));

  const handleAddAll = () => {
    favoriteProducts.forEach((p) => addItem(p));
  };

  if (favoriteProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <span className="text-6xl mb-4">❤️</span>
        <h2 className="text-xl font-bold text-[#181725] mb-2">No favourites yet</h2>
        <p className="text-sm text-[#7C7C7C] mb-8">
          Heart products you love to save them here.
        </p>
        <Button onClick={() => {}}>
          <Link href="/home">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="px-4 pt-4 pb-36 lg:px-6 lg:pt-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-[#181725] text-center mb-6">Favourite</h1>

      {/* Favourite rows */}
      <div className="bg-white rounded-2xl overflow-hidden border border-[#E2E2E2]">
        {favoriteProducts.map((product, index) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className={`flex items-center gap-4 px-4 py-3.5 hover:bg-gray-50 transition-colors group ${
              index < favoriteProducts.length - 1 ? 'border-b border-[#E2E2E2]' : ''
            }`}
          >
            {/* Image */}
            <div className="w-14 h-14 bg-[#F2F3F2] rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
              {product.image}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#181725] truncate">{product.name}</p>
              <p className="text-xs text-[#7C7C7C] mt-0.5">{product.unit}</p>
            </div>

            {/* Price & arrow */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#181725]">
                ${product.price.toFixed(2)}
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(product.id);
                }}
                className="w-6 h-6 text-[#B3B3B3] hover:text-[#F4442E] transition-colors"
                aria-label="Remove from favourites"
              >
                ×
              </button>
              <span className="text-[#7C7C7C] group-hover:text-[#53B175] transition-colors">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Add All CTA */}
      <div className="fixed bottom-16 left-0 right-0 px-4 pb-4 bg-white border-t border-[#E2E2E2] lg:bottom-0 lg:relative lg:px-0 lg:pb-0 lg:pt-6 lg:border-0 lg:max-w-2xl lg:mx-auto">
        <Button fullWidth size="lg" onClick={handleAddAll}>
          Add All To Cart
        </Button>
      </div>
    </div>
  );
}
