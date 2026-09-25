import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, Check, ChevronDown, Plus } from 'lucide-react';

export interface SearchableOption {
  value: string;
  label: string;
  subLabel?: string;
  badge?: string;
}

interface SearchableSelectProps {
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  value: string;
  options: SearchableOption[];
  onChange: (value: string) => void;
  allowCustom?: boolean;
  onCustomSelect?: (customVal: string) => void;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  icon?: React.ReactNode;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  placeholder = 'Select an option...',
  searchPlaceholder = 'সার্চ করতে এখানে লিখুন...',
  value,
  options,
  onChange,
  allowCustom = true,
  onCustomSelect,
  disabled = false,
  error = false,
  icon
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [customInputValue, setCustomInputValue] = useState('');
  const [isTypingCustom, setIsTypingCustom] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
      if (listRef.current) {
        listRef.current.scrollTop = 0;
      }
    } else {
      setSearchTerm('');
      setIsTypingCustom(false);
      setCustomInputValue('');
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isOpen]);

  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchTerm.trim()) return options;
    const query = searchTerm.toLowerCase();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(query) ||
        (opt.subLabel && opt.subLabel.toLowerCase().includes(query)) ||
        (opt.badge && opt.badge.toLowerCase().includes(query))
    );
  }, [options, searchTerm]);

  // Selected Option Object
  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === value),
    [options, value]
  );

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = (customInputValue || searchTerm).trim();
    if (!trimmed) return;
    if (onCustomSelect) {
      onCustomSelect(trimmed);
    } else {
      onChange(trimmed);
    }
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative w-full ${isOpen ? 'z-50' : 'z-10'}`}>
      {/* Trigger Box - Click to open dropdown right under this box in place */}
      <button
        type="button"
        disabled={disabled}
        onClick={(e) => {
          e.preventDefault();
          setIsOpen((prev) => !prev);
        }}
        className={`w-full flex items-center justify-between gap-2 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
          disabled
            ? 'opacity-40 bg-slate-950/60 border-slate-800 cursor-not-allowed text-slate-500'
            : error
            ? 'bg-slate-950 border-rose-500/80 text-white shadow-sm shadow-rose-500/10'
            : isOpen
            ? 'bg-slate-950 border-cyan-400 text-white ring-2 ring-cyan-500/30'
            : 'bg-slate-950 border-slate-800 hover:border-cyan-500/60 text-white hover:bg-slate-900/60'
        }`}
      >
        <div className="flex items-center gap-2 truncate min-w-0">
          {icon && <span className="text-cyan-400 shrink-0">{icon}</span>}
          {selectedOption ? (
            <div className="truncate">
              <span className="font-semibold text-xs text-white">
                {selectedOption.label}
              </span>
              {selectedOption.badge && (
                <span className="ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  {selectedOption.badge}
                </span>
              )}
            </div>
          ) : value ? (
            <span className="font-semibold text-xs text-cyan-300 truncate">
              {value}
            </span>
          ) : (
            <span className="text-xs text-slate-500 truncate">
              {placeholder}
            </span>
          )}
        </div>

        <ChevronDown
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-cyan-400' : ''
          }`}
        />
      </button>

      {/* In-Place Dropdown Menu - Directly below the box, without scrolling the page */}
      {isOpen && (
        <div 
          onClick={(e) => e.stopPropagation()}
          className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-slate-900/98 backdrop-blur-xl border border-cyan-500/50 rounded-xl shadow-2xl shadow-cyan-950/80 overflow-hidden"
        >
          {/* Search Box - Directly inside the dropdown, NO autoFocus (cursor manual) */}
          <div className="p-2 border-b border-slate-800 bg-slate-950/80">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-cyan-400 absolute left-2.5 pointer-events-none" />
              <input
                type="text"
                autoFocus={false}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (filteredOptions.length > 0) {
                      handleSelect(filteredOptions[0].value);
                    }
                  }
                }}
                placeholder={searchPlaceholder}
                className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-lg pl-8 pr-7 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all font-medium"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2 p-0.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Options List - Clean scrollable list right under the box */}
          <div
            ref={listRef}
            className="max-h-60 overflow-y-auto overscroll-contain p-1 divide-y divide-slate-800/40"
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(opt.value);
                    }}
                    className={`w-full flex items-center justify-between gap-2 p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300'
                        : 'hover:bg-slate-800/80 text-slate-200 border border-transparent'
                    }`}
                  >
                    <div className="truncate">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-xs font-semibold ${
                            isSelected ? 'text-cyan-300 font-bold' : 'text-white'
                          }`}
                        >
                          {opt.label}
                        </span>
                        {opt.badge && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                            {opt.badge}
                          </span>
                        )}
                      </div>
                      {opt.subLabel && (
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          {opt.subLabel}
                        </span>
                      )}
                    </div>

                    {isSelected ? (
                      <div className="w-4 h-4 rounded-full bg-cyan-500 flex items-center justify-center text-slate-950 shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                    )}
                  </button>
                );
              })
            ) : (
              <div className="py-5 px-3 text-center">
                <p className="text-xs text-slate-400 mb-2">
                  &quot;{searchTerm}&quot; দিয়ে পাওয়া যায়নি
                </p>
                {allowCustom && searchTerm.trim() && (
                  <button
                    type="button"
                    onClick={handleCustomSubmit}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 text-xs font-semibold transition-all cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>&quot;{searchTerm.trim()}&quot; যুক্ত করুন</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Custom option prompt if enabled */}
          {allowCustom && (
            <div className="p-2 border-t border-slate-800 bg-slate-950/90">
              {!isTypingCustom ? (
                <button
                  type="button"
                  onClick={() => setIsTypingCustom(true)}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-slate-800/80 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 transition-all text-[11px] font-medium cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-cyan-400" />
                  <span>তালিকার বাইরে অন্য নাম লিখতে চান? (Add Custom)</span>
                </button>
              ) : (
                <form onSubmit={handleCustomSubmit} className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={customInputValue}
                    onChange={(e) => setCustomInputValue(e.target.value)}
                    placeholder="নাম লিখুন..."
                    className="flex-1 bg-slate-900 border border-cyan-400 rounded-lg px-2.5 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                  <button
                    type="submit"
                    disabled={!customInputValue.trim()}
                    className="px-2.5 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-colors disabled:opacity-40 cursor-pointer"
                  >
                    যোগ
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsTypingCustom(false);
                      setCustomInputValue('');
                    }}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
