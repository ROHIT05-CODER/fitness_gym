import { SectionHeader } from "@/components/ui";

export const metadata = {
  title: "Terms of Service | Unisex Fitness",
  description: "Official membership terms, facility rules, and code of conduct for Unisex Fitness.",
};

export default function TermsPage() {
  return (
    <div className="bg-black text-white min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          eyebrow="Rules & Agreements"
          title="TERMS OF SERVICE"
          subtitle="Last updated: October 2026. Review the terms governing club membership, gym floor safety, and payment obligations."
          align="left"
        />

        <div className="space-y-8 text-sm sm:text-base text-[#BDBDBD] leading-relaxed mt-12 border-t border-[#343434] pt-8">
          <section className="space-y-3">
            <h3 className="font-display text-2xl text-white tracking-wide">
              1. MEMBERSHIP & FACILITY ACCESS
            </h3>
            <p>
              Membership grants non-transferable access to the gym premises during official operating hours. All members must authenticate via their assigned digital pass or credentials at the entry turnstiles.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-display text-2xl text-white tracking-wide">
              2. CODE OF CONDUCT & LIFTING ETIQUETTE
            </h3>
            <p>
              Unisex Fitness maintains an elite standard of training mutual respect:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#A0A0A0]">
              <li>All weights, barbells, dumbbells, and plates must be re-racked immediately after use.</li>
              <li>Benches and equipment must be sanitized with provided wipes after each set.</li>
              <li>Dropping weights excessively or unsafely outside designated lifting platforms is prohibited.</li>
              <li>Harassment, intimidation, or inappropriate conduct toward members or staff will result in immediate termination of membership without refund.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="font-display text-2xl text-white tracking-wide">
              3. BILLING, PAYMENTS & CANCELLATIONS
            </h3>
            <p>
              Memberships are purchased upfront for the selected period (Monthly, Quarterly, or Annual). All pricing shown is authoritative. Notice of cancellation for rolling memberships must be submitted at least 5 business days prior to the billing cycle.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-display text-2xl text-white tracking-wide">
              4. PHYSICAL HEALTH & LIABILITY ACKNOWLEDGEMENT
            </h3>
            <p>
              Members acknowledge that resistance training, cardiovascular exercise, and athletic conditioning involve inherent physical risks. Members confirm they are medically fit to engage in strenuous exercise and release Unisex Fitness and its coaching personnel from liability arising from normal training activity.
            </p>
          </section>

          <section className="p-6 bg-[#171717] border border-[#343434] text-xs text-[#888888]">
            <p>
              For legal enquiries or formal membership agreements, contact management at <span className="font-mono text-white">legal@unisexfitness.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
