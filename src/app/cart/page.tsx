"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/data/CartContext";
import { getInfluencer } from "@/data/mock";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();
  const shipping = totalPrice >= 50 ? 0 : 5.99;
  const total = totalPrice + shipping;

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#222222] mb-8">Your Bag</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-200 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-xl font-bold text-[#222222] mb-2">Your bag is empty</h2>
            <p className="text-[#888888] mb-6">Discover products through your favorite creators</p>
            <Link
              href="/discover"
              className="inline-block bg-[#2D8B75] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#247A65] transition-colors"
            >
              Explore Creators
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const influencer = getInfluencer(item.product.influencerId);
                return (
                  <div key={item.product.id} className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm flex gap-4">
                    <Link href={`/product/${item.product.id}`} className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="112px" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      {influencer && (
                        <Link href={`/influencer/${influencer.id}`} className="flex items-center gap-1.5 mb-1">
                          <div className="relative w-4 h-4 rounded-full overflow-hidden">
                            <Image src={influencer.profileImage} alt={influencer.name} fill className="object-cover" sizes="16px" />
                          </div>
                          <span className="text-xs text-[#2D8B75] font-medium">{influencer.name}&apos;s pick</span>
                        </Link>
                      )}
                      <p className="text-xs text-[#888888] uppercase">{item.product.brand}</p>
                      <Link href={`/product/${item.product.id}`}>
                        <h3 className="font-semibold text-[#222222] hover:text-[#2D8B75] transition-colors">{item.product.name}</h3>
                      </Link>
                      <p className="font-bold text-[#2D8B75] mt-1">${item.product.price.toFixed(2)}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-sm hover:bg-gray-50 transition-colors"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-sm hover:bg-gray-50 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#888888] hover:text-[#2D8B75] transition-colors text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                <h2 className="font-bold text-[#222222] text-lg mb-4">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#888888]">Subtotal</span>
                    <span className="text-[#222222] font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#888888]">Shipping</span>
                    <span className={`font-medium ${shipping === 0 ? "text-green-600" : "text-[#222222]"}`}>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-[#2D8B75]">
                      Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
                    </p>
                  )}
                  <div className="border-t border-gray-100 pt-3 flex justify-between">
                    <span className="font-bold text-[#222222]">Total</span>
                    <span className="font-bold text-[#222222] text-lg">${total.toFixed(2)}</span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="block w-full bg-[#2D8B75] text-white text-center py-4 rounded-2xl font-semibold mt-6 hover:bg-[#247A65] transition-colors shadow-lg shadow-[#2D8B75]/20"
                >
                  Proceed to Checkout
                </Link>
                <Link href="/discover" className="block text-center text-sm text-[#888888] hover:text-[#2D8B75] mt-4 transition-colors">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
