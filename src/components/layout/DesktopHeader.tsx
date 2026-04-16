'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';
import { useProductStore } from '@/store/useProductStore';
import { useRouter } from 'next/navigation';

export default function DesktopHeader() {
  const user = useAuthStore((s) => s.user);
  const selectedZone = useAuthStore((s) => s.selectedZone);
  const selectedArea = useAuthStore((s) => s.selectedArea);
  const itemCount = useCartStore((s) => s.itemCount());
  const searchQuery = useProductStore((s) => s.searchQuery);
  const setSearchQuery = useProductStore((s) => s.setSearchQuery);
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim()) {
      router.push('/search');
    }
  };

  const displayZone = selectedZone || user?.zone || 'Select Location';
  const displayArea = selectedArea || user?.area || '';

  return (
    <header className="hidden lg:flex items-center gap-4 px-6 py-3 bg-white border-b border-[#E2E2E2] sticky top-0 z-40">
      {/* Location */}
      <div className="flex items-center gap-1.5 text-sm text-[#181725] min-w-max">
        <span className="text-[#53B175]">📍</span>
        <span className="font-medium">
          {displayZone}{displayArea ? `, ${displayArea}` : ''}
        </span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7C7C7C] text-sm">
            🔍
          </span>
          <input
            type="search"
            placeholder="Search Store"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-9 pr-4 py-2.5 bg-[#F2F3F2] rounded-xl text-sm text-[#181725] placeholder-[#7C7C7C] outline-none focus:ring-2 focus:ring-[#53B175]/30 transition"
          />
        </div>
      </div>

      {/* Cart */}
      <Link
        href="/cart"
        className="relative flex items-center gap-2 bg-[#53B175] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#3a8a55] transition-colors"
      >
        <span>🛒</span>
        <span>Cart</span>
        {itemCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-white text-[#53B175] text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border border-[#53B175]">
            {itemCount > 9 ? '9+' : itemCount}
          </span>
        )}
      </Link>
    </header>
  );
}
