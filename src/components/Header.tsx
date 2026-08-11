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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200 text-zinc-900 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 flex items-center justify-center text-white font-black text-lg tracking-wider shadow-xs">
              Q
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-zinc-900 font-mono">QUANTIPHI</span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-semibold tracking-wider bg-zinc-100 text-zinc-700 border border-zinc-200 rounded-md">
                  MARKETPLACE
                </span>
              </div>
              <p className="text-xs text-zinc-500 hidden sm:block">
                Precision Multi-Filter Product Catalog
              </p>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="flex-1 max-w-md mx-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name, brand, or specs..."
                className="w-full pl-10 pr-4 py-2 bg-zinc-100/80 hover:bg-zinc-100 border border-zinc-200 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 rounded-xl text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 transition-all outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-zinc-400 hover:text-zinc-600 font-medium"
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
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-800 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-zinc-700" />
              <span>Filters</span>
            </button>

            {/* Live Stats Badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-zinc-100/80 rounded-xl border border-zinc-200/80 text-xs text-zinc-600 font-mono">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>{filteredCount} / {totalProductsCount} Items</span>
            </div>

            {/* Shopping Cart Button */}
            <div className="relative">
              <button
                onClick={onOpenCart}
                className="p-2.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 rounded-xl text-zinc-800 transition-all relative flex items-center justify-center cursor-pointer active:scale-95"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5 text-zinc-800" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-zinc-900 text-white font-bold text-[10px] rounded-full flex items-center justify-center shadow-xs">
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
