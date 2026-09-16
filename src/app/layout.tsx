import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIBuildAssistant from "@/components/AIBuildAssistant";
import "./globals.css";

export const metadata: Metadata = {
  title: "ModularHome.com | Modern Homes. A Smarter Way to Build.",
  description: "Explore modular homes, prefab homes, cabins, ADUs, barndominiums, floor plans and custom home options.",
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
      { url: "/favicon-32x32.png?v=3", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png?v=3", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico?v=3" },
      { url: "/favicon.png?v=3" },
    ],
    shortcut: "/favicon.ico?v=3",
    apple: [
      { url: "/apple-touch-icon.png?v=3", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "ModularHome.com | Modern Homes. A Smarter Way to Build.",
    description: "Explore modular homes, prefab homes, cabins, ADUs, barndominiums, floor plans and custom home options.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=3" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=3" />
        <link rel="shortcut icon" href="/favicon.ico?v=3" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=3" />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-[#101114] antialiased selection:bg-[#e20b16] selection:text-white">
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
