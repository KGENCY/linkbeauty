"use client";

import { useEffect, useRef, useState } from "react";

interface ReviewCardProps {
  quote: string;
  name: string;
  country: string;
  flag: string;
  countryCode: string;
  delay?: number;
}

export default function ReviewCard({ quote, name, country, flag, countryCode, delay = 0 }: ReviewCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`review-card bg-white rounded-3xl p-6 sm:p-8 pt-10 sm:pt-12 border border-[#e8e4de] review-card-enter ${
        isVisible ? "review-card-visible" : ""
      }`}
    >
      <div className="review-stars flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="#f4b942"
            stroke="#f4b942"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <p className="text-[#1a1a1a] leading-relaxed relative z-10">&ldquo;{quote}&rdquo;</p>
      <div className="mt-4 pt-4 border-t border-[#e8e4de] flex items-center justify-between">
        <p className="font-semibold text-[#1a1a1a] text-sm">{name}</p>
        <span className="inline-flex items-center gap-1.5 bg-[#f9f9f7] text-[#6b6b6b] px-3 py-1 rounded-full text-xs font-medium">
          {flag} {countryCode}
        </span>
      </div>
    </div>
  );
}
