"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { DBProduct } from "@/types/db";
import { trackClick } from "@/lib/trackClick";

export default function DBProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<DBProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handlePurchaseClick = () => {
    if (!product || clicked) return;
    setClicked(true);
    trackClick(product.id, product.influencerId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f9f7]">
        <div className="text-[#6b6b6b]">로딩 중...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f9f7]">
        <div className="text-center">
          <h1 className="text-h2 text-[#1a1a1a]">제품을 찾을 수 없습니다</h1>
          <Link
            href="/"
            className="text-[#3d7a5f] mt-4 inline-block hover:underline"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#6b6b6b] mb-6">
          <Link href="/" className="hover:text-[#3d7a5f]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#1a1a1a]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#f9f9f7]">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  className="w-24 h-24 text-[#e8e4de]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#3d7a5f]/10 rounded-full px-4 py-2 mb-4">
              <span className="text-sm font-medium text-[#3d7a5f]">
                Recommended by {product.influencer.name}
              </span>
            </div>

            <p className="text-label text-[#6b6b6b]">{product.brand}</p>
            <h1 className="text-h2 text-[#1a1a1a] mt-1">{product.name}</h1>

            <div className="mt-2">
              <span className="text-xs text-[#6b6b6b] bg-[#f9f9f7] px-2 py-1 rounded-full border border-[#e8e4de]">
                {product.category}
              </span>
            </div>

            {/* Price */}
            <div className="mt-6">
              <span className="text-3xl font-bold text-[#1a1a1a]">
                {product.price.toLocaleString()}원
              </span>
            </div>

            {/* Description */}
            {product.description && (
              <div className="mt-6">
                <p className="text-[#1a1a1a] leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Purchase Button */}
            <div className="mt-8">
              <button
                onClick={handlePurchaseClick}
                className={`w-full py-4 rounded-full font-semibold text-lg transition-all shadow-lg ${
                  clicked
                    ? "bg-[#2d5a45] text-white shadow-[#2d5a45]/25"
                    : "bg-[#3d7a5f] text-white hover:bg-[#356b53] shadow-[#3d7a5f]/25"
                }`}
              >
                {clicked ? "구매 요청 완료!" : "구매하기"}
              </button>
            </div>

            <p className="text-xs text-[#6b6b6b] mt-3 text-center">
              Free shipping on orders over $50
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Buy Button (Mobile) */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-[#e8e4de] z-40 md:bottom-0">
        <button
          onClick={handlePurchaseClick}
          className={`w-full py-4 rounded-full font-semibold text-lg transition-all shadow-lg ${
            clicked
              ? "bg-[#2d5a45] text-white"
              : "bg-[#3d7a5f] text-white hover:bg-[#356b53]"
          }`}
        >
          {clicked ? "구매 요청 완료!" : `구매하기 — ${product.price.toLocaleString()}원`}
        </button>
      </div>
    </div>
  );
}
