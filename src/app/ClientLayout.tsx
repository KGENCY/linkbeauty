"use client";

import { CartProvider } from "@/data/CartContext";
import { WishlistProvider } from "@/data/WishlistContext";
import Navbar from "@/components/layout/Navbar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import CartSlideOver from "@/components/layout/CartSlideOver";
import CustomCursor from "@/components/ui/CustomCursor";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <CustomCursor />
        <Navbar />
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
        <MobileBottomNav />
        <CartSlideOver />
      </WishlistProvider>
    </CartProvider>
  );
}
