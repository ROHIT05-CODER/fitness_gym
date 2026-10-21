import { SectionHeader } from "@/components/ui";

export const metadata = {
  title: "Privacy Policy | Unisex Fitness",
  description: "Official privacy policy and data governance disclosure for Unisex Fitness.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-black text-white min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          eyebrow="Legal & Compliance"
          title="PRIVACY POLICY"
          subtitle="Last updated: October 2026. This document governs how Unisex Fitness collects, safeguards, and processes personal member information."
          align="left"
        />

        <div className="space-y-8 text-sm sm:text-base text-[#BDBDBD] leading-relaxed mt-12 border-t border-[#343434] pt-8">
          <section className="space-y-3">
            <h3 className="font-display text-2xl text-white tracking-wide">
              1. INFORMATION WE COLLECT
            </h3>
            <p>
              Unisex Fitness adheres to data minimization principles. We collect only the information strictly required to administer your membership and ensure safe facility operation:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#A0A0A0]">
              <li>Contact details: Name, email address, and optional telephone number.</li>
              <li>Authentication credentials managed securely via Supabase Auth.</li>
              <li>Transaction references and membership timestamps (credit card numbers are never stored on our servers).</li>
              <li>Enquiry correspondence submitted via our contact channels.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="font-display text-2xl text-white tracking-wide">
              2. HOW WE USE YOUR INFORMATION
            </h3>
            <p>
              Your data is utilized exclusively for:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#A0A0A0]">
              <li>Verifying account authentication and facility access permissions.</li>
              <li>Processing membership purchases through verified payment providers.</li>
              <li>Responding directly to member support and training inquiries.</li>
              <li>Complying with statutory accounting and legal obligations.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="font-display text-2xl text-white tracking-wide">
              3. PAYMENT PROCESSING & CARD SECURITY
            </h3>
            <p>
              All online membership checkout flows occur through encrypted, PCI-DSS Level 1 compliant payment gateways. Unisex Fitness never receives, views, or logs complete card numbers or CVV codes.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-display text-2xl text-white tracking-wide">
              4. DATA RETENTION & YOUR RIGHTS
            </h3>
            <p>
              Under data protection regulations, you retain the right to access, rectify, or request the deletion of your personal account data at any time by contacting our data officer at <span className="font-mono text-white">privacy@unisexfitness.com</span>.
            </p>
          </section>

          <section className="p-6 bg-[#171717] border border-[#343434] text-xs text-[#888888]">
            <p>
              Note: This is an operational baseline policy for Unisex Fitness. Official legal counsel will review specific local statutory jurisdiction filings before production launch.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
