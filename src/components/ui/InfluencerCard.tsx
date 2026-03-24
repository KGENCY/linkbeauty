"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { type Influencer } from "@/data/mock";

interface InfluencerCardProps {
  influencer: Influencer;
  variant?: "default" | "featured" | "compact";
  animationDelay?: number;
}

// Map nationality to country code with flag
function getCountryBadge(nationality: string, flag: string): { code: string; flag: string } {
  const countryMap: Record<string, string> = {
    Japan: "JP",
    France: "FR",
    Brazil: "BR",
    China: "CN",
    USA: "US",
    Russia: "RU",
  };
  return {
    code: countryMap[nationality] || nationality.slice(0, 2).toUpperCase(),
    flag: flag,
  };
}

export default function InfluencerCard({ influencer, variant = "default", animationDelay = 0 }: InfluencerCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [coverLoaded, setCoverLoaded] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const countryBadge = getCountryBadge(influencer.nationality, influencer.flag);

  if (variant === "compact") {
    return (
      <Link
        ref={cardRef}
        href={`/influencer/${influencer.id}`}
        className={`flex items-center gap-3 p-3 bg-white rounded-2xl hover:shadow-md transition-all group border border-[#e8e4de] creator-card-enter ${isVisible ? "creator-card-visible" : ""}`}
        style={{ transitionDelay: `${animationDelay}ms` }}
      >
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#3d7a5f]/10">
          <Image
            src={influencer.profileImage}
            alt={influencer.name}
            fill
            className={`object-cover transition-all duration-400 ${
              profileLoaded ? "image-blur-loaded" : "image-blur-loading"
            }`}
            sizes="48px"
            onLoad={() => setProfileLoaded(true)}
          />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-sm text-[#1a1a1a] group-hover:text-[#3d7a5f] transition-colors">
            {influencer.name}
            <span className="ml-2 inline-flex items-center gap-1 bg-white border border-[#e8e4de] rounded-full px-2 py-0.5 text-[11px] font-semibold">
              {countryBadge.flag} {countryBadge.code}
            </span>
          </p>
          <p className="text-xs text-[#6b6b6b] truncate">{influencer.followers} followers</p>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link
        ref={cardRef}
        href={`/influencer/${influencer.id}`}
        className={`group relative block creator-card-enter ${isVisible ? "creator-card-visible" : ""}`}
        style={{ transitionDelay: `${animationDelay}ms` }}
      >
        <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.16)] transition-shadow duration-400">
          <Image
            src={influencer.coverImage}
            alt={influencer.name}
            fill
            className={`object-cover transition-all duration-400 ease-out group-hover:scale-105 ${
              coverLoaded ? "image-blur-loaded" : "image-blur-loading"
            }`}
            sizes="(max-width: 768px) 80vw, 33vw"
            onLoad={() => setCoverLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          {/* Bottom overlay with enhanced hover */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[rgba(0,0,0,0.4)] to-transparent group-hover:from-[rgba(0,0,0,0.65)] transition-all duration-400">
            {/* Country badge */}
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center gap-1 bg-white border border-[#e8e4de] rounded-full px-2 py-0.5 text-[11px] font-semibold text-[#1a1a1a]">
                {countryBadge.flag} {countryBadge.code}
              </span>
            </div>

            <div className="flex items-center gap-3 mb-3 transition-transform duration-400 group-hover:-translate-y-1">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/50">
                <Image
                  src={influencer.profileImage}
                  alt={influencer.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div>
                <p className="text-white font-bold text-lg">{influencer.name}</p>
                <p className="text-white/70 text-sm">{influencer.followers} followers</p>
              </div>
            </div>
            <p className="text-white/90 text-sm line-clamp-2 transition-transform duration-400 group-hover:-translate-y-1">{influencer.bio}</p>

            {/* Interest tags with enhanced styling */}
            <div className="flex gap-2 mt-3 flex-wrap transition-transform duration-400 group-hover:-translate-y-1">
              {influencer.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="creator-tag text-xs bg-[#f0f7f3] text-[#3d7a5f] border border-[#c8e4d8] px-3 py-1 rounded-full font-medium hover:bg-[#3d7a5f] hover:text-white hover:border-[#3d7a5f] transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Shop picks text - appears on hover */}
            <p className="mt-3 text-white/90 text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
              Shop picks →
            </p>
          </div>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link
      ref={cardRef}
      href={`/influencer/${influencer.id}`}
      className={`group block bg-white rounded-3xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.16)] transition-all duration-400 border border-[#e8e4de] creator-card-enter ${isVisible ? "creator-card-visible" : ""}`}
      style={{ transitionDelay: `${animationDelay}ms` }}
    >
      <div className="relative h-36 sm:h-44 overflow-hidden">
        <Image
          src={influencer.coverImage}
          alt={influencer.name}
          fill
          className={`object-cover transition-all duration-400 ease-out group-hover:scale-105 ${
            coverLoaded ? "image-blur-loaded" : "image-blur-loading"
          }`}
          sizes="(max-width: 768px) 100vw, 50vw"
          onLoad={() => setCoverLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent group-hover:from-black/50 transition-all duration-400" />

        {/* Country badge */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 bg-white border border-[#e8e4de] rounded-full px-2 py-0.5 text-[11px] font-semibold text-[#1a1a1a]">
            {countryBadge.flag} {countryBadge.code}
          </span>
        </div>
      </div>
      <div className="relative px-5 pb-5">
        <div className="relative -mt-8 mb-3">
          <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-white relative">
            <Image
              src={influencer.profileImage}
              alt={influencer.name}
              fill
              className={`object-cover transition-all duration-400 ${
                profileLoaded ? "image-blur-loaded" : "image-blur-loading"
              }`}
              sizes="64px"
              onLoad={() => setProfileLoaded(true)}
            />
          </div>
        </div>
        <div className="transition-transform duration-400 group-hover:-translate-y-1">
          <h3 className="font-bold text-[#1a1a1a] text-lg group-hover:text-[#3d7a5f] transition-colors">
            {influencer.name}
          </h3>
          <p className="text-[#6b6b6b] text-sm mt-1">{influencer.followers} followers</p>
          <p className="text-[#1a1a1a] text-sm mt-2 line-clamp-2">{influencer.bio}</p>
        </div>

        {/* Interest tags with enhanced styling */}
        <div className="flex gap-2 mt-3 flex-wrap transition-transform duration-400 group-hover:-translate-y-1">
          {influencer.tags.map((tag) => (
            <span
              key={tag}
              className="creator-tag text-xs bg-[#f0f7f3] text-[#3d7a5f] border border-[#c8e4d8] px-3 py-1 rounded-full font-medium hover:bg-[#3d7a5f] hover:text-white hover:border-[#3d7a5f] transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Shop picks text - appears on hover */}
        <p className="mt-3 text-[#3d7a5f] text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
          Shop picks →
        </p>
      </div>
    </Link>
  );
}
