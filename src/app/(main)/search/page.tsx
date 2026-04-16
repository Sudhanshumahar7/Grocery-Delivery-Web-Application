'use client';

import { useEffect, useState } from 'react';
import { useProductStore } from '@/store/useProductStore';
import { CATEGORY_META } from '@/lib/mockData';
import { ProductCategory } from '@/types';
import SearchBar from '@/components/ui/SearchBar';
import ProductGrid from '@/components/ui/ProductGrid';
import Button from '@/components/ui/Button';

const ALL_BRANDS = ['Individual Collection', 'Cocola', 'Ifad', 'Kazi Farmas'];

export default function SearchPage() {
  const {
    searchQuery,
    setSearchQuery,
    filteredProducts,
    isLoading,
    loadProducts,
    applyFilters,
    resetFilters,
    filters,
  } = useProductStore();

  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [showFilters, setShowFilters] = useState(false);
  const [tempCategories, setTempCategories] = useState<ProductCategory[]>(filters.categories);
  const [tempBrands, setTempBrands] = useState<string[]>(filters.brands);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleSearch = (val: string) => {
    setLocalQuery(val);
    setSearchQuery(val);
  };

  const toggleCategory = (cat: ProductCategory) => {
    setTempCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleBrand = (brand: string) => {
    setTempBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleApply = () => {
    applyFilters({ categories: tempCategories, brands: tempBrands });
    setShowFilters(false);
  };

  const handleResetFilters = () => {
    setTempCategories([]);
    setTempBrands([]);
    resetFilters();
    setShowFilters(false);
  };

  return (
    <div className="relative min-h-screen">
      <div className="px-4 pt-4 pb-4 lg:px-6 lg:pt-6">
        <SearchBar
          value={localQuery}
          onChange={handleSearch}
          showFilter
          onFilterClick={() => setShowFilters(true)}
          className="mb-6"
        />

        <ProductGrid
          products={filteredProducts}
          isLoading={isLoading}
          columns="auto"
        />
      </div>

      {/* Filter Drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setShowFilters(false)}
          />
          <div className="relative bg-white rounded-t-3xl lg:rounded-3xl w-full max-w-lg p-6 animate-slide-up max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setShowFilters(false)}
                className="text-xl text-[#181725]"
              >
                ✕
              </button>
              <h2 className="text-lg font-bold text-[#181725]">Filters</h2>
              <div className="w-6" />
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="text-base font-bold text-[#181725] mb-3">Categories</h3>
              <div className="space-y-3">
                {CATEGORY_META.slice(0, 6).map((cat) => (
                  <label key={cat.slug} className="flex items-center gap-3 cursor-pointer">
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${
                        tempCategories.includes(cat.slug)
                          ? 'bg-[#53B175] border-[#53B175]'
                          : 'border-[#E2E2E2]'
                      }`}
                      onClick={() => toggleCategory(cat.slug)}
                    >
                      {tempCategories.includes(cat.slug) && (
                        <span className="text-white text-xs font-bold">✓</span>
                      )}
                    </div>
                    <span className={`text-sm ${tempCategories.includes(cat.slug) ? 'text-[#53B175] font-semibold' : 'text-[#181725]'}`}>
                      {cat.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="mb-8">
              <h3 className="text-base font-bold text-[#181725] mb-3">Brand</h3>
              <div className="space-y-3">
                {ALL_BRANDS.map((brand) => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer">
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${
                        tempBrands.includes(brand)
                          ? 'bg-[#53B175] border-[#53B175]'
                          : 'border-[#E2E2E2]'
                      }`}
                      onClick={() => toggleBrand(brand)}
                    >
                      {tempBrands.includes(brand) && (
                        <span className="text-white text-xs font-bold">✓</span>
                      )}
                    </div>
                    <span className={`text-sm ${tempBrands.includes(brand) ? 'text-[#53B175] font-semibold' : 'text-[#181725]'}`}>
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" fullWidth onClick={handleResetFilters}>
                Reset
              </Button>
              <Button fullWidth onClick={handleApply}>
                Apply Filter
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
