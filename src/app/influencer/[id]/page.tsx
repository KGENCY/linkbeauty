"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getInfluencer, getProductsByInfluencer, getCollectionsByInfluencer } from "@/data/mock";
import ProductCard from "@/components/ui/ProductCard";
import CollectionCard from "@/components/ui/CollectionCard";

type Tab = "products" | "routine" | "about";

// Helper function to parse follower counts
function parseFollowerCount(followers: string): number {
  const num = parseFloat(followers.replace(/[^0-9.]/g, ""));
  if (followers.includes("M")) return num * 1000000;
  if (followers.includes("K")) return num * 1000;
  return num;
}

// Format number with K/M suffix
function formatCount(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return num.toString();
}

// Animated counter component
function AnimatedCounter({
  targetValue,
  duration = 1500,
  isVisible
}: {
  targetValue: number;
  duration?: number;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * targetValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [targetValue, duration, isVisible]);

  return <>{formatCount(count)}</>;
}

export default function InfluencerStorePage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<Tab>("products");
  const [isFollowing, setIsFollowing] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const [tabKey, setTabKey] = useState(0);

  const statsRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  const influencer = getInfluencer(id as string);
  const products = getProductsByInfluencer(id as string);
  const collections = getCollectionsByInfluencer(id as string);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Stats visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleTabChange = useCallback((tab: Tab) => {
    setActiveTab(tab);
    setTabKey((prev) => prev + 1);
  }, []);

  if (!influencer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-h2 text-[#1a1a1a]">Creator not found</h1>
          <Link href="/discover" className="text-[#3d7a5f] mt-4 inline-block hover:underline">
            Browse all creators →
          </Link>
        </div>
      </div>
    );
  }

  const followerCount = parseFollowerCount(influencer.followers);

  return (
    <div className="min-h-screen bg-[#f9f9f7]">
      {/* Cover with Parallax */}
      <div ref={bannerRef} className="relative h-48 sm:h-64 lg:h-80 overflow-hidden profile-banner-parallax z-0">
        <div
          className="absolute inset-0 profile-banner-image"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <Image
            src={influencer.coverImage}
            alt={influencer.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      {/* Profile */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative -mt-16 sm:-mt-20 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
            {/* Avatar with ring and entrance animation */}
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden profile-avatar-ring profile-avatar-animate relative flex-shrink-0 z-20 isolate">
              <Image
                src={influencer.profileImage}
                alt={influencer.name}
                fill
                className="object-cover"
                sizes="144px"
              />
            </div>

            <div className="flex-1 pb-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-h2 text-[#1a1a1a]">
                  {influencer.name} {influencer.flag}
                </h1>
                {/* Verified Badge with checkmark and shimmer */}
                <span className="verified-badge text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 relative z-10" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="relative z-10">Verified Creator</span>
                </span>
              </div>
              <p className="text-[#6b6b6b] mt-1">{influencer.nationality}</p>
              <p className="text-[#1a1a1a] mt-2 max-w-xl">{influencer.bio}</p>

              {/* Stats with count-up animation and separators */}
              <div ref={statsRef} className="flex items-center gap-0 mt-4">
                <div className={`stat-item stat-animate ${statsVisible ? "stat-visible" : ""}`} style={{ animationDelay: "0ms" }}>
                  <span className="font-bold text-[#1a1a1a]">
                    <AnimatedCounter targetValue={followerCount} isVisible={statsVisible} />
                  </span>
                  <span className="text-[#6b6b6b] text-sm ml-1">followers</span>
                </div>
                <div className={`stat-item stat-animate ${statsVisible ? "stat-visible" : ""}`} style={{ animationDelay: "150ms" }}>
                  <span className="font-bold text-[#1a1a1a]">
                    <AnimatedCounter targetValue={products.length} isVisible={statsVisible} duration={800} />
                  </span>
                  <span className="text-[#6b6b6b] text-sm ml-1">products</span>
                </div>
                <div className={`stat-item stat-animate ${statsVisible ? "stat-visible" : ""}`} style={{ animationDelay: "300ms" }}>
                  <span className="font-bold text-[#1a1a1a]">
                    <AnimatedCounter targetValue={collections.length} isVisible={statsVisible} duration={800} />
                  </span>
                  <span className="text-[#6b6b6b] text-sm ml-1">collections</span>
                </div>
              </div>
            </div>

            {/* Follow Button */}
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`self-start sm:self-end px-6 py-3 font-semibold follow-btn ${
                isFollowing ? "follow-btn-followed" : ""
              }`}
            >
              {isFollowing ? (
                <span className="inline-flex items-center gap-1.5">
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

          {/* Tags */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {influencer.tags.map((tag) => (
              <span key={tag} className="bg-white text-[#1a1a1a] text-sm px-4 py-1.5 rounded-full border border-[#e8e4de]">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-[#e8e4de] mb-8">
          <div className="flex gap-8">
            {(["products", "routine", "about"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`profile-tab ${
                  activeTab === tab ? "profile-tab-active" : "profile-tab-inactive"
                }`}
              >
                {tab === "products" ? `Products (${products.length})` : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content with fade transition */}
        <div className="pb-16" key={tabKey}>
          {activeTab === "products" && (
            <div className="tab-content-fade">
              {/* My Picks */}
              <div className="mb-10">
                <h2 className="text-h3 text-[#1a1a1a] mb-4">My Picks</h2>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {products.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              </div>

              {/* Collections */}
              {collections.length > 0 && (
                <div>
                  <h2 className="text-h3 text-[#1a1a1a] mb-4">Collections</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {collections.map((col) => (
                      <CollectionCard key={col.id} collection={col} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "routine" && (
            <div className="max-w-2xl tab-content-fade">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#e8e4de]">
                <h2 className="text-h3 text-[#1a1a1a] mb-2">Daily Routine</h2>
                <p className="text-[#6b6b6b] mb-6">{influencer.routineDescription}</p>

                <div className="space-y-6">
                  {products.map((product, index) => (
                    <div key={product.id} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#3d7a5f]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[#3d7a5f] font-bold text-sm">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <Link href={`/product/${product.id}`} className="flex items-center gap-3 group">
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="56px" />
                          </div>
                          <div>
                            <p className="text-label text-[#6b6b6b]">{product.brand}</p>
                            <p className="font-semibold text-[#1a1a1a] text-sm group-hover:text-[#3d7a5f] transition-colors">
                              {product.name}
                            </p>
                            <p className="text-[#3d7a5f] font-bold text-sm">${product.price.toFixed(2)}</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "about" && (
            <div className="max-w-2xl tab-content-fade">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#e8e4de]">
                <h2 className="text-h3 text-[#1a1a1a] mb-4">About {influencer.name}</h2>
                <p className="text-[#1a1a1a] leading-relaxed whitespace-pre-line">{influencer.about}</p>

                <div className="mt-8 pt-6 border-t border-[#e8e4de]">
                  <h3 className="font-semibold text-[#1a1a1a] mb-3">Expertise</h3>
                  <div className="flex gap-2 flex-wrap">
                    {influencer.tags.map((tag) => (
                      <span key={tag} className="bg-[#3d7a5f]/10 text-[#3d7a5f] text-sm px-4 py-2 rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[#e8e4de]">
                  <h3 className="font-semibold text-[#1a1a1a] mb-3">Stats</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center bg-[#f9f9f7] rounded-2xl p-4 border border-[#e8e4de]">
                      <p className="text-2xl font-bold text-[#3d7a5f]">{influencer.followers}</p>
                      <p className="text-xs text-[#6b6b6b] mt-1">Followers</p>
                    </div>
                    <div className="text-center bg-[#f9f9f7] rounded-2xl p-4 border border-[#e8e4de]">
                      <p className="text-2xl font-bold text-[#3d7a5f]">{products.length}</p>
                      <p className="text-xs text-[#6b6b6b] mt-1">Products</p>
                    </div>
                    <div className="text-center bg-[#f9f9f7] rounded-2xl p-4 border border-[#e8e4de]">
                      <p className="text-2xl font-bold text-[#3d7a5f]">4.9</p>
                      <p className="text-xs text-[#6b6b6b] mt-1">Avg Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
