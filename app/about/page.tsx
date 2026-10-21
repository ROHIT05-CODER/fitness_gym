import { SectionHeader, Card, Button } from "@/components/ui";
import { Dumbbell, Shield, Zap, HeartHandshake } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "About Us | Unisex Fitness",
  description:
    "Learn about Unisex Fitness — our philosophy, training environment, facility standards, and core code of discipline.",
};

const PILLARS = [
  {
    icon: Dumbbell,
    title: "CALIBRATED EQUIPMENT",
    desc: "Competition-grade barbells, machined steel plates, heavy-duty power racks, and precision ergonomic cable systems maintained daily.",
  },
  {
    icon: Shield,
    title: "ZERO INTIMIDATION, PURE INTENSITY",
    desc: "A genuine unisex culture. Elite competitors and absolute beginners share the platform with mutual respect, focused effort, and zero ego.",
  },
  {
    icon: Zap,
    title: "PROGRESSIVE METHODOLOGY",
    desc: "We prioritize biomechanically sound programming over social media fads. Every exercise serves a purposeful, measurable athletic return.",
  },
  {
    icon: HeartHandshake,
    title: "COMMUNITY INTEGRITY",
    desc: "Staffed by certified coaches who actively observe lifting standards, ensure safety, and uphold an immaculate training atmosphere.",
  },
];

const STANDARDS = [
  { label: "Strength Rig Area", detail: "Heavy-duty modular squat cages with multi-grip pull-up attachments." },
  { label: "Free Weight Deck", detail: "Machined dumbbells up to 60kg, specialty bars (trap bar, safety squat bar, Swiss bar)." },
  { label: "Metabolic Fleet", detail: "Concept2 rowers, SkiErgs, assault air bikes, and self-powered curved treadmills." },
  { label: "Recovery Amenities", detail: "Locker suites with high-pressure rainfall showers, infrared sauna access, and mobility tools." },
];

export default function AboutPage() {
  return (
    <div className="bg-black text-white min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Our Ethos"
          title="BUILT BY DISCIPLINE. DEFINED BY STRENGTH."
          subtitle="Unisex Fitness was founded on a singular conviction: genuine physical transformation demands rigorous discipline, calibrated equipment, and an atmosphere free from judgment."
        />

        {/* Narrative Section with Brand Logo Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative p-6 border border-[#343434] bg-[#121212] max-w-sm">
              <div className="relative w-72 h-72 mx-auto">
                <Image
                  src="/brand/logo.jpg"
                  alt="Unisex Fitness official brand emblem"
                  fill
                  className="object-cover rounded-full"
                  priority
                />
              </div>
              <div className="mt-6 text-center border-t border-[#262626] pt-4">
                <span className="font-display text-2xl tracking-widest text-white block">
                  UNISEX FITNESS
                </span>
                <span className="text-xs uppercase tracking-widest text-[#BDBDBD]">
                  Est. 2026 • Private Training Facility
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-[#C0C0C0] leading-relaxed">
            <h3 className="font-display text-3xl sm:text-4xl text-white tracking-wide">
              A TRAINING GROUND FOR EVERY BODY
            </h3>
            <p>
              Too many commercial gyms divide people into extremes: overly sterile fitness clubs devoid of serious training equipment on one side, or toxic, unapproachable lifting basements on the other.
            </p>
            <p>
              <strong className="text-white">Unisex Fitness exists in between.</strong> We provide a pristine, state-of-the-art training environment where anyone—regardless of gender, starting strength, or athletic background—can pursue their peak potential with pride.
            </p>
            <p>
              Here, discipline is the currency. We provide the equipment, the environment, and the technical programming. You bring the consistency.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Button href="/programmes" variant="primary" size="md">
                View Training Disciplines
              </Button>
              <Button href="/contact" variant="outline" size="md">
                Schedule Club Tour
              </Button>
            </div>
          </div>
        </div>

        {/* 4 Pillars */}
        <div className="mt-28">
          <SectionHeader
            eyebrow="Core Values"
            title="FOUR FOUNDATIONAL PILLARS"
            subtitle="The uncompromising standards guiding every decision we make in our gym."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <Card key={idx} variant="surface" className="flex items-start gap-6 hover:border-white">
                  <div className="p-3 bg-black border border-[#343434] text-white shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display text-2xl tracking-wide text-white mb-2">
                      {pillar.title}
                    </h4>
                    <p className="text-sm text-[#A0A0A0] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Facility Specifications */}
        <div className="mt-28 bg-[#121212] border border-[#343434] p-8 sm:p-12">
          <div className="max-w-3xl mb-8">
            <p className="text-xs font-semibold tracking-[0.4em] uppercase text-[#BDBDBD] mb-2">
              The Architecture
            </p>
            <h3 className="font-display text-4xl text-white tracking-wide">
              FACILITY SPECIFICATIONS
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STANDARDS.map((spec, i) => (
              <div key={i} className="p-5 border border-[#2B2B2B] bg-black">
                <span className="font-display text-lg text-white block mb-1">
                  {spec.label}
                </span>
                <span className="text-xs sm:text-sm text-[#A0A0A0]">
                  {spec.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
