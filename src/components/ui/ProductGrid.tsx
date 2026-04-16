import type { Product } from '@/types';
import ProductCard from './ProductCard';
import SkeletonCard from './SkeletonCard';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  skeletonCount?: number;
  columns?: 'auto' | '2' | '3' | '4';
  className?: string;
}

const GRID_CLASSES = {
  auto: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
  '2': 'grid-cols-2',
  '3': 'grid-cols-2 md:grid-cols-3',
  '4': 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
};

export default function ProductGrid({
  products,
  isLoading = false,
  skeletonCount = 8,
  columns = 'auto',
  className = '',
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className={`grid gap-3 ${GRID_CLASSES[columns]} ${className}`}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <span className="text-5xl mb-4">🛒</span>
        <p className="text-lg font-semibold text-[#181725]">No products found</p>
        <p className="text-sm text-[#7C7C7C] mt-1">Try a different search or category</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-3 ${GRID_CLASSES[columns]} ${className}`}>
      {products.map((product) => (
        <div key={product.id} className="animate-fade-in">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
