import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { SidebarFilter } from './components/SidebarFilter';
import { SortDropdown } from './components/SortDropdown';
import { ProductCard } from './components/ProductCard';
import { EmptyState } from './components/EmptyState';
import { ActiveFilterPills } from './components/ActiveFilterPills';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { Product, SortOption, ProductsResponse } from './types';
import { Grid, List, Loader2, ShoppingBag, X } from 'lucide-react';

export default function App() {
  // Filter Criteria State
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // UI & Cart States
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Server Data Response State
  const [data, setData] = useState<ProductsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  // Fetch product catalog from server
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const queryParams = new URLSearchParams();

      if (selectedCategories.length > 0) {
        queryParams.set('categories', selectedCategories.join(','));
      }
      if (minPrice > 0) queryParams.set('minPrice', String(minPrice));
      if (maxPrice < 2000) queryParams.set('maxPrice', String(maxPrice));
      if (minRating > 0) queryParams.set('minRating', String(minRating));
      if (sortBy) queryParams.set('sortBy', sortBy);
      if (searchQuery.trim()) queryParams.set('searchQuery', searchQuery.trim());

      const res = await fetch(`/api/products?${queryParams.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch filtered products');

      const responseData: ProductsResponse = await res.json();
      setData(responseData);

      // Initialize price range bounds on first load
      if (minPrice === 0 && maxPrice === 2000 && responseData.globalPriceBounds) {
        setMinPrice(responseData.globalPriceBounds.min);
        setMaxPrice(responseData.globalPriceBounds.max);
      }
    } catch (err) {
      console.error('Failed to load products from server:', err);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategories, minPrice, maxPrice, minRating, sortBy, searchQuery]);

  // Trigger query on parameter change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handlers for Filtering
  const handleCategoryToggle = (categoryName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handleSelectAllCategories = () => {
    if (data?.categories) {
      setSelectedCategories(data.categories.map((c) => c.name));
    }
  };

  const handleClearCategories = () => {
    setSelectedCategories([]);
  };

  const handlePriceChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const handleRatingChange = (rating: number) => {
    setMinRating(rating);
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    if (data?.globalPriceBounds) {
      setMinPrice(data.globalPriceBounds.min);
      setMaxPrice(data.globalPriceBounds.max);
    } else {
      setMinPrice(0);
      setMaxPrice(2000);
    }
    setMinRating(0);
    setSearchQuery('');
    setSortBy('featured');
  };

  // Cart Management Handlers
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + 1,
        };
        return updated;
      }
      return [...prev, { product, quantity: 1 }];
    });

    setToastMessage(`Added "${product.name}" to shopping bag!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const globalMin = data?.globalPriceBounds?.min ?? 0;
  const globalMax = data?.globalPriceBounds?.max ?? 2000;

  const activeFiltersCount =
    (selectedCategories.length > 0 ? 1 : 0) +
    (minPrice > globalMin || maxPrice < globalMax ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white pb-16">
      
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={totalCartCount}
        totalProductsCount={data?.totalMasterCount ?? 0}
        filteredCount={data?.filteredCount ?? 0}
        onMobileFilterToggle={() => setIsMobileFilterOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-72 shrink-0 sticky top-20 self-start">
            <SidebarFilter
              categories={data?.categories ?? []}
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
              onSelectAllCategories={handleSelectAllCategories}
              onClearCategories={handleClearCategories}
              globalMinPrice={globalMin}
              globalMaxPrice={globalMax}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onPriceChange={handlePriceChange}
              minRating={minRating}
              onRatingChange={handleRatingChange}
              onResetFilters={handleResetFilters}
              activeFiltersCount={activeFiltersCount}
              filteredCount={data?.filteredCount ?? 0}
              totalMasterCount={data?.totalMasterCount ?? 0}
            />
          </div>

          {/* Main Catalog View */}
          <div className="flex-1 w-full min-w-0 space-y-4">
            
            {/* Toolbar */}
            <div className="bg-white border border-zinc-200/90 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base font-extrabold text-zinc-900 tracking-tight">
                    Product Catalog
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-zinc-100 text-zinc-800 border border-zinc-200">
                    {data ? data.filteredCount : 0} items
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Multi-filter matching across categories, price range, and star ratings
                </p>
              </div>

              {/* View & Sort Controls */}
              <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                <div className="flex items-center bg-zinc-100 p-1 rounded-xl border border-zinc-200">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      viewMode === 'grid'
                        ? 'bg-zinc-900 text-white'
                        : 'text-zinc-500 hover:text-zinc-900'
                    }`}
                    title="Grid View"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('compact')}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      viewMode === 'compact'
                        ? 'bg-zinc-900 text-white'
                        : 'text-zinc-500 hover:text-zinc-900'
                    }`}
                    title="Compact View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                <SortDropdown
                  currentSort={sortBy}
                  onSortChange={(sort) => setSortBy(sort)}
                />
              </div>
            </div>

            {/* Active Pills */}
            <ActiveFilterPills
              selectedCategories={selectedCategories}
              onRemoveCategory={handleCategoryToggle}
              minPrice={minPrice}
              maxPrice={maxPrice}
              globalMinPrice={globalMin}
              globalMaxPrice={globalMax}
              onResetPrice={() => {
                setMinPrice(globalMin);
                setMaxPrice(globalMax);
              }}
              minRating={minRating}
              onResetRating={() => setMinRating(0)}
              searchQuery={searchQuery}
              onResetSearch={() => setSearchQuery('')}
              onResetAll={handleResetFilters}
              activeFiltersCount={activeFiltersCount}
            />

            {/* Dynamic Inventory / Loading / Empty */}
            {isLoading ? (
              <div className="w-full h-80 flex flex-col items-center justify-center bg-white border border-zinc-200/80 rounded-2xl p-8 text-zinc-500 gap-3 shadow-xs">
                <Loader2 className="w-8 h-8 text-zinc-800 animate-spin" />
                <span className="text-xs font-mono text-zinc-600">
                  Executing Combinatorial Intersect Filtering pipeline...
                </span>
              </div>
            ) : hasError ? (
              <div className="w-full bg-rose-50 border border-rose-200 rounded-2xl p-8 text-center text-rose-800 my-4">
                <p className="font-bold">Failed to load product catalog from server.</p>
                <button
                  onClick={fetchProducts}
                  className="mt-3 px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold hover:bg-rose-700 cursor-pointer"
                >
                  Retry Query
                </button>
              </div>
            ) : data && data.filteredCount === 0 ? (
              <EmptyState
                onResetFilters={handleResetFilters}
                activeFiltersCount={activeFiltersCount}
                appliedCategories={selectedCategories}
                minPrice={minPrice}
                maxPrice={maxPrice}
                minRating={minRating}
                searchQuery={searchQuery}
              />
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
                    : 'grid grid-cols-1 gap-4'
                }
              >
                {data?.products.map((product) => {
                  const isAdded = cartItems.some((item) => item.product.id === product.id);
                  return (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={(p) => setSelectedProductModal(p)}
                      onAddToCart={handleAddToCart}
                      isAddedToCart={isAdded}
                    />
                  );
                })}
              </div>
            )}

          </div>
        </div>
      </main>

      {/* Mobile Sidebar Modal Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white border-l border-zinc-200 p-4 h-full overflow-y-auto z-50">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 mb-4">
              <span className="font-bold text-sm text-zinc-900">Filter Options</span>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 bg-zinc-100 text-zinc-600 rounded-lg hover:text-zinc-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <SidebarFilter
              categories={data?.categories ?? []}
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
              onSelectAllCategories={handleSelectAllCategories}
              onClearCategories={handleClearCategories}
              globalMinPrice={globalMin}
              globalMaxPrice={globalMax}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onPriceChange={handlePriceChange}
              minRating={minRating}
              onRatingChange={handleRatingChange}
              onResetFilters={handleResetFilters}
              activeFiltersCount={activeFiltersCount}
              filteredCount={data?.filteredCount ?? 0}
              totalMasterCount={data?.totalMasterCount ?? 0}
            />
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <ProductDetailModal
        product={selectedProductModal}
        onClose={() => setSelectedProductModal(null)}
        onAddToCart={handleAddToCart}
        isAddedToCart={
          selectedProductModal
            ? cartItems.some((item) => item.product.id === selectedProductModal.id)
            : false
        }
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 px-4 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs rounded-xl shadow-lg border border-zinc-800 flex items-center gap-2 cursor-pointer transition-all animate-bounce"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
