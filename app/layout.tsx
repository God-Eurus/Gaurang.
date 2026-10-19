import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ArcCursor } from "@/components/ui/arc-cursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Starfield } from "@/components/ui/starfield";
import "lenis/dist/lenis.css";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gaurang Maharwal",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <SmoothScroll />
        {/* page-wide space: continuous behind every chapter, warps while scrolling fast */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          <Starfield speed={0.02} count={500} velocityBoost />
        </div>
        <ArcCursor />
        {children}
      </body>
    </html>
  );
}
