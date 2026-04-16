'use client';

import { useEffect, useState } from 'react';
import { useProductStore } from '@/store/useProductStore';
import { CATEGORY_META } from '@/lib/mockData';
import SearchBar from '@/components/ui/SearchBar';
import CategoryCard from '@/components/ui/CategoryCard';
import ProductGrid from '@/components/ui/ProductGrid';
import { useRouter } from 'next/navigation';

export default function ExplorePage() {
  const router = useRouter();
  const { loadProducts, products, isLoading, searchQuery, setSearchQuery } = useProductStore();
  const [query, setQuery] = useState('');

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleSearch = (val: string) => {
    setQuery(val);
    setSearchQuery(val);
    if (val.trim()) {
      router.push('/search');
    }
  };

  return (
    <div className="px-4 pt-4 pb-4 lg:px-6 lg:pt-6">
      <h1 className="text-xl font-bold text-[#181725] text-center mb-4 lg:hidden">
        Find Products
      </h1>

      <SearchBar
        value={query}
        onChange={handleSearch}
        placeholder="Search Store"
        className="mb-6"
      />

      {/* Desktop view: show all products grid + categories sidebar-like */}
      <div className="hidden lg:block">
        <h2 className="text-lg font-bold text-[#181725] mb-4">All Categories</h2>
        <div className="grid grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
          {CATEGORY_META.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
        <h2 className="text-lg font-bold text-[#181725] mb-4">All Products</h2>
        <ProductGrid products={products} isLoading={isLoading} columns="auto" />
      </div>

      {/* Mobile view: 2-col category grid */}
      <div className="lg:hidden">
        <div className="grid grid-cols-2 gap-3">
          {CATEGORY_META.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </div>
    </div>
  );
}
