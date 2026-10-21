import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "solid-white" | "outline-white" | "neutral" | "success" | "warning";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "solid-white",
  size = "sm",
  className = "",
  ...props
}) => {
  const base = "inline-flex items-center font-bold uppercase tracking-widest select-none";

  const sizeStyles = {
    sm: "text-[10px] px-2 py-0.5",
    md: "text-xs px-3 py-1",
  };

  const variantStyles = {
    "solid-white": "bg-white text-black",
    "outline-white": "border border-white text-white",
    neutral: "bg-[#222222] border border-[#343434] text-[#BDBDBD]",
    success: "bg-emerald-950/80 border border-emerald-600 text-emerald-300",
    warning: "bg-amber-950/80 border border-amber-600 text-amber-300",
  };

  return (
    <span
      className={`${base} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
