"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { influencers, products, collections } from "@/data/mock";
import type { DBProduct } from "@/types/db";
import SectionHeader from "@/components/ui/SectionHeader";
import InfluencerCard from "@/components/ui/InfluencerCard";
import ProductCard from "@/components/ui/ProductCard";
import CollectionCard from "@/components/ui/CollectionCard";
import CTABanner from "@/components/ui/CTABanner";
import ReviewCard from "@/components/ui/ReviewCard";

export default function Home() {
  const featuredInfluencers = influencers.slice(0, 3);
  const trendingProducts = products.slice(0, 4);
  const [dbProducts, setDbProducts] = useState<DBProduct[]>([]);

  useEffect(() => {
    fetch("/api/products?limit=8")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setDbProducts(data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden hero-gradient-mesh">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#3d7a5f]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="max-w-2xl">
            <h1 className="text-h1 text-[#1a1a1a]">
              <span className="hero-headline-1 inline-block">Discover Real</span>{" "}
              <span className="hero-headline-2 inline-block text-[#3d7a5f]">
                K-Beauty
              </span>
              <br />
              <span className="hero-headline-3 inline-block">Through Creators</span>
            </h1>
            <p className="mt-6 text-lg text-[#6b6b6b] max-w-lg leading-relaxed hero-headline-3">
              Shop curated beauty products recommended by influencers living in Korea. Real reviews, real routines, real results.
            </p>
            {/* Floating badge */}
            <div className="hero-badge mt-6">
              <span className="inline-flex items-center gap-2 bg-[#e8f4ee] text-[#3d7a5f] px-4 py-2 rounded-full text-[13px] font-medium">
                🌿 100K+ beauty lovers worldwide
              </span>
            </div>
            <div className="flex flex-wrap gap-4 mt-8 hero-headline-3">
              <Link
                href="/discover"
                className="hero-cta-primary bg-[#3d7a5f] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg shadow-[#3d7a5f]/25"
              >
                Explore Creators
              </Link>
              <Link
                href="/discover"
                className="hero-cta-secondary bg-white text-[#1a1a1a] px-8 py-4 rounded-full font-semibold text-lg border border-[#e8e4de]"
              >
                How It Works
              </Link>
            </div>
          </div>
          {/* Floating influencer avatars */}
          <div className="hidden lg:flex absolute right-12 top-1/2 -translate-y-1/2 flex-col gap-4">
            {featuredInfluencers.map((inf, i) => (
              <Link
                key={inf.id}
                href={`/influencer/${inf.id}`}
                className={`flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl p-3 pr-6 shadow-lg hover:shadow-xl transition-all hover:-translate-x-2 hero-card-${i + 1}`}
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#3d7a5f]/10">
                  <Image src={inf.profileImage} alt={inf.name} fill className="object-cover" sizes="48px" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#1a1a1a]">{inf.name} {inf.flag}</p>
                  <p className="text-xs text-[#6b6b6b]">{inf.followers} followers</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Influencers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <SectionHeader
          title="Featured Creators"
          subtitle="Meet the tastemakers shaping global K-beauty"
          href="/discover"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredInfluencers.map((inf, index) => (
            <InfluencerCard key={inf.id} influencer={inf} variant="featured" animationDelay={index * 100} />
          ))}
        </div>
      </section>

      {/* Trending Picks */}
      <section className="bg-[#f9f9f7] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Trending Picks"
            subtitle="Most loved products by our creators this week"
            href="/discover"
          />

          {/* DB Products */}
          {dbProducts.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
              {dbProducts.slice(0, 8).map((p, index) => (
                <Link
                  key={p.id}
                  href={`/p/${p.id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#e8e4de] hover:shadow-lg transition-all"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-[#f9f9f7]">
                    {p.imageUrl ? (
                      <Image
                        src={p.imageUrl}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-[#e8e4de]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="inline-flex items-center gap-1.5 mb-2 bg-[#f9f9f7] border border-[#e8e4de] rounded-full py-[3px] pl-2 pr-2.5">
                      <span className="text-[12px] text-[#1a1a1a] font-medium">{p.influencer.name}&apos;s pick</span>
                    </div>
                    <p className="text-label text-[#6b6b6b]">{p.brand}</p>
                    <h3 className="font-semibold text-[#1a1a1a] text-sm mt-1 line-clamp-2 group-hover:text-[#3d7a5f] transition-colors">
                      {p.name}
                    </h3>
                    <div className="mt-3">
                      <span className="text-[18px] font-semibold text-[#1a1a1a]">{p.price.toLocaleString()}원</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Mock Products */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {trendingProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} showInfluencer index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Creator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <SectionHeader
          title="Shop by Creator"
          subtitle="Find your beauty soulmate"
          href="/discover"
        />
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible">
          {influencers.map((inf, index) => (
            <div key={inf.id} className="flex-shrink-0 w-72 sm:w-auto">
              <InfluencerCard influencer={inf} animationDelay={index * 100} />
            </div>
          ))}
        </div>
      </section>

      {/* Curated Collections */}
      <section className="bg-[#f9f9f7] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Curated Collections"
            subtitle="Handpicked sets for every skin story"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.slice(0, 3).map((col) => (
              <CollectionCard key={col.id} collection={col} />
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <SectionHeader title="Loved Worldwide" subtitle="What our community says" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { quote: "I finally found products that work for my skin, all thanks to Hana's recommendations!", name: "Jessica M.", country: "USA", flag: "🇺🇸", countryCode: "US" },
            { quote: "Shopping through creators makes K-beauty so much easier. No more guesswork!", name: "Yuki T.", country: "Japan", flag: "🇯🇵", countryCode: "JP" },
            { quote: "The curation is amazing. Every product I've bought has been a winner.", name: "Maria L.", country: "Brazil", flag: "🇧🇷", countryCode: "BR" },
          ].map((testimonial, index) => (
            <ReviewCard
              key={testimonial.name}
              quote={testimonial.quote}
              name={testimonial.name}
              country={testimonial.country}
              flag={testimonial.flag}
              countryCode={testimonial.countryCode}
              delay={index * 150}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <CTABanner
          title="Become a Creator"
          subtitle="Share your K-beauty discoveries and earn by curating your own beauty store"
          buttonText="Apply Now"
          href="/signup"
        />
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <span className="font-display text-xl font-bold bg-gradient-to-r from-[#3d7a5f] to-[#6aaa8e] bg-clip-text text-transparent">
                LINKBEAUTY
              </span>
              <p className="text-white/60 text-sm mt-3 leading-relaxed">Discover real K-beauty through the creators you trust.</p>
            </div>
            <div>
              <h4 className="text-label text-white/80 mb-3">Discover</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="/discover" className="hover:text-white transition-colors">All Creators</Link></li>
                <li><Link href="/discover" className="hover:text-white transition-colors">Collections</Link></li>
                <li><Link href="/discover" className="hover:text-white transition-colors">New Arrivals</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-label text-white/80 mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-label text-white/80 mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Shipping</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Returns</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-10 pt-8 text-center text-sm text-white/40">
            &copy; 2026 LINKBEAUTY. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
