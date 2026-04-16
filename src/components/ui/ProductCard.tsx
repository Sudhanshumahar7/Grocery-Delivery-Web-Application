'use client';

import { useCartStore } from '@/store/useCartStore';
import { useProductStore } from '@/store/useProductStore';
import type { Product } from '@/types';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const getItemQuantity = useCartStore((s) => s.getItemQuantity);
  const isInCart = useCartStore((s) => s.isInCart);
  const toggleFavorite = useProductStore((s) => s.toggleFavorite);
  const isFavorite = useProductStore((s) => s.isFavorite);

  const quantity = getItemQuantity(product.id);
  const inCart = isInCart(product.id);
  const fav = isFavorite(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (quantity <= 1) removeItem(product.id);
    else updateQuantity(product.id, quantity - 1);
  };

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(product.id);
  };

  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="bg-white rounded-2xl border border-[#E2E2E2] p-3 hover:shadow-md transition-all duration-200 group relative overflow-hidden">
        {/* Favorite */}
        <button
          onClick={handleFav}
          className="absolute top-2 right-2 z-10 text-lg leading-none"
          aria-label={fav ? 'Remove from favourites' : 'Add to favourites'}
        >
          {fav ? '❤️' : '🤍'}
        </button>

        {/* Image */}
        <div className="w-full aspect-square flex items-center justify-center text-5xl mb-2 select-none bg-[#F2F3F2] rounded-xl group-hover:scale-105 transition-transform duration-200">
          {product.image}
        </div>

        {/* Info */}
        <p className="text-[11px] text-[#7C7C7C] truncate">{product.unit}</p>
        <h3 className="text-sm font-semibold text-[#181725] mt-0.5 line-clamp-2 leading-snug">
          {product.name}
        </h3>

        {/* Price & Cart */}
        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="text-base font-bold text-[#181725]">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="ml-1.5 text-xs line-through text-[#7C7C7C]">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {inCart ? (
            <div
              className="flex items-center gap-1.5"
              onClick={(e) => e.preventDefault()}
            >
              <button
                onClick={handleDecrement}
                className="w-7 h-7 rounded-full bg-[#F2F3F2] flex items-center justify-center text-[#53B175] font-bold text-lg leading-none hover:bg-[#E8F5EE] transition-colors"
              >
                −
              </button>
              <span className="text-sm font-semibold w-4 text-center">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="w-7 h-7 rounded-full bg-[#53B175] flex items-center justify-center text-white font-bold text-lg leading-none hover:bg-[#3a8a55] transition-colors"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className="w-8 h-8 rounded-full bg-[#53B175] flex items-center justify-center text-white text-xl font-light hover:bg-[#3a8a55] transition-all active:scale-90"
              aria-label={`Add ${product.name} to cart`}
            >
              +
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
