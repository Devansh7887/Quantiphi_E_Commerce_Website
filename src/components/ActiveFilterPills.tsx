import React from 'react';
import { X, RotateCcw } from 'lucide-react';

interface ActiveFilterPillsProps {
  selectedCategories: string[];
  onRemoveCategory: (category: string) => void;
  minPrice: number;
  maxPrice: number;
  globalMinPrice: number;
  globalMaxPrice: number;
  onResetPrice: () => void;
  minRating: number;
  onResetRating: () => void;
  searchQuery: string;
  onResetSearch: () => void;
  onResetAll: () => void;
  activeFiltersCount: number;
}

export const ActiveFilterPills: React.FC<ActiveFilterPillsProps> = ({
  selectedCategories,
  onRemoveCategory,
  minPrice,
  maxPrice,
  globalMinPrice,
  globalMaxPrice,
  onResetPrice,
  minRating,
  onResetRating,
  searchQuery,
  onResetSearch,
  onResetAll,
  activeFiltersCount,
}) => {
  if (activeFiltersCount === 0) return null;

  const isPriceFiltered = minPrice > globalMinPrice || maxPrice < globalMaxPrice;

  return (
    <div className="flex flex-wrap items-center gap-2 py-2">
      <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
        Active Filters:
      </span>

      {/* Categories Pills */}
      {selectedCategories.map((cat) => (
        <span
          key={cat}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-zinc-100 border border-zinc-200 text-zinc-800"
        >
          <span>Category: {cat}</span>
          <button
            onClick={() => onRemoveCategory(cat)}
            className="hover:text-zinc-900 transition-colors cursor-pointer"
            title="Remove category"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </span>
      ))}

      {/* Price Range Pill */}
      {isPriceFiltered && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-zinc-100 border border-zinc-200 text-zinc-800">
          <span>Price: ${minPrice} - ${maxPrice}</span>
          <button
            onClick={onResetPrice}
            className="hover:text-zinc-900 transition-colors cursor-pointer"
            title="Reset price filter"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </span>
      )}

      {/* Star Rating Pill */}
      {minRating > 0 && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-amber-50 border border-amber-200 text-amber-900">
          <span>Rating: {minRating}★ & above</span>
          <button
            onClick={onResetRating}
            className="hover:text-amber-950 transition-colors cursor-pointer"
            title="Reset rating filter"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </span>
      )}

      {/* Search Pill */}
      {searchQuery && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-zinc-100 border border-zinc-200 text-zinc-800">
          <span>Search: "{searchQuery}"</span>
          <button
            onClick={onResetSearch}
            className="hover:text-zinc-900 transition-colors cursor-pointer"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </span>
      )}

      {/* Clear All Link */}
      <button
        onClick={onResetAll}
        className="text-xs text-rose-600 hover:text-rose-700 font-semibold underline underline-offset-2 ml-1 cursor-pointer"
      >
        Clear All
      </button>
    </div>
  );
};
