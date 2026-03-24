"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f7f4] via-[#f9f9f7] to-[#f0f7f4] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-sm border border-[#e8e4de]">
        <div className="text-center mb-8">
          <Link href="/" className="font-display text-2xl font-bold bg-gradient-to-r from-[#3d7a5f] to-[#6aaa8e] bg-clip-text text-transparent">
            LINKBEAUTY
          </Link>
          <h1 className="text-h2 text-[#1a1a1a] mt-4">Welcome Back</h1>
          <p className="text-[#6b6b6b] mt-2">Sign in to continue shopping through creators</p>
        </div>

        <div className="space-y-4">
          <button className="w-full flex items-center justify-center gap-3 bg-[#f9f9f7] py-3.5 rounded-xl border border-[#e8e4de] hover:bg-white transition-colors font-medium text-[#1a1a1a]">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-[#e8e4de]" />
            <span className="text-xs text-[#6b6b6b]">or</span>
            <div className="flex-1 h-px bg-[#e8e4de]" />
          </div>

          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3.5 bg-[#f9f9f7] rounded-xl border border-[#e8e4de] focus:outline-none focus:ring-2 focus:ring-[#3d7a5f]/30 focus:border-[#3d7a5f] text-[#1a1a1a] placeholder:text-[#6b6b6b]"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3.5 bg-[#f9f9f7] rounded-xl border border-[#e8e4de] focus:outline-none focus:ring-2 focus:ring-[#3d7a5f]/30 focus:border-[#3d7a5f] text-[#1a1a1a] placeholder:text-[#6b6b6b]"
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-[#6b6b6b]">
              <input type="checkbox" className="rounded accent-[#3d7a5f]" />
              Remember me
            </label>
            <a href="#" className="text-[#3d7a5f] hover:underline">Forgot password?</a>
          </div>

          <button className="w-full bg-[#3d7a5f] text-white py-4 rounded-xl font-semibold hover:bg-[#356b53] transition-colors shadow-lg shadow-[#3d7a5f]/20">
            Sign In
          </button>
        </div>

        <p className="text-center text-sm text-[#6b6b6b] mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#3d7a5f] font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
