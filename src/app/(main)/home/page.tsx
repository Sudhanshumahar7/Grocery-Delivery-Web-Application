'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useProductStore } from '@/store/useProductStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';
import ProductCard from '@/components/ui/ProductCard';
import SkeletonCard from '@/components/ui/SkeletonCard';
import { CATEGORY_META, MOCK_ZONES } from '@/lib/mockData';

function SectionSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="flex gap-3 overflow-x-auto hide-scrollbar">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="min-w-[140px] max-w-[140px]">
          <SkeletonCard />
        </div>
      ))}
    </div>
  );
}

// ─── Hero Banner slides ────────────────────────────────────────────────────────
const SLIDES = [
  {
    bg: 'linear-gradient(135deg, #53B175 0%, #1d6a3a 100%)',
    emoji: '🥦',
    tag: 'GET UP TO 40% OFF',
    title: 'Fresh Vegetables',
    subtitle: 'Delivered to your door',
  },
  {
    bg: 'linear-gradient(135deg, #F97316 0%, #b45309 100%)',
    emoji: '🍎',
    tag: 'EAT MORE FRUIT',
    title: 'An apple a day keeps\nthe doctor away',
    subtitle: 'Explore fresh picks',
  },
  {
    bg: 'linear-gradient(135deg, #6366f1 0%, #312e81 100%)',
    emoji: '💧',
    tag: 'STAY HYDRATED',
    title: 'Your body is 60%\nwater — keep it full',
    subtitle: 'Shop beverages',
  },
];

// ─── Location Editor Modal ─────────────────────────────────────────────────────
function LocationModal({
  open,
  onClose,
  currentZone,
  currentArea,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  currentZone: string;
  currentArea: string;
  onSave: (zone: string, area: string) => void;
}) {
  const [zone, setZone] = useState(currentZone);
  const [area, setArea] = useState(currentArea);

  useEffect(() => {
    setZone(currentZone);
    setArea(currentArea);
  }, [currentZone, currentArea, open]);

  const selectedZoneData = MOCK_ZONES.find((z) => z.name === zone);
  const areas = selectedZoneData?.areas ?? [];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div
        className="bg-white w-full max-w-sm rounded-t-3xl px-5 pt-4 pb-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-[#E2E2E2] rounded-full mx-auto mb-4" />
        <h3 className="text-base font-bold text-[#181725] mb-4">Edit Delivery Location</h3>

        <label className="text-xs font-semibold text-[#7C7C7C] uppercase tracking-wide mb-2 block">Zone / City</label>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {MOCK_ZONES.map((z) => (
            <button
              key={z.id}
              onClick={() => { setZone(z.name); setArea(''); }}
              className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-colors border ${zone === z.name ? 'bg-[#53B175] text-white border-[#53B175]' : 'bg-[#F2F3F2] text-[#181725] border-[#F2F3F2] hover:border-[#53B175]'}`}
            >
              {z.name}
            </button>
          ))}
        </div>

        {areas.length > 0 && (
          <>
            <label className="text-xs font-semibold text-[#7C7C7C] uppercase tracking-wide mb-2 block">Area</label>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {areas.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setArea(a.name)}
                  className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-colors border ${area === a.name ? 'bg-[#53B175] text-white border-[#53B175]' : 'bg-[#F2F3F2] text-[#181725] border-[#F2F3F2] hover:border-[#53B175]'}`}
                >
                  {a.name}
                </button>
              ))}
            </div>
          </>
        )}

        <button
          onClick={() => { onSave(zone, area); onClose(); }}
          disabled={!zone}
          className="w-full py-3.5 bg-[#53B175] text-white font-semibold rounded-2xl disabled:opacity-40 hover:bg-[#3a8a55] transition-colors"
        >
          Save Location
        </button>
      </div>
    </div>
  );
}

// ─── HomePage ──────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { loadProducts, isLoading, getExclusiveOffers, getBestSelling, getProductsByCategory } = useProductStore();
  const user = useAuthStore((s) => s.user);
  const selectedZone = useAuthStore((s) => s.selectedZone);
  const selectedArea = useAuthStore((s) => s.selectedArea);
  const setLocation = useAuthStore((s) => s.setLocation);
  const itemCount = useCartStore((s) => s.itemCount());
  const totalPrice = useCartStore((s) => s.totalPrice());

  const [slideIdx, setSlideIdx] = useState(0);
  const [locationOpen, setLocationOpen] = useState(false);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Auto-rotate banner every 4s
  const nextSlide = useCallback(() => setSlideIdx((i) => (i + 1) % SLIDES.length), []);
  useEffect(() => {
    const t = setInterval(nextSlide, 4000);
    return () => clearInterval(t);
  }, [nextSlide]);

  const exclusiveOffers = getExclusiveOffers();
  const bestSelling = getBestSelling();
  const groceries = getProductsByCategory('fresh-fruits-&-vegetable' as never);

  // Derive display location — prefer selectedZone/Area in store, fallback to user.zone
  const displayZone = selectedZone || user?.zone || 'Select Location';
  const displayArea = selectedArea || user?.area || '';

  const slide = SLIDES[slideIdx];

  return (
    <div className="px-4 pt-4 pb-4 lg:px-6 lg:pt-6">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setLocationOpen(true)}
          className="flex items-center gap-1.5 text-sm text-[#7C7C7C] hover:text-[#53B175] transition-colors group"
        >
          <span>📍</span>
          <span className="font-semibold text-[#181725] group-hover:text-[#53B175] transition-colors">
            {displayZone}{displayArea ? `, ${displayArea}` : ''}
          </span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#7C7C7C]">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        <Link href="/cart" className="relative lg:hidden">
          <span className="text-2xl">🛒</span>
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#53B175] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Link>
      </div>


      {/* Search bar (mobile) */}
      <div className="lg:hidden mb-5">
        <Link href="/search">
          <div className="flex items-center gap-2 bg-[#F2F3F2] rounded-2xl px-4 py-3 text-sm text-[#7C7C7C]">
            <span>🔍</span>
            <span>Search Store</span>
          </div>
        </Link>
      </div>

      {/* Hero Banner — auto-rotating */}
      <div className="relative rounded-2xl overflow-hidden mb-6 h-44 select-none">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            style={{ background: s.bg }}
            className={`absolute inset-0 p-5 flex items-end transition-opacity duration-700 ${i === slideIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <div className="absolute inset-0 flex items-center justify-end pr-6 pointer-events-none">
              <span className="text-8xl opacity-25">{s.emoji}</span>
            </div>
            <div className="relative z-10">
              <p className="text-white/80 text-xs font-medium uppercase tracking-widest mb-1">{s.tag}</p>
              <h2 className="text-white text-xl font-bold leading-snug whitespace-pre-line">{s.title}</h2>
              <p className="text-white/70 text-xs mt-1">{s.subtitle}</p>
            </div>
          </div>
        ))}

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIdx(i)}
              className={`h-1.5 rounded-full transition-all ${i === slideIdx ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}
            />
          ))}
        </div>
      </div>

      {/* Exclusive Offer */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-[#181725]">Exclusive Offer</h2>
          <Link href="/explore" className="text-sm font-semibold text-[#53B175]">See all</Link>
        </div>
        {isLoading ? (
          <SectionSkeleton count={4} />
        ) : (
          <div className="flex gap-3 overflow-x-auto hide-scrollbar lg:grid lg:grid-cols-4 xl:grid-cols-5 lg:overflow-visible">
            {exclusiveOffers.map((p) => (
              <div key={p.id} className="min-w-[140px] max-w-[140px] lg:min-w-0 lg:max-w-none animate-fade-in">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Best Selling */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-[#181725]">Best Selling</h2>
          <Link href="/explore" className="text-sm font-semibold text-[#53B175]">See all</Link>
        </div>
        {isLoading ? (
          <SectionSkeleton count={4} />
        ) : (
          <div className="flex gap-3 overflow-x-auto hide-scrollbar lg:grid lg:grid-cols-4 xl:grid-cols-5 lg:overflow-visible">
            {bestSelling.map((p) => (
              <div key={p.id} className="min-w-[140px] max-w-[140px] lg:min-w-0 lg:max-w-none animate-fade-in">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Groceries */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-[#181725]">Groceries</h2>
          <Link href="/explore" className="text-sm font-semibold text-[#53B175]">See all</Link>
        </div>

        {/* Category rows */}
        <div className="grid grid-cols-2 gap-3 mb-4 lg:grid-cols-4">
          {CATEGORY_META.slice(0, 4).map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className={`${cat.bgColor} rounded-2xl p-4 flex items-center gap-3 hover:scale-105 transition-transform`}
            >
              <span className="text-2xl">{cat.emoji}</span>
              <span className={`text-xs font-semibold ${cat.textColor} leading-tight`}>{cat.label}</span>
            </Link>
          ))}
        </div>

        {/* Product grid */}
        {isLoading ? (
          <SectionSkeleton count={4} />
        ) : (
          <div className="flex gap-3 overflow-x-auto hide-scrollbar lg:grid lg:grid-cols-4 xl:grid-cols-5 lg:overflow-visible">
            {groceries.map((p) => (
              <div key={p.id} className="min-w-[140px] max-w-[140px] lg:min-w-0 lg:max-w-none animate-fade-in">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Desktop: Cart summary floating bar */}
      {itemCount > 0 && (
        <div className="hidden lg:flex fixed bottom-6 right-6 bg-[#53B175] text-white rounded-2xl px-6 py-4 items-center gap-4 shadow-xl animate-slide-up">
          <span className="text-2xl">🛒</span>
          <div>
            <p className="text-xs opacity-80">{itemCount} item{itemCount > 1 ? 's' : ''}</p>
            <p className="font-bold text-lg">${totalPrice.toFixed(2)}</p>
          </div>
          <Link
            href="/cart"
            className="bg-white text-[#53B175] px-4 py-2 rounded-xl font-semibold text-sm hover:bg-white/90 transition-colors"
          >
            Open Cart →
          </Link>
        </div>
      )}

      {/* Location Edit Modal */}
      <LocationModal
        open={locationOpen}
        onClose={() => setLocationOpen(false)}
        currentZone={displayZone === 'Select Location' ? '' : displayZone}
        currentArea={displayArea}
        onSave={(z, a) => {
          setLocation(z, a);
          // Also update user zone if logged in
        }}
      />
    </div>
  );
}
