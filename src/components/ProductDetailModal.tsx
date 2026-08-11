import React from 'react';
import { X, Star, ShoppingCart, Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  isAddedToCart?: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isAddedToCart = false,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white border border-zinc-200 rounded-2xl shadow-xl overflow-hidden text-zinc-900 flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 bg-white/90 hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900 rounded-full border border-zinc-200 transition-colors shadow-2xs"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Panel */}
        <div className="w-full md:w-1/2 bg-zinc-100 relative aspect-square md:aspect-auto">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            <span className="px-2.5 py-1 bg-zinc-900 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg shadow-2xs">
              {product.category}
            </span>
          </div>
        </div>

        {/* Product Info Panel */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                {product.brand}
              </span>
              <h2 className="text-xl font-extrabold text-zinc-900 mt-1 leading-tight">
                {product.name}
              </h2>
            </div>

            {/* Price & Rating */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div>
                <span className="text-2xl font-black text-zinc-900 font-mono">
                  ${product.price}
                </span>
              </div>

              <div className="flex items-center gap-1.5 bg-zinc-100 px-2.5 py-1 rounded-xl border border-zinc-200/80">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span className="font-bold text-sm text-zinc-900 font-mono">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-xs text-zinc-500">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-zinc-600 leading-relaxed">
              {product.description}
            </p>

            {/* Specs Grid */}
            {product.specifications && (
              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  Specifications
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div
                      key={key}
                      className="bg-zinc-50 p-2 rounded-lg border border-zinc-200"
                    >
                      <span className="text-zinc-500 block text-[10px]">{key}</span>
                      <span className="text-zinc-900 font-semibold">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Perks */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-zinc-500">
              <div className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-zinc-700" />
                <span>Fast Shipping</span>
              </div>
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-700" />
                <span>2-Year Warranty</span>
              </div>
              <div className="flex items-center gap-1">
                <RefreshCw className="w-3.5 h-3.5 text-zinc-700" />
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>

          {/* Add to Cart CTA */}
          <div className="pt-6 mt-4 border-t border-zinc-100">
            <button
              onClick={() => onAddToCart(product)}
              className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer ${
                isAddedToCart
                  ? 'bg-emerald-600 text-white'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-white active:scale-98'
              }`}
            >
              {isAddedToCart ? (
                <>
                  <Check className="w-5 h-5 stroke-[3]" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart (${product.price})</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
