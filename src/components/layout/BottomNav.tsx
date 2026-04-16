'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
}

function ShopIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        stroke={active ? '#53B175' : '#7C7C7C'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={active ? '#E8F5EE' : 'none'}
      />
      <path
        d="M9 22V12h6v10"
        stroke={active ? '#53B175' : '#7C7C7C'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExploreIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="11"
        cy="11"
        r="8"
        stroke={active ? '#53B175' : '#7C7C7C'}
        strokeWidth="2"
      />
      <path
        d="M21 21l-4.35-4.35"
        stroke={active ? '#53B175' : '#7C7C7C'}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="11" cy="11" r="3" fill={active ? '#53B175' : '#E2E2E2'} />
    </svg>
  );
}

function CartIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
        stroke={active ? '#53B175' : '#7C7C7C'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={active ? '#E8F5EE' : 'none'}
      />
      <line
        x1="3"
        y1="6"
        x2="21"
        y2="6"
        stroke={active ? '#53B175' : '#7C7C7C'}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 10a4 4 0 01-8 0"
        stroke={active ? '#53B175' : '#7C7C7C'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FavouriteIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
        stroke={active ? '#53B175' : '#7C7C7C'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={active ? '#53B175' : 'none'}
      />
    </svg>
  );
}

function AccountIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
        stroke={active ? '#53B175' : '#7C7C7C'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="7"
        r="4"
        stroke={active ? '#53B175' : '#7C7C7C'}
        strokeWidth="2"
        fill={active ? '#E8F5EE' : 'none'}
      />
    </svg>
  );
}

const NAV_ROUTES = [
  { href: '/home', label: 'Shop' },
  { href: '/explore', label: 'Explore' },
  { href: '/cart', label: 'Cart' },
  { href: '/favourites', label: 'Favourite' },
  { href: '/account', label: 'Account' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.itemCount());

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E2E2E2] lg:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {NAV_ROUTES.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5 min-w-13 py-1"
            >
              <span className="relative">
                {item.href === '/home' && <ShopIcon active={isActive} />}
                {item.href === '/explore' && <ExploreIcon active={isActive} />}
                {item.href === '/cart' && <CartIcon active={isActive} />}
                {item.href === '/favourites' && <FavouriteIcon active={isActive} />}
                {item.href === '/account' && <AccountIcon active={isActive} />}
                {item.href === '/cart' && itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#53B175] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </span>
              <span
                className={`text-[10px] font-medium leading-none transition-colors ${
                  isActive ? 'text-[#53B175]' : 'text-[#7C7C7C]'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
