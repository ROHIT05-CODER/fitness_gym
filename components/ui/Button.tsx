"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  href?: string;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      href,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold tracking-wider transition-all duration-200 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none";

    const variantStyles = {
      primary: "bg-white text-black hover:bg-[#BDBDBD] active:bg-[#A0A0A0]",
      outline:
        "border border-white text-white hover:bg-white hover:text-black active:bg-[#E0E0E0] active:text-black",
      secondary:
        "bg-[#171717] border border-[#343434] text-white hover:border-white hover:bg-[#222222]",
      ghost: "text-[#BDBDBD] hover:text-white hover:bg-[#171717]",
      danger: "bg-red-950/60 border border-red-700 text-red-200 hover:bg-red-900/80",
    };

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 uppercase",
      md: "text-sm px-6 py-3 uppercase",
      lg: "text-base px-8 py-4 uppercase",
    };

    const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
      fullWidth ? "w-full" : ""
    } ${className}`;

    if (href) {
      return (
        <Link href={href} className={combinedClasses}>
          {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={combinedClasses}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
