export interface Product {
  id: string;
  name: string;
  category: 'Electronics' | 'Apparel' | 'Footwear' | 'Home & Kitchen' | 'Fitness' | 'Accessories';
  price: number;
  rating: number; // 1.0 to 5.0
  reviewCount: number;
  image: string;
  description: string;
  brand: string;
  inStock: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  specifications: Record<string, string>;
}

export type SortOption = 'featured' | 'price_asc' | 'price_desc' | 'rating_desc' | 'reviews_desc' | 'name_asc';

export interface FilterQueryParams {
  categories?: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortBy?: SortOption;
  searchQuery?: string;
}

export interface CategoryMetaData {
  name: string;
  count: number;
  totalCount: number;
}

export interface ProductsResponse {
  products: Product[];
  totalMasterCount: number;
  filteredCount: number;
  globalPriceBounds: { min: number; max: number };
  activePriceBounds: { min: number; max: number };
  categories: CategoryMetaData[];
  appliedFiltersCount: number;
}
