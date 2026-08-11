import React from 'react';
import { FilterX, RotateCcw, AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  onResetFilters: () => void;
  activeFiltersCount: number;
  appliedCategories: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  searchQuery: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onResetFilters,
  activeFiltersCount,
  appliedCategories,
  minPrice,
  maxPrice,
  minRating,
  searchQuery,
}) => {
  return (
    <div className="w-full bg-white border border-zinc-200/90 rounded-2xl p-8 sm:p-12 text-center shadow-xs flex flex-col items-center justify-center my-6">
      
      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mb-4 shadow-2xs">
        <FilterX className="w-8 h-8" />
      </div>

      {/* Primary Message */}
      <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 mb-2">
        No items match your criteria
      </h2>

      <p className="text-sm text-zinc-500 max-w-md mb-6 leading-relaxed">
        We couldn't find any products in our catalog satisfying all your active filter conditions simultaneously.
      </p>

      {/* Applied Criteria Breakdown Box */}
      {activeFiltersCount > 0 && (
        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 max-w-lg w-full mb-6 text-left text-xs space-y-2">
          <div className="flex items-center gap-1.5 font-semibold text-zinc-800 pb-1.5 border-b border-zinc-200">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>Currently Active Constraints ({activeFiltersCount}):</span>
          </div>

          <ul className="space-y-1 text-zinc-600 list-disc list-inside pl-1 font-mono">
            {appliedCategories.length > 0 && (
              <li>Categories: <span className="text-zinc-900 font-semibold">{appliedCategories.join(', ')}</span></li>
            )}
            {(minPrice > 0 || maxPrice < 2000) && (
              <li>Price Boundary: <span className="text-zinc-900 font-semibold">${minPrice} - ${maxPrice}</span></li>
            )}
            {minRating > 0 && (
              <li>Minimum Star Rating: <span className="text-amber-700 font-semibold">{minRating} ★ & above</span></li>
            )}
            {searchQuery && (
              <li>Search Query: <span className="text-zinc-900 font-semibold">"{searchQuery}"</span></li>
            )}
          </ul>
        </div>
      )}

      {/* Reset Filters CTA Button */}
      <button
        onClick={onResetFilters}
        className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm rounded-xl shadow-xs transition-all transform active:scale-95 cursor-pointer"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Reset filters & view all products</span>
      </button>

    </div>
  );
};
