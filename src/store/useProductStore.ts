'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, FilterOptions } from '@/types';
import { ProductCategory } from '@/types';
import { fetchProducts } from '@/lib/mockData';

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  favorites: string[]; // product IDs
  searchQuery: string;
  selectedCategory: ProductCategory | null;
  isLoading: boolean;
  error: string | null;
  filters: FilterOptions;
  // Actions
  loadProducts: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: ProductCategory | null) => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  applyFilters: (filters: Partial<FilterOptions>) => void;
  resetFilters: () => void;
  getProductsByCategory: (category: ProductCategory) => Product[];
  getExclusiveOffers: () => Product[];
  getBestSelling: () => Product[];
}

const DEFAULT_FILTERS: FilterOptions = {
  categories: [],
  brands: [],
  minPrice: undefined,
  maxPrice: undefined,
  inStockOnly: false,
};

function applyAllFilters(
  products: Product[],
  query: string,
  category: ProductCategory | null,
  filters: FilterOptions
): Product[] {
  let result = [...products];

  if (query.trim()) {
    result = result.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }
  if (category) {
    result = result.filter((p) => p.category === category);
  }
  if (filters.categories.length > 0) {
    result = result.filter((p) => filters.categories.includes(p.category));
  }
  if (filters.brands.length > 0) {
    result = result.filter(
      (p) => p.brand && filters.brands.includes(p.brand)
    );
  }
  if (filters.minPrice !== undefined) {
    result = result.filter((p) => p.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }
  if (filters.inStockOnly) {
    result = result.filter((p) => p.inStock);
  }
  return result;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
  products: [],
  filteredProducts: [],
  favorites: [],
  searchQuery: '',
  selectedCategory: null,
  isLoading: false,
  error: null,
  filters: DEFAULT_FILTERS,

  loadProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const products = await fetchProducts();
      set({
        products,
        filteredProducts: applyAllFilters(
          products,
          get().searchQuery,
          get().selectedCategory,
          get().filters
        ),
        isLoading: false,
      });
    } catch {
      set({ error: 'Failed to load products.', isLoading: false });
    }
  },

  setSearchQuery: (query) => {
    set((state) => ({
      searchQuery: query,
      filteredProducts: applyAllFilters(
        state.products,
        query,
        state.selectedCategory,
        state.filters
      ),
    }));
  },

  setSelectedCategory: (category) => {
    set((state) => ({
      selectedCategory: category,
      filteredProducts: applyAllFilters(
        state.products,
        state.searchQuery,
        category,
        state.filters
      ),
    }));
  },

  toggleFavorite: (productId) =>
    set((state) => ({
      favorites: state.favorites.includes(productId)
        ? state.favorites.filter((id) => id !== productId)
        : [...state.favorites, productId],
    })),

  isFavorite: (productId) => get().favorites.includes(productId),

  applyFilters: (newFilters) => {
    set((state) => {
      const merged = { ...state.filters, ...newFilters };
      return {
        filters: merged,
        filteredProducts: applyAllFilters(
          state.products,
          state.searchQuery,
          state.selectedCategory,
          merged
        ),
      };
    });
  },

  resetFilters: () => {
    set((state) => ({
      filters: DEFAULT_FILTERS,
      filteredProducts: applyAllFilters(
        state.products,
        state.searchQuery,
        state.selectedCategory,
        DEFAULT_FILTERS
      ),
    }));
  },

  getProductsByCategory: (category) =>
    get().products.filter((p) => p.category === category),

  getExclusiveOffers: () =>
    get().products.filter((p) => p.isExclusiveOffer),

  getBestSelling: () =>
    get().products.filter((p) => p.isBestSelling),
    }),
    {
      name: 'nectar-products',
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);
