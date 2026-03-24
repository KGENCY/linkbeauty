"use client";

import { useState } from "react";
import { influencers } from "@/data/mock";
import InfluencerCard from "@/components/ui/InfluencerCard";

const categories = ["All", "Skincare", "Makeup", "Clean Beauty", "Luxury", "Affordable", "Sensitive Skin"];

export default function DiscoverPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = influencers.filter((inf) => {
    const matchesSearch =
      inf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inf.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inf.nationality.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" ||
      inf.tags.some((t) => t.toLowerCase().includes(activeCategory.toLowerCase()));
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#EFF7F4] to-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#222222]">Discover Creators</h1>
          <p className="text-[#888888] mt-3 max-w-md mx-auto">
            Find your perfect beauty guide among our curated community of creators
          </p>

          {/* Search */}
          <div className="max-w-lg mx-auto mt-8 relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#888888] absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, country, or expertise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#2D8B75]/30 focus:border-[#2D8B75] text-[#222222] placeholder:text-[#888888] shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-[#2D8B75] text-white shadow-sm"
                  : "bg-white text-[#888888] hover:text-[#222222] hover:bg-gray-50 border border-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#888888] text-lg">No creators found. Try a different search or filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((inf) => (
              <InfluencerCard key={inf.id} influencer={inf} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
