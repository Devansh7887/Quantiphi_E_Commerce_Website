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
    <div className="group relative bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
      
      {/* Image Thumbnail & Badges */}
      <div className="relative aspect-square overflow-hidden bg-slate-950">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="px-2.5 py-1 bg-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider rounded-lg shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-slate-950" />
              Best Seller
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2.5 py-1 bg-indigo-500 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg shadow-md">
              New Arrival
            </span>
          )}
        </div>

        {/* Brand Tag Right Top */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2 py-0.5 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-slate-300 text-[10px] font-mono rounded-md">
            {product.brand}
          </span>
        </div>

        {/* Quick View Floating Action */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 p-4">
          <button
            onClick={() => onQuickView(product)}
            className="px-4 py-2 bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-lg border border-slate-700 flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          >
            <Eye className="w-4 h-4 text-indigo-400" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        
        <div>
          {/* Category & Rating Row */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">
              {product.category}
            </span>

            {/* Star Rating Display */}
            <div className="flex items-center gap-1">
              <div className="flex items-center text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </div>
              <span className="font-bold text-xs text-slate-100 font-mono">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-[10px] text-slate-400">
                ({product.reviewCount})
              </span>
            </div>
          </div>

          {/* Item Name */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-bold text-sm text-slate-100 line-clamp-2 hover:text-indigo-300 cursor-pointer transition-colors leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>

        {/* Footer: Price Tag & Add to Cart */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 mt-auto">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-mono">Price</span>
            <span className="text-lg font-extrabold text-emerald-400 font-mono">
              ${product.price}
            </span>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md ${
              isAddedToCart
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white active:scale-95'
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
