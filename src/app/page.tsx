"use client";

import Link from "next/link";
import Image from "next/image";
import { influencers, products, collections } from "@/data/mock";
import SectionHeader from "@/components/ui/SectionHeader";
import InfluencerCard from "@/components/ui/InfluencerCard";
import ProductCard from "@/components/ui/ProductCard";
import CollectionCard from "@/components/ui/CollectionCard";
import CTABanner from "@/components/ui/CTABanner";
import ReviewCard from "@/components/ui/ReviewCard";

export default function Home() {
  const featuredInfluencers = influencers.slice(0, 3);
  const trendingProducts = products.slice(0, 4);

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
