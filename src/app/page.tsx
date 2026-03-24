"use client";

import Link from "next/link";
import Image from "next/image";
import { influencers, products, collections } from "@/data/mock";
import SectionHeader from "@/components/ui/SectionHeader";
import InfluencerCard from "@/components/ui/InfluencerCard";
import ProductCard from "@/components/ui/ProductCard";
import CollectionCard from "@/components/ui/CollectionCard";
import CTABanner from "@/components/ui/CTABanner";

export default function Home() {
  const featuredInfluencers = influencers.slice(0, 3);
  const trendingProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#EFF7F4] via-white to-[#EFF7F4]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2D8B75]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="max-w-2xl animate-fade-in-up">
            <span className="inline-block text-[#2D8B75] text-sm font-semibold bg-[#EFF7F4] px-4 py-1.5 rounded-full mb-6">
              Trusted by 100K+ beauty lovers worldwide
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#222222] leading-tight">
              Discover Real{" "}
              <span className="bg-gradient-to-r from-[#2D8B75] to-[#4DAE95] bg-clip-text text-transparent">
                K-Beauty
              </span>
              <br />
              Through Creators
            </h1>
            <p className="mt-6 text-lg text-[#888888] max-w-lg">
              Shop curated beauty products recommended by influencers living in Korea. Real reviews, real routines, real results.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/discover"
                className="bg-[#2D8B75] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#247A65] transition-colors shadow-lg shadow-[#2D8B75]/25"
              >
                Explore Creators
              </Link>
              <Link
                href="/discover"
                className="bg-white text-[#222222] px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-colors border border-gray-200"
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
                className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl p-3 pr-6 shadow-lg hover:shadow-xl transition-all hover:-translate-x-2"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#EFF7F4]">
                  <Image src={inf.profileImage} alt={inf.name} fill className="object-cover" sizes="48px" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#222222]">{inf.name} {inf.flag}</p>
                  <p className="text-xs text-[#888888]">{inf.followers} followers</p>
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
          {featuredInfluencers.map((inf) => (
            <InfluencerCard key={inf.id} influencer={inf} variant="featured" />
          ))}
        </div>
      </section>

      {/* Trending Picks */}
      <section className="bg-[#FAFAFA] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Trending Picks"
            subtitle="Most loved products by our creators this week"
            href="/discover"
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} showInfluencer />
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
          {influencers.map((inf) => (
            <div key={inf.id} className="flex-shrink-0 w-72 sm:w-auto">
              <InfluencerCard influencer={inf} />
            </div>
          ))}
        </div>
      </section>

      {/* Curated Collections */}
      <section className="bg-[#FAFAFA] py-12 sm:py-16">
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
            { quote: "I finally found products that work for my skin, all thanks to Hana's recommendations!", name: "Jessica M.", country: "USA 🇺🇸" },
            { quote: "Shopping through creators makes K-beauty so much easier. No more guesswork!", name: "Yuki T.", country: "Japan 🇯🇵" },
            { quote: "The curation is amazing. Every product I've bought has been a winner.", name: "Maria L.", country: "Brazil 🇧🇷" },
          ].map((testimonial) => (
            <div key={testimonial.name} className="bg-[#FAFAFA] rounded-3xl p-6 sm:p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-[#222222] leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="font-semibold text-[#222222] text-sm">{testimonial.name}</p>
                <p className="text-[#888888] text-xs">{testimonial.country}</p>
              </div>
            </div>
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
      <footer className="bg-[#222222] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <span className="text-xl font-bold bg-gradient-to-r from-[#2D8B75] to-[#4DAE95] bg-clip-text text-transparent">
                LINKBEAUTY
              </span>
              <p className="text-white/60 text-sm mt-3">Discover real K-beauty through the creators you trust.</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Discover</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="/discover" className="hover:text-white transition-colors">All Creators</Link></li>
                <li><Link href="/discover" className="hover:text-white transition-colors">Collections</Link></li>
                <li><Link href="/discover" className="hover:text-white transition-colors">New Arrivals</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Support</h4>
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
