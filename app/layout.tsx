import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "VLA for Bimanual LEGO Assembly - Thesis Portfolio",
  description: "Research thesis on Vision-Language-Action systems for robotic bimanual LEGO assembly using EO-1 methodology on IHMC Alex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className="antialiased bg-[#161316] text-white min-h-screen flex flex-col"
        suppressHydrationWarning
      >
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
