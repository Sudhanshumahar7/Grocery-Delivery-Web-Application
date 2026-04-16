'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/store/useAuthStore';
import { fetchZones } from '@/lib/mockData';
import type { Zone } from '@/types';

export default function LocationPage() {
  const router = useRouter();
  const setLocation = useAuthStore((s) => s.setLocation);
  const setAuthStep = useAuthStore((s) => s.setAuthStep);

  const [zones, setZones] = useState<Zone[]>([]);
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchZones().then(setZones);
  }, []);

  const currentZone = zones.find((z) => z.id === selectedZone);

  const handleSubmit = async () => {
    if (!selectedZone || !selectedArea) return;
    setIsLoading(true);
    const zone = zones.find((z) => z.id === selectedZone);
    const area = zone?.areas.find((a) => a.id === selectedArea);
    await new Promise((r) => setTimeout(r, 600));
    setLocation(zone?.name ?? '', area?.name ?? '');
    setAuthStep('authenticated');
    router.push('/home');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top half — decorative map illustration */}
      <div className="relative bg-linear-to-br from-[#EEF5FF] via-[#E8F5EE] to-[#F5F5FF] flex items-center justify-center py-12">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="absolute top-5 left-5 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-[#181725] hover:shadow-md transition-shadow"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Map graphic */}
        <div className="relative flex items-center justify-center">
          {/* Outer pulse ring */}
          <div className="absolute w-44 h-44 rounded-full bg-[#53B175]/10 animate-ping" style={{ animationDuration: '2.5s' }} />
          <div className="absolute w-36 h-36 rounded-full bg-[#53B175]/15" />

          {/* Map base */}
          <div className="relative w-32 h-32 rounded-3xl bg-white shadow-xl flex items-center justify-center overflow-hidden border border-[#E8F5EE]">
            {/* Simplified map grid lines */}
            <svg width="128" height="128" viewBox="0 0 128 128" className="absolute inset-0 opacity-20">
              <line x1="0" y1="32" x2="128" y2="32" stroke="#53B175" strokeWidth="1" />
              <line x1="0" y1="64" x2="128" y2="64" stroke="#53B175" strokeWidth="1" />
              <line x1="0" y1="96" x2="128" y2="96" stroke="#53B175" strokeWidth="1" />
              <line x1="32" y1="0" x2="32" y2="128" stroke="#53B175" strokeWidth="1" />
              <line x1="64" y1="0" x2="64" y2="128" stroke="#53B175" strokeWidth="1" />
              <line x1="96" y1="0" x2="96" y2="128" stroke="#53B175" strokeWidth="1" />
              <rect x="20" y="20" width="30" height="20" rx="3" fill="#D6EFC7" />
              <rect x="60" y="40" width="40" height="15" rx="3" fill="#BFE5CC" />
              <rect x="15" y="55" width="25" height="30" rx="3" fill="#D6EFC7" />
              <rect x="75" y="65" width="35" height="25" rx="3" fill="#BFE5CC" />
            </svg>
            {/* Pin icon */}
            <svg width="40" height="48" viewBox="0 0 40 48" fill="none" className="relative z-10 drop-shadow-md">
              <path d="M20 0C9 0 0 9 0 20c0 15 20 28 20 28S40 35 40 20C40 9 31 0 20 0z" fill="#53B175" />
              <circle cx="20" cy="20" r="8" fill="white" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom content */}
      <div className="flex-1 px-6 pt-8 pb-10 max-w-sm mx-auto w-full">
        <h1 className="text-2xl font-bold text-[#181725] text-center mb-2">
          Select Your Location
        </h1>
        <p className="text-sm text-[#7C7C7C] text-center mb-8 leading-relaxed">
          Switch on your location to stay in tune with<br />what&apos;s happening in your area
        </p>

        {/* Zone select */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-[#181725] mb-2">
            Your Zone
          </label>
          <div className="relative">
            <select
              value={selectedZone}
              onChange={(e) => {
                setSelectedZone(e.target.value);
                setSelectedArea('');
              }}
              className="w-full appearance-none border border-[#E2E2E2] rounded-2xl px-4 py-3.5 text-sm text-[#181725] bg-white outline-none focus:border-[#53B175] focus:ring-2 focus:ring-[#53B175]/10 transition-all pr-10"
            >
              <option value="">Select zone</option>
              {zones.map((z) => (
                <option key={z.id} value={z.id}>{z.name}</option>
              ))}
            </select>
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#7C7C7C]"
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        {/* Area select */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-[#181725] mb-2">
            Your Area
          </label>
          <div className="relative">
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              disabled={!selectedZone}
              className="w-full appearance-none border border-[#E2E2E2] rounded-2xl px-4 py-3.5 text-sm text-[#181725] bg-white outline-none focus:border-[#53B175] focus:ring-2 focus:ring-[#53B175]/10 transition-all pr-10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">Types of your area</option>
              {currentZone?.areas.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#7C7C7C]"
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        <Button
          fullWidth
          size="lg"
          isLoading={isLoading}
          disabled={!selectedZone || !selectedArea}
          onClick={handleSubmit}
        >
          Submit
        </Button>

        <button
          onClick={() => router.push('/home')}
          className="mt-4 w-full text-center text-sm text-[#7C7C7C] hover:text-[#53B175] transition-colors py-2"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
