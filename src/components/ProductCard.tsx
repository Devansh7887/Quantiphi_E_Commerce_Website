import React from 'react';
import { Star, ShoppingCart, Eye, Check, Sparkles, Tag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isAddedToCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  isAddedToCart = false,
}) => {
  return (
    <div className="group relative bg-white hover:bg-white border border-zinc-200/90 hover:border-zinc-300 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full">
      
      {/* Image Thumbnail & Badges */}
      <div className="relative aspect-square overflow-hidden bg-zinc-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="px-2.5 py-1 bg-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider rounded-lg shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-slate-950" />
              Best Seller
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2.5 py-1 bg-zinc-900 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg shadow-xs">
              New Arrival
            </span>
          )}
        </div>

        {/* Brand Tag Right Top */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2 py-0.5 bg-white/90 backdrop-blur-md border border-zinc-200 text-zinc-700 text-[10px] font-mono rounded-md shadow-2xs">
            {product.brand}
          </span>
        </div>

        {/* Quick View Floating Action */}
        <div className="absolute inset-0 bg-zinc-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 p-4">
          <button
            onClick={() => onQuickView(product)}
            className="px-4 py-2 bg-white/95 hover:bg-white text-zinc-900 font-semibold text-xs rounded-xl shadow-md border border-zinc-200 flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          >
            <Eye className="w-4 h-4 text-zinc-700" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        
        <div>
          {/* Category & Rating Row */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
              {product.category}
            </span>

            {/* Star Rating Display */}
            <div className="flex items-center gap-1">
              <div className="flex items-center text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              </div>
              <span className="font-bold text-xs text-zinc-900 font-mono">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-[10px] text-zinc-400">
                ({product.reviewCount})
              </span>
            </div>
          </div>

          {/* Item Name */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-bold text-sm text-zinc-900 line-clamp-2 hover:text-zinc-600 cursor-pointer transition-colors leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          <p className="text-xs text-zinc-500 line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>

        {/* Footer: Price Tag & Add to Cart */}
        <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-2 mt-auto">
          <div>
            <span className="text-[10px] text-zinc-400 block uppercase font-mono">Price</span>
            <span className="text-lg font-extrabold text-zinc-900 font-mono">
              ${product.price}
            </span>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
              isAddedToCart
                ? 'bg-emerald-600 text-white'
                : 'bg-zinc-900 hover:bg-zinc-800 text-white active:scale-95'
            }`}
          >
            {isAddedToCart ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
};
