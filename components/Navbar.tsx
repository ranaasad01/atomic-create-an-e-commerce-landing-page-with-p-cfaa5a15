"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ShoppingCart, Sparkles } from 'lucide-react';
import { navLinks, NAV_CTA, APP_NAME } from "@/lib/data";

interface NavbarProps {
  cartCount?: number;
}

export default function Navbar({ cartCount = 0 }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleNavClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    } else {
      setMobileOpen(false);
    }
  }

  function getHref(href: string) {
    if (href.startsWith("#") && pathname !== "/") {
      return "/" + href;
    }
    return href;
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] border-b border-black/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="w-8 h-8 bg-[#f97316] rounded-xl flex items-center justify-center shadow-[0_2px_8px_rgba(249,115,22,0.4)]"
              >
                <Sparkles className="w-4 h-4 text-white" />
              </motion.div>
              <span className="text-xl font-bold tracking-tight text-[#1a1a1a] group-hover:text-[#f97316] transition-colors duration-200">
                {APP_NAME}
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={getHref(link.href)}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 group ${
                    pathname === link.href
                      ? "text-[#f97316]"
                      : "text-[#1a1a1a]/70 hover:text-[#1a1a1a]"
                  }`}
                >
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    className="relative z-10"
                  >
                    {link.label}
                  </motion.span>
                  <span className="absolute inset-0 rounded-full bg-[#f97316]/0 group-hover:bg-[#f97316]/8 transition-colors duration-200" />
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchOpen(!searchOpen)}
                className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full text-[#1a1a1a]/60 hover:text-[#1a1a1a] hover:bg-black/5 transition-all duration-200"
                aria-label="Search"
              >
                <Search className="w-4.5 h-4.5" />
              </motion.button>

              {/* Cart */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="#products"
                  onClick={(e) => handleNavClick(e, "#products")}
                  className="relative flex w-9 h-9 items-center justify-center rounded-full text-[#1a1a1a]/60 hover:text-[#1a1a1a] hover:bg-black/5 transition-all duration-200"
                  aria-label="Shopping cart"
                >
                  <ShoppingCart className="w-4.5 h-4.5" />
                  <AnimatePresence>
                    {cartCount > 0 && (
                      <motion.span
                        key="badge"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 20 }}
                        className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-[#f97316] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-[0_2px_6px_rgba(249,115,22,0.5)]"
                      >
                        {cartCount > 9 ? "9+" : cartCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>

              {/* CTA */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hidden sm:block"
              >
                <Link
                  href={getHref(NAV_CTA.href)}
                  onClick={(e) => handleNavClick(e, NAV_CTA.href)}
                  className="ml-1 px-4 py-2 bg-[#f97316] text-white text-sm font-semibold rounded-full shadow-[0_2px_8px_rgba(249,115,22,0.35)] hover:bg-[#ea6c0a] hover:shadow-[0_4px_16px_rgba(249,115,22,0.45)] transition-all duration-200"
                >
                  {NAV_CTA.label}
                </Link>
              </motion.div>

              {/* Mobile Menu Toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-[#1a1a1a]/70 hover:bg-black/5 transition-all duration-200"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden pb-3"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1a1a1a]/40" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    autoFocus
                    className="w-full pl-10 pr-4 py-2.5 bg-[#f5f5f5] border border-black/8 rounded-xl text-sm text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:ring-2 focus:ring-[#f97316]/30 focus:border-[#f97316]/40 transition-all duration-200"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden bg-white/98 backdrop-blur-md border-t border-black/5 shadow-lg"
            >
              <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={getHref(link.href)}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="px-4 py-3 text-sm font-medium text-[#1a1a1a]/80 hover:text-[#f97316] hover:bg-[#f97316]/5 rounded-xl transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href={getHref(NAV_CTA.href)}
                  onClick={(e) => handleNavClick(e, NAV_CTA.href)}
                  className="mt-2 px-4 py-3 bg-[#f97316] text-white text-sm font-semibold rounded-xl text-center shadow-[0_2px_8px_rgba(249,115,22,0.35)] hover:bg-[#ea6c0a] transition-all duration-200"
                >
                  {NAV_CTA.label}
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}