'use client';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  onFilterClick?: () => void;
  showFilter?: boolean;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search Store',
  className = '',
  onFilterClick,
  showFilter = false,
}: SearchBarProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex-1">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C7C7C] text-sm pointer-events-none">
          🔍
        </span>
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 bg-[#F2F3F2] rounded-2xl text-sm text-[#181725] placeholder-[#7C7C7C] outline-none focus:ring-2 focus:ring-[#53B175]/30 transition"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7C7C7C] hover:text-[#181725]"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      {showFilter && (
        <button
          onClick={onFilterClick}
          className="w-12 h-12 flex items-center justify-center bg-[#F2F3F2] rounded-2xl text-[#181725] hover:bg-[#E8F5EE] hover:text-[#53B175] transition-colors"
          aria-label="Open filters"
        >
          ⚙️
        </button>
      )}
    </div>
  );
}
