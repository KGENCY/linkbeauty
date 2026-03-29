"use client";

import { useState } from "react";
import SkinTest from "@/components/ui/SkinTest";

export default function Home() {
  const [isSkinTestOpen, setIsSkinTestOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8faf9] via-[#f0f7f3] to-[#e8f4ee]" />

      {/* Soft ambient glow effects */}
      <div className="landing-glow absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(61,122,95,0.06)_0%,_transparent_70%)] rounded-full blur-3xl pointer-events-none" />
      <div className="landing-glow-delayed absolute bottom-[10%] left-[15%] w-[400px] h-[400px] bg-[radial-gradient(circle,_rgba(106,170,142,0.08)_0%,_transparent_70%)] rounded-full blur-2xl pointer-events-none" />
      <div className="landing-glow absolute top-[40%] right-[10%] w-[300px] h-[300px] bg-[radial-gradient(circle,_rgba(61,122,95,0.05)_0%,_transparent_70%)] rounded-full blur-2xl pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* Hero Section */}
        <section className="flex-1 flex flex-col items-center justify-center px-6 py-12 sm:py-16">
          <div className="w-full max-w-md mx-auto flex flex-col items-center text-center">

            {/* Brand Logo - Large & Prominent */}
            <div className="landing-logo mb-12 sm:mb-14 md:mb-16">
              <h1 className="font-display text-[3.5rem] sm:text-6xl md:text-7xl font-bold tracking-tight leading-none">
                <span className="bg-gradient-to-r from-[#2d5a47] via-[#3d7a5f] to-[#4a8a6f] bg-clip-text text-transparent">
                  KFIT
                </span>
              </h1>
              <div className="mt-3 h-[2px] w-12 mx-auto bg-gradient-to-r from-transparent via-[#3d7a5f]/50 to-transparent" />
            </div>

            {/* Main Headline */}
            <div className="landing-headline mb-5 sm:mb-6">
              <h2 className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] font-bold text-[#1a1a1a] leading-[1.35] tracking-[-0.01em]">
                간단한 질문으로
              </h2>
              <h2 className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] font-bold leading-[1.35] tracking-[-0.01em] mt-0.5">
                <span className="bg-gradient-to-r from-[#2d6a4f] to-[#3d7a5f] bg-clip-text text-transparent">
                  정확한 내 피부 타입
                </span>
                <span className="text-[#1a1a1a]">을 확인하고</span>
              </h2>
            </div>

            {/* Sub Copy */}
            <p className="landing-subtext text-[0.95rem] sm:text-base text-[#666] mb-8 sm:mb-10 leading-relaxed max-w-[280px] sm:max-w-xs">
              나에게 꼭 맞는 K-뷰티 제품을 추천 받아보세요
            </p>

            {/* Benefit Box */}
            <div className="landing-benefit mb-8 sm:mb-10 w-full max-w-[280px] sm:max-w-[300px]">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl px-5 py-4 shadow-[0_4px_24px_rgba(61,122,95,0.08)] border border-[#3d7a5f]/8">
                <div className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0 mt-0.5">🎁</span>
                  <div className="text-left">
                    <p className="text-[#3d7a5f] font-semibold text-[0.8rem] sm:text-sm leading-relaxed">
                      참가한 분들 중 10분에게
                    </p>
                    <p className="text-[#333] font-medium text-[0.8rem] sm:text-sm leading-relaxed">
                      딱 맞는 제품을 무료로 보내드립니다
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="landing-cta">
              <button
                onClick={() => setIsSkinTestOpen(true)}
                className="group relative bg-gradient-to-r from-[#3d7a5f] to-[#4a8a6f] text-white px-10 sm:px-12 py-4 sm:py-[1.1rem] rounded-full font-bold text-base sm:text-lg shadow-[0_8px_32px_rgba(61,122,95,0.35)] hover:shadow-[0_14px_44px_rgba(61,122,95,0.4)] hover:-translate-y-1 active:translate-y-0 active:shadow-[0_4px_20px_rgba(61,122,95,0.3)] transition-all duration-300 ease-out overflow-hidden"
              >
                <span className="relative z-10">테스트 시작하기</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2d6a4f] to-[#3d7a5f] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>

            {/* Helper Text */}
            <p className="landing-helper mt-4 sm:mt-5 text-[0.8rem] sm:text-sm text-[#999] tracking-wide">
              약 30초 소요 · 6개 질문
            </p>

          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="py-5 sm:py-6 text-center">
          <span className="font-display text-xs sm:text-sm font-semibold text-[#3d7a5f]/50 tracking-wider">
            KFIT
          </span>
          <p className="text-[0.65rem] sm:text-xs text-[#aaa] mt-1">
            © 2025 KFIT. All rights reserved.
          </p>
        </footer>

      </div>

      {/* Skin Test Modal */}
      <SkinTest isOpen={isSkinTestOpen} onClose={() => setIsSkinTestOpen(false)} />
    </div>
  );
}
