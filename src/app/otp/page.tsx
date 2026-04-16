'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import Button from '@/components/ui/Button';

type OtpStep = 'phone' | 'verify';

interface Country {
  name: string;
  code: string;   // ISO alpha-2
  dial: string;   // e.g. +880
  flag: string;   // emoji
  digits: number; // expected phone number length
}

const COUNTRIES: Country[] = [
  { name: 'India',          code: 'IN', dial: '+91',  flag: '🇮🇳', digits: 10 },
  { name: 'Bangladesh',     code: 'BD', dial: '+880', flag: '🇧🇩', digits: 10 },
  { name: 'United States',  code: 'US', dial: '+1',   flag: '🇺🇸', digits: 10 },
  { name: 'United Kingdom', code: 'GB', dial: '+44',  flag: '🇬🇧', digits: 10 },
  { name: 'Pakistan',       code: 'PK', dial: '+92',  flag: '🇵🇰', digits: 10 },
  { name: 'Saudi Arabia',   code: 'SA', dial: '+966', flag: '🇸🇦', digits: 9  },
  { name: 'UAE',            code: 'AE', dial: '+971', flag: '🇦🇪', digits: 9  },
  { name: 'Canada',         code: 'CA', dial: '+1',   flag: '🇨🇦', digits: 10 },
  { name: 'Australia',      code: 'AU', dial: '+61',  flag: '🇦🇺', digits: 9  },
  { name: 'Germany',        code: 'DE', dial: '+49',  flag: '🇩🇪', digits: 10 },
];

const OTP_LENGTH = 6;

export default function OtpPage() {
  const router = useRouter();
  const setPhone = useAuthStore((s) => s.setPhone);
  const verifyOtp = useAuthStore((s) => s.verifyOtp);
  const isLoading = useAuthStore((s) => s.isLoading);

  const [step, setStep] = useState<OtpStep>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [code, setCode] = useState(Array(OTP_LENGTH).fill(''));
  const [countrySearch, setCountrySearch] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  // Focus phone input on mount so keyboard works
  useEffect(() => {
    if (step === 'phone') {
      phoneInputRef.current?.focus();
    }
  }, [step]);

  // Phone number: allow only digits, up to selectedCountry.digits
  const handlePhoneInput = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, selectedCountry.digits);
    setPhoneNumber(digits);
  };

  // Keypad press (on-screen) — just append digit
  const handleKeypadPress = (val: string) => {
    if (phoneNumber.length < selectedCountry.digits) {
      setPhoneNumber((prev) => prev + val);
    }
  };

  const handleKeypadDelete = () => {
    setPhoneNumber((prev) => prev.slice(0, -1));
  };

  const isPhoneComplete = phoneNumber.length === selectedCountry.digits;

  const handlePhoneSubmit = () => {
    if (isPhoneComplete) {
      setPhone(selectedCountry.dial + phoneNumber);
      setStep('verify');
    }
  };

  // OTP code input
  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isOtpComplete = code.join('').length === OTP_LENGTH;

  const handleVerify = async () => {
    if (!isOtpComplete) return;
    const fullCode = code.join('');
    const success = await verifyOtp(fullCode);
    if (success) router.push('/location');
  };

  // Keypad for OTP screen
  const handleOtpKeypad = (val: string) => {
    const emptyIdx = code.findIndex((c) => c === '');
    if (emptyIdx !== -1) {
      handleCodeChange(emptyIdx, val);
    }
  };

  const handleOtpKeypadDelete = () => {
    const lastIdx = code.map((c) => c !== '').lastIndexOf(true);
    if (lastIdx !== -1) {
      const newCode = [...code];
      newCode[lastIdx] = '';
      setCode(newCode);
    }
  };

  const KEYPAD = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0'];
  const KEYPAD_LETTERS = ['', 'ABC', 'DEF', 'GHI', 'JKL', 'MNO', 'PQRS', 'TUV', 'WXYZ', '', ''];

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      countrySearch === '' ||
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.dial.includes(countrySearch)
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex flex-col px-6 pt-6 pb-4 max-w-sm mx-auto w-full">
        {/* Back */}
        <button
          onClick={() => (step === 'verify' ? setStep('phone') : router.back())}
          className="w-10 h-10 rounded-full bg-[#F2F3F2] flex items-center justify-center mb-6 self-start hover:bg-[#E8F5EE] transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#181725" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {step === 'phone' ? (
          <>
            <h1 className="text-2xl font-bold text-[#181725] mb-1">Enter your mobile number</h1>
            <p className="text-sm text-[#7C7C7C] mb-6">We&apos;ll send a verification code to this number</p>

            {/* Country selector */}
            <button
              onClick={() => { setShowCountryPicker(true); setCountrySearch(''); }}
              className="flex items-center gap-2 border border-[#E2E2E2] rounded-2xl px-4 py-3 mb-3 w-full hover:border-[#53B175] transition-colors text-left"
            >
              <span className="text-xl">{selectedCountry.flag}</span>
              <span className="text-sm text-[#181725] font-medium flex-1">{selectedCountry.name}</span>
              <span className="text-sm text-[#7C7C7C]">{selectedCountry.dial}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C7C7C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Phone display / input */}
            <div className="flex items-center gap-3 border border-[#E2E2E2] rounded-2xl px-4 py-3.5 mb-2 focus-within:border-[#53B175] transition-colors">
              <span className="text-sm font-semibold text-[#181725] shrink-0">{selectedCountry.dial}</span>
              <input
                ref={phoneInputRef}
                type="tel"
                inputMode="numeric"
                value={phoneNumber}
                onChange={(e) => handlePhoneInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && isPhoneComplete) handlePhoneSubmit();
                }}
                placeholder={'X'.repeat(selectedCountry.digits)}
                className="flex-1 text-sm text-[#181725] font-medium outline-none bg-transparent placeholder-[#C0C0C0] tracking-wider"
                autoComplete="tel-national"
              />
              <button
                onClick={handlePhoneSubmit}
                disabled={!isPhoneComplete}
                className="w-10 h-10 bg-[#53B175] rounded-full flex items-center justify-center text-white hover:bg-[#3a8a55] transition-colors disabled:opacity-40 shrink-0"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            {/* Progress bar */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: selectedCountry.digits }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all ${i < phoneNumber.length ? 'bg-[#53B175]' : 'bg-[#E2E2E2]'}`}
                />
              ))}
            </div>

            <p className="text-xs text-[#7C7C7C] text-center mb-5">
              Enter exactly {selectedCountry.digits} digits • Type or use keypad below
            </p>

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-3">
              {KEYPAD.map((k, idx) => (
                <button
                  key={idx}
                  onClick={() => k && handleKeypadPress(k)}
                  disabled={!k}
                  className={`h-14 rounded-2xl flex flex-col items-center justify-center transition-colors ${k ? 'hover:bg-[#F2F3F2]' : 'cursor-default'}`}
                >
                  {k && (
                    <>
                      <span className="text-xl font-semibold text-[#181725]">{k}</span>
                      <span className="text-[9px] text-[#7C7C7C] mt-0.5">{KEYPAD_LETTERS[idx]}</span>
                    </>
                  )}
                </button>
              ))}
              <button
                onClick={handleKeypadDelete}
                className="h-14 rounded-2xl flex items-center justify-center hover:bg-[#F2F3F2] transition-colors"
              >
                <span className="text-2xl text-[#181725]">⌫</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-[#181725] mb-1">Enter your {OTP_LENGTH}-digit code</h1>
            <p className="text-sm text-[#7C7C7C] mb-2">Sent to {selectedCountry.dial} {phoneNumber}</p>
            <p className="text-xs text-[#53B175] font-medium mb-6">Use code: 123456 (demo)</p>

            {/* OTP inputs */}
            <div className="flex justify-between gap-2 mb-6">
              {code.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(i, e.target.value)}
                  onKeyDown={(e) => handleCodeKeyDown(i, e)}
                  className="w-11 h-14 border-b-2 border-[#E2E2E2] text-center text-2xl font-bold text-[#181725] outline-none focus:border-[#53B175] transition-colors bg-transparent"
                />
              ))}
            </div>

            {/* Resend + arrow */}
            <div className="flex items-center justify-between mb-8">
              <button className="text-sm text-[#53B175] font-medium">Resend Code</button>
              <button
                onClick={handleVerify}
                disabled={!isOtpComplete || isLoading}
                className="w-10 h-10 bg-[#53B175] rounded-full flex items-center justify-center text-white hover:bg-[#3a8a55] transition-colors disabled:opacity-40"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-3">
              {KEYPAD.map((k, idx) => (
                <button
                  key={idx}
                  onClick={() => k && handleOtpKeypad(k)}
                  disabled={!k}
                  className={`h-14 rounded-2xl flex flex-col items-center justify-center transition-colors ${k ? 'hover:bg-[#F2F3F2]' : 'cursor-default'}`}
                >
                  {k && <span className="text-xl font-semibold text-[#181725]">{k}</span>}
                </button>
              ))}
              <button
                onClick={handleOtpKeypadDelete}
                className="h-14 rounded-2xl flex items-center justify-center hover:bg-[#F2F3F2] transition-colors"
              >
                <span className="text-2xl text-[#181725]">⌫</span>
              </button>
            </div>

            <div className="mt-4">
              <Button fullWidth isLoading={isLoading} onClick={handleVerify} disabled={!isOtpComplete}>
                Verify
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Country Picker Modal */}
      {showCountryPicker && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={() => setShowCountryPicker(false)}>
          <div
            className="bg-white w-full max-w-sm rounded-t-3xl px-4 pt-4 pb-8 max-h-[70vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-[#E2E2E2] rounded-full mx-auto mb-4" />
            <h3 className="text-base font-bold text-[#181725] mb-3">Select Country</h3>
            <input
              type="text"
              placeholder="Search country or dial code..."
              value={countrySearch}
              onChange={(e) => setCountrySearch(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F2F3F2] text-sm text-[#181725] outline-none mb-3 placeholder-[#7C7C7C]"
              autoFocus
            />
            <div className="overflow-y-auto flex-1">
              {filteredCountries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => {
                    setSelectedCountry(country);
                    setPhoneNumber('');
                    setShowCountryPicker(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#F2F3F2] transition-colors mb-1 ${selectedCountry.code === country.code ? 'bg-[#E8F5EE]' : ''}`}
                >
                  <span className="text-2xl">{country.flag}</span>
                  <span className="flex-1 text-sm text-[#181725] text-left">{country.name}</span>
                  <span className="text-sm text-[#7C7C7C] font-medium">{country.dial}</span>
                  {selectedCountry.code === country.code && (
                    <span className="text-[#53B175]">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
