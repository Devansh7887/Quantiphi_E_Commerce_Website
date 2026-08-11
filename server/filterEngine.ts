import { MASTER_PRODUCTS } from '../src/data/products';
import { Product, FilterQueryParams, ProductsResponse, SortOption, CategoryMetaData } from '../src/types';

/**
 * Core processing function for Combinatorial Intersect Filtering.
 * Accepts active combination criteria state, filters master product inventory,
 * and sorts the result. Handles graceful null state when all filters are cleared.
 */
export function processProductCatalog(params: FilterQueryParams): ProductsResponse {
  const {
    categories = [],
    minPrice,
    maxPrice,
    minRating,
    sortBy = 'featured',
    searchQuery = ''
  } = params;

  // Global bounds calculation from master dataset
  const globalMinPrice = Math.min(...MASTER_PRODUCTS.map(p => p.price));
  const globalMaxPrice = Math.max(...MASTER_PRODUCTS.map(p => p.price));

  // Determine active price limits (default to global bounds if not explicitly passed or invalid)
  const effectiveMinPrice = typeof minPrice === 'number' && !isNaN(minPrice) ? minPrice : globalMinPrice;
  const effectiveMaxPrice = typeof maxPrice === 'number' && !isNaN(maxPrice) ? maxPrice : globalMaxPrice;

  const normalizedSearch = searchQuery ? searchQuery.trim().toLowerCase() : '';

  let appliedFiltersCount = 0;

  if (categories.length > 0) appliedFiltersCount++;
  if (typeof minPrice === 'number' && minPrice > globalMinPrice) appliedFiltersCount++;
  if (typeof maxPrice === 'number' && maxPrice < globalMaxPrice) appliedFiltersCount++;
  if (typeof minRating === 'number' && minRating > 0) appliedFiltersCount++;
  if (normalizedSearch) appliedFiltersCount++;

  // Step 1: Combinatorial Intersect Filtering
  const filteredProducts = MASTER_PRODUCTS.filter((product: Product) => {
    // 1. Category Checklist group intersect logic (Graceful Null Handling: if categories array empty, pass all)
    if (categories.length > 0) {
      if (!categories.includes(product.category)) {
        return false;
      }
    }

    // 2. Price Range Boundary check (Dual-point range track)
    if (product.price < effectiveMinPrice || product.price > effectiveMaxPrice) {
      return false;
    }

    // 3. Minimum Star Rating condition (rating >= minStarRating)
    if (typeof minRating === 'number' && minRating > 0) {
      if (product.rating < minRating) {
        return false;
      }
    }

    // 4. Search query check
    if (normalizedSearch) {
      const matchName = product.name.toLowerCase().includes(normalizedSearch);
      const matchBrand = product.brand.toLowerCase().includes(normalizedSearch);
      const matchDesc = product.description.toLowerCase().includes(normalizedSearch);
      const matchCategory = product.category.toLowerCase().includes(normalizedSearch);

      if (!matchName && !matchBrand && !matchDesc && !matchCategory) {
        return false;
      }
    }

    return true;
  });

  // Step 2: Sorting Pipeline
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      case 'rating_desc':
        return b.rating - a.rating || b.reviewCount - a.reviewCount;
      case 'reviews_desc':
        return b.reviewCount - a.reviewCount;
      case 'name_asc':
        return a.name.localeCompare(b.name);
      case 'featured':
      default:
        // Featured order: best sellers first, then new arrivals, then high rating
        if (a.isBestSeller && !b.isBestSeller) return -1;
        if (!a.isBestSeller && b.isBestSeller) return 1;
        if (a.isNewArrival && !b.isNewArrival) return -1;
        if (!a.isNewArrival && b.isNewArrival) return 1;
        return b.rating - a.rating;
    }
  });

  // Calculate dynamic active category metadata with matching counts
  const allCategoryNames = Array.from(new Set(MASTER_PRODUCTS.map(p => p.category)));
  const categoryMetaData: CategoryMetaData[] = allCategoryNames.map(cat => {
    const totalCount = MASTER_PRODUCTS.filter(p => p.category === cat).length;
    // Count how many products match current criteria without category constraint
    const countInFiltered = MASTER_PRODUCTS.filter(p => {
      if (p.category !== cat) return false;
      if (p.price < effectiveMinPrice || p.price > effectiveMaxPrice) return false;
      if (typeof minRating === 'number' && minRating > 0 && p.rating < minRating) return false;
      if (normalizedSearch) {
        const matchName = p.name.toLowerCase().includes(normalizedSearch);
        const matchBrand = p.brand.toLowerCase().includes(normalizedSearch);
        const matchDesc = p.description.toLowerCase().includes(normalizedSearch);
        return matchName || matchBrand || matchDesc;
      }
      return true;
    }).length;

    return {
      name: cat,
      count: countInFiltered,
      totalCount
    };
  });

  const activePrices = filteredProducts.map(p => p.price);
  const activeMin = activePrices.length > 0 ? Math.min(...activePrices) : effectiveMinPrice;
  const activeMax = activePrices.length > 0 ? Math.max(...activePrices) : effectiveMaxPrice;

  return {
    products: sortedProducts,
    totalMasterCount: MASTER_PRODUCTS.length,
    filteredCount: sortedProducts.length,
    globalPriceBounds: { min: globalMinPrice, max: globalMaxPrice },
    activePriceBounds: { min: activeMin, max: activeMax },
    categories: categoryMetaData,
    appliedFiltersCount
  };
}
