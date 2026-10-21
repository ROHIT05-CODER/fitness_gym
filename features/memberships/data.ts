export interface PlanFeature {
  name: string;
  includedIn: string[]; // plan ids that have this
}

export interface ClientMembershipPlan {
  id: string;
  name: string;
  tagline: string;
  amountMinorUnits: number; // e.g. 4500 = £45.00 / $45.00 / ₹4,500
  currencySymbol: string;
  currencyCode: string;
  billingPeriod: string;
  validityDays: number;
  highlight?: boolean;
  benefits: string[];
  ctaText: string;
}

export const INITIAL_PLANS: ClientMembershipPlan[] = [
  {
    id: "standard-monthly",
    name: "STANDARD MONTHLY",
    tagline: "Total floor access with no long-term lock-in.",
    amountMinorUnits: 4900,
    currencySymbol: "£",
    currencyCode: "GBP",
    billingPeriod: "per month",
    validityDays: 30,
    benefits: [
      "Unlimited gym floor & cardio deck access",
      "Standard locker room & shower amenities",
      "Access to all open group HIIT & conditioning slots",
      "Free mobile member app & barcode check-in",
      "Cancel anytime before next billing cycle",
    ],
    ctaText: "SELECT MONTHLY",
  },
  {
    id: "pro-quarterly",
    name: "PRO QUARTERLY",
    tagline: "Dedicated 90-day transformation commitment.",
    amountMinorUnits: 12900,
    currencySymbol: "£",
    currencyCode: "GBP",
    billingPeriod: "every 3 months",
    validityDays: 90,
    highlight: true,
    benefits: [
      "Everything in Standard Monthly",
      "Priority booking for all group classes",
      "1x Bi-monthly 3D body composition analysis",
      "1x Complimentary 1-on-1 coaching orientation",
      "2x Monthly guest day passes",
    ],
    ctaText: "SELECT PRO PLAN",
  },
  {
    id: "elite-annual",
    name: "ELITE ANNUAL",
    tagline: "Uncompromised discipline for the year ahead.",
    amountMinorUnits: 44900,
    currencySymbol: "£",
    currencyCode: "GBP",
    billingPeriod: "per year",
    validityDays: 365,
    benefits: [
      "Everything in Pro Quarterly",
      "4x 1-on-1 personal coaching milestone sessions",
      "Dedicated premium locker with laundry support",
      "Unlimited guest day passes (1 guest per visit)",
      "Exclusive Unisex Fitness welcome training kit",
    ],
    ctaText: "SELECT ELITE ANNUAL",
  },
];

export const COMPARISON_FEATURES = [
  { name: "Full Gym Floor & Strength Area Access", standard: true, pro: true, elite: true },
  { name: "Locker Rooms, Showers & Amenities", standard: true, pro: true, elite: true },
  { name: "Group Training & HIIT Classes", standard: true, pro: true, elite: true },
  { name: "Guest Day Passes", standard: "Add-on", pro: "2 / month", elite: "Unlimited" },
  { name: "Biometric InBody Body Scans", standard: "Add-on", pro: "Bi-monthly", elite: "Monthly" },
  { name: "1-on-1 Personal Training Sessions", standard: "Add-on", pro: "1 Session", elite: "4 Sessions" },
  { name: "Permanent Private Locker", standard: false, pro: false, elite: true },
];

export const FAQS = [
  {
    q: "Can I cancel or freeze my membership?",
    a: "Yes. Monthly plans can be cancelled before the renewal date with no cancellation penalty. Quarterly and Annual memberships can be frozen for up to 60 days per calendar year for medical or travel reasons.",
  },
  {
    q: "Is there a joining or registration fee?",
    a: "No hidden onboarding charges or induction fees. What you see is the authoritative total price verified directly on the server before checkout.",
  },
  {
    q: "Do you offer single-day guest passes or trials?",
    a: "Prospective members may request a day trial pass through our contact form or visit the reception desk during staffed floor hours.",
  },
  {
    q: "What payment methods are supported?",
    a: "We accept all major debit/credit cards, Apple Pay, and Google Pay through our encrypted, PCI-compliant hosted checkout provider. We never store raw card numbers on gym servers.",
  },
];
