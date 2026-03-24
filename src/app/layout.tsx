import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LINKBEAUTY — Discover K-Beauty Through Creators",
  description: "Shop curated K-beauty products recommended by your favorite influencers living in Korea.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-white">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
