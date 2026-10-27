"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";

interface CheckoutButtonProps {
  planId: string;
  label?: string;
  variant?: "primary" | "outline" | "secondary";
  className?: string;
}

export default function CheckoutButton({
  planId,
  label = "SELECT PLAN",
  variant = "primary",
  className = "",
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });

      if (res.status === 401) {
        // Redirect unauthenticated guest to sign-in first
        router.push("/sign-in");
        return;
      }

      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert(data.message || "Unable to initiate payment session. Please try again.");
        setIsLoading(false);
      }
    } catch {
      alert("Network error connecting to payment gateway.");
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size="md"
      fullWidth
      isLoading={isLoading}
      onClick={handleCheckout}
      className={className}
    >
      {isLoading ? "INITIALIZING SECURE CHECKOUT..." : label}
    </Button>
  );
}
