"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

// Lazy-load the Three.js canvas dynamically with SSR disabled
const GymHeroCanvas = dynamic(() => import("./GymHeroCanvas"), {
  ssr: false,
  loading: () => (
    <div
      className="flex items-center justify-center w-full h-[320px] sm:h-[400px] lg:h-[480px]"
      aria-label="Loading athletic visual..."
    >
      <div className="relative w-40 h-40 sm:w-56 sm:h-56 opacity-40 animate-pulse">
        <Image
          src="/brand/logo.jpg"
          alt="Unisex Fitness Brand Mark"
          fill
          className="object-cover rounded-full border border-[#343434]"
          priority
        />
      </div>
    </div>
  ),
});

export default function HeroVisual3D({ className = "" }: { className?: string }) {
  return <GymHeroCanvas className={className} />;
}
