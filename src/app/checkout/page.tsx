"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/data/CartContext";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<"form" | "success">("form");
  const shipping = totalPrice >= 50 ? 0 : 5.99;
  const total = totalPrice + shipping;

  if (step === "success") {
    return (
      <div className="min-h-screen bg-[#f9f9f7] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-8 sm:p-12 max-w-md w-full text-center shadow-sm border border-[#e8e4de]">
          <div className="w-20 h-20 bg-[#3d7a5f]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#3d7a5f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-h2 text-[#1a1a1a]">Order Confirmed!</h1>
          <p className="text-[#6b6b6b] mt-3">Thank you for your order. You&apos;ll receive a confirmation email shortly.</p>
          <p className="text-sm text-[#6b6b6b] mt-2">Order #LB-{Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
          <Link
            href="/"
            className="inline-block mt-8 bg-[#3d7a5f] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#356b53] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f9f9f7] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-h2 text-[#1a1a1a] mb-2">No items to checkout</h1>
          <Link href="/discover" className="text-[#3d7a5f] hover:underline">Explore creators →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f9f7]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-h2 text-[#1a1a1a] mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3 space-y-6">
            {/* Contact */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8e4de]">
              <h2 className="font-bold text-[#1a1a1a] text-lg mb-4">Contact Information</h2>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3.5 bg-[#f9f9f7] rounded-xl border border-[#e8e4de] focus:outline-none focus:ring-2 focus:ring-[#3d7a5f]/30 focus:border-[#3d7a5f] text-[#1a1a1a] placeholder:text-[#6b6b6b]"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="w-full px-4 py-3.5 bg-[#f9f9f7] rounded-xl border border-[#e8e4de] focus:outline-none focus:ring-2 focus:ring-[#3d7a5f]/30 focus:border-[#3d7a5f] text-[#1a1a1a] placeholder:text-[#6b6b6b]"
                />
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8e4de]">
              <h2 className="font-bold text-[#1a1a1a] text-lg mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full px-4 py-3.5 bg-[#f9f9f7] rounded-xl border border-[#e8e4de] focus:outline-none focus:ring-2 focus:ring-[#3d7a5f]/30 focus:border-[#3d7a5f] text-[#1a1a1a] placeholder:text-[#6b6b6b]"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    className="w-full px-4 py-3.5 bg-[#f9f9f7] rounded-xl border border-[#e8e4de] focus:outline-none focus:ring-2 focus:ring-[#3d7a5f]/30 focus:border-[#3d7a5f] text-[#1a1a1a] placeholder:text-[#6b6b6b]"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full px-4 py-3.5 bg-[#f9f9f7] rounded-xl border border-[#e8e4de] focus:outline-none focus:ring-2 focus:ring-[#3d7a5f]/30 focus:border-[#3d7a5f] text-[#1a1a1a] placeholder:text-[#6b6b6b]"
                />
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full px-4 py-3.5 bg-[#f9f9f7] rounded-xl border border-[#e8e4de] focus:outline-none focus:ring-2 focus:ring-[#3d7a5f]/30 focus:border-[#3d7a5f] text-[#1a1a1a] placeholder:text-[#6b6b6b]"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    className="w-full px-4 py-3.5 bg-[#f9f9f7] rounded-xl border border-[#e8e4de] focus:outline-none focus:ring-2 focus:ring-[#3d7a5f]/30 focus:border-[#3d7a5f] text-[#1a1a1a] placeholder:text-[#6b6b6b]"
                  />
                  <input
                    type="text"
                    placeholder="ZIP"
                    className="w-full px-4 py-3.5 bg-[#f9f9f7] rounded-xl border border-[#e8e4de] focus:outline-none focus:ring-2 focus:ring-[#3d7a5f]/30 focus:border-[#3d7a5f] text-[#1a1a1a] placeholder:text-[#6b6b6b]"
                  />
                </div>
                <select className="w-full px-4 py-3.5 bg-[#f9f9f7] rounded-xl border border-[#e8e4de] focus:outline-none focus:ring-2 focus:ring-[#3d7a5f]/30 focus:border-[#3d7a5f] text-[#6b6b6b]">
                  <option>Country</option>
                  <option>United States</option>
                  <option>Japan</option>
                  <option>France</option>
                  <option>Brazil</option>
                  <option>China</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8e4de]">
              <h2 className="font-bold text-[#1a1a1a] text-lg mb-4">Payment</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Card number"
                  className="w-full px-4 py-3.5 bg-[#f9f9f7] rounded-xl border border-[#e8e4de] focus:outline-none focus:ring-2 focus:ring-[#3d7a5f]/30 focus:border-[#3d7a5f] text-[#1a1a1a] placeholder:text-[#6b6b6b]"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="w-full px-4 py-3.5 bg-[#f9f9f7] rounded-xl border border-[#e8e4de] focus:outline-none focus:ring-2 focus:ring-[#3d7a5f]/30 focus:border-[#3d7a5f] text-[#1a1a1a] placeholder:text-[#6b6b6b]"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="w-full px-4 py-3.5 bg-[#f9f9f7] rounded-xl border border-[#e8e4de] focus:outline-none focus:ring-2 focus:ring-[#3d7a5f]/30 focus:border-[#3d7a5f] text-[#1a1a1a] placeholder:text-[#6b6b6b]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24 border border-[#e8e4de]">
              <h2 className="font-bold text-[#1a1a1a] text-lg mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-[#f9f9f7]">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="56px" />
                      <span className="absolute -top-1 -right-1 bg-[#3d7a5f] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#1a1a1a] truncate">{item.product.name}</p>
                      <p className="text-xs text-[#6b6b6b]">{item.product.brand}</p>
                    </div>
                    <span className="text-sm font-semibold text-[#1a1a1a]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#e8e4de] pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#6b6b6b]">Subtotal</span>
                  <span className="text-[#1a1a1a]">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6b6b6b]">Shipping</span>
                  <span className={shipping === 0 ? "text-[#3d7a5f]" : "text-[#1a1a1a]"}>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-[#e8e4de] pt-2 flex justify-between">
                  <span className="font-bold text-[#1a1a1a]">Total</span>
                  <span className="font-bold text-[#1a1a1a] text-lg">${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  clearCart();
                  setStep("success");
                }}
                className="w-full bg-[#3d7a5f] text-white py-4 rounded-2xl font-semibold mt-6 hover:bg-[#356b53] transition-colors shadow-lg shadow-[#3d7a5f]/20"
              >
                Place Order
              </button>
              <p className="text-xs text-[#6b6b6b] text-center mt-3">Secure checkout powered by Stripe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
