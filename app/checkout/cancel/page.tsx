import { Card, Badge, Button } from "@/components/ui";
import { XCircle, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Checkout Cancelled | Unisex Fitness",
  description: "Your membership order has been cancelled.",
};

export default function CheckoutCancelPage() {
  return (
    <div className="bg-black text-white min-h-[85vh] flex items-center justify-center py-16 px-4">
      <Card variant="surface" className="p-8 sm:p-12 text-center max-w-lg mx-auto space-y-6">
        <div className="w-16 h-16 rounded-full bg-neutral-900 border border-[#343434] flex items-center justify-center mx-auto text-[#BDBDBD]">
          <XCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <Badge variant="neutral" size="sm">
            ORDER CANCELLED
          </Badge>
          <h1 className="font-display text-4xl sm:text-5xl text-white tracking-wide">
            CHECKOUT INCOMPLETE
          </h1>
          <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">
            Your transaction was cancelled before completion. No funds have been debited from your card.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/memberships" variant="primary" size="md">
            Review Membership Plans
          </Button>
          <Button href="/contact" variant="outline" size="md">
            Contact Support
          </Button>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#707070]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>No Incomplete Charges Stored</span>
        </div>
      </Card>
    </div>
  );
}
