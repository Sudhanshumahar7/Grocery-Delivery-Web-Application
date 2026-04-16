'use client';

import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero image area */}
      <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-[#F4F9F1] via-[#EBF5E0] to-[#D6EFC7] flex items-center justify-center min-h-[55vh]">
        {/* Decorative blobs */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#53B175]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#53B175]/15 rounded-full blur-2xl" />

        {/* Produce collage */}
        <div className="relative flex flex-col items-center gap-2">
          <div className="flex items-end gap-4">
            <div className="w-24 h-24 rounded-3xl bg-white/80 shadow-lg flex items-center justify-center text-5xl transform -rotate-6 hover:rotate-0 transition-transform">
              🥦
            </div>
            <div className="w-28 h-28 rounded-3xl bg-white/80 shadow-xl flex items-center justify-center text-6xl">
              🍎
            </div>
            <div className="w-24 h-24 rounded-3xl bg-white/80 shadow-lg flex items-center justify-center text-5xl transform rotate-6 hover:rotate-0 transition-transform">
              🥕
            </div>
          </div>
          <div className="flex items-end gap-4 mt-2">
            <div className="w-20 h-20 rounded-3xl bg-white/80 shadow-md flex items-center justify-center text-4xl transform rotate-3">
              🧅
            </div>
            <div className="w-24 h-24 rounded-3xl bg-white/80 shadow-lg flex items-center justify-center text-5xl transform -rotate-3">
              🍋
            </div>
            <div className="w-20 h-20 rounded-3xl bg-white/80 shadow-md flex items-center justify-center text-4xl transform -rotate-6">
              🫐
            </div>
          </div>
        </div>
      </div>

      {/* Content card */}
      <div className="bg-white rounded-t-3xl -mt-5 relative z-10 px-6 pt-8 pb-10">
        {/* Pill indicator */}
        <div className="flex justify-center mb-6">
          <div className="flex gap-1.5">
            <div className="w-6 h-1.5 rounded-full bg-[#53B175]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#E2E2E2]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#E2E2E2]" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#181725] text-center leading-snug">
          Welcome to our store
        </h2>
        <p className="text-sm text-[#7C7C7C] text-center mt-2 mb-8">
          Get your groceries in as fast as one hour
        </p>

        {/* Phone number row */}
        <button
          onClick={() => router.push('/otp')}
          className="w-full flex items-center gap-3 border-2 border-[#E2E2E2] hover:border-[#53B175] rounded-2xl px-4 py-3.5 mb-5 transition-colors group"
        >
          <span className="text-lg">🇮🇳</span>
          <span className="text-sm text-[#7C7C7C] font-medium">+91</span>
          <span className="text-sm text-[#7C7C7C] flex-1 text-left">Enter your mobile number</span>
          <svg className="w-4 h-4 text-[#7C7C7C] group-hover:text-[#53B175] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-[#E2E2E2]" />
          <span className="text-xs text-[#7C7C7C] font-medium">Or connect with social media</span>
          <div className="flex-1 h-px bg-[#E2E2E2]" />
        </div>

        {/* Google */}
        <button
          onClick={() => router.push('/login')}
          className="w-full flex items-center justify-center gap-3 bg-[#4285F4] text-white py-3.5 rounded-2xl font-semibold text-sm mb-3 hover:bg-[#3367D6] active:scale-[0.98] transition-all shadow-sm"
        >
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>

        {/* Facebook */}
        <button
          onClick={() => router.push('/login')}
          className="w-full flex items-center justify-center gap-3 bg-[#1877F2] text-white py-3.5 rounded-2xl font-semibold text-sm hover:bg-[#166FE5] active:scale-[0.98] transition-all shadow-sm"
        >
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Continue with Facebook
        </button>

        {/* Login link */}
        <p className="text-center text-sm text-[#7C7C7C] mt-6">
          Already have an account?{' '}
          <button onClick={() => router.push('/login')} className="text-[#53B175] font-semibold hover:underline">
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}
