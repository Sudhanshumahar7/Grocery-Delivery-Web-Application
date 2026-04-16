'use client';

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE = {
  sm: { btn: 'w-7 h-7 text-base', text: 'text-sm w-6' },
  md: { btn: 'w-9 h-9 text-lg', text: 'text-base w-8' },
  lg: { btn: 'w-10 h-10 text-xl', text: 'text-lg w-10' },
};

export default function QuantitySelector({
  quantity,
  onIncrement,
  onDecrement,
  min = 1,
  size = 'md',
}: QuantitySelectorProps) {
  const s = SIZE[size];
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onDecrement}
        disabled={quantity <= min}
        className={`${s.btn} rounded-full border border-[#E2E2E2] flex items-center justify-center text-[#53B175] font-bold hover:bg-[#E8F5EE] transition-colors disabled:opacity-40`}
      >
        −
      </button>
      <span className={`${s.text} font-bold text-[#181725] text-center`}>
        {quantity}
      </span>
      <button
        onClick={onIncrement}
        className={`${s.btn} rounded-full bg-[#53B175] flex items-center justify-center text-white font-bold hover:bg-[#3a8a55] transition-colors`}
      >
        +
      </button>
    </div>
  );
}
