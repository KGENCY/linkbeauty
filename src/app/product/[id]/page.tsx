"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getProduct,
  getInfluencer,
  getRelatedProducts,
  getVideoForProduct,
  getOtherCelebVideosForProduct,
  type VideoRecommendation,
} from "@/data/mock";
import { useCart } from "@/data/CartContext";
import { useWishlist } from "@/data/WishlistContext";
import { trackClick } from "@/lib/trackClick";
import ProductCard from "@/components/ui/ProductCard";

function VideoCard({
  video,
  onBuy,
}: {
  video: VideoRecommendation;
  onBuy: () => void;
}) {
  const influencer = getInfluencer(video.influencerId);
  const product = getProduct(video.productId);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="group">
      {/* Video Thumbnail */}
      <div
        className="relative aspect-video rounded-2xl overflow-hidden bg-[#f9f9f7] cursor-pointer"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Play Button Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
            <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-[#1a1a1a] ml-1"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
        {/* Duration Badge */}
        <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-md">
          {video.duration}
        </span>
      </div>

      {/* Video Info */}
      <div className="mt-3">
        {/* Influencer Info */}
        {influencer && (
          <Link
            href={`/influencer/${influencer.id}`}
            className="inline-flex items-center gap-2 mb-2 hover:opacity-80 transition-opacity"
          >
            <div className="relative w-7 h-7 rounded-full overflow-hidden ring-2 ring-[#3d7a5f]/20">
              <Image
                src={influencer.profileImage}
                alt={influencer.name}
                fill
                className="object-cover"
                sizes="28px"
              />
            </div>
            <span className="text-sm font-semibold text-[#1a1a1a]">
              {influencer.name} {influencer.flag}
            </span>
            <span className="text-xs text-[#6b6b6b]">
              {influencer.followers}
            </span>
          </Link>
        )}
        <h3 className="text-sm font-medium text-[#1a1a1a] line-clamp-2 leading-snug">
          {video.title}
        </h3>
        <p className="text-xs text-[#6b6b6b] mt-1">
          조회수 {video.views}
        </p>
      </div>

      {/* Buy Button */}
      {product && (
        <button
          onClick={onBuy}
          className="mt-3 w-full flex items-center justify-center gap-2 bg-[#3d7a5f] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#356b53] transition-colors shadow-md shadow-[#3d7a5f]/20 active:scale-[0.98]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          바로 구매 — ${product.price.toFixed(2)}
        </button>
      )}
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = getProduct(id as string);
  const { addToCart, setIsCartOpen } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-h2 text-[#1a1a1a]">제품을 찾을 수 없습니다</h1>
          <Link
            href="/discover"
            className="text-[#3d7a5f] mt-4 inline-block hover:underline"
          >
            크리에이터 둘러보기 →
          </Link>
        </div>
      </div>
    );
  }

  const influencer = getInfluencer(product.influencerId);
  const relatedProducts = getRelatedProducts(product.id);
  const mainVideo = getVideoForProduct(product.id, product.influencerId);
  const otherCelebVideos = getOtherCelebVideosForProduct(
    product.id,
    product.influencerId,
  );
  const wishlisted = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  const handleAddToCart = () => {
    addToCart(product.id, 1);
    setIsCartOpen(true);
    trackClick(product.id, product.influencerId);
  };

  const handleBuyFromVideo = (video: VideoRecommendation) => {
    addToCart(video.productId, 1);
    setIsCartOpen(true);
    trackClick(video.productId, video.influencerId);
  };

  return (
    <div className="min-h-screen bg-white pb-24 lg:pb-0">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#6b6b6b] mb-6">
          <Link href="/" className="hover:text-[#3d7a5f]">
            홈
          </Link>
          <span>/</span>
          {influencer && (
            <>
              <Link
                href={`/influencer/${influencer.id}`}
                className="hover:text-[#3d7a5f]"
              >
                {influencer.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-[#1a1a1a] truncate">{product.name}</span>
        </div>

        {/* ========== SECTION 1: Product Hero ========== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#f9f9f7]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {discount > 0 && (
              <span className="absolute top-4 left-4 bg-[#3d7a5f] text-white text-sm font-bold px-3 py-1.5 rounded-full">
                -{discount}%
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 right-4 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${wishlisted ? "text-[#3d7a5f] fill-[#3d7a5f]" : "text-[#6b6b6b]"}`}
                fill={wishlisted ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            {/* Influencer Badge */}
            {influencer && (
              <Link
                href={`/influencer/${influencer.id}`}
                className="inline-flex items-center gap-2 bg-[#3d7a5f]/10 rounded-full px-4 py-2 mb-4 w-fit hover:bg-[#3d7a5f]/20 transition-colors"
              >
                <div className="relative w-6 h-6 rounded-full overflow-hidden">
                  <Image
                    src={influencer.profileImage}
                    alt={influencer.name}
                    fill
                    className="object-cover"
                    sizes="24px"
                  />
                </div>
                <span className="text-sm font-medium text-[#3d7a5f]">
                  {influencer.name} {influencer.flag} 추천
                </span>
              </Link>
            )}

            <p className="text-label text-[#6b6b6b]">{product.brand}</p>
            <h1 className="text-h2 text-[#1a1a1a] mt-1">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-[#e8e4de] fill-[#e8e4de]"}`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-[#6b6b6b]">
                {product.rating} ({product.reviewCount}개 리뷰)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mt-4">
              <span className="text-3xl font-bold text-[#1a1a1a]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-[#6b6b6b] line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {product.description && (
              <p className="text-sm text-[#6b6b6b] leading-relaxed mt-4">
                {product.description}
              </p>
            )}

            {/* Buy Button */}
            <button
              onClick={handleAddToCart}
              className="mt-6 w-full bg-[#3d7a5f] text-white py-4 rounded-full font-semibold text-lg hover:bg-[#356b53] transition-colors shadow-lg shadow-[#3d7a5f]/25 active:scale-[0.98]"
            >
              구매하기 — ${product.price.toFixed(2)}
            </button>
            <p className="text-xs text-[#6b6b6b] mt-3 text-center">
              $50 이상 무료배송
            </p>
          </div>
        </div>

        {/* ========== SECTION 2: Influencer's Video for This Product ========== */}
        {mainVideo && influencer && (
          <section className="mt-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#3d7a5f]/30">
                <Image
                  src={influencer.profileImage}
                  alt={influencer.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#1a1a1a]">
                  {influencer.name}님의 소개 영상
                </h2>
                <p className="text-sm text-[#6b6b6b]">
                  이 제품을 추천하는 이유
                </p>
              </div>
            </div>

            <div className="max-w-3xl">
              {/* Main Video */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#f9f9f7] cursor-pointer group">
                <Image
                  src={mainVideo.thumbnailUrl}
                  alt={mainVideo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                  <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-9 w-9 text-[#1a1a1a] ml-1"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <span className="absolute bottom-4 right-4 bg-black/70 text-white text-sm font-medium px-3 py-1.5 rounded-lg">
                  {mainVideo.duration}
                </span>
              </div>
              <h3 className="text-base font-semibold text-[#1a1a1a] mt-4">
                {mainVideo.title}
              </h3>
              <p className="text-sm text-[#6b6b6b] mt-1">
                조회수 {mainVideo.views}
              </p>

              {/* Why I Love This */}
              {product.whyILoveThis && (
                <div className="mt-4 bg-[#3d7a5f]/5 rounded-2xl p-5 border border-[#3d7a5f]/10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="relative w-5 h-5 rounded-full overflow-hidden">
                      <Image
                        src={influencer.profileImage}
                        alt={influencer.name}
                        fill
                        className="object-cover"
                        sizes="20px"
                      />
                    </div>
                    <span className="text-sm font-semibold text-[#3d7a5f]">
                      {influencer.name}의 한마디
                    </span>
                  </div>
                  <p className="text-sm text-[#1a1a1a] leading-relaxed italic">
                    &ldquo;{product.whyILoveThis}&rdquo;
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ========== SECTION 3: Other Products by This Influencer ========== */}
        {relatedProducts.length > 0 && influencer && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-[#1a1a1a]">
                {influencer.name}님의 다른 추천 제품
              </h2>
              <Link
                href={`/influencer/${influencer.id}`}
                className="text-sm font-medium text-[#3d7a5f] hover:underline"
              >
                전체보기 →
              </Link>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 snap-x snap-mandatory">
              {relatedProducts.map((p) => (
                <div
                  key={p.id}
                  className="min-w-[200px] sm:min-w-[220px] snap-start"
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========== SECTION 4: Other Celebs' Videos for This Product ========== */}
        {otherCelebVideos.length > 0 && (
          <section className="mt-16">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#1a1a1a]">
                다른 셀럽들의 리뷰 영상
              </h2>
              <p className="text-sm text-[#6b6b6b] mt-1">
                이 제품을 소개한 다른 크리에이터들
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherCelebVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onBuy={() => handleBuyFromVideo(video)}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sticky Buy Button (Mobile) */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-[#e8e4de] z-40 md:bottom-0">
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#3d7a5f] text-white py-4 rounded-full font-semibold text-lg hover:bg-[#356b53] transition-colors shadow-lg"
        >
          구매하기 — ${product.price.toFixed(2)}
        </button>
      </div>
    </div>
  );
}
