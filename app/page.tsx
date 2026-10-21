"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import HeroVisual3D from "@/components/3d/HeroVisual3D";

const programmes = [
  {
    title: "Strength Training",
    desc: "Build raw power and muscular endurance through progressive overload.",
  },
  {
    title: "Bodybuilding",
    desc: "Sculpt your physique with targeted hypertrophy programming.",
  },
  {
    title: "Functional Fitness",
    desc: "Train movements that carry over to real life and sport.",
  },
  {
    title: "HIIT",
    desc: "High-intensity intervals for maximum calorie burn and conditioning.",
  },
  {
    title: "Personal Training",
    desc: "One-on-one coaching tailored to your individual goals.",
  },
  {
    title: "Weight Management",
    desc: "Structured programmes combining nutrition guidance and training.",
  },
];

const memberships = [
  {
    name: "Basic",
    price: "TBD",
    benefits: ["Gym access", "Locker room", "Basic equipment"],
    highlight: false,
  },
  {
    name: "Pro",
    price: "TBD",
    benefits: ["All Basic features", "Group classes", "Fitness assessment"],
    highlight: true,
  },
  {
    name: "Elite",
    price: "TBD",
    benefits: [
      "All Pro features",
      "Personal training sessions",
      "Priority booking",
    ],
    highlight: false,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 bg-black overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#171717_0%,_#000000_75%)]" />

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Hero Typography & CTAs */}
          <motion.div
            className="lg:col-span-7 text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.4em] text-[#BDBDBD] uppercase mb-4"
            >
              Unisex Fitness • Est. 2026
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-wider text-white leading-none mb-6"
            >
              BUILT BY
              <br />
              DISCIPLINE.
              <br />
              <span className="text-[#BDBDBD]">DEFINED BY</span>
              <br />
              STRENGTH.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-sm sm:text-base text-[#A0A0A0] max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              A premium unisex fitness facility built for those who refuse to
              settle. Calibrated strength platforms, elite conditioning gear, and
              zero intimidation.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/memberships"
                className="px-8 py-4 bg-white text-black font-semibold text-sm tracking-widest hover:bg-[#BDBDBD] transition-colors text-center"
              >
                JOIN NOW
              </Link>
              <Link
                href="/programmes"
                className="px-8 py-4 border border-white text-white font-semibold text-sm tracking-widest hover:bg-white hover:text-black transition-colors text-center"
              >
                EXPLORE PROGRAMMES
              </Link>
            </motion.div>
          </motion.div>

          {/* 3D Visual Element */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <HeroVisual3D />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-[#F5F5F5] text-black py-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.4em] text-[#BDBDBD] uppercase mb-4">
              About Us
            </p>
            <h2 className="font-display text-5xl sm:text-6xl tracking-wide text-black mb-6">
              WHERE EVERYONE
              <br />
              BELONGS
            </h2>
            <p className="text-[#171717] leading-relaxed mb-4">
              Unisex Fitness is a premium gym built for all. Whether you are
              just starting out or competing at the highest level, our
              environment, equipment and coaching are designed to push you
              further.
            </p>
            <p className="text-[#171717] leading-relaxed">
              No egos. No barriers. Just results.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { stat: "—", label: "Members" },
              { stat: "—", label: "Programmes" },
              { stat: "—", label: "Expert Trainers" },
              { stat: "—", label: "Years Running" },
            ].map((item) => (
              <div key={item.label} className="border border-[#343434] p-6">
                <p className="font-display text-5xl text-black mb-1">
                  {item.stat}
                </p>
                <p className="text-sm text-[#BDBDBD]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMMES */}
      <section className="bg-black py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.4em] text-[#BDBDBD] uppercase mb-4">
              What We Offer
            </p>
            <h2 className="font-display text-5xl sm:text-6xl tracking-wide text-white">
              TRAINING PROGRAMMES
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#343434]">
            {programmes.map((prog) => (
              <div
                key={prog.title}
                className="bg-black p-8 hover:bg-[#171717] transition-colors group"
              >
                <h3 className="font-display text-2xl tracking-wide text-white mb-3 group-hover:text-[#BDBDBD] transition-colors">
                  {prog.title}
                </h3>
                <p className="text-sm text-[#BDBDBD] leading-relaxed">
                  {prog.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/programmes"
              className="inline-block px-8 py-4 border border-white text-white text-sm tracking-widest font-semibold hover:bg-white hover:text-black transition-colors"
            >
              VIEW ALL PROGRAMMES
            </Link>
          </div>
        </div>
      </section>

      {/* MEMBERSHIPS */}
      <section className="bg-[#171717] py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.4em] text-[#BDBDBD] uppercase mb-4">
              Membership Plans
            </p>
            <h2 className="font-display text-5xl sm:text-6xl tracking-wide text-white">
              CHOOSE YOUR PLAN
            </h2>
            <p className="text-[#BDBDBD] mt-4 text-sm">
              Pricing and plan details confirmed by the owner will appear here.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {memberships.map((plan) => (
              <div
                key={plan.name}
                className={`p-8 border flex flex-col ${
                  plan.highlight
                    ? "border-white bg-black"
                    : "border-[#343434]"
                }`}
              >
                {plan.highlight && (
                  <span className="text-xs tracking-widest bg-white text-black px-2 py-1 inline-block mb-4 self-start font-semibold">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="font-display text-3xl tracking-wide text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-3xl font-bold text-[#BDBDBD] mb-6">
                  {plan.price}
                </p>
                <ul className="space-y-2 mb-8 flex-1">
                  {plan.benefits.map((b) => (
                    <li
                      key={b}
                      className="text-sm text-[#BDBDBD] flex items-center gap-2"
                    >
                      <span className="text-white">✓</span> {b}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/memberships"
                  className={`px-6 py-3 text-sm font-semibold tracking-widest text-center transition-colors ${
                    plan.highlight
                      ? "bg-white text-black hover:bg-[#BDBDBD]"
                      : "border border-white text-white hover:bg-white hover:text-black"
                  }`}
                >
                  GET STARTED
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="bg-black border-t border-[#343434] py-24 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.4em] text-[#BDBDBD] uppercase mb-4">
            Get In Touch
          </p>
          <h2 className="font-display text-5xl sm:text-6xl tracking-wide text-white mb-6">
            READY TO START?
          </h2>
          <p className="text-[#BDBDBD] mb-10">
            Have questions? Our team is ready to help you begin your fitness
            journey.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-white text-black font-semibold text-sm tracking-widest hover:bg-[#BDBDBD] transition-colors"
          >
            CONTACT US
          </Link>
        </div>
      </section>
    </>
  );
}
