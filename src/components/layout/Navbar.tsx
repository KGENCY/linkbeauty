"use client";

import Link from "next/link";
import { useCart } from "@/data/CartContext";

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#2D8B75] to-[#4DAE95] bg-clip-text text-transparent">
              LINKBEAUTY
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/discover" className="text-sm text-[#222222] hover:text-[#2D8B75] transition-colors font-medium">
              Discover
            </Link>
            <Link href="/discover" className="text-sm text-[#222222] hover:text-[#2D8B75] transition-colors font-medium">
              Creators
            </Link>
            <Link href="/discover" className="text-sm text-[#222222] hover:text-[#2D8B75] transition-colors font-medium">
              Collections
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:block text-sm text-[#222222] hover:text-[#2D8B75] transition-colors font-medium">
              Sign In
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-[#EFF7F4] rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#222222]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2D8B75] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
