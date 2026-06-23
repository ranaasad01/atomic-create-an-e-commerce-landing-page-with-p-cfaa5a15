"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Star, ShoppingCart, ArrowRight, Check, Truck, Shield, RotateCcw, Headphones, ChevronRight, Heart, Sparkles, Eye, Zap } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, BRAND_COLORS } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline Data ────────────────────────────────────────────────────────────

const FEATURED_PRODUCTS = [
  {
    id: "p1",
    name: "Arc Wireless Headphones",
    price: 189,
    originalPrice: 249,
    rating: 4.9,
    reviewCount: 2341,
    image: "https://target.scene7.com/is/image/Target/GUEST_3ee89aee-3f6f-4fda-929e-7c75d7916fc2?wid=300&hei=300&fmt=pjpeg",
    category: "Audio",
    badge: "Best Seller",
    isSale: true,
  },
  {
    id: "p2",
    name: "Lumio Leather Watch",
    price: 295,
    originalPrice: undefined,
    rating: 4.8,
    reviewCount: 1087,
    image: "https://luminox.com/cdn/shop/files/XA.9521-C80-1080px-_2022.jpg?v=1688173039",
    category: "Accessories",
    badge: "New",
    isSale: false,
  },
  {
    id: "p3",
    name: "Matte Ceramic Desk Lamp",
    price: 129,
    originalPrice: 159,
    rating: 4.7,
    reviewCount: 834,
    image: "https://target.scene7.com/is/image/Target/GUEST_0fc41e8d-4037-41a2-8370-5b1d82708a28?wid=300&hei=300&fmt=pjpeg",
    category: "Home",
    badge: "Sale",
    isSale: true,
  },
  {
    id: "p4",
    name: "Slim Mechanical Keyboard",
    price: 219,
    originalPrice: undefined,
    rating: 4.9,
    reviewCount: 3102,
    image: "https://keychron.me/cdn/shop/files/Keychron-K7-65-percent-ultra-slim-compact-wireless-mechanical-keyboard-for-Mac-Windows-Hot-swappable-low-profile-Optical-red-switches-for-Mac-Windows-with-white-backlit.jpg?v=1729206312&width=1214",
    category: "Tech",
    badge: "Top Rated",
    isSale: false,
  },
  {
    id: "p5",
    name: "Linen Throw Blanket",
    price: 79,
    originalPrice: 99,
    rating: 4.6,
    reviewCount: 612,
    image: "https://m.media-amazon.com/images/I/71EUmwZhM6L.jpg",
    category: "Home",
    badge: "Sale",
    isSale: true,
  },
  {
    id: "p6",
    name: "Portable Espresso Maker",
    price: 149,
    originalPrice: undefined,
    rating: 4.8,
    reviewCount: 1455,
    image: "https://outin.com/cdn/shop/files/0901_nano_4__1.webp?v=1766421673",
    category: "Kitchen",
    badge: "New",
    isSale: false,
  },
];

const CATEGORIES = [
  {
    id: "c1",
    name: "Audio",
    count: 48,
    image: "https://assets.videomaker.com/2000/02/microphone-and-audio-mixer-PZ9UNB5-1-1.jpg",
    color: "from-orange-500/20 to-orange-500/5",
  },
  {
    id: "c2",
    name: "Tech",
    count: 93,
    image: "https://assets.videomaker.com/2000/02/microphone-and-audio-mixer-PZ9UNB5-1-1.jpg",
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    id: "c3",
    name: "Home",
    count: 67,
    image: "https://ats.org/wp-content/uploads/2020/04/Index-High-Tech-Future.jpg",
    color: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    id: "c4",
    name: "Accessories",
    count: 112,
    image: "https://static.newhomeinc.com/newhomeinc/images/newhomeinc_og.jpg",
    color: "from-purple-500/20 to-purple-500/5",
  },
];

const VALUE_PROPS = [
  {
    id: "v1",
    icon: Truck,
    title: "Free Shipping",
    desc: "On all orders over $75. Fast, tracked delivery to your door.",
  },
  {
    id: "v2",
    icon: Shield,
    title: "2-Year Warranty",
    desc: "Every product is backed by our comprehensive quality guarantee.",
  },
  {
    id: "v3",
    icon: RotateCcw,
    title: "30-Day Returns",
    desc: "Not in love? Return it hassle-free within 30 days, no questions.",
  },
  {
    id: "v4",
    icon: Headphones,
    title: "24/7 Support",
    desc: "Real humans ready to help. Chat, email, or call anytime.",
  },
];

const TESTIMONIALS = [
  {
    id: "t1",
    name: "Mia Chen",
    role: "Interior Designer",
    avatar: "https://img.magnific.com/premium-vector/24-7-support-icon-online-support-twenty-four-seven-vector_608466-89.jpg",
    rating: 5,
    text: "Lumio has completely changed how I shop online. The curation is impeccable and everything arrives beautifully packaged. My go-to for client gifts.",
  },
  {
    id: "t2",
    name: "James Okafor",
    role: "Software Engineer",
    avatar: "https://achiya.org/wp-content/uploads/writers/james-okafor-4d4bc7.webp",
    rating: 5,
    text: "The mechanical keyboard I ordered is an absolute dream. Build quality rivals products twice the price. Fast shipping, zero hassle.",
  },
  {
    id: "t3",
    name: "Sofia Reyes",
    role: "Photographer",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/7/78/Sof%C3%ADa_Reyes_2016.jpg",
    rating: 5,
    text: "I was skeptical at first, but the Arc headphones blew me away. Noise cancellation is incredible and the leather watch I added to my cart is stunning.",
  },
];

const DEAL_PRODUCTS = [
  {
    id: "d1",
    name: "Bamboo Wireless Charger",
    price: 49,
    originalPrice: 79,
    image: "https://m.media-amazon.com/images/I/71oYX+JFKNL.jpg",
    discount: 38,
    timeLeft: "2h 14m",
  },
  {
    id: "d2",
    name: "Merino Wool Beanie",
    price: 39,
    originalPrice: 59,
    image: "https://m.media-amazon.com/images/I/71oYX+JFKNL.jpg",
    discount: 34,
    timeLeft: "5h 02m",
  },
  {
    id: "d3",
    name: "Glass Water Bottle",
    price: 28,
    originalPrice: 45,
    image: "https://www.gigipip.com/cdn/shop/files/beanies-burgundy-gigi-merino-wool-beanie-41548091490435.jpg?v=1760644226",
    discount: 38,
    timeLeft: "11h 47m",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i <= Math.round(rating)
                ? "fill-[#f97316] text-[#f97316]"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-gray-500">
        {rating.toFixed(1)} ({count.toLocaleString()})
      </span>
    </div>
  );
}

const cardHover: Variants = {
  rest: { y: 0, boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px -4px rgba(0,0,0,0.08)" },
  hover: { y: -6, boxShadow: "0 4px 8px rgba(0,0,0,0.06), 0 20px 40px -12px rgba(0,0,0,0.16)" },
};

const imageZoom: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.06 },
};

const heartPop: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.2 },
};

function ProductCard({ product }: { product: (typeof FEATURED_PRODUCTS)[0] }) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  const discount =
    product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  return (
    <motion.div
      variants={scaleIn}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group relative bg-white rounded-2xl overflow-hidden border border-black/5 cursor-pointer"
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px -4px rgba(0,0,0,0.08)" }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-gray-50">
        <motion.img
          variants={imageZoom}
          transition={{ duration: 0.4, ease: "easeOut" }}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-full bg-[#f97316] text-white shadow-sm">
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-3 right-12 px-2 py-1 text-xs font-semibold rounded-full bg-black/80 text-white">
            -{discount}%
          </span>
        )}
        {/* Wishlist */}
        <motion.button
          variants={heartPop}
          onClick={() => setWished((w) => !w)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm border border-black/5 transition-colors duration-200"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${
              wished ? "fill-[#f97316] text-[#f97316]" : "text-gray-400"
            }`}
          />
        </motion.button>
        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
          <span className="flex items-center gap-1.5 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800 shadow-md">
            <Eye className="w-3.5 h-3.5" /> Quick View
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs font-medium text-[#f97316] uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-2 line-clamp-2">
          {product.name}
        </h3>
        <StarRating rating={product.rating} count={product.reviewCount} />
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
              added
                ? "bg-emerald-500 text-white"
                : "bg-[#f97316] text-white hover:bg-[#ea6c0a]"
            } shadow-[0_2px_8px_rgba(249,115,22,0.3)]`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" /> Add
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-[#fafaf9] overflow-hidden pt-16">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 40%, rgba(249,115,22,0.12) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(249,115,22,0.07) 0%, transparent 50%)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-left"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f97316]/10 border border-[#f97316]/20 text-[#f97316] text-xs font-semibold mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                New arrivals every week
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#1a1a1a] leading-[1.05] text-balance"
              >
                Shop with
                <br />
                <span className="text-[#f97316]">intention.</span>
                <br />
                Live with style.
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="mt-6 text-lg text-gray-500 leading-relaxed max-w-md text-pretty"
              >
                Lumio curates the world's finest everyday objects — from precision-crafted tech to timeless home goods. Every product, hand-picked for quality and design.
              </motion.p>

              <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-3">
                <motion.a
                  href="#products"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#f97316] text-white font-semibold rounded-full shadow-[0_4px_20px_rgba(249,115,22,0.4)] hover:bg-[#ea6c0a] transition-all duration-200"
                >
                  Shop Now <ArrowRight className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="#deals"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#deals")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[#1a1a1a] font-semibold rounded-full border border-black/10 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)] hover:border-black/20 transition-all duration-200"
                >
                  <Zap className="w-4 h-4 text-[#f97316]" /> Today's Deals
                </motion.a>
              </motion.div>

              {/* Social proof strip */}
              <motion.div variants={fadeInUp} className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`/images/avatar-customer-${i}.jpg`}
                      alt={`Customer ${i}`}
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#f97316] text-[#f97316]" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Loved by <strong className="text-gray-700">40,000+</strong> happy shoppers
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right — hero image collage */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideInRight}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square max-w-lg ml-auto">
                {/* Main image */}
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0 rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)]"
                >
                  <img
                    src="https://imageio.forbes.com/blogs-images/veenamccoole/files/2018/12/Screen-Shot-2018-12-23-at-6.07.20-PM-1200x597.png?height=353&width=711&fit=bounds"
                    alt="Modern lifestyle products"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Floating card — top left */}
                <motion.div
                  initial={{ opacity: 0, x: -20, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
                  className="absolute -left-10 top-12 bg-white rounded-2xl p-3.5 shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-black/5 flex items-center gap-3 min-w-[160px]"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#f97316]/10 flex items-center justify-center flex-shrink-0">
                    <Truck className="w-5 h-5 text-[#f97316]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">Free Shipping</p>
                    <p className="text-[10px] text-gray-400">Orders over $75</p>
                  </div>
                </motion.div>

                {/* Floating card — bottom right */}
                <motion.div
                  initial={{ opacity: 0, x: 20, y: -20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
                  className="absolute -right-8 bottom-16 bg-white rounded-2xl p-3.5 shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-black/5"
                >
                  <div className="flex items-center gap-2 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3 h-3 fill-[#f97316] text-[#f97316]" />
                    ))}
                  </div>
                  <p className="text-xs font-bold text-gray-900">4.9 / 5 rating</p>
                  <p className="text-[10px] text-gray-400">From 12,000+ reviews</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Value Props ───────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-black/5 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {VALUE_PROPS.map((vp) => {
              const Icon = vp.icon;
              return (
                <motion.div
                  key={vp.id}
                  variants={fadeInUp}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#f97316]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-[#f97316]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{vp.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{vp.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────────────────────── */}
      <section id="categories" className="py-20 md:py-28 bg-[#fafaf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="mb-12"
          >
            <motion.p variants={fadeInUp} className="text-xs font-semibold uppercase tracking-widest text-[#f97316] mb-3">
              Browse by category
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1a1a1a] text-balance">
              Find your perfect
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {CATEGORIES.map((cat) => (
              <motion.a
                key={cat.id}
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                variants={scaleIn}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)]"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} via-transparent to-transparent`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold text-lg leading-tight">{cat.name}</p>
                  <p className="text-white/70 text-xs mt-0.5">{cat.count} products</p>
                </div>
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ChevronRight className="w-4 h-4 text-white" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────────────────────── */}
      <section id="products" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
          >
            <div>
              <motion.p variants={fadeInUp} className="text-xs font-semibold uppercase tracking-widest text-[#f97316] mb-3">
                Curated for you
              </motion.p>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1a1a1a] text-balance" style={{ color: "#f20d0d" }}>
                Featured products
              </motion.h2>
            </div>
            <motion.a
              variants={fadeIn}
              href="#products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#f97316] hover:gap-2.5 transition-all duration-200 group"
            >
              View all <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </motion.a>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Flash Deals ───────────────────────────────────────────────────── */}
      <section id="deals" className="py-20 md:py-28 bg-[#1a1a1a] relative overflow-hidden">
        {/* Glow */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, rgba(249,115,22,0.25) 0%, transparent 55%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
          >
            <div>
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f97316]/15 border border-[#f97316]/25 text-[#f97316] text-xs font-semibold mb-4">
                <Zap className="w-3.5 h-3.5" /> Limited time
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold tracking-tight text-white text-balance">
                Flash deals
              </motion.h2>
              <motion.p variants={fadeInUp} className="mt-2 text-white/50 text-sm">
                Prices drop fast. Grab them before they're gone. And enjoy 
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {DEAL_PRODUCTS.map((deal) => (
              <motion.div
                key={deal.id}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden group cursor-pointer"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#f97316] text-white text-xs font-bold rounded-full">
                    -{deal.discount}% OFF
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-white font-semibold text-sm leading-snug mb-3">{deal.name}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-white">${deal.price}</span>
                      <span className="text-sm text-white/40 line-through">${deal.originalPrice}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-white/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-pulse" />
                      {deal.timeLeft} left
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-4 w-full py-2.5 bg-[#f97316] text-white text-sm font-semibold rounded-full hover:bg-[#ea6c0a] transition-colors duration-200 shadow-[0_2px_12px_rgba(249,115,22,0.35)]"
                  >
                    Grab This Deal
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section id="about" className="py-20 md:py-28 bg-[#fafaf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.p variants={fadeInUp} className="text-xs font-semibold uppercase tracking-widest text-[#f97316] mb-3">
              Real customers, real love
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1a1a1a] text-balance">
              Why shoppers choose Lumio
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-4 text-gray-500 max-w-xl mx-auto leading-relaxed text-pretty">
              Over 40,000 customers trust Lumio for quality products, fast delivery, and a shopping experience that feels genuinely different.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                custom={i}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-white rounded-2xl p-6 border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-center gap-0.5 mb-4" style={{ color: "#0a5ee6" }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-[#f97316] text-[#f97316]" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5 text-pretty">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-black/5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-9 h-9 rounded-full object-cover border-2 border-[#f97316]/20"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: "40K+", label: "Happy customers" },
              { value: "4.9", label: "Average rating" },
              { value: "500+", label: "Products curated" },
              { value: "98%", label: "Satisfaction rate" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="text-center p-6 bg-white rounded-2xl border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.06)]"
              >
                <p className="text-3xl font-extrabold text-[#f97316] tracking-tight">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="relative rounded-3xl overflow-hidden bg-[#1a1a1a] px-8 py-16 md:px-16 md:py-20 text-center"
          >
            {/* Glow */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 50% 60%, rgba(249,115,22,0.3) 0%, transparent 60%)",
              }}
            />
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f97316]/15 border border-[#f97316]/25 text-[#f97316] text-xs font-semibold mb-6"
              >
                <Sparkles className="w-3.5 h-3.5" />
                First order discount
              </motion.div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-balance mb-4">
                Get 15% off your
                <br />
                <span className="text-[#f97316]">first order.</span>
              </h2>
              <p className="text-white/50 text-base max-w-md mx-auto leading-relaxed mb-8 text-pretty">
                Join the Lumio community and unlock exclusive deals, early access to new arrivals, and free shipping on your first purchase.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm mx-auto">
                <motion.a
                  href="#products"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#f97316] text-white font-semibold rounded-full shadow-[0_4px_20px_rgba(249,115,22,0.5)] hover:bg-[#ea6c0a] transition-all duration-200"
                >
                  Start Shopping <ArrowRight className="w-4 h-4" />
                </motion.a>
              </div>
              <div className="mt-6 flex items-center justify-center gap-4 text-xs text-white/30">
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f97316]" /> No credit card required</span>
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f97316]" /> Cancel anytime</span>
                <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#f97316]" /> Free returns</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}