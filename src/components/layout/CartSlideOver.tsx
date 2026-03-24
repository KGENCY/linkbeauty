"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/data/CartContext";

export default function CartSlideOver() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/40" onClick={() => setIsCartOpen(false)} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in">
        <div className="flex items-center justify-between p-6 border-b border-[#e8e4de]">
          <h2 className="text-h3 text-[#1a1a1a]">Your Bag ({items.length})</h2>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-[#f9f9f7] rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#e8e4de] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-[#6b6b6b] mb-2">Your bag is empty</p>
              <p className="text-sm text-[#6b6b6b]">Discover products through your favorite creators</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-3 bg-[#f9f9f7] rounded-2xl">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-label text-[#6b6b6b]">{item.product.brand}</p>
                    <p className="text-sm font-semibold text-[#1a1a1a] truncate">{item.product.name}</p>
                    <p className="text-sm font-bold text-[#3d7a5f] mt-1">${item.product.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-full border border-[#e8e4de] text-sm hover:bg-[#f9f9f7]"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-full border border-[#e8e4de] text-sm hover:bg-[#f9f9f7]"
                      >
                        +
                      </button>
                      <button onClick={() => removeFromCart(item.product.id)} className="ml-auto text-[#6b6b6b] hover:text-[#3d7a5f]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-[#e8e4de] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[#6b6b6b]">Subtotal</span>
              <span className="text-lg font-bold text-[#1a1a1a]">${totalPrice.toFixed(2)}</span>
            </div>
            <Link
              href="/cart"
              onClick={() => setIsCartOpen(false)}
              className="block w-full bg-[#3d7a5f] text-white text-center py-4 rounded-2xl font-semibold hover:bg-[#356b53] transition-colors"
            >
              View Cart
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
