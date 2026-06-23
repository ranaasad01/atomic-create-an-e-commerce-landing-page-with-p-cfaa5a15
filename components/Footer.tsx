"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, Mail, ArrowRight, Code2 as Github, MessageCircle as Twitter, Camera as Instagram } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, FOOTER_LINKS } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { useState } from "react";

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function getHref(href: string) {
    if (href.startsWith("#") && pathname !== "/") {
      return "/" + href;
    }
    return href;
  }

  function handleLinkClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Newsletter Banner */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <motion.div variants={fadeInUp} className="text-center md:text-left">
              <h3 className="text-2xl font-bold tracking-tight text-white">
                Get 15% off your first order
              </h3>
              <p className="mt-1 text-white/50 text-sm">
                Join 40,000+ shoppers. No spam, unsubscribe anytime.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="w-full md:w-auto">
              {subscribed ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-2 px-6 py-3 bg-[#f97316]/15 border border-[#f97316]/30 rounded-full text-[#f97316] font-medium text-sm"
                >
                  <span>You&apos;re in! Check your inbox.</span>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex items-center gap-2 w-full md:w-auto"
                >
                  <div className="relative flex-1 md:w-72">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/8 border border-white/12 rounded-full text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#f97316]/40 focus:border-[#f97316]/40 transition-all duration-200"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-3 bg-[#f97316] text-white text-sm font-semibold rounded-full shadow-[0_2px_12px_rgba(249,115,22,0.4)] hover:bg-[#ea6c0a] transition-all duration-200 whitespace-nowrap"
                  >
                    Subscribe
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-8 h-8 bg-[#f97316] rounded-xl flex items-center justify-center shadow-[0_2px_8px_rgba(249,115,22,0.35)]">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                {APP_NAME}
              </span>
            </Link>
            <p className="mt-4 text-white/45 text-sm leading-relaxed max-w-[200px]">
              {APP_TAGLINE}. Curated products, fast shipping, easy returns.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: Twitter, label: "Twitter" },
                { icon: Instagram, label: "Instagram" },
                { icon: Github, label: "Github" },
              ].map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/8 border border-white/10 text-white/50 hover:text-white hover:bg-white/15 hover:border-white/20 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Shop Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">
              Shop
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={getHref(link.href)}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-sm text-white/55 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">
              Support
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={getHref(link.href)}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-sm text-white/55 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={getHref(link.href)}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-sm text-white/55 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-white/30">
            &copy; {currentYear} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-white/30 hover:text-white/60 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}