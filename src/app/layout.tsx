import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIBuildAssistant from "@/components/AIBuildAssistant";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ModularHome.com | Modern Modular & Prefab Homes Marketplace",
  description: "Discover, compare, customize, and request information about factory-built and modular housing solutions including modular homes, prefabs, barndominiums, cabins, ADUs, and custom floor plans.",
  keywords: [
    "ModularHome.com",
    "Modular Homes",
    "Prefab Homes",
    "Barndominiums",
    "Cabins",
    "Tiny Homes",
    "ADUs",
    "A-Frame Homes",
    "Floor Plans",
    "Factory Built Homes"
  ],
  icons: {
    icon: [
      { url: "/favicon.png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "ModularHome.com | Modern Modular & Prefab Homes Marketplace",
    description: "Discover, compare, customize, and request information about factory-built and modular housing solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${manrope.variable} ${inter.variable} light scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-white text-[#1D2521] antialiased selection:bg-[#B82025] selection:text-white">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <AIBuildAssistant />
      </body>
    </html>
  );
}
