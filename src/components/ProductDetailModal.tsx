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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full border border-slate-700/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Panel */}
        <div className="w-full md:w-1/2 bg-slate-950 relative aspect-square md:aspect-auto">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            <span className="px-2.5 py-1 bg-indigo-600 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg">
              {product.category}
            </span>
          </div>
        </div>

        {/* Product Info Panel */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                {product.brand}
              </span>
              <h2 className="text-xl font-extrabold text-white mt-1 leading-tight">
                {product.name}
              </h2>
            </div>

            {/* Price & Rating */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-2xl font-black text-emerald-400 font-mono">
                  ${product.price}
                </span>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-xl border border-slate-700/60">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-sm text-slate-100 font-mono">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-xs text-slate-400">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-300 leading-relaxed">
              {product.description}
            </p>

            {/* Specs Grid */}
            {product.specifications && (
              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Specifications
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div
                      key={key}
                      className="bg-slate-800/60 p-2 rounded-lg border border-slate-700/50"
                    >
                      <span className="text-slate-400 block text-[10px]">{key}</span>
                      <span className="text-indigo-200 font-semibold">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Perks */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-slate-400">
              <div className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-indigo-400" />
                <span>Fast Shipping</span>
              </div>
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>2-Year Warranty</span>
              </div>
              <div className="flex items-center gap-1">
                <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>

          {/* Add to Cart CTA */}
          <div className="pt-6 mt-4 border-t border-slate-800">
            <button
              onClick={() => onAddToCart(product)}
              className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                isAddedToCart
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white active:scale-98'
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
