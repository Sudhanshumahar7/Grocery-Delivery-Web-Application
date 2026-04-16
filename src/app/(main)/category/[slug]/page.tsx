'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProductStore } from '@/store/useProductStore';
import { CATEGORY_META } from '@/lib/mockData';
import ProductGrid from '@/components/ui/ProductGrid';
import SearchBar from '@/components/ui/SearchBar';

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const slug = decodeURIComponent(params.slug as string);

  const { loadProducts, getProductsByCategory, isLoading, searchQuery, setSearchQuery } = useProductStore();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const catMeta = CATEGORY_META.find((c) => c.slug === slug);
  const products = getProductsByCategory(slug as never);

  return (
    <div className="px-4 pt-4 pb-4 lg:px-6 lg:pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => router.back()} className="w-9 h-9 flex items-center justify-center">
          <span className="text-xl text-[#181725]">←</span>
        </button>
        <h1 className="text-lg font-bold text-[#181725]">
          {catMeta?.label ?? slug}
        </h1>
        <button className="w-9 h-9 flex items-center justify-center">
          <span className="text-xl">⚙️</span>
        </button>
      </div>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder={`Search in ${catMeta?.label ?? slug}`}
        className="mb-5"
      />

      <ProductGrid
        products={products}
        isLoading={isLoading}
        columns="auto"
        skeletonCount={6}
      />
    </div>
  );
}
