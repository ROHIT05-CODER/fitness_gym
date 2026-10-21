import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "highlight" | "surface";
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  variant = "default",
  hoverable = true,
  ...props
}) => {
  const base = "border p-6 sm:p-8 transition-all duration-200";

  const variants = {
    default: "bg-black border-[#343434] text-white",
    highlight: "bg-black border-white text-white shadow-[0_0_20px_rgba(255,255,255,0.06)]",
    surface: "bg-[#171717] border-[#343434] text-white",
  };

  const hoverStyle = hoverable ? "hover:border-[#BDBDBD]" : "";

  return (
    <div
      className={`${base} ${variants[variant]} ${hoverStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
