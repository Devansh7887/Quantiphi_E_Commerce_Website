import React from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Product } from '../types';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);
  const [orderComplete, setOrderComplete] = React.useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
    }, 1500);
  };

  const handleFinishOrder = () => {
    setOrderComplete(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-white border-l border-zinc-200 shadow-xl h-full flex flex-col z-50 text-zinc-900 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-800">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900 tracking-wide">Shopping Bag</h2>
              <p className="text-xs text-zinc-500 font-mono">
                {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && !orderComplete && (
              <button
                onClick={onClearCart}
                className="text-xs text-rose-600 hover:text-rose-700 font-medium px-2 py-1 rounded hover:bg-rose-50 transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900 rounded-lg border border-zinc-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 custom-scrollbar">
          {orderComplete ? (
            /* Order Placed Success View */
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center animate-bounce shadow-2xs">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-extrabold text-zinc-900">Order Confirmed!</h3>
              <p className="text-xs text-zinc-600 max-w-xs leading-relaxed">
                Thank you for shopping with Quantiphi Marketplace. Your items have been processed successfully.
              </p>
              <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-left w-full max-w-xs text-xs font-mono space-y-1">
                <div className="text-zinc-500 flex justify-between">
                  <span>Order ID:</span>
                  <span className="text-zinc-900 font-bold">#QP-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="text-zinc-500 flex justify-between">
                  <span>Total Paid:</span>
                  <span className="text-zinc-900 font-bold">${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleFinishOrder}
                className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : items.length === 0 ? (
            /* Empty Cart View */
            <div className="h-full flex flex-col items-center justify-center text-center py-16 text-zinc-400 space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-sm font-semibold text-zinc-800">Your shopping bag is empty</p>
              <p className="text-xs text-zinc-500 max-w-xs">
                Explore our catalog and add items using the "Add" button on product cards.
              </p>
            </div>
          ) : (
            /* Cart Items List */
            items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-zinc-50 border border-zinc-200 rounded-2xl p-3.5 flex gap-3 items-center shadow-2xs hover:border-zinc-300 transition-all"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-xl bg-zinc-200 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono font-semibold text-zinc-500 uppercase">
                    {product.category}
                  </span>
                  <h4 className="text-xs font-bold text-zinc-900 truncate" title={product.name}>
                    {product.name}
                  </h4>
                  <div className="text-xs font-mono text-zinc-900 font-bold mt-0.5">
                    ${product.price}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => onRemoveItem(product.id)}
                    className="text-zinc-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center bg-white rounded-lg border border-zinc-200 p-0.5 shadow-2xs">
                    <button
                      onClick={() => onUpdateQuantity(product.id, -1)}
                      className="p-1 hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900 rounded transition-colors cursor-pointer"
                      title="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 text-xs font-mono font-bold text-zinc-900 min-w-[20px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(product.id, 1)}
                      className="p-1 hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900 rounded transition-colors cursor-pointer"
                      title="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Summary */}
        {items.length > 0 && !orderComplete && (
          <div className="p-4 sm:p-5 border-t border-zinc-100 bg-zinc-50/80 space-y-3">
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal</span>
                <span className="text-zinc-900 font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Estimated Shipping</span>
                <span className="text-zinc-900 font-medium">
                  {shipping === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-zinc-900 pt-2 border-t border-zinc-200">
                <span>Total</span>
                <span className="text-zinc-900">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98 cursor-pointer"
            >
              {isCheckingOut ? (
                <span>Processing Order...</span>
              ) : (
                <>
                  <span>Checkout (${total.toFixed(2)})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-700" />
              <span>Secure Encrypted Express Checkout</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
