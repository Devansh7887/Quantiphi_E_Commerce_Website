import React, { useState, useEffect, useCallback } from 'react';
import { Star, RotateCcw, Check, Filter, Layers, DollarSign } from 'lucide-react';
import { CategoryMetaData } from '../types';

interface SidebarFilterProps {
  categories: CategoryMetaData[];
  selectedCategories: string[];
  onCategoryToggle: (categoryName: string) => void;
  onSelectAllCategories: () => void;
  onClearCategories: () => void;

  // Dual-point Price Range Slider
  globalMinPrice: number;
  globalMaxPrice: number;
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;

  // Minimum Star Rating
  minRating: number;
  onRatingChange: (rating: number) => void;

  // Reset
  onResetFilters: () => void;
  activeFiltersCount: number;
  filteredCount: number;
  totalMasterCount: number;
}

export const SidebarFilter: React.FC<SidebarFilterProps> = ({
  categories,
  selectedCategories,
  onCategoryToggle,
  onSelectAllCategories,
  onClearCategories,

  globalMinPrice,
  globalMaxPrice,
  minPrice,
  maxPrice,
  onPriceChange,

  minRating,
  onRatingChange,

  onResetFilters,
  activeFiltersCount,
  filteredCount,
  totalMasterCount,
}) => {

  // Local state for smooth, unconstrained manual price typing
  const [minInputVal, setMinInputVal] = useState<string>(String(minPrice));
  const [maxInputVal, setMaxInputVal] = useState<string>(String(maxPrice));

  // Keep local manual input values synchronized with props (e.g. from sliders, presets, reset)
  useEffect(() => {
    setMinInputVal(String(minPrice));
  }, [minPrice]);

  useEffect(() => {
    setMaxInputVal(String(maxPrice));
  }, [maxPrice]);

  // Dual Range Handle Calculations
  const rangeSpan = Math.max(1, globalMaxPrice - globalMinPrice);
  const minPercent = Math.min(100, Math.max(0, ((minPrice - globalMinPrice) / rangeSpan) * 100));
  const maxPercent = Math.min(100, Math.max(0, ((maxPrice - globalMinPrice) / rangeSpan) * 100));

  const handleMinSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val <= maxPrice) {
      onPriceChange(val, maxPrice);
    }
  };

  const handleMaxSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val >= minPrice) {
      onPriceChange(minPrice, val);
    }
  };

  // Handle manual typing in Min Price Input
  const handleMinTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setMinInputVal(raw);

    if (raw !== '') {
      const parsed = Number(raw);
      if (!isNaN(parsed) && parsed >= 0) {
        onPriceChange(parsed, maxPrice);
      }
    }
  };

  // On blur or Enter key, sanitize/clamp min input value
  const handleMinBlurOrSubmit = () => {
    if (minInputVal.trim() === '') {
      setMinInputVal(String(globalMinPrice));
      onPriceChange(globalMinPrice, maxPrice);
      return;
    }
    const parsed = Number(minInputVal);
    if (isNaN(parsed)) {
      setMinInputVal(String(minPrice));
      return;
    }
    let clamped = parsed;
    if (clamped < 0) clamped = 0;
    if (clamped > maxPrice) clamped = maxPrice;
    
    setMinInputVal(String(clamped));
    onPriceChange(clamped, maxPrice);
  };

  // Handle manual typing in Max Price Input
  const handleMaxTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setMaxInputVal(raw);

    if (raw !== '') {
      const parsed = Number(raw);
      if (!isNaN(parsed) && parsed >= 0) {
        onPriceChange(minPrice, parsed);
      }
    }
  };

  // On blur or Enter key, sanitize/clamp max input value
  const handleMaxBlurOrSubmit = () => {
    if (maxInputVal.trim() === '') {
      setMaxInputVal(String(globalMaxPrice));
      onPriceChange(minPrice, globalMaxPrice);
      return;
    }
    const parsed = Number(maxInputVal);
    if (isNaN(parsed)) {
      setMaxInputVal(String(maxPrice));
      return;
    }
    let clamped = parsed;
    if (clamped < minPrice) clamped = minPrice;

    setMaxInputVal(String(clamped));
    onPriceChange(minPrice, clamped);
  };

  // Quick Price Presets
  const applyPricePreset = (presetMin: number, presetMax: number) => {
    const minVal = Math.max(globalMinPrice, presetMin);
    const maxVal = Math.min(globalMaxPrice, presetMax);
    onPriceChange(minVal, maxVal);
  };

  return (
    <aside className="w-full space-y-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl text-slate-100 max-h-[calc(100vh-6rem)] overflow-y-auto custom-scrollbar">
      
      {/* Sidebar Header & Reset CTA */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-indigo-400" />
          <h2 className="text-base font-bold text-white tracking-wide">Filter Products</h2>
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg transition-colors"
            title="Reset all filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset ({activeFiltersCount})</span>
          </button>
        )}
      </div>

      {/* 1) Category Checklist Group */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Categories</span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <button
              onClick={onSelectAllCategories}
              className="text-indigo-400 hover:text-indigo-300 font-medium hover:underline"
            >
              Select All
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={onClearCategories}
              className="text-slate-400 hover:text-slate-200 font-medium hover:underline"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="space-y-1.5 pt-1">
          {categories.map((cat) => {
            const isChecked = selectedCategories.includes(cat.name);
            return (
              <button
                type="button"
                key={cat.name}
                onClick={() => onCategoryToggle(cat.name)}
                role="checkbox"
                aria-checked={isChecked}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs cursor-pointer transition-all border text-left ${
                  isChecked
                    ? 'bg-indigo-600/15 border-indigo-500/40 text-indigo-200 font-medium'
                    : 'bg-slate-800/40 hover:bg-slate-800 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-all shrink-0 ${
                      isChecked
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : 'border-slate-600 bg-slate-900'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className="truncate">{cat.name}</span>
                </div>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full shrink-0 ${
                    isChecked
                      ? 'bg-indigo-500/30 text-indigo-200'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2) Dual-point Price Range Slider Track */}
      <div className="space-y-3 pt-2 border-t border-slate-800/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>Price Range</span>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400">
            ${minPrice} - ${maxPrice}
          </span>
        </div>

        {/* Dual Slider Visual Track */}
        <div className="relative pt-4 pb-2 px-1">
          {/* Background Track */}
          <div className="h-2 bg-slate-800 rounded-full relative w-full overflow-hidden">
            {/* Active Range Highlight */}
            <div
              className="absolute h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
              style={{
                left: `${minPercent}%`,
                width: `${Math.max(0, maxPercent - minPercent)}%`,
              }}
            />
          </div>

          {/* Dual Range Hidden Native Sliders Overlaid */}
          <input
            type="range"
            min={globalMinPrice}
            max={globalMaxPrice}
            value={minPrice}
            onChange={handleMinSliderChange}
            className="absolute top-3 left-0 w-full appearance-none bg-transparent pointer-events-auto cursor-pointer focus:outline-none z-20 range-thumb-emerald"
          />
          <input
            type="range"
            min={globalMinPrice}
            max={globalMaxPrice}
            value={maxPrice}
            onChange={handleMaxSliderChange}
            className="absolute top-3 left-0 w-full appearance-none bg-transparent pointer-events-auto cursor-pointer focus:outline-none z-30 range-thumb-teal"
          />
        </div>

        {/* Min & Max Numeric Inputs */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div>
            <label className="text-[10px] text-slate-400 block mb-1 font-mono uppercase">
              Min ($)
            </label>
            <input
              type="number"
              value={minInputVal}
              onChange={handleMinTextChange}
              onBlur={handleMinBlurOrSubmit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleMinBlurOrSubmit();
                  (e.target as HTMLInputElement).blur();
                }
              }}
              placeholder={`${globalMinPrice}`}
              className="w-full px-2.5 py-1.5 bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 rounded-lg text-xs font-mono text-slate-100 outline-none transition-all"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-400 block mb-1 font-mono uppercase">
              Max ($)
            </label>
            <input
              type="number"
              value={maxInputVal}
              onChange={handleMaxTextChange}
              onBlur={handleMaxBlurOrSubmit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleMaxBlurOrSubmit();
                  (e.target as HTMLInputElement).blur();
                }
              }}
              placeholder={`${globalMaxPrice}`}
              className="w-full px-2.5 py-1.5 bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 rounded-lg text-xs font-mono text-slate-100 outline-none transition-all"
            />
          </div>
        </div>

        {/* Quick Price Presets */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <button
            onClick={() => applyPricePreset(0, 50)}
            className="px-2 py-1 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-md text-[10px] text-slate-300 transition-colors"
          >
            Under $50
          </button>
          <button
            onClick={() => applyPricePreset(50, 200)}
            className="px-2 py-1 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-md text-[10px] text-slate-300 transition-colors"
          >
            $50 - $200
          </button>
          <button
            onClick={() => applyPricePreset(200, 500)}
            className="px-2 py-1 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-md text-[10px] text-slate-300 transition-colors"
          >
            $200 - $500
          </button>
          <button
            onClick={() => applyPricePreset(500, globalMaxPrice)}
            className="px-2 py-1 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-md text-[10px] text-slate-300 transition-colors"
          >
            $500+
          </button>
        </div>
      </div>

      {/* 3) Minimum Star Rating Radio Selection Buttons */}
      <div className="space-y-3 pt-2 border-t border-slate-800/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Minimum Star Rating</span>
          </div>
          {minRating > 0 && (
            <button
              onClick={() => onRatingChange(0)}
              className="text-[10px] text-amber-400 hover:underline"
            >
              Clear
            </button>
          )}
        </div>

        <div className="space-y-1.5 pt-1">
          {[
            { val: 0, label: 'All Ratings' },
            { val: 4.5, label: '4.5 ★ & above' },
            { val: 4.0, label: '4.0 ★ & above' },
            { val: 3.0, label: '3.0 ★ & above' },
            { val: 2.0, label: '2.0 ★ & above' },
          ].map(({ val, label }) => {
            const isSelected = minRating === val;
            return (
              <button
                type="button"
                key={val}
                onClick={() => onRatingChange(val)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs cursor-pointer transition-all border text-left ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-200 font-medium'
                    : 'bg-slate-800/40 hover:bg-slate-800 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-amber-400 bg-amber-500/20'
                        : 'border-slate-600 bg-slate-900'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-amber-400" />
                    )}
                  </div>

                  {val === 0 ? (
                    <span>All Ratings</span>
                  ) : (
                    <div className="flex items-center gap-1">
                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(val)
                                ? 'fill-amber-400 text-amber-400'
                                : i < val
                                ? 'fill-amber-400/50 text-amber-400'
                                : 'text-slate-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] font-mono text-slate-300">
                        ({val}+)
                      </span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800/80">
        <span>Instant Server Pipeline</span>
        <span className="font-mono text-indigo-400">{filteredCount} matches</span>
      </div>

    </aside>
  );
};
