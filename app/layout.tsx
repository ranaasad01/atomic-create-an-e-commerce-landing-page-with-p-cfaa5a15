import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumio — Modern Shopping, Reimagined",
  description:
    "Discover curated products across fashion, tech, home, and more. Shop the latest trends with fast shipping and easy returns.",
  keywords: ["e-commerce", "shopping", "fashion", "tech", "home decor"],
  openGraph: {
    title: "Lumio — Modern Shopping, Reimagined",
    description: "Discover curated products across fashion, tech, home, and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#f5f5f5] text-[#1a1a1a] font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}