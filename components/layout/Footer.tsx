"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#171717] border-t border-[#343434]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/brand/logo.jpg"
                alt="Unisex Fitness"
                width={36}
                height={36}
                className="rounded-full object-cover"
              />
              <span className="font-display text-lg tracking-widest text-white">
                UNISEX FITNESS
              </span>
            </div>
            <p className="text-sm text-[#BDBDBD] leading-relaxed">
              Premium unisex fitness gym. Built by discipline, defined by
              strength.
            </p>
          </div>

          <div>
            <h3 className="font-display text-base tracking-wider text-white mb-4">
              QUICK LINKS
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/programmes", label: "Programmes" },
                { href: "/memberships", label: "Memberships" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[#BDBDBD] hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base tracking-wider text-white mb-4">
              LEGAL
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[#BDBDBD] hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#343434] text-center">
          <p className="text-xs text-[#BDBDBD]">
            &copy; 2026 Unisex Fitness. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
