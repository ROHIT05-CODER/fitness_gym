"use client";

import { useState } from "react";
import { SectionHeader, Card, Badge } from "@/components/ui";
import CheckoutButton from "@/components/checkout/CheckoutButton";
import { INITIAL_PLANS, COMPARISON_FEATURES, FAQS } from "@/features/memberships/data";
import { Check, X, ChevronDown, ShieldCheck } from "lucide-react";

export default function MembershipsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-black text-white min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Transparent Investment"
          title="MEMBERSHIP PLANS"
          subtitle="Simple, honest tiers designed around your training commitment. No lock-in hidden fees, no synthetic surcharges."
        />

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 items-stretch">
          {INITIAL_PLANS.map((plan) => {
            const formattedPrice = (plan.amountMinorUnits / 100).toFixed(0);

            return (
              <Card
                key={plan.id}
                variant={plan.highlight ? "highlight" : "surface"}
                className={`flex flex-col justify-between relative ${
                  plan.highlight ? "border-white bg-[#141414]" : ""
                }`}
              >
                <div>
                  {plan.highlight && (
                    <div className="mb-4">
                      <Badge variant="solid-white" size="sm">
                        MOST POPULAR
                      </Badge>
                    </div>
                  )}

                  <h3 className="font-display text-3xl tracking-wide text-white mb-2">
                    {plan.name}
                  </h3>

                  <p className="text-xs text-[#A0A0A0] mb-6 min-h-[32px]">
                    {plan.tagline}
                  </p>

                  <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-[#2B2B2B]">
                    <span className="text-2xl text-[#BDBDBD] font-display">
                      {plan.currencySymbol}
                    </span>
                    <span className="font-display text-6xl text-white tracking-tight">
                      {formattedPrice}
                    </span>
                    <span className="text-xs text-[#888888] font-mono uppercase">
                      / {plan.billingPeriod}
                    </span>
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
                    INCLUDED IN THIS PLAN:
                  </p>
                  <ul className="space-y-3 mb-8">
                    {plan.benefits.map((benefit, i) => (
                      <li
                        key={i}
                        className="text-xs sm:text-sm text-[#BDBDBD] flex items-start gap-2.5"
                      >
                        <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-[#2B2B2B]">
                  <CheckoutButton
                    planId={plan.id}
                    label={plan.ctaText}
                    variant={plan.highlight ? "primary" : "outline"}
                  />
                  <p className="text-[11px] text-[#707070] text-center mt-3">
                    Authoritative server validation applied at checkout
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Security & Integrity Note */}
        <div className="mt-12 p-4 bg-[#141414] border border-[#2D2D2D] flex flex-col sm:flex-row items-center gap-3 text-xs text-[#A0A0A0] justify-center text-center sm:text-left">
          <ShieldCheck className="w-5 h-5 text-white shrink-0" />
          <span>
            All transactions are encrypted via PCI-DSS compliant payment gateways. The server confirms authoritative pricing before any order is finalized.
          </span>
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-24">
          <SectionHeader
            eyebrow="Side-by-Side Breakdown"
            title="COMPARE PRIVILEGES"
            subtitle="Full visibility into every privilege across all membership tiers."
          />

          <div className="overflow-x-auto border border-[#343434] bg-[#121212] mt-8">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#343434] bg-black text-xs font-mono uppercase text-[#BDBDBD]">
                <tr>
                  <th className="p-4 sm:p-5">Feature</th>
                  <th className="p-4 sm:p-5 text-center">Standard</th>
                  <th className="p-4 sm:p-5 text-center bg-[#181818] text-white">Pro</th>
                  <th className="p-4 sm:p-5 text-center">Elite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#242424]">
                {COMPARISON_FEATURES.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#181818]/50 transition-colors">
                    <td className="p-4 sm:p-5 text-white font-medium text-xs sm:text-sm">
                      {row.name}
                    </td>
                    <td className="p-4 sm:p-5 text-center text-xs text-[#BDBDBD]">
                      {typeof row.standard === "boolean" ? (
                        row.standard ? (
                          <Check className="w-4 h-4 text-white mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-[#555555] mx-auto" />
                        )
                      ) : (
                        row.standard
                      )}
                    </td>
                    <td className="p-4 sm:p-5 text-center text-xs text-white bg-[#181818]/60 font-semibold">
                      {typeof row.pro === "boolean" ? (
                        row.pro ? (
                          <Check className="w-4 h-4 text-white mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-[#555555] mx-auto" />
                        )
                      ) : (
                        row.pro
                      )}
                    </td>
                    <td className="p-4 sm:p-5 text-center text-xs text-white">
                      {typeof row.elite === "boolean" ? (
                        row.elite ? (
                          <Check className="w-4 h-4 text-white mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-[#555555] mx-auto" />
                        )
                      ) : (
                        row.elite
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <SectionHeader
            eyebrow="Clarifications"
            title="FREQUENTLY ASKED QUESTIONS"
            subtitle="Everything you need to know about joining, memberships, and billing."
          />

          <div className="space-y-4 mt-8">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-[#343434] bg-[#141414] transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-sm sm:text-base text-white">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#BDBDBD] transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-[#BDBDBD] leading-relaxed border-t border-[#262626]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
