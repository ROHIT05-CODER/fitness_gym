"use client";

import { useState } from "react";
import { togglePlanStatusAction } from "@/features/admin/actions";
import { Badge } from "@/components/ui";
import { Loader2 } from "lucide-react";

interface PlanStatusToggleProps {
  planId: string;
  initialStatus: boolean;
}

export default function PlanStatusToggle({
  planId,
  initialStatus,
}: PlanStatusToggleProps) {
  const [isActive, setIsActive] = useState(initialStatus);
  const [isPending, setIsPending] = useState(false);

  const handleToggle = async () => {
    setIsPending(true);
    try {
      const res = await togglePlanStatusAction(planId, isActive);
      if (res.success) {
        setIsActive(!isActive);
      } else {
        alert(res.error || "Failed to update status");
      }
    } catch {
      alert("Network error updating plan status.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none"
      title="Click to toggle active state"
    >
      {isPending ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
      ) : isActive ? (
        <Badge variant="solid-white" size="sm">
          ACTIVE
        </Badge>
      ) : (
        <Badge variant="neutral" size="sm">
          DISABLED
        </Badge>
      )}
    </button>
  );
}
