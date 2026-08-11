import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpDown, ChevronDown, Check } from 'lucide-react';
import { SortOption } from '../types';

interface SortDropdownProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SORT_OPTIONS: { id: SortOption; label: string; group?: string }[] = [
  { id: 'featured', label: 'Featured & Relevancy' },
  { id: 'price_asc', label: 'Price: Low to High' },
  { id: 'price_desc', label: 'Price: High to Low' },
  { id: 'rating_desc', label: 'Top Rated First' },
  { id: 'reviews_desc', label: 'Most Reviewed' },
  { id: 'name_asc', label: 'Alphabetical: A to Z' },
];

export const SortDropdown: React.FC<SortDropdownProps> = ({
  currentSort,
  onSortChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeOption = SORT_OPTIONS.find((opt) => opt.id === currentSort) || SORT_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-zinc-500 hidden sm:inline-block">
          Sort By:
        </span>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-between gap-2 px-3.5 py-2 bg-zinc-100 hover:bg-zinc-200/80 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-800 transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-zinc-900/10 min-w-[170px]"
        >
          <div className="flex items-center gap-2 truncate">
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
            <span className="truncate">{activeOption.label}</span>
          </div>
          <ChevronDown
            className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 shrink-0 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-md bg-white border border-zinc-200 ring-1 ring-black/5 divide-y divide-zinc-100 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="py-1">
            {SORT_OPTIONS.map((option) => {
              const isSelected = option.id === currentSort;
              return (
                <button
                  key={option.id}
                  onClick={() => {
                    onSortChange(option.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-zinc-900 text-white font-semibold'
                      : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900'
                  }`}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-white" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
