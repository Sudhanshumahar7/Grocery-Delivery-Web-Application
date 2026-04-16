'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CATEGORY_META } from '@/lib/mockData';
import { useProductStore } from '@/store/useProductStore';
import { useAuthStore } from '@/store/useAuthStore';
import type { ProductCategory } from '@/types';

const MAIN_LINKS = [
  { href: '/home', label: 'Shop', emoji: '🏪' },
  { href: '/explore', label: 'Explore', emoji: '🧭' },
  { href: '/cart', label: 'My Cart', emoji: '🛒' },
  { href: '/favourites', label: 'Favourites', emoji: '❤️' },
  { href: '/account', label: 'Account', emoji: '👤' },
];

export default function DesktopSidebar() {
  const pathname = usePathname();
  const setSelectedCategory = useProductStore((s) => s.setSelectedCategory);
  const user = useAuthStore((s) => s.user);

  const handleCategoryClick = (slug: ProductCategory) => {
    setSelectedCategory(slug);
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 xl:w-72 h-screen sticky top-0 bg-white border-r border-[#E2E2E2] shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[#E2E2E2]">
        <div className="w-9 h-9 bg-[#53B175] rounded-full flex items-center justify-center text-white text-xl">
          🥕
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#181725]">nectar</h1>
          <p className="text-[10px] text-[#7C7C7C]">online grocer</p>
        </div>
      </div>

      {/* User info */}
      {user && (
        <div className="px-6 py-3 border-b border-[#E2E2E2] bg-[#f9f9f9]">
          <p className="text-sm font-semibold text-[#181725] truncate">{user.name}</p>
          <p className="text-xs text-[#7C7C7C] truncate">{user.email}</p>
        </div>
      )}

      {/* Main Nav */}
      <nav className="px-4 pt-4 space-y-1">
        {MAIN_LINKS.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#E8F5EE] text-[#53B175]'
                  : 'text-[#7C7C7C] hover:bg-gray-50 hover:text-[#181725]'
              }`}
            >
              <span className="text-base">{link.emoji}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Categories */}
      <div className="mt-4 px-4">
        <p className="text-xs font-semibold text-[#7C7C7C] uppercase tracking-wider px-3 mb-2">
          Categories
        </p>
        <div className="space-y-0.5 max-h-[calc(100vh-380px)] overflow-y-auto hide-scrollbar">
          {CATEGORY_META.map((cat) => {
            const isActive = pathname.includes(cat.slug);
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={() => handleCategoryClick(cat.slug)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all ${
                  isActive
                    ? 'bg-[#E8F5EE] text-[#53B175] font-medium'
                    : 'text-[#7C7C7C] hover:bg-gray-50 hover:text-[#181725]'
                }`}
              >
                <span className="text-base">{cat.emoji}</span>
                <span className="truncate text-xs">{cat.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
