"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/data/CartContext";

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const [showCreatorModal, setShowCreatorModal] = useState(false);
  const [creatorId, setCreatorId] = useState("");
  const prevTotalItems = useRef(totalItems);
  const pathname = usePathname();
  const router = useRouter();

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Trigger bounce animation when items are added
  useEffect(() => {
    if (totalItems > prevTotalItems.current) {
      setCartBounce(true);
      const timer = setTimeout(() => setCartBounce(false), 400);
      return () => clearTimeout(timer);
    }
    prevTotalItems.current = totalItems;
  }, [totalItems]);

  // Check if nav item is active
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled ? "navbar-scrolled" : "navbar-default"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold bg-gradient-to-r from-[#3d7a5f] to-[#6aaa8e] bg-clip-text text-transparent">
              LINKBEAUTY
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/discover"
              className={`text-sm transition-colors font-medium ${
                isActive("/discover")
                  ? "text-[#3d7a5f] font-semibold"
                  : "text-[#1a1a1a] hover:text-[#3d7a5f]"
              }`}
            >
              Discover
            </Link>
            <Link
              href="/discover"
              className="text-sm text-[#1a1a1a] hover:text-[#3d7a5f] transition-colors font-medium"
            >
              Creators
            </Link>
            <Link
              href="/discover"
              className="text-sm text-[#1a1a1a] hover:text-[#3d7a5f] transition-colors font-medium"
            >
              Collections
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowCreatorModal(true)}
              className="hidden sm:block text-sm text-[#3d7a5f] hover:text-[#2d5a45] transition-colors font-semibold"
            >
              Creator Studio
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 hover:bg-[#3d7a5f]/10 rounded-full transition-colors ${
                cartBounce ? "cart-bounce" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#1a1a1a]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {totalItems > 0 && (
                <span
                  className={`absolute -top-1 -right-1 bg-[#3d7a5f] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold ${
                    cartBounce ? "cart-badge-animate" : ""
                  }`}
                >
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      {showCreatorModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setShowCreatorModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-1">Creator Studio</h2>
            <p className="text-sm text-[#6b6b6b] mb-5">인플루언서 ID를 입력하여 대시보드에 접속하세요.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const trimmed = creatorId.trim();
                if (trimmed) {
                  setShowCreatorModal(false);
                  setCreatorId("");
                  router.push(`/dashboard/${trimmed}`);
                }
              }}
            >
              <input
                type="text"
                value={creatorId}
                onChange={(e) => setCreatorId(e.target.value)}
                placeholder="인플루언서 ID 입력"
                autoFocus
                className="w-full px-4 py-3 rounded-xl border border-[#e8e4de] bg-[#f9f9f7] focus:outline-none focus:ring-2 focus:ring-[#3d7a5f] text-[#1a1a1a] text-sm"
              />
              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowCreatorModal(false)}
                  className="flex-1 py-3 rounded-xl border border-[#e8e4de] text-sm font-medium text-[#6b6b6b] hover:bg-[#f9f9f7] transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#3d7a5f] text-white text-sm font-semibold hover:bg-[#2d5a45] transition-colors"
                >
                  접속하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}
