export type NavLink = {
  label: string;
  href: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  badge?: string;
  isNew?: boolean;
  isSale?: boolean;
};

export const APP_NAME = "Lumio";
export const APP_TAGLINE = "Modern Shopping, Reimagined";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "#products" },
  { label: "Categories", href: "#categories" },
  { label: "Deals", href: "#deals" },
  { label: "About", href: "#about" },
];

export const NAV_CTA = {
  label: "Shop Now",
  href: "#products",
};

export const BRAND_COLORS = {
  accent: "#f97316",
  dark: "#1a1a1a",
  light: "#f5f5f5",
  white: "#ffffff",
};

export const FOOTER_LINKS = {
  shop: [
    { label: "New Arrivals", href: "#products" },
    { label: "Best Sellers", href: "#products" },
    { label: "Sale", href: "#deals" },
    { label: "All Products", href: "#products" },
  ],
  support: [
    { label: "FAQ", href: "#about" },
    { label: "Shipping Info", href: "#about" },
    { label: "Returns", href: "#about" },
    { label: "Track Order", href: "#about" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Careers", href: "#about" },
    { label: "Press", href: "#about" },
    { label: "Contact", href: "#about" },
  ],
};