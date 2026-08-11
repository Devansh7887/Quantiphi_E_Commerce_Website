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
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-8 sm:p-12 text-center shadow-xl flex flex-col items-center justify-center my-6">
      
      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-4 shadow-lg shadow-rose-500/5 animate-pulse">
        <FilterX className="w-8 h-8" />
      </div>

      {/* Primary Message */}
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
        No items match your criteria
      </h2>

      <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
        We couldn't find any products in our catalog satisfying all your active filter conditions simultaneously.
      </p>

      {/* Applied Criteria Breakdown Box */}
      {activeFiltersCount > 0 && (
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 max-w-lg w-full mb-6 text-left text-xs space-y-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-300 pb-1.5 border-b border-slate-800">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span>Currently Active Constraints ({activeFiltersCount}):</span>
          </div>

          <ul className="space-y-1 text-slate-400 list-disc list-inside pl-1 font-mono">
            {appliedCategories.length > 0 && (
              <li>Categories: <span className="text-indigo-300">{appliedCategories.join(', ')}</span></li>
            )}
            {(minPrice > 0 || maxPrice < 2000) && (
              <li>Price Boundary: <span className="text-emerald-400">${minPrice} - ${maxPrice}</span></li>
            )}
            {minRating > 0 && (
              <li>Minimum Star Rating: <span className="text-amber-400">{minRating} ★ & above</span></li>
            )}
            {searchQuery && (
              <li>Search Query: <span className="text-cyan-300">"{searchQuery}"</span></li>
            )}
          </ul>
        </div>
      )}

      {/* Reset Filters CTA Button */}
      <button
        onClick={onResetFilters}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-500/25 transition-all transform active:scale-95 cursor-pointer"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Reset filters & view all products</span>
      </button>

    </div>
  );
};
