import React from "react";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  theme?: "dark" | "light";
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
  theme = "dark",
  className = "",
}) => {
  const isLight = theme === "light";
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl mb-12 sm:mb-16 ${alignClass} ${className}`}>
      {eyebrow && (
        <p
          className={`text-xs font-semibold tracking-[0.4em] uppercase mb-3 ${
            isLight ? "text-[#707070]" : "text-[#BDBDBD]"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-4xl sm:text-6xl tracking-wide uppercase leading-tight ${
          isLight ? "text-black" : "text-white"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-sm sm:text-base leading-relaxed ${
            isLight ? "text-[#343434]" : "text-[#BDBDBD]"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
