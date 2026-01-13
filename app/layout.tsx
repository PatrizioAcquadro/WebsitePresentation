import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "VLA for Bimanual LEGO Assembly - Thesis Portfolio",
  description: "Research thesis on Vision-Language-Action systems for robotic bimanual LEGO assembly using EO-1 methodology on Unitree H1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} antialiased bg-[#161316] text-white min-h-screen flex flex-col`}
      >
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
