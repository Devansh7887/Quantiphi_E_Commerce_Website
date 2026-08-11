import React from 'react';
import { ShoppingBag, Search, SlidersHorizontal, Sparkles } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
  totalProductsCount: number;
  filteredCount: number;
  onMobileFilterToggle?: () => void;
  onOpenCart?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  cartCount,
  totalProductsCount,
  filteredCount,
  onMobileFilterToggle,
  onOpenCart,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold text-xl tracking-wider">
              Q
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-white font-mono">QUANTIPHI</span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-semibold tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
                  MARKETPLACE
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Precision Multi-Filter Product Catalog
              </p>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="flex-1 max-w-md mx-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name, brand, or specs..."
                className="w-full pl-10 pr-4 py-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-400 transition-all outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Controls Right Section */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Mobile Filter Toggle Button */}
            <button
              onClick={onMobileFilterToggle}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-medium text-slate-200 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
              <span>Filters</span>
            </button>

            {/* Live Stats Badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-800/60 rounded-xl border border-slate-700/60 text-xs text-slate-300 font-mono">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{filteredCount} / {totalProductsCount} Items</span>
            </div>

            {/* Shopping Cart Button */}
            <div className="relative">
              <button
                onClick={onOpenCart}
                className="p-2.5 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-xl text-slate-200 transition-all relative flex items-center justify-center cursor-pointer active:scale-95"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5 text-indigo-300" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-indigo-600 text-white font-bold text-[10px] rounded-full flex items-center justify-center shadow-md animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
