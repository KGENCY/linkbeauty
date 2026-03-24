"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DATA STRUCTURES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  pickReason: string;
  saved: number;
  rating: number;
  reviews: number;
}

interface RoutineStep {
  step: number;
  time: "morning" | "evening";
  productName: string;
  brand: string;
  image: string;
  tip: string;
}

interface InfluencerData {
  id: string;
  name: string;
  nationality: string;
  flag: string;
  originCity: string;
  city: string;
  yearsInKorea: number;
  bio: string;
  longBio: string;
  avatar: string;
  coverImage: string;
  followers: string;
  instagram: string;
  tiktok: string;
  tags: string[];
  visaType: "full" | "credit";
  products: Product[];
  routine: RoutineStep[];
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MOCK DATA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const mockInfluencer: InfluencerData = {
  id: "hana-beauty",
  name: "Hana",
  nationality: "Japanese",
  flag: "🇯🇵",
  originCity: "Tokyo",
  city: "Seoul",
  yearsInKorea: 3,
  bio: "도쿄 출신, 서울 3년차. 민감성 피부를 위한 순한 K-뷰티만 골라요.",
  longBio: `안녕하세요, 하나예요! 🌸

저는 원래 도쿄에서 뷰티 에디터로 일했어요. 그런데 한국 스킨케어의 매력에 빠져서 2021년에 서울로 이사왔어요.

일본에서는 구하기 어려운 한국 로컬 브랜드들을 직접 써보고, 진짜 좋은 것만 소개하고 있어요. 특히 민감성 피부라서 순한 성분 위주로 테스트해요.

서울 올리브영, 시코르를 매주 돌아다니면서 신제품 체크하는 게 취미예요 ㅎㅎ

궁금한 거 있으면 DM 주세요!`,
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
  coverImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=400&fit=crop",
  followers: "482K",
  instagram: "hana_kbeauty",
  tiktok: "hana.seoul",
  tags: ["Sensitive Skin", "J-Beauty → K-Beauty", "Fragrance-Free", "Minimalist"],
  visaType: "full",
  products: [
    {
      id: "1",
      name: "Centella Unscented Serum",
      brand: "SKIN1004",
      price: 18,
      originalPrice: 24,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
      pickReason: "3년째 매일 쓰는 유일한 세럼. 다른 거 다 바꿔도 이건 못 바꿔요.",
      saved: 12847,
      rating: 4.9,
      reviews: 2341,
    },
    {
      id: "2",
      name: "Relief Sun Rice + Probiotics",
      brand: "BEAUTY OF JOSEON",
      price: 15,
      originalPrice: 20,
      image: "https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?w=400&h=400&fit=crop",
      pickReason: "백탁 없고 촉촉한 선크림 찾느라 20개는 써본 듯. 이게 답이에요.",
      saved: 8932,
      rating: 4.8,
      reviews: 1876,
    },
    {
      id: "3",
      name: "Mugwort Essence",
      brand: "I'M FROM",
      price: 28,
      originalPrice: 35,
      image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=400&fit=crop",
      pickReason: "피부 예민해졌을 때 이것만 쓰면 다음날 바로 진정돼요. 마법 같아요.",
      saved: 6721,
      rating: 4.7,
      reviews: 1243,
    },
    {
      id: "4",
      name: "Heartleaf 77% Soothing Toner",
      brand: "ANUA",
      price: 22,
      image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=400&h=400&fit=crop",
      pickReason: "일본 친구들한테 가장 많이 선물한 토너. 순하고 흡수 빠르고 최고.",
      saved: 5438,
      rating: 4.8,
      reviews: 987,
    },
  ],
  routine: [
    {
      step: 1,
      time: "morning",
      productName: "Heartleaf 77% Soothing Toner",
      brand: "ANUA",
      image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=100&h=100&fit=crop",
      tip: "손바닥에 덜어서 가볍게 패팅. 절대 문지르지 마세요!",
    },
    {
      step: 2,
      time: "morning",
      productName: "Centella Unscented Serum",
      brand: "SKIN1004",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&h=100&fit=crop",
      tip: "2-3방울이면 충분해요. 많이 바르면 오히려 흡수 안 돼요.",
    },
    {
      step: 3,
      time: "morning",
      productName: "Relief Sun Rice + Probiotics",
      brand: "BEAUTY OF JOSEON",
      image: "https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?w=100&h=100&fit=crop",
      tip: "두 손가락 분량! 자외선 차단은 양이 중요해요.",
    },
    {
      step: 1,
      time: "evening",
      productName: "Green Tea Cleansing Oil",
      brand: "INNISFREE",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&h=100&fit=crop",
      tip: "마른 손에! 물 묻으면 유화가 안 돼요.",
    },
    {
      step: 2,
      time: "evening",
      productName: "Low pH Good Morning Gel Cleanser",
      brand: "COSRX",
      image: "https://images.unsplash.com/photo-1556228841-a3c527ebefe5?w=100&h=100&fit=crop",
      tip: "거품 내서 30초만 마사지. 오래하면 피부 건조해져요.",
    },
    {
      step: 3,
      time: "evening",
      productName: "Mugwort Essence",
      brand: "I'M FROM",
      image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=100&h=100&fit=crop",
      tip: "화장솜 말고 손으로! 에센스는 손 체온으로 흡수시키세요.",
    },
  ],
};

type Tab = "picks" | "routine" | "about";

export default function CreatorProfilePage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<Tab>("picks");
  const [isFollowing, setIsFollowing] = useState(false);
  const [savedProducts, setSavedProducts] = useState<Set<string>>(new Set());

  const influencer = mockInfluencer; // In real app, fetch by id

  const toggleSaved = (productId: string) => {
    setSavedProducts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const morningRoutine = influencer.routine.filter((r) => r.time === "morning");
  const eveningRoutine = influencer.routine.filter((r) => r.time === "evening");

  return (
    <div className="min-h-screen bg-[#f9f9f7]">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. COVER IMAGE
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={influencer.coverImage}
          alt={`${influencer.name}'s cover`}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Back button */}
        <Link
          href="/discover"
          className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>

        {/* Share button */}
        <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>

      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. PROFILE HEADER
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-start justify-between">
            {/* Avatar */}
            <div className="relative -mt-10">
              <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-white shadow-lg relative">
                <Image
                  src={influencer.avatar}
                  alt={influencer.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              {/* Verified checkmark */}
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#3d7a5f] rounded-full flex items-center justify-center ring-2 ring-white">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Follow button */}
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`mt-4 px-5 py-2 rounded-full font-semibold text-sm transition-all ${
                isFollowing
                  ? "bg-white text-stone-600 border-2 border-stone-300"
                  : "bg-[#3d7a5f] text-white hover:bg-[#356b53]"
              }`}
            >
              {isFollowing ? (
                <span className="flex items-center gap-1.5">
                  Following
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              ) : (
                "Follow"
              )}
            </button>
          </div>

          {/* Name & Info */}
          <div className="mt-3 pb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-stone-900">
                {influencer.name} <span className="text-2xl">{influencer.flag}</span>
              </h1>
              <span className="bg-[#e8f4ee] text-[#3d7a5f] text-xs font-semibold px-2.5 py-1 rounded-full">
                Verified Creator
              </span>
            </div>

            {/* Residence context - MORE important than follower count */}
            <p className="text-sm text-stone-500 mt-1">
              {influencer.city} 거주 {influencer.yearsInKorea}년차 · {influencer.followers} followers
            </p>

            {/* Bio */}
            <p className="text-sm text-stone-700 mt-2">{influencer.bio}</p>

            {/* Interest tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {influencer.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-stone-100 text-stone-600 text-xs px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 mt-3">
              <a
                href={`https://instagram.com/${influencer.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-[#3d7a5f] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                @{influencer.instagram}
              </a>
              <a
                href={`https://tiktok.com/@${influencer.tiktok}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-[#3d7a5f] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
                @{influencer.tiktok}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. TABS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex">
            {(["picks", "routine", "about"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-semibold capitalize transition-colors relative ${
                  activeTab === tab
                    ? "text-[#3d7a5f]"
                    : "text-stone-400 hover:text-stone-600"
                }`}
              >
                {tab === "picks" ? "My Picks" : tab === "routine" ? "My Routine" : "About"}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3d7a5f]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. TAB CONTENT
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* TAB 1: MY PICKS */}
        {activeTab === "picks" && (
          <div className="grid grid-cols-2 gap-3">
            {influencer.products.map((product) => {
              const discount = product.originalPrice
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;
              const isSaved = savedProducts.has(product.id);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden border border-stone-200 group"
                >
                  {/* Product image */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    {/* Discount badge */}
                    {discount > 0 && (
                      <span className="absolute top-2 left-2 bg-[#3d7a5f] text-white text-xs font-bold px-2 py-1 rounded-md">
                        -{discount}%
                      </span>
                    )}
                    {/* Heart save button */}
                    <button
                      onClick={() => toggleSaved(product.id)}
                      className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 transition-colors ${
                          isSaved ? "text-red-500 fill-red-500" : "text-stone-400"
                        }`}
                        fill={isSaved ? "currentColor" : "none"}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>

                  {/* Product info */}
                  <div className="p-3">
                    {/* Creator pick label with flag */}
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-xs font-bold text-[#3d7a5f]">
                        {influencer.name} {influencer.flag}의 픽
                      </span>
                    </div>

                    {/* PICK REASON - THE HERO ELEMENT */}
                    <p className="text-[#3d7a5f] text-xs font-medium leading-relaxed mb-2 bg-[#f0f7f3] rounded-lg px-2.5 py-2 border border-[#e0ebe5]">
                      &ldquo;{product.pickReason}&rdquo;
                    </p>

                    {/* Brand */}
                    <p className="text-xs text-stone-400 uppercase tracking-wide">
                      {product.brand}
                    </p>

                    {/* Product name */}
                    <h3 className="text-sm font-semibold text-stone-900 mt-0.5 line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-1.5">
                      <svg className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      <span className="text-xs text-stone-500">
                        {product.rating} ({product.reviews.toLocaleString()})
                      </span>
                    </div>

                    {/* Price & Add to cart */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-stone-900">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-stone-400 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      <button className="w-7 h-7 bg-[#3d7a5f] rounded-full flex items-center justify-center hover:bg-[#356b53] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>

                    {/* Saved count - community metric */}
                    <p className="text-xs text-stone-400 mt-2">
                      {product.saved.toLocaleString()}명이 저장했어요
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: MY ROUTINE */}
        {activeTab === "routine" && (
          <div className="space-y-6">
            {/* Morning Routine */}
            <div>
              <h2 className="text-lg font-bold text-stone-900 mb-3 flex items-center gap-2">
                <span>🌅</span> Morning Routine
              </h2>
              <div className="space-y-3">
                {morningRoutine.map((step) => (
                  <div
                    key={`morning-${step.step}`}
                    className="bg-white rounded-2xl p-4 border border-stone-200 flex items-start gap-3"
                  >
                    {/* Step number */}
                    <div className="w-8 h-8 bg-[#f0f7f3] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[#3d7a5f] font-bold text-sm">{step.step}</span>
                    </div>
                    {/* Product thumbnail */}
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={step.image}
                        alt={step.productName}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-stone-400 uppercase">{step.brand}</p>
                      <p className="text-sm font-semibold text-stone-900">{step.productName}</p>
                      <p className="text-xs text-[#3d7a5f] mt-1">{step.tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Evening Routine */}
            <div>
              <h2 className="text-lg font-bold text-stone-900 mb-3 flex items-center gap-2">
                <span>🌙</span> Evening Routine
              </h2>
              <div className="space-y-3">
                {eveningRoutine.map((step) => (
                  <div
                    key={`evening-${step.step}`}
                    className="bg-white rounded-2xl p-4 border border-stone-200 flex items-start gap-3"
                  >
                    {/* Step number */}
                    <div className="w-8 h-8 bg-[#f0f7f3] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[#3d7a5f] font-bold text-sm">{step.step}</span>
                    </div>
                    {/* Product thumbnail */}
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={step.image}
                        alt={step.productName}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-stone-400 uppercase">{step.brand}</p>
                      <p className="text-sm font-semibold text-stone-900">{step.productName}</p>
                      <p className="text-xs text-[#3d7a5f] mt-1">{step.tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ABOUT */}
        {activeTab === "about" && (
          <div className="space-y-4">
            {/* Story card */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200">
              <h2 className="text-lg font-bold text-stone-900 mb-3">Story</h2>
              <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                {influencer.longBio}
              </p>
            </div>

            {/* Residence badge card */}
            <div className="bg-[#f0f7f3] rounded-2xl p-5 border border-[#c8e4d8]">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#3d7a5f] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#3d7a5f] font-bold">
                    {influencer.city} 거주 {influencer.yearsInKorea}년차 크리에이터
                  </p>
                  <p className="text-sm text-[#3d7a5f]/80 mt-1">
                    현지에서 직접 경험한 제품만 소개합니다
                  </p>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-2xl p-4 border border-stone-200 text-center">
                <p className="text-2xl font-bold text-[#3d7a5f]">{influencer.followers}</p>
                <p className="text-xs text-stone-500 mt-1">Followers</p>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-stone-200 text-center">
                <p className="text-2xl font-bold text-[#3d7a5f]">{influencer.products.length}</p>
                <p className="text-xs text-stone-500 mt-1">Picks</p>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-stone-200 text-center">
                <p className="text-2xl font-bold text-[#3d7a5f]">
                  {influencer.products.reduce((acc, p) => acc + p.saved, 0).toLocaleString()}
                </p>
                <p className="text-xs text-stone-500 mt-1">Saved</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
