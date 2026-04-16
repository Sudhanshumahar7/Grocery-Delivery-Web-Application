'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';
import { useProductStore } from '@/store/useProductStore';
import { useRouter } from 'next/navigation';
import { MOCK_ZONES } from '@/lib/mockData';

const MENU_ITEMS = [
  { icon: '📦', label: 'Orders', href: '#' },
  { icon: '💳', label: 'Payment Methods', href: '#' },
  { icon: '🎁', label: 'Promo Code', href: '#' },
  { icon: '🔔', label: 'Notifications', href: '#' },
  { icon: '❓', label: 'Help', href: '#' },
  { icon: 'ℹ️', label: 'About', href: '#' },
];

export default function AccountPage() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const selectedZone = useAuthStore((s) => s.selectedZone);
  const selectedArea = useAuthStore((s) => s.selectedArea);
  const setLocation = useAuthStore((s) => s.setLocation);
  const clearCart = useCartStore((s) => s.clearCart);
  const favCount = useProductStore((s) => s.favorites.length);
  const router = useRouter();

  const [editOpen, setEditOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);

  // Editable profile fields
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');

  // Location edit state
  const [zone, setZone] = useState(selectedZone || user?.zone || '');
  const [area, setArea] = useState(selectedArea || user?.area || '');

  const displayZone = selectedZone || user?.zone || '';
  const displayArea = selectedArea || user?.area || '';

  const handleLogout = () => {
    clearCart();
    logout();
    router.push('/login');
  };

  const handleSaveProfile = () => {
    // In a real app this would call an API; for now just close
    setEditOpen(false);
  };

  const selectedZoneData = MOCK_ZONES.find((z) => z.name === zone);
  const areas = selectedZoneData?.areas ?? [];

  return (
    <div className="px-4 pt-4 pb-24 lg:px-6 lg:pt-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold text-[#181725] text-center mb-6">My Account</h1>

      {/* ─── Profile Card ─────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-[#53B175]/10 to-[#53B175]/5 rounded-2xl border border-[#53B175]/20 p-5 mb-4">
        <div className="flex items-center gap-4 mb-4">
          {/* Avatar */}
          <div className="w-16 h-16 bg-[#53B175] rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-md">
            {(user?.name ?? 'G')[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-bold text-[#181725] truncate">{user?.name ?? 'Guest'}</p>
            <p className="text-sm text-[#7C7C7C] truncate">{user?.email ?? '—'}</p>
            {user?.phone && (
              <p className="text-xs text-[#7C7C7C] mt-0.5">{user.phone}</p>
            )}
          </div>
          <button
            onClick={() => setEditOpen(true)}
            className="shrink-0 w-9 h-9 rounded-full bg-white border border-[#E2E2E2] flex items-center justify-center hover:border-[#53B175] transition-colors shadow-sm"
          >
            ✏️
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <p className="text-lg font-bold text-[#53B175]">0</p>
            <p className="text-[10px] text-[#7C7C7C] mt-0.5">Orders</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <p className="text-lg font-bold text-[#53B175]">{favCount}</p>
            <p className="text-[10px] text-[#7C7C7C] mt-0.5">Favourites</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <p className="text-lg font-bold text-[#53B175]">0</p>
            <p className="text-[10px] text-[#7C7C7C] mt-0.5">Reviews</p>
          </div>
        </div>
      </div>

      {/* ─── Delivery Location ────────────────────────────────────────────────── */}
      <button
        onClick={() => { setZone(displayZone); setArea(displayArea); setLocationOpen(true); }}
        className="w-full bg-white rounded-2xl border border-[#E2E2E2] p-4 flex items-center gap-3 mb-4 hover:border-[#53B175] transition-colors text-left"
      >
        <span className="text-xl">📍</span>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-[#7C7C7C] font-medium">Delivery Location</p>
          <p className="text-sm font-semibold text-[#181725] truncate mt-0.5">
            {displayZone ? `${displayZone}${displayArea ? `, ${displayArea}` : ''}` : 'Set delivery location'}
          </p>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C7C7C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* ─── Menu ─────────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#E2E2E2] overflow-hidden mb-4">
        {MENU_ITEMS.map((item, index) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors text-left ${index < MENU_ITEMS.length - 1 ? 'border-b border-[#E2E2E2]' : ''}`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="flex-1 text-sm font-medium text-[#181725]">{item.label}</span>
            <span className="text-[#B3B3B3]">→</span>
          </button>
        ))}
      </div>

      {/* ─── Logout ───────────────────────────────────────────────────────────── */}
      <button
        onClick={handleLogout}
        className="w-full py-3.5 border border-[#F4442E] text-[#F4442E] rounded-2xl font-semibold text-sm hover:bg-red-50 transition-colors"
      >
        🚪 Log Out
      </button>

      {/* ─── Edit Profile Modal ───────────────────────────────────────────────── */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={() => setEditOpen(false)}>
          <div
            className="bg-white w-full max-w-sm rounded-t-3xl px-5 pt-4 pb-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-[#E2E2E2] rounded-full mx-auto mb-4" />
            <h3 className="text-base font-bold text-[#181725] mb-5">Edit Profile</h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-xs font-semibold text-[#7C7C7C] block mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-0 py-2.5 border-b border-[#E2E2E2] text-sm text-[#181725] outline-none focus:border-[#53B175] transition-colors bg-transparent placeholder-[#C0C0C0]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#7C7C7C] block mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-0 py-2.5 border-b border-[#E2E2E2] text-sm text-[#181725] outline-none focus:border-[#53B175] transition-colors bg-transparent placeholder-[#C0C0C0]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#7C7C7C] block mb-1.5">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+880 XXXXXXXXXX"
                  className="w-full px-0 py-2.5 border-b border-[#E2E2E2] text-sm text-[#181725] outline-none focus:border-[#53B175] transition-colors bg-transparent placeholder-[#C0C0C0]"
                />
              </div>
            </div>

            <button
              onClick={handleSaveProfile}
              className="w-full py-3.5 bg-[#53B175] text-white font-semibold rounded-2xl hover:bg-[#3a8a55] transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* ─── Edit Location Modal ──────────────────────────────────────────────── */}
      {locationOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={() => setLocationOpen(false)}>
          <div
            className="bg-white w-full max-w-sm rounded-t-3xl px-5 pt-4 pb-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-[#E2E2E2] rounded-full mx-auto mb-4" />
            <h3 className="text-base font-bold text-[#181725] mb-4">Delivery Location</h3>

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
              onClick={() => { setLocation(zone, area); setLocationOpen(false); }}
              disabled={!zone}
              className="w-full py-3.5 bg-[#53B175] text-white font-semibold rounded-2xl disabled:opacity-40 hover:bg-[#3a8a55] transition-colors"
            >
              Save Location
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
