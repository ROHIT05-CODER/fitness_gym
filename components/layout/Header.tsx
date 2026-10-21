"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/programmes", label: "Programmes" },
  { href: "/memberships", label: "Memberships" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-[#343434]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/brand/logo.jpg"
              alt="Unisex Fitness logo"
              width={40}
              height={40}
              className="rounded-full object-cover"
              priority
            />
            <span className="font-display text-xl tracking-widest text-white">
              UNISEX FITNESS
            </span>
          </Link>

          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#BDBDBD] hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/sign-in"
              className="px-4 py-2 text-sm font-medium border border-white text-white hover:bg-white hover:text-black transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/memberships"
              className="px-4 py-2 text-sm font-medium bg-white text-black hover:bg-[#BDBDBD] transition-colors"
            >
              Join Now
            </Link>
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#171717] border-t border-[#343434]">
          <nav
            className="px-4 py-4 flex flex-col gap-4"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#BDBDBD] hover:text-white transition-colors py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-[#343434]">
              <Link
                href="/sign-in"
                className="px-4 py-2 text-sm font-medium border border-white text-white text-center hover:bg-white hover:text-black transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/memberships"
                className="px-4 py-2 text-sm font-medium bg-white text-black text-center hover:bg-[#BDBDBD] transition-colors"
              >
                Join Now
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
