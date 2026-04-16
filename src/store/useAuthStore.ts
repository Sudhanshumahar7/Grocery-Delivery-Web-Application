'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

type AuthStep =
  | 'splash'
  | 'onboarding'
  | 'phone'
  | 'otp'
  | 'location'
  | 'login'
  | 'signup'
  | 'authenticated';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  authStep: AuthStep;
  otpPhone: string;
  selectedZone: string;
  selectedArea: string;
  isLoading: boolean;
  error: string | null;
  // Actions
  setAuthStep: (step: AuthStep) => void;
  setPhone: (phone: string) => void;
  setLocation: (zone: string, area: string) => void;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  verifyOtp: (code: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      authStep: 'splash',
      otpPhone: '',
      selectedZone: '',
      selectedArea: '',
      isLoading: false,
      error: null,

      setAuthStep: (step) => set({ authStep: step }),

      setPhone: (phone) => set({ otpPhone: phone }),

      setLocation: (zone, area) =>
        set({ selectedZone: zone, selectedArea: area }),

      login: async (email, _password) => {
        set({ isLoading: true, error: null });
        await new Promise((r) => setTimeout(r, 1000));
        // Mock: any email/password works
        const mockUser: User = {
          id: 'u1',
          name: 'Afsar Hossen Shuvo',
          email,
          zone: 'Banasree',
          area: 'Block A',
        };
        set({
          user: mockUser,
          isAuthenticated: true,
          authStep: 'authenticated',
          isLoading: false,
        });
        return true;
      },

      signup: async (name, email, _password) => {
        set({ isLoading: true, error: null });
        await new Promise((r) => setTimeout(r, 1000));
        const mockUser: User = {
          id: 'u1',
          name,
          email,
        };
        set({
          user: mockUser,
          isAuthenticated: true,
          authStep: 'authenticated',
          isLoading: false,
        });
        return true;
      },

      verifyOtp: async (code) => {
        set({ isLoading: true, error: null });
        await new Promise((r) => setTimeout(r, 800));
        // Mock: any 6-digit code works (demo: 123456)
        if (code.length === 6) {
          set({ isLoading: false, authStep: 'location' });
          return true;
        }
        set({ isLoading: false, error: 'Invalid code. Enter the 6-digit code.' });
        return false;
      },

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          authStep: 'login',
          otpPhone: '',
          selectedZone: '',
          selectedArea: '',
        }),

      clearError: () => set({ error: null }),
    }),
    {
      name: 'nectar-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        selectedZone: state.selectedZone,
        selectedArea: state.selectedArea,
      }),
    }
  )
);
